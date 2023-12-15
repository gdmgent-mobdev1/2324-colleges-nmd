import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";

@customElement("app-page-header")
class PageTitle extends LitElement {
  render() {
    return html`<div class="page-header"><slot></slot></div>`;
  }

  static styles = [
    defaultStyles,
    css`
      .page-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
      }
    `,
  ];
}

export default PageTitle;
