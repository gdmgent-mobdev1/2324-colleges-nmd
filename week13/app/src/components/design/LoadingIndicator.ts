import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("loading-indicator")
class LoadingIndicator extends LitElement {
  @property()
  isVisible: boolean = false;

  timeoutId: number | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    // only show loading after 1000ms (to prevent flickering when loading is fast)
    this.timeoutId = setTimeout(() => {
      this.isVisible = true;
    }, 1000);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  render() {
    if (!this.isVisible) {
      return html``;
    }
    return html`<p>Loading...</p>`;
  }
}

export default LoadingIndicator;
