import moment from 'moment';
import React, { useEffect, useState } from "react";
import { Grid, Card, Button, CardActions, CardContent, TextField, FormControl, RadioGroup, FormControlLabel, Radio, InputLabel } from "@material-ui/core";
import { useParams } from "react-router-dom";
import useStyles from "./styles";
import store from '../../store/store';
import { notifierActions } from "../../actions/allActions";
import Notification from '../../models/Notification';
import CursoAlumnoService from "../../services/CursoAlumnoService";
import CursoService from "../../services/CursoService";
import EvaluacionesComponent from "../../components/Evaluaciones/EvaluacionesComponent";
import EvaluacionService from '../../services/EvaluacionService';

export default function AltaEvaluaciones() {
  const cursoAlumnoService = new CursoAlumnoService();
  const cursoService = new CursoService();
  const evaluacionService = new EvaluacionService();

  const classes = useStyles();

  const { id } = useParams();

  const [evaluacionCollection, setEvaluacionCollection] = useState([]);
  const [fechaEvaluacion, setFechaEvaluacion] = useState(moment().format('YYYY-MM-DD'));
  const [tipoEvaluacion, setTipoEvaluacion] = useState("parcial");
  const [cursoObject, setCursoObject] = useState({ docente: { apellido: "", nombres: "" }, carreras_materia: { carrera: { nombre: "" }, materia: { nombre: "" } } });
  const [cursoAlumnoCollection, setCursoAlumnoCollection] = useState([]);

  useEffect(() => {
    loadCurso();
    loadCursosAlumnos();
  }, []);

  const unsubscribe = store.subscribe(() => {
    const evaluacion: any = store.getState().evaluacion;
    // Update evaluaciones
    setEvaluacionCollection((prevState: any) => {
      const evaluacionPrevStateIndex = prevState.findIndex((prevEvaluacion: any) => prevEvaluacion.cursoAlumnoId === evaluacion.cursoAlumnoId);
      const evaluaciones = prevState;
      evaluaciones[evaluacionPrevStateIndex] = evaluacion;

      return evaluaciones;
    });
  });

  useEffect(() => {
    return () => unsubscribe();
  }, [unsubscribe]);

  const loadCurso = async () => {
    const result = await cursoService.read(id)
      .catch(error => (error));

    if (!result) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Curso inexistente')));
      window.location.href = '/#/ifts/cursos';
      return;
    }

    setCursoObject(result.model);
  }

  const loadCursosAlumnos = async () => {
    const result = await cursoAlumnoService.listByQuery({ curso_id: id })
      .catch(error => console.log(error));

    if (!result || result.length === 0) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Curso sin alumnos asignados')));
      window.location.href = '/#/ifts/cursos';
      return;
    }

    setCursoAlumnoCollection(result);

    // carga de evaluacion por default
    const evaluacionesMap = result.map((row: any) => { return { cursoAlumnoId: row.id, tipoEvaluacion: 'parcial', fechaEvaluacion: fechaEvaluacion, nota: 0, folio: "", hoja: "" } })
    setEvaluacionCollection(evaluacionesMap);
  }

  const saveEvaluaciones = async () => {    
    if (fechaEvaluacion === "" || tipoEvaluacion === "") {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Por favor complete los campos requeridos')));
      return;
    }

    const checkEvaluaciones = evaluacionCollection.find((evaluacionRow: any) => evaluacionRow.nota <= 0 || evaluacionRow.nota > 10);
    if (checkEvaluaciones) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Por favor complete las notas entre 1 y 10 hasta 2 decimales')));
      return;
    }

    const evaluaciones = evaluacionCollection.map((evaluacionRow: any) => {
      return {
        curso_alumno_id: evaluacionRow.cursoAlumnoId,
        tipo_evaluacion: evaluacionRow.tipoEvaluacion,
        fecha_evaluacion: fechaEvaluacion,
        nota: evaluacionRow.nota,
        folio: evaluacionRow.folio,
        hoja: evaluacionRow.hoja
      }
    });

    const result = await evaluacionService.createBulk(evaluaciones)
      .catch((error: Error) => console.log(error));

    if (!result) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Hubo un error al cargar las evaluaciones')));
      return;
    }

    store.dispatch(notifierActions.enqueueNotification(new Notification('success', 'Success', 'Evaluaciones cargadas correctamente')));
    setTimeout(() => {
      window.location.href = '/#/ifts/cursos';
    }, 5000);
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <h2 className={classes.fontTitle}>
                Evaluaciones del Curso
            </h2>
              <Grid container style={{ marginTop: "2%" }}>
                <Grid item xs={4}>
                  <FormControl style={{ width: "80%" }}>
                    <TextField
                      id="carrera-nombre"
                      label="Nombre de la carrera"
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                      value={cursoObject.carreras_materia.carrera.nombre}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl style={{ width: "80%" }}>
                    <TextField
                      id="materia-nombre"
                      label="Nombre de la materia"
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                      value={cursoObject.carreras_materia.materia.nombre}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl style={{ width: "80%" }}>
                    <TextField
                      id="docente-nombre"
                      label="Docente del curso"
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                      value={`${cursoObject.docente.apellido} ${cursoObject.docente.nombres}`}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container style={{ marginTop: "4%" }}>
                <Grid item xs={4}>
                  <TextField
                    style={{ width: "80%" }}
                    id="fecha-evaluacion"
                    label="Fecha evaluación"
                    placeholder={"Por favor ingrese la fecha de evaluación"}
                    required
                    type={"date"}
                    defaultValue={(() => {
                      return moment().format('YYYY-MM-DD');
                    })()}
                    error={fechaEvaluacion === "" ? true : false}
                    variant="outlined"
                    onChange={(e) => {
                      const fecha = String(e.currentTarget.value);
                      setFechaEvaluacion(fecha);
                    }}
                  />
                </Grid>
                <Grid
                  key={Math.random()}
                  item xs={4}
                  style={{ float: 'left', display: 'flex', flexDirection: 'row', alignItems: "center" }}
                >
                  <InputLabel>Tipo evaluación</InputLabel>
                  <RadioGroup key={Math.random()} aria-label="tipo-evaluacion" name="tipo-evaluacion" value={tipoEvaluacion}
                    onChange={(e) => {
                      const tipoEvaluacionSelected = String(e.currentTarget.value);
                      setTipoEvaluacion(tipoEvaluacionSelected);
                    }}
                    style={{ float: 'left', display: 'flex', flexDirection: 'row', marginLeft: 15 }}>
                    <FormControlLabel value="parcial" control={<Radio />} label="Parcial" style={{ marginRight: "30px" }} />
                    {/* <FormControlLabel value="final" control={<Radio />} label="Final" /> */}
                  </RadioGroup>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <FormControl style={{ marginTop: 20 }}>
                    <h4 className={classes.fontTitle}>
                      Alumnos
                  </h4>
                  </FormControl>
                </Grid>
              </Grid>
              {
                cursoAlumnoCollection.map((alumnoObject: any, index) => {
                  return (
                    <EvaluacionesComponent key={Math.random()} alumno={alumnoObject.alumno} cursoAlumnoId={alumnoObject.id}></EvaluacionesComponent>
                  );
                })
              }
            </CardContent>
            <CardActions>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={saveEvaluaciones}
              >Registrar</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
