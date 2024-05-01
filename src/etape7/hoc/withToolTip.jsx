import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

/* Higher Order Component to add a tooltip to a React component*/
/* renderTooltip uses a render prop to render its component */

const withToolTip = (Component, renderTooltip) => {
  const EnhancedComponent = (props) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const {totalTime, timeToComplete } = props;
    const { t } = useTranslation();

    const generatedTooltipText = useMemo(() => {
      return [
        t("total_time", {time: totalTime}),
        t("remaining_time", {time: timeToComplete})
      ];
    }, [t, totalTime, timeToComplete]);
    
    const mouseOver = () => setShowTooltip(true);
    const mouseOut = () => setShowTooltip(false);
    const mouseMove = (e) => {
      if (!showTooltip)
      return;
    setMousePosition({x: e.clientX, y: e.clientY});
  };

    return (
      <>
        <span onMouseEnter={mouseOver} onMouseLeave={mouseOut} onMouseMove={mouseMove}>
          <Component {...props} />
          { showTooltip && renderTooltip(mousePosition, generatedTooltipText) }
        </span>
      </>
    );    
  };

  EnhancedComponent.propTypes = {
    totalTime: PropTypes.string.isRequired,
    timeToComplete: PropTypes.string.isRequired,
  };

  return EnhancedComponent;
}



export default withToolTip;