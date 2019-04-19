<!-- #include file ="sagecrm.js" -->
<%
//used to debug...set to false when live
var dbgflag=false;
function dbg(msg)
{
  if (dbgflag)
  {
    Response.Write("<br>"+msg);
  }
}

var entityObject = {name:"", id:0, idfield:"", displayfield:"", displayfieldArray:""};

//set up the data we need from Custom_Tables
function getEntityObj(_EntityName)
{
    _EntityName=new String(_EntityName);
    _EntityName=_EntityName.toLowerCase();
	var esql="select Bord_IdField,Bord_RecDescriptor from Custom_Tables where bord_name='"+_EntityName+"'";
	dbg("getEntityObj:"+esql);
	var qry=CRM.CreateQueryObj(esql);
	qry.SelectSQL();
	if (!qry.eof)
	{
	  entityObject.name=_EntityName;
	  entityObject.idfield=qry("Bord_IdField");
      entityObject.displayfield=new String(qry("Bord_RecDescriptor")); 
	  if (entityObject.displayfield.indexOf(":")>0)
	  {
		entityObject.displayfieldArray=entityObject.displayfield.split(":");	  
	  }else{
		entityObject.displayfieldArray=entityObject.displayfield.split(" ");
	  }
	}
	return entityObject;
}
//gets what the user sees displayed..based on Bord_RecDescriptor
function getTitleText(id)
{
  var sql="select * from "+entityObject.name+" where "+entityObject.idfield+"="+id;
  var qry=CRM.CreateQueryObj(sql);
  dbg("getTitleText:"+sql);
  qry.SelectSQL();
  var res="";
  if(!qry.eof)
  {
    for (var i=0;i<entityObject.displayfieldArray.length;i++)
	{
		if (res!="")
		{
			if (entityObject.displayfield.indexOf(":")>0)
			{
				res+=":";
			}else{
				res+=" ";
			}
		}
		var fieldname=entityObject.displayfieldArray[i].substring(1,(entityObject.displayfieldArray[i].length-1));
		dbg("getTitleText fieldname:"+fieldname);
		res+=qry(fieldname);
	}	
  }
  return res;
}
var EntityName=Request.Form("Entity");
var ID=Request.Form("EntityId");
var userid=CRM.GetContextInfo("user", "user_userid");
if (dbgflag)
{
  EntityName="Company";
  ID="331";
}
dbg("EntityName:"+EntityName);
dbg("ID:"+ID);

entityObject=getEntityObj(EntityName);
if (entityObject.name=="")
{
  Response.Write("no entity matched");
  Response.End();
}
var _q_sql="Select * from SearchHistory where sear_userid="+userid+" and sear_entityname='"+EntityName+"' and sear_entityid="+ID+" and sear_deleted is null " +
                    " and sear_updateddate> DATEADD(day, DATEDIFF(day, 0, getdate()), 0)";
var qry=CRM.CreateQueryObj(_q_sql);
dbg("SearchHistory _q_sql:"+_q_sql);
qry.SelectSQL();
if(qry.eof)
{
  var nrec=CRM.CreateRecord("SearchHistory");
  nrec("sear_userid")=userid;
  nrec("sear_entityname")=EntityName;
  nrec("sear_entityid")=ID;
  nrec("sear_title")=getTitleText(ID);
  nrec.SaveChanges();
}
					
Response.Write("success");

%>