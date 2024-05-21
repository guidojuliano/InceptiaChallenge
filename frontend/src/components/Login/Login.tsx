import React, { useState, useContext } from 'react'
import { Button, TextField, Card, Typography, Grid } from '@mui/material'
import axios from 'axios'
import { AuthContext } from './Auth'

interface LoginProps {
  onLoginSuccess: (token: string) => void
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { setToken } = useContext(AuthContext)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        'https://admindev.inceptia.ai/api/v1/login/',
        { email, password },
      )
      onLoginSuccess(response.data.token)
      const token = response.data.token
      localStorage.setItem('token', token)
      setError('')
    } catch (err) {
      setError('Invalid credentials')
    }
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: '100vh' }}
    >
      <Card sx={{ padding: '2rem', width: '400px', borderRadius: '25px' }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Card>
    </Grid>
  )
}

export default Login
