
var HistoryTracker="HistoryTracker";
CreateNewDir(GetDLLDir() + '\\CustomPages\\' + HistoryTracker);
CopyASPTo(HistoryTracker+'\\update.asp','\\CustomPages\\'+HistoryTracker+'\\update.asp');
CopyASPTo(HistoryTracker+'\\sagecrm.js','\\CustomPages\\'+HistoryTracker+'\\sagecrm.js');
CopyASPTo(HistoryTracker+'\\sagecrmnolang.js','\\CustomPages\\'+HistoryTracker+'\\sagecrmnolang.js');

CopyASPTo('\\js\\history.js','\\js\\custom\\history.js');
