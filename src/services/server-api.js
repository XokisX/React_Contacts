const serverUrl = "http://localhost:8080/";

export default class ServerApi{
    async loginUser(userData){
        const res = await fetch(`${serverUrl}auth`,{
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

    async getUserByToken(token){
        const res = await fetch(`${serverUrl}getUserByToken`,{
            method:'GET',
            mode:'cors',
            headers:{
                'Authorization': `Bearer ${token}`
            },
        })
        return await res.json();
    }
}