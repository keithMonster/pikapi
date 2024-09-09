import { Upload } from '@cfx/base';
import { defineComponent, ref } from 'vue';

const { Dragger } = Upload;

export default defineComponent({
  name: 'Img2code',
  setup() {
    // const handleSelect = async () => {
    //   const filePath = await window.electronAPI.img2code('is_pc');
    //   console.log('filePath:', filePath);
    //   //   window.
    // };
    console.log(window.electronAPI);

    document.addEventListener('paste', (e) => {
      const items:any = e.clipboardData ? e.clipboardData.items : [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') === 0) {
          const blob = items[i].getAsFile();
          const reader = new FileReader();
          reader.onload = function(event) {
            const imgURL = event.target.result;
            // console.log(imgURL);
            // 这里可以对图片进行进一步处理
            window.electronAPI.img2code(imgURL);
          };
          reader.readAsDataURL(blob);
        }
      }
    });

    return () => (
      <div>
        <div style='pointer-events:none'>
          <Dragger name='file' showUploadList={false}>
            <p class='cf-upload-text'>复制上传</p>
          </Dragger>
        </div>
      </div>
    );
  },
});
