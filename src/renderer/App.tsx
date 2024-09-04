import { defineComponent } from 'vue';
import { Button } from '@cfx/base';
export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <div>
        App
        <Button>123</Button>
      </div>
    );
  },
});
