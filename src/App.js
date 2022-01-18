import './App.css';
import { Routes, Route} from 'react-router-dom';
import SessionContextProvider from './contexts/SessionContext';
import Layout from './parts/Layout';
import Home from './pages/Home';
import Leagues from './pages/Leagues';
import Trades from './pages/Trades';
import Trade from './pages/Trade';
import NoMatch from './pages/NoMatch';

function App() {
  return (
    <SessionContextProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path="leagues" element={<Leagues />}>
            <Route path=":league" element={<Trades />} >
              <Route path=":trade" element={<Trade />} />
            </Route>
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </SessionContextProvider>
  );
}

export default App;
