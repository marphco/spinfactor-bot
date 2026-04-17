import { BrowserRouter } from 'react-router-dom';
import { ViewProvider } from './context/ViewContext';
import Layout from './components/Layout';
import ViewManager from './components/ViewManager';

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ViewProvider>
        <Layout>
          <ViewManager />
        </Layout>
      </ViewProvider>
    </BrowserRouter>
  );
}

export default App;
