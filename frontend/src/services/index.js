import axios from 'axios'

const token = localStorage.getItem('token')

const baseURL = 'http://localhost:3001'
let service = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

const transactionsAPI = {
  signup: (data) => service.post('/auth/signup', data),
  login: (data) => service.post('/auth/login', data, {validateStatus: () => true}),
  allUsers: () => service.get('/data/allUsers'),
  oneUser: (id) => service.get(`/data/userId?_id=${id}`),
  updateServiceAuth: () => {
    service = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    });
  },
  updateUser: (id, newData) => {
    service.put(`/data/userId?_id=${id}`, newData);
  },
  // create: data => service.post('/transactions', data),
  //update: data => service.put(`/data/userId?userId${data.id}`, data),
  // delete: id => service.delete(`/transactions/${id}`),
}

export { transactionsAPI }
