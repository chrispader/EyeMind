import { _electron as electron } from "playwright";
import { test, expect } from "@playwright/test";
import {dragAndDropFile,delay,removeElementAttributes, loadFile, saveFile} from "../utils/utils";
import {elementAttributesToRemove} from "../utils/globals";
const fs = require("fs");


test("file-explorer-open-file-tab", async () => {

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

  await firstWindow.locator('id=modelp52notifyinvolvedpartiesofjournalentryrefusalbpmn-explorerItem').click();
  
  var bodyContent = await firstWindow.evaluate(() => {return document.body.outerHTML});

  const expectedDataPath = 'test/data/file-explorer/file-explorer-open-file-tab.html';

  //saveFile(expectedDataPath,bodyContent);

  
  var expectedContent = loadFile(expectedDataPath);
  
  /// remove tag attributes with random values generated on each import
  bodyContent = removeElementAttributes(elementAttributesToRemove,bodyContent).replace(/>/g, ">\n");
  expectedContent = removeElementAttributes(elementAttributesToRemove,expectedContent).replace(/>/g, ">\n");
  

  expect(bodyContent).toBe(expectedContent);
  

});

