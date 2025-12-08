const app = require("./app")

const { connectDB } = require('./data/connection')

connectDB().then(() => app.listen(PORT,
    () => {
        console.log("server i running on 3000")
    }),
    () => console.error("blad")
)