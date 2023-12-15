import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import "@components/design/LoadingIndicator";
import "@components/design/ErrorView";
import { login } from "@core/modules/auth/Auth.api";
import * as Storage from "@core/storage";
import { Router } from "@vaadin/router";
import { buttonStyles, defaultStyles, inputStyles } from "@styles/styles";

import "@components/design/ErrorView";

@customElement("login-page")
class Login extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  error: string | null = null;

  handleSubmit(event: Event) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    this.isLoading = true;

    login({ email, password })
      .then(({ data }) => {
        this.isLoading = false;
        Storage.saveAuthToken(data.token);
        Router.go("/");
      })
      .catch((error) => {
        this.isLoading = false;
        this.error = error.message;
      });
  }

  render() {
    const { isLoading, error, handleSubmit } = this;

    return html`
      <div class="split">
        <img class="split__image" src="/home-image.webp" />
        <div class="split__content">
          <app-logo></app-logo>
          ${error ? html`<error-view error=${error} />` : ""}
          <form @submit=${handleSubmit}>
            <div class="form-control">
              <label class="form-control__label" for="email">Email</label>
              <input
                class="form-control__input"
                type="email"
                name="email"
                id="email"
                placeholder="john.doe@mail.com"
                ?disabled=${isLoading}
                required
              />
            </div>
            <div class="form-control">
              <label class="form-control__label" for="password">Password</label>
              <input
                class="form-control__input"
                type="password"
                name="password"
                id="password"
                ?disabled=${isLoading}
                required
              />
            </div>
            <button class="btn-primary" type="submit" ?disabled=${isLoading}>Login</button>
          </form>
        </div>
      </div>
    `;
  }

  static styles = [
    defaultStyles,
    inputStyles,
    buttonStyles,
    css`
      .split {
        display: flex;
        height: 100vh;
        width: 100vw;
        align-items: center;
      }
      .split__image {
        width: 60vw;
        height: 100vh;
        object-fit: cover;
      }
      .split__content {
        flex: 1;
        padding: 5rem 2rem;
      }
      .form {
        margin-top: 1rem;
      }
    `,
  ];
}

export default Login;
