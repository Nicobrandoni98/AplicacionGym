import axios from 'axios'
const baseUrl = 'http://localhost:3001/exercises'

const getExercises = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default {getExercises}