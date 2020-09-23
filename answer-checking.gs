function onFormSubmit(e) {


  var timestamp = e.values[0];
  var emailAddress = e.values[1];
  var answer = e.values[2];
  
  // parsing timestamp
  var dstamp = new Date(timestamp);
  var month = dstamp.getMonth() + 1; // month starts at 0, need to adjust
  var day = dstamp.getDate();
    
  // has the next step been released
  var nextAvailable = "false";
  if (day > 1)
  {
    nextAvailable = "true";
  }
  
  // get first and last name from email address
  var firstEnd = emailAddress.indexOf("."); // returns position of period in email address
  var lastStart = firstEnd + 1;
  var lastEnd = emailAddress.indexOf("@"); // returns position of strudel in email address
  var firstName = emailAddress.substring(0, firstEnd); // returns first name in lowercase
  var lastName = emailAddress.substring(lastStart, lastEnd); // returns last name in lowercase
  var firstNameCap = firstName.charAt(0).toUpperCase() + firstName.slice(1); // returns first name with first letter capitalized
  var lastNameCap = lastName.charAt(0).toUpperCase() + lastName.slice(1); //returns last name with first letter capitalized
  
  var correct_nextAvailable_subject = "Congrats! On to step 2...";
  var correct_notAvailable_subject = "Congrats! Tomorrow is step 2!";
  var incorrect_subject = "Oops. Let's try step 1 again!";
  
  var firstStep = "[link for current step]";
  var nextStep = "[link for next step]";
  
  var correct_nextAvailable_message = "Hi " + firstNameCap + '!<br />' + '<br />' + "You successfully completed the first step of the Digital Scavenger Hunt!" + '<br />' + '<br />' + "Step 2 is already available at " + '<a href=' +  nextStep + '>[link for next step]</a>' + '<br />' + '<br />' + "Good Luck!";
  var correct_notAvailable_message = "Hi " + firstNameCap + '!<br />' + '<br />' + "You successfully completed the first step of the Digital Scavenger Hunt!" + '<br />' + '<br />' + "Go to " + '<a href=' +  nextStep + '>[link for next step]</a>' + " tomorrow to find step 2!" + '<br />' + '<br />' + "Good Luck!";
  var incorrect_message = "Hi " + firstNameCap + '!<br />' + '<br />' + "Unfortunately, you did not provide the correct answer to the first step of the Digital Scavenger Hunt." + '<br />' + '<br />' + "Go to " + '<a href =' + firstStep + '>[link for current step]</a>' + " to try again!" + '<br />' + '<br />' + "Good Luck!";
 
  var subject = '';
  var message = '';
  
    
  var correctAnswer = /^(?=.*\bcreating\b)(?=.*\ba\b)(?=.*\bcyber\b)(?=.*\bsecure\b)(?=.*\bhome\b)(?=.*\brandy\b)(?=.*\bmarchany\b).*$/gi; // regex for the current answer
  var answerStatus = correctAnswer.test(answer); // checks submitted answer against regex
  
  if (answerStatus == true)
   {
     if (nextAvailable == true)
     {
       subject = correct_nextAvailable_subject;
       message = correct_nextAvailable_message;
     }
     
     else
     {
       subject = correct_notAvailable_subject;
       message = correct_notAvailable_message;
     }
   }
   
 else
  {
    subject = incorrect_subject;
    message = incorrect_message;
  }
  
  var htmlBody = message;
  
  var email = {
    to: emailAddress,
    subject: subject,
    htmlBody: htmlBody,
    name: "Digital Scavenger Hunt"
  };
  
  MailApp.sendEmail(email);

}