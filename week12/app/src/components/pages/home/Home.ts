import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";

import "@components/design/Typography/PageTitle";

@customElement("app-home")
class Home extends LitElement {
  render() {
    return html`<app-page-title>Welkom bij Tracky!</app-page-title>`;
  }

  static styles = [defaultStyles];
}

export default Home;
