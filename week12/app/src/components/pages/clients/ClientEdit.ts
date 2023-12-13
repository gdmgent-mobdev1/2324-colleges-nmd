import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";

import "@components/pages/clients/form/ClientForm";
import "@components/design/Typography/PageTitle";
import { consume } from "@lit/context";
import { clientContext } from "./ClientDetailContainer";
import { Client, ClientBody } from "@core/modules/clients/Client.types";
import { updateClient } from "@core/modules/clients/Client.api";

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

    return html` <app-page-title>Klant aanpassen</app-page-title>
      <client-form
        submitLabel="Aanpassen"
        .data=${client}
        .method=${(body: ClientBody) => updateClient(client._id, body)}
      ></client-form>`;
  }

  static styles = [defaultStyles];
}

export default ClientEdit;
