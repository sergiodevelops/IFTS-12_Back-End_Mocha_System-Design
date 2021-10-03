import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  card: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
  },
  visitsNumberContainer: {
    display: "flex",
    alignItems: "center",
    paddingBottom: theme.spacing(1),
  },      
  fullHeightBody: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }
}));
