---
layout: module
title: Module 4&#58; Creating an Apex Class
---
Apex is a strongly typed, object-oriented programming language that you use to execute code in your Saleforce instance. The Apex syntax is similar to Java and also includes built-in support for database operations. In this module, you create an EmailManager class that encapsulates the logic to send confirmation emails to the conference speakers.

## Step 1: Create the EmailManager class

1. In Salesforce, click your name in the upper right corner of the screen. In the dropdown menu, click **Developer Console**.

  ![](images/devconsole.jpg)

1. In the Developer Console, click **File** > **New** > **Apex Class**. Specify **EmailManager** as the class name and click **OK**

2. Implement the class as follows:

    ```
    public class EmailManager {

        public void sendMail(String address, String subject, String body) {
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            String[] toAddresses = new String[] {address};
            mail.setToAddresses(toAddresses);
            mail.setSubject(subject);
            mail.setPlainTextBody(body);
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
        }

    }
    ```

1. Click **File** > **Save** to save the file

## Step 2: Send an Email

In this module, you test the EmailManager class by sending an email from the developer console. Later in this workshop, you'll integrate the EmailManager class with other parts of the application to automate the process of sending confirmation emails.

1. In the Developer Console, click **Debug** > **Open Execute Anonymous Window**

2. Type the following Apex code (provide your own email address):

    ```
    String address = 'YOUR_EMAIL_ADDRESS';
    String subject = 'Speaker Confirmation';
    String body = 'Thank you for speaking at the conference.';
    EmailManager em = new EmailManager();
    em.sendMail(address, subject, body);
    ```

3. Click the **Execute** button

4. Check your email: you should have received the confirmation email


## Step 3: Using a Static Method

Since EmailManager is a utility class that doesn't work with instance-specific variables, you can make the sendMail() method static:

1. In the Developer Console, open the EmailManager class

1. To turn sendMail() into a static method, change its signature as follows (add the **static** keyword):

  ```
  public static void sendMail(String address, String subject, String body) {
  ```

1. Save the file

3. Go back to the **Execute Anonymous Window** (**Debug** > **Open Execute Anonymous Window**)

4. Modify the Apex code to invoke sendMail() using a static method call:

  ```
  String address = 'YOUR_EMAIL_ADDRESS';
  String subject = 'Speaker Confirmation';
  String body = 'Thank you for speaking at the conference.';
  EmailManager.sendMail(address, subject, body);
  ```

5. Click **Execute** and check your email


<div class="row" style="margin-top:40px;">
<div class="col-sm-12">
<a href="Creating-the-Application.html" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i> Previous</a>
<a href="Accessing-Data-using-SOQL-and-DML.html" class="btn btn-default pull-right">Next <i class="glyphicon glyphicon-chevron-right"></i></a>
</div>
</div>
