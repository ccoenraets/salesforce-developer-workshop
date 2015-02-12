---
layout: module
title: Module 8&#58; Creating a Controller Extension
---
In this module, you enhance the Visualforce page you built in module 7: you create a controller extension that allows users to upload speaker pictures.

![](images/upload.jpg)


## Step 1: Extend the Data Model

In this step, you add two fields to the Speaker object: **Picture_Path** to store the location of the picture on the server, and **Picture**, a Formula field used to display the image in the Visualforce page.

1. In **Setup**, select **Build** > **Create** > **Objects**, and click the **Speaker** link

1. In the **Custom Fields & Relationships** section, click **New**, and create a **Picture_Path** field defined as follows:
  - Data Type: **Text**
  - Field Label: **Picture Path**
  - Length: **255**
  - Field Name: **Picture_Path**

    Click **Next**, **Next**, **Save & New**

1. Create a **Picture** field defined as follows:
  - Data Type: **Formula**
  - Field Label: **Picture**
  - Field Name: **Picture**
  - Formula Return Type: **Text**
  - Formula: **IMAGE(Picture&#95;Path__c, '')**

        > Make sure you use <strong>two single quotes</strong> and NOT a double quote.

    Click **Next**, **Next**, **Save**


## Step 2: Create a Controller Extension

1. In the Developer Console, select **File** > **New** > **Apex Class**, specify **SpeakerControllerExtension** as the class name and click **OK**

1. Implement the class as follows:

    ```
    public class SpeakerControllerExtension {

        public blob picture { get; set; }
        public String errorMessage { get; set; }

        private final Speaker__c speaker;
        private ApexPages.StandardController stdController;

        public SpeakerControllerExtension(ApexPages.StandardController stdController) {
            this.speaker = (Speaker__c)stdController.getRecord();
            this.stdController = stdController;
        }

        public PageReference save() {
            errorMessage = '';
            try {
                upsert speaker;
                if (picture != null) {
                    Attachment attachment = new Attachment();
                    attachment.body = picture;
                    attachment.name = 'speaker_' + speaker.id + '.jpg';
                    attachment.parentid = speaker.id;
                    attachment.ContentType = 'application/jpg';
                    insert attachment;
                    speaker.Picture_Path__c = '/servlet/servlet.FileDownload?file='
                                              + attachment.id;
                    update speaker;
                }
                return new ApexPages.StandardController(speaker).view();
            } catch(System.Exception ex) {
                errorMessage = ex.getMessage();
                return null;
            }
        }
    }
    ```

    > The **save()** method overrides the standard controller's default behavior.


1. Save the file


## Step 3: Modify the Visualforce page

1. In the Developer Console, open the SpeakerForm page, and add the controller extension to the page definition:

    ```
    <apex:page standardController="Speaker__c" extensions="SpeakerControllerExtension">
    ```

1. Add an inputFile (right after the Email inputField):

    ```
    <apex:inputFile value="{!picture}" accept="image/*" />
    ```

    > Make sure you use an **inputFile** and not an **inputField**

1. Display the potential errorMessage right after &lt;/apex:pageBlock>

    ```
    {!errorMessage}
    ```

1. Save the file

## Step 4: Test the Application

1. Click the Speakers tab

1. Click **New** to add a speaker

1. Enter the speaker first name, last name and email

1. Click the **Choose File** button and select a jpg file on your file system

1. Click the **Save** button: you should see the image on the speaker's details page

<div class="row" style="margin-top:40px;">
<div class="col-sm-12">
<a href="Creating-a-Visualforce-Page.html" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i> Previous</a>
<a href="Using-JavaScript-in-Visualforce-Pages.html" class="btn btn-default pull-right">Next <i class="glyphicon glyphicon-chevron-right"></i></a>
</div>
</div>
