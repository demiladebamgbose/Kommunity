[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/jolaadeadewale765?utm_source=github&utm_medium=button&utm_term=jolaadeadewale765&utm_campaign=github)


# Kommunity

Kommunity is a React native application, which helps users share, comment and like picture, send messages to each other. It deletes the images after a certain period of time.
Development
-----------
This application is created using [**Expo**](https://expo.io/). It uses [**Redux**](https://redux.js.org/) for state management and [**Redux Thunk**](https://github.com/reduxjs/redux-thunk) to manage asynchronous activity. It connects to a node js service which stores user's messages on [**Mongo db**](https://www.mongodb.com/),
while the pictures are stored and processed in the cloud using [**cloudinary**](https://cloudinary.com/). It incorporates [**gifted chat messenger**](https://github.com/FaridSafi/react-native-gifted-chat) UI and sends messages via [**Pusher**](https://pusher.com/).


Installation.
-------------
1. You need to have Expo Installed. Get their development tools from [**Expo tools**](https://docs.expo.io/versions/latest/workflow/up-and-running)
2. Clone this repo or download the zipped file.
3. Navigate to the master branch.

4. configure your environment in app.json at the root directory
    ```
     {
       "expo": {
         "name": "Kommunity",
         "sdkVersion": "21.0.0",
         "privacy": "public",
         "version": "1.0.0",
         "orientation": "portrait" || "landscape",
         "loading": {
           "icon": "./src/logo.png",
           "hideExponentText": true
         },
         "icon": "./src/logo.png",
         "facebookScheme" : "Your facebook Scheme",
         "infoPlist": {
           "facebookScheme":  "Your facebook Scheme",
           "preset": "cloudinary preset",
           "cloudinaryUrl": "your cloudinary url",
           "url": "https://kommunity-2-2-2.herokuapp.com/",
           "pusherId": "Your pusher Id"
         },
         "ios": {
           "bundleIdentifier": "Your bundle Identidier"
         },
         "android": {
           "package": "Your android package"
         }
       }
     }

5. Run
    ```
    npm install or yarn

    ```
    This will install the required dependencies.

6. Run
    ```
    npm test

    ```
  to run the tests.

7. Run
    ```
    npm start

    ```


Open The IOS device on Expo XDE

![alt text](http://res.cloudinary.com/dd58mfinr/image/upload/v1528203144/Screen_Shot_2018-06-05_at_1.48.20_PM_y4ncai.png)

![alt text](http://res.cloudinary.com/dd58mfinr/image/upload/v1528203137/Screen_Shot_2018-06-05_at_1.48.53_PM_arvn6d.png)

![alt text](http://res.cloudinary.com/dd58mfinr/image/upload/v1528203130/Screen_Shot_2018-06-05_at_1.49.59_PM_owij1b.png)

8. Well...enjoy.

## Code snapshots

User Dashboard/ Landing page

![alt text](http://res.cloudinary.com/dd58mfinr/image/upload/c_scale,w_329/v1528171411/Screen_Shot_2018-05-12_at_9.31.18_PM_zjqxjl.png)

A View Post

![alt text](http://res.cloudinary.com/dd58mfinr/image/upload/c_scale,w_329/v1528171431/Screen_Shot_2018-05-12_at_9.32.45_PM_f3wcdx.png)

User Chat

![alt text](http://res.cloudinary.com/dd58mfinr/image/upload/c_scale,w_329/v1528171420/Screen_Shot_2018-05-12_at_9.32.18_PM_jacvpg.png)


Testing.
--------
This application has been tested using [**Mocha**](https://mochajs.org), which is a feature-rich JavaScript test framework running on Node.js and the browser, making asynchronous testing simple and fun.

Thank You.

#### Adewale Jolaade |

