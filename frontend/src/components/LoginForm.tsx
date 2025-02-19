import { useState } from "react";

export default function LoginForm({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword,
}) {
  const [loginVisible, setLoginVisible] = useState(false);

  const hideWhenVisible = { display: loginVisible ? "none" : "" };
  const showWhenVisible = { display: loginVisible ? "" : "none" };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}>Show Login</button>
      </div>

      <div style={showWhenVisible}>
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="text"
              value={username}
              name="Username"
              placeholder="Username"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              name="Password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button>Login</button>
        </form>
        <button onClick={() => setLoginVisible(false)}>Cancel</button>
      </div>
    </div>
  );
}
