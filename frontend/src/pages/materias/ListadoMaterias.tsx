import moment from 'moment';
import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import useStyles from "./styles";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PlusIcon from '@material-ui/icons/ControlPoint';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { notifierActions } from "../../actions/allActions";
import Notification from '../../models/Notification';
import AlertDialog from '../../components/Dialogs/AlertDialog';
import MateriaService from "../../services/MateriaService";
import store from "../../store/store";

export default function ListadoMaterias() {
  const userLocalstorage: any = localStorage.getItem('user');
  const user = JSON.parse(userLocalstorage);
  const materiasService = new MateriaService();

  const classes = useStyles();
  
  const [materiasCollection, setMateriasCollection] = useState<[]>([]);
  const [deleteMateria, setDeleteMateria] = useState(0);

  useEffect(() => { 
    listadoMaterias();
  }, []);

  const listadoMaterias = async () => {
    const result = await materiasService.list();
    setMateriasCollection(result);
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
      label: "Nombre",
      name: "nombre",
      options: {
        filter: true,
        sort: true,
      },
    },
    // {
    //   label: "Turno",
    //   name: "turno_nombre",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    // {
    //   label: "Estado",
    //   name: "estado",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    // {
    //   label: "Duración",
    //   name: "duracion",
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
          const idMateria = tableMeta['rowData'][0];
          return (
            <div>   
              <Button
                variant="contained"
                color="primary"
                style={{color: 'white', marginLeft: 20}}
                startIcon={<EditIcon/>}
                size="medium"
                onClick={() => window.location.href = `/#/ifts/materias/${idMateria}`}
              >Editar</Button>
              <Button
                variant="contained"
                color="secondary"
                style={{color: 'white', marginLeft: 20}}
                startIcon={<DeleteIcon/>}
                size="medium"
                onClick={() => {
                  setDeleteMateria(idMateria);
                }}
              >Eliminar</Button>
            </div> 
          );
        }
      }
    }
  ];

  const newMateria = () => {
    return (
      <span>
        <Button
          variant="contained"
          className={classes.buttonNewMateria}
          startIcon={<AddCircleIcon />}
          onClick={() => window.location.href = `/#/ifts/materias/alta`}
        > 
        Nueva Materia
        </Button>
      </span> 
    );
  };

  const handleState = (state: boolean) => {
    if (state) removeMateria(deleteMateria);

    setDeleteMateria(0);
  } 

  const removeMateria = async(id: number) => {
    const result = await materiasService.delete(id)
    .catch(error => console.log(error));

    if (result) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('success', 'Success', 'Eliminación del materia exitosa')));
      listadoMaterias();
    } else {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'La materia no se puede eliminar ya que posee carreras/materias activos')))
    }
  }

  const optionsDataTable: MUIDataTableOptions = {
    filter: true,
    filterType: "dropdown",
    customToolbar: newMateria,
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable title={"Listado de materias"} data={materiasCollection} columns={columns} options={optionsDataTable}/>
          { deleteMateria ? <AlertDialog handleState={handleState} title={"Eliminación de Materia"} text={"¿Está seguro que desea eliminar la materia seleccionada?"}></AlertDialog> : null }
        </Grid>        
      </Grid>
    </div>
  );
}
