---
layout: module
title: Module 12&#58; Batch and Schedule
---
In this module, you create and execute a batch process to send reminder emails to the conference speakers.

## Step 1: Create the Batch Class

1. In the Developer Console, select **File** > **New** > **Apex Class**, specify **SendReminderEmail** as the class name and click **OK**

1. Make the class **global**, implement the **Batchable** interface, and define the three methods of the interface:

    ```
    global class SendReminderEmail implements Database.Batchable<sObject> {

        global Database.QueryLocator start(Database.BatchableContext bc) {

        }

        global void execute(Database.BatchableContext bc, List<Speaker__c> scope) {

        }

        global void finish(Database.BatchableContext bc) {

        }

    }
    ```

1. Declare three instance variables to store the query, the email subject, and the email body:

  ```
  global String query;
  global String subject;
  global String body;
  ```

1. Define a **constructor** implemented as follows:

    ```
    global SendReminderEmail(String query, String subject, String body) {
        this.query = query;
        this.subject = subject;
        this.body = body;
    }
    ```

1. Implement the **start()** method as follows:

    ```
    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator(query);
    }
    ```

1. Implement the **execute()** method as follows:

    ```
    global void execute(Database.BatchableContext bc, List<Speaker__c> scope) {
        for (Speaker__c speaker : scope) {
            EmailManager.sendMail(speaker.Email__c, this.subject, this.body);
        }
    }
    ```

1. Save the file.


## Step 2: Run the Batch

1. Make sure you have assigned your own email address to one of the speakers

1. In the Developer Console, click **Debug** > **Open Execute Anonymous Window**

1. Type the following Apex code:

    ```
    String q = 'SELECT First_Name__c, Last_Name__c, Email__c FROM Speaker__c WHERE Email__c != null';
    SendReminderEmail batch = new SendReminderEmail(q, 'Final Reminder', 'The conference starts next Monday');
    Database.executeBatch(batch);
    ```

1. Click **Execute**

1. Check your email


<div class="row" style="margin-top:40px;">
<div class="col-sm-12">
<a href="Testing.html" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i> Previous</a>
</div>
</div>
