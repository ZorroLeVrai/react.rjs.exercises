import React, { useState } from 'react'

/* Higher Order Component to add a tooltip to a React component*/
/* renderTooltip uses a render prop to render its component */

const withToolTip = (Component, renderTooltip) => {
  const EnhancedComponent = (props) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const {totalTime, timeToComplete } = props;
    const generatedTooltipText = generateTooltipText(totalTime, timeToComplete);

    const mouseOver = () => setShowTooltip(true);
    const mouseOut = () => setShowTooltip(false);
    const mouseMove = (e) => {
      if (!showTooltip)
        return;
      setMousePosition({x: e.clientX, y: e.clientY});
    };

    return (
      <>
        <div onMouseEnter={mouseOver} onMouseLeave={mouseOut} onMouseMove={mouseMove}>
          <Component {...props} />
          { showTooltip && renderTooltip(mousePosition, generatedTooltipText) }
        </div>
      </>
    );    
  };

  return EnhancedComponent;
}

function generateTooltipText(totalTime, timeToComplete) {
  return [
    `Temps total: ${totalTime}`,
    `Temps restant: ${timeToComplete}`
  ];
}

export default withToolTip;