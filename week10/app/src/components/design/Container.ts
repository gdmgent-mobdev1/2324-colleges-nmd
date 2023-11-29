import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("app-container")
export class Container extends LitElement {
  render() {
    return html`<slot></slot> `;
  }

  static styles = css`
    :host {
      padding: 2rem 1rem;
      width: 100%;
      max-width: 30rem;
      margin: 0 auto;
    }
  `;
}
