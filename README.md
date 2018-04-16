# ReEmploy Client

# Install
1. Install node. (https://nodejs.org/en/)
2. Run `cp .env-default .env` and fill out. See Auth.
3. Run `npm install`
4. Run `npm run serve`

# Deploy
Deploy is run through the Procfile. The /dist folder is built at run time and is served via a simple ExpressJS server.

# Auth
We use OKTA for authentication.
Sign up at https://developer.okta.com/.  

When you are in create a new application for a single page app.  
Grant type should be `implicit` with all options selected.  
Set the redirect URI to `http://localhost:8080/implicit/callback`  

At the bottom you will see a `client ID`. Copy paste this into the config under `client_id`. The `issuer` is your url. (`https://dev-112233.oktapreview.com`) appended with `/oauth2/default` so 
`https://dev-112233.oktapreview.com/oauth2/default`.

The user you created with OKTA **will not** have access to the application by default.

# Structure
VueJS app using ElementUI component sets. 
JSData AJAX Wrapper.