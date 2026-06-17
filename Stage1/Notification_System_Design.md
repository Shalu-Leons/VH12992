Stage 1

Priority Logic

Notification priority is based on type and time.

Weights used:

->Placement = 3
->Result = 2
->Event = 1

Notifications are sorted by priority weight first and then by latest timestamp.

The top 10 notifications are displayed to the user.

Logging

A reusable logging function is created in `logger.js`.

It is used for:

->API request start
->Successful response
->Error handling

Files Used

->logger.js
->notificationPriority.js

Output

The application fetches notifications from the API, calculates priority, and displays the top 10 important notifications.