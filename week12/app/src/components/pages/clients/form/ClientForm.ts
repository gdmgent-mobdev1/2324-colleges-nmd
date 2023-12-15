import { Client, ClientBody } from "@core/modules/clients/Client.types";
import { buttonStyles, defaultStyles, inputStyles } from "@styles/styles";
import { Router } from "@vaadin/router";
import { AxiosResponse } from "axios";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("client-form")
class ClientForm extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  error: string | null = null;
  @property()
  submitLabel: string = "Toevoegen";
  @property()
  method: ((client: ClientBody) => Promise<AxiosResponse<Client>>) | null = null;

  @property()
  data: ClientBody = {
    name: "",
    contactPerson: {
      lastName: "",
      firstName: "",
      email: "",
    },
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();

    if (!this.method) {
      return;
    }

    const formData = new FormData(event.target as HTMLFormElement);
    const client = {
      name: formData.get("name") as string,
      contactPerson: {
        firstName: formData.get("contactPerson_firstName") as string,
        lastName: formData.get("contactPerson_lastName") as string,
        email: formData.get("contactPerson_email") as string,
      },
    };

    this.isLoading = true;
    this.method(client)
      .then(({ data }) => {
        Router.go(`/clients/${data._id}`);
      })
      .catch((error) => {
        this.error = error;
      });
  };

  render() {
    const { isLoading, handleSubmit, data, submitLabel, error } = this;

    return html`
      ${error ? html`<error-view error=${error} />` : ""}
      <form @submit=${handleSubmit}>
        <h3>Algemeen</h3>
        <div class="form-control">
          <label class="form-control__label" for="name">Klant naam</label>
          <input
            class="form-control__input"
            type="text"
            name="name"
            id="name"
            .value=${data.name}
            placeholder=""
            ?disabled=${isLoading}
            required
          />
        </div>
        <h3>Contact persoon</h3>
        <div class="form-control">
          <label class="form-control__label" for="contactPerson_firstName">Voornaam</label>
          <input
            class="form-control__input"
            type="text"
            name="contactPerson_firstName"
            id="contactPerson_firstName"
            .value=${data.contactPerson.firstName}
            placeholder="John"
            ?disabled=${isLoading}
            required
          />
        </div>
        <div class="form-control">
          <label class="form-control__label" for="contactPerson_lastName">Achternaam</label>
          <input
            class="form-control__input"
            type="text"
            name="contactPerson_lastName"
            id="contactPerson_lastName"
            .value=${data.contactPerson.lastName}
            placeholder="Doe"
            ?disabled=${isLoading}
            required
          />
        </div>
        <div class="form-control">
          <label class="form-control__label" for="contactPerson_email">Email</label>
          <input
            class="form-control__input"
            type="email"
            name="contactPerson_email"
            id="contactPerson_email"
            .value=${data.contactPerson.email}
            placeholder="john.doe@mail.com"
            ?disabled=${isLoading}
            required
          />
        </div>
        <button class="btn-primary" type="submit" ?disabled=${isLoading}>${submitLabel}</button>
      </form>
    `;
  }

  static styles = [defaultStyles, inputStyles, buttonStyles];
}

export default ClientForm;
