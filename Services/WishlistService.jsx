export async function addWishlistAPI(data) {
    var response = await fetch("/wishlist", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}

export async function getWishlistAPI(data) {
    var response = await fetch("/wishlist", {
        method: "get",
        headers: {
            "content-type": "application/json"
        }
    })
    return await response.json()
}
export async function deleteWishlistAPI(data) {
    var response = await fetch("/wishlist/"+data.id, {
        method: "delete",
        headers: {
            "content-type": "application/json"
        }
    })
    return await response.json()
}


