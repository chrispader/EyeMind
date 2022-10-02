import { _electron as electron } from "playwright";
import { test, expect } from "@playwright/test";
import {dragAndDropFile,delay,removeElementAttributes, loadFile, saveFile} from "../utils/utils";
import {elementAttributesToRemove} from "../utils/globals";
const fs = require("fs");




test("data-collection-session-options-view", async () => {


  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();

  // except no errors in console.error()
  firstWindow.on("console", (message) => {
    if (message.type() === "error") {
       expect(message.text()).toBe("");
    }
  })


  await firstWindow.locator('id=eye-tracking').click();
  var bodyContent = await firstWindow.evaluate(() => {return document.body.outerHTML});


  const expectedDataPath = 'test/data/data-collection-session-options-view/data-collection-session-options-view.html'

  //saveFile(expectedDataPath,bodyContent);


  var expectedContent = loadFile(expectedDataPath);
  
  /// remove tag attributes with random values generated on each import
  bodyContent = removeElementAttributes(elementAttributesToRemove,bodyContent).replace(/>/g, ">\n");
  expectedContent = removeElementAttributes(elementAttributesToRemove,expectedContent).replace(/>/g, ">\n");
  

  expect(bodyContent).toBe(expectedContent);

  

});


test("data-collection-settings-view", async () => {


  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();

  // except no errors in console.error()
  firstWindow.on("console", (message) => {
    if (message.type() === "error") {
       expect(message.text()).toBe("");
    }
  })

  await firstWindow.locator('id=eye-tracking').click();
  await firstWindow.locator('id=new-session').click();
  var bodyContent = await firstWindow.evaluate(() => {return document.body.outerHTML});


  const expectedDataPath = 'test/data/data-collection-settings-view/data-collection-settings-view.html'

  //saveFile(expectedDataPath,bodyContent);


  var expectedContent = loadFile(expectedDataPath);
  
  /// remove tag attributes with random values generated on each import
  bodyContent = removeElementAttributes(elementAttributesToRemove,bodyContent).replace(/>/g, ">\n");
  expectedContent = removeElementAttributes(elementAttributesToRemove,expectedContent).replace(/>/g, ">\n");
  

  expect(bodyContent).toBe(expectedContent);

  

});