import { ADD_CONTACT_US_RED, DELETE_CONTACT_US_RED, GET_CONTACT_US_RED, UPDATE_CONTACT_US_RED} from "../Constants";

export default function ContactUsReducer(state=[],action){
    switch (action.type){
        case ADD_CONTACT_US_RED:
         var newState=state
            newState.push(action.payload)
            return newState
        case GET_CONTACT_US_RED:
            return action.payload
        case UPDATE_CONTACT_US_RED:
            var newState=state
            var index=newState.findIndex((x)=>x.id===action.payload.id)
            newState[index]=action.payload
            return newState
       
        case DELETE_CONTACT_US_RED:
         var newState=state.filter((item)=>item.id!==action.payload.id)
            return newState
        default :
        return state
    }
}