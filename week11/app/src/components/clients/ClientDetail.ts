import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getClientById } from "@core/modules/clients/Client.api";
import { Client } from "@core/modules/clients/Client.types";
import { router } from "@core/router";

import "@components/design/LoadingIndicator";
import "@components/design/ErrorView";

@customElement("client-detail")
class ClientDetail extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  client: Client | null = null;
  @property()
  error: String | null = null;

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

    return html` <h2>${client.name}</h2>`;
  }
}

export default ClientDetail;
