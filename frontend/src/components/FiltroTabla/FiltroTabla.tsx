import React, { useState } from 'react'
import { Grid, Button } from '@mui/material'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { format } from 'date-fns'

interface FiltroTablaProps {
  onFilterChange: (fechaDesde: string, fechaHasta: string) => void
}

const FiltroTabla: React.FC<FiltroTablaProps> = ({ onFilterChange }) => {
  const [fechaDesde, setFechaDesde] = useState<Date | null>(null)
  const [fechaHasta, setFechaHasta] = useState<Date | null>(null)

  const handleApplyFilters = () => {
    const formattedFechaDesde = fechaDesde
      ? format(fechaDesde, 'yyyy-MM-dd')
      : ''
    const formattedFechaHasta = fechaHasta
      ? format(fechaHasta, 'yyyy-MM-dd')
      : ''
    onFilterChange(formattedFechaDesde, formattedFechaHasta)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        mt="1.6em"
        alignItems="center"
      >
        <Grid item>
          <DatePicker
            label="Fecha Desde"
            value={fechaDesde}
            onChange={(date) => setFechaDesde(date)}
            slotProps={{ textField: { variant: 'outlined' } }}
          />
        </Grid>
        <Grid item>
          <DatePicker
            label="Fecha Hasta"
            value={fechaHasta}
            onChange={(date) => setFechaHasta(date)}
            slotProps={{ textField: { variant: 'outlined' } }}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleApplyFilters}>
            Aplicar Filtros
          </Button>
        </Grid>
      </Grid>
    </LocalizationProvider>
  )
}

export default FiltroTabla
