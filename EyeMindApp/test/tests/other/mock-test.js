var expect    = require("chai").expect;
const { ipcRenderer } = require('electron')

const {calculateProgress} = require('../../app/server/node/utils/utils');
const {shouldEnableHeatmap} = require('../../app/server/node/analysis/analysis');
const {setState, getState} = require('../../app/server/node/dataModels/state');


describe('mocha.opts', () => {

  console.log(window)


  it('--require modules are loaded in renderer', () => {
    expect(window.required).to.equal(true);
  })
})



describe("Calculate progress", function() {



      const i=10;
      const max=100;

      it("calculates progress", function() {
          const res = calculateProgress(i,max);
          expect(res).to.equal(10);
      });
    
  });


describe("shouldEnableHeatmap", function() {

      it("shouldEnableHeatmap", function() {

          var testState = {
              snapshotsCounter: 0,
              activeTab: null,
              processedGazeData: {fixationData: 1, fixationFilterData : {status: "complete"}},
              isEtOn: false,
              models: {},
              mode: null,
              temp: {},
              linkingSubProcessesMode: null
              };

          setState(testState);

          const res = shouldEnableHeatmap();
          expect(res).to.equal(true);

      });
    
  });




/*var converter = require("../app/converter");


describe("Color Code Converter", function() {


  describe("RGB to Hex conversion", function() {
    it("converts the basic colors", function() {
      var redHex   = converter.rgbToHex(255, 0, 0);
      var greenHex = converter.rgbToHex(0, 255, 0);
      var blueHex  = converter.rgbToHex(0, 0, 255);

      expect(redHex).to.equal("ff0000");
      expect(greenHex).to.equal("00ff00");
      expect(blueHex).to.equal("0000ff");
    });
  });


  describe("Hex to RGB conversion", function() {

    it("converts the basic colors", function() {
      var red   = converter.hexToRgb("ff0000");
      var green = converter.hexToRgb("00ff00");
      var blue  = converter.hexToRgb("0000ff");

      expect(red).to.deep.equal([255, 0, 0]);
      expect(green).to.deep.equal([0, 255, 0]);
      expect(blue).to.deep.equal([0, 0, 255]);
    });
    
  });


});*/