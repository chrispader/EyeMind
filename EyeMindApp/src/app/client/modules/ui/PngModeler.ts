import Modeler from '@root/extra/object-diagram-modeler/lib/Modeler'

class PngModeler extends Modeler {
  constructor() {
    super()
  }

  importPng() {
    console.log('importPng')
  }
}

function PngNavigatedViewer() { }

export { PngModeler, PngNavigatedViewer }
