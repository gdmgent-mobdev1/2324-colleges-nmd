import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";
import userContext from "@components/auth/userContext";
import { User } from "@core/modules/auth/Auth.types";
import { consume } from "@lit/context";
import { DashboardData } from "@core/modules/user/User.types";
import { getDashboardData } from "@core/modules/user/User.api";
import { formatDuration } from "@core/modules/logs/Log.utils";

import "@components/design/Typography/PageTitle";
import "@components/design/Header/PageHeader";
import "@components/design/Grid/Grid";
import "@components/design/Card/AmountCard";

@customElement("app-home")
class Home extends LitElement {
  @consume({ context: userContext, subscribe: true })
  @property({ attribute: false })
  public user?: User | null;
  @property()
  isLoading: boolean = false;
  @property()
  data: DashboardData | null = null;
  @property()
  error: string | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    // todo in api
    getDashboardData()
      .then(({ data }) => {
        this.data = data;
        this.isLoading = false;
      })
      .catch((error) => {
        this.error = error.message;
        this.isLoading = false;
      });
  }

  render() {
    const { user, isLoading, error, data } = this;

    let content = html``;
    if (error) {
      content = html`<error-view error=${error} />`;
    } else if (isLoading || !data) {
      content = html`<loading-indicator></loading-indicator>`;
    } else {
      content = html`<app-grid>
        <app-amount-card title="Projecten" amount=${data.projects} href="/projects"></app-amount-card>
        <app-amount-card title="Klanten" amount=${data.clients} href="/clients"></app-amount-card>
        <app-amount-card
          title="Totaal uren"
          amount=${formatDuration(data.duration)}
          href="/logs"
        ></app-amount-card>
      </app-grid>`;
    }

    return html`
      <app-page-header>
        <app-page-title>Welkom ${user?.name}</app-page-title>
      </app-page-header>
      ${content}
    `;
  }

  static styles = [defaultStyles];
}

export default Home;
