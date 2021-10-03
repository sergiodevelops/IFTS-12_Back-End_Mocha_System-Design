type actionProps = {
    type: string,
    payload: {
        cursoAlumnoId: number,
        tipoAsistencia: string,
    }
}

const asistenciaChanged = (cursoAlumnoId: number, tipoAsistencia: string): actionProps => {
    return {
        type: 'ASISTENCIA_CHANGED',
        payload: {
            cursoAlumnoId,
            tipoAsistencia 
        }
    }
}

export default { asistenciaChanged };
