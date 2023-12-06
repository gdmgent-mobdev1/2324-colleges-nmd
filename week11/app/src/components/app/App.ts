import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

import "@components/design/Navigation";
import "@components/design/Container";

@customElement("my-app")
class App extends LitElement {
  render() {
    return html`<slot></slot> `;
  }
}

export default App;
