import React from "react";
import "./InfoBlock.scss"

const InfoBlock = ({title, subtitle, ...rest}) => {
  return(
    <div
      className="info-block"
      {...rest}
    >
      <div>{title}</div>
      <div>{subtitle}</div>
    </div>
  )
}

export default InfoBlock;