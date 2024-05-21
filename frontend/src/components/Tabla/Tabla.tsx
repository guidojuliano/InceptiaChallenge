import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Alert,
  TableContainer,
  Paper,
  Backdrop,
  CircularProgress,
  Box,
  Chip,
} from '@mui/material'
import DateRangeIcon from '@mui/icons-material/DateRange'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import useApi from '../../api'
import { Reporte } from './Tabla.types'

interface TablaProps {
  clientId: number | null
  fechaDesde: string
  fechaHasta: string
}

const Tabla: React.FC<TablaProps> = ({ clientId, fechaDesde, fechaHasta }) => {
  const [reportes, setReportes] = useState<Reporte[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = React.useState(false)

  const api = useApi()

  useEffect(() => {
    const fetchCasos = async () => {
      setLoading(true)
      setError(null)
      setOpen(true)
      try {
        const response = await api.get('/inbound-case/', {
          params: {
            bot: clientId,
            local_updated__date__gte: fechaDesde,
            local_updated__date__lte: fechaHasta,
          },
        })
        setReportes(response.data.results)
      } catch (error) {
        console.error('Failed to fetch cases', error)
        setError('Error al obtener los datos. Intente nuevamente más tarde.')
      } finally {
        setLoading(false)
        setOpen(false)
      }
    }

    if (clientId && fechaDesde && fechaHasta) {
      fetchCasos()
    }
  }, [clientId, fechaDesde, fechaHasta])

  if (!clientId && fechaDesde !== '' && fechaHasta !== '') {
    return (
      <Alert severity="info">
        Selecciona un cliente y un rango de fechas para ver los reportes
      </Alert>
    )
  }

  return (
    <>
      {loading ? (
        <Typography variant="body1">
          <Backdrop
            open={open}
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Typography>
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: 'black' }}>
              <TableRow>
                <TableCell align="center">Gestionado</TableCell>
                <TableCell align="center">ID Caso</TableCell>
                <TableCell align="center">Teléfono</TableCell>
                <TableCell align="center">DNI</TableCell>
                <TableCell align="center">Grupo</TableCell>
                <TableCell align="center">Orden</TableCell>
                <TableCell align="center">Duración</TableCell>
                <TableCell align="center">Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8}>
                    <Typography variant="body1">
                      No se encontraron reportes
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {reportes.map((reporte) => (
                <TableRow key={reporte.id}>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <DateRangeIcon sx={{ mr: 1 }} /> {reporte.last_updated}
                    </Box>
                  </TableCell>
                  <TableCell align="center">{reporte.case_uuid}</TableCell>
                  <TableCell align="center">{reporte.phone}</TableCell>
                  <TableCell align="center">
                    {reporte.extra_metadata.dni}
                  </TableCell>
                  <TableCell align="center">
                    {reporte.extra_metadata.grupo}
                  </TableCell>
                  <TableCell align="center">
                    {reporte.extra_metadata.orden}
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyItems: 'center',
                      }}
                    >
                      <AccessTimeIcon sx={{ mr: 1 }} /> {reporte.case_duration}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Chip label={reporte.case_result.name} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}

export default Tabla
