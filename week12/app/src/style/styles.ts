import { css } from "lit";

export const defaultStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  * {
    margin: 0;
  }

  a {
    color: inherit;
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  input {
    display: block;
  }
`;

// styles we need for the button and input components since they need to be direct children of form
export const buttonStyles = css`
  .btn-primary {
    display: inline-block;
    margin: 0.5rem 0 0.75rem 0;
    padding: 0.75rem 1rem;

    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: var(--border-radius);
    font-weight: var(--font-weight-bold);

    cursor: pointer;

    text-decoration: none;
  }

  .btn-primary:hover {
    opacity: 0.9;
  }
`;

export const inputStyles = css`
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
`;
