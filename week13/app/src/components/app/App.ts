import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

import "@components/design/Navigation";
import "@components/design/Container";
import { defaultStyles } from "@styles/styles";

@customElement("my-app")
class App extends LitElement {
  render() {
    return html`<slot></slot> `;
  }

  static styles = [defaultStyles];
}

export default App;
