import { createSlice } from '@reduxjs/toolkit';
import { getAll, get, post, put, remove } from '../../api/folders';
import { adaptObject, adaptArray } from '../../utilities/adapter.utilities';

const initialState = {
  content: {},
  meta: { files: 0, folder: 0, sizeTotal: 0 }
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
    dispatch(set(fetching));
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
  name: 'folder',
  initialState,
  reducers: {
    set: (state, action) => {
      state.content = action.payload.data;
      state.meta = action.payload.meta;
    },
    insert: (state, action) => {
      const index = state.content.folders.findIndex(
        item => item.id === action.payload.id
      );
      if (index === -1)
        state.content.folders = [action.payload, ...state.content.folders];
    },
    modify: (state, action) => {
      const index = state.content.folders.findIndex(
        item => item.id === action.payload.id
      );
      if (index !== -1) state.content.folders[index] = action.payload;
    },
    exclude: (state, action) => {
      state.content.folders = state.content.folders.filter(
        item => item.id !== action.payload
      );
    }
  }
});

export { index, show, store, update, destroy, add, edit, erase };
export const { set, insert, modify, exclude } = slice.actions;
export default slice;
