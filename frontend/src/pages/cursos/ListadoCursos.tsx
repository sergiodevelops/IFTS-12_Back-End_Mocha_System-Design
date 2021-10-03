import moment from 'moment';
import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import EditIcon from '@material-ui/icons/Edit';
import EventIcon from '@material-ui/icons/Event';
import DeleteIcon from '@material-ui/icons/Delete';
import SchoolIcon from '@material-ui/icons/School';
import useStyles from "./styles";
import { notifierActions } from "../../actions/allActions";
import Notification from '../../models/Notification';
import AlertDialog from '../../components/Dialogs/AlertDialog';
import CursoService from "../../services/CursoService";
import store from "../../store/store";

export default function ListadoCursos() {
  const cursoService = new CursoService();

  const classes = useStyles();

  const [cursoCollection, setCursoCollection] = useState<[]>([]);
  const [deleteCurso, setDeleteCurso] = useState(0);

  useEffect(() => {
    listadoCursos();
  }, []);

  const listadoCursos = async () => {
    const result = await cursoService.list();
    setCursoCollection(result);
  };

  const columns = [
    {
      label: "Id",
      name: "id",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Carrera",
      name: "carreras_materia",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any) => value.carrera.nombre,
      },
    },
    {
      label: "Materia",
      name: "carreras_materia",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any) => value.materia.nombre,
      },
    },
    {
      label: "Docente",
      name: "docente",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any) => `${value.apellido} ${value.nombres}`,
      },
    },
    {
      label: "Cupo máximo",
      name: "cupo_maximo",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Cantidad inscriptos",
      name: "cantidad_inscriptos",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Fecha desde",
      name: "fecha_desde",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: string) => moment(value).format('DD-MM-YYYY'),
      },
    },
    {
      name: "Acciones",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value: string, tableMeta: any) => {
          const idCurso = tableMeta['rowData'][0];
          return (
            <div>
              <Button
                variant="contained"
                color="primary"
                style={{ color: 'white', marginLeft: 20, marginTop: 5 }}
                startIcon={<EventIcon />}
                size="medium"
                onClick={() => window.location.href = `/#/itm/asistencias/${idCurso}`}
              >Asistencias</Button>
              <Button
                variant="contained"
                color="primary"
                style={{ color: 'white', marginLeft: 20, marginTop: 5 }}
                startIcon={<SchoolIcon />}
                size="medium"
                onClick={() => window.location.href = `/#/itm/evaluaciones/${idCurso}`}
              >Evaluaciones Parciales</Button>
              <Button
                variant="contained"
                color="primary"
                style={{ color: 'white', marginLeft: 20, marginTop: 5 }}
                startIcon={<EditIcon />}
                size="medium"
                onClick={() => window.location.href = `/#/itm/cursos/${idCurso}/edit`}
              >Editar</Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ color: 'white', marginLeft: 20, marginTop: 5 }}
                startIcon={<DeleteIcon />}
                size="medium"
                onClick={() => {
                  setDeleteCurso(idCurso);
                }}
              >Baja</Button>
              <Button
                variant="contained"
                color="primary"
                style={{ color: 'white', marginLeft: 20, marginTop: 5 }}
                startIcon={<PlaylistAddCheckIcon />}
                size="medium"
                onClick={() => {
                  cursoService.getEvaluacionesByCurso(idCurso);
                }}
              >Reporte</Button>
            </div>
          );
        }
      }
    }
  ];

  const newCurso = () => {
    return (
      <span>
        <Button
          variant="contained"
          className={classes.buttonNewCarrera}
          startIcon={<AddCircleIcon />}
          onClick={() => window.location.href = `/#/itm/cursos/alta`}
        >
          Alta de Cursos
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ color: 'white', marginLeft: 20 }}
          startIcon={<PlaylistAddCheckIcon />}
          size="medium"
          onClick={() => {
            cursoService.getEvaluaciones();
          }}
        >Reporte Evaluaciones</Button>
      </span>
    );
  };

  const handleState = (state: boolean) => {
    if (state) removeCurso(deleteCurso);

    setDeleteCurso(0);
  }

  const removeCurso = async (id: number) => {
    const result = await cursoService.delete(id)
      .catch(error => console.log(error));

    if (result) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('success', 'Success', 'Eliminación del curso exitoso')));
      listadoCursos();
    } else {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'El curso no se puede eliminar ya que posee alumnos activos')))
    }
  }

  const optionsDataTable: MUIDataTableOptions = {
    filter: true,
    filterType: "dropdown",
    customToolbar: newCurso,
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable title={"Listado de cursos"} data={cursoCollection} columns={columns} options={optionsDataTable} />
          {deleteCurso ? <AlertDialog handleState={handleState} title={"Eliminación del curso"} text={"¿Está seguro que desea eliminar el curso?"}></AlertDialog> : null}
        </Grid>
      </Grid>
    </div>
  );
}
