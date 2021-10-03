import moment from 'moment';
import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import useStyles from "./styles";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { notifierActions } from "../../actions/allActions";
import Notification from '../../models/Notification';
import AlertDialog from '../../components/Dialogs/AlertDialog';
import AlumnoService from "../../services/AlumnoService";
import store from "../../store/store";

export default function ListadoAlumnos() {
  const userLocalstorage: any = localStorage.getItem('user');
  const user = JSON.parse(userLocalstorage);
  const alumnoService = new AlumnoService();

  const classes = useStyles();
  
  const [alumnosCollection, setAlumnosCollection] = useState<[]>([]);
  const [deleteAlumno, setDeleteAlumno] = useState(0);

  useEffect(() => {
    listadoAlumnos();
  }, []);

  const listadoAlumnos = async () => {
    const result = await alumnoService.list();
    setAlumnosCollection(result);
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
      label: "Nombres",
      name: "nombres",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Apellido",
      name: "apellido",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Teléfono",
      name: "telefono",
      options: {
        filter: true,
        sort: true,
      },
    },
    {  
      label: "Celular",
      name: "celular",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Email",
      name: "email",
      options: {
        filter: true,
        sort: true,
      },
    },
    // {
    //   label: "Estado",
    //   name: "estado",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    // {
    //   label: "Fecha Estado",
    //   name: "fecha_estado",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    {
      label: "Fecha de creación",
      name: "createdAt",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: string) => moment(value).format('DD-MM-YYYY HH:mm:ss'),
      },
    },
    {
      name: "Acciones",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value: string, tableMeta: any) => {    
          const idAlumno = tableMeta['rowData'][0];
          return (
            <div>              
              <Button
                variant="contained"
                color="primary"
                style={{color: 'white'}}
                startIcon={<EditIcon/>}
                size="medium"
                onClick={() => window.location.href = `/#/itm/alumnos/${idAlumno}`}
              >Editar</Button>
              <Button
                variant="contained"
                color="secondary"
                style={{color: 'white', marginLeft: 20}}
                startIcon={<DeleteIcon/>}
                size="medium"
                onClick={() => {
                  setDeleteAlumno(idAlumno);
                }}
              >Eliminar</Button>
            </div> 
          );
        }
      }
    }
  ];

  const newAlumno = () => {
    return (
      <span>
        <Button
          variant="contained"
          className={classes.buttonNewAlumno}
          startIcon={<AddCircleIcon />}
          onClick={() => window.location.href = `/#/itm/alumnos/alta`}
        > 
        Nuevo Alumno
        </Button>
      </span> 
    );
  };

  const handleState = (state: boolean) => {
    if (state) removeAlumno(deleteAlumno);

    setDeleteAlumno(0);
  } 

  const removeAlumno = async(id: number) => {
    const result = await alumnoService.delete(id)
    .catch(error => console.log(error));

    if (result) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('success', 'Success', 'Eliminación del alumno exitoso')));
      listadoAlumnos();
    } else {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'El alumno no se puede eliminar ya que posee cursos activos')))
    }
  }

  const optionsDataTable: MUIDataTableOptions = {
    filter: true,
    filterType: "dropdown",
    customToolbar: newAlumno,
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable title={"Listado de alumnos"} data={alumnosCollection} columns={columns} options={optionsDataTable}/>
          { deleteAlumno ? <AlertDialog handleState={handleState} title={"Eliminación de Alumno"} text={"¿Está seguro que desea eliminar el alumno seleccionado?"}></AlertDialog> : null }
        </Grid>        
      </Grid>
    </div>
  );
}
