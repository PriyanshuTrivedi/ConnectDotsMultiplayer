import './App.css';
import Connect_dots from './components/Connect_dots';
import ConnectDotsMenu from './components/box/ConnectDotsMenu/ConnectDotsMenu';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Header from './components/header/Header';

function App() {
  return (
      <>
        <Router>
          <div className="App">
            <Header/>
            <Routes>
              <Route path='/' element={<ConnectDotsMenu/>}/>
              <Route path='/Game' element={<Connect_dots/>} />
            </Routes>
          </div>
        </Router>
      </>
  );
}

export default App;
