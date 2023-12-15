import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";
import { consume } from "@lit/context";
import { ProjectContext, projectContext } from "./ProjectDetailContainer";

import "@components/design/Typography/PageTitle";
import "@components/design/Button/Button";
import "@components/design/Header/PageHeader";
import "@components/design/Typography/PageTitle";

@customElement("project-detail")
class ProjectDetail extends LitElement {
  @consume({ context: projectContext, subscribe: true })
  @property({ attribute: false })
  public projectContextValue?: ProjectContext | null;

  render() {
    const { projectContextValue } = this;

    if (!projectContextValue || !projectContextValue.project) {
      return html``;
    }

    const { project } = projectContextValue;

    return html`
      <app-page-header>
        <app-page-title>${project.name}</app-page-title>
        <app-button href="/projects/${project._id}/edit" color="secondary">Aanpassen</app-button>
      </app-page-header>
    `;
  }

  static styles = [defaultStyles];
}

export default ProjectDetail;
