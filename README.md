Deployed Link: https://student-pad.herokuapp.com/
Github Repo: https://github.com/Callum-Ilett/StudentPad

# School of Media Arts and Technology

BSc (Hons) Digital Design & Web Development

Academic Year 2020-2021

Callum Ilett

Assignment 2

Contempoary Web Application

Tutor: Joe Appleton

## Introduction

As a student, I found it hard to find accomodaation. I have created a web application which helps students pick the best houses to rent. This can be done by looking at reviews, detailed descriptions or even messaging the seller/letter with a built in messaging app.

## Methodology

The overall methodology that was used for this project was DT(Design Thinking) but the development methodology was different. I used the AGILE methodology to aid in the development phase.

The methodology foucses on recving feedback from other users and improving the product. Since testing is integrated throughout the devlopment phase, I am able to perform regular check ups and find areas of improvement on an ongoing basis.
![test](https://miro.medium.com/max/1024/0*jlUybkZYz6yxWtdk.jpg)

I decided to use the AGILE methodology because it gives the user the best experience when using the website. For the reason that i it has been tested by other similar uses. Although the methodology is team-based, I have adapted it to use in solo development.

## Main Leagal Concerns(RightMove.co.uk)

When searching for properties, React instead of using a custom API uses a third party one. Upon looking online for API's on rapid Api I come accross the API URL for RightMove. Although not ideal, it had to be done other wise it would take a lot of time and effort to build the database and have valid data. Furthermore, by using the prebuilt API it gives me access to the latitude,longitude/Geo JSON data for any property.

Since, it's querying an external API I looked at RightMove([Terms of Use Policy](https://www.rightmove.co.uk/this-site/terms-of-use.html)).In the policy, it states the use of a scracper is forbidden but querying the data is allowed. Although it's allowed, the data is not to be used on a production ready build. Also the images are proboably also copyrighted, so would have to obtain permission to use the images.

## Firebase vs Server

I have created my own server using Express and MongoDb. Although it takes more time to develop, It greatly helps me understand how everything is working behind the scenes e.g authentication using JWT tokens. Unlike Firebase which does everything for you.

I could have reduced the amount of time when creating the project by using firebase and using the hosting, firestore, authentication and real-time database services.However , I have used other alternatives.

- Converted MongoDB to real time by using Pusher.js
- Hosted front-end and back-end on heroku
- Authentication using Passport.js and JWT tokens

## Conclusions / Results

The project went very well, I was able to create a full front and backend for the website. The website used the MERN(MongoDB, Exprees, React and Node) stack to accomplish this.

Although the website doesn't look like the design because all of the testing and changes to UX, most if not all features exist.

### Main Features

- Authentication using passportJS(Local and Google)
- A centralised state management using reducers and context API
- A fully working real-time messaging system using (Pusher.js)
- Ability to add favourites and create reviews
- View image, location or street view for a property
- Able to print web page using web share API

### Features which were not included

The main features are all there except for a couple, this is because they were too hard to add, could not work or required payment to a service.

- Not able to view all properties on a map
- On clicking share, does not open intended browser share API
