import { ADD_BRAND_RED, DELETE_BRAND_RED, GET_BRAND_RED, UPDATE_BRAND_RED} from "../Constants";

export default function BrandReducer(state=[],action){
    switch (action.type){
        case ADD_BRAND_RED:
         var newState=state
            newState.push(action.payload)
            return newState
        case GET_BRAND_RED:
            return action.payload
        case UPDATE_BRAND_RED:
            var newState=state
            var index=newState.findIndex((x)=>x.id===action.payload.id)
            newState[index]=action.payload
            return newState
       
        case DELETE_BRAND_RED:
         var newState=state.filter((item)=>item.id!==action.payload.id)
            return newState
        default :
        return state
    }
}