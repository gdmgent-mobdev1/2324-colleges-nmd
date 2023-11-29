import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

import "@components/design/Navigation";
import "@components/design/Container";

@customElement("my-app")
class App extends LitElement {
  render() {
    return html`
      <app-navigation></app-navigation>
      <section class="content">
        <container>
          <slot></slot>
        </container>
      </section>
    `;
  }

  static styles = css`
    :host {
      display: grid;
      height: 100vh;
      grid-template-columns: 14rem auto;
    }
  `;
}

export default App;
