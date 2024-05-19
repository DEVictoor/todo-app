import { createSlice } from '@reduxjs/toolkit';
import { getAll, get, post, put, remove } from '../../api/contacts';
import { adaptObject, adaptArray } from '../../utilities/adapter.utilities';

const initialState = {
  data: [],
  meta: { pagination: { currentPage: 1, limit: 50, from: 0, to: 0, total: 0 } }
};

const index = filter => async dispatch => {
  try {
    const fetching = await getAll(filter);
    if (!fetching || !fetching.data) return null;
    const response = { ...fetching, data: adaptArray(fetching.data) };
    dispatch(set(response));
  } catch (err) {
    console.error(err);
  }
};

const show = id => async dispatch => {
  try {
    const fetching = await get(id);
    if (!fetching || !fetching.data) return null;
    const response = adaptObject(fetching.data);
    dispatch(modify(response));
    return response;
  } catch (err) {
    console.error(err);
  }
};

const store = form => async dispatch => {
  try {
    const fetching = await post(form);
    if (!fetching || !fetching.data) return null;
    const response = adaptObject(fetching.data);
    dispatch(insert(response));
    return response;
  } catch (err) {
    console.error(err);
  }
};

const update = (id, form) => async dispatch => {
  try {
    const fetching = await put(id, form);
    if (!fetching && !fetching.data) return null;
    const response = adaptObject(fetching.data);
    dispatch(modify(response));
    return response;
  } catch (err) {
    console.error(err);
  }
};

const destroy = id => async dispatch => {
  try {
    const fetching = await remove(id);
    if (!fetching && !fetching.data) return null;
    const response = adaptObject(fetching.data);
    dispatch(exclude(id));
    return response;
  } catch (err) {
    console.error(err);
  }
};

const add = data => dispatch => dispatch(insert(adaptObject(data)));
const edit = data => dispatch => dispatch(modify(adaptObject(data)));
const erase = data => dispatch => dispatch(exclude(adaptObject(data).id));

const slice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    set: (state, action) => {
      state.data = action.payload.data;
      state.meta = action.payload.meta;
    },
    insert: (state, action) => {
      const index = state.data.findIndex(item => item.id === action.payload.id);
      if (index === -1) state.data = [action.payload, ...state.data];
    },
    modify: (state, action) => {
      const index = state.data.findIndex(item => item.id === action.payload.id);
      if (index !== -1) state.data[index] = action.payload;
    },
    exclude: (state, action) => {
      state.data = state.data.filter(item => item.id !== action.payload);
    }
  }
});

export { index, show, store, update, destroy, add, edit, erase };
export const { set, insert, modify, exclude } = slice.actions;
export default slice;
