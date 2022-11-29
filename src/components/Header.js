import React, {useContext, useState, useEffect} from 'react';
import { ThemeContext } from '../ThemeContext';
import { NavLink } from 'react-router-dom';
import "./Header.css"
import axios from "axios";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';


const Header = (props) => {
    const theme = useContext(ThemeContext);
    const darkMode = theme.state.darkMode;
    const {isLoggedin, setIsLoggedin, userStatus, setUserStatus} = props;
    const [collapsed, setCollapsed] = useState(true);
    const [hover, setHover] = useState(false);
    // const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8000/api/current-user", {withCredentials: true})
            .then((res) => {
                // console.log(res.data);
                setUserStatus(res.data);
            })
            .catch((err) => {
                console.log(err)
            });
    }, [isLoggedin]);

    const handleLogout = () => {
        axios.post("http://localhost:8000/logout",{}, {withCredentials: true})
            .then((res) => {
                // console.log(res.data);
                setUserStatus(null);
                setIsLoggedin(false);
            })
            .catch((err) => {
                console.log(err)
            });
    };

    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <div>
            <Navbar className={`bg ${darkMode ? "bg-light" : "bg-dark"}`}>
                <NavbarBrand style={{fontSize: "2.6em"}} className={`text ${darkMode ? "text-dark" : "text-light"}`}>FightClub.gg</NavbarBrand>
                {
                    userStatus? 
                    <NavbarBrand style={{
                        fontSize: "2.6em",
                        margin: "auto"
                    }}
                    className={`text ${darkMode ? "text-dark" : "text-light"}`}>Welcome {userStatus.username}</NavbarBrand>:null
                }
                <NavbarToggler onClick={toggleNavbar} className="me-2" />
                <Collapse isOpen={!collapsed} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink style={{
                                textDecoration: "none",
                                fontSize: "1.4em"
                            }} 
                            className={`text ${darkMode ? "text-dark" : "text-light"}`} to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink style={{
                                textDecoration: "none",
                                fontSize: "1.4em"
                            }} 
                            className={`text ${darkMode ? "text-dark" : "text-light"}`} to="/events/new">Create Event</NavLink>
                        </NavItem>
                        {
                            userStatus ? (
                                <NavItem>
                                    <Button className={`btn ${darkMode? "btn-dark": "btn-light"}`} onClick={handleLogout}>Logout</Button>
                                </NavItem>
                            ): (
                                <div>
                                    <NavItem>
                                        <NavLink style={{
                                            textDecoration: "none",
                                            fontSize: "1.4em"
                                        }} 
                                        className={`text ${darkMode ? "text-dark" : "text-light"}`} to="/login">Login</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink style={{
                                            textDecoration: "none",
                                            fontSize: "1.4em"
                                        }} 
                                        className={`text ${darkMode ? "text-dark" : "text-light"}`} to="/register">Register</NavLink>
                                    </NavItem>
                                </div>
                            )}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default Header;