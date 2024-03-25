const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors=require("cors")
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config();

const bookSchema = require("./Models/BookSchema")
const UserSchema=require("./Models/UserSchema")


const PORT=  8000;

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("mongoDb connected Successfully")
}).catch((er)=>{
    console.log(er)
})

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use(cors())

//login and signup

app.post('/api/signup',async(req,res)=>{

  const {username,password}=req.body;

  try {
    // Check if the username already exists
    const existingUser = await UserSchema.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hashSync(password, 10);

    // Create a new user
    const newUser = new UserSchema({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});








app.get("/",(req,res)=>{
    return res.send("running")
})


app.post("/create_book",async(req,res)=>{
    const{title,author,genre}=req.body;
    console.log(req.body)
  try {
        const book = new bookSchema({
            title,author,genre
        });
       const saved_book = await book.save();
       alert("Book created Successfully")
      
      return res.json({
        status:201,
        data:saved_book
      })
     
      } catch (err) {
       
       return res.send({
        status:400,
        error:err.message
       })
      }

})

app.get('/books', async (req, res) => {
    try {
      const books = await bookSchema.find();
      console.log(typeof books)
      return res.status(200).json(books);
    } catch (err) {
      res.status(500).send(err);
    }
  });


app.patch("/edit_book/:id",async(req,res)=>{
  try{
    const bookId=req.params.id;
    const book = await bookSchema.findById(req.params.id);
    console.log(book)
    if(book===null){
      return res.status(404).json({
        message:"Book not Found"
      })
    }

    // if(req.body.title!==null){
    //   book.title=req.body.title
    // }
    // if(req.body.author!==null){
    //   book.author=req.body.author
    // }
    // if(req.body.genre!==null){
    //   book.genre=req.body.genre
    // }

    const updatedBook = await bookSchema.updateOne({ _id: bookId }, { $set: req.body });
    // const updatedBook=await book.save();


    return res.status(200).json(updatedBook)

  }catch(er){
    return res.status(501).json(er)

  }
})

app.delete("/delete_book/:id",async(req,res)=>{

  try {
    const { id } = req.params;
    const deletedBook = await bookSchema.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

})
app.listen(PORT,()=>{
    console.log("server running")
})
