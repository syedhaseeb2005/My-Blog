import { createContext, useContext, useState } from 'react';
import './App.css';
import { faker } from '@faker-js/faker';
import Img from './assets/img.png';

const PostContext = createContext();

const createRandomPost = () => {
  return {
    title: `${faker.animal.bird()}`,
    body: `${faker.lorem.sentence()}`,
  };
};

function App() {
  const [darkmode, setdarkmode] = useState(true);
  const [searchquery , setsearchquery] = useState("")


  const [post, setpost] = useState(() => {
    return Array.from({ length: 25 }, () => createRandomPost());
  });
  
  const searchPost = searchquery.length > 0
   ?  post.filter((post)=>{
    return(
      `${post.title} ${post.body}`
      .toLowerCase().includes(searchquery.toLowerCase()) 
      )
  })
  : post;

  function clearPosts() {
    setpost([]);
  }

  return (
    <PostContext.Provider
    value=
    {
      { post : searchPost,
       clearPosts, 
       searchquery,
       setsearchquery }}>
      <div style={{ height: '100%' }} className={darkmode ? 'light-theme' : 'dark-theme'}>
        <Header/>
        <Main />
        <div className='theme-button'>
          <h1 style={{ cursor: 'pointer' }} onClick={() => setdarkmode(!darkmode)}>
            {darkmode ? '🌞' : '🌙'}
          </h1>
        </div>
      </div>
    </PostContext.Provider>
  );
}

const Header = () => {
  const { clearPosts } = useContext(PostContext);
  return (
    <div className='header'>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img src={Img} alt="img" />
        <span>My Personal Blog</span>
        <Result />
        <SearchPost />
      </div>
      <div style={{ display: 'flex' }}>
        <button className='clear-btn'  onClick={clearPosts}>
          Clear Post
        </button>
      </div>
    </div>
  );
};

function Main() {
  return (
    <section>
      <Post />
    </section>
  );
}

function Result() {
  const { post } = useContext(PostContext);
  return <p className='postFound'>🚀 {post.length} Blogs Found</p>;
}

function SearchPost() {
  const { searchquery , setsearchquery } = useContext(PostContext)
  return (
    <>
      <input 
      value={searchquery} 
      type="text" 
      placeholder='Search Post...'
      onChange={(e)=>setsearchquery(e.target.value)} />
    </>
  );
}

function Post() {
  const { post } = useContext(PostContext);
  return (
    <ul className='posts'>
      {post.map((posts, i) => (
        <li key={i}>
          <h3>{posts.title}</h3>
          <h5>{posts.body}</h5>
        </li>
      ))}
    </ul>
  );
}

export default App;
