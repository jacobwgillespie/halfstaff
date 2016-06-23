import fetch from 'isomorphic-fetch';

const API_HOST = 'https://raw.githubusercontent.com/jacobwgillespie/halfstaff';

const NOTICE_LOADED = 'NOTICE_LOADED';

export function noticeLoaded(payload) {
  return {
    type: NOTICE_LOADED,
    payload,
  };
}

export function fetchNotice(id) {
  const uri = `${API_HOST}/master/data/notices/${id}.json`;
  return dispatch => fetch(uri).then(
    res => res.json()
  ).then(
    res => dispatch(noticeLoaded(res))
  );
}

export const actions = {
  fetchNotice,
  noticeLoaded,
};

const initialState = {
  recent: [],
  notices: {},
};

export function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case NOTICE_LOADED:
      return {
        ...state,
        notices: {
          ...state.notices,
          [payload.id]: payload,
        },
      };

    default:
      return state;
  }
}
