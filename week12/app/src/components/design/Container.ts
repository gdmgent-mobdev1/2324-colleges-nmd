import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";

@customElement("app-container")
class Container extends LitElement {
  render() {
    return html`<div class="container"><slot></slot></div>`;
  }

  static styles = [
    css`
      .container {
        display: block;
        padding: 2rem 1rem;
        width: 100%;
        max-width: 52rem;
        margin: 0 auto;
      }
    `,
    defaultStyles,
  ];
}

export default Container;
