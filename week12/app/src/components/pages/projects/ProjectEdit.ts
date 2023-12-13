import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { updateProject } from "@core/modules/projects/Project.api";
import { Project, ProjectBody } from "@core/modules/projects/Project.types";
import { defaultStyles } from "@styles/styles";

import "@components/pages/projects/form/ProjectForm";
import "@components/design/Typography/PageTitle";
import { consume } from "@lit/context";
import { projectContext } from "./ProjectDetailContainer";

@customElement("project-edit")
class ProjectEdit extends LitElement {
  @consume({ context: projectContext, subscribe: true })
  @property({ attribute: false })
  public project?: Project | null;

  render() {
    const { project } = this;

    if (!project) {
      return html``;
    }

    return html` <app-page-title>Project aanpassen</app-page-title>
      <project-form
        submitLabel="Aanpassen"
        .data=${project}
        .method=${(body: ProjectBody) => updateProject(project._id, body)}
      ></project-form>`;
  }

  static styles = [defaultStyles];
}

export default ProjectEdit;
