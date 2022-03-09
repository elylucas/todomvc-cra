import './App.css';
import 'todomvc-app-css/index.css'
import MainSection from './components/MainSection';
import { TodosProvider } from './components/TodosProvider';

const App = () => (
  <TodosProvider>
    <div>
      <MainSection />
    </div>
  </TodosProvider>
);

export default App;
