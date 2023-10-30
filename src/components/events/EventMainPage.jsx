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


function dataNotPresentInSelectedEvents(event, selectedEventsData) {
    let present = true
    selectedEventsData.forEach(selectedEvent => {
        if (selectedEvent.eventId === event.eventId) {
            present = false;
        }
    })
    return present;
}


function sortAccordingToTime(events) {

    events.sort((a, b) => {

        if (a.startTime < b.startTime) {
            return -1;
        }
        if (a.startTime > b.startTime) {
            return 1;
        }

        if (a.endTime < b.endTime) {
            return -1;
        }
        if (a.endTime > b.endTime) {
            return -1;
        }
        return 0;
    });
    return events;
}

function timingClashingWithSelectedEvents(event, selectedEvents) {
    let timeClashed = false;
    //  e.start e.end   S.Start S.end     NOT CLASING
    //  e.start    S.Start S.end   e.end
    //  e.start    S.Start  e.end   S.end


    //  S.Start e.start e.end   S.end
    //  S.Start e.start    S.end e.end
    //  S.Start  S.end e.start e.end    NOT CLASING
    selectedEvents.forEach(selectedEvent => {
        if (!((event.endTime <= selectedEvent.startTime) || (selectedEvent.endTime <= event.startTime)))
            timeClashed = true;
    })


    return timeClashed;
}

function EventMainPage(props) {

    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const mainPanel = React.useRef(null);
    const [masterEvents, setMasterEvents] = React.useState([]);
    const [eligibleEvents, setEligibleEvents] = React.useState([]);
    const [nonEligibleEvents, setNonEligibleEvents] = React.useState([]);
    const [selectedEvents, setSelectedEvents] = React.useState([]);

    React.useEffect(() => {
        const payload = {
            userId: MessageConstants.CURRENT_USER
        };
        ApiServices.getDetailsRequestParams(UrlConstants.GET_REGISTERED_EVENTS, payload)
            .then((response) => {
                setSelectedEvents(sortAccordingToTime(response.data.message.events));
            })
            .catch((error) => {
                UtilService.handleError("Data not found");
            });

        ApiServices.getDetailsWithoutRequestParams(UrlConstants.GET_ALL_EVENTS)
            .then((response) => {
                if (response.data.message.event)
                    setMasterEvents(sortAccordingToTime(response.data.message.event));
            })
            .catch((error) => {
                UtilService.handleError("Data not found");
            });

    }, [MessageConstants.CURRENT_USER]);

    React.useEffect(() => {
        let eligibleEventsData = [];
        if (selectedEvents.length === 0) {
            setNonEligibleEvents([]);
            setEligibleEvents(masterEvents);
            return;
        }

        let nonEligibleEventsData = []
        masterEvents.forEach(event => {
            if (dataNotPresentInSelectedEvents(event, selectedEvents)) {
                if (timingClashingWithSelectedEvents(event, selectedEvents)) {
                    nonEligibleEventsData.push(event);
                } else {
                    eligibleEventsData.push(event);
                }

            }
        })
        setSelectedEvents(sortAccordingToTime(selectedEvents));
        setNonEligibleEvents(sortAccordingToTime(nonEligibleEventsData));
        setEligibleEvents(sortAccordingToTime(eligibleEventsData));


    }, [selectedEvents]);

    const selectClick = (index) => {
        if (selectedEvents.length >= 3) {
            UtilService.handleError("Only 3 events allowed for this user!");
            return;
        }
        var newSelectedEvent = eligibleEvents.filter(obj => {
            return obj.eventId === index;
        });

        const registerEventPayload = {
            userId: MessageConstants.CURRENT_USER,
            eventId: newSelectedEvent[0].eventId,
            eventName: newSelectedEvent[0].eventName,
            startTime: newSelectedEvent[0].startTime,
            endTime: newSelectedEvent[0].endTime
        };
        ApiServices.postWithRequestParams(UrlConstants.REGISTER_EVENT, registerEventPayload)
            .then((response) => {
                setSelectedEvents([...selectedEvents, newSelectedEvent[0]]);
                UtilService.handleInfo("Event registered successfully");
            })
            .catch((error) => {
                UtilService.handleError("Data not found");
            });
    }

    const removeClick = (index) => {
        var listAfterRemoval = selectedEvents.filter(obj => {
            return obj.eventId !== index;
        });

        const unregisterEventPayload = {
            userId: MessageConstants.CURRENT_USER,
            eventId: index
        };
        ApiServices.postWithRequestParams(UrlConstants.UNREGISTER_EVENT, unregisterEventPayload)
            .then((response) => {
                setSelectedEvents(listAfterRemoval);
                UtilService.handleInfo("Event De-Registered successfully");
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
                                            eligibleEvents={eligibleEvents}
                                            nonEligibleEvents={nonEligibleEvents}
                                            selectedEvents={[]}
                                            selectClick={selectClick}
                                        />
                                    </Item>
                                </Grid>
                                <Grid item xs={6}>
                                    <Item>
                                        <EventComponent
                                            titletext={MessageConstants.SELECTED_EVENTS}
                                            selectedEvents={selectedEvents}
                                            eligibleEvents={[]}
                                            nonEligibleEvents={[]}
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