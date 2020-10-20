# commenting_system
Commenting system like Hacker News using socket

it will install and configure the following:

* Mongo
* Node
* EJS
* Express

## Prerequisities
  To install Mongo DB use https://docs.mongodb.com/manual/administration/install-community/ 
  
  Start your Mongo server , Run below command to start the Mongo server:
   net start mongod
### Create database and collections
  ```shell
  use commenting_system
  
  db.createCollection("posts")
  db.createCollection("comments")
  db.createCollection("users")
  ```
  
## Running the installer

  ### install all the required package
  - Using npm

     $ npm install
  ```
  ### Run project using below command
     $ node app.js
  ```
