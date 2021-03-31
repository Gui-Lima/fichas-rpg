import React from "react"
import {Grid} from "@material-ui/core"
import { Life } from "../models/Life";
import { Sanity } from "../models/Sanity";
import { Status } from "../models/Status";


function Character(props: Props){
  return (<Grid></Grid>)
}


interface Props{
  life: Life,
  sanity: Sanity,
  status: Status,
  body: boolean,
}

export default Character