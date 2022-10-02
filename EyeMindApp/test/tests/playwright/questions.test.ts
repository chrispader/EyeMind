import { _electron as electron } from "playwright";
import { test, expect } from "@playwright/test";
import {dragAndDropFile,delay} from "../utils/utils";
const fs = require("fs");


test("first-question-onset", async () => {


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
  // a delay for ET to start and start ET snapshot to be record
  await  delay(2000);

  await firstWindow.locator('id=start-questions-btn').click();

  // a delay for the lastOnSetQuestionEvent and lastOffSetQuestionEvent to be updated
  await  delay(1000);

  var onSetQuestionEvent = await firstWindow.evaluate(() => {return window.clientTests.lastOnSetQuestionEvent});
  var offSetQuestionEvent = await firstWindow.evaluate(() => {return window.clientTests.lastOffSetQuestionEvent});

  expect.soft(onSetQuestionEvent.questionEventType).toBe("questionOnset");
  expect.soft(onSetQuestionEvent.questionPosition).toBe(0);
  expect.soft(onSetQuestionEvent.questionText).toBe('Explain why it is possible to move the mortgage to main depot in an offline land registry system with no nominee bank');
  expect.soft(onSetQuestionEvent.questionAnswer).toBe('');
  expect.soft(onSetQuestionEvent.questionID).toBe('1');

  expect(offSetQuestionEvent).toBe(undefined);

 
});


test("first-question-offset-second-question-onset", async () => {


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

  // a delay for ET to start and start ET snapshot to be record
  await  delay(2000);

  await firstWindow.locator('id=start-questions-btn').click();
  
  await firstWindow.locator('id=long-answer-question0-answer').fill('this is the answer provided by the user');
  await firstWindow.locator('id=next-question0-btn').click();

  // a delay for the lastOnSetQuestionEvent and lastOffSetQuestionEvent to be updated
  await  delay(1000);

  var onSetQuestionEvent = await firstWindow.evaluate(() => {return window.clientTests.lastOnSetQuestionEvent});
  var offSetQuestionEvent = await firstWindow.evaluate(() => {return window.clientTests.lastOffSetQuestionEvent});

  expect.soft(offSetQuestionEvent.questionEventType).toBe("questionOffset");
  expect.soft(offSetQuestionEvent.questionPosition).toBe(0);
  expect.soft(offSetQuestionEvent.questionText).toBe('Explain why it is possible to move the mortgage to main depot in an offline land registry system with no nominee bank');
  expect.soft(offSetQuestionEvent.questionAnswer).toBe('this is the answer provided by the user');
  expect.soft(offSetQuestionEvent.questionID).toBe('1');


  expect.soft(onSetQuestionEvent.questionEventType).toBe("questionOnset");
  expect.soft(onSetQuestionEvent.questionPosition).toBe(1);
  expect.soft(onSetQuestionEvent.questionText).toBe('It is possible to move the mortgage to the main depot if the number of land registers is above 1');
  expect.soft(onSetQuestionEvent.questionAnswer).toBe('');
  expect.soft(onSetQuestionEvent.questionID).toBe('2');

 
});


test("last-question-offset", async () => {


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

  // a delay for ET to start and start ET snapshot to be record
  await  delay(2000);

  await firstWindow.locator('id=start-questions-btn').click();

  await firstWindow.locator('id=next-question0-btn').click();
  await firstWindow.locator('id=next-question1-btn').click();
  await firstWindow.locator('id=next-question2-btn').click();
  await firstWindow.locator('id=next-question3-btn').click();
  await firstWindow.locator('id=next-question4-btn').click();
  await firstWindow.locator('id=next-question5-btn').click();
  await firstWindow.locator('id=next-question6-btn').click();
  await firstWindow.locator('id=next-question7-btn').click();
  await firstWindow.locator('id=next-question8-btn').click();
  await firstWindow.locator('id=next-question9-btn').click();
  await firstWindow.locator('id=next-question10-btn').click();

  await firstWindow.locator('[data-element-id="option-answer-radio-for-questionID_12_option_False"]').check(); // the id here refers to the question id provided in the csv questions file
  await firstWindow.locator('id=next-question11-btn').click();

  // a delay for the lastOnSetQuestionEvent and lastOffSetQuestionEvent to be updated
  await  delay(1000);

  var onSetQuestionEvent = await firstWindow.evaluate(() => {return window.clientTests.lastOnSetQuestionEvent});
  var offSetQuestionEvent = await firstWindow.evaluate(() => {return window.clientTests.lastOffSetQuestionEvent});



  expect.soft(offSetQuestionEvent.questionEventType).toBe("questionOffset");
  expect.soft(offSetQuestionEvent.questionPosition).toBe(11);
  expect.soft(offSetQuestionEvent.questionText).toBe('The trustee can receive a notification that the mortgage process is finished before a certification request is sent to the free notary');
  expect.soft(offSetQuestionEvent.questionAnswer).toBe('False');
  expect.soft(offSetQuestionEvent.questionID).toBe('12');


  expect.soft(onSetQuestionEvent.questionEventType).toBe("questionOnset");
  expect.soft(onSetQuestionEvent.questionPosition).toBe(11);
  expect.soft(onSetQuestionEvent.questionText).toBe('The trustee can receive a notification that the mortgage process is finished before a certification request is sent to the free notary');
  expect.soft(onSetQuestionEvent.questionAnswer).toBe('');
  expect.soft(onSetQuestionEvent.questionID).toBe('12');

 
});




test("questions-start-before-ET-recording-starts", async () => {


  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();


    firstWindow.on("console", (message) => {
    if (message.type() === "error") {
    
      const expectedContent = "Eye-tracking has not started yet";
      expect(message.text()).toBe(expectedContent);
    }
  })


  await firstWindow.locator('id=eye-tracking').click();
  await firstWindow.locator('id=load-session').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/sessions/links/session-no-link.json','session-no-link.json'); 

  await  delay(3000);

  await firstWindow.locator('id=start-questions-btn').click();

  await  delay(15000);
 
});
