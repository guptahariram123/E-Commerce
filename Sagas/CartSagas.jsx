
import { takeEvery, put } from "redux-saga/effects"
import {ADD_CART,ADD_CART_RED,DELETE_CART,DELETE_CART_RED,GET_CART, GET_CART_RED, UPDATE_CART, UPDATE_CART_RED} from "../Constants"
import { addCartAPI, deleteCartAPI, getCartAPI, updateCartAPI } from "../Services/CartService"

function* addCartSaga(action) {             // executer
       var response=yield addCartAPI(action.payload)
      yield put({type:ADD_CART_RED,payload:response})
}
function* getCartSaga(action) {             // executer
    
    var response=yield getCartAPI(action.payload)
    yield put({type:GET_CART_RED,payload:response})
}
function* deleteCartSaga(action) {             // executer
   
    var response=yield deleteCartAPI(action.payload)
    yield put({type:DELETE_CART_RED,payload:action.payload})
}
function* updateCartSaga(action) {             // executer
    var response=yield updateCartAPI(action.payload)
   yield put({type:UPDATE_CART_RED,payload:action.payload})
}

export function* cartSaga() {                 //  watcher
    yield takeEvery(ADD_CART, addCartSaga)
    yield takeEvery(GET_CART, getCartSaga)
    yield takeEvery(UPDATE_CART,updateCartSaga)
    yield takeEvery(DELETE_CART,deleteCartSaga)
}
