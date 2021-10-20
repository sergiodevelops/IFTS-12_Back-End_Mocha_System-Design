import moment from 'moment';
import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import PlusIcon from '@material-ui/icons/ControlPoint';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from "./styles";
import { notifierActions } from "../../actions/allActions";
import Notification from '../../models/Notification';
import AlertDialog from '../../components/Dialogs/AlertDialog';
import CarreraMateriaService from "../../services/CarreraMateriaService";
import store from "../../store/store";

export default function ListadoCarrerasMaterias() {
  const userLocalstorage: any = localStorage.getItem('user');
  const user = JSON.parse(userLocalstorage);
  const carreraMateriaService = new CarreraMateriaService();

  const classes = useStyles();
  
  const [carrerasMateriasCollection, setCarrerasMateriasCollection] = useState<[]>([]);
  const [deleteCarreraMateria, setDeleteCarreraMateria] = useState(0);

  useEffect(() => {
    listadoCarrerasMaterias();
  }, []);

  const listadoCarrerasMaterias = async () => {
    const result = await carreraMateriaService.list();
    setCarrerasMateriasCollection(result);
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
      name: "carrera",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any) => value.nombre,
      },
    },
    {
      label: "Materia",
      name: "materia",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any) => value.nombre,
      },
    },
    {
      label: "Duración",
      name: "duracion",
      options: {
        filter: true,
        sort: true,
      },
    },    
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
          const idCarreraMateria = tableMeta['rowData'][0];
          return (
            <div>
              <Button
                variant="contained"
                color="primary"
                style={{color: 'white'}}
                startIcon={<VisibilityIcon/>}
                size="medium"
                onClick={() => window.location.href = `/#/ifts/correlativas/${idCarreraMateria}`}
              >Correlativas</Button>              
              <Button
                variant="contained"
                color="primary"
                style={{color: 'white', marginLeft: 20}}
                startIcon={<PlusIcon/>}
                size="medium"
                onClick={() => window.location.href = `/#/ifts/correlativas/${idCarreraMateria}/edit`}
              >Correlativas</Button>                 
              <Button
                variant="contained"
                color="secondary"
                style={{color: 'white', marginLeft: 20}}
                startIcon={<DeleteIcon/>}
                size="medium"
                onClick={() => {
                  setDeleteCarreraMateria(idCarreraMateria);
                }}
              >Eliminar</Button>
            </div> 
          );
        }
      }
    }
  ];

  const newCarreraMateria = () => {
    return (
      <span>
        <Button
          variant="contained"
          className={classes.buttonNewCarrera}
          startIcon={<AddCircleIcon />}
          onClick={() => window.location.href = `/#/ifts/carreras_materias/alta`}
        > 
        Asociación Carrera/Materia
        </Button>
      </span> 
    );
  };

  const handleState = (state: boolean) => {
    if (state) removeCarreraMateria(deleteCarreraMateria);

    setDeleteCarreraMateria(0);
  } 

  const removeCarreraMateria = async(id: number) => {
    const result = await carreraMateriaService.delete(id)
    .catch(error => console.log(error));

    if (result) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('success', 'Success', 'Eliminación de carrera/materia exitosa')));
      listadoCarrerasMaterias();
    } else {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'La carrera/materia no se puede eliminar')))
    }
  }

  const optionsDataTable: MUIDataTableOptions = {
    filter: true,
    filterType: "dropdown",
    customToolbar: newCarreraMateria,
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable title={"Listado de carreras/materias"} data={carrerasMateriasCollection} columns={columns} options={optionsDataTable}/>
          { deleteCarreraMateria ? <AlertDialog handleState={handleState} title={"Eliminación de Carrera/Materia"} text={"¿Está seguro que desea eliminar la carrera/materia seleccionada?"}></AlertDialog> : null }
        </Grid>        
      </Grid>
    </div>
  );
}
