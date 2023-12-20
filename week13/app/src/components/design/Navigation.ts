import { logout } from "@components/auth/AuthContainer";
import { User } from "@core/modules/user/User.types";
import { consume } from "@lit/context";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";
import userContext from "@components/auth/userContext";

import "@components/design/Logo/Logo";
import { router } from "@core/router";

@customElement("app-navigation")
class Navigation extends LitElement {
  @consume({ context: userContext, subscribe: true })
  @property({ attribute: false })
  public user?: User | null;

  @property({ type: Object }) location = router.location;

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("vaadin-router-location-changed", this.handleRouteChange);
  }

  handleRouteChange = () => {
    // location update to trigger re-render
    this.location = router.location;
  };

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("vaadin-router-location-changed", this.handleRouteChange);
  }

  handleLogout = () => {
    logout();
  };

  render() {
    const { location } = this;
    const { pathname } = location;

    return html`<header class="header">
      <a class="header__logo" href="/"><app-logo /></a>
      <nav class="header__nav">
        <ul class="main-nav">
          <li class="main-nav__item ${pathname === "/" ? "main-nav__item--active" : ""}">
            <a href="/">Home</a>
          </li>
          <li class="main-nav__item ${pathname.includes("logs") ? "main-nav__item--active" : ""}">
            <a href="/logs">Tijdregistratie</a>
          </li>
          <li class="main-nav__item ${pathname.includes("projects") ? "main-nav__item--active" : ""}">
            <a href="/projects">Projecten</a>
          </li>
          <li class="main-nav__item ${pathname.includes("clients") ? "main-nav__item--active" : ""}">
            <a href="/clients">Klanten</a>
          </li>
        </ul>
      </nav>
      <p class="header__user">${this.user?.name}</p>
      <button class="header__logout" @click=${this.handleLogout}>Uitloggen</button>
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

      .header__logo {
        width: 5.406rem;
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

      .main-nav__item--active a {
        font-weight: var(--font-weight-bold);
      }
    `,
  ];
}

export default Navigation;
