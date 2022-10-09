import { _electron as electron } from "playwright";
import { test, expect } from "@playwright/test";
import {dragAndDropFile,delay,removeElementAttributes, loadFile, saveFile} from "../utils/utils";
import {elementAttributesToRemove} from "../utils/globals";
const fs = require("fs");


test("open-new-tab-from-model", async () => {

  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();

  
  // except no errors in console.error()
  firstWindow.on("console", (message) => {
    if (message.type() === "error") {
       expect(message.text()).toBe("");
    }
  })


  await firstWindow.locator('id=eye-tracking').click();
  await firstWindow.locator('id=load-session').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/sessions/links/session-new-tab.json','session-new-tab.json'); 

  await  delay(3000);

  await firstWindow.locator('id=record-btn').click();
  await firstWindow.locator('id=submit-recording-form').click();
  // a delay for ET to start 
  await  delay(2000);

  await firstWindow.locator('id=modelpmainprocessbpmn').click();
  await firstWindow.locator('[data-element-id="p_4_certifydocuments.bpmn"]').click();
  
  var bodyContent = await firstWindow.evaluate(() => {return document.body.outerHTML});

  const expectedDataPath = 'test/data/tabs/open-new-tab-from-model.html';

  //saveFile(expectedDataPath,bodyContent);

  var expectedContent = loadFile(expectedDataPath);
  
  /// remove tag attributes with random values generated on each import
  bodyContent = removeElementAttributes(elementAttributesToRemove,bodyContent).replace(/>/g, ">\n");
  expectedContent = removeElementAttributes(elementAttributesToRemove,expectedContent).replace(/>/g, ">\n");
  

  expect(bodyContent).toBe(expectedContent);
  


});



test("close-tabs-and-leave-no-tab-visible", async () => {

  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();

  
  // except no errors in console.error()
  firstWindow.on("console", (message) => {
    if (message.type() === "error") {
       expect(message.text()).toBe("");
    }
  })


  await firstWindow.locator('id=eye-tracking').click();
  await firstWindow.locator('id=load-session').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/sessions/links/session-new-tab.json','session-new-tab.json'); 
  
  await  delay(3000);

  await firstWindow.locator('id=record-btn').click();
  await firstWindow.locator('id=submit-recording-form').click();
  // a delay for ET to start 
  await  delay(2000);


  await firstWindow.locator('id=modelpmainprocessbpmn').click();
  await firstWindow.locator('[data-element-id="p_3_approveandsigndocuments.bpmn"]').click();
  await firstWindow.locator('id=modelpmainprocessbpmn').click();
  await firstWindow.locator('[data-element-id="p_4_certifydocuments.bpmn"]').click();
  await firstWindow.locator('[data-element-id="close-button-tab-link-to_p_3_approveandsigndocuments.bpmn"]').click();
  await firstWindow.locator('[data-element-id="close-button-tab-link-to_p_4_certifydocuments.bpmn"]').click();
  
  
  var bodyContent = await firstWindow.evaluate(() => {return document.body.outerHTML});


  const expectedDataPath = 'test/data/tabs/close-tabs-and-leave-no-tab-visible.html';

  //saveFile(expectedDataPath,bodyContent);
  
  var expectedContent = loadFile(expectedDataPath);
  
  /// remove tag attributes with random values generated on each import
  bodyContent = removeElementAttributes(elementAttributesToRemove,bodyContent).replace(/>/g, ">\n");
  expectedContent = removeElementAttributes(elementAttributesToRemove,expectedContent).replace(/>/g, ">\n");
  

  expect(bodyContent).toBe(expectedContent);
  

});



test("close-an-already-hidden-tab", async () => {

  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();

  
  // except no errors in console.error()
  firstWindow.on("console", (message) => {
    if (message.type() === "error") {
       expect(message.text()).toBe("");
    }
  })


  await firstWindow.locator('id=eye-tracking').click();
  await firstWindow.locator('id=load-session').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/sessions/links/session-new-tab.json','session-new-tab.json'); 
  
  await  delay(3000);

  await firstWindow.locator('id=record-btn').click();
  await firstWindow.locator('id=submit-recording-form').click();
  // a delay for ET to start 
  await  delay(2000);

  await firstWindow.locator('id=modelpmainprocessbpmn').click();
  await firstWindow.locator('[data-element-id="p_3_approveandsigndocuments.bpmn"]').click();
  await firstWindow.locator('id=modelpmainprocessbpmn').click();
  await firstWindow.locator('[data-element-id="p_4_certifydocuments.bpmn"]').click();
  await firstWindow.locator('[data-element-id="close-button-tab-link-to_p_3_approveandsigndocuments.bpmn"]').click();

  
  var bodyContent = await firstWindow.evaluate(() => {return document.body.outerHTML});

  const expectedDataPath = 'test/data/tabs/close-an-already-hidden-tab.html';

  //saveFile(expectedDataPath,bodyContent);

  var expectedContent = loadFile(expectedDataPath);
  
  /// remove tag attributes with random values generated on each import
  bodyContent = removeElementAttributes(elementAttributesToRemove,bodyContent).replace(/>/g, ">\n");
  expectedContent = removeElementAttributes(elementAttributesToRemove,expectedContent).replace(/>/g, ">\n");
  

  expect(bodyContent).toBe(expectedContent);
  

});







test("close-tabs-and-check-that-model-is-reset", async () => {

  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();

  
  // except no errors in console.error()
  firstWindow.on("console", (message) => {
    if (message.type() === "error") {
       expect(message.text()).toBe("");
    }
  })


  await firstWindow.locator('id=eye-tracking').click();
  await firstWindow.locator('id=load-session').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/sessions/links/session-new-tab.json','session-new-tab.json'); 
  
  await  delay(3000);

  await firstWindow.locator('id=record-btn').click();
  await firstWindow.locator('id=submit-recording-form').click();
  // a delay for ET to start 
  await  delay(2000);

  await firstWindow.locator('id=modelpmainprocessbpmn').click();
  await firstWindow.locator('[data-element-id="p_3_approveandsigndocuments.bpmn"]').click();
  
  await firstWindow.mouse.move(800,600);

  await firstWindow.mouse.wheel(200, 400);
   // a delay to notify the canvas view changed
  await  delay(500);

  await firstWindow.mouse.wheel(100, 200);
   // a delay to notify the canvas view changed
  await  delay(500);

  await firstWindow.mouse.wheel(400, 300);
   // a delay to notify the canvas view changed
  await  delay(500);

  // a delay for the last snapshot to be recorded
  await  delay(1000);


  await firstWindow.locator('[data-element-id="close-button-tab-link-to_p_3_approveandsigndocuments.bpmn"]').click();
 
  
  var bodyContent = await firstWindow.evaluate(() => {return document.body.outerHTML});


  const expectedDataPath = 'test/data/tabs/close-tabs-and-check-that-model-is-reset.html';

  //saveFile(expectedDataPath,bodyContent);

  
  var expectedContent = loadFile(expectedDataPath);
  
  /// remove tag attributes with random values generated on each import
  bodyContent = removeElementAttributes(elementAttributesToRemove,bodyContent).replace(/>/g, ">\n");
  expectedContent = removeElementAttributes(elementAttributesToRemove,expectedContent).replace(/>/g, ">\n");
  

  expect.soft(bodyContent).toBe(expectedContent);
  

});



test("loaded-content-view-no-link-between-sub-processes-from-loaded-session", async () => {


  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();

  
  // except no errors in console.error()
  firstWindow.on("console", (message) => {
    if (message.type() === "error") {
       expect(message.text()).toBe("");
    }
  })


  await firstWindow.locator('id=eye-tracking').click();
  await firstWindow.locator('id=load-session').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/sessions/links/session-no-link.json','session-no-link.json'); 
  
  await  delay(3000);

  await firstWindow.locator('id=record-btn').click();
  await firstWindow.locator('id=submit-recording-form').click();
  // a delay for ET to start 
  await  delay(2000);

  
  var bodyContent = await firstWindow.evaluate(() => {return document.body.outerHTML});

  const expectedDataPath = 'test/data/loaded-content-view/loaded-content-view-no-link-between-sub-processes-from-loaded-session.html';

  //saveFile(expectedDataPath,bodyContent);

  var expectedContent = loadFile(expectedDataPath);
  
  /// remove tag attributes with random values generated on each import
  bodyContent = removeElementAttributes(elementAttributesToRemove,bodyContent).replace(/>/g, ">\n");
  expectedContent = removeElementAttributes(elementAttributesToRemove,expectedContent).replace(/>/g, ">\n");
  

  expect(bodyContent).toBe(expectedContent);
  
 
});


test("set-scroll-position-openning-context-tabHeaderEndPos<containerWidth", async () => {


  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();

  
  // except no errors in console.error()
  firstWindow.on("console", (message) => {
    if (message.type() === "error") {
       expect(message.text()).toBe("");
    }
  })


  await firstWindow.locator('id=eye-tracking').click();
  await firstWindow.locator('id=load-session').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/sessions/links/session-no-link.json','session-no-link.json'); 
  
  await  delay(3000);

  await firstWindow.locator('id=record-btn').click();
  await firstWindow.locator('id=submit-recording-form').click();
  // a delay for ET to start 
  await  delay(2000);

 await firstWindow.locator('id=modelp52notifyinvolvedpartiesofjournalentryrefusalbpmn-explorerItem').click();
 
 await firstWindow.locator('id=modelp11fetchandvalidateonlinedatabpmn-explorerItem').click();

 await firstWindow.locator('id=modelp12movemortgagetomaindepotbpmn-explorerItem').click();


  var scrollLeft = await firstWindow.evaluate(() => {
 
   return document.getElementById("nav-tabs").scrollLeft

  });

  expect(scrollLeft).toBe(0);

});


test("set-scroll-position-openning-context-tabHeaderEndPos>containerWidth", async () => {


  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();

  
  // except no errors in console.error()
  firstWindow.on("console", (message) => {
    if (message.type() === "error") {
       expect(message.text()).toBe("");
    }
  })


  await firstWindow.locator('id=eye-tracking').click();
  await firstWindow.locator('id=load-session').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/sessions/links/session-no-link.json','session-no-link.json'); 
  
  await  delay(3000);

  await firstWindow.locator('id=record-btn').click();
  await firstWindow.locator('id=submit-recording-form').click();
  // a delay for ET to start 
  await  delay(2000);

 await firstWindow.locator('id=modelp1gatherdatabpmn-explorerItem').click();
 await firstWindow.locator('id=modelp11fetchandvalidateonlinedatabpmn-explorerItem').click();
 await firstWindow.locator('id=modelp12movemortgagetomaindepotbpmn-explorerItem').click();
 await firstWindow.locator('id=modelp2generatedocumentbpmn-explorerItem').click();
 await firstWindow.locator('id=modelp21generateandappendreturncoversheetsbpmn-explorerItem').click();
 await firstWindow.locator('id=modelp3approveandsigndocumentsbpmn-explorerItem').click();
 await firstWindow.locator('id=modelp4certifydocumentsbpmn-explorerItem').click();
 await firstWindow.locator('id=modelp51notifyinvolvedpartiesofjournalentrybpmn-explorerItem').click();
 await firstWindow.locator('id=modelp52notifyinvolvedpartiesofjournalentryrefusalbpmn-explorerItem').click();
 await firstWindow.locator('id=modelp53notifyinvolvedpartiesofmainbookbpmn-explorerItem').click();
 await firstWindow.locator('id=modelp54notifyinvolvedpartiesofmainbookrejectionbpmn-explorerItem').click();
 await firstWindow.locator('id=modelp5submittolandregistrybpmn-explorerItem').click();
 await firstWindow.locator('id=modelp6bookmortgagesbpmn-explorerItem').click();
 await firstWindow.locator('id=modelp7notifypartnersofcompletionbpmn-explorerItem').click();


  var scrollLeft = await firstWindow.evaluate(() => {
 
   return document.getElementById("nav-tabs").scrollLeft

  });

  expect(scrollLeft).toBe(2560);

});

test("set-scroll-position-changing-tabheader-is-within-nav-tabs-ViewStart-nav-tabs-ViewEnd", async () => {


  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();

  
  // except no errors in console.error()
  firstWindow.on("console", (message) => {
    if (message.type() === "error") {
       expect(message.text()).toBe("");
    }
  })


  await firstWindow.locator('id=eye-tracking').click();
  await firstWindow.locator('id=load-session').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/sessions/links/session-no-link.json','session-no-link.json'); 
  
  await  delay(3000);

  await firstWindow.locator('id=record-btn').click();
  await firstWindow.locator('id=submit-recording-form').click();
  // a delay for ET to start 
  await  delay(2000);

 await firstWindow.locator('id=modelp1gatherdatabpmn-explorerItem').click();
 await firstWindow.locator('id=modelp11fetchandvalidateonlinedatabpmn-explorerItem').click();
 await firstWindow.locator('id=modelp12movemortgagetomaindepotbpmn-explorerItem').click();
 await firstWindow.locator('id=modelp2generatedocumentbpmn-explorerItem').click();
 await firstWindow.locator('id=modelp21generateandappendreturncoversheetsbpmn-explorerItem').click();
 await firstWindow.locator('id=modelp3approveandsigndocumentsbpmn-explorerItem').click();
 await firstWindow.locator('id=modelp4certifydocumentsbpmn-explorerItem').click();
 await firstWindow.locator('id=modelp51notifyinvolvedpartiesofjournalentrybpmn-explorerItem').click();
 await firstWindow.locator('id=modelp52notifyinvolvedpartiesofjournalentryrefusalbpmn-explorerItem').click();
 await firstWindow.locator('id=modelp53notifyinvolvedpartiesofmainbookbpmn-explorerItem').click();
 await firstWindow.locator('id=modelp54notifyinvolvedpartiesofmainbookrejectionbpmn-explorerItem').click();
 await firstWindow.locator('id=modelp5submittolandregistrybpmn-explorerItem').click();
 await firstWindow.locator('id=modelp6bookmortgagesbpmn-explorerItem').click();
 await firstWindow.locator('id=modelp7notifypartnersofcompletionbpmn-explorerItem').click();

 await firstWindow.locator('id=modelp5submittolandregistrybpmn-explorerItem').click();


  var scrollLeft = await firstWindow.evaluate(() => {
 
   return document.getElementById("nav-tabs").scrollLeft

  });

  expect(scrollLeft).toBe(2560);

});


test("set-scroll-position-changing-tabheader-is-not-within-nav-tabs-ViewStart-nav-tabs-ViewEnd", async () => {


  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();

  
  // except no errors in console.error()
  firstWindow.on("console", (message) => {
    if (message.type() === "error") {
       expect(message.text()).toBe("");
    }
  })


  await firstWindow.locator('id=eye-tracking').click();
  await firstWindow.locator('id=load-session').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/sessions/links/session-no-link.json','session-no-link.json'); 
  
  await  delay(3000);

  await firstWindow.locator('id=record-btn').click();
  await firstWindow.locator('id=submit-recording-form').click();
  // a delay for ET to start 
  await  delay(2000);

 await firstWindow.locator('id=modelp1gatherdatabpmn-explorerItem').click();
 await firstWindow.locator('id=modelp11fetchandvalidateonlinedatabpmn-explorerItem').click();
 await firstWindow.locator('id=modelp12movemortgagetomaindepotbpmn-explorerItem').click();
 await firstWindow.locator('id=modelp2generatedocumentbpmn-explorerItem').click();
 await firstWindow.locator('id=modelp21generateandappendreturncoversheetsbpmn-explorerItem').click();
 await firstWindow.locator('id=modelp3approveandsigndocumentsbpmn-explorerItem').click();
 await firstWindow.locator('id=modelp4certifydocumentsbpmn-explorerItem').click();
 await firstWindow.locator('id=modelp51notifyinvolvedpartiesofjournalentrybpmn-explorerItem').click();
 await firstWindow.locator('id=modelp52notifyinvolvedpartiesofjournalentryrefusalbpmn-explorerItem').click();
 await firstWindow.locator('id=modelp53notifyinvolvedpartiesofmainbookbpmn-explorerItem').click();
 await firstWindow.locator('id=modelp54notifyinvolvedpartiesofmainbookrejectionbpmn-explorerItem').click();
 await firstWindow.locator('id=modelp5submittolandregistrybpmn-explorerItem').click();
 await firstWindow.locator('id=modelp6bookmortgagesbpmn-explorerItem').click();
 await firstWindow.locator('id=modelp7notifypartnersofcompletionbpmn-explorerItem').click();
 
 await firstWindow.locator('id=modelp11fetchandvalidateonlinedatabpmn-explorerItem').click();

  var scrollLeft = await firstWindow.evaluate(() => {
 
   return document.getElementById("nav-tabs").scrollLeft

  });

  expect(scrollLeft).toBe(395);

});

