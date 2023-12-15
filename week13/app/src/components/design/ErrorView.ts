import { css } from "lit";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";

@customElement("error-view")
class ErrorView extends LitElement {
  @property()
  error: string = "";

  render() {
    return html`<p class="error">Error: ${this.error}</p>`;
  }

  static styles = [
    defaultStyles,
    css`
      .error {
        padding: 0.5rem 1rem;
        background: var(--red100);
        color: var(--red);
        border-radius: var(--border-radius);
      }
    `,
  ];
}

export default ErrorView;
