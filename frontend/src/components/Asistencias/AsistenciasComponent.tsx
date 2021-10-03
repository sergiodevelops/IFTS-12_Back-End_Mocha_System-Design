import React, { useState } from "react";
import { Divider, FormControlLabel, Grid, InputLabel, Radio, RadioGroup } from "@material-ui/core";
import store from '../../store/store';
import { asistenciaActions } from "../../actions/allActions";

type TypeAsistencia = {
    alumno: {
        nombres: string,
        apellido: string
    },
    cursoAlumnoId: number
}

export default function AsistenciasComponent(props: TypeAsistencia) {

    const [asistencia, setAsistencia] = useState("ausente");

    return (
        <Grid container key={Math.random()}>
            <Grid
                key={Math.random()}
                item xs={3}
                style={{ float: 'left', display: 'flex', alignItems: 'center' }}
            >
                <InputLabel>{props.alumno.apellido} {props.alumno.nombres}</InputLabel>
            </Grid>
            <Grid
                key={Math.random()}
                item xs={6}
                style={{ float: 'left', display: 'flex', flexDirection: 'row' }}
            >
                <RadioGroup key={Math.random()} aria-label="asistencia" name="asistencia" value={asistencia} 
                onChange={(e) => {
                    const asistenciaSelected = String(e.currentTarget.value);
                    setAsistencia(asistenciaSelected);

                    store.dispatch(asistenciaActions.asistenciaChanged(props.cursoAlumnoId, asistenciaSelected));
                }} 
                style={{ float: 'left', display: 'flex', flexDirection: 'row' }}>
                    <FormControlLabel value="presente" control={<Radio />} label="Presente" style={{ marginRight: "30px" }} />
                    <FormControlLabel value="ausente" control={<Radio />} label="Ausente" />
                </RadioGroup>
            </Grid>
            <Divider />
        </Grid>
    );
}