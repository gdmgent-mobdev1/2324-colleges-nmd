import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";

@customElement("app-input")
class Input extends LitElement {
  @property()
  label: string = "";

  @property()
  type: string = "text";

  @property()
  name: string = "";

  @property()
  value: string = "";

  @property()
  placeholder: string = "";

  @property()
  disabled: boolean = false;

  @property()
  handleChange: (input: HTMLInputElement) => void = () => {};

  private handleInputChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    this.handleChange(input);
  };

  render() {
    const { type, label, name, value, placeholder, handleInputChange, disabled } = this;
    return html`<div class="form-control">
      <label class="form-control__label" for=${name}>${label}</label>
      <input
        class="form-control__input"
        type=${type}
        name=${name}
        id=${name}
        @change=${handleInputChange}
        .value="${value}"
        placeholder=${placeholder}
        ?disabled=${disabled}
      />
    </div>`;
  }

  static styles = [
    defaultStyles,
    css`
      .form-control {
        margin: 0.5rem 0 0.75rem 0;
      }
      .form-control__label {
        display: block;
        margin-bottom: 0.25rem;
      }
      .form-control__input {
        display: block;
        padding: 0.75rem 1rem;
        width: 100%;

        max-width: 36rem;

        border: none;
        border-radius: var(--border-radius);
      }
    `,
  ];
}

export default Input;
