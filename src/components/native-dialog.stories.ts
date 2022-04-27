import NativeDialog from './native-dialog.vue';
import type { DialogRef } from './native-dialog.vue';
import { onMounted, ref } from 'vue';
// import { DialogRef } from './native-dialog.vue';

declare interface IDemoHistoryItem {
  date: Date,
  eventName: 'close' | 'open',
  eventProp: DialogRef
}

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'NativeDialog',
  component: NativeDialog,
};

const Template = (args) => ({
  components: { NativeDialog },
  inheritAttrs: false,
  setup() {
    const isOpen = ref(false);
    const history = ref<IDemoHistoryItem[]>([]);
    const showDialog = () => {
      isOpen.value = true;
    };
    const handleClose = (eventProp: IDemoHistoryItem['eventProp']) => {
      isOpen.value = false;
      history.value.push({
        date: new Date(),
        eventName: 'close',
        eventProp,
      });
    };
    const handleShow = (eventProp: IDemoHistoryItem['eventProp']) => {
      history.value.push({
        date: new Date(),
        eventName: 'open',
        eventProp,
      });
    };
    onMounted(() => {
      /**
       * onMounted need for open Modal by default
       * otherwise modal open modelessly
       */
      showDialog();
    });
    return {
      args,
      isOpen,
      history,
      showDialog,
      handleClose,
      handleShow,
    };
  },
  template: `
    <menu>
    <button @click="showDialog">Open Modal {{ isOpen }}</button>
    <button
      @click="handleClose"
      data-trigger="open-show">Open Modal via show</button>
    </menu>
    <native-dialog
      :is-open="isOpen"
      @closed="handleClose"
      @opened="handleShow"
      v-bind="args">Demo</native-dialog>
    <output>
    <ul>
      <li
        v-for="(item, index) in history"
        :key="index">{{ item }}</li>
    </ul>
    </output>
  `,
});

export const Default = Template.bind({});
export const Modeless = Template.bind({});
Modeless.args = {
  modeless: true,
}
/* export const Default = () => ({
  components: { NativeDialog },
  template: '<native-dialog>Demo</native-dialog>',
}); */