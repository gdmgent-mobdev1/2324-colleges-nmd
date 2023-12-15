import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";

@customElement("app-grid")
class Grid extends LitElement {
  render() {
    return html`<ul class="grid">
      <slot></slot>
    </ul>`;
  }

  static styles = [
    css`
      .grid {
        padding: 0;
        list-style-type: none;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(14rem, 100%), 1fr));
        gap: 1rem;
        align-items: stretch;
      }
    `,
    defaultStyles,
  ];
}

export default Grid;
