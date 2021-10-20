import moment from 'moment';
import React, { useEffect, useState } from "react";
import { Grid, Card, Button, CardActions, CardContent, TextField, FormControl } from "@material-ui/core";
import { useParams } from "react-router-dom";
import useStyles from "./styles";
import store from '../../store/store';
import { notifierActions } from "../../actions/allActions";
import Notification from '../../models/Notification';
import CursoAlumnoService from "../../services/CursoAlumnoService";
import CursoService from "../../services/CursoService";
import AsistenciasComponent from "../../components/Asistencias/AsistenciasComponent";
import AsistenciaService from '../../services/AsistenciaService';

export default function AltaAsistencias() {
  const cursoAlumnoService = new CursoAlumnoService();
  const cursoService = new CursoService();
  const asistenciaService = new AsistenciaService();

  const classes = useStyles();

  const { id } = useParams();

  const [asistenciaCollection, setAsistenciaCollection] = useState([]);
  const [fechaAsistencia, setFechaAsistencia] = useState(moment().format('YYYY-MM-DD'));
  const [cursoObject, setCursoObject] = useState({ docente: { apellido: "", nombres: "" }, carreras_materia: { carrera: { nombre: "" }, materia: { nombre: "" } } });
  const [cursoAlumnoCollection, setCursoAlumnoCollection] = useState([]);

  useEffect(() => {
    loadCurso();
    loadCursosAlumnos();
  }, []);

  const unsubscribe = store.subscribe(() => {
    const asistencia: any = store.getState().asistencia;
    // Update asistencias

    setAsistenciaCollection((prevState: any) => {
      const asistenciaPrevStateIndex = prevState.findIndex((prevAsistencia: any) => prevAsistencia.cursoAlumnoId === asistencia.cursoAlumnoId);
      const asistencias = prevState;
      asistencias[asistenciaPrevStateIndex] = asistencia;

      return asistencias;
    });
  });

  useEffect(() => {
    return () => unsubscribe();
  }, [unsubscribe]);

  const loadCurso = async () => {
    const result = await cursoService.read(id)
      .catch(error => console.log(error));

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

    // carga de asistencia por default
    const asistenciaMap = result.map((row: any) => { return { tipoAsistencia: 'presente', cursoAlumnoId: row.id } })
    setAsistenciaCollection(asistenciaMap);
  }

  const saveAsistencias = async () => {
    if (fechaAsistencia === "") {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Por favor complete los campos requeridos')));
      return;
    }

    const asistencias = asistenciaCollection.map((asistenciaRow: any) => {
      return {
        curso_alumno_id: asistenciaRow.cursoAlumnoId,
        tipo_asistencia: asistenciaRow.tipoAsistencia,
        fecha_asistencia: fechaAsistencia
      }
    });

    const result = await asistenciaService.createBulk(asistencias)
      .catch((error: Error) => console.log(error));

    if (!result) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Hubo un error al cargar las asistencias')));
      return;
    }

    store.dispatch(notifierActions.enqueueNotification(new Notification('success', 'Success', 'Asistencias cargadas correctamente')));
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
                Asistencias del Curso
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
                    id="fecha-asistencia"
                    label="Fecha asistencia"
                    placeholder={"Por favor ingrese la fecha de asistencia"}
                    required
                    type={"date"}
                    defaultValue={(() => {
                      return moment().format('YYYY-MM-DD');
                    })()}
                    error={fechaAsistencia === "" ? true : false}
                    variant="outlined"
                    onChange={(e) => {
                      const fecha = String(e.currentTarget.value);
                      setFechaAsistencia(fecha);
                    }}
                  />
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
                    <AsistenciasComponent key={Math.random()} alumno={alumnoObject.alumno} cursoAlumnoId={alumnoObject.id}></AsistenciasComponent>
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
                onClick={saveAsistencias}
              >Registrar</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
