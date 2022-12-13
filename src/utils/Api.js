export default class API {
    constructor(config){
        this.url = config.url;
        this.headers = {
            authorization: config.authorization,
            "Content-Type": "application/json"
        }
    }

    async getUserInfo(){
        const res = await fetch(`${this.url}/users/me`, {
            method: "GET",
            headers: this.headers,
        });
        if (res.ok) {
            return res.json();
        }
        return await Promise.reject(`Error: ${res.status}`);

    }
    async getInitialCards(){
    const res = await fetch(`${this.url}/cards`, {
        method: "GET",
        headers: this.headers,
    });
    if (res.ok) {
        return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
} 
    async editProfile({name, job}){
   const res =await fetch(`${this.url}/users/me`, {
  method: "PATCH",
  headers: this.headers,
  body: JSON.stringify({
    name: `${name}`,
    about: `${job}`
  })
});
if (res.ok) {
    return res.json();
}
return await Promise.reject(`Error: ${res.status}`);
}

async addCard({name, link}){
    const res =await fetch(`${this.url}/cards`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
      }); 
      if (res.ok) {
        return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
}
}
