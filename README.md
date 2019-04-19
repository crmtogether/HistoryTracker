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

