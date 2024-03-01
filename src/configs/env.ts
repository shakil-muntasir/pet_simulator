import { cleanEnv, port, str } from 'envalid'

const env = cleanEnv(process.env, {
    NODE_ENV: str({ default: 'development' }),
    PORT: port()
})

export default env
