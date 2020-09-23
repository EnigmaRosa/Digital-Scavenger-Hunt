# Digital-Scavenger-Hunt
A short Google script to check answers and send out link to next step for a digital scavenger hunt.

## How does a digital scavenger hunt work?
Instead of a physical scavenger hunt, where clues are hidden within a given area and each clue leads to the next, a digital scavenger hunt has clues hidden in an online environment or has questions requiring the participants to use digital resources. In the case where the clues are being hidden in an online environment, using an intranet or Google site is a good way to have control over clue location and accessibility. However, if you'd like participants to use resources outside of those available internally, you can turn each clue into a question, and the participant can only move onto the next question if they get the first one correct.

## What's needed for a digital scavenger hunt?
- Questions (and the matching answers)
- Platform to host the questions
- Method to check the answers
- Method to send participant to next step

### Questions & Answers
Keeping a spreedsheet with each question and their answer(s) is very helpful and allows you to easily reference information later on.

### Platform
Google Forms is a free solution and is especially useful if you want to limit access to only your organization (if you are a GSuite shop). I made a separate Form for each question to give the scavenger hunt more of a multi-step activity than a quiz. Additionally, Forms allows you to turn off submissions, so you can set up the question but choose not to accept answers until a later time.

### Answer Checking
Forms does have built-in answer checking, but there is unfortunately no current setting to make answers case sensitive and I found that, while it does support regex, it is rather limited.

### Sending Next Step
It would be great if Forms allowed you to show a different post-submission message depending on the answer. Since that isn't the case, next steps were sent over email.

## Using Google Apps Script
Google Apps Script (GAS) is a very useful tool for adding functionality to Google Apps such as Docs, Calendar, Forms, Sheets, etc. Using a JavaScript platform, it is easy to develop custom add-ons to extend the capabilities already available in the applications. 

Because Forms couldn't do exactly what I wanted for answer checking and sending the user a message based on the submission, I used GAS to make Forms do that!

### GAS for Forms
When using a Script to add functionality based on the answer to a Form, the Script is created not for the Form, but rather for its accompanying Sheet. Each Form stores submissions in a Sheet, which can be accessed by selecting the "Responses" tab in the Forms editor and then selecting the little Sheets icon on the top right corner of the Responses section. To access the scripting tool once in the Sheet, Tools→Script editor.

#### Trigger on Form Submit
Triggers (which can be accessed by selecting the clock icon in the Scripts toolbar) are set to define when the script should run. In this case, we set the Trigger for when the form is submitted.

#### Ingesting Answers
In declaring the function, make sure to include an argument in the parameter for the submitted answer. In this example, I use `e`. `e` is then treated as an array, as a single submission always contains at least a few values. In this case, we have the timestamp, the email address of the participant, and their submitted answer, so each variable is defined as a value within the array. For example, the variable for the timestamp is defined `var timestamp = e.values[0]`. 

**Note:** When attempting to run the script, I would receive the following error: `TypeError: Cannot read property 'values' of undefined`. However, the script still successfully ran despite this error, so don't be alarmed if this occurs.

### Checking Answers
GAS supports RegExp, so all answers are tested against the expression set as the correct answer.

Depending on the nature of the question, the expression may look for one of several keywords, a number of keywords in a certain order, or a number. This part is where keeping a spreadsheet of all questions and their answers comes in handy, especially because a question may have several viable answers. I definitely recommend setting the test to be case insensitive.

### Sending Next Step
Using GAS's MailApp class (see more [here](https://developers.google.com/apps-script/reference/mail/mail-app)), we can send an email to each participant after they make a submission. Defining the subject and message for cases where the answer is correct and the answer is incorrect then allows us to set the email's subject and message with a few conditionals.
