import React, {useState, useEffect, useContext} from 'react';
import { ThemeContext } from '../ThemeContext';
import axios from "axios";
import moment from 'moment';
import {Link, useParams, useNavigate} from "react-router-dom";
import {Form, FormGroup, Input, Label, Button} from "reactstrap";

const EventEdit = (props) => {
    const theme = useContext(ThemeContext);
    const darkMode = theme.state.darkMode;
    const {id} = useParams();
    const navigate = useNavigate();
    const [currentName, setCurrentName] = useState("");
    const [name, setName] = useState("");
    const [game, setGame] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8000/api/events/" + id)
            .then((res) => {
                console.log(res.data);
                setCurrentName(res.data.name);
                setName(res.data.name);
                setGame(res.data.game);
                setStartDate(res.data.startDate);
                setEndDate(res.data.endDate);
                setDescription(res.data.description);
            })
            .catch((err) => {
                console.log(err.response.data.error.errors);
                setErrors(err.response.data.error.errors);
            });
    }, [id]);
    
    const submitHandler = (e) => {
        e.preventDefault();
        axios.put("http://localhost:8000/api/events/" + id, {
            name,
            game,
            startDate,
            endDate,
            description
        })
            .then((res) => {
                console.log(res);
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className=' row g-5 mx-auto mt-5'>
            <Form className='col-4 p-4 mx-auto' onSubmit={submitHandler}>
            <h2 className={`text ${darkMode ? "text-light" : "text-dark"}`}>Edit your {currentName} Event</h2>
                <FormGroup floating>
                    <Input id="name" name='name' placeholder='Event Name' value={name} type="text" onChange={(e) => setName(e.target.value)} />
                    <Label for="name">Event Name</Label>
                </FormGroup>
                {' '}
                <FormGroup floating>
                    <Input id="game" name='game' placeholder="Game Name" value={game} type="text" onChange={(e) => setGame(e.target.value)} />
                    <Label for="game">Game Name</Label>
                </FormGroup>
                {' '}
                <FormGroup floating>
                    <Input id="startDate" name='startDate' type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <Label for="startDate">Start Date</Label>
                </FormGroup>
                {' '}
                <FormGroup floating>
                    <Input id="endDate" name='endDate' type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    <Label for="endDate">End Date</Label>
                </FormGroup>
                {' '}
                <FormGroup floating>
                    <Input id="description" name='description' placeholder='Event Description' value={description} type="textarea" onChange={(e) => setDescription(e.target.value)} />
                    <Label for="description">Event Description</Label>
                </FormGroup>
                {' '}
                <Button className={`btn ${darkMode? "btn-light": "btn-dark"}`}>Submit</Button>
            </Form>
        </div>
    );
};

export default EventEdit;