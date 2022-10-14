import json
import random
import os
import copy


def isDirectoryEmpty(path):
	if len(os.listdir(path) ) == 1 and os.path.isfile(f'{path}/README.md'):
		return True
	return False


def write_json(data,path):
	with open(path, "w") as outFile:
		json.dump(data, outFile)

def read_json(path):
	with open(path) as inFile:
		return json.load(inFile)

def suffleStartingFromIndex(data,startIndex):

	#start by copying the data that should not be shuffled
	new_data = copy.deepcopy(data[0:startIndex])
	#copy the remaining data
	remaining_data = copy.deepcopy(data[startIndex:])
	#suffle remaining data
	random.shuffle(remaining_data) 
	#extend new_data with suffled remaining_data
	new_data.extend(remaining_data)	

	return new_data


def createSessions(experimentConfig):

	# read template
	template = read_json(experimentConfig["template"])

	# iterate over rooms
	for room in experimentConfig["rooms"]:
		# create room directory 
		roomPath = f'{experimentConfig["outDirectory"]}/{room}/'
		os.makedirs(roomPath,mode=0o777)
		# iterate over participants
		for participant in range(0,experimentConfig["participantsPerRoom"]):
			#make new session from template
			newSession = copy.deepcopy(template)
			#shuffle questions list starting from a given index 
			newSession["questions"] = suffleStartingFromIndex(newSession["questions"],startIndex=experimentConfig["shuffleStartIndex"])
			#Assign linkingSubProcessMode
			newSession["linkingSubProcessesMode"] = experimentConfig["linkingSubProcessesModes"][participant % len(experimentConfig["linkingSubProcessesModes"])]
			# Set export path and file name
			outFile = f'{roomPath}{room}{experimentConfig["ParticipantsIdPrefix"]}{experimentConfig["participantsIdSeed"]+participant}-{newSession["linkingSubProcessesMode"]}.json'
			print(f'outFile: {outFile}')
			#save file
			write_json(newSession,outFile)