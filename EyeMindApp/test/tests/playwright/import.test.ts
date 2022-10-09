import { _electron as electron } from "playwright";
import { test, expect } from "@playwright/test";
import {dragAndDropFile,delay,removeElementAttributes, loadFile, saveFile} from "../utils/utils";
import {elementAttributesToRemove} from "../utils/globals";
const fs = require("fs");

elementAttributesToRemove


test("new-session-import-valid-models", async () => {


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
  await firstWindow.locator('id=linking-sub-processes').selectOption("newTab");
  await firstWindow.locator('id=proceed-data-collection-settings').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_1_1_fetchandvalidateonlinedata.bpmn','p_1_1_fetchandvalidateonlinedata.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_1_2_movemortgagetomaindepot.bpmn','p_1_2_movemortgagetomaindepot.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_2_generatedocument.bpmn','p_2_generatedocument.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_2_1_generateandappendreturncoversheets.bpmn','p_2_1_generateandappendreturncoversheets.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_3_approveandsigndocuments.bpmn','p_3_approveandsigndocuments.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_4_certifydocuments.bpmn','p_4_certifydocuments.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_1_notifyinvolvedpartiesofjournalentry.bpmn','p_5_1_notifyinvolvedpartiesofjournalentry.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_2_notifyinvolvedpartiesofjournalentryrefusal.bpmn','p_5_2_notifyinvolvedpartiesofjournalentryrefusal.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_3_notifyinvolvedpartiesofmainbook.bpmn','p_5_3_notifyinvolvedpartiesofmainbook.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_4_notifyinvolvedpartiesofmainbookrejection.bpmn','p_5_4_notifyinvolvedpartiesofmainbookrejection.bpmn');  
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_submittolandregistry.bpmn','p_5_submittolandregistry.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_7_notifypartnersofcompletion.bpmn','p_7_notifypartnersofcompletion.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_mainprocess.bpmn','p_mainprocess.bpmn'); 


  var bodyContent = await firstWindow.evaluate(() => {return document.body.outerHTML});
  

  const expectedDataPath = 'test/data/import-view/new-session-import-valid-models.html';
  //saveFile(expectedDataPath,bodyContent);

  
  var expectedContent = loadFile(expectedDataPath);
  
  /// remove tag attributes with random values generated on each import
  bodyContent = removeElementAttributes(elementAttributesToRemove,bodyContent).replace(/>/g, ">\n");
  expectedContent = removeElementAttributes(elementAttributesToRemove,expectedContent).replace(/>/g, ">\n");
  




  expect(bodyContent).toBe(expectedContent);




  

});




test("remove-one-file", async () => {


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
  await firstWindow.locator('id=linking-sub-processes').selectOption("newTab");
  await firstWindow.locator('id=proceed-data-collection-settings').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_1_1_fetchandvalidateonlinedata.bpmn','p_1_1_fetchandvalidateonlinedata.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_1_2_movemortgagetomaindepot.bpmn','p_1_2_movemortgagetomaindepot.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_2_generatedocument.bpmn','p_2_generatedocument.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_2_1_generateandappendreturncoversheets.bpmn','p_2_1_generateandappendreturncoversheets.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_3_approveandsigndocuments.bpmn','p_3_approveandsigndocuments.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_4_certifydocuments.bpmn','p_4_certifydocuments.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_1_notifyinvolvedpartiesofjournalentry.bpmn','p_5_1_notifyinvolvedpartiesofjournalentry.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_2_notifyinvolvedpartiesofjournalentryrefusal.bpmn','p_5_2_notifyinvolvedpartiesofjournalentryrefusal.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_3_notifyinvolvedpartiesofmainbook.bpmn','p_5_3_notifyinvolvedpartiesofmainbook.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_4_notifyinvolvedpartiesofmainbookrejection.bpmn','p_5_4_notifyinvolvedpartiesofmainbookrejection.bpmn');  
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_submittolandregistry.bpmn','p_5_submittolandregistry.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_mainprocess.bpmn','p_mainprocess.bpmn'); 

  await firstWindow.locator('id=remove-p4certifydocumentsbpmn').click();

  var bodyContent = await firstWindow.evaluate(() => {return document.body.outerHTML});


  const expectedDataPath = 'test/data/import-view/remove-one-file.html';

  //saveFile(expectedDataPath,bodyContent);

  
  var expectedContent = loadFile(expectedDataPath);
  
  /// remove tag attributes with random values generated on each import
  bodyContent = removeElementAttributes(elementAttributesToRemove,bodyContent).replace(/>/g, ">\n");
  expectedContent = removeElementAttributes(elementAttributesToRemove,expectedContent).replace(/>/g, ">\n");
  

  expect(bodyContent).toBe(expectedContent);
  
  
}); 


test("remove-all-files", async () => {


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
  await firstWindow.locator('id=linking-sub-processes').selectOption("newTab");
  await firstWindow.locator('id=proceed-data-collection-settings').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_1_1_fetchandvalidateonlinedata.bpmn','p_1_1_fetchandvalidateonlinedata.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_1_2_movemortgagetomaindepot.bpmn','p_1_2_movemortgagetomaindepot.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_2_generatedocument.bpmn','p_2_generatedocument.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_2_1_generateandappendreturncoversheets.bpmn','p_2_1_generateandappendreturncoversheets.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_3_approveandsigndocuments.bpmn','p_3_approveandsigndocuments.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_4_certifydocuments.bpmn','p_4_certifydocuments.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_1_notifyinvolvedpartiesofjournalentry.bpmn','p_5_1_notifyinvolvedpartiesofjournalentry.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_2_notifyinvolvedpartiesofjournalentryrefusal.bpmn','p_5_2_notifyinvolvedpartiesofjournalentryrefusal.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_3_notifyinvolvedpartiesofmainbook.bpmn','p_5_3_notifyinvolvedpartiesofmainbook.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_4_notifyinvolvedpartiesofmainbookrejection.bpmn','p_5_4_notifyinvolvedpartiesofmainbookrejection.bpmn');  
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_submittolandregistry.bpmn','p_5_submittolandregistry.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_7_notifypartnersofcompletion.bpmn','p_7_notifypartnersofcompletion.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_mainprocess.bpmn','p_mainprocess.bpmn'); 

 await firstWindow.locator('id=remove-p11fetchandvalidateonlinedatabpmn').click();
 await firstWindow.locator('id=remove-p12movemortgagetomaindepotbpmn').click();
 await firstWindow.locator('id=remove-p2generatedocumentbpmn').click();
 await firstWindow.locator('id=remove-p21generateandappendreturncoversheetsbpmn').click();
 await firstWindow.locator('id=remove-p3approveandsigndocumentsbpmn').click();
 await firstWindow.locator('id=remove-p4certifydocumentsbpmn').click();
 await firstWindow.locator('id=remove-p51notifyinvolvedpartiesofjournalentrybpmn').click();
 await firstWindow.locator('id=remove-p52notifyinvolvedpartiesofjournalentryrefusalbpmn').click();
 await firstWindow.locator('id=remove-p53notifyinvolvedpartiesofmainbookbpmn').click();
 await firstWindow.locator('id=remove-p54notifyinvolvedpartiesofmainbookrejectionbpmn').click();  
 await firstWindow.locator('id=remove-p5submittolandregistrybpmn').click();
 await firstWindow.locator('id=remove-p7notifypartnersofcompletionbpmn').click();
 await firstWindow.locator('id=remove-pmainprocessbpmn').click();


  var bodyContent = await firstWindow.evaluate(() => {return document.body.outerHTML});

  const expectedDataPath = 'test/data/import-view/remove-all-files.html';

  //saveFile(expectedDataPath,bodyContent);

  
  var expectedContent = loadFile(expectedDataPath);
  
  /// remove tag attributes with random values generated on each import
  bodyContent = removeElementAttributes(elementAttributesToRemove,bodyContent).replace(/>/g, ">\n");
  expectedContent = removeElementAttributes(elementAttributesToRemove,expectedContent).replace(/>/g, ">\n");
  

  expect(bodyContent).toBe(expectedContent);
  
});


test("remove-all-files-then-press-process-files", async () => {



  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();


    firstWindow.on("console", (message) => {
    if (message.type() === "error") {
      
      const expectedContent = "No models to load";
      expect(message.text()).toBe(expectedContent);
    }
  })


  await firstWindow.locator('id=eye-tracking').click();
  await firstWindow.locator('id=new-session').click();
  await firstWindow.locator('id=linking-sub-processes').selectOption("newTab");
  await firstWindow.locator('id=proceed-data-collection-settings').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_1_1_fetchandvalidateonlinedata.bpmn','p_1_1_fetchandvalidateonlinedata.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_1_2_movemortgagetomaindepot.bpmn','p_1_2_movemortgagetomaindepot.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_2_generatedocument.bpmn','p_2_generatedocument.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_2_1_generateandappendreturncoversheets.bpmn','p_2_1_generateandappendreturncoversheets.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_3_approveandsigndocuments.bpmn','p_3_approveandsigndocuments.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_4_certifydocuments.bpmn','p_4_certifydocuments.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_1_notifyinvolvedpartiesofjournalentry.bpmn','p_5_1_notifyinvolvedpartiesofjournalentry.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_2_notifyinvolvedpartiesofjournalentryrefusal.bpmn','p_5_2_notifyinvolvedpartiesofjournalentryrefusal.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_3_notifyinvolvedpartiesofmainbook.bpmn','p_5_3_notifyinvolvedpartiesofmainbook.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_4_notifyinvolvedpartiesofmainbookrejection.bpmn','p_5_4_notifyinvolvedpartiesofmainbookrejection.bpmn');  
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_submittolandregistry.bpmn','p_5_submittolandregistry.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_7_notifypartnersofcompletion.bpmn','p_7_notifypartnersofcompletion.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_mainprocess.bpmn','p_mainprocess.bpmn'); 

 await firstWindow.locator('id=remove-p11fetchandvalidateonlinedatabpmn').click();
 await firstWindow.locator('id=remove-p12movemortgagetomaindepotbpmn').click();
 await firstWindow.locator('id=remove-p2generatedocumentbpmn').click();
 await firstWindow.locator('id=remove-p21generateandappendreturncoversheetsbpmn').click();
 await firstWindow.locator('id=remove-p3approveandsigndocumentsbpmn').click();
 await firstWindow.locator('id=remove-p4certifydocumentsbpmn').click();
 await firstWindow.locator('id=remove-p51notifyinvolvedpartiesofjournalentrybpmn').click();
 await firstWindow.locator('id=remove-p52notifyinvolvedpartiesofjournalentryrefusalbpmn').click();
 await firstWindow.locator('id=remove-p53notifyinvolvedpartiesofmainbookbpmn').click();
 await firstWindow.locator('id=remove-p54notifyinvolvedpartiesofmainbookrejectionbpmn').click();  
 await firstWindow.locator('id=remove-p5submittolandregistrybpmn').click();
 await firstWindow.locator('id=remove-p7notifypartnersofcompletionbpmn').click();
 await firstWindow.locator('id=remove-pmainprocessbpmn').click();

 await firstWindow.locator('id=process-files').click();

 
});  


test("import-view-then-press-process-files-without-importing-files", async () => {


  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();


    firstWindow.on("console", (message) => {
    if (message.type() === "error") {
     
      const expectedContent = "No models to load";
      expect(message.text()).toBe(expectedContent);
    }
  })


  await firstWindow.locator('id=eye-tracking').click();
  await firstWindow.locator('id=new-session').click();
  await firstWindow.locator('id=linking-sub-processes').selectOption("newTab");
  await firstWindow.locator('id=proceed-data-collection-settings').click();

 await firstWindow.locator('id=process-files').click();

 
});  


test("import-unexpected-model-file", async () => {


  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();


    firstWindow.on("console", (message) => {
    if (message.type() === "error") {
      
      const expectedContent = "File type or content not expected";
      expect(message.text()).toBe(expectedContent);
    }
  })


  await firstWindow.locator('id=eye-tracking').click();
  await firstWindow.locator('id=new-session').click();
  await firstWindow.locator('id=linking-sub-processes').selectOption("newTab");
  await firstWindow.locator('id=proceed-data-collection-settings').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/process.notbpmn','process.notbpmn');

 
});


test("import-corrupt-model-file", async () => {


  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();


    firstWindow.on("console", (message) => {
    if (message.type() === "error") {
    
      const expectedContent = "corruptModel.bpmn is invalid";
      expect(message.text()).toBe(expectedContent);
    }
  })


  await firstWindow.locator('id=eye-tracking').click();
  await firstWindow.locator('id=new-session').click();
  await firstWindow.locator('id=linking-sub-processes').selectOption("newTab");
  await firstWindow.locator('id=proceed-data-collection-settings').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/corruptModel.bpmn','corruptModel.bpmn');

 
});


test("import-a-file-twice", async () => {


  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();


    firstWindow.on("console", (message) => {
    if (message.type() === "error") {
      

      const expectedContent = "p_1_1_fetchandvalidateonlinedata.bpmn (id: p11fetchandvalidateonlinedatabpmn) is already added";
      expect(message.text()).toBe(expectedContent);
    }
  })


  await firstWindow.locator('id=eye-tracking').click();
  await firstWindow.locator('id=new-session').click();
  await firstWindow.locator('id=linking-sub-processes').selectOption("newTab");
  await firstWindow.locator('id=proceed-data-collection-settings').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_1_1_fetchandvalidateonlinedata.bpmn','p_1_1_fetchandvalidateonlinedata.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_1_1_fetchandvalidateonlinedata.bpmn','p_1_1_fetchandvalidateonlinedata.bpmn');
 
});  


test("import-valid-question-file", async () => {


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
  await firstWindow.locator('id=linking-sub-processes').selectOption("newTab");
  await firstWindow.locator('id=proceed-data-collection-settings').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_1_1_fetchandvalidateonlinedata.bpmn','p_1_1_fetchandvalidateonlinedata.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_1_2_movemortgagetomaindepot.bpmn','p_1_2_movemortgagetomaindepot.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_2_generatedocument.bpmn','p_2_generatedocument.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_2_1_generateandappendreturncoversheets.bpmn','p_2_1_generateandappendreturncoversheets.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_3_approveandsigndocuments.bpmn','p_3_approveandsigndocuments.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_4_certifydocuments.bpmn','p_4_certifydocuments.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_1_notifyinvolvedpartiesofjournalentry.bpmn','p_5_1_notifyinvolvedpartiesofjournalentry.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_2_notifyinvolvedpartiesofjournalentryrefusal.bpmn','p_5_2_notifyinvolvedpartiesofjournalentryrefusal.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_3_notifyinvolvedpartiesofmainbook.bpmn','p_5_3_notifyinvolvedpartiesofmainbook.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_4_notifyinvolvedpartiesofmainbookrejection.bpmn','p_5_4_notifyinvolvedpartiesofmainbookrejection.bpmn');  
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_submittolandregistry.bpmn','p_5_submittolandregistry.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_7_notifypartnersofcompletion.bpmn','p_7_notifypartnersofcompletion.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_mainprocess.bpmn','p_mainprocess.bpmn'); 


  await firstWindow.locator('id=process-files').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/questions/questionSet.csv','questionSet.csv'); 

  var bodyContent = await firstWindow.evaluate(() => {return document.body.outerHTML});

  const expectedDataPath = 'test/data/import-view/import-valid-question-file.html';

  //saveFile(expectedDataPath,bodyContent);


  var expectedContent = loadFile(expectedDataPath);
  
  /// remove tag attributes with random values generated on each import
  bodyContent = removeElementAttributes(elementAttributesToRemove,bodyContent).replace(/>/g, ">\n");
  expectedContent = removeElementAttributes(elementAttributesToRemove,expectedContent).replace(/>/g, ">\n");
  

  expect(bodyContent).toBe(expectedContent);
  

 
});


test("import-unexpected-question-file", async () => {


  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();


    firstWindow.on("console", (message) => {
    if (message.type() === "error") {
      const expectedContent = "File type or content not expected";
      expect(message.text()).toBe(expectedContent);
    }
  })


  await firstWindow.locator('id=eye-tracking').click();
  await firstWindow.locator('id=new-session').click();
  await firstWindow.locator('id=linking-sub-processes').selectOption("newTab");
  await firstWindow.locator('id=proceed-data-collection-settings').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_1_1_fetchandvalidateonlinedata.bpmn','p_1_1_fetchandvalidateonlinedata.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_1_2_movemortgagetomaindepot.bpmn','p_1_2_movemortgagetomaindepot.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_2_generatedocument.bpmn','p_2_generatedocument.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_2_1_generateandappendreturncoversheets.bpmn','p_2_1_generateandappendreturncoversheets.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_3_approveandsigndocuments.bpmn','p_3_approveandsigndocuments.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_4_certifydocuments.bpmn','p_4_certifydocuments.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_1_notifyinvolvedpartiesofjournalentry.bpmn','p_5_1_notifyinvolvedpartiesofjournalentry.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_2_notifyinvolvedpartiesofjournalentryrefusal.bpmn','p_5_2_notifyinvolvedpartiesofjournalentryrefusal.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_3_notifyinvolvedpartiesofmainbook.bpmn','p_5_3_notifyinvolvedpartiesofmainbook.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_4_notifyinvolvedpartiesofmainbookrejection.bpmn','p_5_4_notifyinvolvedpartiesofmainbookrejection.bpmn');  
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_submittolandregistry.bpmn','p_5_submittolandregistry.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_7_notifypartnersofcompletion.bpmn','p_7_notifypartnersofcompletion.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_mainprocess.bpmn','p_mainprocess.bpmn'); 


  await firstWindow.locator('id=process-files').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/questions/unexpectedQuestionsFile.trn','unexpectedQuestionsFile.trn'); 
 
});




test("import-question-file-with-missing-attributes", async () => {


  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();


    firstWindow.on("console", (message) => {
    if (message.type() === "error") {
      const expectedContent = "An error occured, check the validity of the file";
      expect(message.text()).toBe(expectedContent);
    }
  })


  await firstWindow.locator('id=eye-tracking').click();
  await firstWindow.locator('id=new-session').click();
  await firstWindow.locator('id=linking-sub-processes').selectOption("newTab");
  await firstWindow.locator('id=proceed-data-collection-settings').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_1_1_fetchandvalidateonlinedata.bpmn','p_1_1_fetchandvalidateonlinedata.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_1_2_movemortgagetomaindepot.bpmn','p_1_2_movemortgagetomaindepot.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_2_generatedocument.bpmn','p_2_generatedocument.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_2_1_generateandappendreturncoversheets.bpmn','p_2_1_generateandappendreturncoversheets.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_3_approveandsigndocuments.bpmn','p_3_approveandsigndocuments.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_4_certifydocuments.bpmn','p_4_certifydocuments.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_1_notifyinvolvedpartiesofjournalentry.bpmn','p_5_1_notifyinvolvedpartiesofjournalentry.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_2_notifyinvolvedpartiesofjournalentryrefusal.bpmn','p_5_2_notifyinvolvedpartiesofjournalentryrefusal.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_3_notifyinvolvedpartiesofmainbook.bpmn','p_5_3_notifyinvolvedpartiesofmainbook.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_4_notifyinvolvedpartiesofmainbookrejection.bpmn','p_5_4_notifyinvolvedpartiesofmainbookrejection.bpmn');  
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_submittolandregistry.bpmn','p_5_submittolandregistry.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_7_notifypartnersofcompletion.bpmn','p_7_notifypartnersofcompletion.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_mainprocess.bpmn','p_mainprocess.bpmn'); 


  await firstWindow.locator('id=process-files').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/questions/QuestionsFileWithMissingAttributes.csv','QuestionsFileWithMissingAttributes.csv'); 

 
});

test("import-question-file-with-unsuported-questions-type", async () => {


  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();


    firstWindow.on("console", (message) => {
    if (message.type() === "error") {
      const expectedContent = "An error occured, check the validity of the file";
      expect(message.text()).toBe(expectedContent);
    }
  })


  await firstWindow.locator('id=eye-tracking').click();
  await firstWindow.locator('id=new-session').click();
  await firstWindow.locator('id=linking-sub-processes').selectOption("newTab");
  await firstWindow.locator('id=proceed-data-collection-settings').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_1_1_fetchandvalidateonlinedata.bpmn','p_1_1_fetchandvalidateonlinedata.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_1_2_movemortgagetomaindepot.bpmn','p_1_2_movemortgagetomaindepot.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_2_generatedocument.bpmn','p_2_generatedocument.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_2_1_generateandappendreturncoversheets.bpmn','p_2_1_generateandappendreturncoversheets.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_3_approveandsigndocuments.bpmn','p_3_approveandsigndocuments.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_4_certifydocuments.bpmn','p_4_certifydocuments.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_1_notifyinvolvedpartiesofjournalentry.bpmn','p_5_1_notifyinvolvedpartiesofjournalentry.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_2_notifyinvolvedpartiesofjournalentryrefusal.bpmn','p_5_2_notifyinvolvedpartiesofjournalentryrefusal.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_3_notifyinvolvedpartiesofmainbook.bpmn','p_5_3_notifyinvolvedpartiesofmainbook.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_4_notifyinvolvedpartiesofmainbookrejection.bpmn','p_5_4_notifyinvolvedpartiesofmainbookrejection.bpmn');  
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_submittolandregistry.bpmn','p_5_submittolandregistry.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_7_notifypartnersofcompletion.bpmn','p_7_notifypartnersofcompletion.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_mainprocess.bpmn','p_mainprocess.bpmn'); 


  await firstWindow.locator('id=process-files').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/questions/QuestionsFileWithUnspportedQuestionTypes.csv','QuestionsFileWithUnspportedQuestionTypes.csv'); 
 
});


test("load-session-import-valid-session", async () => {


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

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/sessions/valid-session.json','valid-session.json'); 
  
  await  delay(3000);

  var bodyContent = await firstWindow.evaluate(() => {return document.body.outerHTML});

  const expectedDataPath = 'test/data/import-view/load-session-import-valid-session.html'

  //saveFile(expectedDataPath,bodyContent);

  
  var expectedContent = loadFile(expectedDataPath);
  
  /// remove tag attributes with random values generated on each import
  bodyContent = removeElementAttributes(elementAttributesToRemove,bodyContent).replace(/>/g, ">\n");
  expectedContent = removeElementAttributes(elementAttributesToRemove,expectedContent).replace(/>/g, ">\n");
  

  expect(bodyContent).toBe(expectedContent);
  


});


test("load-session-import-unexpected-session", async () => {


  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();

  firstWindow.on("console", (message) => {
    if (message.type() === "error") {
        const expectedContent = "File type or content not expected";
        expect(message.text()).toBe(expectedContent);
    }
  })


  await firstWindow.locator('id=eye-tracking').click();
  await firstWindow.locator('id=load-session').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/sessions/unexpected-session.csv','unexpected-session.csv'); 
 
  await  delay(3000);
});

test("load-corrupt-session", async () => {


  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();

  firstWindow.on("console", (message) => {
    if (message.type() === "error") {
        const expectedContent = "An error occured while reading the file";
        expect(message.text()).toBe(expectedContent);
    }
  })


  await firstWindow.locator('id=eye-tracking').click();
  await firstWindow.locator('id=load-session').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/sessions/corrupt-session.json','corrupt-session.json'); 
  
  await  delay(3000);
});

test("load-session-with-gaze-data", async () => {


  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();

  firstWindow.on("console", (message) => {
    if (message.type() === "error") {
        const expectedContent = "Could not load the session file because it contains gaze data already";
        expect(message.text()).toBe(expectedContent);
    }
  })

  await firstWindow.locator('id=eye-tracking').click();
  await firstWindow.locator('id=load-session').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/sessions/session-file-with-gaze-data.json','session-file-with-gaze-data.json'); 
  
  await  delay(3000);

});



test("import-valid-analysis-file", async () => {


  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();

  // except no errors in console.error()
  firstWindow.on("console", (message) => {
    if (message.type() === "error") {
       expect(message.text()).toBe("");
    }
  })

  await firstWindow.locator('id=analysis').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/analysis/valid-analysis-file.json','valid-analysis-file.json'); 
 
  
  await  delay(7000);

  var bodyContent = await firstWindow.evaluate(() => {return document.body.outerHTML});


  const expectedDataPath = 'test/data/import-view/import-valid-analysis-file.html'

  //saveFile(expectedDataPath,bodyContent);

  
  var expectedContent = loadFile(expectedDataPath);
  
  /// remove tag attributes with random values generated on each import
  bodyContent = removeElementAttributes(elementAttributesToRemove,bodyContent).replace(/>/g, ">\n");
  expectedContent = removeElementAttributes(elementAttributesToRemove,expectedContent).replace(/>/g, ">\n");
  

  expect(bodyContent).toBe(expectedContent);
  


});





test("import-unexpected-analysis-file", async () => {


  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();

  firstWindow.on("console", (message) => {
    if (message.type() === "error") {
        const expectedContent = "File type or content not expected";
        expect(message.text()).toBe(expectedContent);
    }
  })

  await firstWindow.locator('id=eye-tracking').click();
  await firstWindow.locator('id=load-session').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/analysis/unexpected-analysis-file.csv','unexpected-analysis-file.csv'); 
  
  await  delay(7000);

});

test("import-corrupted-analysis-file", async () => {


  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();

  firstWindow.on("console", (message) => {
    if (message.type() === "error") {
        const expectedContent = "An error occured while reading the file";
        expect(message.text()).toBe(expectedContent);
    }
  })

  await firstWindow.locator('id=eye-tracking').click();
  await firstWindow.locator('id=load-session').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/analysis/corrupted-analysis-file.json','corrupted-analysis-file.json'); 
  
  await  delay(7000);

});


test("import-models-from-two-groups", async () => {


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
  await firstWindow.locator('id=linking-sub-processes').selectOption("newTab");
  await firstWindow.locator('id=proceed-data-collection-settings').click();

  
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_1_gatherdata.bpmn','p_1_gatherdata.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_1_1_fetchandvalidateonlinedata.bpmn','p_1_1_fetchandvalidateonlinedata.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_1_2_movemortgagetomaindepot.bpmn','p_1_2_movemortgagetomaindepot.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_2_generatedocument.bpmn','p_2_generatedocument.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_2_1_generateandappendreturncoversheets.bpmn','p_2_1_generateandappendreturncoversheets.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_3_approveandsigndocuments.bpmn','p_3_approveandsigndocuments.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_4_certifydocuments.bpmn','p_4_certifydocuments.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_submittolandregistry.bpmn','p_5_submittolandregistry.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_1_notifyinvolvedpartiesofjournalentry.bpmn','p_5_1_notifyinvolvedpartiesofjournalentry.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_2_notifyinvolvedpartiesofjournalentryrefusal.bpmn','p_5_2_notifyinvolvedpartiesofjournalentryrefusal.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_3_notifyinvolvedpartiesofmainbook.bpmn','p_5_3_notifyinvolvedpartiesofmainbook.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_4_notifyinvolvedpartiesofmainbookrejection.bpmn','p_5_4_notifyinvolvedpartiesofmainbookrejection.bpmn');  
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_6_bookmortgages.bpmn','p_6_bookmortgages.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_7_notifypartnersofcompletion.bpmn','p_7_notifypartnersofcompletion.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_mainprocess.bpmn','p_mainprocess.bpmn'); 


  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_main.bpmn','icc_main.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_1_check-whether-existing-customer.bpmn','icc_1_check-whether-existing-customer.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_2_create-prospect.bpmn','icc_2_create-prospect.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_3_validate-and-rate-customer.bpmn','icc_3_validate-and-rate-customer.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_3_1_check-financial-income.bpmn','icc_3_1_check-financial-income.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_3_2_check-nationality-on-sanctions-list.bpmn','icc_3_2_check-nationality-on-sanctions-list.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_3_3_check-person-on-sanctions-list.bpmn','icc_3_3_check-person-on-sanctions-list.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_3_4_evaluate-id-document.bpmn','icc_3_4_evaluate-id-document.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_4_create-credit-card.bpmn','icc_4_create-credit-card.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_5_send-credit-card-information.bpmn','icc_5_send-credit-card-information.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_5_1_send-letter-to-customer.bpmn','icc_5_1_send-letter-to-customer.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_6_register-for-mobile-payment.bpmn','icc_6_register-for-mobile-payment.bpmn');  
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_6_1_enable_apple_pay.bpmn','icc_6_1_enable_apple_pay.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_6_2_enable_google_pay.bpmn','icc_6_2_enable_google_pay.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_7_update-customer-data.bpmn','icc_7_update-customer-data.bpmn'); 


  await firstWindow.locator('id=group-assignement-for-file-iccmainbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc1check-whether-existing-customerbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc2create-prospectbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc3validate-and-rate-customerbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc31check-financial-incomebpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc32check-nationality-on-sanctions-listbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc33check-person-on-sanctions-listbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc34evaluate-id-documentbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc4create-credit-cardbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc5send-credit-card-informationbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc51send-letter-to-customerbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc6register-for-mobile-paymentbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc61enableapplepaybpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc62enablegooglepaybpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc7update-customer-databpmn').fill("2")



  await firstWindow.locator('id=process-files').click();

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/questions/questionSet.csv','questionSet.csv'); 
 

  var clientState = await firstWindow.evaluate(() => {return window.clientTests.getClientState()});

  //console.log(clientState);

    // check that group ids are correctly assigned to the imported models
    for (const [index, [key, model]] of Object.entries(Object.entries(clientState.models))) {
      
      if(index<15) {
         expect(model.groupId).toBe("1");
      }
      else {
         expect(model.groupId).toBe("2");
      }

  }


});




test("import-models-from-two-groups-missing-groupAttribute-for-a-model", async () => {


  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();


  // except no errors in console.error()
  firstWindow.on("console", (message) => {
    if (message.type() === "error") {
       expect(message.text()).toBe("Some models are missing a group Id.");
    }
  })


  await firstWindow.locator('id=eye-tracking').click();
  await firstWindow.locator('id=new-session').click();
  await firstWindow.locator('id=linking-sub-processes').selectOption("newTab");
  await firstWindow.locator('id=proceed-data-collection-settings').click();

  
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_1_gatherdata.bpmn','p_1_gatherdata.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_1_1_fetchandvalidateonlinedata.bpmn','p_1_1_fetchandvalidateonlinedata.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_1_2_movemortgagetomaindepot.bpmn','p_1_2_movemortgagetomaindepot.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_2_generatedocument.bpmn','p_2_generatedocument.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_2_1_generateandappendreturncoversheets.bpmn','p_2_1_generateandappendreturncoversheets.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_3_approveandsigndocuments.bpmn','p_3_approveandsigndocuments.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_4_certifydocuments.bpmn','p_4_certifydocuments.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_submittolandregistry.bpmn','p_5_submittolandregistry.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_1_notifyinvolvedpartiesofjournalentry.bpmn','p_5_1_notifyinvolvedpartiesofjournalentry.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_2_notifyinvolvedpartiesofjournalentryrefusal.bpmn','p_5_2_notifyinvolvedpartiesofjournalentryrefusal.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_3_notifyinvolvedpartiesofmainbook.bpmn','p_5_3_notifyinvolvedpartiesofmainbook.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_4_notifyinvolvedpartiesofmainbookrejection.bpmn','p_5_4_notifyinvolvedpartiesofmainbookrejection.bpmn');  
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_6_bookmortgages.bpmn','p_6_bookmortgages.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_7_notifypartnersofcompletion.bpmn','p_7_notifypartnersofcompletion.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_mainprocess.bpmn','p_mainprocess.bpmn'); 


  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_main.bpmn','icc_main.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_1_check-whether-existing-customer.bpmn','icc_1_check-whether-existing-customer.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_2_create-prospect.bpmn','icc_2_create-prospect.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_3_validate-and-rate-customer.bpmn','icc_3_validate-and-rate-customer.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_3_1_check-financial-income.bpmn','icc_3_1_check-financial-income.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_3_2_check-nationality-on-sanctions-list.bpmn','icc_3_2_check-nationality-on-sanctions-list.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_3_3_check-person-on-sanctions-list.bpmn','icc_3_3_check-person-on-sanctions-list.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_3_4_evaluate-id-document.bpmn','icc_3_4_evaluate-id-document.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_4_create-credit-card.bpmn','icc_4_create-credit-card.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_5_send-credit-card-information.bpmn','icc_5_send-credit-card-information.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_5_1_send-letter-to-customer.bpmn','icc_5_1_send-letter-to-customer.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_6_register-for-mobile-payment.bpmn','icc_6_register-for-mobile-payment.bpmn');  
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_6_1_enable_apple_pay.bpmn','icc_6_1_enable_apple_pay.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_6_2_enable_google_pay.bpmn','icc_6_2_enable_google_pay.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_7_update-customer-data.bpmn','icc_7_update-customer-data.bpmn'); 


  await firstWindow.locator('id=group-assignement-for-file-iccmainbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc1check-whether-existing-customerbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc2create-prospectbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc3validate-and-rate-customerbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc31check-financial-incomebpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc32check-nationality-on-sanctions-listbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc33check-person-on-sanctions-listbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc34evaluate-id-documentbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc4create-credit-cardbpmn').fill("")
  await firstWindow.locator('id=group-assignement-for-file-icc5send-credit-card-informationbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc51send-letter-to-customerbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc6register-for-mobile-paymentbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc61enableapplepaybpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc62enablegooglepaybpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc7update-customer-databpmn').fill("2")



  await firstWindow.locator('id=process-files').click();


});


test("import-models-from-two-groups-no-main-model", async () => {


  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();


  // except no errors in console.error()
  firstWindow.on("console", (message) => {
    if (message.type() === "error") {
       expect(message.text()).toBe("Each group should have one main model.");
    }
  })


  await firstWindow.locator('id=eye-tracking').click();
  await firstWindow.locator('id=new-session').click();
  await firstWindow.locator('id=linking-sub-processes').selectOption("newTab");
  await firstWindow.locator('id=proceed-data-collection-settings').click();

  
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_1_gatherdata.bpmn','p_1_gatherdata.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_1_1_fetchandvalidateonlinedata.bpmn','p_1_1_fetchandvalidateonlinedata.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_1_2_movemortgagetomaindepot.bpmn','p_1_2_movemortgagetomaindepot.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_2_generatedocument.bpmn','p_2_generatedocument.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_2_1_generateandappendreturncoversheets.bpmn','p_2_1_generateandappendreturncoversheets.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_3_approveandsigndocuments.bpmn','p_3_approveandsigndocuments.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_4_certifydocuments.bpmn','p_4_certifydocuments.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_submittolandregistry.bpmn','p_5_submittolandregistry.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_1_notifyinvolvedpartiesofjournalentry.bpmn','p_5_1_notifyinvolvedpartiesofjournalentry.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_2_notifyinvolvedpartiesofjournalentryrefusal.bpmn','p_5_2_notifyinvolvedpartiesofjournalentryrefusal.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_3_notifyinvolvedpartiesofmainbook.bpmn','p_5_3_notifyinvolvedpartiesofmainbook.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_5_4_notifyinvolvedpartiesofmainbookrejection.bpmn','p_5_4_notifyinvolvedpartiesofmainbookrejection.bpmn');  
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_6_bookmortgages.bpmn','p_6_bookmortgages.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_7_notifypartnersofcompletion.bpmn','p_7_notifypartnersofcompletion.bpmn');



  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_main.bpmn','icc_main.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_1_check-whether-existing-customer.bpmn','icc_1_check-whether-existing-customer.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_2_create-prospect.bpmn','icc_2_create-prospect.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_3_validate-and-rate-customer.bpmn','icc_3_validate-and-rate-customer.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_3_1_check-financial-income.bpmn','icc_3_1_check-financial-income.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_3_2_check-nationality-on-sanctions-list.bpmn','icc_3_2_check-nationality-on-sanctions-list.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_3_3_check-person-on-sanctions-list.bpmn','icc_3_3_check-person-on-sanctions-list.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_3_4_evaluate-id-document.bpmn','icc_3_4_evaluate-id-document.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_4_create-credit-card.bpmn','icc_4_create-credit-card.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_5_send-credit-card-information.bpmn','icc_5_send-credit-card-information.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_5_1_send-letter-to-customer.bpmn','icc_5_1_send-letter-to-customer.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_6_register-for-mobile-payment.bpmn','icc_6_register-for-mobile-payment.bpmn');  
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_6_1_enable_apple_pay.bpmn','icc_6_1_enable_apple_pay.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_6_2_enable_google_pay.bpmn','icc_6_2_enable_google_pay.bpmn');
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_7_update-customer-data.bpmn','icc_7_update-customer-data.bpmn'); 


  await firstWindow.locator('id=group-assignement-for-file-iccmainbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc1check-whether-existing-customerbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc2create-prospectbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc3validate-and-rate-customerbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc31check-financial-incomebpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc32check-nationality-on-sanctions-listbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc33check-person-on-sanctions-listbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc34evaluate-id-documentbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc4create-credit-cardbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc5send-credit-card-informationbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc51send-letter-to-customerbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc6register-for-mobile-paymentbpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc61enableapplepaybpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc62enablegooglepaybpmn').fill("2")
  await firstWindow.locator('id=group-assignement-for-file-icc7update-customer-databpmn').fill("2")



  await firstWindow.locator('id=process-files').click();


});


test("import-models-from-two-groups-two-main-models", async () => {


  const electronApp = await electron.launch({ args: ["."] });
  const firstWindow = await electronApp.firstWindow();


  // except no errors in console.error()
  firstWindow.on("console", (message) => {
    if (message.type() === "error") {
       expect(message.text()).toBe("Each group should have one main model.");
    }
  })


  await firstWindow.locator('id=eye-tracking').click();
  await firstWindow.locator('id=new-session').click();
  await firstWindow.locator('id=linking-sub-processes').selectOption("newTab");
  await firstWindow.locator('id=proceed-data-collection-settings').click();

  
  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/p_mainprocess.bpmn','p_mainprocess.bpmn'); 

  await dragAndDropFile(firstWindow,'id=upload-zone','test/data/import-view/models/icc_main.bpmn','icc_main.bpmn');


  await firstWindow.locator('id=process-files').click();


});

