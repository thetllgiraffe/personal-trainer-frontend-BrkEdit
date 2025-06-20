const isProduction = process.env.NODE_ENV === 'production'

const production = 'https://personal-trainer-backend-42de6515a8aa.herokuapp.com'

const url = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : production

export const API_URL = url
