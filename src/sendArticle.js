export const SERVER_URL = 'https://api.statyla.ru'

export async function serverAddArticle(Article) {
    console.log('started')
    let response = await fetch(SERVER_URL + '/article/create', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Article),
    }).then((response) => {
        return response.json()
    })
    let data = (response.data)
    return data
}

export async function serverGetByIdArticle(id) {
    let response = await (fetch(SERVER_URL + '/article/' + id, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    }))
    let dataObj = await response.json()

    return dataObj
}

