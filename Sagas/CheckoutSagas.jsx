
import { takeEvery, put } from "redux-saga/effects"
import {ADD_CHECKOUT,ADD_CHECKOUT_RED,DELETE_CHECKOUT,DELETE_CHECKOUT_RED,GET_CHECKOUT, GET_CHECKOUT_RED, UPDATE_CHECKOUT, UPDATE_CHECKOUT_RED} from "../Constants"
import { addCheckoutAPI, deleteCheckoutAPI, getCheckoutAPI, updateCheckoutAPI } from "../Services/CheckoutService"

function* addCheckoutSaga(action) {             // executer
       var response=yield addCheckoutAPI(action.payload)
      yield put({type:ADD_CHECKOUT_RED,payload:response})
}
function* getCheckoutSaga(action) {             // executer
    
    var response=yield getCheckoutAPI(action.payload)
    yield put({type:GET_CHECKOUT_RED,payload:response})
}
function* deleteCheckoutSaga(action) {             // executer
   
    var response=yield deleteCheckoutAPI(action.payload)
    yield put({type:DELETE_CHECKOUT_RED,payload:action.payload})
}
function* updateCheckoutSaga(action) {             // executer
    var response=yield updateCheckoutAPI(action.payload)
   yield put({type:UPDATE_CHECKOUT_RED,payload:action.payload})
}

export function* checkoutSaga() {                 //  watcher
    yield takeEvery(ADD_CHECKOUT, addCheckoutSaga)
    yield takeEvery(GET_CHECKOUT, getCheckoutSaga)
    yield takeEvery(UPDATE_CHECKOUT,updateCheckoutSaga)
    yield takeEvery(DELETE_CHECKOUT,deleteCheckoutSaga)
}
