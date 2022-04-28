<script lang="ts" setup>
import { defineEmits, defineProps, onBeforeUnmount, ref, useAttrs, watch } from 'vue';

export type DialogRef = HTMLDialogElement | null;
const props = defineProps({
  /**
   * Need cause Dialog attr.open is readonly
   * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/open#value
   */
  isOpen: {
    type: Boolean,
    default: false,
  },
  /**
   * Default false for display Dialog as Page Modal
   */
  modeless: {
    type: Boolean,
    default: false,
  },
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
  (e: 'opened', dialog: DialogRef): void;
  /**
   * Triggers when Dialog closed. Returns HTMLDialogElement
   *
   * @property {DialogRef} dialog
   */
  (e: 'closed', dialog: DialogRef): void;
}>();

const dialog = ref<DialogRef>(null);
const showDialog = () => {
  if (props.modeless) {
    dialog.value?.show();
  } else {
    dialog.value?.showModal();
  }
  emit('opened', dialog.value );
};

/**
 * Handle Close
 * @param {boolean} [true] emitState Emit close event or not
 */
const closeDialog = ({ emitState = true } = {}) => {
  dialog.value?.close();
  if (emitState) {
    emit('closed', dialog.value );
    console.log('close');
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
    class=dialog
    ref="dialog">
    <div class="dialog__content">
      <slot></slot>
    </div>
    <header
      class="dialog__header">
      <slot
        name="close"
        v-bind="{ closeText, closeDialog }">
        <button
          @click="closeDialog"
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
