import React, {useContext, useEffect, useState} from 'react';
import { ThemeContext } from '../ThemeContext';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Card, CardText, Button, CardHeader, Collapse } from 'reactstrap';
import moment from 'moment';

const EventDetails = (props) => {
    const {organizerEmail, setOrganizerEmail} = props;
    const theme = useContext(ThemeContext);
    const darkMode = theme.state.darkMode;
    const {id} = useParams();
    const [singleEvent, setSingleEvent] = useState({});
    const [eventCreator, setEventCreator] = useState({})

    useEffect(() => {
        axios.get("http://localhost:8000/api/events/" + id)
            .then((res) => {
                // console.log(res.data.createdBy.email);
                setSingleEvent(res.data);
                setOrganizerEmail(res.data.createdBy.email)
                setEventCreator(res.data.createdBy);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    
    return (
        <div>
            <Card className={`bg ${darkMode ? "bg-light" : "bg-dark"}`} style={{
                margin: "auto",
                marginTop: "100px",
                width: '35rem',
                height: "40rem",
                boxShadow: "7px 7px 7px grey",
                padding: "30px"
            }}>
                <CardHeader style={{marginBottom: "20px"}} className={`text ${darkMode ? "text-dark" : "text-light"}`} tag="h1">{singleEvent.name}</CardHeader>
                <CardText style={{marginBottom: "20px"}} className={`text ${darkMode ? "text-dark" : "text-light"}`} tag="h3">Game: {singleEvent.game}</CardText>
                <CardText style={{marginBottom: "20px"}} className={`text ${darkMode ? "text-dark" : "text-light"}`} tag="h3">Date: {moment(singleEvent.startDate).format("MMM-Do-YYYY")} - {moment(singleEvent.endDate).format("MMM-Do-YYYY")}</CardText>
                <CardText style={{marginBottom: "20px"}} className={`text ${darkMode ? "text-dark" : "text-light"}`} tag="h4">Details: {singleEvent.description}</CardText>
                <CardText style={{marginBottom: "20px"}} className={`text ${darkMode ? "text-dark" : "text-light"}`} tag="h5">Organizer: {eventCreator.username}</CardText>
                <CardText className={`text ${darkMode ? "text-dark" : "text-light"}`} tag="h5">Contact Info: {eventCreator.email}</CardText>
                {/* <Button style={{width: "10rem", color: "white"}} color="info">Go somewhere</Button> */}
                <Collapse horizontal>hello</Collapse>
            </Card>
        </div>
    );
};

export default EventDetails;