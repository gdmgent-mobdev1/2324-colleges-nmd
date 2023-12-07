import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";

@customElement("app-button")
class Button extends LitElement {
  @property()
  disabled: boolean = false;
  @property()
  type: string = "button";
  @property()
  onClick: () => void = () => {};

  render() {
    const { disabled, type, onClick } = this;
    return html`<button type=${type} @click=${onClick} ?disabled=${disabled}><slot></slot></button>`;
  }

  static styles = [
    defaultStyles,
    css`
      button {
        display: block;
        padding: 0.75rem 1rem;
        width: 100%;

        background-color: var(--primary);
        color: white;
        border: none;
        border-radius: var(--border-radius);
        font-weight: var(--font-weight-bold);

        cursor: pointer;
        max-width: 36rem;
      }

      button:hover {
        opacity: 0.9;
      }
    `,
  ];
}

export default Button;
