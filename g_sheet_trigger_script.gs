


function post_request(firstname,lastname,companyname,role_in_company,address,email,phonenumber){
console.log('started the process.........')
//add process id and workspace id , authorization here
var process_id=""
var workspace_id=""
var authorization=""
var url = "https://api.eu1.robocorp.com/process-v1/workspaces/"+workspace_id+"/processes/"+process_id+"/runs";

var data= JSON.stringify({"First Name":firstname,"Last Name":lastname,"Company Name":companyname,"Role in Company":role_in_company,"Address":address,"Email":email,"Phone Number":phonenumber});
var options = {
    "method": "post",
    "headers": {
       "Authorization":authorization,"accept": "application/json","Content-Type": "application/json"
    },
    "payload": data
};
var response = UrlFetchApp.fetch(url, options);
}

function atEdit(e) {
  // Set a comment on the edited cell to indicate when it was changed.
  try{
    var range = e.range;
    var row_no= range.getRow();
    var firstname= SpreadsheetApp.getActiveSheet().getRange("A"+row_no.toString()).getValue();
    var lastname= SpreadsheetApp.getActiveSheet().getRange("B"+row_no.toString()).getValue();
    var companyname= SpreadsheetApp.getActiveSheet().getRange("C"+row_no.toString()).getValue();
    var role_in_company= SpreadsheetApp.getActiveSheet().getRange("D"+row_no.toString()).getValue();
    var address= SpreadsheetApp.getActiveSheet().getRange("E"+row_no.toString()).getValue();
    var email = SpreadsheetApp.getActiveSheet().getRange("F"+row_no.toString()).getValue();
    var phonenumber= SpreadsheetApp.getActiveSheet().getRange("G"+row_no.toString()).getValue();
    post_request(firstname,lastname,companyname,role_in_company,address,email,phonenumber);
  }
  catch(err){
    //add sender details here
    var sender=""
    MailApp.sendEmail({
      to: sender,
      subject: "Error while running app script from google sheet",
      htmlBody:"Hi User, <br>Error occured while running the appscript.Error details are highlighted below <br><br>"+"<b>"+err+"</b> <br><br><br> Thanks,<br><br>Google App script bot.🤖"
    });
  }

  
}