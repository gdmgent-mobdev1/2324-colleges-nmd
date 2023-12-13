import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

import "@components/design/Typography/PageTitle";
import "@components/pages/clients/form/ClientForm";
import { createClient } from "@core/modules/clients/Client.api";

@customElement("client-create")
class ClientCreate extends LitElement {
  render() {
    return html`<app-page-title>Klant toevoegen</app-page-title>
      <client-form .method=${createClient}></client-form> `;
  }
}

export default ClientCreate;
