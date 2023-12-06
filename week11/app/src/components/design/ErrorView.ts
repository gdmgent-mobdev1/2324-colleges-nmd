import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("error-view")
export class ErrorView extends LitElement {
  @property()
  error: string = "";

  render() {
    return html`<p class="error">Error: ${this.error}</p>`;
  }
}
