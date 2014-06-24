---
layout: module
title: Module 7&#58; Creating a Visualforce Page
---
In this module, you create a Visualforce page to provide a custom user interface for creating and editing speakers.

### Step 1: Create the SpeakerForm Visualforce Page

1. In the **Developer Console**, select **File** > **New** > **Visualforce Page**, specify **SpeakerForm** as the page name and click **OK**

1. Implement SpeakerForm as follows:

  ```
  <apex:page standardController="Speaker__c">
    <apex:form >
        <apex:pageBlock title="Edit Speaker">
            <apex:pageBlockSection columns="1">
                <apex:inputField value="{!Speaker__c.First_Name__c}"/>
                <apex:inputField value="{!Speaker__c.Last_Name__c}"/>
                <apex:inputField value="{!Speaker__c.Email__c}"/>
            </apex:pageBlockSection>
            <apex:pageBlockButtons >
                <apex:commandButton action="{!save}" value="Save"/>
            </apex:pageBlockButtons>
        </apex:pageBlock>
    </apex:form>
  </apex:page>
  ```

1. Save the file

1. Test the Visualforce page. There are several ways you can test your Visualforce page. For example, you can:
  - Click the **Preview** button in the file editor for SpeakerForm in the developer console
  - Directly access the Visualforce page by appending **/apex/SpeakerForm** to your instance's domain name in the browser. For example, access: [https://na17.salesforce.com/apex/SpeakerForm](https://na17.salesforce.com/apex/SpeakerForm) (make sure you use your own Salesforce domain name)


### Step 2: Set SpeakerForm as the Default Form

In this step, you set the SpeakerForm page as the default form for creating and editing speakers:

1. In **Setup**, select **Build** > **Create** > **Objects** and click the **Speaker** link

1. Scroll down to the **Buttons, Links, and Actions** section, and click **Edit** next to **New**

1. Check Override With Visualforce Page, and select **SpeakerForm**

1. Click **Save**

1. In the **Buttons, Links, and Actions** section, click **Edit** next to **Edit**

1. Check Override With Visualforce Page, and select **SpeakerForm**

1. Click **Save**

### Step 3: Test the Application

1. Click the Speakers Tab

2. Select a speaker and click Edit: you are now editing the speaker information using your Visualforce page

3. Modify some data, and click Save

> At this stage, the Visualforce page doesn't provide any additional capability compared to the default speaker form. In
the next module, you will enhance SpeakerForm to support the upload of the speaker picture.



<div class="row" style="margin-top:40px;">
<div class="col-sm-12">
<a href="Creating-Triggers.html" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i> Previous</a>
<a href="Creating-a-Controller-Extension.html" class="btn btn-default pull-right">Next <i class="glyphicon glyphicon-chevron-right"></i></a>
</div>
</div>
