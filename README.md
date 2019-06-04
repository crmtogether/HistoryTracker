# HistoryTracker
For Sage CRM. 
Also requires 'Accelerator for Sage CRM' from 'CRM Together' or a copy of the SearchHistory Table that Accelerator creates.
With Accelerator any main entity viewed with it is recorded in this table and what this code does is also records a viewing when using Sage CRM itself. 

The code is in the 

	src

folder.

We ship the component with it "HistoryTracker.zip". An IIS reset is required for the change to be fully applied. 
-To create your own Sage CRM component zip up the contents of the src folder. 

To install then import via Sage CRM's Component Manager. 
This creates 1 folder in your CustomPages folder called

	HistoryTracker
	
and this contains the file 
  
  update.asp

which creates the SearchHistory record  

and also copies in a file 

    WWWRoot\js\custom\history.js

---4 June 2019--- Thanks to Wharncliffe Business Systems for this....

To cope with custom entities update the "getEntityFromKey" method in history.js

EG

case "58":
  var _taskId = crm.url({ arg: 'task_TasksID' });
  var _Key0id = crm.url({ arg: 'Key' + _key });                           
  res = _taskId === _Key0id ? "tasks" : "custom";
  break;

*where task_TasksID is the id in your customentity

The update.asp requires you to add in a Bord_RecDescriptor for the custom entity (this record appears not to be populated when custom entities are created via the component installer).



