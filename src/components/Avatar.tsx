import React from "react"

function Avatar(props: Props){

  return <div style={{borderRadius: "50%", height: 100, width:100, overflow: "hidden"}}> <img alt="avatar" src={props.imageSrc} style={{maxWidth: "100%", maxHeight:"100%"}}></img> </div>
}

interface Props{
  imageSrc: string
}

export default Avatar