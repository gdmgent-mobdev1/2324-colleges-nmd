import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";

@customElement("app-card")
class Card extends LitElement {
  @property()
  href: string | null = null;

  render() {
    const { href } = this;
    if (this.href) {
      return html`<a class="card card--clickable" href=${href}><slot></slot></a>`;
    }
    return html`<div class="card"><slot></slot></div>`;
  }

  static styles = [
    css`
      .card {
        display: block;
        padding: 1rem 1rem;
        background-color: white;
        border-radius: var(--border-radius);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        height: 100%;
      }

      .card--clickable {
        text-decoration: none;
        transition: all 0.2s ease-in-out;
      }

      .card--clickable:hover {
        opacity: 0.8;
      }
    `,
    defaultStyles,
  ];
}

export default Card;
