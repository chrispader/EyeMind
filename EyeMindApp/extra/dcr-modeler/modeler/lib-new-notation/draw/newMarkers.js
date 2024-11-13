import { attr as svgAttr, create as svgCreate } from 'tiny-svg';
import { svgGroup, getTransform } from './markers.js';

export function conditionMarker(marker, path, strokeColor, fill, startDirection, endDirection) {
  svgAttr(path, {
    markerEnd: marker('new-condition-flow-end', fill, strokeColor, startDirection, endDirection),
    stroke: strokeColor
  });
}

export function responseMarker(marker, path, strokeColor, fill, startDirection, endDirection) {
  svgAttr(path, {
    markerStart: marker('new-response-flow-start', strokeColor, strokeColor, startDirection, endDirection),
    stroke: strokeColor
  });
}

export function includeMarker(marker, path, strokeColor, fill, startDirection, endDirection) {
  svgAttr(path, {
    markerStart: marker('new-include-flow-start', strokeColor, strokeColor, startDirection, endDirection),
    stroke: strokeColor
  });
}

export function excludeMarker(marker, path, strokeColor, fill, startDirection, endDirection) {
  svgAttr(path, {
    markerStart: marker('new-exclude-flow-start', strokeColor, strokeColor, startDirection, endDirection),
    stroke: strokeColor
  });
}

export function milestoneMarker(marker, path, strokeColor, fill, startDirection, endDirection) {
  svgAttr(path, {
    markerEnd: marker('new-milestone-flow-end', fill, strokeColor, startDirection, endDirection),
    stroke: strokeColor
  });
}

//Create the new markers
export function createMarker(addMarker, id, type, fill, stroke, startDirection, endDirection) {

  if (type === 'new-response-flow-start') {
    var responseflowStart = svgCreate('rect');
    svgAttr(responseflowStart, {
      x: 1,
      y: 1,
      width: 18,
      height: 18,
      rx: 2,
      ry: 2
    });

    // Inner element: Vertical line
    var verticalLine = svgCreate('path');
    svgAttr(verticalLine, {
      d: 'M12 0.8V5.5',
      'stroke-width': 2.3,
      'stroke-linecap': 'round',
      transform: 'translate(-2, 5)'
    });

    // Inner element: Dot
    var dot = svgCreate('circle');
    svgAttr(dot, {
      cx: 10,
      cy: 14,
      r: 0.21,
    });

    // Group the elements together
    var excludeflowGroup = svgGroup([responseflowStart, verticalLine, dot]);

    addMarker(id, {
      element: excludeflowGroup,
      attrs: {
        stroke: stroke,
        'stroke-width': '2',
        fill: 'white',
        transform: getTransform(startDirection)
      },
      ref: {
        x: -0.95,
        y: 10
      },
      scale: 0.5,
    });
}

  if (type === 'new-exclude-flow-start') {
    var excludeflowStart = svgCreate('rect');
    svgAttr(excludeflowStart, {
      x: 1,
      y: 1,
      width: 18,
      height: 18,
      rx: 2,
      ry: 2
    });
  
    // Inner element: Minus sign
    var minusSign = svgCreate('path');
    svgAttr(minusSign, {
      d: 'M16 12H8',
      fill: stroke,
      'stroke-width': 2,
      'stroke-linecap': 'round',
      transform: 'translate(-2, -2)'
    });

  
    // Group the elements together
    var excludeflowGroup = svgGroup([excludeflowStart, minusSign]);
  
    addMarker(id, {
      element: excludeflowGroup,
      attrs: {
        stroke: stroke,
        'stroke-width': '2',
        fill: 'white',
        transform: getTransform(startDirection)
      },
      ref: {
        x: -0.95,
        y: 10
      },
      scale: 0.5
    });
  }

  if (type === 'new-include-flow-start') {
    var includeflowStart = svgCreate('rect');
    svgAttr(includeflowStart, {
      x: 1,
      y: 1,
      width: 18,
      height: 18,
      rx: 2,
      ry: 2
    });

    // Inner element: Plus sign
    var plusSign = svgCreate('path');
    svgAttr(plusSign, {
      d: 'M16 12L8 12M12 16L12 8',
      fill: stroke,
      'stroke-width': 2,
      'stroke-linecap': 'round',
      transform: 'translate(-2, -2)'
    });

    // Group the elements together
    var excludeflowGroup = svgGroup([includeflowStart, plusSign]);

    addMarker(id, {
      element: excludeflowGroup,
      attrs: {
        stroke: stroke,
        'stroke-width': '2',
        fill: 'white',
        transform: getTransform(startDirection)
      },
      ref: {
        x: -0.95,
        y: 10
      },
      scale: 0.5
    });
} 

  if (type === 'new-condition-flow-end') {
    var conditionflowEndPath = svgCreate('circle');
    svgAttr(conditionflowEndPath, {
      cx: 10,
      cy: 10,
      r: 9,
    });
  
    addMarker(id, {
      element: conditionflowEndPath,
      attrs: {
        stroke: stroke,
        'stroke-width': '2',
        fill: 'white'
      },
      ref: {
        x: 21,
        y: 10
      },
      scale: 0.5
    });
  }

  if (type === 'new-milestone-flow-end') {
    var milestoneflowEnd = svgCreate('circle');
    svgAttr(milestoneflowEnd, {
      cx: 10,
      cy: 10,
      r: 9,
    });

    // Inner element: Vertical line
    var verticalLine = svgCreate('path');
    svgAttr(verticalLine, {
      d: 'M12 0.8V5.5',
      'stroke-width': 2.3,
      'stroke-linecap': 'round',
      transform: 'translate(-2, 5)'
    });

    // Inner element: Dot
    var dot = svgCreate('circle');
    svgAttr(dot, {
      cx: 10,
      cy: 14,
      r: 0.21,
    });

    // Group the elements together
    var milestoneGroup = svgGroup([milestoneflowEnd, verticalLine, dot]);
  
    addMarker(id, {
      element: milestoneGroup,
      attrs: {
        stroke: stroke,
        'stroke-width': '2',
        fill: 'white',
        transform: getTransform(endDirection)
      },
      ref: {
        x: 21,
        y: 10
      },
      scale: 0.5
    });
  }
}
