import React from "react";
import MessageConstants from "../constants/MessageConstants";
import Card from '@mui/material/Card';
import Button from "@mui/material/Button";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions} from '@mui/material';
import moment from "moment";

function EventCard(props) {

    const [currentEventData, setCurrentEventData] = React.useState({});
    const [index, setIndex] = React.useState("");
    const [cardState, setCardState] = React.useState("");

    React.useEffect(() => {
        setCurrentEventData(props.data);
        setIndex(props.index);
        if (props.cardstate !== "Selected") {
            setCardState("Select");
        } else {
            setCardState("Remove");
        }
    }, [MessageConstants.CURRENT_USER]);

    const onButtonClick = () => {
        if (props.cardstate === "Eligible") {
            props.selectClick(index)
        } else {
            props.removeClick(index)
        }
    }

    const convertTimeToHumanReadable = (time) => {
        return moment(time, 'YYYY-MM-DD hh:mm:ss').format('hh:mm A')
        // return moment(time, 'YYYY-MM-DD hh:mm:ss').format('hh:mm A DD-MMM-YY')
    }


    return (
        <Card sx={{width: 300}}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {currentEventData.eventName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {currentEventData.eventCategory}
                        <br></br>
                        {convertTimeToHumanReadable(currentEventData.startTime)} - {convertTimeToHumanReadable(currentEventData.endTime)}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" disabled = {props.cardstate === "Non-Eligible"} onClick={onButtonClick}>
                    {cardState}
                </Button>
            </CardActions>
        </Card>



    );
}

export default EventCard;