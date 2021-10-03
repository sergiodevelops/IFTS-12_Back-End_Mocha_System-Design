import React, { useState } from "react";
import { FormControl, Grid, InputLabel, TextField } from "@material-ui/core";
import store from '../../store/store';
import { evaluacionActions } from "../../actions/allActions";

type TypeEvaluacion = {
    alumno: {
        nombres: string,
        apellido: string
    },
    cursoAlumnoId: number
}

export default function EvaluacionesComponent(props: TypeEvaluacion) {

    const [nota, setNota] = useState(0);
    const [folio, setFolio] = useState("");
    const [hoja, setHoja] = useState("");

    return (
        <Grid container style={{marginTop: 10}}>
            <Grid
               
                item xs={3}
                style={{ float: 'left', display: 'flex', alignItems: 'center' }}
            >
                <InputLabel>{props.alumno.apellido} {props.alumno.nombres}</InputLabel>
            </Grid>
            <Grid item xs={2}>
                <FormControl style={{ width: "80%" }}>
                    <TextField
                        id="nota"
                        label="Nota"
                        type="number"
                        variant="outlined"
                        value={nota}
                        required
                        error={nota <= 0}
                        onChange={(e) => {
                            const notaSelected = Number(e.currentTarget.value);
                            setNota(notaSelected);

                            store.dispatch(evaluacionActions.evaluacionChanged(props.cursoAlumnoId, notaSelected, folio, hoja));
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={2}>
                <FormControl style={{ width: "80%" }}>
                    <TextField
                        id="folio"
                        label="Folio"
                        variant="outlined"
                        value={folio}
                        onChange={(e) => {
                            const folioSelected = String(e.currentTarget.value);
                            setFolio(folioSelected);

                            store.dispatch(evaluacionActions.evaluacionChanged(props.cursoAlumnoId, nota, folioSelected, hoja));
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={2}>
                <FormControl style={{ width: "80%" }}>
                    <TextField
                        id="hoja"
                        label="Hoja"
                        variant="outlined"
                        value={hoja}
                        onChange={(e) => {
                            const hojaSelected = String(e.currentTarget.value);
                            console.log(hojaSelected);
                            setHoja(hojaSelected);

                            store.dispatch(evaluacionActions.evaluacionChanged(props.cursoAlumnoId, nota, folio, hojaSelected));
                        }}
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
}