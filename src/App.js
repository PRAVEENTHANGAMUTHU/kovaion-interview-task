import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Create from './components/Create/Create';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Create />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
