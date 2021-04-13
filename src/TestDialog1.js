import { LitElement, html, css } from 'lit-element';
import { installRouter } from 'pwa-helpers';
import { updateMetadata } from 'pwa-helpers/metadata.js';
import { connect } from 'pwa-helpers/connect-mixin';
import { store, navigate } from './state.js';
import '@material/mwc-button';

export class TestDialog1 extends connect(store)(LitElement) {
  static get properties() {
    return {
      title: { type: String },
			_page: { type: String }
    };
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: 16px;
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
        background-color: #ededed;
      }
      main {
        flex-grow: 1;
      }
			.page {
				display: none;
			}
			.page[active] {
				display: block;
			}
    `;
  }

  constructor() {
    super();
    this.title = 'My app';
		this._page = "home";
  }

  render() {
    return html`
      <main>
        <h1>${this.title}</h1>

        <a href='dialogs'>Click to open element with dialog</a>
				<br><br><br>
				<a href="#">Test link</a>
				<br><br>
				<mwc-button @click=${e => alert("Test Button is clicked")}>Test Button</mwc-button>

				<element-with-dialog class="page" ?active=${this._page === 'dialogs'}></element-with-dialog>
      </main>
    `;
  }

	firstUpdated() {
		installRouter((location) => store.dispatch(navigate(decodeURIComponent(location.pathname))));
	}

	updated(changedProps) {
		if (changedProps.has('_page')) {
      const pageTitle = this.title + ' - ' + this._page;
      updateMetadata({
        title: pageTitle,
        description: pageTitle
			});
    }
	}

	stateChanged(state) {
		this._page = state.app.page.payload;
	}

}
