export async function addNewslatterAPI(data) {
    var response = await fetch("/newslatter", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}

export async function getNewslatterAPI(data) {
    var response = await fetch("/newslatter", {
        method: "get",
        headers: {
            "content-type": "application/json"
        }
    })
    return await response.json()
}
export async function deleteNewslatterAPI(data) {
    var response = await fetch("/newslatter/"+data.id, {
        method: "delete",
        headers: {
            "content-type": "application/json"
        }
    })
    return await response.json()
}


