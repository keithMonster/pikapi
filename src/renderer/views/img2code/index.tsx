import { Upload } from '@cfx/base';
import { defineComponent, ref, nextTick } from 'vue';
import { codeToHtml } from 'shiki';

const { Dragger } = Upload;

export default defineComponent({
  name: 'Img2code',
  setup() {
    const type = ref('tableColumns');
    const handleTypeChange = (e: any) => {
      type.value = e.target.value;
    };

    const resultCode = ref('');

    const handleImg2code = (imgURL: string | ArrayBuffer) => {
      resultCode.value = '加载中...';
      nextTick(async () => {
        const code = await window.electronAPI.img2code(imgURL, type.value);

        const html = await codeToHtml(
          code.replaceAll(`\``, '').replace('javascript', ''),
          {
            lang: 'javascript',
            theme: 'vitesse-dark',
          }
        );

        resultCode.value = html;
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

    return () => (
      <div>
        <select class='mb-2' onChange={handleTypeChange}>
          <option value='tableColumns'>tableColumns</option>
          <option value='filterSchema'>filterSchema</option>
        </select>
        <div style='pointer-events:none'>
          <Dragger name='file' showUploadList={false}>
            <p class='cf-upload-text'>复制上传</p>
          </Dragger>
        </div>
        <div innerHTML={resultCode.value}></div>
      </div>
    );
  },
});
