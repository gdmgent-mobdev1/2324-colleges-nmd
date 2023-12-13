import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Project } from "@core/modules/projects/Project.types";
import { defaultStyles } from "@styles/styles";
import { consume } from "@lit/context";
import { projectContext } from "./ProjectDetailContainer";

import "@components/design/Typography/PageTitle";

@customElement("project-detail")
class ProjectDetail extends LitElement {
  @consume({ context: projectContext, subscribe: true })
  @property({ attribute: false })
  public project?: Project | null;

  render() {
    const { project } = this;

    if (!project) {
      return html``;
    }

    return html`
      <app-page-title>${project.name}</app-page-title>
      <a href="/projects/${project._id}/edit">Edit</a>

      <ul>
        <li>Log 1</li>
        <li>Log 2</li>
      </ul>
    `;
  }

  static styles = [defaultStyles];
}

export default ProjectDetail;
