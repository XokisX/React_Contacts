const serverUrl = "http://localhost:8080/api/";

export default class ServerApi{
    async loginUser(userData){
        const res = await fetch(`${serverUrl}login`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(userData),
        })
        return await res.json();
    }

    async registerUser(registerData){
        const res = await fetch(`${serverUrl}register`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(registerData),
        })
        return await res.json();
    }
}