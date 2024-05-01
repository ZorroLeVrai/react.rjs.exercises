import styles from "./Tooltip.module.css";
import PropTypes from 'prop-types';

const Tooltip = ({position, texts}) => {
  const {x, y} = position;

  return (
    <div data-testid="progressbar_tooltip" className={styles.tooltip} style={{top: y, left: x}}>
      {texts.map((text, index) => <div key={index}>{text}</div>)}
    </div>
  )
};

Tooltip.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  texts: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default Tooltip;