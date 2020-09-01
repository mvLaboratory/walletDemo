import auth0 from 'auth0-js'
import { useHistory } from 'react-router-dom';

export default class Auth {
  constructor() {
    let history = useHistory();
    this.history = history;
    this.host = process.env.REACT_APP_HOST;
    this.userProfile = null;
    this.clientId = process.env.REACT_APP_AUTH0_CLIENTID;
    this.auth0 = new auth0.WebAuth({
        domain: process.env.REACT_APP_AUTH0_DOMAIN,
        clientID: process.env.REACT_APP_AUTH0_CLIENTID,
        redirectUri: this.host + process.env.REACT_APP_AUTH0_CALLBACK,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        responseType: "token id_token",
        scope: "openid profile email"
    });
  }

  login = () => {
    this.auth0.authorize();
  }

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.history.push("/");
      }else if (err) {
        this.history.push("/");
        alert(`Error: ${err.error}. Check the console for further details.`);
        console.log(err);
      }
    });
  };

  setSession = authResult => {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );

    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
  };
    
  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  isCallbackPage() {
    return  new RegExp('login/callback').test(this.history.location.pathname);
  }

  logout = () => {
    debugger;
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.userProfile = null;
    this.auth0.logout({
      clientID: this.clientId,
      returnTo: this.host
    });
  };

  getAccessToken = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("No access token found.");
    }
    return accessToken;
  };

  getProfile = cb => {
    if (this.userProfile) return cb(this.userProfile);
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.userProfile = profile;
      cb(profile, err);
    });
  };
}