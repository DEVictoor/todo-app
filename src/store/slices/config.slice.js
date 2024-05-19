import { createSlice } from '@reduxjs/toolkit';
import { getAll, put } from '../../api/config';
import { adaptObject } from '../../utilities/adapter.utilities';

const initialState = {
  data: null
};

const index = filter => async dispatch => {
  try {
    const fetching = await getAll(filter);
    if (!fetching) return null;
    const response = { data: adaptObject(fetching) };
    dispatch(set(response));
  } catch (err) {
    console.error(err);
  }
};

const update = form => async dispatch => {
  try {
    const fetching = await put(form);
    if (!fetching && !fetching.data) return null;
    const response = adaptObject(fetching);
    dispatch(modify(response));
    return response;
  } catch (err) {
    console.error(err);
  }
};

const add = data => dispatch => dispatch(insert(adaptObject(data)));
const edit = data => dispatch => dispatch(modify(adaptObject(data)));
const erase = data => dispatch => dispatch(exclude(adaptObject(data).id));

const slice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    set: (state, action) => {
      state.data = action.payload.data;
      state.meta = action.payload.meta;
    },
    insert: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index === -1) state = [action.payload, ...state];
    },
    modify: (state, action) => {
      state.data = action.payload.data;
    },
    exclude: (state, action) => {
      state = state.filter(item => item.id !== action.payload);
    }
  }
});

export { index, update, add, edit, erase };
export const { set, insert, modify, exclude } = slice.actions;
export default slice;
