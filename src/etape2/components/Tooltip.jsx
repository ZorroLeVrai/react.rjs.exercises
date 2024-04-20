import React from 'react'
import styles from "./Tooltip.module.css";

const Tooltip = ({position, texts}) => {
  const {x, y} = position;

  return (
    <div data-testid="progressbar_tooltip" className={styles.tooltip} style={{top: y, left: x}}>
      {texts.map((text, index) => <div key={index}>{text}</div>)}
    </div>
  )
};

export default Tooltip;