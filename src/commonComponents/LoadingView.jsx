import { composeStyles } from "../etape7/tools";
import styles from "./LoadingView.module.css";

const LoadingView = () => {
  const divStyles = composeStyles("center-text", "large-text", styles.loadingView);

  return (
    <div className={divStyles}>Chargement des données...</div>
  )
}

export default LoadingView;