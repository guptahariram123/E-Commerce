export async function addBrandAPI(data) {
    var response = await fetch("/brand", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}

export async function getBrandAPI(data) {
    var response = await fetch("/brand", {
        method: "get",
        headers: {
            "content-type": "application/json"
        }
    })
    return await response.json()
}
export async function deleteBrandAPI(data) {
    var response = await fetch("/brand/"+data.id, {
        method: "delete",
        headers: {
            "content-type": "application/json"
        }
    })
    return await response.json()
}
export async function updateBrandAPI(data) {
    var response = await fetch("/brand/"+data.id, {
        method: "put",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}


