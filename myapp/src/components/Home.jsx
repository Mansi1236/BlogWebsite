import React, { useEffect, useState } from 'react';
import {collection, getDocs, deleteDoc, doc} from 'firebase/firestore';
import {db, auth} from '../firebase-config';

function Home({isAuth}) {
  const [postlist , setPostList] = useState([]);
  const PostsCollectionRef = collection(db, "posts");

  useEffect(() => {
    // get data from firestore
    const getPosts = async() => {
      const data = await getDocs(PostsCollectionRef);
      setPostList(data.docs.map((doc) => ({...doc.data() , id: doc.id})));
    }
    getPosts();
  });


  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  }

  return (
    <div className='homePage'>
{postlist.map((post) => {
   return (

  <div className='post'> 

  <div className='postHeader'>
  <div className='title'> <h1> {post.title}</h1> </div>
 </div>

 <div className='deletePost'> 
 { isAuth  && post.author.id === auth.currentUser.uid && (<button onClick={() => {deletePost(post.id)}}>  &#128465;</button>) }
 </div>

<div className='postTextContainer'> 
{post.post}
  </div>
<h3>@{post.author.name}</h3>
  </div>


   )
})}


    </div>
  )
}

export default Home;