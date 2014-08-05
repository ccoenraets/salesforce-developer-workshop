---
layout: module
title: Module 5&#58; Accessing Data using SOQL and DML
---
SOQL is the Salesforce Object Query Language. It is similar to SQL. You use SOQL to retrieve data in Salesforce.
You use the Salesforce Data Manipulation Language (DML) to insert, update and delete data. In this module, you use the Developer Console to familiarize yourself with SOQL
and DML. In the next modules, you'll use SOQL and DML statements in Apex classes and triggers.

## Step 1: Execute SOQL statements

1. In the Developer Console, click the **Query Editor** tab at the bottom of the window

    ![](images/queryeditor.jpg)

1. Enter the following SOQL statement and click the **Execute** button to retrieve conference sessions:

    ```
    SELECT Id, Name, Session_Date__c, Level__c FROM Session__c
    ```

1. Execute the following statement to retrieve the beginner sessions (assuming you created any):  

    ```
    SELECT Id, Name, Session_Date__c, Level__c FROM Session__c
        WHERE Level__c = 'Beginner'
    ```

1. Execute the following statement to retrieve a list of speakers ordered by first name and last name:

    ```
    SELECT Id, First_Name__c, Last_Name__c, Email__c FROM Speaker__c
        ORDER BY First_Name__c, Last_Name__c
    ```

1. Execute the following statement to retrieve a list of sessions assigned to speakers with related session and speaker information:

    ```
    SELECT Session__r.Name,
           Session__r.Session_Date__c,
           Speaker__r.First_Name__c,
           Speaker__r.Last_Name__c
        FROM Session_Speaker__c
        ORDER BY Session__r.Session_Date__c, Session__r.Name
    ```


## Step 2: Execute DML Statements


1. In the Developer Console, click **Debug** > **Open Execute Anonymous Window** and execute the following statements to create a session:

    ```
    Session__c session=new Session__c(Name='Advanced Apex', Level__c='Advanced');
    insert session;
    ```

    You can execute a SOQL statement in the Query Editor as described in step 1 to make sure the session was created.


2. Execute the following statements to update a session:

    ```
    Session__c session = [SELECT Id FROM Session__c WHERE NAME='Advanced Apex'];
    session.Level__c = 'Intermediate';
    update session;
    ```

    Again, you can execute a SOQL statement in the Query Editor to make sure the session was updated as expected.


## Additional Resources

- [SOQL and SOSL Reference](http://www.salesforce.com/us/developer/docs/soql_sosl/index_Left.htm)


<div class="row" style="margin-top:40px;">
<div class="col-sm-12">
<a href="Creating-an-Apex-Class.html" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i> Previous</a>
<a href="Creating-Triggers.html" class="btn btn-default pull-right">Next <i class="glyphicon glyphicon-chevron-right"></i></a>
</div>
</div>
