import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import "@components/design/LoadingIndicator";
import "@components/design/ErrorView";
import { login } from "@core/modules/auth/Auth.api";
import * as Storage from "@core/storage";
import { Router } from "@vaadin/router";

import "@components/design/ErrorView";

@customElement("login-page")
class Login extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  error: String | null = null;

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
    const { isLoading, error } = this;

    return html`
      ${error ? html`<error-view error=${error} />` : ""}
      <form @submit=${this.handleSubmit}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit" ?disabled=${isLoading}>Login</button>
      </form>
    `;
  }
}

export default Login;
