import React, {useContext, useState} from 'react';
import { ThemeContext } from '../ThemeContext';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {Form, FormGroup, Input, Label, Button} from "reactstrap";


const EventNew = (props) => {
    const theme = useContext(ThemeContext);
    const darkMode = theme.state.darkMode;
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [game, setGame] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/events", {
            name,
            game,
            startDate,
            endDate,
            description
        },
        {withCredentials: true})
            .then((res) => {
                console.log(res.data);
                navigate("/");
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrors(err.response.data);
            });
    }

    return (
        <div className=' row g-5 mx-auto mt-5'>
            <Form className='col-4 p-4 mx-auto' onSubmit={submitHandler}>
                <h2 className={`text ${darkMode ? "text-light" : "text-dark"}`}>Create a New Event</h2>
                {errors && <p style={{color: "red"}} className='mb-4'>{errors.message}</p>}
                <FormGroup floating>
                    <Input id="name" name='name' placeholder='Event Name' value={name} type="text" onChange={(e) => setName(e.target.value)} required/>
                    <Label for="name">Event Name</Label>
                </FormGroup>
                {' '}
                <FormGroup floating>
                    <Input id="game" name='game' placeholder="Game Name" value={game} type="text" onChange={(e) => setGame(e.target.value)} required/>
                    <Label for="game">Game Name</Label>
                </FormGroup>
                {' '}
                <FormGroup floating>
                    <Input id="startDate" name='startDate' type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required/>
                    <Label for="startDate">Start Date</Label>
                </FormGroup>
                {' '}
                <FormGroup floating>
                    <Input id="endDate" name='endDate' type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required/>
                    <Label for="endDate">End Date</Label>
                </FormGroup>
                {' '}
                <FormGroup floating>
                    <Input id="description" name='description' placeholder='Event Description' value={description} type="textarea" onChange={(e) => setDescription(e.target.value)} required/>
                    <Label for="description">Event Description</Label>
                </FormGroup>
                {' '}
                <Button className={`btn ${darkMode? "btn-light": "btn-dark"}`}>Submit</Button>
            </Form>
        </div>
    );
};

export default EventNew;