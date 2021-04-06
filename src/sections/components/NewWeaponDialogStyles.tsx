import {makeStyles} from "@material-ui/core"

const useStyles = makeStyles((theme)=> ({
  contentRoot: {
    overflowY: "unset"
  },

  dialogPaper: {
    backgroundColor: "#333334"
  },

  selectRoot: {
    color:"#FFF"
  },

  buttonRoot:{
    backgroundColor: '#4B4B4C',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#3E3E3F',
      color: '#fff',
    }
  }
}))


export default useStyles