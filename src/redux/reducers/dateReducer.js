import Helper from "../../Utils/Helper";
import {CHANGE_DATE,CHANGE_EVENTS,eventsAction, createAction, } from "../actions";
import moment from "moment";
const initialState = {
    date: new Date().toDateString(),
    events: Helper.timeConstant(),
  };
 function datereducer(state = initialState, action) {
  console.log(action.type)
  switch(action.type) { 
      
      case CHANGE_DATE:
        return {
          date:action.payload,   
          events: Helper.timeConstant(),
        };
        case CHANGE_EVENTS:
          return{
          date:state.date,
          events: action.timeLine.map((item)=>
            {
           action.events.map((x)=>
          {
           if(item.starttime[0]+item.starttime[1]===moment(x.startTime).format("HH"))
           {
             item.events.push(x);
           }
         })
         return item;
       })
          }

    default:
          return state;
    }
    
  }

  export default datereducer;