import express from 'express'

const app =  express()

app.get('/', (req, res, next) => {
    return res.send('Working...')
})

app.listen(8080, () => {
    console.log('Server running at port 8080')
})