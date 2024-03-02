import express from 'express'
import pc from 'picocolors'

import env from '@/configs/env'
import routes from '@/routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', routes)

app.listen(env.PORT, () => {
    console.log(`${pc.green('>>')} ${pc.cyan(`Server is running at http://localhost:${env.PORT}`)}`)
})
