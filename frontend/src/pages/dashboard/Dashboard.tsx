import React from "react";
import { Typography } from "../../components/Wrappers/Wrappers";
import { Grid, Card, CardContent } from "@material-ui/core";
// import useStyles from "./styles";

export default function Dashboard() {
  // const classes = useStyles();

  const userLocalstorage = localStorage.getItem('user') || '{ username: "" }';
  const user = JSON.parse(userLocalstorage);
  const usernameSplit = user.username.split('.');
  const name = `${usernameSplit[0].charAt(0).toUpperCase()}${usernameSplit[0].slice(1)}`;

  return (
    <div style={{height: "100%"}}>
      <Grid container style={{height: "100%"}}>
        <Grid item xs={12}>
          <Card style={{color: "#4A4A4A", display: "flex", flexDirection: "column", height: "100%"}}>
            <CardContent>
              <Typography variant="h2" weight="medium" style={{marginBottom: 20}}>¡Bienvenido {name} al sistema ITM!</Typography>
              <Typography variant="h4" weight="medium">Por favor seleccione una opción del menú lateral.</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>                        
    </div>
  );
}
