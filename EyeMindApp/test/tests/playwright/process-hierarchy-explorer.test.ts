import { _electron as electron } from "playwright";
import { test, expect } from "@playwright/test";
import {dragAndDropFile,delay,removeElementAttributes, loadFile, saveFile} from "../utils/utils";
import {elementAttributesToRemove} from "../utils/globals";
const fs = require("fs");


test("process-hierarchy-explorer-browser-2-hierarchy-levels", async () => {

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

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/sessions/links/session-within-tab.json','session-within-tab.json'); 

  await  delay(3000);

  await firstWindow.evaluate(() => {window.clientTests.openMainTabInWithinTabLinks()});

  await  delay(2000);

  await firstWindow.locator('[data-element-id="p_1_gatherdata.bpmn"]').click();
  await firstWindow.locator('[data-element-id="p_1_2_movemortgagetomaindepot.bpmn"]').click();

  
  var bodyContent = await firstWindow.evaluate(() => {return document.body.outerHTML});
  

  const expectedDataPath = 'test/data/process-hierarchy-explorer/process-hierarchy-explorer-browser-2-hierarchy-levels.html';

  //saveFile(expectedDataPath,bodyContent);

  
  var expectedContent = loadFile(expectedDataPath);
  
  /// remove tag attributes with random values generated on each import
  bodyContent = removeElementAttributes(elementAttributesToRemove,bodyContent).replace(/>/g, ">\n");
  expectedContent = removeElementAttributes(elementAttributesToRemove,expectedContent).replace(/>/g, ">\n");
  

  expect(bodyContent).toBe(expectedContent);
  


});


test("process-hierarchy-explorer-browser-2-hierarchy-levels-back", async () => {

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

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/sessions/links/session-within-tab.json','session-within-tab.json'); 

  await  delay(3000);

  await firstWindow.evaluate(() => {window.clientTests.openMainTabInWithinTabLinks()});

  await  delay(2000);

  await firstWindow.locator('[data-element-id="p_1_gatherdata.bpmn"]').click();
  await firstWindow.locator('[data-element-id="p_1_2_movemortgagetomaindepot.bpmn"]').click();

  await firstWindow.locator('[data-element-id="process-hierarchy-sub-process-link-to_Gather Data"]').click();
  await firstWindow.locator('[data-element-id="process-hierarchy-sub-process-link-to_main"]').click(); 

  
  var bodyContent = await firstWindow.evaluate(() => {return document.body.outerHTML});
  

  const expectedDataPath = 'test/data/process-hierarchy-explorer/process-hierarchy-explorer-browser-2-hierarchy-levels-back.html';

  //saveFile(expectedDataPath,bodyContent);

  
  var expectedContent = loadFile(expectedDataPath);
  
  /// remove tag attributes with random values generated on each import
  bodyContent = removeElementAttributes(elementAttributesToRemove,bodyContent).replace(/>/g, ">\n");
  expectedContent = removeElementAttributes(elementAttributesToRemove,expectedContent).replace(/>/g, ">\n");
  

  expect(bodyContent).toBe(expectedContent);
  


});

test("process-hierarchy-explorer-browser-2-hierarchy-levels-back-then-2-forward", async () => {

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

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/sessions/links/session-within-tab.json','session-within-tab.json'); 

  await  delay(3000);

  await firstWindow.evaluate(() => {window.clientTests.openMainTabInWithinTabLinks()});

  await  delay(2000);

  await firstWindow.locator('[data-element-id="p_1_gatherdata.bpmn"]').click();
  await firstWindow.locator('[data-element-id="p_1_2_movemortgagetomaindepot.bpmn"]').click();

  await firstWindow.locator('[data-element-id="process-hierarchy-sub-process-link-to_Gather Data"]').click();
  await firstWindow.locator('[data-element-id="process-hierarchy-sub-process-link-to_main"]').click(); 

  await firstWindow.locator('[data-element-id="p_2_generatedocument.bpmn"]').click();
  await firstWindow.locator('[data-element-id="p_2_1_generateandappendreturncoversheets.bpmn"]').click();

  
  var bodyContent = await firstWindow.evaluate(() => {return document.body.outerHTML});
  

  const expectedDataPath = 'test/data/process-hierarchy-explorer/process-hierarchy-explorer-browser-2-hierarchy-levels-back-then-2-forward.html';

  //saveFile(expectedDataPath,bodyContent);

  
  var expectedContent = loadFile(expectedDataPath);
  
  /// remove tag attributes with random values generated on each import
  bodyContent = removeElementAttributes(elementAttributesToRemove,bodyContent).replace(/>/g, ">\n");
  expectedContent = removeElementAttributes(elementAttributesToRemove,expectedContent).replace(/>/g, ">\n");
  

  expect(bodyContent).toBe(expectedContent);
  

});


