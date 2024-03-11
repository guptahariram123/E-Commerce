import { ADD_NEWSLATTER_RED, DELETE_NEWSLATTER_RED, GET_NEWSLATTER_RED} from "../Constants";

export default function NewslatterReducer(state=[],action){
    switch (action.type){
        case ADD_NEWSLATTER_RED:
         var newState=state
            newState.push(action.payload)
            return newState
        case GET_NEWSLATTER_RED:
            return action.payload
       
        case DELETE_NEWSLATTER_RED:
         var newState=state.filter((item)=>item.id!==action.payload.id)
            return newState
        default :
        return state
    }
}