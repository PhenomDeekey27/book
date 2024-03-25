import { useRef, useState } from 'react'
import Header from './Components/Header'
import axios from 'axios';
import { useEffect } from 'react';


const App = () => {

  const [title, settitle] = useState("");
  const [author, setauthor] = useState("")
  const [genre, setgenre] = useState("")
  const [Books, setBooks] = useState("")
  const [Update, setUpdate] = useState(false);
  const [disabled, setdisabled] = useState(false)
  const inputRef1=useRef(null);
  const inputRef2=useRef(null);
  const inputRef3=useRef(null);
  
  
  


  function getBooks(){
    
    axios.get("http://localhost:8000/books").then((res)=>{
      setBooks(res.data)
     
    })
  }

  useEffect(()=>{
    getBooks();
   
  },[])
  

  const handleChange=async(e)=>{
    console.log("clicked")
    e.preventDefault();
    try{
     await axios.post("http://localhost:8000/create_book",{
        title,author,genre
      }).catch((er)=>{
        console.log(er.message)
      })
    }catch(er){
      console.log(er.message)

    }
    setauthor(null)
    setgenre(null)
    settitle(null)
    inputRef1.current.value=""
    inputRef2.current.value=""
    inputRef3.current.value=""
   

    
  }

  const Update_books=async(id)=>{
    
    let updatebody={};
    if(inputRef1.current.value!==""){
      updatebody.title=title
    } 
    if(inputRef2.current.value!==""){
      updatebody.author=author
    } if(inputRef3.current.value!==""){
      updatebody.genre=genre
    }
  console.log(updatebody)
   

    if(!Update){
      setdisabled(true)
    
      inputRef1.current.focus();
      setUpdate(true)

    }

    if(Update)
    {
      setdisabled(true)
     
      const config = { headers: {'Content-Type': 'application/json'} };
      console.log(id)
     
     
      

      

      

      console.log(updatebody)
       
      try{
       await axios.patch(`http://localhost:8000/edit_book/${id}`,
         updatebody
        ,
        config).then((res)=>console.log(console.log(res.data)))
       
      }catch(er){
        console.log(er)
      }
      setUpdate(false)
      setdisabled(false)
     

      

    }

 
  }

  const Delete_book=(id)=>{

    try{

      axios.delete(`http://localhost:8000/delete_book/${id}`).then((res)=>{
        console.log(res.data)

      })

    }catch(er){
      console.log(er)

    }

  }

  return (
    <div>
        <Header></Header>
        <div className="container-fluid">
          <div className="p-4">
          <p className='fs-3 text-center'>Create New Book</p>
          <form onSubmit={handleChange}>
            <div className="mb-3 ">
              <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>settitle(e.target.value)} ref={inputRef1} />
             
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Author</label>
              <input type="text" className="form-control" id="exampleInputPassword1" onChange={(e)=>setauthor(e.target.value)} ref={inputRef2} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Genre</label>
              <input type="text" className="form-control" id="exampleInputPassword1" onChange={(e)=>setgenre(e.target.value)} ref={inputRef3} />
            </div>
           
            <button type="submit" className="btn btn-primary" disabled={disabled} >Create</button>
          </form>
          </div>
        </div>
        <div className='container-fluid'>
          {
              Books.length > 0 ? <div className='d-flex justify-content-bewtween gap-5 container-fluid flex-wrap justify-content-center' >
                {
                  Books.map((item,id)=>{
                    
                    
                    return (<div key={id} className='p-2 border border-primary d-flex flex-column align-items-center'>
                      <div className='d-flex gap-2'>
                        <p>Author:</p>
                        <p>{item.author}</p>
                      </div>
                     <div className='d-flex gap-2'>
                      <p>Title:</p>
                      <p>{item.title}</p>
                     </div>
                     <div className='d-flex gap-2'>
                      <p>Genre:</p>
                      <p>{item.genre}</p>
                     </div>
                     <div className='d-flex gap-2'>
                      <button className='btn btn-primary' onClick={()=>Update_books(item._id)}>{
                          !Update ? "Edit" :"Update"
                      }</button>
                      <button className='btn btn-danger' onClick={()=>Delete_book(item._id)}>Delete</button>
                     </div>
                      
                     
                    </div>)
                    
                  })
                }

              </div>:
              <p className='fs-3 text-center'>You Haven't Added any Books yet</p>
          }
        </div>
   </div>
        
  


   
   
  )
}

export default App;