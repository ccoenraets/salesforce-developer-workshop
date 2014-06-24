---
layout: module
title: Module 6&#58; Creating Triggers
---
In this module, you create a trigger that sends confirmation emails to speakers when they are assigned to a session.
You create another trigger that rejects double bookings of speakers.

### Step 1: Create a Trigger that Sends Confirmation Emails

In this step, you create a trigger that sends confirmation emails to speakers when they are assigned to a session.

1. In the Developer Console, click **File** > **New** > **Apex Trigger**

1. Specify **SendConfirmationEmail** as the trigger name, **Session&#95;Speaker__c** as the sObject, and click **Submit**

1. Implement the trigger as follows:

    ```
    trigger SendConfirmationEmail on Session_Speaker__c (after insert) {

        for(Session_Speaker__c newItem : trigger.new) {

            // Retrieve session name and time + speaker name and email address
            Session_Speaker__c sessionSpeaker =
                [SELECT Session__r.Name,
                        Session__r.Session_Date__c,
                        Speaker__r.First_Name__c,
                        Speaker__r.Last_Name__c,
                     Speaker__r.Email__c
                 FROM Session_Speaker__c WHERE Id=:newItem.Id];

            // Send confirmation email if we know the speaker's email address
            if (sessionSpeaker.Speaker__r.Email__c != null) {
                String address = sessionSpeaker.Speaker__r.Email__c;
                String subject = 'Speaker Confirmation';
                String message = 'Dear ' + sessionSpeaker.Speaker__r.First_Name__c +
                    ',\nYour session "' + sessionSpeaker.Session__r.Name + '" on ' +
                    sessionSpeaker.Session__r.Session_Date__c + ' is confirmed.\n\n' +
                    'Thanks for speaking at the conference!';
                EmailManager.sendMail(address, subject, message);
            }
        }

    }
    ```

    > In a real-life application, hardcoding the email message is not a recommended approach. Consider using [email templates](https://help.salesforce.com/HTViewHelpDoc?id=admin_emailtemplates.htm&language=en_US) instead.

1. Save the file. The trigger takes effect as soon as you save it.

1. Test the trigger
  - Create a speaker that has your own email address
  - Assign that speaker to a session, and check your email: you should receive a speaker confirmation email

  > Sending a confirmation email when a speaker is assigned to a session (in other words, when a Session&#95;Speaker__c record is created) can be accomplished without writing code by defining a [workflow rule](https://developer.salesforce.com/page/Workflow_Rules). The programmatic approach used in this workshop allows you to satisfy additional requirements. For example, sending a confirmation email "on demand", independently of a record being created or updated.


### Step 2: Create a Trigger that Rejects Double Bookings

1. In the Developer Console, click **File** > **New** > **Apex Trigger**

1. Specify **RejectDoubleBooking** as the trigger name, **Session&#95;Speaker__c** as the sObject, and click **Submit**

1. Implement the trigger as follows:

    ```
    trigger RejectDoubleBooking on Session_Speaker__c (before insert, before update) {

        for(Session_Speaker__c sessionSpeaker : trigger.new) {

            Session__c session = [SELECT Id, Session_Date__c FROM Session__c
                                    WHERE Id=:sessionSpeaker.Session__c];

            List<Session_Speaker__c> conflicts =
                [SELECT Id FROM Session_Speaker__c
                    WHERE Speaker__c = :sessionSpeaker.Speaker__c
                    AND Session__r.Session_Date__c = :session.Session_Date__c];

            if(!conflicts.isEmpty()){
                sessionSpeaker.addError('The speaker is already booked at that time');
            }

        }

    }
    ```

1. Save the file

1. Test the trigger:
  - Assign a speaker to a session scheduled at a time the speaker is available and make sure it still works
  - Assign a speaker to a session scheduled at the same time as another session the speaker is already assigned to: you should see the error message

  ![](images/doublebooking.jpg)

  > RejectDoubleBooking is not sufficient to entirely prevent the double booking of speakers. For example, the user could change the date and time of a session in a way that creates a double booking for a speaker assigned to that session. You could create an additional trigger to take care of that situation.



<div class="row" style="margin-top:40px;">
<div class="col-sm-12">
<a href="Accessing-Data-using-SOQL-and-DML.html" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i> Previous</a>
<a href="Creating-a-Visualforce-Page.html" class="btn btn-default pull-right">Next <i class="glyphicon glyphicon-chevron-right"></i></a>
</div>
</div>
