import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";

import "@components/design/Card/Card";

@customElement("app-amount-card")
class Card extends LitElement {
  @property()
  href: string | null = null;
  @property()
  amount: number = 0;
  @property()
  title: string = "";

  render() {
    const { href, amount, title } = this;
    return html`
      <app-card .href=${href}>
        <p class="card__amount">${amount}</p>
        <h2 class="card__title">${title}</h2>
      </app-card>
    `;
  }

  static styles = [
    css`
      .card__amount {
        font-size: 2rem;
        font-weight: bold;
        margin: 0;
      }
      .card__title {
        font-size: 0.8rem;
        font-weight: bold;
        margin: 0;
        text-transform: uppercase;
        color: var(--color-grey);
      }
    `,
    defaultStyles,
  ];
}

export default Card;
