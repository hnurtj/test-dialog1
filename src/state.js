import { createSlice, configureStore } from '@reduxjs/toolkit';

export const { actions: appSliceActions, reducer: appSliceReducers } = createSlice({
	name: 'app',
	initialState: {
		page: '',
	},
	reducers: {
		updatePage: (state, page) => {
			state.page = page;
		}
	}
})

const { updatePage } = appSliceActions;

export const navigate = (path) => (dispatch) => {
  const page = path === '/' ? '/' : path.slice(1);
  dispatch(loadPage(page));
}

const loadPage = (page) => (dispatch) => {
	switch(page) {
		case "/":
			break;
		case 'dialogs':
			import('./element-with-dialog.js');
			break;

    default:
      page = 'view404';
      import('./my-view404.js');
  }

  dispatch(updatePage(page));
};

const store = configureStore({
	reducer: {
		app: appSliceReducers
	}
});

export { store, updatePage };
