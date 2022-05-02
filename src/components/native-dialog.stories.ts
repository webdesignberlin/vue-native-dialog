import NativeDialog from './native-dialog.vue';
import { onMounted, ref } from 'vue';
import { Meta, Story } from '@storybook/vue3';

type DialogRef = HTMLDialogElement | null;

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
  // decorators: [() => ({ template: '<div style="height: 400px; max-width: 100%;"><story/></div>' })],
} as Meta;

const Template: Story = (args: any) => ({
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
       * otherwise modal open modeless
       */
      // showDialog();
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
    <button
      data-test="open-modal-btn"
      @click="showDialog">Open Modal {{ isOpen }}</button>
    <button
      v-if="args.modeless"
      data-test="close-modal-btn"
      @click="handleClose">Close Modal</button>
    </menu>
    <native-dialog
      :is-open="isOpen"
      @closed="handleClose"
      @opened="handleShow"
      v-bind="args">Demo</native-dialog>
    <p>
      <samp
        style="font-family: monospace; white-space: pre; font-size: 0.8rem; display: block;"
        v-for="(item, index) in history"
        :key="index">{{ item }}</samp>
    </p>
  `,
});

export const Default = Template.bind({});
Default.storyName = 'Default as Modal';
export const Modeless = Template.bind({});
Modeless.args = {
  modeless: true,
};

/**
 * Theming
 */
const TemplateTheming: Story = (args: any) => ({
  components: { NativeDialog },
  inheritAttrs: false,
  setup() {
    const isOpen = ref(false);
    const theme = ref({
      '--dialog-spacing': '1rem',
      '--dialog-width': '60ch',
      '--dialog-width-max': '90vw',
      '--dialog-height': 'max-content',
      '--dialog-bg-color': '#fff',
    });
    return {
      theme,
      isOpen,
      args,
    };
  },
  template: `
    <form
      style="display: flex; gap: 2rem; margin-bottom: 2rem; flex-wrap: wrap;"
      @submit.prevent>
    <label
      v-for="(, name) in theme"
      :key="name">
      {{ name }}
      <input
        :data-test="name"
        type="text"
        v-model="theme[name]">
    </label>
    </form>
    <button
      data-test="open-modal-btn"
      @click="isOpen = true">Open Modal</button>
    <native-dialog
      :style="theme"
      :is-open="isOpen"
      @closed="isOpen = false"
      @opened="isOpen = true"
      v-bind="args">
    <template #default>
      <form
        style="max-width: 100%; margin: 2rem;"
        @submit.prevent>
        <label
          style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin-bottom: 2rem"
          v-for="(_, name) in theme"
          :key="name">
          <span>{{ name }}</span>
          <input type="text" v-model="theme[name]">
        </label>
      </form>
    </template>
    <template
      #close="{ closeText, closeDialog }">
      <button
        @click="closeDialog"
        :aria-label="closeText"
        style="
            display: inline-grid;
            place-content: center;
            height: 44px;
            aspect-ratio: 1 / 1;
            background: #1ea7fd;
            border: none;
            border-radius: 50%;
            cursor: pointer;
          ">
        <svg
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
          style="width: 32px; height: 32px">
          <g fill="none" fill-rule="evenodd">
            <path d="M0 0h18v18H0z"/>
            <path d="M14.319 3.012a.974.974 0 0 0-.544.283l-4.551 4.55-4.551-4.552a.972.972 0 0 0-1.598.315l-.04.124a.974.974 0 0 0 .263.94l4.55 4.551-4.552 4.554a.972.972 0 0 0 .432 1.641l.129.025a.974.974 0 0 0 .82-.292l4.548-4.55 4.552 4.553a.972.972 0 0 0 1.642-.432l.024-.129a.974.974 0 0 0-.292-.82l-4.55-4.55 4.553-4.553a.973.973 0 0 0-.71-1.67l-.125.012Z"
                  fill="#fff"
                  fill-rule="nonzero" />
          </g>
        </svg>
      </button>
    </template>
    </native-dialog>
  `,
});

export const Theming = TemplateTheming.bind({});
Theming.parameters = {
  docs: {
    storyDescription: 'Customize Styling via css custom properties.',
  },
};

/* export const Default = () => ({
  components: { NativeDialog },
  template: '<native-dialog>Demo</native-dialog>',
}); */
