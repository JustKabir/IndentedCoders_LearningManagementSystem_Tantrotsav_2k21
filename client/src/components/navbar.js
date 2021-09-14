import { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'

function Navbar() {
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
  const type = localStorage.getItem("type")
  const renderList = () => {
    if (state) {
      return [
        <li><a onClick={() => {
          localStorage.clear()
          dispatch({ type: "CLEAR" })
          history.push('/')
        }}
        
        >
          Log Out
        </a></li>
      ]
    }
  }

  return (
    <div>
      <nav style={{ backgroundColor: '#2196f3' }}>
        <div className="container nav-wrapper ">
          <Link to="#!" className="brand-logo " style={{fontFamily:'Pacifico'}}>Learn IT</Link>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down">
            {renderList()}
          </ul>
        </div>
      </nav>

    </div>
  );
}

export default Navbar;