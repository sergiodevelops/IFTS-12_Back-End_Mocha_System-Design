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

export default function AltaEvaluacionesFinales() {
  const cursoAlumnoService = new CursoAlumnoService();
  const cursoService = new CursoService();
  const evaluacionService = new EvaluacionService();

  const classes = useStyles();

  const { id } = useParams();

  const [evaluacionCollection, setEvaluacionCollection] = useState([]);
  const [fechaEvaluacion, setFechaEvaluacion] = useState(moment().format('YYYY-MM-DD'));
  const [tipoEvaluacion, setTipoEvaluacion] = useState("final");
  const [cursoObject, setCursoObject] = useState({ docente: { apellido: "", nombres: "" }, carreras_materia: { carrera: { nombre: "" }, materia: { nombre: "" } } });
  const [cursoAlumnoObject, setCursoAlumnoObject] = useState({alumno: { nombres: "", apellido: ""}, id: 0});

  useEffect(() => {
    // loadCurso();
    loadCursoAlumno();
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

  // const loadCurso = async () => {
  //   const result = await cursoService.read(id)
  //     .catch(error => (error));

  //   if (!result) {
  //     store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Curso inexistente')));
  //     window.location.href = '/#/ifts/cursos';
  //     return;
  //   }

  //   setCursoObject(result.model);
  // }

  const loadCursoAlumno = async () => {
    const result = await cursoAlumnoService.read(id)
      .catch(error => (error));

    if (!result) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Curso alumno inexistente')));
      window.location.href = '/#/ifts/cursos_alumnos';
      return;
    }
    console.log(result.model);
    setCursoAlumnoObject(result.model);
    setCursoObject(result.model.curso);

    // carga de evaluacion por default
    const evaluacionDefault: any = [{ cursoAlumnoId: result.model.id, tipoEvaluacion: 'final', fechaEvaluacion: fechaEvaluacion, nota: 0, folio: "", hoja: "" }];
    setEvaluacionCollection(evaluacionDefault);
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
        tipo_evaluacion: tipoEvaluacion,
        fecha_evaluacion: fechaEvaluacion,
        nota: evaluacionRow.nota,
        folio: evaluacionRow.folio,
        hoja: evaluacionRow.hoja
      }
    });

    const result = await evaluacionService.createBulk(evaluaciones)
      .catch((error: Error) => console.log(error));

    if (!result) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Verificar los finales de las correlativas')));
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Verificar si ya existe el final aprobado')));
      return;
    }

    store.dispatch(notifierActions.enqueueNotification(new Notification('success', 'Success', 'Final cargado correctamente')));
    setTimeout(() => {
      window.location.href = '/#/ifts/cursos_alumnos';
    }, 5000);
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <h2 className={classes.fontTitle}>
                Alta evaluaciones finales
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
                    <FormControlLabel value="final" control={<Radio />} label="Final" />
                  </RadioGroup>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <FormControl style={{ marginTop: 20 }}>
                    <h4 className={classes.fontTitle}>
                      Alumno
                  </h4>
                  </FormControl>
                </Grid>
              </Grid>              
              <EvaluacionesComponent key={Math.random()} alumno={cursoAlumnoObject.alumno} cursoAlumnoId={cursoAlumnoObject.id}></EvaluacionesComponent>
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
