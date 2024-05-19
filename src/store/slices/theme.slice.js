import { createSlice } from '@reduxjs/toolkit';

const element = document.documentElement;
const initialState = {
  current: 'light'
};

const setTheme = string => async dispatch => {
  switch (string) {
    case 'dark':
      element.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      break;
    case 'light':
      element.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      break;
    default:
      element.classList.remove('dark');
      localStorage.removeItem('theme');
      break;
  }

  dispatch(set(string));
};

const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    set: (state, action) => {
      state.current = action.payload;
    }
  }
});

export { setTheme };
export const { set } = slice.actions;
export default slice;
