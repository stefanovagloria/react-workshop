const baseURL = 'http://localhost:3030/jsonstore/users';

export const getAllUsers = async () =>{
    const response = await fetch(baseURL);
    const result = await response.json();

    return result;
}

export const createUser = async (userData) => {
    const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    const result = await response.json();

    return result;
}

export const deleteUser = async (userId) =>{
    const response = await fetch(`${baseURL}/${userId}`, {
        method: 'DELETE'
    });
}

export const getUserById = async (userId) =>{
    console.log(userId)
    const response = await fetch(`${baseURL}/${userId}`);
    const result = await response.json();

    console.log(result)
    return result;
}