import { Link, NavLink, useActionData } from "react-router-dom";
import { UserAuth } from "./AuthContext";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, getAuth } from "firebase/auth";
import "./App.css";
import { app } from "./AuthContext";

const Auth2 = getAuth(app);

function App() {
  const { CreateEmailandPassword, SignUpEmailAndPassword, FireBasePutData } =
    UserAuth();
  const [Istrue, setIstrue] = useState(true);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [confrimpassword, setConfrimPassword] = useState("");
  const [user, setuser] = useState(null);# Simple workflow for deploying static content to GitHub Pages
  name: Deploy static content to Pages
  
  on:
    # Runs on pushes targeting the default branch
    push:
      branches: ['main']
  
    # Allows you to run this workflow manually from the Actions tab
    workflow_dispatch:
  
  # Sets the GITHUB_TOKEN permissions to allow deployment to GitHub Pages
  permissions:
    contents: read
    pages: write
    id-token: write
  
  # Allow one concurrent deployment
  concurrency:
    group: 'pages'
    cancel-in-progress: true
  
  jobs:
    # Single deploy job since we're just deploying
    deploy:
      environment:
        name: github-pages
        url: ${{ steps.deployment.outputs.page_url }}
      runs-on: ubuntu-latest
      steps:
        - name: Checkout
          uses: actions/checkout@v4
        - name: Set up Node
          uses: actions/setup-node@v4
          with:
            node-version: 20
            cache: 'npm'
        - name: Install dependencies
          run: npm ci
        - name: Build
          run: npm run build
        - name: Setup Pages
          uses: actions/configure-pages@v4
        - name: Upload artifact
          uses: actions/upload-pages-artifact@v3
          with:
            # Upload dist folder
            path: './dist'
        - name: Deploy to GitHub Pages
          id: deployment
          uses: actions/deploy-pages@v4
  function SignUp() {
    if (Password === confrimpassword) {
      CreateEmailandPassword(Email, Password);
      setEmail("");
      setPassword("");
      setConfrimPassword("");
    } else {
      return alert("Password not matching");
    }
  }
  function Login() {
    SignUpEmailAndPassword(Email, Password);
    alert("Successfully Login");
    setEmail("");
    setPassword("");
    setConfrimPassword("");
  }
  useEffect(() => {
    onAuthStateChanged(Auth2, (user) => {
      if (user) {
        setuser(user);
      } else {
        setuser(null);
      }
    });
  }, []);

  return (
    <>
      {user ? (
        <div className="SignUp-success">
          <div className="Singup-box">
            <h1>🎉🎊</h1>
            <h1>{user.email}</h1>
            <button onClick={() => signOut(Auth2)}>Logout</button>
          </div>
        </div>
      ) : (
        <div>
          <div className="Main">
            <div className="button-box">
              <button
                className={Istrue ? "Active" : ""}
                onClick={() => setIstrue(true)}
              >
                Login
              </button>
              <button
                className={!Istrue ? "Active" : ""}
                onClick={(e) => setIstrue(false)}
              >
                SingUp
              </button>
            </div>
            {Istrue ? (
              <div className="Login">
                <div className="input-box">
                  <h1>Login Form</h1>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    required
                    placeholder="Password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <a href="#">Forgot Password</a>
                  <button className="btn" onClick={Login}>
                    Login
                  </button>
                </div>
                <div className="Member">
                  <p>
                    Not a Member ?
                    <span onClick={(e) => setIstrue(false)}> SingUp Now</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="SingUp">
                <div className="SignUp-From">
                  <h1>SignUp Form</h1>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    required
                    placeholder="Confirm Password"
                    value={confrimpassword}
                    onChange={(e) => setConfrimPassword(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => {
                    SignUp();
                    FireBasePutData(`User/email`, { Email, Password });
                  }}
                >
                  SignUp
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
