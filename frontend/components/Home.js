import styles from '../styles/Home.module.css';
import {useState} from 'react'
import { set } from 'mongoose';
function Home() {

  const [appearSignUp,setAppearSignUp] = useState(false)
  const [appearSignIn,setAppearSignIn] = useState(false)
  const [appearBlack,setAppearBlack] = useState(false)

  let signUpStyle = {}
  let signInStyle = {}

  let blackOpacity = {}

  const appearSU =()=>{
    setAppearSignUp(true)
    setAppearBlack(true)
  }

  const appearSI =()=>{
    setAppearSignIn(true)
    setAppearBlack(true)
  }




  if(appearSignIn){
    signInStyle={
      'transition': 'all .3s',
      'opacity': '1',
      'visibility': 'visible'
    }
  }

  if(appearSignUp){
    signUpStyle={
      'transition': 'all .3s',
  'opacity': '1',
  'visibility': 'visible'
    }


  }
  if(appearBlack){
    blackOpacity={

      'transition': 'all .3s',
  'opacity': '1',
  'visibility': 'visible'
    }
     
  }


  const HideSUBlack= ()=>{
    setAppearBlack(false)
    setAppearSignUp(false)
    setAppearSignIn(false)

  }
  const HideSIBlack= ()=>{
    setAppearBlack(false)
    setAppearSignIn(false)
  }

  return (
    <div>

      <div onClick={()=>HideSUBlack()} className={styles.blackOpacity} style={blackOpacity}>
      </div>
      <div className={styles.signUpPopUp} style={signUpStyle}>
        <h3>Create your Hackatweet account</h3>
        <span onClick={()=>HideSUBlack()}>x</span>
        <img src='twitter_logo_white.png' alt='logo twitter'></img>
        <input type='text' placeholder='firstname'></input>
        <input type='text' placeholder='username'></input>
        <input type='text' placeholder='password'></input>
        <button>Sign In</button>
      </div>

      <div className={styles.signUpPopUp} style={signInStyle}>
        <h3>Sign In</h3>
        <span onClick={()=>HideSIBlack()}>x</span>
        <img src='twitter_logo_white.png' alt='logo twitter'></img>
        <input type='text' placeholder='username'></input>
        <input type='text' placeholder='password'></input>
        <button>Sign In</button>
      </div>
      <main className={styles.main}>
        <div className={styles.blockLeft}>
        <img src='twitter_logo_white.png' alt='logo twitter'></img>
        </div>
        <div className={styles.blockright}>
        <img src='twitter_logo_white.png' alt='logo twitter'></img>
        <h1 className={styles.title}>See what's<br></br> happening</h1>
        <h2>Join Hackatweet today</h2>
        <button onClick={()=>appearSU()} className={styles.signUp}>Sign up</button>
        <p>Already have an account</p>
        <button onClick={()=>appearSI()} className={styles.signIn} >Sign in</button>
        </div>
      </main>
    </div>
  );
}

export default Home;
