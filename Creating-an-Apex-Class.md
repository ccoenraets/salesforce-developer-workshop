---
layout: module
title: Module 4&#58; Creating an Apex Class
---
In this module, you create an EmailManager class that is used to send confirmation emails to the conference speakers.

### Step 1: Create the EmailManager class

1. In Salesforce, click your name in the upper right corner of the screen. In the dropdown menu, click **Developer Console**.

  ![](https://github.com/ccoenraets/salesforce-developer-workshop/raw/master/images/devconsole.jpg)

1. In the Developer Console, click **File** > **New** > **Apex Class**. Specify **EmailManager** as the class name and click **OK**.

2. Implement the class as follows:

  ```
  public class EmailManager{

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

1. Click **File** > **Save** to save the file.  

### Step 2: Send an Email

1. In the Developer Console, click **Debug** > **Open Execute Anonymous Window**.

2. Type the following Apex code (provide your own email address):

  ```
  String address = 'YOUR_EMAIL_ADDRESS';
  String subject = 'Speaker Confirmation';
  String body = 'Thank you for being a speaker.';
  EmailManager em = new EmailManager();
  em.sendMail(address, subject, body);
  ```

3. Click the **Execute** button

4. Check your email


### Step 3: Using a Static Method

1. In the Developer Console, open the EmailManager class.

1. To turn sendMail() into a static method, change its signature as follows (add the **static** keyword):

  ```
  public static void sendMail(String address, String subject, String body) {
  ```

1. Save the file.

3. Go back to the **Execute Anonymous Window** (**Debug** > **Open Execute Anonymous Window**)

4. Modify the Apex code to invoke sendMail() statically:

  ```
  String address = 'YOUR_EMAIL_ADDRESS';
  String subject = 'Speaker Confirmation!!';
  String body = 'Thank you for being a speaker.';
  EmailManager.sendMail(address, subject, body);
  ```

5. Click **Execute** and check your email.
