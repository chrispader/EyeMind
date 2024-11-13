import { attr as svgAttr, create as svgCreate } from 'tiny-svg';
import { svgGroup } from './markers.js';

export function conditionMarker(marker, path, strokeColor) {
  svgAttr(path, {
    markerEnd: marker('default-condition-flow-end', strokeColor, strokeColor),
    stroke: strokeColor,
  });
}

export function responseMarker(marker, path, strokeColor) {
  svgAttr(path, {
    markerStart: marker('default-response-flow-start', strokeColor, strokeColor),
    markerEnd: marker('default-response-flow-end', strokeColor, strokeColor),
    stroke: strokeColor,
    orient: "auto"
  });
}

export function includeMarker(marker, path, strokeColor) {
  svgAttr(path, {
    markerEnd: marker('default-include-flow-end', strokeColor, strokeColor),
    stroke: strokeColor
  });
}

export function excludeMarker(marker, path, strokeColor) {
  svgAttr(path, {
    markerEnd: marker('default-exclude-flow-end', strokeColor, strokeColor),
    stroke: strokeColor   //red
  });
}

export function milestoneMarker(marker, path, strokeColor) {
  svgAttr(path, {
    markerEnd: marker('default-milestone-flow-end', strokeColor, strokeColor),
    stroke: strokeColor   //purple
  });
}

export function spawnMarker(marker, path, strokeColor) {
  svgAttr(path, {
    markerEnd: marker('default-spawn-flow-end', '#4D6180', '#4D6180'),
    stroke: strokeColor
  });
}

export function createMarker(addMarker, id, type, fill, stroke) {
  
  if (type === 'default-response-flow-end') {
    var responseflowEnd = svgCreate('path');
    svgAttr(responseflowEnd, {
      d: 'm 1 5 l 0 -3 l 7 3 l -7 3 z',

    });

    addMarker(id, {
      element: responseflowEnd,
      attrs: {
        fill: fill,
        stroke: stroke,
        strokeLinecap: 'butt',
      },
      ref: { x: 8.7, y: 5 },
      scale: 0.8,
    });
  }

  if (type === 'default-response-flow-start') {
    var responseflowStart = svgCreate('path');
    svgAttr(responseflowStart, {
      
      d: 'M 12.24,6.64 C 12.24,8.74 10.60,10.44 8.58,10.44 6.56,10.44 4.92,8.74 4.92,6.64 4.92,4.54 6.56,'+
      '2.84 8.58,2.84 10.60,2.84 12.24,4.54 12.24,6.64 Z',
    });

    addMarker(id, {
      element: responseflowStart,
      attrs: {
        fill: fill,
        stroke: stroke,
        strokeLinecap: 'butt'
      },
      ref: { x: 4.2, y: 6.6 },
      scale: 0.55,
    });
  }



  if (type === 'default-exclude-flow-end') {
    var background = svgCreate('rect');
    svgAttr(background, {
      x: 10,
      y: 4,
      width: 20,
      height: 100,
      fill: 'white',
      stroke: 'none',
    });

    var excludeflowEnd = svgCreate('path');
    svgAttr(excludeflowEnd, {

      d: 'M 18.28,0.00 C 18.28,0.00 20.00,0.92 20.00,0.92 20.00,0.92 11.84,14.84 11.84,14.84 11.84,'+
      '14.84 10.12,13.92 10.12,13.92 10.12,13.92 18.28,0.00 18.28,0.00 Z M 16.61,13.64 C 16.61,'+
      '14.39 17.23,15.00 18.01,15.00 18.78,15.00 19.41,14.39 19.41,13.64 19.41,12.88 18.78,12.27 18.01,'+
      '12.27 17.23,12.27 16.61,12.88 16.61,13.64 Z M 13.74,1.47 C 13.74,2.22 13.11,2.83 12.34,2.83 11.56,'+
      '2.83 10.94,2.22 10.94,1.47 10.94,0.72 11.56,0.11 12.34,0.11 13.11,0.11 13.74,0.72 13.74,'+
      '1.47 Z M 12.25,7.81 C 12.25,7.81 6.13,11.23 6.13,11.23 6.13,11.23 -0.00,14.65 -0.00,14.65 -0.00,'+
      '14.65 0.02,7.78 0.02,7.78 0.02,7.78 0.03,0.92 0.03,0.92 0.03,0.92 6.14,4.36 6.14,4.36 6.14,'+
      '4.36 12.25,7.81 12.25,7.81 Z',

    });

    var excludeflowGroup = svgGroup([background, excludeflowEnd]);

    addMarker(id, {
      element: excludeflowGroup,
      scale: 0.4,
      attrs: {
        fill: fill,
        stroke: stroke,
        strokeLinecap: 'butt',
      },
      ref: { x: 21, y: 7.73 },
    });
  }

  if (type === 'default-exclude-flow-start') {
    var excludeflowStart = svgCreate('path');
    svgAttr(excludeflowStart, {

      d: 'M 12.24,6.64 C 12.24,8.74 10.60,10.44 8.58,10.44 6.56,10.44 4.92,8.74 4.92,'+
      '6.64 4.92,4.54 6.56,2.84 8.58,2.84 10.60,2.84 12.24,4.54 12.24,6.64 Z',
    });

    addMarker(id, {
      element: excludeflowStart,
      attrs: {
        fill: fill, 
        stroke: stroke,
        strokeLinecap: 'butt'
      },
      ref: { x: 4.2, y: 7.2 },
      scale: 0.55,
    });
  }

  if (type === 'default-include-flow-end') {
    var includeflowEnd = svgCreate('path');
    svgAttr(includeflowEnd, {

      d: 'M 18.35,5.99 C 18.35,5.99 15.08,5.99 15.08,5.99 15.08,5.99 15.08,2.66 15.08,2.66 15.08,2.35 14.83,2.10 14.53,'+
      '2.10 14.23,2.10 13.99,2.35 13.99,2.66 13.99,2.66 13.99,5.99 13.99,5.99 13.99,5.99 10.72,5.99 10.72,5.99 10.42,'+
      '5.99 10.17,6.24 10.17,6.54 10.17,6.85 10.42,7.10 10.72,7.10 10.72,7.10 13.99,7.10 13.99,7.10 13.99,7.10 13.99,'+
      '10.43 13.99,10.43 13.99,10.73 14.23,10.98 14.53,10.98 14.83,10.98 15.08,10.73 15.08,10.43 15.08,10.43 15.08,'+
      '7.10 15.08,7.10 15.08,7.10 18.35,7.10 18.35,7.10 18.65,7.10 18.89,6.85 18.89,6.54 18.89,6.24 18.65,5.99 18.35,'+
      '5.99 18.35,5.99 18.35,5.99 18.35,5.99 Z M 10.53,6.59 C 10.53,6.59 5.27,9.52 5.27,9.52 5.27,9.52 0.00,12.46 0.00,'+
      '12.46 0.00,12.46 0.01,6.57 0.01,6.57 0.01,6.57 0.03,0.69 0.03,0.69 0.03,0.69 5.28,3.64 5.28,3.64 5.28,3.64 10.53,'+
      '6.59 10.53,6.59 Z'

    });

    addMarker(id, {
      element: includeflowEnd,
      attrs: {
        fill: fill, 
        stroke: stroke,
        strokeLinecap: 'butt'
      },
      ref: { x: 20.6, y: 6.6 },
      scale: 0.55,
    });
  }

  if (type === 'default-include-flow-start') {
    var includeflowStart = svgCreate('path');
    svgAttr(includeflowStart, {

      d: 'M 12.24,6.64 C 12.24,8.74 10.60,10.44 8.58,10.44 6.56,10.44 4.92,8.74 4.92,6.64 4.92,'+
      '4.54 6.56,2.84 8.58,2.84 10.60,2.84 12.24,4.54 12.24,6.64 Z',
    });

    addMarker(id, {
      element: includeflowStart,
      attrs: {
        fill: fill, 
        stroke: stroke,
        strokeLinecap: 'butt'
      },
      ref: { x: 4.2, y: 7.2 },
      scale: 0.55,
    });
  }

  if (type === 'default-condition-flow-end') {
    var conditionflowEnd = svgCreate('path');
    svgAttr(conditionflowEnd, {

      d: 'M 17.83,7.19 C 17.83,9.29 16.20,10.99 14.18,10.99 12.16,10.99 10.52,9.29 10.52,'+
      '7.19 10.52,5.09 12.16,3.38 14.18,3.38 16.20,3.38 17.83,5.09 17.83,7.19 Z M 10.59,7.18 C 10.59,7.18 5.29,9.56 5.29,9.56 5.29,9.56 -0.00,11.94 -0.00,11.94 -0.00,11.94 0.01,7.16 0.01,7.16 0.01,7.16 0.03,2.37 0.03,2.37 0.03,2.37 5.31,4.77 5.31,4.77 5.31,4.77 10.59,7.18 10.59,7.18 Z',

    });

    addMarker(id, {
      element: conditionflowEnd,
      attrs: {
        fill: fill,
        stroke: stroke,
        strokeLinecap: 'butt'
        
      },
      ref: { x: 19.1, y: 7.2 },
      scale: 0.55,
    });
  }

  if (type === 'default-milestone-flow-end') {
    var milestoneArrowEnd = svgCreate('path');
    svgAttr(milestoneArrowEnd, {
      d: 'm 1 5 l 0 -3 l 7 3 l -7 3 z',
      fill: stroke,
      // 'stroke-width': 0.3,
      transform: 'translate(-5, 3.5) scale(1.3)'
    });

    var milestoneflowEnd = svgCreate('rect');
    svgAttr(milestoneflowEnd, {
      x: 0,
      y: 0,
      width: 8,
      height: 8,
      transform: 'rotate(-45 0 0) translate(-2, 12) scale(0.6)'
    });

    var milestoneflowGroup = svgGroup([milestoneArrowEnd, milestoneflowEnd]);

    addMarker(id, {
      element: milestoneflowGroup,
      attrs: {
        stroke: stroke,
        'stroke-width': '2',
        strokeLinecap: 'butt',
        fill: 'white'
      },
      ref: { x: 15, y: 10 },
      scale: 0.8,
    });
  }

    
  if (type === 'default-spawn-flow-end') {
    var spawnflowEnd = svgCreate('path');
    svgAttr(spawnflowEnd, {

      d: 'M 13.85,5.21 C 14.23,5.49 14.60,5.34 14.67,4.87 14.67,4.87 14.98,2.83 14.98,2.83 15.06,2.35 15.17,'+
      '2.35 15.24,2.83 15.24,2.83 15.55,4.87 15.55,4.87 15.63,5.34 16.00,5.49 16.38,5.21 16.38,5.21 18.13,'+
      '3.92 18.13,3.92 18.51,3.64 18.60,3.73 18.32,4.11 18.32,4.11 17.04,5.89 17.04,5.89 16.77,6.27 16.92,'+
      '6.65 17.39,6.72 17.39,6.72 19.40,7.03 19.40,7.03 19.87,7.11 19.87,7.22 19.40,7.30 19.40,7.30 17.39,'+
      '7.61 17.39,7.61 16.92,7.68 16.77,8.06 17.04,8.44 17.04,8.44 18.32,10.22 18.32,10.22 18.60,10.60 18.51,'+
      '10.69 18.13,10.41 18.13,10.41 16.38,9.12 16.38,9.12 16.00,8.84 15.63,8.99 15.55,9.46 15.55,9.46 15.24,'+
      '11.50 15.24,11.50 15.17,11.98 15.06,11.98 14.98,11.50 14.98,11.50 14.67,9.46 14.67,9.46 14.60,8.99 14.23,'+
      '8.84 13.85,9.12 13.85,9.12 12.10,10.41 12.10,10.41 11.72,10.69 11.65,10.61 11.94,10.24 11.94,10.24 13.39,'+
      '8.42 13.39,8.42 13.69,8.05 13.55,7.69 13.08,7.62 13.08,7.62 10.78,7.30 10.78,7.30 10.32,7.24 10.32,'+
      '7.12 10.78,7.05 10.78,7.05 12.84,6.72 12.84,6.72 13.31,6.65 13.46,6.27 13.19,5.89 13.19,5.89 11.91,'+
      '4.11 11.91,4.11 11.63,3.73 11.72,3.64 12.10,3.92 12.10,3.92 13.85,5.21 13.85,5.21 Z M 10.60,7.18 C 10.60,'+
      '7.18 5.30,9.56 5.30,9.56 5.30,9.56 -0.00,11.94 -0.00,11.94 -0.00,11.94 0.01,7.16 0.01,7.16 0.01,7.16 0.03,'+
      '2.37 0.03,2.37 0.03,2.37 5.31,4.77 5.31,4.77 5.31,4.77 10.60,7.18 10.60,7.18 Z',

 
    });

    addMarker(id, {
      element: spawnflowEnd,
      attrs: {
        fill: fill,
        stroke: stroke,
        strokeLinecap: 'butt',
      },
      ref: { x: 21.2, y: 7.2 },
      scale: 0.6,
    });
  }
}