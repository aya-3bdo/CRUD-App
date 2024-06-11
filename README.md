# CRUD App

This is a simple CRUD (Create, Read, Update, Delete) application, built using JavaScript, HTML and CSS. The app allows users to manage a list of items, which are stored in the browser's localStorage.

## Demo

 - You can access the deployed version of the app on Netlify: [CRUD App]() deployment.

## Features:

  -  **Create:** Users can add new items to the table, including its brand, model, category, Price, Tax and Discount and item's count,
    with a feature that you can add new brands and categories manually by chosing `+another brand/ +another category option` from select list
     if any of them isn't available in the options.
  -  **Read:** Users can view the list of items with all their data, including the total price after calculating the tax and discount if existed.
  -  **Update:** Users can edit the details of an existing item directly or even through searching for them using the searching section
       and update them.
  -  **Delete:** Users can remove items from the list directly or even through searching for them using the searching section and delete them.
  -  **Responsivness:** Responsive design for many different screens.
  -  **Ligt & Dark mode:** You can switch between your prefered mode.
  -   **Minified Version:** A minified version of the app is available for faster loading times.

## Technologies Used

   - JavaScript: The app is built using JavaScript, with some focus on Js modules and the use of classes.
   - HTML: The user interface is built using HTML.
   - CSS: The app's styling is handled using CSS.
   - localStorage: The app uses the browser's localStorage to store the list of items.

    
## Installation and Usage

 ### Clone the repository:

  ##### Please, pay attention and read the instructions down there if you're gonna clone the "Minified version".
  ***Note that if you tried to open the project using the `crud.html` file, it will not work properly in both versions, you should 
  open it using the live-server.***

1. Clone the regular version: 
  - Copy this command to your terminal:
    - `git clone --branch CRUD-V2.0 https://github.com/aya-3bdo/CRUD-App.git`

2. Clone the Minified version:
  - Copy this command to your terminal:
    - `git clone --branch CRUD-V2.0-minified https://github.com/aya-3bdo/CRUD-App.git`
    - After cloning this branch, make sure to run the command: `npm i` and after that `cd dist`
