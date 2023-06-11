import https from 'https'

const url = "https://hookbin.in/"
const request = https.request(url, {
    method: POST,
    headers: {
        "Content-Type" : "application/json",
        "Accept": "application/json",
    }
},(response) => {
    response.addListener("data", (data)=>{
        console.log(`Receive: ${data.toString()}`)
    })
})

const body = JSON.stringify({
    firstName: "Farhan",
    lastName: "Yp"
})

request.write(body)
request.end()