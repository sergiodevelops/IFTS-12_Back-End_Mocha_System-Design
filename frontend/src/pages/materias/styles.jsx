import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  buttonsActions: {
    margin: theme.spacing(1),
  },
  buttonNewMateria: {
    backgroundColor: theme.palette.success.main,
    color: 'white',
    "&:hover, &:focus": {
      backgroundColor: '#256a1d',
    },
  },
  submit: {
    margin: theme.spacing(1,0,5,1),
    color: 'white',
  },
  fontTitle: {
    textTransform: 'uppercase',
    color: theme.palette.text.secondary
  }
}));
