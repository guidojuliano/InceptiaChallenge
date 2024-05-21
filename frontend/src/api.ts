import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from './components/Login/Auth'

const useApi = () => {
  const { token } = useContext(AuthContext)

  const api = axios.create({
    baseURL: 'https://admindev.inceptia.ai/api/v1',
    headers: {
      Authorization: `JWT ${token}`,
    },
  })

  return api
}

export default useApi
