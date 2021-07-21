import axios from 'axios';

const API_URL = 'https://backend-location-sabban.herokuapp.com/';

const register = (name, email, password) => axios.post(`${API_URL}register`, {
  name,
  email,
  password,
})
    .then(response => {
      console.log("authresponse",response)
        if (response.data.jwt) {
            console.log("authresponse", response)
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response;
  });

const login = (email, password) => axios
  .post(`${API_URL}login`, {
    email,
    password,
  })
  .then(response => {console.log("res3",response)
    if (response.data.jwt) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  });

const logout = () => {
  localStorage.removeItem('user');
};

export default {
  register,
  login,
  logout,
};
