import { createAction, handleActions } from "redux-actions";

const defaultState = {
  isLoading: false
};

const base = "GLOBAL/LOADING";

export const setLoading = createAction(`${base}SET_LOADING`);

const loadingReducer = handleActions(
  {
    [setLoading]: (state, { payload }) => ({
      ...state,
      isLoading: payload
    })
  },
  defaultState
);

export default loadingReducer;