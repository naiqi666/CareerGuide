import { useState } from "react";
import "./App.css";
import A from "/Users/junpuyinwei/Desktop/project2/my-app/src/carreer_p.jpg";
import AnimatedGif from "./AnimatedGif";
// interface UserInputType {
//   username: string;
// }

// const initialState = { usename: "" };

export function HomePage() {
  const [userInput, setUserInput] = useState<string>("");
  const [home, sethome] = useState<boolean>(false);
  const buttonHand = () => {
    sethome((current) => !current);
  };
  return (
    <div className="all-Home">
      <div className="q">
        {!home && (
          <div className="Home_q">
            <header className="Home_info">What your name?</header>
            <div className="Home-input">
              <input
                type="text"
                onChange={(e) => setUserInput(e.target.value)}
              ></input>
            </div>
            <div className="Home_submit">
              <button onClick={buttonHand}>Submit</button>
            </div>
          </div>
        )}
        {home && (
          <div className="home_intro">
            <h6 className="Home_name">Hi {userInput}! </h6>
            <h5 className="Home_information">
              Welcome to Career Direction, Do you have a career direction? We
              have a method that can help you find a suitable job! We have two
              different types of Blessed quizzes that can help you discover
              careers perfect for you in just 10 minutes. We will get you on the
              path to success by answering a few simple questions.
            </h5>
            <AnimatedGif
              src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2FtOHNudDlpMGpzMXh3ajkxeXRzb2pmY2NlcDlmMWN5OG9paTF0diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/80dIUvgluhCGuHKjBP/giphy.gif"
              alt="pic"
            ></AnimatedGif>
          </div>
        )}
      </div>

      <div className="h_picture">
        <img src={A} alt="I am a" />
      </div>
      <h3 className="Jun">Build by Junpuyin Wei</h3>
    </div>
  );
}
