import { defineComponent } from 'vue';
import Img2code from './views/img2code';
export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <div>
        <Img2code />
      </div>
    );
  },
});
