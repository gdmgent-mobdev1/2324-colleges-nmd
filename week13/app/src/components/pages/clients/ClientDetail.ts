import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";
import { consume } from "@lit/context";
import { Client } from "@core/modules/clients/Client.types";
import { clientContext } from "./ClientDetailContainer";

import "@components/design/Header/PageHeader";
import "@components/design/Typography/PageTitle";
import "@components/design/Button/Button";

@customElement("client-detail")
class ClientDetail extends LitElement {
  @consume({ context: clientContext, subscribe: true })
  @property({ attribute: false })
  public client?: Client | null;

  render() {
    const { client } = this;

    if (!client) {
      return html``;
    }

    return html`
      <app-page-header>
        <app-page-title>${client.name}</app-page-title>
        <app-button href="/clients/${client._id}/edit" color="secondary">Aanpassen</app-button>
      </app-page-header>
    `;
  }

  static styles = [defaultStyles];
}

export default ClientDetail;
