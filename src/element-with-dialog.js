import { LitElement, html, css } from 'lit-element';
import '@material/mwc-button';
import '@material/mwc-dialog';

export class elementWithDialog extends LitElement {
  static get properties() {
    return {
      title: { type: String },
    };
  }

  static get styles() {
    return css`
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div style="margin-top:32px">
        <p>This element can open a dialog</p>

        Click the following button to open a dialog:<br>
				<mwc-button raised @click=${e => this.openDialog(e)}>Open dialog</mwc-button>
        
      </div>

			<mwc-dialog id="my-test-dialog">
				<p>Press browser's 'back' button now</p>

				<mwc-button red slot="primaryAction" dialogAction="close">Ok</mwc-button>

				<mwc-button slot="secondaryAction" dialogAction="close">Cancel</mwc-button>

			</mwc-dialog>
    `;
  }

	openDialog(e) {
		this.shadowRoot.getElementById("my-test-dialog").show();
	}
}

window.customElements.define('element-with-dialog', elementWithDialog);