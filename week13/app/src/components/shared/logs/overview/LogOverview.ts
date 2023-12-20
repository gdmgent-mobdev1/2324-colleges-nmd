import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createLog, getLogs, updateLog } from "@core/modules/logs/Log.api";
import { Log } from "@core/modules/logs/Log.types";
import { format, parseISO } from "date-fns";
import { formatDuration } from "@core/modules/logs/Log.utils";
import { LogBody } from "@core/modules/logs/Log.types";

import "@components/design/LoadingIndicator";
import "@components/design/ErrorView";
import "@components/design/Button/Button";
import "@components/design/Header/PageHeader";
import "@components/design/Typography/PageTitle";
import "@components/shared/logs/form/LogForm";
import { defaultStyles, dialogStyles, tableStyles } from "@styles/styles";
import isVoid from "@core/utils/isVoid";

@customElement("log-overview-view")
class LogOverviewView extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  logs: Array<Log> | null = null;
  @property()
  error: string | null = null;

  @property()
  projectId: string | null = null;

  @property()
  editLog: Log | null = null;

  get $dialog() {
    return (this.renderRoot?.querySelector("#log-dialog") as HTMLDialogElement) ?? null;
  }

  // called when the element is first connected to the document’s DOM
  connectedCallback(): void {
    super.connectedCallback();
    this.fetchItems();
  }

  fetchItems() {
    this.isLoading = true;

    let filters = {};
    if (this.projectId) {
      filters = { projectId: this.projectId };
    }

    getLogs(filters)
      .then(({ data }) => {
        this.logs = data;
        this.isLoading = false;
      })
      .catch((error) => {
        this.error = error.message;
        this.isLoading = false;
      });
  }

  handleAddLog = () => {
    this.fetchItems();
  };

  handleEditClick = (log: Log) => {
    this.editLog = log;
    this.$dialog?.showModal();
  };

  handleEditLogSuccess = () => {
    this.$dialog?.close();
    this.editLog = null;
    this.fetchItems();
  };

  render() {
    const {
      isLoading,
      logs,
      error,
      handleAddLog,
      editLog,
      handleEditLogSuccess,
      handleEditClick,
      projectId,
    } = this;

    const showProject = isVoid(projectId);

    let content = html``;

    if (error) {
      content = html`<error-view error=${error} />`;
    } else if (isLoading || !logs) {
      content = html`<loading-indicator></loading-indicator>`;
    } else if (logs.length === 0) {
      content = html`<p>Nog geen tijdsregistraties</p>`;
    } else {
      content = html` <table class="table">
        <thead>
          <th>Beschrijving</th>
          <th>Datum</th>
          <th>Duur</th>
          ${showProject ? html`<th>Project</th>` : ""}
          <th></th>
        </thead>
        <tbody>
          ${logs.map((l) => {
            return html`
              <tr>
                <td>${l.description}</td>
                <td>${format(parseISO(l.date), "yyyy-MM-dd")}</td>
                <td>${formatDuration(l.duration)}</td>
                ${showProject
                  ? html`<td>
                      <a href="/projects/${l.project?._id}" title="${l.project?.name}">${l.project?.name}</a>
                    </td>`
                  : ""}
                <td><button @click=${() => handleEditClick(l)}>Edit</button></td>
              </tr>
            `;
          })}
        </tbody>
      </table>`;
    }

    return html`
      <log-form
        .onSuccess=${handleAddLog}
        .data=${{
          projectId: projectId ?? "",
          description: "",
          duration: 0,
          date: format(new Date(), "yyyy-MM-dd"),
        }}
        .showProject=${showProject}
        .method=${createLog}
      ></log-form>
      ${content}
      <dialog id="log-dialog">
        <form>
          <button value="cancel" formmethod="dialog">X</button>
        </form>
        ${editLog
          ? html`<log-form
              .inline=${false}
              .data=${editLog}
              .onSuccess=${handleEditLogSuccess}
              .method=${(body: LogBody) => updateLog(editLog._id, body)}
              submitLabel="Aanpassen"
            ></log-form>`
          : ""}
      </dialog>
    `;
  }

  static styles = [
    defaultStyles,
    tableStyles,
    dialogStyles,
    css`
      .table {
        margin-top: 2rem;
      }
    `,
  ];
}

export default LogOverviewView;
