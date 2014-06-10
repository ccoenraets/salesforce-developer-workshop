---
layout: module
title: Module 11&#58; Testing
---
In this module, you write tests for the RejectDoubleBooking trigger you created in module 6.

### Step 1: Create a Test Class

1. In the Developer Console, select **File** > **New** > **Apex Class**, specify **TestRejectDoubleBooking** as the class name and click **OK**

1. Make the class **private**, and add the **@isTest** class annotation:

    ```
    @isTest
    private class TestRejectDoubleBooking{
    
    }
    ```

### Step 2: Add a Test Method to Test Single Bookings

1. Add a **TestSingleBooking()** method to make sure the trigger does not prevent a valid speaker booking:

    ```
    static testmethod void TestSingleBooking() {
        Datetime now = System.now();
        
        Speaker__c speaker = new Speaker__c(First_Name__c='John', Last_Name__c='Smith');
        insert speaker;
        
        Session__c session = new Session__c(Name='Some Session', Session_Date__c=now);
        insert session;
        
        Session_Speaker__c assignment = 
            new Session_Speaker__c(Session__c=session.Id, Speaker__c=speaker.Id);
        Test.startTest();
        Database.SaveResult result = Database.insert(assignment, false);
        Test.stopTest();
        
        System.assert(result.isSuccess());
    }
    ```

1. Save the file

1. Click **Run Test** in the upper right corner of the code editor

1. Click the **Tests** tab at the bottom of the code editor, and examine the test results.

    ![](images/test1.jpg)


### Step 3: Add a Test Method to Test Double Bookings

1. Add a **TestDoubleBooking()** method to make sure trigger actually rejects double bookings:

    ```
    static testmethod void TestDoubleBooking() {
        Datetime now = System.now();
        
        Speaker__c speaker = new Speaker__c(First_Name__c='John', Last_Name__c='Smith');
        insert speaker;
        
        Session__c session1 = new Session__c(Name='Session 1', Session_Date__c=now);
        insert session1;
        Session__c session2 = new Session__c(Name='Session 2', Session_Date__c=now);
        insert session2;
        
        Session_Speaker__c assignment1 = 
            new Session_Speaker__c(Session__c=session1.Id, Speaker__c=speaker.Id);
        insert assignment1;
        
        Session_Speaker__c assignment2 = 
            new Session_Speaker__c(Session__c=session2.Id, Speaker__c=speaker.Id);
        Test.startTest();
        Database.SaveResult result = Database.insert(assignment2, false);
        Test.stopTest();
        
        System.assert(!result.isSuccess());
    }
    ```

1. Save the file  

1. Click **Run Test** in the upper right corner of the code editor

1. Click the **Tests** tab at the bottom of the code editor, and examine the test results.

    ![](images/test2.jpg)
