import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("loading-indicator")
class LoadingIndicator extends LitElement {
  render() {
    return html`<p>Loading...</p>`;
  }
}

export default LoadingIndicator;
