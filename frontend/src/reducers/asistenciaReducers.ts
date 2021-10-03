const asistenciaReducer = (state: Object = {}, action: any) => {
    switch (action.type) {
        case "ASISTENCIA_CHANGED":
            return { ...state, cursoAlumnoId: action.payload.cursoAlumnoId, tipoAsistencia: action.payload.tipoAsistencia };
        default: {
            return state;
        }
    }
}

export default asistenciaReducer;
