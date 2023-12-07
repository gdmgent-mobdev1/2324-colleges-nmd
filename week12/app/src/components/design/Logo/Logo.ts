import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";

@customElement("app-logo")
class Logo extends LitElement {
  render() {
    return html`<img class="logo" src="/logo.png" alt="Tracky" />`;
  }

  static styles = [
    defaultStyles,
    css`
      .logo {
        width: 10.8125rem;
      }
    `,
  ];
}

export default Logo;
