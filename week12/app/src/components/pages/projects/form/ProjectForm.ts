import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { buttonStyles, defaultStyles, inputStyles } from "@styles/styles";
import { Router } from "@vaadin/router";
import { Project, ProjectBody } from "@core/modules/projects/Project.types";
import { AxiosResponse } from "axios";

import "@components/design/LoadingIndicator";
import "@components/design/ErrorView";
import { getClients } from "@core/modules/clients/Client.api";
import { Client } from "@core/modules/clients/Client.types";

@customElement("project-form")
class ProjectForm extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  error: string | null = null;
  @property()
  data: ProjectBody = {
    name: "",
    clientId: "",
  };
  @property()
  clients: Array<Client> | null = null;
  @property()
  submitLabel: String = "Toevoegen";
  @property()
  method: ((project: ProjectBody) => Promise<AxiosResponse<Project>>) | null = null;

  // called when the element is first connected to the document’s DOM
  connectedCallback(): void {
    super.connectedCallback();
    this.fetchClients();
  }

  fetchClients() {
    getClients()
      .then(({ data }) => {
        this.clients = data;
      })
      .catch((error) => {
        this.error = error;
      });
  }

  handleSubmit = (event: Event) => {
    if (!this.method) {
      return;
    }

    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const project = {
      name: formData.get("name") as string,
      clientId: formData.get("clientId") as string,
    };

    this.isLoading = true;

    this.method(project)
      .then(({ data }) => {
        Router.go(`/projects/${data._id}`);
      })
      .catch((error) => {
        this.isLoading = false;
        this.error = error.message;
      });
  };

  render() {
    const { isLoading, error, submitLabel, data } = this;

    return html` ${error ? html`<error-view error=${error} />` : ""}
      <form>
        <div class="form-control">
          <label class="form-control__label" for="name">Project naam</label>
          <input
            class="form-control__input"
            type="text"
            name="name"
            id="name"
            .value=${data.name}
            placeholder="Project awesome"
            ?disabled=${isLoading}
            required
          />
        </div>
        <div class="form-control">
          <label class="form-control__label" for="name">Klant</label>
          <select
            class="form-control__input"
            type="text"
            name="clientId"
            id="clientId"
            .value=${data.clientId}
            ?disabled=${isLoading}
            required
          >
            <option>--</option>
            ${this.clients?.map((c) => {
              return html`<option value=${c._id} .selected=${c._id === data.clientId}>${c.name}</option>`;
            })}
          </select>
        </div>
        <button class="btn-primary" type="submit" ?disabled=${isLoading}>${submitLabel}</button>
      </form>`;
  }

  static styles = [defaultStyles, inputStyles, buttonStyles];
}

export default ProjectForm;
