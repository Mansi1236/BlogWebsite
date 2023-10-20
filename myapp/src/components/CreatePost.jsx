import React, { useState, useEffect } from 'react';
import {addDoc, collection} from 'firebase/firestore';
import {db, auth} from '../firebase-config';
import { useNavigate } from 'react-router-dom';

function CreatePost({isAuth}) {
  let navigate = useNavigate();

const [title , setTitle] = useState(" ");
const [post , setPost] = useState(" ");

// creating function that when we submit post it will store the data in Firestore
const postcollectionRef = collection(db, "posts");
const createpost = async () => {
  // to which collection reference we want to save the data to
await addDoc(postcollectionRef, 
  {title: title, post, 
  author: {name: auth.currentUser.displayName, id: auth.currentUser.uid}
});
navigate("/");
}

useEffect(() => {
if(!isAuth) {
  navigate("/login");
}
}, [])

  return (
    <div className='createPostPage'>

<div className='cpContainer'>
<h1> Create a Post</h1>
<div className='inputGp'> 
<label> Title: </label>
<input placeholder='Enter title ...' onChange={(event) => {setTitle(event.target.value)}}/>
</div>
<div className='inputGp'>
<label> Post: </label>
<textarea placeholder='Post something ...' onChange={(event) => {setPost(event.target.value)}}/>
</div>
<button onClick={createpost}> Post</button>
</div>


    </div>
  )
}

export default CreatePost;