
import { takeEvery, put } from "redux-saga/effects"
import {ADD_BRAND,ADD_BRAND_RED,DELETE_BRAND,DELETE_BRAND_RED,GET_BRAND, GET_BRAND_RED, UPDATE_BRAND, UPDATE_BRAND_RED} from "../Constants"
import { addBrandAPI, deleteBrandAPI, getBrandAPI, updateBrandAPI } from "../Services/BrandService"

function* addBrandSaga(action) {             // executer
       var response=yield addBrandAPI(action.payload)
      yield put({type:ADD_BRAND_RED,payload:response})
}
function* getBrandSaga(action) {             // executer
    
    var response=yield getBrandAPI(action.payload)
    yield put({type:GET_BRAND_RED,payload:response})
}
function* deleteBrandSaga(action) {             // executer
   
    var response=yield deleteBrandAPI(action.payload)
    yield put({type:DELETE_BRAND_RED,payload:action.payload})
}
function* updateBrandSaga(action) {             // executer
    var response=yield updateBrandAPI(action.payload)
   yield put({type:UPDATE_BRAND_RED,payload:action.payload})
}

export function* brandSaga() {                 //  watcher
    yield takeEvery(ADD_BRAND, addBrandSaga)
    yield takeEvery(GET_BRAND, getBrandSaga)
    yield takeEvery(UPDATE_BRAND,updateBrandSaga)
    yield takeEvery(DELETE_BRAND,deleteBrandSaga)
}
