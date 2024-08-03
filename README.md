## Password Reset Flow
*created using node js*

*Postman API Documentation* : https://documenter.getpostman.com/view/36133215/2sA3rwLtYF      
   
*Create Password Reset Link* : https://node-password-reset-tjd6.onrender.com/pwdreset   

*Password Reset* : https://node-password-reset-tjd6.onrender.com/password-reset/:userId/:tokenStr    

***Functionality:***
&emsp;a. *mongoose* - to connect with MongoDB, DB Model creation and the schema connectivity to fetch the Collections. 
&emsp;b. *express* - to create express server.     
&emsp;c. *morgan* - to enable logger.   
&emsp;d. *cors* - middleware to enable cross-origin requests from difference domain.   
&emsp;e. *dotenv* - to create Environment Variables.   
&emsp;f. *nodemailer* - to send external emails from Nodejs.   
&emsp;g. *router* - express router to handle the routes.   
&emsp;h. *crypto* - it is used to generate random strig for Token generation.   
&emsp;i. *joi* - it is used to validate the DB Schema and its corresponding fields.   

***Author : Tharani K***