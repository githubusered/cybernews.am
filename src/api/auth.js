import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const register = async (username, email, password) => {
    const res = await axios.post(`${backendUrl}api/auth/local/register`,{
        username,
        email,
        password
    })
    return res.data;
}

export const createProfile = async (jwt, firstName, lastName, user) => {
    
    const response = await fetch(`${backendUrl}api/profiles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      },
      body: JSON.stringify({
        data: {
          firstname: firstName,
          lastname: lastName,
        }
      })
    });
    return response.json();
  };
  

export const login = async (identifier, password) => {
    const res = await axios.post(`${backendUrl}api/auth/local`,{
        identifier,
        password
    })
    return res.data
}

export const getMe = async (token) => {
    const res = await axios.get(`${backendUrl}api/users/me`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}