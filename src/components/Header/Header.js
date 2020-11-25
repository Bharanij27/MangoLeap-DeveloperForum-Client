import React from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { setUser } from '../../common/user';
import './Header.css';

const Header = () => {

    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const history = useHistory();

    const logout = () =>{
        cookies && removeCookie("user", null, { path: "/" });
        setUser(null)
        history.push("/");
    }
    
    return(
        <nav className="navbar navbar-expand-md sticky-top navr-bar p-2">
        <a href="/forum" className="nav-item nav-link f-left">
            <h5>Developer Forum</h5>
        </a>
        <button className="btn btn-dark f-right" onClick={logout}>Logout</button>
    </nav>
    )
}

export default Header;