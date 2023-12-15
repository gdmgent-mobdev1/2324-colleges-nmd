import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { router } from "@core/router";
import { defaultStyles } from "@styles/styles";
import { createContext, provide } from "@lit/context";

import "@components/design/LoadingIndicator";
import "@components/design/ErrorView";
import { Client } from "@core/modules/clients/Client.types";
import { getClientById } from "@core/modules/clients/Client.api";

export const clientContext = createContext<Client | null>("client");

@customElement("client-detail-container")
class ClientDetailContainer extends LitElement {
  @property()
  isLoading: boolean = false;
  @provide({ context: clientContext })
  client: Client | null = null;
  @property()
  error: string | null = null;

  @property({ type: Object }) location = router.location;

  // called when the element is first connected to the document’s DOM
  connectedCallback(): void {
    super.connectedCallback();
    this.fetchItems();
  }

  fetchItems() {
    if (!this.location.params.id || typeof this.location.params.id !== "string") {
      return;
    }

    this.isLoading = true;
    // todo in api
    getClientById(this.location.params.id)
      .then(({ data }) => {
        this.client = data;
        this.isLoading = false;
      })
      .catch((error) => {
        this.error = error.message;
        this.isLoading = false;
      });
  }

  render() {
    const { isLoading, client, error } = this;

    if (error) {
      return html`<error-view error=${error} />`;
    }

    if (isLoading || !client) {
      return html`<loading-indicator></loading-indicator>`;
    }

    return html`<slot></slot>`;
  }

  static styles = [defaultStyles];
}

export default ClientDetailContainer;
