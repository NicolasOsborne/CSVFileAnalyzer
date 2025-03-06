import axios from 'axios'

const API_URL = import.meta.env.VITE_REACT_APP_AZURE_API_URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

// Send CSV file to backend
export const uploadCSVFileToCloud = async (formData: FormData) => {
  try {
    const response = await api.post('', formData)
    return response.data
  } catch (error) {
    console.error('Error uploading file: ', error)
    throw error
  }
}
