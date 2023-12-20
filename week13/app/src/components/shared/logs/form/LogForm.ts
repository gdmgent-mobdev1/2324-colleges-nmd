import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { buttonStyles, defaultStyles, formStyles } from "@styles/styles";
import { Log, LogBody } from "@core/modules/logs/Log.types";
import { AxiosResponse } from "axios";
import { format } from "date-fns";

import "@components/design/LoadingIndicator";
import "@components/design/ErrorView";
import { getProjects } from "@core/modules/projects/Project.api";
import { Project } from "@core/modules/projects/Project.types";

const defaultData = {
  description: "",
  date: format(new Date(), "yyyy-MM-dd"),
  duration: 0,
  projectId: "",
};

@customElement("log-form")
class LogForm extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  error: string | null = null;
  @property()
  data: LogBody = { ...defaultData };
  @property()
  onSuccess?: (log: Log) => void;
  @property()
  projects: Array<Project> | null = null;
  @property()
  submitLabel: String = "Toevoegen";
  @property()
  method: ((log: LogBody) => Promise<AxiosResponse<Log>>) | null = null;
  @property()
  inline: boolean = true;
  @property()
  showProject: boolean = true;

  // called when the element is first connected to the document’s DOM
  connectedCallback(): void {
    super.connectedCallback();
    this.fetchLogs();
  }

  fetchLogs() {
    getProjects()
      .then(({ data }) => {
        this.projects = data;
      })
      .catch(() => {});
  }

  handleSubmit = (event: Event) => {
    if (!this.method) {
      return;
    }

    event.preventDefault();

    const $form = event.currentTarget as HTMLFormElement;
    const formData = new FormData($form);
    const log = {
      description: formData.get("description") as string,
      duration: parseInt(formData.get("duration") as string),
      date: formData.get("date") as string,
      projectId: formData.get("projectId") as string,
    };

    this.isLoading = true;

    this.method(log)
      .then(({ data }) => {
        // reset loading state
        this.isLoading = false;
        // reset form
        $form.reset();
        // call on success callback
        if (this.onSuccess) {
          this.onSuccess(data);
        }
      })
      .catch((error) => {
        this.isLoading = false;
        this.error = error.message;
      });
  };

  render() {
    const { isLoading, error, handleSubmit, inline, submitLabel, data, showProject } = this;

    return html` ${error ? html`<error-view error=${error} />` : ""}
      <form class="form ${inline ? "form--inline" : ""}" @submit=${handleSubmit}>
        <div class="form-control">
          <label class="form-control__label" for="description">Beschrijving</label>
          <input
            class="form-control__input"
            type="text"
            name="description"
            id="description"
            .value=${data.description}
            placeholder="Wat heb je gedaan?"
            ?disabled=${isLoading}
            required
          />
        </div>
        <div class="form-control">
          <label class="form-control__label" for="date">Datum</label>
          <input
            class="form-control__input"
            type="text"
            name="date"
            id="date"
            .value=${data.date}
            placeholder="yyyy-mm-dd"
            ?disabled=${isLoading}
            required
          />
        </div>
        <div class="form-control form-control--small">
          <label class="form-control__label" for="duration">Duur (min)</label>
          <input
            class="form-control__input"
            type="number"
            name="duration"
            id="duration"
            .value=${data.duration}
            placeholder="0"
            ?disabled=${isLoading}
            required
          />
        </div>
        ${showProject
          ? html`<div class="form-control">
              <label class="form-control__label" for="name">Project</label>
              <select
                class="form-control__input"
                type="text"
                name="projectId"
                id="projectId"
                .value=${data.projectId}
                ?disabled=${isLoading}
                required
              >
                <option>--</option>
                ${this.projects?.map((p) => {
                  return html`<option value=${p._id} .selected=${p._id === data.projectId}>
                    ${p.name}
                  </option>`;
                })}
              </select>
            </div>`
          : html`<input type="hidden" name="projectId" value=${data.projectId} />`}
        <button class="btn-primary" type="submit" ?disabled=${isLoading}>${submitLabel}</button>
      </form>`;
  }

  static styles = [
    defaultStyles,
    formStyles,
    buttonStyles,
    css`
      .form-control {
        flex-grow: 1;
      }
      .form-control--small {
        max-width: 6rem;
      }
    `,
  ];
}

export default LogForm;
