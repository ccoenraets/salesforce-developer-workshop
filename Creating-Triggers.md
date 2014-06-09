---
layout: module
title: Module 6&#58; Creating Triggers
---
In this module, you create a trigger that sends confirmation emails to speakers when they are assigned to a session, and another trigger that rejects double bookings of speakers.

### Step 1: Create a Trigger to Send Confirmation Emails

1. In the Developer Console, click **File** > **New** > **Apex Trigger**

1. Specify **SendConfirmationEmail** as the trigger name, **Session_Speaker__c** as the sObject, and click **Submit**.

1. Implement the trigger as follows:

  ```
  trigger SendConfirmationEmail on Session_Speaker__c (after insert) {

	  for(Session_Speaker__c newItem : trigger.new) {

        Session_Speaker__c sessionSpeaker =
            [SELECT Session__r.Name,
             		Session__r.Session_Date__c,
             		Speaker__r.First_Name__c,
             		Speaker__r.Last_Name__c,
              	 Speaker__r.Email__c
             FROM Session_Speaker__c WHERE Id=:newItem.Id];

        String message = 'Dear ' + sessionSpeaker.Speaker__r.First_Name__c + ',\n' +
            'Your session "' + sessionSpeaker.Session__r.Name +
            ' on ' + sessionSpeaker.Session__r.Session_Date__c + ' is confirmed.\n\n' +
            'Thanks for speaking at the conference!';
        EmailManager.sendMail(sessionSpeaker.Speaker__r.Email__c, 'Speaker Confirmation', message);
    }

  }
  ```

1. Save the file

1. Test the trigger
  - Create a speaker that has your own email address
  - Assign that speaker to a session, and check your email: you should receive a speaker confirmation email


### Step 2: Create a Trigger to Reject Double Bookings

1. In the Developer Console, click **File** > **New** > **Apex Trigger**

1. Specify **RejectDoubleBooking** as the trigger name, **Session_Speaker__c** as the sObject, and click **Submit**.

1. Implement the trigger as follows:

  ```
  trigger RejectDoubleBooking on Session_Speaker__c (before insert, before update) {

      for(Session_Speaker__c sessionSpeaker : trigger.new) {

          Session__c session = [SELECT Id, Session_Date__c FROM Session__c WHERE Id=:sessionSpeaker.Session__c];

          List<Session_Speaker__c> conflicts =
              [SELECT Id FROM Session_Speaker__c
               	WHERE Speaker__c = :sessionSpeaker.Speaker__c
               	AND Session__r.Session_Date__c = :session.Session_Date__c];

          if(!conflicts.isEmpty()){
              sessionSpeaker.addError('The speaker is already assigned to another session at the same time');
          }

      }

  }
  ```

1. Test the trigger
  - Assign a speaker to a session scheduled at a time the speaker is available and make sure it still works
  - Assign a speaker to a session scheduled at the same time as another session the speaker is already assigned to: you should see the error message
