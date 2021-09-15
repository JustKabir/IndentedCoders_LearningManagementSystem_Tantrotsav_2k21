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
        style={{lineHeight:'9vmin'}}
        >
          Log Out
        </a></li>
      ]
    }
  }

  return (
    <div>
      <nav style={{ backgroundColor: '#11CBD7', height:'9vmin'}}>
        <div className="nav-wrapper" style={{margin: 'auto 10%'}}>
          <Link to="#!" className="brand-logo" style={{fontFamily:'Pacifico', lineHeight:'9vmin'}}>Learn IT</Link>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down" style={{marginRight:'5%'}}>
            {renderList()}
          </ul>
        </div>
      </nav>

    </div>
  );
}

export default Navbar;