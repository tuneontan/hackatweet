import style from "../styles/Logged.module.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { showStatusLog, showIds, eraseId } from "../reducers/logged";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
function Logged() {
  const dispatch = useDispatch();
  const [isErased, setIsErased] = useState(false);
  const router = useRouter();
  let logStatus = useSelector((state) => state.logged.value);
  const [tweetContent, setTweetContent] = useState([]);
  const [tweetData, setTweetData] = useState([]);

  let styleHashtag = {};

  let styleTextMax = {};

  const removeTweet = (x) => {

    // confirm(x)


    fetch(`http://localhost:3000/users/tweets/${x}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  if (tweetContent.length > 280) {
    styleTextMax = { color: "red",
  transitoin:"all .3s" };
  }
  if (!logStatus[1]) {
    router.push("/");
  }

  useEffect(() => {
    fetch("http://localhost:3000/users/tweets")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTweetData(data.allTweet);
      });
  }, [tweetData]);
  const refreshData = () => {
    fetch("http://localhost:3000/users/tweets")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTweetData(data.allTweet);
      });
  };

  const regexHashTag = /(#+[a-zA-Z0-9(_)]{1,})/;

  const tweet = () => {
    // refreshData()

    fetch("http://localhost:3000/users/tweets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: logStatus[1].toString(),
        username: logStatus[2].toString(),
        content: tweetContent.toString(),

        // firstname: logStatus[1],
        // username: logStatus[2],

        // content: tweetContent,
        date: new Date().toLocaleTimeString(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {});
  };

  const eraseLogStatus = () => {
    dispatch(eraseId());
    router.push("/");
  };

  const tweetList = tweetData.map((data, i) => {
    if (data.username == logStatus[2] && data.firstname == logStatus[1]) {
      styleHashtag = { display: "inline" };
    } else {
      styleHashtag = { display: "none" };
    }
    let hashtag = data.content.match(regexHashTag);

    return (
      <>
        <div className={style.ListTweet}>
          <ul>
            <li>
              <img src="./iconetwitter.jpeg"></img>
            </li>
            <li>
              <span>{data.username}</span>@{data.firstname}{" "}
              <span>{data.date}</span>
            </li>
          </ul>
          <p>{data.content}</p>
          <div className={style.buttonContainer}>
            <span className={style.like}>
              <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
            </span>
            <span
            onClick={() => removeTweet(data._id)}
              data-id={data._id}
              style={styleHashtag}
              className={style.erase}
            >
              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            </span>
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      <div className={style.main}>
        <div className={style.firstPart}>
          <img src="/twitter_logo_white.png" alt="logo white png"></img>
          <div className={style.infoContainer}>
            <figure>
              <img src="/iconetwitter.jpeg" alt="icone twitter"></img>
              <figcaption>
                <h4>{logStatus[1]}</h4>
                <p>@{logStatus[2]}</p>
              </figcaption>
            </figure>

            <button onClick={() => eraseLogStatus()}>Logout</button>
          </div>
        </div>
        <div className={style.secondPart}>
          <div className={style.writeTwitter}>
            <h1>Home</h1>
            <input
              onChange={(e) => setTweetContent(e.target.value)}
              value={tweetContent}
              type="text"
              placeholder="What's up"
            ></input>
            <ul className={style.gridButton}>
              <li>
                <span style={styleTextMax}>{tweetContent.length}</span>/280
              </li>
              <li>
                <button onClick={() => tweet()}>Tweet</button>
              </li>
            </ul>
          </div>

          {tweetList.reverse()}
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
    </>
  );
}

export default Logged;
