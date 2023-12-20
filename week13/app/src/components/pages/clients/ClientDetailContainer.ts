import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { router } from "@core/router";
import { defaultStyles } from "@styles/styles";
import { createContext, provide } from "@lit/context";
import { Client } from "@core/modules/clients/Client.types";
import { getClientById } from "@core/modules/clients/Client.api";

import "@components/design/LoadingIndicator";
import "@components/design/ErrorView";

export type ClientContext = {
  client: Client | null;
  refresh: () => void;
};

export const clientContext = createContext<ClientContext | null>("client");

@customElement("client-detail-container")
class ClientDetailContainer extends LitElement {
  @property()
  isLoading: boolean = false;
  @provide({ context: clientContext })
  clientContext: ClientContext | null = null;
  @property()
  error: string | null = null;

  @property({ type: Object }) location = router.location;

  // called when the element is first connected to the document’s DOM
  connectedCallback(): void {
    super.connectedCallback();
    this.clientContext = {
      client: null,
      refresh: this.fetchItem,
    };
    this.fetchItem();
  }

  // arrow function! otherwise "this" won't work in context provider
  fetchItem = () => {
    if (!this.location.params.id || typeof this.location.params.id !== "string") {
      return;
    }

    this.isLoading = true;
    getClientById(this.location.params.id)
      .then(({ data }) => {
        this.clientContext = {
          client: data,
          refresh: this.fetchItem,
        };
        this.isLoading = false;
      })
      .catch((error) => {
        this.error = error.message;
        this.isLoading = false;
      });
  };

  render() {
    const { isLoading, clientContext, error } = this;

    if (!clientContext) {
      return html``;
    }

    const { client } = clientContext;

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
