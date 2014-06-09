---
layout: module
title: Module 7&#58; Creating a Visualforce Page
---
In this module, you create a Visualforce page and you set it as the default page to edit and create speakers.

### Step 1: Create the SpeakerForm Visualforce page

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


### Step 2: Set SpeakerForm as the Default Form

In this step, you set the SpeakerForm page as the default form for creating and editing speakers:

1. In **Setup**, select **Build** > **Create** > **Objects** > **Speaker**

1. In the **Buttons, Links, and Actions** section, click **Edit** next to **New**

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
the next module, you will add to SpeakerForm to support the upload of the speaker picture.
