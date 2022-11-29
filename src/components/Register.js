import React, {useState, useContext} from 'react';
import { ThemeContext } from '../ThemeContext';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {Form, FormGroup, Input, Label, Button} from "reactstrap";

const Register = (props) => {
    const theme = useContext(ThemeContext);
    const darkMode = theme.state.darkMode;
    const {setIsLoggedin} = props;
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/register", user, {withCredentials: true})
            .then((res) => {
                console.log(res.data);
                setIsLoggedin(true);
                navigate("/");
            })
            .catch((err) => {
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors);
            });
    }

    return (
        <div className=' row g-5 mx-auto mt-5'>
            <Form className='col-4 p-4 mx-auto' onSubmit={handleSubmit}>
                <h2 style={{
                    marginBottom: "25px"
                }} className={`text ${darkMode ? "text-light" : "text-dark"}`}>Register your FightClub account!</h2>
                <FormGroup floating>
                    <Input id="username" name="username" placeholder='Username' value={user.username} type="text" onChange={handleChange} required />
                    {errors.username && <p className='mt-2 ms-2' style={{color: "red"}}>{errors.username.message}</p>}
                    <Label for="username">Username</Label>
                </FormGroup>
                {' '}
                <FormGroup floating>
                    <Input id="email" name="email" placeholder='Email' value={user.email} type="email" onChange={handleChange} required />
                    {errors.email && <p className='mt-2 ms-2' style={{color: "red"}}>{errors.email.message}</p>}
                    <Label for="email">Email</Label>
                </FormGroup>
                {' '}
                <FormGroup floating>
                    <Input id="password" name="password" placeholder="Password" value={user.password} type="password" onChange={handleChange} required />
                    {errors.password && <p className='mt-2 ms-2' style={{color: "red"}}>{errors.password.message}</p>}
                    <Label for="password">Password</Label>
                </FormGroup>
                {' '}
                <FormGroup floating>
                    <Input id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" value={user.confirmPassword} type="password" onChange={handleChange} required />
                    {errors.confirmPassword && <p className='mt-2 ms-2' style={{color: "red"}}>{errors.confirmPassword.message}</p>}
                    <Label for="confirmPassword">Confirm Password</Label>
                </FormGroup>
                {' '}
                <FormGroup className='d-flex justify-content-between align-items-end'>
                    <Button className={`btn ${darkMode? "btn-light": "btn-dark"}`}>Register</Button>
                    <Link style={{
                        fontSize: "1.4em",
                        textDecoration: "none"
                    }} className={`text ${darkMode ? "text-light" : "text-dark"}`} to={"/login"}>Already have an account?</Link>
                </FormGroup>
            </Form>
        </div>
    );
};

export default Register;