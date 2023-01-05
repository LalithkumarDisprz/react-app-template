export const CHANGE_STATE="CHANGE_STATE";
export const CHANGE_DATE="CHANGE_DATE";
export const CLOSE_STATE="CLOSE_STATE";
export const CHANGE_EVENTS="CHANGE_EVENTS";
export const ADD_POST="ADD_POST";
export const createAction=(type,payload)=>
({
    type,
    payload,
});
export const eventsAction=(type,timeLine,events)=>
(
    {
        type,
        timeLine,
        events,
    }
);

