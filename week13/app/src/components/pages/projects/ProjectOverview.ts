import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getProjects } from "@core/modules/projects/Project.api";
import { Project } from "@core/modules/projects/Project.types";
import { defaultStyles } from "@styles/styles";

import "@components/design/LoadingIndicator";
import "@components/design/ErrorView";
import "@components/design/Button/Button";
import "@components/design/Header/PageHeader";
import "@components/design/Typography/PageTitle";
import "@components/design/Card/Card";
import "@components/design/Grid/Grid";

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

    let content = html``;
    if (error) {
      content = html`<error-view error=${error} />`;
    } else if (isLoading || !projects) {
      content = html`<loading-indicator></loading-indicator>`;
    } else if (projects.length === 0) {
      content = html`<p>Nog geen projecten</p>`;
    } else {
      content = html` <app-grid>
        ${projects.map((c) => {
          return html`<li><app-card href="/projects/${c._id}">${c.name}</app-card></li>`;
        })}
      </app-grid>`;
    }

    return html` <app-page-header>
        <app-page-title>Projecten</app-page-title>
        <app-button href="/projects/create">Project toevoegen</app-button></app-page-header
      >
      ${content}`;
  }

  static styles = [defaultStyles];
}

export default ProjectOverview;
