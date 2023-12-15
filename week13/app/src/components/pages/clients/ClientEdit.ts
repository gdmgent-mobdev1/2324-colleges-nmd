import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";
import { consume } from "@lit/context";
import { clientContext } from "./ClientDetailContainer";
import { Client, ClientBody } from "@core/modules/clients/Client.types";
import { updateClient } from "@core/modules/clients/Client.api";

import "@components/shared/clients/form/ClientForm";
import "@components/design/Typography/PageTitle";
import "@components/design/Header/PageHeader";

@customElement("client-edit")
class ClientEdit extends LitElement {
  @consume({ context: clientContext, subscribe: true })
  @property({ attribute: false })
  public client?: Client | null;

  render() {
    const { client } = this;

    if (!client) {
      return html``;
    }

    return html` <app-page-header>
        <app-page-title>Klant aanpassen</app-page-title>
      </app-page-header>
      <client-form
        submitLabel="Aanpassen"
        .data=${client}
        .method=${(body: ClientBody) => updateClient(client._id, body)}
      ></client-form>`;
  }

  static styles = [defaultStyles];
}

export default ClientEdit;
