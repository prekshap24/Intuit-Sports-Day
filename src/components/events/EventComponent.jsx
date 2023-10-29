import React from "react";
import "./Event.css";
import {Container, Row} from "react-bootstrap";
import MessageConstants from "../constants/MessageConstants";
import EventCard from "./EventCard";

function EventComponent(props) {
    return (
        <>

            <Container fluid style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Row>

                    <div>
                        <h4 style={{color: "rgba(0, 77, 128, 0.7)", fontWeight: "bold"}}
                            className=" text-center">{props.titletext}</h4>
                    </div>
                    <div style={{paddingLeft:100}}>
                        {props.eligibleEvents.map((event, index) =>
                            (<EventCard
                                data={event}
                                index={event.eventId}
                                cardstate={"Eligible"}
                                selectClick={props.selectClick}
                                removeClick={props.removeClick}
                            />))}
                        {props.nonEligibleEvents.map((event, index) =>
                            (<EventCard
                                data={event}
                                index={event.eventId}
                                cardstate={"Non-Eligible"}
                                selectClick={props.selectClick}
                                removeClick={props.removeClick}
                            />))}
                        {props.selectedEvents.map((event, index) =>
                            (<EventCard
                                data={event}
                                index={event.eventId}
                                cardstate={"Selected"}
                                selectClick={props.selectClick}
                                removeClick={props.removeClick}
                            />))}
                    </div>

                </Row>
            </Container>

        </>
    );

}

export default EventComponent;