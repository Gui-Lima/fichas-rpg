import {makeStyles} from "@material-ui/core"


const useStyles = makeStyles((theme) => ({

  container: {
    [theme.breakpoints.down("md")]: {
      paddingTop: 10,
      paddingLeft: 20,
      paddingRight: 23,
      paddingBottom: 20
    },

    [theme.breakpoints.up("md")]: {
      paddingTop: 25,
      paddingLeft: 160,
      paddingRight: 160,
      paddingBottom: 50
    },
    backgroundColor: "#1A1A1A"
  },
  
  buttonsRoot: {
    color: "#FFF"
  }

}))


export default useStyles