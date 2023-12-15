import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getProjects } from "@core/modules/projects/Project.api";
import { Project } from "@core/modules/projects/Project.types";

import "@components/design/LoadingIndicator";
import "@components/design/ErrorView";
import "@components/design/Button/Button";
import "@components/design/Typography/PageTitle";
import { defaultStyles } from "@styles/styles";

@customElement("project-overview")
class ProjectOverview extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  projects: Array<Project> | null = null;
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
    getProjects()
      .then(({ data }) => {
        this.projects = data;
        this.isLoading = false;
      })
      .catch((error) => {
        this.error = error.message;
        this.isLoading = false;
      });
  }

  render() {
    const { isLoading, projects, error } = this;

    if (error) {
      return html`<error-view error=${error} />`;
    }

    if (isLoading || !projects) {
      return html`<loading-indicator></loading-indicator>`;
    }

    return html` <app-page-title>Projects</app-page-title>
      <ul>
        ${projects.map((c) => {
          return html`
            <li>
              <a href="/projects/${c._id}">${c.name}</a>
            </li>
          `;
        })}
      </ul>
      <app-button href="/projects/create">Project toevoegen</app-button>`;
  }

  static styles = [defaultStyles];
}

export default ProjectOverview;
