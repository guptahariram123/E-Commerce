export async function addContactUsAPI(data) {
    var response = await fetch("/contact", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}

export async function getContactUsAPI(data) {
    var response = await fetch("/contact", {
        method: "get",
        headers: {
            "content-type": "application/json"
        }
    })
    return await response.json()
}
export async function deleteContactUsAPI(data) {
    var response = await fetch("/contact/"+data.id, {
        method: "delete",
        headers: {
            "content-type": "application/json"
        }
    })
    return await response.json()
}
export async function updateContactUsAPI(data) {
    var response = await fetch("/contact/"+data.id, {
        method: "put",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}


