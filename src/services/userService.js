const baseURL = 'http://localhost:3030/jsonstore/users';

export const getAllUsers = async () =>{
    const response = await fetch(baseURL);
    const result = await response.json();

    return result;
}