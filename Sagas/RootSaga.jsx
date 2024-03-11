import {all} from "redux-saga/effects"

import {maincategorySaga} from "./MaincategorySagas"
import {subcategorySaga} from "./SubcategorySagas"
import {brandSaga} from "./BrandSagas"
import {productSaga} from "./ProductSagas"
import {cartSaga} from "./CartSagas"
import {checkoutSaga} from "./CheckoutSagas"
import {wishlistSaga} from "./WishlistSagas"
import {contactusSaga} from "./ContactUsSagas"
import {newslatterSaga} from "./NewslatterSagas"

export default function* RootSaga(){
    yield all([
        maincategorySaga(),
        subcategorySaga(),
        brandSaga(),
        productSaga(),
        cartSaga(),
        checkoutSaga(),
        wishlistSaga(),
        contactusSaga(),
        newslatterSaga()
    ])
}

