import { ViewProvider } from './context/ViewContext';
import Layout from './components/Layout';
import ViewManager from './components/ViewManager';

function App() {
  return (
    <ViewProvider>
      <Layout>
        <ViewManager />
      </Layout>
    </ViewProvider>
  );
}

export default App;
