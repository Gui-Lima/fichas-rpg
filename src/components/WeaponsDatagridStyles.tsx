import {makeStyles} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 500,
  },

  tableHeadRoot: {
    backgroundColor: "#1A1A1F"
  },

  tableHeadCells: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: 700
  },
  
  iconButtonRoot: {
    padding: 0
  },

  tableBodyCells: {
    padding: 8,
    fontSize: 15,
    fontWeight: 700,
    color: "#FFF",
    backgroundColor: "#1A1A1F"
  }
}))

export default useStyles