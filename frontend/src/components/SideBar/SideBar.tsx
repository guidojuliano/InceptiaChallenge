import React, { useEffect, useState } from 'react'
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import useApi from '../../api'
import { Cliente } from './SideBar.types'

interface SidebarProps {
  onClientSelect: (clientId: number) => void
}

const Sidebar: React.FC<SidebarProps> = ({ onClientSelect }) => {
  const [clients, setClients] = useState<Cliente[]>([])
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null)
  const api = useApi()

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await api.get('/clients/')
        setClients(response.data)
      } catch (error) {
        console.error('Failed to fetch clients', error)
      }
    }

    fetchClients()
  }, [])

  const handleClientClick = (clientId: number) => {
    setSelectedClientId(clientId)
    onClientSelect(clientId)
  }

  return (
    <Drawer
      sx={{
        width: '17%',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '17%',
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant="h6">CLIENTE</Typography>
      </Toolbar>
      <Divider />
      <List>
        {clients.map((client, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => handleClientClick(client.id)}
              selected={selectedClientId === client.id}
            >
              <ListItemText
                primary={client.name}
                style={{ textTransform: 'uppercase' }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default Sidebar
