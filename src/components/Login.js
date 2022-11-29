import React, {useState, useContext} from 'react';
import { ThemeContext } from '../ThemeContext';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {Form, FormGroup, Input, Label, Button} from "reactstrap";

const Login = (props) => {
    const theme = useContext(ThemeContext);
    const darkMode = theme.state.darkMode;
    const {user, setUser, setIsLoggedin} = props;
    const navigate = useNavigate();
    // const [user, setUser] = useState({
    //     email: "",
    //     password: "",
    // });

    // const {user, setUser} = props;
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/login", user, {withCredentials: true})
            .then((res) => {
                console.log(res.data.successMessage);
                setIsLoggedin(true);
                navigate("/");
            })
            .catch((err) => {
                console.log(err.response.data)
                setErrors(err.response.data);
            }); 
    }

    return (
        <div className=' row g-5 mx-auto mt-5 d-flex flex-column justify-content-center'>
            <Form className='col-4 p-4 mx-auto' onSubmit={handleSubmit}>
                <h2 style={{
                    marginBottom: "25px"
                }} className={`text ${darkMode ? "text-light" : "text-dark"}`}>Log into your account!</h2>
                <FormGroup floating>
                    <Input id="email" name="email" placeholder='Email' value={user.email} type="email" onChange={handleChange} required />
                    <Label for="email">Email</Label>
                </FormGroup>
                {' '}
                <FormGroup floating>
                    <Input id="password" name="password" placeholder="Password" value={user.password} type="password" onChange={handleChange} required />
                    {errors.error && <p className='mt-4' style={{color: "red"}}>{errors.error}</p>}
                    <Label for="password">Password</Label>
                </FormGroup>
                {' '}
                <FormGroup className='d-flex justify-content-between align-items-end'>
                    <Button className={`btn ${darkMode? "btn-light": "btn-dark"}`}>Login</Button>
                    <Link style={{
                        fontSize: "1.4em",
                        textDecoration: "none"
                    }} className={`text ${darkMode ? "text-light" : "text-dark"}`} to={"/register"}>Don't have an account?</Link>
                </FormGroup>
            </Form>
        </div>
    );
};

export default Login;