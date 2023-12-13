import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";
import { createProject } from "@core/modules/projects/Project.api";

import "@components/pages/projects/form/ProjectForm";
import "@components/design/Typography/PageTitle";

@customElement("project-create")
class ProjectCreate extends LitElement {
  render() {
    return html` <app-page-title>Project toevoegen</app-page-title>
      <project-form .method=${createProject}></project-form>`;
  }

  static styles = [defaultStyles];
}

export default ProjectCreate;
