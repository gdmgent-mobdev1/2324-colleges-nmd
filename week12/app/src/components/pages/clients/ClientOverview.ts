import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getClients } from "@core/modules/clients/Client.api";
import { Client } from "@core/modules/clients/Client.types";
import { defaultStyles } from "@styles/styles";

import "@components/design/LoadingIndicator";
import "@components/design/ErrorView";
import "@components/design/Button/Button";

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
    // todo in api
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

    if (error) {
      return html`<error-view error=${error} />`;
    }

    if (isLoading || !clients) {
      return html`<loading-indicator></loading-indicator>`;
    }

    return html`
      <h2>Clients</h2>
      <ul>
        ${clients.map((c) => {
          return html`
            <li>
              <a href="/clients/${c._id}">${c.name}</a>
            </li>
          `;
        })}
      </ul>
      <app-button href="/clients/create">Klant toevoegen</app-button>
    `;
  }

  static styles = [defaultStyles];
}

export default ClientOverview;
