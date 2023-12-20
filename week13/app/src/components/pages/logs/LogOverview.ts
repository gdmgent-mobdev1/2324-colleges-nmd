import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";

import "@components/design/Header/PageHeader";
import "@components/design/Typography/PageTitle";
import "@components/shared/logs/overview/LogOverview";

@customElement("log-overview")
class LogOverview extends LitElement {
  render() {
    return html` <app-page-header>
        <app-page-title>Tijdregistratie</app-page-title>
      </app-page-header>
      <log-overview-view></log-overview-view>`;
  }

  static styles = [defaultStyles];
}

export default LogOverview;
