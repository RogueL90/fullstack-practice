import axios from 'axios'

const url = 'http://localhost:3001/api/persons'

const createEntry = (entryObject) => {
    const request = axios.post(url, entryObject);
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(url);
    return request.then(response => response.data);
}

const deleteEntry = (id) => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(response => response.data);
}

const changeName = (id, newName) => {
return axios.get(`${url}/${id}`)
.then(response => {
    const updated = {...response.data, name : newName}
    return axios.put(`${url}/${id}`, updated).then(response => response.data)
})
}

export default {createEntry, getAll, deleteEntry, changeName};
