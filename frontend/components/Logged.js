
import style from  '../styles/Logged.module.css'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import {showStatusLog ,showIds , eraseId} from '../reducers/logged';
import {useState ,useEffect} from 'react'
function Logged() {

  const dispatch = useDispatch();
  const [isErased,setIsErased] = useState(false)
  const router = useRouter()
  let logStatus = useSelector((state) => state.logged.value);
  console.log(logStatus)

  const [tweetContent,setTweetContent]=useState([])






  const eraseLogStatus = ()=>{

    dispatch(eraseId())
    router.push("/")

  }


    // console.log(logStatus)

    // router.push("/")

  if(!logStatus[1]){
    // useEffect(() => {
       router.push("/")
    //  }, []);       
     }







    return(<>

        <div className={style.main}>
            <div className={style.firstPart}>
                <img src='/twitter_logo_white.png' alt=''></img>
                <div className={style.infoContainer}>
                    <figure>
                        <img src='/iconetwitter.jpeg' alt=''></img>
                        <figcaption>
                            <h4>{logStatus[1]}</h4>
                            <p>@{logStatus[2]}</p>
                        </figcaption>
                    </figure>

                    <button onClick={()=>eraseLogStatus()}>Logout</button>
                </div>
            </div>
            <div className={style.secondPart}>
                <div className={style.writeTwitter}>

                    <h1>Home</h1>
                    <input onChange={(e)=>setTweetContent(e.target.value)} value={tweetContent} type="text" placeholder="What's up"></input>
                    <ul className={style.gridButton}>
                        <li>{tweetContent.length}/280</li>
                        <li><button>Tweet</button></li>
                    </ul>                    
                </div>
            </div>
            <div className={style.thirdPart}>
            <h1>Trends</h1>
            <ul className={style.containerTrends}>

                <li>#tanBRRRR</li>
                <li>#tanBRRRR</li>
                <li>#tanBRRRR</li>
                <li>#tanBRRRR</li>

            </ul>


            </div>
        </div>
    
    

    </>)


}

export default Logged;
