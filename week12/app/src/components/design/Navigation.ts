import { logout, userContext } from "@components/auth/AuthContainer";
import { User } from "@core/modules/auth/Auth.types";
import { consume } from "@lit/context";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import "@components/design/Logo/Logo";
import { defaultStyles } from "@styles/styles";

@customElement("app-navigation")
class Navigation extends LitElement {
  @consume({ context: userContext, subscribe: true })
  @property({ attribute: false })
  public user?: User | null;

  handleLogout = () => {
    logout();
  };

  render() {
    return html`<header class="header">
      <a href="/"><app-logo /></a>
      <nav class="header__nav">
        <ul class="main-nav">
          <li class="main-nav__item"><a href="/">Home</a></li>
          <li class="main-nav__item"><a href="/clients">Clients</a></li>
          <li class="main-nav__item"><a href="/projects">Projects</a></li>
        </ul>
      </nav>
      <p class="header__user">${this.user?.name}</p>
      <button class="header__logout" @click=${this.handleLogout}>Logout</button>
    </header>`;
  }

  static styles = [
    defaultStyles,
    css`
      .header {
        display: flex;
        flex-direction: column;
        background: #fff;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

        padding: 2rem 1rem;
        height: 100%;
      }

      .header__nav {
        margin-top: 2rem;
      }

      .header__user {
        margin-top: auto;
        overflow-wrap: break-word;
        word-wrap: break-word;
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
    `,
  ];
}

export default Navigation;
