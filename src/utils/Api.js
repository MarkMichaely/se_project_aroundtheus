export default class API {
    constructor(config){
        this.url = config.url;
        this.headers = {
            authorization: config.authorization,
            "Content-Type": "application/json"
        }
    }

    getUserInfo(){
        return fetch(`${this.url}/users/me`, {
            method: "GET",
            headers: this.headers,

        })
        .then(res =>{ 
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })

    }
getInitialCards(){
    return fetch(`${this.url}/cards`, {
        method: "GET",
        headers: this.headers,

    })
    .then(res =>{ 
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    })
} 
}
