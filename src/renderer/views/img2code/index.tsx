import { Upload } from '@cfx/base';
import { defineComponent, ref } from 'vue';

const { Dragger } = Upload;

export default defineComponent({
  name: 'Img2code',
  setup() {
    const handleSelect = async () => {
      const filePath = await window.electronAPI.img2code('is_pc');
      console.log('filePath:', filePath);
      //   window.
    };
    console.log(window.electronAPI);

    return () => (
      <div onClick={handleSelect}>
        <div style='pointer-events:none'>
          <Dragger name='file' showUploadList={false}>
            <p class='cf-upload-text'>点击/复制上传</p>
          </Dragger>
        </div>
      </div>
    );
  },
});
