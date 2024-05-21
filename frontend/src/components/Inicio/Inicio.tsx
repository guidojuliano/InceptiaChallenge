import React, { useState } from 'react'
import Tabla from '../Tabla/Tabla'
import SideBar from '../SideBar/SideBar'
import FiltroTabla from '../FiltroTabla/FiltroTabla'
import { Grid } from '@mui/material'

const Inicio: React.FC = () => {
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null)
  const [fechaDesde, setFechaDesde] = useState('')
  const [fechaHasta, setFechaHasta] = useState('')

  const handleClientSelect = (clientId: number) => {
    setSelectedClientId(clientId)
  }

  const handleFilterChange = (newFechaDesde: string, newFechaHasta: string) => {
    setFechaDesde(newFechaDesde)
    setFechaHasta(newFechaHasta)
  }
  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item sm={2}>
        <SideBar onClientSelect={handleClientSelect} />
      </Grid>
      <Grid item sm={10}>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <FiltroTabla onFilterChange={handleFilterChange} />
          </Grid>
          <Grid item>
            <Tabla
              clientId={selectedClientId}
              fechaDesde={fechaDesde}
              fechaHasta={fechaHasta}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Inicio
