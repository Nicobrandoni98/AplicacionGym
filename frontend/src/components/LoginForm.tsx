import Togglable from "./Togglable";
export default function LoginForm({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword,
}) {
  return (
    <Togglable buttonLabel='Show login'>
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
    </Togglable>
  );
}
