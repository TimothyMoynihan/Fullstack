const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

// const url = `mongodb+srv://fullstack:${password}@cluster0.a5qfl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
// const url = `mongodb+srv://tim:${password}@mymongocluster.nimomtq.mongodb.net/noteApp?retryWrites=true&w=majority&appName=MyMongoCluster`
const url = `mongodb+srv://tim:${password}@MyMongoCluster.nimomtq.mongodb.net/sample_mflix`

// mongoose.set('strictQuery',false)

mongoose.connect(url)
.then(() => {
    console.log('connected to mongodb successfully')
})
.catch(error => {
    console.log(error)
})

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// })

// const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'HTML is easy',
//   important: true,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })
