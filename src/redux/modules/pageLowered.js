const LOWER_PAGE_FLAG = 'LOWER_PAGE_FLAG';
const RAISE_PAGE_FLAG = 'RAISE_PAGE_FLAG';
const RESET_PAGE_FLAG = 'RESET_PAGE_FLAG';

export function lowerPageFlag() {
  return {
    type: LOWER_PAGE_FLAG,
  };
}

export function raisePageFlag() {
  return {
    type: RAISE_PAGE_FLAG,
  };
}

export function resetPageFlag() {
  return {
    type: RESET_PAGE_FLAG,
  };
}

export const actions = {
  lowerPageFlag,
  raisePageFlag,
  resetPageFlag,
};

const initialState = null;
export function reducer(state = initialState, { type }) {
  switch (type) {
    case LOWER_PAGE_FLAG:
      return true;

    case RAISE_PAGE_FLAG:
      return false;

    case RESET_PAGE_FLAG:
      return null;

    default:
      return state;
  }
}
