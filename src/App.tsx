import Router from './router'
import { ContextWrapper } from './context/contextWrapper';

function App() {
  return (
    <div className="App">
      <ContextWrapper>
        <Router />
      </ContextWrapper>
    </div>
  );
}

export default App;
