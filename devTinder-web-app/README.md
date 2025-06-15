
---------------------------------------------------------------------------------------------------------------------------------
-Steps:
created a vite + react application
npm create vite@latest my-vue-app -- --template react
remove unecessary code and create a hello world

-setup tailwind css with react 
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

-setup deaisyUI for components 
npm i -D daisyui@latest
add the plugin in talwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};

-Add NavBar Componenet to App.jsx
-install react-router-dom
npm install react-router-dom
basename="/" -> all routing will work relative to this / (its root)

-Create BrowseRouter and make use of Outlet (for child path)
-Body -> NavBar
        / - feed
        /login - login page
        /connection - show all connections
        /profile - show my profile

-Create a login page and make use of cors 
-install npm install cors ( on backend and do the setup)
make the required changes on frontend and backend withcreds : true at frontend and passing the optional which consist of ip and creds : true in backend 

-Install Redux-toolkit 
configureStore is the first step (creates a Redux store, and also automatically configure the Redux DevTools extension)
create slice and export  the actions and reducer
then slice to appStore
Login and check if data is coming in the store 
Navbar should update as soon as User logs in 
Build Logout 
