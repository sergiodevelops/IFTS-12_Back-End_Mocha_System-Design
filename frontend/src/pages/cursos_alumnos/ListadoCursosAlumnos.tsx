import moment from 'moment';
import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SchoolIcon from '@material-ui/icons/School';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from "./styles";
import { notifierActions } from "../../actions/allActions";
import Notification from '../../models/Notification';
import AlertDialog from '../../components/Dialogs/AlertDialog';
import CursoAlumnoService from "../../services/CursoAlumnoService";
import store from "../../store/store";

export default function ListadoCursosAlumnos() {
  const cursoAlumnoService = new CursoAlumnoService();

  const classes = useStyles();
  
  const [cursosAlumnosCollection, setCursosAlumnosCollection] = useState<[]>([]);
  const [deleteCursoAlumno, setDeleteCursoAlumno] = useState(0);

  useEffect(() => {
    listadoCursosAlumnos();
  }, []);

  const listadoCursosAlumnos = async () => {
    const result = await cursoAlumnoService.list();
    setCursosAlumnosCollection(result);
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
      name: "curso",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any) => value.carreras_materia.carrera.nombre,
      },
    },
    {
      label: "Materia",
      name: "curso",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any) => value.carreras_materia.materia.nombre,
      },
    },
    {
      label: "Docente",
      name: "curso",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any) => `${value.docente.apellido} ${value.docente.nombres}`,
      },
    },
    {
      label: "Alumno",
      name: "alumno",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any) => `${value.apellido} ${value.nombres}`,
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
          const idCursoAlumno = tableMeta['rowData'][0];
          return (
            <div>                   
              <Button
                variant="contained"
                color="primary"
                style={{color: 'white', marginLeft: 20}}
                startIcon={<SchoolIcon />}
                size="medium"
                onClick={() => window.location.href = `/#/itm/evaluacionesFinales/${idCursoAlumno}`}
              >Evaluaciones Finales</Button>
              <Button
                variant="contained"
                color="secondary"
                style={{color: 'white', marginLeft: 20}}
                startIcon={<DeleteIcon/>}
                size="medium"
                onClick={() => {
                  setDeleteCursoAlumno(idCursoAlumno);
                }}
              >Baja</Button>
            </div> 
          );
        }
      }
    }
  ];

  const newCursoAlumno = () => {
    return (
      <span>
        <Button
          variant="contained"
          className={classes.buttonNewCurso}
          startIcon={<AddCircleIcon />}
          onClick={() => window.location.href = `/#/itm/cursos_alumnos/alta`}
        > 
        Alta de curso alumno
        </Button>
      </span> 
    );
  };

  const handleState = (state: boolean) => {
    if (state) removeCurso(deleteCursoAlumno);

    setDeleteCursoAlumno(0);
  } 

  const removeCurso = async(id: number) => {
    const result = await cursoAlumnoService.delete(id)
    .catch(error => console.log(error));

    if (result) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('success', 'Success', 'Eliminación del curso alumno exitoso')));
      listadoCursosAlumnos();
    }
  }

  const optionsDataTable: MUIDataTableOptions = {
    filter: true,
    filterType: "dropdown",
    customToolbar: newCursoAlumno,
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable title={"Listado de cursos/alumnos"} data={cursosAlumnosCollection} columns={columns} options={optionsDataTable}/>
          { deleteCursoAlumno ? <AlertDialog handleState={handleState} title={"Eliminación de curso"} text={"¿Está seguro que desea eliminar el curso/alumno seleccionado?"}></AlertDialog> : null }
        </Grid>        
      </Grid>
    </div>
  );
}
