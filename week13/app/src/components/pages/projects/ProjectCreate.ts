import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";
import { createProject } from "@core/modules/projects/Project.api";

import "@components/shared/projects/form/ProjectForm";
import "@components/design/Header/PageHeader";
import "@components/design/Typography/PageTitle";

@customElement("project-create")
class ProjectCreate extends LitElement {
  render() {
    return html` <app-page-header> <app-page-title>Project toevoegen</app-page-title></app-page-header>
      <project-form .method=${createProject}></project-form>`;
  }

  static styles = [defaultStyles];
}

export default ProjectCreate;
