A. Requirements to install the dependecis for the eye-tracking server

	1. Install the following:

		1.1. Python 3.8.6 https://www.python.org/downloads/release/python-386/, make sure you choose the correct distribution 
		1.2. Pip https://phoenixnap.com/kb/install-pip-windows


	2. Aftering cloning the eyeMind repository to your local machine 

		2.2. Open terminal and get to the eyeMind folder
				e.g., "cd <root path>\EyeMind\EyeTrackingServer"
		2.3. Install dependenceis
				pip install -r requirements.txt --user
		2.3. The folder in "\EyeTrackingServer\out\logs" should have read and write permissions (chmod 777). In this folder, the eye-tracking raw data will be recorded. Please do not delete this data as it can be used for recovery.

B. Requirements to build and run the EyeMind Tool

	1. Install the following 

		1.1. npm and node.js https://nodejs.org/en/download/ 

	2. On your command line.

		2.1 Open terminal and browse to the EyeMind folder
				cd <root path>\EyeMind\EyeMindApp\
		2.2 Install dependencies
				npm run install-dependencies
		2.3 Build app
				npm run build
		2.4 now you can run the app using. This command you can use it everytime you want to start the app
				npm start


C. Eye-tracker setup
	
	1. Note: EyeMind supports currently only Tobii X3-120 eye-trackers
	2. install Tobii eye-tracker manager and configure the eye-tracker in there, by setting a new display setup
		See. https://www.tobiipro.com/produkte/eye-tracker-manager/
	3. Installing tobii-pro lab
		See. https://www.tobiipro.com/learn-and-support/downloads-pro/
	4. In tobii-pro lab, create a new project (we will use the name "EyeMindDemo" to refer to the project). As project type choose "screen", then follow this procedure:
		4.1 Go to design
		4.2 Select "Eye tracker calibration", then on the right menu:
			4.2.1 Change the background color to white
			4.2.2 Change the target color to black
		4.3 Add screen recording simulus (you can find it in the top bar - to the right), then on the right menu:
			4.3.1 Reduce frame rate to 5 (This depends on your computer performance. It is used to avoid memory overload during the data recording. In our machine a frame rate of 10 worked well)
			4.3.2 Reduce video quality to Low (This depends on your computer performance. It is used to avoid memory overload during the data recording. In our machine a medium video quality worked well)
			4.3.3 Deselect "advance on option"
			4.3.4 Info: When collecting the data, you can use F10 to stop the recording
			4.3.5 Make a simple screen recording and check the quality of the obtained video


	Note: EyeMind tool does not provide a calibration. Hence, the eye-tracking calibration should be done either in Tobii eye-tracker manager or using other eye-tracking tools (e.g., Tobii Pro Studio, iMotions)

	Note: Tobii pro lab, EyeMind, Python, Electron should be allowed by the Windows Defender Firewall


D. Instructions of Use


	D.2. Data collection

		D.2.1 Important notes

				1. Supported features: Scrolling and Zooming within the model canvas, navigation between files, change order of tabs, scroll horizentally using the mouse wheel or using the left and right arrow icons on the tab part to see more tabs

				2. Unsupported features: Use of multiple screens, reading while scrolling, zooming the whole app, using groups in the BPMN models

		D.2.2 EyeMind Tool (models setup)

			D. 2.2.1 Run the eyeMind Tool

			cd <root path>EyeMind\EyeMindApp\
			npm start

			D. 2.2.2 Configuration

				1. Your computer should be plugged to a single screen
				2. To enable Symbolic links and breadcrumb navigation, the collapsed subprocess should have the same id as the sub-process file (you can do this use Camunda modeler)
				3. The main process model should have the id "main" or "Main"
				4. The sub-processes should be stored in different files (avoid using the sub-processes links available in bpmn.io where one collasped sub-process, leads you to the underlying model)
				5. You should know in advnace the following
					a. screen resolution (recommended 1920-1080)
					b. screen dimension in inches
					c. distance between the eye-tracker and the person
				6. There should be no display scalling in your computer
				7. It is recommended to always start a new instance of EyeMind and the eye-tracking sever for each data-collection


			D. 2.2.3 Models import

				1. You can drag and drop to add models
				2. The models should have unique file names (these files names should result in a unique pattern after applying filename.replace(/[\W_,.]/g,""))
				3. The order in which the files appear corresponds to the order in which they will show up in the file explorer
				4. Models of different processes should be asigned different group names

			D. 2.2.4 Questions import

				1. The questions should be formatted in a csv file, with a structure similar to  "questionSet.csv" provided in the "Examples" folder
				2. The questions should have a unique id
				3. the type can be "open-question" or "multiple-choice". If "multiple-choice", then the options should be provided in the following format: "<option 1>;<option 2>;<option 3>"
				4. Each question should be mapped to a specific process using the attribute model-group

			D. 2.2.5 Session saving and import

				1. After importing the models and the questions, you can press the start recording button, provide the eye-tracking recoding settings and then save the session (with models, questions and eye-tracking settings). Afterwards, you can import this session and directly start the recording

			D 2.2.6 Data collection

				1. Once the models and the questions are loaded, or a session is loaded, you are ready to start the data collection
				2. The tool will be set to full screen, but you can use the meta key to navigate to other tools

		D.2.3 Eye tracking server

				1. In the terminal go to "EyeMind\EyeTrackingServer"
					"cd EyeMind\EyeTrackingServer"
				2. Run the main.py script
					"python main.py"
				3. Wait until you see "found tobii tracker at ...". If no eye-tracker is found. Please try again in about a minute (this is because the eye-tracker needs time to be recognized by the computer when connected)

		D.2.4 Tobii Pro Lab

				1. Open tobii Pro Lab, open the pre-configured screen recording project ("EyeMindDemo" see Section (C. Eye-tracker setup - 4)), go to record, add a participant, set recording, set eye-tracker to Tobii X3-120
				2. Instruct the participant to not move her/his head	
				3. Start recording (remember: to ensure no memory/data loss issue when using tobii pro lab and eyeMind, it is recommended to reduce the video quality and frame rates in tobii pro lab video recording)
				4. Do the calibration, verify and re-do it if needed (remember: the calibration should be in the same background color as the stimulus (white background with black dots))
				5. After the calibration, go to the EyeMind tool


		D.2.5 EyeMind Tool (data collection)

				1. Instruct the participants *NOT TO* to press the following: ctrl+r (refresh the app), ctrl+esc (go out from the full screen), alt (show advanced menu), F10 (stop recording in Tobii)

				2. No window should superpose the recording window at any time
	
				3. Go to EyeMind tool and press the recording (red) buttom
				4. You must provide/see the following information in the form before you can proceed
					4.1 X Screen dimension in pixels
					4.2 Y Screen dimension in pixels
					4.3 Screen distance in centimeters
					4.4 Monitor size in inches
					4.5 Recording ID
				5. Press start recording
				6. The main model and the first question will show up
				8. When the experiment is over, you can press the black sqaure (which refers to stop recording)

		D.2.6 EyeMind Tool and Tobii Pro Lab when the recording is over

				1. After pressing the black sqaure in EyeMind, you should stop the Tobii pro lab recording by pressing F10.
				2. When ending the recording, you will see the tool rendering some snapshots of the recording. This is part of the procedure. Just wait.
				3. Wait until you see a msg informing you that the data is saved. The message shows also the path of the saved data (i.e., <root path>EyeMind\EyeMindApp\outputData)
				4. After saving the file, wait a few seconds, then check that the file is in your folder before refreshing the app using crt+R

		General notes:
				1. you can alawys start a new data collection session using ctrl+r (refresh). Remember that when you refresh all the non-saved data is deleted. 
				2. the model elements should have meaningful names
				3. In case the processing takes very long, you can use ctrl+shift+i to the open the developer tool. If you see no errors in the latest lines of log, it means that the processing is still ongoing otherwise, please take a screenshot of the error and contact me

	D.3. Anaylsis

		D.3.1 File import
				1. At the moment, you can import only a single file corresponding to one data collection (including all the questions). Use the export feature to export csv gaze and fixation data, which you can analysis externally. The support for several files will be provided in a following version.

		D.3.2 File export
				1. You can export the following
					1. Analysis data (json)
					2. Gaze data (csv)
					3. Fixation data (csv) (you need to apply the fixation filter -- see green icon, before you can export the fixation data)

		D.3.3 Fixation filter
				1. Use green icon to access the fixation filter

		D.3.4 Heatmap and overlays
				1. Use the rainbow colored icon to see the heatmaps and overlays
				2. Choose the question, metric, aggregation, timestamp unit and which BPMN elements to additionally include (activites, events, gateways, labels, data objects are included by default)
				2. use the file explorer to access the models
				3. To exit the heatmap and overlays press the same icon again

		D.3.5 Gaze offset correction
				1. Use the red icon to access the gaze correction offet
				2. Choose the data sample percentage on which you want to see the projections (for better performance, it is recommended to choose a small sample)
				4. Use the file explorer to see the snapshots with gaze projections on each model
				5. use the "general offset correction" menu to set corrections on the x and y axes. Note that the corrections here are only made to the data sample. so no data is affected yet.
				6. Use the file explorer to see the snapshots with gaze projections on each model after the correction
				7. If you are happy with the correction you can apply it to the whole dataset. For this press "Apply correction to data", then a pop-up will open, press start, and wait until the rendering of snapshots (to redo the mapping) is complete
				8. Note: for now, the gaze projections and corrections were tested on a machine with the same resolution on which the data correction has occured.
				9. To exit the gaze offset correction press its icon again

		General notes:
				1. you can alawys start a new analysis session using ctrl+r (refresh). Remember that when you refresh all the non-saved data is deleted. 
				2. In case the processing takes very long, you can use ctrl+shift+i to the open the developer tool. If you see no errors in the latest lines of log, it means that the processing is still ongoing otherwise, please take a screenshot of the error and contact me
				

	D.4. Other comments

			- The tool has been sucessfully tested internally. However, it is recommended to do several small/medium and large data collections before the experiment. In these trials, you must also check the data closely and do some basic analyses.
			- To avoid memory issues, you should have a machine (with the configuration recommended by Tobii) and you should avoid openning unnecessary apps during the data collection
			-  Check model layout, spacing, naming of activies, labels, visibility of everything shown on the model when desiging your experiment
			- If a problem occured you can kill the Eye-tracking sever with crtl+c on the terminal and start it again. However, you will need to restart the data collection in the EyeMind app as well.




E. Mapping gaze points to model or UI elements


	- In the log (i.e., fixation file, gaze data file, analysis file), the attribute "element" refers to the element gazed by the user
	- This element can be one of the following
		- The id of a model element (e.g, activitiy, gateway)
		- File explorer (visible in the no-link mode)
			- Folder 
				- Pattern: file-explorer-folder_<Folder name>
			- File
				- Pattern: file-explorer-file_<Model name>
		- Process hierarchy explorer (visible in the breadcrumb mode)
			- Pattern: process-hierarchy-sub-process-link-to_<Subprocess activity label || main>
		- Tabs
			- Tab header
				- Pattern: tab-header-tab-link-to_<Model name>
			- File Name in tab header
				- Pattern: tab-link-to_<Model name>
			- Close button in tab header
				- Pattern: close-button-tab-link-to_<Model name>
		- Quetions
			- Question area
				- Pattern: question-area-for-questionID_<Question id (i.e, as provided in the questions file)>
			- Question title
				- Pattern: title-for-questionID_<Question id>
			- Answer area
				- Pattern: answer_area_for_questionID_<Question id>
			- Input field for open questions
				- Pattern: long-answer-for-questionID_<Question id>
			- Radio buttons for multiple choice questions
				- Pattern: option-answer-for-questionID_<Question id>_option_<Option text (i.e., as provided in the questions file>
			- Next button
				- Pattern: next-button-area-in-questionID_<Question id>

F. Click events

	- The following click events are recorded in the gaze file and analysis file

		- Model
			- Clicks on sub processes
				- Pattern: <Subprocess activity id>
		- File explorer
			-  File
				- Pattern: file-explorer-file_<Model name>
		- Process hierarchy explorer (visible in the breadcrumb mode)
				- Pattern: process-hierarchy-sub-process-link-to_<Subprocess activity label || main>
		- Tabs
			- File Name in tab header
				- Pattern: tab-link-to_<Model name>
			- Close button in tab header
				- Pattern: close-button-tab-link-to_<Model name>
		- Questions
			- Input field for open questions
				- Pattern: long-answer-for-questionID_<Question id>
			- Radio buttons for multiple choice questions
				- Pattern: option-answer-for-questionID_<Question id>_option_<Option text (i.e., as provided in the questions file>				
			- Next button
				- Pattern: next-button-area-in-questionID_<Question id>

