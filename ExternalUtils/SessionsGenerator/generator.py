from utils import  isDirectoryEmpty, createSessions

experimentConfig = {

	"rooms": ["A","M"], #eye-tracking rooms where parrallel sessions will occur (e.g., Amine room A, Maike room M)
	"participantsPerRoom": 50, #number of participant sessions to be created in each room folder
	"ParticipantsIdPrefix": "P", #prefix used in participant id
	"participantsIdSeed":1, #seed from which to start when assigning ids to participants
	"shuffleStartIndex":2, #shuffle questions list starting from startIndex=2 (to keep the amazon smart process questions first)

	# path of template session file
	"template" :  '../../Experiment-data/template.json',

	# no need to edit the following
	"outDirectory": "out/", #output directory
	"linkingSubProcessesModes": ["no","newTab","withinTab"] #linking modes accronyms for no-support, symoblic links, breadcrumb respectively
}

# check that experimentConfig["outDirectory"] is empty
if not isDirectoryEmpty(experimentConfig["outDirectory"]):
	print(f'Error: "directory {experimentConfig["outDirectory"]}"" is not empty')
	exit();

# create sessions
createSessions(experimentConfig)
