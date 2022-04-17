*** Settings ***
Documentation     RPA Challenge using workitems when a row is added in google sheet
Library  RPA.Browser
Library  RPA.Robocorp.WorkItems


*** Keywords ***
Open RPA Challenge Website
    Set Selenium Timeout  30 seconds
    Open Available Browser  https://www.rpachallenge.com/
    Maximize Browser Window
    Wait Until Page Contains Element  //button[text()="Start"]
    Sleep  30 seconds    
    Log  website is loaded properly

*** Keywords ***
Extracting Entering data
    ${payload}=  Get Work Item Payload
    ${status}=  Run Keyword And Return Status  Types data in Website  ${payload}
    IF  ${status}
    Log  workitem is processed successfully.
    Release Input Work Item    DONE
    ELSE     
    Log  Workitem failed due to some reason for data 
     Release Input Work Item
        ...    state=FAILED
        ...    exception_type=BUSINESS
        ...    message=Order processing failed for: ${payload}[Email]
    END



    
Types data in Website
    [Arguments]  ${payload}
    Input Text  //input[@ng-reflect-name="labelFirstName"]  ${payload}[First Name]
    Input Text  //input[@ng-reflect-name="labelLastName"]  ${payload}[Last Name]
    Input Text  //input[@ng-reflect-name="labelCompanyName"]  ${payload}[Company Name]
    Input Text  //input[@ng-reflect-name="labelRole"]  ${payload}[Role in Company]
    Input Text  //input[@ng-reflect-name="labelAddress"]  ${payload}[Address]
    Input Text  //input[@ng-reflect-name="labelEmail"]  ${payload}[Email]
    Input Text  //input[@ng-reflect-name="labelPhone"]  ${payload}[Phone Number]
    Sleep  30 seconds
    Screenshot  //div[@class="row parent"]  ${OUTPUT_DIR}${/}data_entry.png
    Click Element  //input[@value="Submit"]
    Log  Data is entered and submitted into website.



*** Tasks ***
RPA Challenge Tasks
    Open RPA Challenge Website
    For Each Input Work Item  Extracting Entering data
    Close Browser
    Log  Browser closed successfully.


    
