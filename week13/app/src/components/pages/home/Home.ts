import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";
import userContext from "@components/auth/userContext";
import { User } from "@core/modules/auth/Auth.types";
import { consume } from "@lit/context";

import "@components/design/Typography/PageTitle";
import "@components/design/Header/PageHeader";

@customElement("app-home")
class Home extends LitElement {
  @consume({ context: userContext, subscribe: true })
  @property({ attribute: false })
  public user?: User | null;

  render() {
    const { user } = this;
    return html` <app-page-header>
      <app-page-title>Welkom ${user?.name}</app-page-title>
    </app-page-header>`;
  }

  static styles = [defaultStyles];
}

export default Home;
