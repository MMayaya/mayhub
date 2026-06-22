MAY LEARNING HUB AUTHENTICATION UPDATE

What this update does
- Redirects signed-out visitors who paste any Activities page link to signin.html.
- Returns users to the requested activity after a successful sign-in.
- Locks the feedback form until Firebase confirms a registered, signed-in user.
- Saves each feedback submission to Firestore under the authenticated account before sending the Formspree email notification.
- Adds Firestore rules that permit feedback creation only when the submitted user ID and email match Firebase Authentication.

Applying the update
1. Merge the contents of this folder into the root of the MayHub project, preserving the folders.
2. Publish the website changes.
3. Deploy firestore.rules to the maylearninghub Firebase project.

Important hosting limitation
The activity-page redirect fixes the pasted-link behavior. The activity files are still static files on GitHub Pages, so Firestore rules cannot protect their raw PDF/image URLs. True file-level privacy requires moving those files to authenticated Firebase Storage or serving them through a backend that verifies Firebase ID tokens.