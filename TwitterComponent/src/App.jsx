import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function ItemFollow({formatusername, username, name, initialisfollowing}){
  const imgSrc= `https://unavatar.io/${username}`;
  const [isfollowing, setfollow] = useState(initialisfollowing);
  const  buttonClassname= isfollowing ? 'follow-card-btn' : 'no-follow-card-button'
 const changefollow=() => setfollow(!isfollowing)
  return(
    <>
    <div className="itemuser">
      <img src={imgSrc} alt="Avatar del usuario" />
      <div className="names">
        <strong>{name}</strong>
        <span>@{username}</span>
      </div>
      <aside>
      <button className={buttonClassname} onClick={ changefollow}><span className='txt-btn'>{isfollowing?"Follow" : "Followed"}</span>
      <span className='tw-stopfollow'>unfollow</span>
      </button>
      </aside>
    </div>
    </>
  )
}
const users=[
  {
    username:"midudev",
    name:"prueba1",
    initialisfollowing:true
  },{
    username:"Soycarlosluis",
    name:"prueba2",
    initialisfollowing:false

  },
  {
    username:"asdas",
    name:"prueb3a",
    initialisfollowing:true

  }
]

function App() {
const formatedUsername= (<span>@midudev</span>)
  return (
    <>
     <article className="twittercard">
      <h1>A quien seguir</h1>
      {users.map(u => {
        const {username, name, initialisfollowing} = u;
        return(
      <ItemFollow key={username} formatusername={formatedUsername} username={username} name={name} initialisfollowing={initialisfollowing}></ItemFollow>

        )
      })}
       
     </article>
    </>
  )
}

export default App
