import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { buttonStyles, defaultStyles } from "@styles/styles";
import isEmptyText from "@core/utils/isEmptyText";

@customElement("app-button")
class Button extends LitElement {
  @property()
  disabled: boolean = false;
  @property()
  type: string = "button";
  @property()
  onClick: () => void = () => {};
  @property()
  href: string | null = null;

  render() {
    const { disabled, type, href, onClick } = this;

    if (!isEmptyText(href)) {
      // to-do add disabled state
      return html`<a class="btn-primary" href=${href}><slot></slot></a>`;
    }

    return html`<button class="btn-primary" type=${type} @click=${onClick} ?disabled=${disabled}>
      <slot></slot>
    </button>`;
  }

  static styles = [defaultStyles, buttonStyles];
}

export default Button;
