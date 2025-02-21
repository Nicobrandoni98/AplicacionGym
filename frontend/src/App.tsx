import { useState, useEffect } from "react";
import ExerciseList from "./components/ExerciseList";
import ExercisesForm from "./components/ExercisesForm.tsx";
import exerciseService from "./services/exercises.ts";
import loginService from "./services/login.ts";
import "./App.css";
import LoginForm from "./components/LoginForm.tsx";
function App() {
  const [exercise, setExercises] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    exerciseService.getExercises().then((ejercicios) => {
      setExercises(ejercicios);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      exerciseService.setToken(user.token);
    }
  }, []);

  const handleLogOut = () => {
    setUser(null);
    exerciseService.setToken(user.token);
    window.localStorage.removeItem("loggedAppUser");
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedAppUser", JSON.stringify(user));
      exerciseService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <>
      <h1>Gimnasio</h1>
      {user ? (
        <>
          <ExercisesForm
            setExercises={setExercises}
            handleLogOut={handleLogOut}
          />
          <ExerciseList exercise={exercise} />
        </>
      ) : (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      )}
    </>
  );
}

export default App;
