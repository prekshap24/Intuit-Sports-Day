import * as React from 'react';
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import EventComponent from "./EventComponent";
import ApiServices from "../constants/ApiServices";
import UrlConstants from "../constants/UrlConstants";
import UtilService from "../util/UtilService";
import MessageConstants from "../constants/MessageConstants";
import {ToastContainer} from "react-toastify";


function EventMainPage(props) {

    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const mainPanel = React.useRef(null);
    const [eligibleEvents, setEligibleEvents] = React.useState([]);
    const [selectedEvents, setSelectedEvents] = React.useState([]);

    React.useEffect(() => {
        const payload = {
            userId: MessageConstants.CURRENT_USER
        };
        ApiServices.getDetailsRequestParams(UrlConstants.GET_REGISTERED_EVENTS, payload)
            .then((response) => {
                setSelectedEvents(response.data.message.events);
            })
            .catch((error) => {
                UtilService.handleError("Data not found");
            });

        ApiServices.getDetailsWithoutRequestParams(UrlConstants.GET_ALL_EVENTS)
            .then((response) => {
                if(response.data.message.event)
                setEligibleEvents(response.data.message.event);
            })
            .catch((error) => {
                UtilService.handleError("Data not found");
            });

    }, [MessageConstants.CURRENT_USER]);

    const selectClick = (index) => {
        if (selectedEvents.length >= 3) {
            UtilService.handleError("Only 3 events allowed for this user!");
            return;
        }
        var newSelectedEvent = eligibleEvents.filter(obj => {
            return obj.eventId === index;
        });
        setSelectedEvents([...selectedEvents, newSelectedEvent[0]]);


        var listAfterRemoval = eligibleEvents.filter(obj => {
            return obj.eventId !== index;
        });
        setEligibleEvents(listAfterRemoval);

        const registerEventPayload = {
            userId: MessageConstants.CURRENT_USER,
            eventId:newSelectedEvent[0].eventId,
            eventName:newSelectedEvent[0].eventName,
            startTime:newSelectedEvent[0].startTime,
            endTime:newSelectedEvent[0].endTime
        };
        ApiServices.postWithRequestParams(UrlConstants.REGISTER_EVENT, registerEventPayload)
            .then((response) => {

            })
            .catch((error) => {
                UtilService.handleError("Data not found");
            });
    }

    const removeClick = (index) => {
        var listAfterRemoval = selectedEvents.filter(obj => {
            return obj.eventId !== index;
        });
        setSelectedEvents(listAfterRemoval);

        var newSelectedEvent = selectedEvents.filter(obj => {
            return obj.eventId === index;
        });
        setEligibleEvents([...eligibleEvents, newSelectedEvent[0]]);


        const unregisterEventPayload = {
            userId: MessageConstants.CURRENT_USER,
            eventId:index
        };
        ApiServices.postWithRequestParams(UrlConstants.UNREGISTER_EVENT, unregisterEventPayload)
            .then((response) => {

            })
            .catch((error) => {
                UtilService.handleError("Data not found");
            });
    }

    return (
        <>
            <div className="wrapper">
                <div className="main-panel" ref={mainPanel}>
                    <div className="content" style={{padding: 0}}>
                        <Box sx={{width: '100%'}}>
                            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                                <Grid item xs={6}>
                                    <Item>
                                        <EventComponent
                                            titletext={MessageConstants.ALL_EVENTS}
                                            events={eligibleEvents}
                                            cardstate={"Eligible"}
                                            selectClick={selectClick}
                                        />
                                    </Item>
                                </Grid>
                                <Grid item xs={6}>
                                    <Item>
                                        <EventComponent
                                            titletext={MessageConstants.SELECTED_EVENTS}
                                            events={selectedEvents}
                                            cardstate={"Selected"}
                                            removeClick={removeClick}
                                        />
                                    </Item>
                                </Grid>
                            </Grid>
                        </Box>
                        <ToastContainer/>
                    </div>
                </div>
            </div>
        </>
    );

}

export default EventMainPage;