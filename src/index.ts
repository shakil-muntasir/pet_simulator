import express from 'express'
import pico from 'picocolors'

import env from '@/configs/env'

const app = express()

app.listen(env.APP_PORT, () => {
    console.log(`${pico.green('>>')} ${pico.cyan(`Server is running at http://localhost:${env.APP_PORT}`)}`)
})
