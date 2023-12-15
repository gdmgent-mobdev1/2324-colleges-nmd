import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";
import { createClient } from "@core/modules/clients/Client.api";

import "@components/shared/clients/form/ClientForm";
import "@components/design/Typography/PageTitle";
import "@components/design/Header/PageHeader";

@customElement("client-create")
class ClientCreate extends LitElement {
  render() {
    return html` <app-page-header>
        <app-page-title>Klant toevoegen</app-page-title>
      </app-page-header>
      <client-form .method=${createClient}></client-form>`;
  }

  static styles = [defaultStyles];
}

export default ClientCreate;
