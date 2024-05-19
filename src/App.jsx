import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { rootReducer } from './store';
import { AuthProvider } from './utilities';
import { AppRoutes } from './routes/app.routes';

function App() {
  return (
    <Provider store={rootReducer}>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
          <Toaster position="top-right" expand={true} richColors />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
