import React from "react";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import logo from "../../logo.jpg";

export default function Error() {
  var classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotype}>
        <img src={logo} alt="ITM" className={classes.logotypeImage} />
        <div className={classes.logotypeTypografyContainer}>
          <Typography className={classes.logotypeTextZoom}>ITM</Typography>
          <Typography className={classes.logotypeTextZoom} style={{fontSize: 50}}>Instituto Tecnológico Municipal</Typography>
        </div>        
      </div>
      <Paper classes={{ root: classes.paperRoot }}>
        <Typography
          variant="h1"
          color="primary"
          className={classnames(classes.textRow, classes.errorCode)}
        >
          404
        </Typography>
        <Typography variant="h5" color="primary" className={classes.textRow}>
          Ups. La página que estás buscando no existe.
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          className={classnames(classes.textRow, classes.safetyText)}
        >
          Presiona el botón volver para regresar al menú principal
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          size="large"
          className={classes.backButton}
        >
          Volver
        </Button>
      </Paper>
    </Grid>
  );
}
