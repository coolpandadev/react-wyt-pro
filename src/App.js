import './App.css';
import { Routes, Route } from 'react-router-dom';
import SessionContextProvider from './contexts/SessionContext';
import Layout from './parts/Layout';
import Home from './pages/Home';
import Leagues from './pages/Leagues';
import Trades from './pages/Trades';
import Trade from './pages/Trade';
import NoMatch from './pages/NoMatch';
import Callback from './pages/Callback'
import NewTrade from './pages/NewTrade';
import EditTrade from './pages/EditTrade';
import { Toaster } from 'react-hot-toast';
import ExpiredTrade from './pages/ExpiredTrade';


function App() {
  return (
    <SessionContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="leagues" element={<Leagues />} />
          <Route path="trades/:leagueKey" element={<Trades />} />
          <Route path="trades/:leagueKey/new" element={<NewTrade />} />
          <Route path="trade/:tradeId" element={<Trade />} />
          <Route path="trade/:tradeId/edit" element={<EditTrade />} />
          <Route path="trade/expired" element={<ExpiredTrade />} />
          <Route path="callback" element={<Callback />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      <Toaster position='top-center'
        toastOptions={{
          duration: 3000,
          className: 'p-3 font-body uppercase font-thin',
          style: {
            backgroundColor: '#334155',
            color: 'white',
          },
        }} />
    </SessionContextProvider>
  );
}

export default App;
