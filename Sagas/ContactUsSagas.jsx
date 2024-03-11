
import { takeEvery, put } from "redux-saga/effects"
import {ADD_CONTACT_US,ADD_CONTACT_US_RED,DELETE_CONTACT_US,DELETE_CONTACT_US_RED,GET_CONTACT_US, GET_CONTACT_US_RED, UPDATE_CONTACT_US, UPDATE_CONTACT_US_RED} from "../Constants"
import { addContactUsAPI, deleteContactUsAPI, getContactUsAPI, updateContactUsAPI } from "../Services/ContactUsService"

function* addContactUsSaga(action) {             // executer
       var response=yield addContactUsAPI(action.payload)
      yield put({type:ADD_CONTACT_US_RED,payload:response})
}
function* getContactUsSaga(action) {             // executer
    
    var response=yield getContactUsAPI(action.payload)
    yield put({type:GET_CONTACT_US_RED,payload:response})
}
function* deleteContactUsSaga(action) {             // executer
   
    var response=yield deleteContactUsAPI(action.payload)
    yield put({type:DELETE_CONTACT_US_RED,payload:action.payload})
}
function* updateContactUsSaga(action) {             // executer
    var response=yield updateContactUsAPI(action.payload)
   yield put({type:UPDATE_CONTACT_US_RED,payload:action.payload})
}

export function* contactusSaga() {                 //  watcher
    yield takeEvery(ADD_CONTACT_US, addContactUsSaga)
    yield takeEvery(GET_CONTACT_US, getContactUsSaga)
    yield takeEvery(UPDATE_CONTACT_US,updateContactUsSaga)
    yield takeEvery(DELETE_CONTACT_US,deleteContactUsSaga)
}
