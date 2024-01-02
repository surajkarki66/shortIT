# shortIT

A full stack web application written in TypeScript with a Node/Express Server along with React & MongoDB database (MERN). Users are able to paste long URL's into the form provided and are able to input a custom URL if they want to!. You are then provided with an easy to use, customizable short URL you can share with whoever you like.

If users registered in our site. They can also get more information about their short URL, including: when the URL was created, when it was last accessed and how many times it has been clicked.

![screenshot_20210502_202404](https://user-images.githubusercontent.com/50628520/116817195-ef138a00-ab84-11eb-888c-32bee1343665.png)

## Live Preview
[Click Here](https://shortit-zme7.onrender.com/)

## Local Preview
Clone this repository
```bash
   git clone https://github.com/surajkarki66/shortIT
```

### a. Backend
1. Make sure you have Node.js installed on your local machine.
2. Install `yarn` using npm.
   ```bash
   npm install -g yarn
   ```
3. Install dependencies required by the backend server.
   ```bash
   yarn install
   ```
4. Create a `.env` file in a project's root directory and set all the environment variables based on the provided `.env.sample` example.
   
5. Run the development server
   ```bash
   yarn run dev
   ```
6. Backend server is up and running on http://localhost:5000/

### b. Frontend
1. After running the backend server, you only need to run the frontend.
2. Open up a new terminal window, and change the directory to `client` folder.
   ```bash
   cd client
   ```
3. Install dependencies required by the frontend app.
   ```bash
   yarn install
   ```
4. Inside `src` directory there is a file with a name `config.ts`. Go inside that file and replace the second line of code with the code provided below.
    ```js
   export const baseURL = "http://localhost:5000"
   ```

5. Run the development server
   ```bash
   yarn start
   ```
6. Preview: http://localhost:3000
   
Happy Coding !!
