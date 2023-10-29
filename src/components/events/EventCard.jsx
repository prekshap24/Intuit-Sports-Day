import React from "react";
import {Card} from "react-bootstrap";
import MessageConstants from "../constants/MessageConstants";
import Button from "@mui/material/Button";
import ApiServices from "../constants/ApiServices";
import UrlConstants from "../constants/UrlConstants";
import UtilService from "../util/UtilService";
import moment from "moment";

function EventCard(props) {

    const [currentEventData, setCurrentEventData] = React.useState({});
    const [index, setIndex] = React.useState("");
    const [cardState, setCardState] = React.useState("");

    React.useEffect(() => {
        setCurrentEventData(props.data);
        setIndex(props.index);
        if(props.cardstate!=="Selected"){
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

    const convertTimeToHumanReadable = (time) => {
        return moment(time, 'YYYY-MM-DD hh:mm:ss').format('hh:mm A')
        // return moment(time, 'YYYY-MM-DD hh:mm:ss').format('hh:mm A DD-MMM-YY')
    }


    return (
        <Card style={{width: 300}}>
            <div>
                <h2>{currentEventData.eventName}</h2>
                <h3>{currentEventData.eventCategory}</h3>
                <h4>{convertTimeToHumanReadable(currentEventData.startTime)} - {convertTimeToHumanReadable(currentEventData.endTime)}</h4>

            </div>
            <Button
                disabled = {props.cardstate === "Non-Eligible"}
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