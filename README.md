# Shiparoo

<img src="https://github.com/justinsuen/shiparoo-ios/blob/master/docs/form.png" width="300">
<img src="https://github.com/justinsuen/shiparoo-ios/blob/master/docs/show.png" width="300">

## Background

It's always tough waiting for a package. It's even tougher not knowing when it will arrive. With Shiparoo-iOS, this mobile app will allow users to check the status of their packages at all times. And by inputting a phone number along with their tracking number, users can easily receive realtime updates on the status of their packages from delivery to arrival. Never lose track of another package again!

Shiparoo-iOS is the mobile version of Shiparoo.

Shiparoo and Shiparoo-iOS are personal projects by Calvin Yau, Daniel Chang, and Justin Suen.

##Major Features
- [x] Users can check the status and history of their packages with a `carrier` name and `tracking number`.
- [x] Users receive an SMS with a PIN upon entering their phone number for verification.
- [x] Users receive SMS updates on their packages until tracked package is delivered.

##Architecture and Technology
###Backend
The backend for this project was built using Ruby on Rails and PostgreSQL.

###Frontend
- React Native
  - Currently only implemented for iOS

- Shippo API
  - Request data passed to Shippo API by POSTing JSON objects with the appropriate key/value-pairs to the corresponding resource.
  - Response data returns JSON object with details on specific package including current status and status history.

- Twilio API
  - PIN factor authentication to verify users and their package.
  - Sends realtime updates every time the status on their package is changed.
  - Updates stop once package has status of `DELIVERED`.

##Future Implementations
- Implement users with Auth0, similar to our Shiparoo web application.
- Allow users to have a history of tracked packages.
- Incorporate Google maps API to allow users to see a visual representation of the route their package has been. Similar to our Shiparoo web application.
