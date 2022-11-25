import styles from "../styles/Home.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { useDispatch } from "react-redux";
import { showStatusLog, showIds } from "../reducers/logged";
function Home() {
  const router = useRouter();

  const dispatch = useDispatch();
  const logStatus = useSelector((state) => state.logged.value);

  const [firstnameI, setFirstnameI] = useState();

  const [usernameI, setUsernameI] = useState();
  const [passwordI, setPasswordI] = useState();

  const [usernameC, setUsernameC] = useState();
  const [passwordC, setPasswordC] = useState();

  const [appearSignUp, setAppearSignUp] = useState(false);
  const [appearSignIn, setAppearSignIn] = useState(false);
  const [appearBlack, setAppearBlack] = useState(false);

  let signUpStyle = {};
  let signInStyle = {};

  let blackOpacity = {};

  const appearSU = () => {
    setAppearSignUp(true);
    setAppearBlack(true);
  };

  const appearSI = () => {
    setAppearSignIn(true);
    setAppearBlack(true);
  };

  if (appearSignIn) {
    signInStyle = {
      transition: "all .3s",
      opacity: "1",
      visibility: "visible",
    };
  }

  if (appearSignUp) {
    signUpStyle = {
      transition: "all .3s",
      opacity: "1",
      visibility: "visible",
    };
  }
  if (appearBlack) {
    blackOpacity = {
      transition: "all .3s",
      opacity: "1",
      visibility: "visible",
    };
  }

  const HideSUBlack = () => {
    setAppearBlack(false);
    setAppearSignUp(false);
    setAppearSignIn(false);
  };
  const HideSIBlack = () => {
    setAppearBlack(false);
    setAppearSignIn(false);
  };

  //Bouton inscription
  const signUp = () => {
    // fetch('http://localhost:3000/users/signup',{
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({firstname:firstnameI,username:usernameI,password:passwordI})
    // }).then(response=>response.json())
    // .then(data=>{

    //   if(data.result){
    //     confirm("vous etes inscris")
    //   }else{
    //     confirm("le compte existe deja")
    //   }
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstnameI,
        username: usernameI,
        password: passwordI,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          dispatch(showStatusLog(true));
          dispatch(showIds([data.user.username]));
          dispatch(showIds([data.user.firstname]));

          router.push("/tweet");
        }

        //   // setIsSubscrided(true)

        // }else{

        //   // setIsSubscrided(false)
        // }
      });
  };

  const signIn = () => {
   
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: usernameC, password: passwordC }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          dispatch(showStatusLog(true));
          dispatch(showIds([data.user.username]));
          dispatch(showIds([data.user.firstname]));

          router.push("/tweet");
        }
      });
  };

  if (logStatus[1]) {

    router.push("/tweet")
  }

  return (
    <div>
      <div
        onClick={() => HideSUBlack()}
        className={styles.blackOpacity}
        style={blackOpacity}
      ></div>
      <div className={styles.signUpPopUp} style={signUpStyle}>
        <h3>Create your Hackatweet account</h3>
        <span onClick={() => HideSUBlack()}>x</span>
        <img src="twitter_logo_white.png" alt="logo twitter"></img>
        <input
          type="text"
          onChange={(e) => setFirstnameI(e.target.value)}
          value={firstnameI}
          placeholder="firstname"
        ></input>
        <input
          onChange={(e) => setUsernameI(e.target.value)}
          value={usernameI}
          type="text"
          placeholder="username"
        ></input>
        <input
          onChange={(e) => setPasswordI(e.target.value)}
          value={passwordI}
          type="password"
          placeholder="password"
        ></input>
        <button onClick={() => signUp()}>Sign Up</button>
      </div>

      <div className={styles.signUpPopUp} style={signInStyle}>
        <h3>Sign In</h3>
        <span onClick={() => HideSIBlack()}>x</span>
        <img src="twitter_logo_white.png" alt="logo twitter"></img>
        <input
          onChange={(e) => setUsernameC(e.target.value)}
          value={usernameC}
          type="text"
          placeholder="username"
        ></input>
        <input
          onChange={(e) => setPasswordC(e.target.value)}
          value={passwordC}
          type="password"
          placeholder="password"
        ></input>
        <button onClick={() => signIn()}>Sign In</button>
      </div>
      <main className={styles.main}>
        <div className={styles.blockLeft}>
          <img src="twitter_logo_white.png" alt="logo twitter"></img>
        </div>
        <div className={styles.blockright}>
          <img src="twitter_logo_white.png" alt="logo twitter"></img>
          <h1 className={styles.title}>
            See what's<br></br> happening
          </h1>
          <h2>Join Hackatweet today</h2>
          <button onClick={() => appearSU()} className={styles.signUp}>
            Sign up
          </button>
          <p>Already have an account</p>
          <button onClick={() => appearSI()} className={styles.signIn}>
            Sign in
          </button>
        </div>
      </main>
    </div>
  );
}

export default Home;
