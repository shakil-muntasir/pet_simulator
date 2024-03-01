import { cleanEnv, port } from 'envalid'

const env = cleanEnv(process.env, {
    APP_PORT: port()
})

export default env
