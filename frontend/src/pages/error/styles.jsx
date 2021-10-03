import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    position: "absolute",
    top: 0,
    left: 0,
  },  
  logotype: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(12),
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  logotypeImage: {
    width: 250,
    marginBottom: theme.spacing(4),
    borderRadius: 115,
  },    
  logotypeTypografyContainer: {
    display: 'flex',
    marginLeft: 20,
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center"
  },
  logotypeTextZoom: {
    color: "#FFFFFF",
    fontWeight: 800,
    fontSize: 70,
    letterSpacing: '-0.19rem',
    [theme.breakpoints.down("md")]: {
      fontSize: 48,
    },
  },
  logotypeTextScan: {
    color: "#ffffff",
    fontWeight: 800,
    fontSize: 84,
    letterSpacing: '-0.19rem',
    [theme.breakpoints.down("md")]: {
      fontSize: 48,
    },
  },
  paperRoot: {
    boxShadow: theme.customShadows.widgetDark,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    maxWidth: 404,
  },
  textRow: {
    marginBottom: theme.spacing(10),
    textAlign: "center",
  },
  errorCode: {
    fontSize: 148,
    fontWeight: 600,
  },
  safetyText: {
    fontWeight: 300,
    color: theme.palette.text.hint,
  },
  backButton: {
    boxShadow: theme.customShadows.widget,
    textTransform: "none",
    fontSize: 22,
    color: "#ffffff",  
  },
}));
