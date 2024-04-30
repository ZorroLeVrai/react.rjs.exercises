import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import styles from "./LinkElement.module.css";

const LinkElement = ({to, text}) => {
  return (
    <span className={styles.marginRight}>
      <Link to={to}>{text}</Link>
    </span>
  );
};

LinkElement.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default LinkElement;