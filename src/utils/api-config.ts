const isProduction = process.env.NODE_ENV === 'production'

export const API_URL = isProduction
  ? 'https://personal-trainer-backend.herokuapp.com' // Your deployed Heroku app URL
  : 'http://localhost:4000' // Your local backend URL
