import { BaseComponent } from "obsidian";
import { mount, unmount } from "svelte";

/**
 * Wraps a Svelte component as an Obsidian {@link BaseComponent} for use with
 */
export class SvelteComponent extends BaseComponent {
  #instance: Record<string, unknown>;
  disabled = false;

  constructor(
    el: HTMLElement,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: any,
    props?: Record<string, unknown>,
  ) {
    super();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.#instance = mount(component, { target: el, props });
  }

  /** Unmount the inner Svelte component. */
  destroy(): void {
    void unmount(this.#instance);
  }

  then(cb: (component: this) => unknown): this {
    cb(this);
    return this;
  }

  setDisabled(disabled: boolean): this {
    this.disabled = disabled;
    return this;
  }
}
