<script lang="ts" setup>
import { defineEmits, defineProps, ref, useAttrs, watch } from 'vue';

type DialogRef = HTMLDialogElement | null;
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
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
  (e: 'show', dialog: DialogRef): void,
  (e: 'close', dialog: DialogRef): void
}>();

const attrs = useAttrs();

const dialog = ref<DialogRef>(null);
const showDialog = () => {
  if (props.modeless) {
    dialog.value?.show();
  } else {
    dialog.value?.showModal();
  }
  emit('show', dialog.value );
};
const closeDialog = () => {
  dialog.value?.close();
  emit('close', dialog.value );
};

watch(() => attrs.open, (show) => {
  console.log('watch', show);
  if (show) {
    showDialog();
  } else {
    closeDialog();
  }
}, {
  immediate: true,
})
</script>

<template>
  <dialog
    class=dialog
    ref="dialog"
    id="favDialog">
    <slot></slot>
    <header
      class="dialog__header">
      <slot name="close">
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
  --dialog-height: 80vh;

  width: min(var(--dialog-width), var(--dialog-width-max));
  max-height: var(--dialog-height);
}
.dialog[open] {
   display: grid;
   grid-template-rows: auto 1fr;
   overflow: auto;
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
   background: red;
}
</style>
