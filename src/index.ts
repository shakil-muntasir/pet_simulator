import express from 'express'
import pc from 'picocolors'

import env from '@/configs/env'

const app = express()

app.listen(env.PORT, () => {
    console.log(`${pc.green('>>')} ${pc.cyan(`Server is running at http://localhost:${env.PORT}`)}`)
})
