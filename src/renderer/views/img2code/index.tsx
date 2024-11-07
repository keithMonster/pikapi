import { defineComponent, ref, nextTick } from 'vue';
import { codeToHtml } from 'shiki';

function copyToClipboard(text: string) {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  } else {
    console.log('Clipboard API not available');
  }
}

export default defineComponent({
  name: 'Img2code',
  setup() {
    // 类型切换
    const type = ref('tableColumns');
    const handleTypeChange = (e: any) => {
      type.value = e.target.value;
    };

    // 复制截图并上传
    const resultCode = ref('');
    const showCode = ref('');

    const handleImg2code = (imgURL: string | ArrayBuffer) => {
      showCode.value = '加载中...';
      nextTick(async () => {
        const code = await window.electronAPI.img2code(imgURL, type.value);
        // console.log('code:', code);
        if (!code) {
          return;
        }
        resultCode.value = code?.replaceAll(`\``, '').replace('javascript', '');
        // console.log(' resultCode.value: ', resultCode.value);

        const html = await codeToHtml(resultCode.value, {
          lang: 'javascript',
          theme: 'vitesse-dark',
        });

        showCode.value = html;
        // console.log('showCode.value: ', showCode.value);
        // console.log('resultCode.value:',resultCode.value);
      });
    };

    document.addEventListener('paste', (e) => {
      const items: any = e.clipboardData ? e.clipboardData.items : [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') === 0) {
          const blob = items[i].getAsFile();
          const reader = new FileReader();
          reader.onload = function (event) {
            const imgURL = event.target.result;
            handleImg2code(imgURL);
          };
          reader.readAsDataURL(blob);
        }
      }
    });

    // 代码复制

    const showToast = ref(false);
    const handleCopy = () => {
      copyToClipboard(resultCode.value);
      showToast.value = true;
      setTimeout(() => {
        showToast.value = false;
      }, 2000);
    };

    return () => (
      <div>
        <select onChange={handleTypeChange} class='select select-bordered '>
          <option value='tableColumns'>tableColumns</option>
          <option value='filterSchema'>filterSchema</option>
        </select>
        <div role='alert' class='alert alert-info my-4'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            class='h-6 w-6 shrink-0 stroke-current'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            ></path>
          </svg>
          <span>直接复制图片上传</span>
        </div>
        {showCode.value && (
          <>
            <button class='btn btn-primary mb-4' onClick={handleCopy}>
              复制代码
            </button>
            <div innerHTML={showCode.value}></div>
          </>
        )}

        {showToast.value && (
          <div class='toast toast-center toast-top'>
            <div class='alert alert-info '>
              <span>New message arrived.</span>
            </div>
          </div>
        )}
      </div>
    );
  },
});
