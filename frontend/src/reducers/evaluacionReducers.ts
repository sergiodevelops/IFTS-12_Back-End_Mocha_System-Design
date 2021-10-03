const evaluacionReducers = (state: Object = {}, action: any) => {
    switch (action.type) {
        case "EVALUACION_CHANGED":
            return { 
                ...state, 
                cursoAlumnoId: action.payload.cursoAlumnoId, 
                nota: action.payload.nota,
                hoja: action.payload.hoja,
                folio: action.payload.folio
            };
        default: {
            return state;
        }
    }
}

export default evaluacionReducers;
