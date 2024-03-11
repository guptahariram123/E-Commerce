export async function addCartAPI(data) {
    var response = await fetch("/cart", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}

export async function getCartAPI(data) {
    var response = await fetch("/cart", {
        method: "get",
        headers: {
            "content-type": "application/json"
        }
    })
    return await response.json()
}
export async function deleteCartAPI(data) {
    var response = await fetch("/cart/"+data.id, {
        method: "delete",
        headers: {
            "content-type": "application/json"
        }
    })
    return await response.json()
}
export async function updateCartAPI(data) {
    var response = await fetch("/cart/"+data.id, {
        method: "put",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}


