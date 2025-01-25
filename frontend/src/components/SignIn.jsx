import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "./Footer";

function SignIn({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState(null);

  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://pdf-viewer-backend-sepia.vercel.app/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: loginEmail,
            password: loginPassword,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Username or password incorrect");
      }

      const data = await response.json();
      localStorage.setItem("token", data.accessToken);

      Swal.fire({
        icon: "success",
        title: "Login successful!",
        showConfirmButton: false,
        timer: 1500,
      })
        .then(() => navigate("/"))
        .then(() => {
          window.location.reload(true);
        });
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegister = () => {
    navigate("/SignUp");
  };

  return (
    <>
      <div className="container">
        <div className="form-container">
          <form onSubmit={login} className={error ? "has-error" : ""}>
            <h3>Login Here</h3>

            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email..."
              value={loginEmail}
              onChange={(event) => setLoginEmail(event.target.value)}
              id="email"
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password..."
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
              id="password"
              required
            />

            {error && <div className="error">{error}</div>}

            <button type="button" onClick={login} className="login">
              Log In
            </button>
            <div className="register-container">
              <span>Don't have an account? </span>
              <button
                type="button"
                className="register"
                onClick={handleRegister}
              >
                Register
              </button>
            </div>
          </form>
        </div>
        <style>{styles}</style>
      </div>
      <Footer />
    </>
  );
}

const styles = `
*,
*:before,
*:after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background-color: #080710;
  font-family: 'Poppins', sans-serif;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.background {
  width: 430px;
  height: 520px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}

.background .shape {
  height: 200px;
  width: 200px;
  position: absolute;
  border-radius: 50%;
}

.shape:first-child {
  background: linear-gradient(#1845ad, #23a2f6);
  left: -80px;
  top: -80px;
}

.shape:last-child {
  background: linear-gradient(to right, #ff512f, #f09819);
  right: -30px;
  bottom: -80px;
}

.form-container {
  position: relative;
  z-index: 1;
}

form {
  margin: 65px;
  height: 520px;
  width: 400px;
  background-color: rgba(255, 255, 255, 0.13);
  position: relative;
  border-radius: 10px;
  backdrop-filter: blur(3px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 50px 35px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

form h3 {
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
  color: #e5e5e5;
}

label {
  margin-top: 30px;
  font-size: 16px;
  font-weight: 500;
  color: #e5e5e5;
}

input {
  height: 50px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
  color: #e5e5e5;
}

input::placeholder {
  color: #e5e5e5;
}

button.login {
  margin-top: 40px;
  background-color: #f0f500;
  color: #080710;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button.login:hover {
  background-color: #f1f1f1;
}

form.has-error button.login {
  margin-top: 20px;
}

.error {
  color: red;
  font-size: 16px;
  margin-top: 10px;
}

.register-container {
  margin-top: 20px;
  text-align: center;
}

.register-container span {
  color: #e5e5e5;
  font-size: 14px;
}

button.register {
  margin-top: 10px;
  background-color: transparent;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s;
}

button.register:hover {
  color: #ff512f;
}
`;

export default SignIn;
