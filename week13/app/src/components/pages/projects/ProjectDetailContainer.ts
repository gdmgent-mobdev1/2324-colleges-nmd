import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getProjectById } from "@core/modules/projects/Project.api";
import { Project } from "@core/modules/projects/Project.types";
import { router } from "@core/router";
import { defaultStyles } from "@styles/styles";
import { createContext, provide } from "@lit/context";

import "@components/design/LoadingIndicator";
import "@components/design/ErrorView";

export type ProjectContext = {
  project: Project | null;
  refresh: () => void;
};

export const projectContext = createContext<ProjectContext | null>("project");

@customElement("project-detail-container")
class ProjectDetailContainer extends LitElement {
  @property()
  isLoading: boolean = false;
  @provide({ context: projectContext })
  projectContext: ProjectContext | null = null;
  @property()
  error: string | null = null;

  @property({ type: Object }) location = router.location;

  // called when the element is first connected to the document’s DOM
  connectedCallback(): void {
    super.connectedCallback();
    this.projectContext = {
      project: null,
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
    getProjectById(this.location.params.id)
      .then(({ data }) => {
        this.projectContext = {
          project: data,
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
    const { isLoading, projectContext, error } = this;

    if (!projectContext) {
      return html``;
    }

    const { project } = projectContext;

    if (error) {
      return html`<error-view error=${error} />`;
    }

    if (isLoading || !project) {
      return html`<loading-indicator></loading-indicator>`;
    }

    return html`<slot></slot>`;
  }

  static styles = [defaultStyles];
}

export default ProjectDetailContainer;
