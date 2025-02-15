import { useState, useEffect } from "react";
import ExerciseList from "./components/ExerciseList";
import FormExercises from "./components/FormExercises";
import exerciseService from "./services/exercises.js";
import loginService from "./services/login.js";

import "./App.css";
function App() {
  const [exercise, setExercises] = useState([]);
  const [newExercise, setNewExercise] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    exerciseService.getExercises().then((ejercicios) => {
      setExercises(ejercicios);
    });
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const renderLoginForm = () => (
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
  );

  return (
    <>
      {user ? (
        <>
          <FormExercises
            setNewExercise={setNewExercise}
            newExercise={newExercise}
            setExercises={setExercises}
            exercise={exercise}
          />
          <ExerciseList exercise={exercise} />
        </>
      ) : (
        renderLoginForm()
      )}
    </>
  );
}

export default App;
