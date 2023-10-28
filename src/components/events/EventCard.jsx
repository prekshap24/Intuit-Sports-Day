import React from "react";
import {Card} from "react-bootstrap";
import MessageConstants from "../constants/MessageConstants";
import Button from "@mui/material/Button";
import ApiServices from "../constants/ApiServices";
import UrlConstants from "../constants/UrlConstants";
import UtilService from "../util/UtilService";

function EventCard(props) {

    const [currentEventData, setCurrentEventData] = React.useState({});
    const [index, setIndex] = React.useState("");
    const [cardState, setCardState] = React.useState("");

    React.useEffect(() => {
        setCurrentEventData(props.data);
        setIndex(props.index);
        if(props.cardstate==="Eligible"){
            setCardState("Select");
        }else{
            setCardState("Remove");
        }
    }, [MessageConstants.CURRENT_USER]);

    const onButtonClick = () => {
        if (props.cardstate === "Eligible") {
            props.selectClick(props.index)
        } else {
            props.removeClick(props.index)
        }
    }

    return (
        <Card style={{width: 400}}>
            <div>
                <h2>{currentEventData.eventName}</h2>
                <h3>{currentEventData.eventCategory}</h3>
                <h4>{currentEventData.startTime} - {currentEventData.endTime}</h4>
            </div>
            <Button
                style={{
                    margin: "5px",
                    borderRadius: 8,
                    border: "red",
                }} onClick={onButtonClick}>
                {cardState}
            </Button>

        </Card>
    );
}

export default EventCard;