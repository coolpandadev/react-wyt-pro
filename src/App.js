import './App.css';
import { Routes, Route} from 'react-router-dom';


function App() {
  return (
    <SessionContextProvider>
      <Routes>
        <Route path="/" element={<Leagues />}>
          <Route path=":league" element={<League />} >
            <Route path="trades" element={<Trades />} >
              <Route path=":trade" element={<Trade />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </SessionContextProvider>
  );
}

export default App;
