
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
lucide-react(for icons pf eye)


CCS :
css added in feed for card :
The parent div is position: relative.

Each card wrapper inside is position: absolute (via class absolute).

This means every card is positioned on top of the parent container, stacked in the same area, instead of flowing next to each other.

translateY(${index * 5}px): the second card is moved down 5px, third 10px etc. This creates a peek-behind effect.

scale(${1 - index * 0.02}): each subsequent card is slightly smaller, so further cards look like they are behind the top one.

zIndex: totalCards - index: ensures the card at index 0 is on top visually, others behind.



Deploy : 
-Signup on AWS
-Launch inst <secret>.pem" (chmod 400 devTinder-web.pem)
-ssh -i "devTinder-project.pem" ubuntu@ec2-13-60-11-56.eu-north-1.compute.amazonaws.com
//install node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
exist 
start again running ssh 
nvm install version (give the exact version as your  project eg: 20.18.0)
git clone both UI and API 
ls -> will list the both th file
ls -la ~/DevTinder_UI(check if any other file )
Frontend : 
 -npm install
 -npm run build
 - sudo apt update ( updates ubuntu and everything )
 - sudo apt install nginx 
 - sudo systemctl start nginx
 - sudo systemctl enable nginx
 - copy code from dis
 - cd /var/www/html/
 - sudo scp -r dist/* /var/www/html/
 - Enable port 80 of instance EC2 

 Issue that i faced :
cd ~/DevTinder_UI/devTinder-web-app
sudo cp -r dist/* /var/www/html/
sudo systemctl restart nginx

when i did
ls -l /var/www/html
total 16 drwxr-xr-x 2 root root 4096 Nov 13 05:44 assets
 -rw-r--r-- 1 root root 459 Nov 13 05:44 index.html 
-rw-r--r-- 1 root root 615 Nov 13 05:39 index.nginx-debian.html
 -rw-r--r-- 1 root root 1497 Nov 13 05:44 vite.svg

The default Nginx page (index.nginx-debian.html) is still there — that’s why your browser still shows the “Welcome to nginx!” screen instead of your app.

remove :
sudo rm /var/www/html/index.nginx-debian.html
confirm it's not there : 
ls -l /var/www/html
you should only see 
index.html
assets/
vite.svg

restart ngnix
sudo systemctl restart nginx

test it locally :
curl http://localhost | head -10
should show html 

added 2 80 ports
| Type | Protocol | Port Range | Source    |
| ---- | -------- | ---------- | --------- |
| HTTP | TCP      | 80         | 0.0.0.0/0 |
| HTTP | TCP      | 80         | ::/0      |

optional check :
curl -I http://<your-public-ip>

you should get :
HTTP/1.1 200 OK

Anytime you push anything build again :
git pull 
npm run build
sudo scp -r dist/* /var/www/html/




Deploy Backend:
update DB password 
add public IP on mongodb atlas (network->Add public IP)
add the port 7777 in ec2 instant 

i faced issue cuz ngbix would be set as default reather then backend url
do ssh 
npm start 
npm install pm2 -g ( pm2 - to run your server 24/7)

pm2 start npm -- start
 Starting /home/ubuntu/.nvm/versions/node/v20.10.0/bin/npm in fork_mode (1 instance)
[PM2] Done.
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ npm                │ fork     │ 0    │ online    │ 0%       │ 35.7mb   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘

pm2 logs: will give the info 
pm2 flush npm -> will flush the logs
pm2 list : list of all the process
pm2 stop npm -> to stop the process 
pm2 start  npm --name "devTinder-backend" -- start ( will start and change the name of the process)(custom start)
 pm2 delete npm 

http://13.60.79.179/- frontend
http://13.60.79.179:7777/ - backend => http://13.60.79.179/api

 sudo nano /etc/nginx/sites-available/default

 CTRL+K remove everything then paste server {
    listen 80 default_server;
    listen [::]:80 default_server;
 
    server_name  10.60.79.179;

    location / {
        proxy_pass http://localhost:7777;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
 CTRL+O
 Enter
 CTRL + X (exit)

restart ngnix :
sudo systemctl restart nginx

if you check you IP/api -> it will show can't get login  ->/api/feed -> please login 
check for syntax error:

sudo nginx -t
it showss:
syntax is ok
test is successful

After this it should work :
http://YOUR_PUBLIC_IP

- Modify the BASEURL in frontend project to "/api"
- again commit 
- git pull ( git bash , build , sudo scp)

#Add custom domain name
-Buy domain name from go daddy 
-signup on cloudfare 
- change the nameserver on godaddy and point it to cloudfare
- wait till they are updated 
- go to cloudfare -> DNS -> Record ( remove one of the A and in another -> content add the EC2 IP )

if ( 502 or 404 error comes up - try to rebuild things and curl -I http://dev-match.in an see ots server is pointing to ngnix and not cloudfare)

-Enable SSL
https://dev-match.in/

AFter this after Refresh if your page breaks 
you need to  update the ngnix 
 sudo nano /etc/nginx/sites-available/default
 add this 

 Your frontend is an SPA → routing happens in the browser, not on the server.

But when you refresh:

GET /dashboard → Nginx looks for /var/www/html/dashboard (doesn't exist)
→ Error
fix:
  location / {
             try_files $uri $uri/ /index.html;
      }

Amazon SES :
go to IAM -> create user 
publishIP fron DNS record paste that in cloudFare
verify your domain name
Verify an email address







