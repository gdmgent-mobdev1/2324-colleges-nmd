import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";
import { consume } from "@lit/context";
import { Client } from "@core/modules/clients/Client.types";
import { clientContext } from "./ClientDetailContainer";

import "@components/design/Typography/PageTitle";

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
      <app-page-title>${client.name}</app-page-title>
      <a href="/clients/${client._id}/edit">Edit</a>
    `;
  }

  static styles = [defaultStyles];
}

export default ClientDetail;
