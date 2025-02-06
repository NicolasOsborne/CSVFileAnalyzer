import axios from 'axios'

// TO UPDATE depending on backend logic and code ?

const API_URL = 'https://127.0.0.1:8000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

// Send file to backend
export const uploadCSVFileToCloud = async (formData: FormData) => {
  try {
    const response = await api.post('/upload', formData)
    return response.data
  } catch (error) {
    console.error('Error uploading file: ', error)
    throw error
  }
}
