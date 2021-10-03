type actionProps = {
    type: string,
    payload: {
        cursoAlumnoId: number,
        nota: number,
        hoja: string,
        folio: string
    }
}

const evaluacionChanged = (cursoAlumnoId: number, nota: number, folio: string, hoja: string): actionProps => {
    return {
        type: 'EVALUACION_CHANGED',
        payload: {
            cursoAlumnoId,
            nota,
            hoja, 
            folio 
        }
    }
}

export default { evaluacionChanged };
