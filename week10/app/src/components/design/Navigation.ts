import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("app-navigation")
export class Navigation extends LitElement {
  render() {
    return html`<header class="header">
      <img class="header__logo" src="/logo.png" alt="Tracky" />
      <nav class="header__nav">
        <ul class="main-nav">
          <li class="main-nav__item"><a href="/">Home</a></li>
          <li class="main-nav__item"><a href="/clients">Clients</a></li>
        </ul>
      </nav>
    </header>`;
  }

  static styles = css`
    .header {
      background: #fff;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

      padding: 2rem 1rem;
      height: 100%;
    }

    .header__logo {
      width: 6rem;
    }

    .header__nav {
      margin-top: 2rem;
    }

    .main-nav {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .main-nav__item {
      margin-bottom: 0.5rem;
    }

    .main-nav__item a {
      text-decoration: none;
      color: var(--text-color);
    }
  `;
}
