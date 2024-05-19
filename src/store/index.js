import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './slices/theme.slice';
import rolesSlice from './slices/role.slice';
import usersSlice from './slices/user.slice';
import configSlice from './slices/config.slice';
import teamSlice from './slices/team.slice';
import heroSlice from './slices/hero.slice';
import articlesSlice from './slices/article.slice';
import informationSlice from './slices/information.slice';
import contactSlice from './slices/contact.slice';
import taskSlice from './slices/task.slice';
import newsletterSlice from './slices/newsletter.slice';
import categorySlice from './slices/category.slice';

const rootReducer = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    role: rolesSlice.reducer,
    user: usersSlice.reducer,
    config: configSlice.reducer,
    team: teamSlice.reducer,
    hero: heroSlice.reducer,
    article: articlesSlice.reducer,
    information: informationSlice.reducer,
    category: categorySlice.reducer,
    newsletter: newsletterSlice.reducer,
    task: taskSlice.reducer,
    contact: contactSlice.reducer
  }
});

export { rootReducer };
