export const errorMessages = {
    serverError: 'An internal server error occurred.',
    emailIsTaken: 'This email address is already in use.',
    userNotFound: 'User not found with the provided ID.',
    postNotFound: 'Post not found with the specified ID.',
    workoutPlanNotFound: 'Workout plan not found with the specified ID.',
    exerciseTypeNotFound: 'Exercise type not found with the specified ID.',
    sessionNotFound: 'Session not found with the specified ID.',
    sessionExerciseNotFound: 'Exercise not found in the session with the specified ID.',
    wrongPassword: 'Incorrect password entered.',

    invalidFieldLength(field: string, min: number, max: number){
        const arr = [`Длина поля '${field}' должа быть`]
        if(min > 0) arr.push(`от ${min}`)
        if(max >= 0) arr.push(`до ${max}`)
        return arr.join(' ') + '.'
    }
}