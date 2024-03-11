import { ADD_CART_RED, DELETE_CART_RED, GET_CART_RED, UPDATE_CART_RED} from "../Constants";

export default function CartReducer(state=[],action){
    switch (action.type){
        case ADD_CART_RED:
         var newState=state
            newState.push(action.payload)
            return newState
        case GET_CART_RED:
            return action.payload
        case UPDATE_CART_RED:
            var newState=state
            var index=newState.findIndex((x)=>x.id===action.payload.id)
            newState[index]=action.payload
            return newState
       
        case DELETE_CART_RED:
         var newState=state.filter((item)=>item.id!==action.payload.id)
            return newState
        default :
        return state
    }
}