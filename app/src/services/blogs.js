
import axios from 'axios'
const baseUrl = 'http://localhost:3005/api/blogs'

let token = null

const setToken = (newtoken) => {
  token = `Bearer ${newtoken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createOneBlog = async (blog) => {
  
  const config = {
    headers:{
      Authorization: token
    },
  }

  const request = await axios.post(baseUrl, blog, config)
  return request.data
}

const modifyOneBlog = async (id, blog) => {
  const request = axios.put(`${baseUrl}/${id}`, blog)
  return request.data
}
const deleteOneBlog = async (id) => {
  const config = {
    headers:{
      Authorization: token
    },
  }

  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}
export default {getAll, createOneBlog, setToken, modifyOneBlog, deleteOneBlog}