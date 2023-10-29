import React from "react";
import "./Event.css";
import {Container, Row} from "react-bootstrap";
import EventCard from "./EventCard";
import Grid from "@mui/material/Grid";

function EventComponent(props) {
    return (
        <>

            <Container fluid style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Row>

                    <div>
                        <h4 style={{color: "rgba(0, 77, 128, 0.7)", fontWeight: "bold"}}
                            className=" text-center">{props.titletext}</h4>
                    </div>
                    <Grid container spacing={4}>
                        {props.eligibleEvents.map((event, index) =>
                            (<Grid item xs={6}>
                                <EventCard
                                    data={event}
                                    index={event.eventId}
                                    cardstate={"Eligible"}
                                    selectClick={props.selectClick}
                                    removeClick={props.removeClick}
                                />
                            </Grid>))}
                    </Grid>
                    <Grid container spacing={4}>
                        {props.nonEligibleEvents.map((event, index) =>
                            (<Grid item xs={6}>
                                <EventCard
                                    data={event}
                                    index={event.eventId}
                                    cardstate={"Non-Eligible"}
                                    selectClick={props.selectClick}
                                    removeClick={props.removeClick}
                                />
                            </Grid>))}
                    </Grid>

                    <Grid container spacing={4}>
                        {props.selectedEvents.map((event, index) =>
                            (<Grid item xs={6}>
                                <EventCard
                                    data={event}
                                    index={event.eventId}
                                    cardstate={"Selected"}
                                    selectClick={props.selectClick}
                                    removeClick={props.removeClick}
                                />
                            </Grid>))}
                    </Grid>
                </Row>
            </Container>

        </>
    );

}

export default EventComponent;