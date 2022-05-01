/**
 * @vitest-environment jsdom
 */
import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/vue';
import NativeDialog from './native-dialog.vue';

/**
 * Mock native Dialog
 * @type {HTMLDialogElement}
 */
const dialog: HTMLDialogElement = HTMLDialogElement.prototype;
dialog.showModal = vi.fn();
dialog.show = vi.fn();
dialog.close = vi.fn();

describe('Dialog Component', () => {
  test('render with correct Close Text', async () => {
    const { rerender } = render(NativeDialog, {
      props: {
        isOpen: true,
      }
    });

    expect(screen.queryByLabelText('Close')).toBeTruthy();
    await rerender({ closeText: 'bye bye' });
    expect(screen.queryByLabelText('bye bye')).toBeTruthy();
  });

  test('fired Events on open and manuel close', async () => {
    const spy = vi.spyOn(dialog, 'showModal');
    const { rerender, emitted } = render(NativeDialog);
    const closeBtn = screen.getByLabelText(/Close/);

    await rerender({ isOpen: true });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(emitted()).toHaveProperty('opened');

    await fireEvent.click(closeBtn);
    expect(emitted()).toHaveProperty('closed');

    await rerender({ isOpen: true });
    await rerender({ isOpen: false });
  });

  test('fired Event on prop close', async () => {
    const { rerender, emitted } = render(NativeDialog, {
      props: {
        isOpen: true,
      },
    });

    // @ts-ignore
    expect(emitted().opened[0][0]).toBe(null);
    await rerender({ isOpen: false });
    expect(emitted()).not.toHaveProperty('closed');
  });

  test('open Dialog by modeless condition', async () => {
    const spy = vi.spyOn(dialog, 'show');
    const { rerender, emitted } = render(NativeDialog, {
      props: {
        modeless: true,
      },
    });

    await rerender({ isOpen: true });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('closed on unmounted', async () => {
    const { unmount, emitted } = render(NativeDialog, {
      props: {
        isOpen: true,
      },
    });

    unmount();
    expect(emitted()).toHaveProperty('closed');
  });
});
