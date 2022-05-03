<script lang="ts" setup>
import {
  defineEmits,
  defineProps,
  onBeforeUnmount,
  ref,
  watch,
} from 'vue';
const props = defineProps({
  /**
   * Need cause Dialog Attribute [open] is readonly
   * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/open#value
   */
  isOpen: {
    type: Boolean,
    default: false,
  },
  /**
   * If false: Dialog display as Page Modal
   */
  modeless: {
    type: Boolean,
    default: false,
  },
  /**
   * Use as aria-label
   */
  closeText: {
    type: String,
    default: 'Close',
  },
});
const emit = defineEmits<{
  /**
   * Triggers when Dialog shown. Returns HTMLDialogElement
   *
   * @event show
   * @property {DialogRef} dialog
   */
  (e: 'opened', dialog: HTMLDialogElement | null): void;
  /**
   * Triggers when Dialog closed. Returns HTMLDialogElement
   *
   * @property {DialogRef} dialog
   */
  (e: 'closed', dialog: HTMLDialogElement | null): void;
}>();

const dialog = ref<HTMLDialogElement | null>(null);
const showDialog = () => {
  if (props.modeless) {
    // @ts-ignore (#1)
    dialog.value?.show();
  } else {
    // @ts-ignore (#1)
    dialog.value?.showModal();
  }
  emit('opened', dialog.value );
};

/**
 * Handle Close
 * @param {boolean} [true] emitState Emit close event or not
 */
const closeDialog = ({ emitState = true } = {}) => {
  // @ts-ignore (#1)
  dialog.value?.close();
  if (emitState) {
    emit('closed', dialog.value );
  }
};

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    showDialog();
  } else {
    /**
     * Prevent double Close Emit on external state change
     */
    closeDialog({ emitState: false });
  }
}, {
  immediate: true,
});

onBeforeUnmount(() => {
  closeDialog();
});
</script>

<template>
  <dialog
    class="dialog"
    ref="dialog">
    <div class="dialog__content">
      <!--
      @slot Default Slot contains Dialog Content
      -->
      <slot></slot>
    </div>
    <header
      class="dialog__header">
      <!--
        @slot close Slot for Close Button
        @binding {string} closeText Close Text of Button
        @binding {function} closeDialog Function to close Dialog
      -->
      <slot
        name="close"
        v-bind="{ closeText, closeDialog }">
        <button
          @click="closeDialog()"
          :aria-label="closeText"
          class="dialog__close">x</button>
      </slot>
    </header>
  </dialog>
</template>

<style>
.dialog {
  --dialog-spacing: 1rem;
  --dialog-width: 60ch;
  --dialog-width-max: 90vw;
  --dialog-height: max-content;
  --dialog-bg-color: #fff;

  width: min(var(--dialog-width), var(--dialog-width-max));
  height: var(--dialog-height);
  padding: var(--dialog-spacing);
}
.dialog[open] {
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: auto;
  background: var(--dialog-bg-color);
 }

.dialog::backdrop {
  --dialog-backdrop-color: rgba(0, 0, 0, 0.8);
  background-color: var(--dialog-backdrop-color);
 }

.dialog__header {
   order: -1;
   position: sticky;
   top: 0;
   display: flex;
   justify-content: flex-end;
}
</style>
