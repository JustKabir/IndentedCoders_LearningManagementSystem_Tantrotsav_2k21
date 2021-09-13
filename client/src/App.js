import './App.css';
import { useEffect, createContext, useReducer, useContext } from 'react';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Login from './components/login';
import Navbar from './components/navbar'
import ProtectedResource from './components/protectedResource';
import Register from './components/register';
import {reducer,initialState} from './reducers/userReducer'

export const UserContext = createContext()

const Routing = ()=>{

  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      history.push("/protectedResource")
    }else{
      history.push("/login")
    }
  },[])
  return(
    <Switch>
        <Route exact path="/login">
        <Login />
      </Route>
      
      <Route path="/register">
        <Register />
      </Route>

      <Route path="/protectedResource">
        <ProtectedResource />
      </Route>
      </Switch>
  )
}

function App() {

  const [ state, dispatch ] = useReducer(reducer,initialState)

  return (
    <UserContext.Provider value={{state,dispatch}}>
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Routing/>
      </BrowserRouter>
    </div>
    </UserContext.Provider>
  );
}

export default App;
