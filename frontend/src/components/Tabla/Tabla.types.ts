export interface Reporte {
  id: number
  last_updated: string
  case_uuid: string
  phone: number
  extra_metadata: {
    dni: string
    grupo: string
    orden: string
  }
  case_duration: string
  case_result: {
    name: string
  }
}
