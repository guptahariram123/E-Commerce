export async function addCheckoutAPI(data) {
    var response = await fetch("/checkout", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}

export async function getCheckoutAPI(data) {
    var response = await fetch("/checkout", {
        method: "get",
        headers: {
            "content-type": "application/json"
        }
    })
    return await response.json()
}
export async function deleteCheckoutAPI(data) {
    var response = await fetch("/checkout/"+data.id, {
        method: "delete",
        headers: {
            "content-type": "application/json"
        }
    })
    return await response.json()
}
export async function updateCheckoutAPI(data) {
    var response = await fetch("/checkout/"+data.id, {
        method: "put",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}


