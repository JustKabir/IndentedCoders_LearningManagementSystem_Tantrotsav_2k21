import './App.css';
import { useEffect, createContext, useReducer, useContext } from 'react';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Login from './components/login';
import Navbar from './components/navbar'
import ProtectedResource from './components/protectedResource';
import Register from './components/register';
import {reducer,initialState} from './reducers/userReducer'
import CreateClass from './components/createClass';
import AllClass from './components/allClass';
import EditClass from './components/editClass';
import AddStudents from './components/addStudents';
export const UserContext = createContext()

const Routing = ()=>{

  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      history.push("/allClass")
    }else{
      history.push("/")
    }
  },[])
  return(
    <Switch>
        <Route exact path="/">
        <Login />
      </Route>

      <Route path="/protectedResource">
        <ProtectedResource />
      </Route>
      <Route path="/registerTeacher">
        <Register/>
      </Route>
      <Route path="/createClass">
        <CreateClass/>
      </Route>
      <Route path="/allClass">
        <AllClass/>
      </Route>
      <Route path="/class/:id">
        <EditClass/>
      </Route>
      <Route path="/addStudents">
        <AddStudents/>
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
