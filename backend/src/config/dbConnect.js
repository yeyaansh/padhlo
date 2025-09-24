import mongoose from "mongoose"

async function dbmongo() {
    await mongoose.connect(`${process.env.DB_CONNECT_LINK}/padhlo`)
    console.log("Database Connected")
}

export default dbmongo;