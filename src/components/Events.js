import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";
import { Button, Card, CardHeader, CardBody, CardTitle, CardText, CardFooter } from 'reactstrap';


const Events = (props) => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const {user, organizerEmail, userStatus} = props;

    useEffect(() => {
        axios.get("http://localhost:8000/api/events")
            .then((res) => {
                // console.log(user.email);
                // console.log(organizerEmail)
                setEvents(res.data);
            })
            .catch();
    }, []);

    const handleDelete = (eventId) => {
        axios.delete("http://localhost:8000/api/events/" + eventId)
            .then((res) => {
                console.log(res.data);
                const remainingEvents = events.filter((event) => {
                    return event._id !== eventId
                });
                setEvents(remainingEvents);
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className='d-flex flex-wrap justify-content-center p-4 mt-5'>
            {
                events.map((eventObj) => {
                    return(
                        <div key={eventObj._id}>
                            <Card className="my-2 ms-5 border-dark" style={{
                                width: '22rem',
                                boxShadow: "7px 7px 7px gray"
                                }}>
                                <CardHeader className='fs-3 bg-info'>{eventObj.name}</CardHeader>
                                <CardBody>
                                    <CardTitle tag="h3">{eventObj.game}</CardTitle>
                                    <CardText tag="h5">{eventObj.description}</CardText>
                                    <CardText>
                                        {moment(eventObj.startDate).format("MMM Do YYYY")}-
                                        {moment(eventObj.endDate).format("MMM Do YYYY")}
                                    </CardText>
                                </CardBody>
                                <CardFooter>
                                    <Button color='dark'>
                                        <Link style={{textDecoration: "none",}} className='text-light' to={`/events/edit/${eventObj._id}`}>Edit</Link>
                                    </Button> 
                                    <Button onClick={(e) => {handleDelete(eventObj._id)}} className='ms-4' color='dark'>Delete</Button>
                                    <Button className='ms-4' color='dark'>
                                        <Link style={{textDecoration: "none",}}  className='text-light' to={`/events/${eventObj._id}`}>Details</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Events;