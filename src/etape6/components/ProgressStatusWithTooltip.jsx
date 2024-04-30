import withToolTip from "../hoc/withToolTip"
import ProgressStatus from "./ProgressStatus"
import Tooltip from "./Tooltip"

const renderTooltip = (mousePosition, texts) => { 
  return <Tooltip position={mousePosition} texts={texts}/>
}

const ProgressStatusWithTooltip = withToolTip(
  ProgressStatus,
  renderTooltip
);

export default ProgressStatusWithTooltip;