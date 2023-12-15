import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { updateProject } from "@core/modules/projects/Project.api";
import { ProjectBody } from "@core/modules/projects/Project.types";
import { defaultStyles } from "@styles/styles";
import { consume } from "@lit/context";
import { ProjectContext, projectContext } from "./ProjectDetailContainer";

import "@components/shared/projects/form/ProjectForm";
import "@components/design/Typography/PageTitle";
import "@components/design/Header/PageHeader";

@customElement("project-edit")
class ProjectEdit extends LitElement {
  @consume({ context: projectContext, subscribe: true })
  @property({ attribute: false })
  public projectContextValue?: ProjectContext | null;

  handleSuccess = () => {
    const { projectContextValue } = this;

    if (projectContextValue) {
      projectContextValue.refresh();
    }
  };

  render() {
    const { projectContextValue, handleSuccess } = this;

    if (!projectContextValue || !projectContextValue.project) {
      return html``;
    }

    const { project } = projectContextValue;

    return html` <app-page-header>
        <app-page-title>Project aanpassen</app-page-title>
      </app-page-header>
      <project-form
        submitLabel="Aanpassen"
        .data=${project}
        .onSuccess=${handleSuccess}
        .method=${(body: ProjectBody) => updateProject(project._id, body)}
      ></project-form>`;
  }

  static styles = [defaultStyles];
}

export default ProjectEdit;
