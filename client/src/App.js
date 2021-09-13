import './App.css';
import {BrowserRouter,Route} from 'react-router-dom'
import Login from './components/login';
import Navbar from './components/navbar'
import ProtectedResource from './components/protectedResource';
import Register from './components/register';

function App() {
  return (
    <div className="App">
          <BrowserRouter>

          <Navbar />

            <Route exact path="/login">
              <Login />
            </Route>
            
            <Route path="/register">
              <Register />
            </Route>

            <Route path="/protectedResource">
              <ProtectedResource />
            </Route>

      
      </BrowserRouter>
    </div>
  );
}

export default App;
