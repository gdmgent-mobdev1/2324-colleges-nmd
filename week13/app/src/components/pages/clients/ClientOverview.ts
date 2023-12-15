import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getClients } from "@core/modules/clients/Client.api";
import { Client } from "@core/modules/clients/Client.types";

import "@components/design/LoadingIndicator";
import "@components/design/ErrorView";
import "@components/design/Button/Button";
import "@components/design/Header/PageHeader";
import "@components/design/Typography/PageTitle";
import { defaultStyles } from "@styles/styles";

@customElement("client-overview")
class ClientOverview extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  clients: Array<Client> | null = null;
  @property()
  error: string | null = null;

  // called when the element is first connected to the document’s DOM
  connectedCallback(): void {
    super.connectedCallback();
    this.fetchItems();
  }

  fetchItems() {
    this.isLoading = true;
    getClients()
      .then(({ data }) => {
        this.clients = data;
        this.isLoading = false;
      })
      .catch((error) => {
        this.error = error.message;
        this.isLoading = false;
      });
  }

  render() {
    const { isLoading, clients, error } = this;

    let content = html``;
    if (error) {
      content = html`<error-view error=${error} />`;
    } else if (isLoading || !clients) {
      content = html`<loading-indicator></loading-indicator>`;
    } else if (clients.length === 0) {
      content = html`<p>Nog geen klanten</p>`;
    } else {
      content = html`<ul>
        ${clients.map((c) => {
          return html`
            <li>
              <a href="/clients/${c._id}">${c.name}</a>
            </li>
          `;
        })}
      </ul>`;
    }

    return html` <app-page-header>
        <app-page-title>Klanten</app-page-title>
        <app-button href="/clients/create">Klant toevoegen</app-button>
      </app-page-header>
      ${content}`;
  }

  static styles = [defaultStyles];
}

export default ClientOverview;
