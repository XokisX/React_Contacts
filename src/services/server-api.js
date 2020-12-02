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
        const res =  await fetch(`${serverUrl}getUserByToken`,{
            method:'GET',
            mode:'cors',
            headers:{
                'Authorization': `Bearer ${token}`
            },
        })
        return await res.json();
    }

    async loadAllUsers(token,page,limit){
        const res =  await fetch(`${serverUrl}api/getAllUsers`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({page:page,limit:limit})
        })
        return await res.json();
    }

    async searchUsers(token,info,page,limit){
        const res =  await fetch(`${serverUrl}api/searchUser`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({info:info,page:page,limit:limit})
        })
        return await res.json();
    }


    async addContact(token,idOwner,idContact){
        const res =  await fetch(`${serverUrl}api/addContact`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({my_id:idOwner,friend_id:idContact})
        })
        return await res.json();
    }

    
    async loadContacts(token){
        const res =  await fetch(`${serverUrl}api/loadContacts`,{
            method:'GET',
            mode:'cors',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        return await res.json();
    }

    async deleteContacts(token,my_id,contacts){
        const res =  await fetch(`${serverUrl}api/deleteContacts`,{
            method:'DELETE',
            mode:'cors',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({my_id:my_id,friend_id:contacts})
        })
        return await res.json();
    }

    async sendEmails(token,my_id,contacts,message){
        const res =  await fetch(`${serverUrl}api/sendEmail`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({my_id:my_id,contacts:contacts,message:message})
        })
        return await res.json();
    }
}