export interface Turno {
  id: number;
  estado_turno: string;
  estado_turno_id: number;
  horario_id: number;
  horario: string;
  fecha: string;
  medico_id: number;
  nombre_medico: string;
  apellido_medico: string;
  especialista_en: string;
  especialista_en_id: number;
  nombre_paciente: string;
  apellido_paciente: string;
  obra_social: boolean;
  nombre_recepcion: string;
  apellido_recepcion: string;
  legajo: string;
}
