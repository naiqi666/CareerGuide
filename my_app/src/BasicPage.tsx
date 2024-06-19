import BaseQuestionBank from "./BaseQuestionBank";
// import "../index.css";
import React from "react";
import { useState } from "react";
import { Button, Form, ProgressBar, Spinner } from "react-bootstrap";
import { OpenAI } from "openai";
import { useLocalStorage } from "./useLocalStroage";

const QUESTIONS: string[] = BaseQuestionBank.map((q) => q.question);
const DEFAULT_QUESTION_INDEX: number = 0;

interface BaseString {
  setReports: (newString: string) => void;
}
export function BasicPage({ setReports }: BaseString): JSX.Element {
  const [output, setOutput] = useState<string>("");
  const [questionIndex, setquestionIndex] = useState<number>(
    DEFAULT_QUESTION_INDEX
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userResponses, setUserResponses] = useState<string[]>(
    new Array(QUESTIONS.length).fill("")
  );
  // const [apiKey, setApiKey] = useState("");
  const [userApi, setApi] = useState<string>("");
  const { setItem } = useLocalStorage("sss");

  function nextQuestion(): void {
    setquestionIndex(questionIndex + 1);
  }

  function preQuestion(): void {
    setquestionIndex(questionIndex - 1);
  }

  function changeUserResponse(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    const updatedResponses: string[] = [...userResponses];
    updatedResponses[questionIndex] = event.target.value;
    setUserResponses(updatedResponses);
  }

  //Makes an Async call to GPT fall containing the questions and answers supplied from the user after they take the detailed quiz and sputs out a specific output
  async function callOpenAI() {
    setIsLoading(true);
    const openai = new OpenAI({
      apiKey: userApi,
      dangerouslyAllowBrowser: true,
    });
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You will be provided with a list of questions and answers, your job is to turn these questions and answers into 5 different career options with the job title and a short description of each career. You will format these 5 careers into a Json file and only a Json format where the Job title should be under the name {title} and the description should be called {description} and description should in clude median salary number",
          },
          {
            role: "user",
            content:
              "Here is a list of questions: " +
              QUESTIONS.join(", ") +
              " And here is the combined output of answers: " +
              userResponses.join(", "),
          },
        ],
      });
      setIsLoading(false);
      setOutput(completion.choices[0]?.message.content || "");
      setReports(completion.choices[0]?.message.content || "");
      console.log(output);
    } catch (error) {
      setIsLoading(false);
      alert("Invalid API Key!");
    }
  }
  return (
    <div>
      <div>
        {isLoading && (
          <>
            <p>Processing Results...</p>
            <br />
            <Spinner animation="border" role="status" />
          </>
        )}
        {!isLoading && (
          <>
            <p className="question_left">
              {QUESTIONS.length - questionIndex === 1
                ? `${QUESTIONS.length - questionIndex} Question Left`
                : `${QUESTIONS.length - questionIndex} Questions Left`}
            </p>
            <ProgressBar
              className="base_progressbar"
              now={((questionIndex + 1) / QUESTIONS.length) * 100}
              label={`${Math.floor(
                ((questionIndex + 1) / QUESTIONS.length) * 100
              )}%`}
            />
            <h2 className="base_question">{QUESTIONS[questionIndex]}</h2>
            <div className="quiz-answers">
              <Form.Check
                className="Agreement"
                type="radio"
                name="Agreement"
                onChange={changeUserResponse}
                id="Agreement-check-strongly-agree"
                label="Strongly Agree"
                value="strongly agree"
                checked={userResponses[questionIndex] === "strongly agree"}
              />
              <Form.Check
                className="Agreement"
                type="radio"
                name="Agreement"
                onChange={changeUserResponse}
                id="Agreement-check-agree"
                label="Agree"
                value="agree"
                checked={userResponses[questionIndex] === "agree"}
              />
              <Form.Check
                className="Agreement"
                type="radio"
                name="Agreement"
                onChange={changeUserResponse}
                id="Agreement-check-Neutral"
                label="Neutral"
                value="neutral"
                checked={userResponses[questionIndex] === "neutral"}
              />
              <Form.Check
                className="Agreement"
                type="radio"
                name="Agreement"
                onChange={changeUserResponse}
                id="Agreement-check-disagree"
                label="Disagree"
                value="disagree"
                checked={userResponses[questionIndex] === "disagree"}
              />
              <Form.Check
                className="Agreement"
                type="radio"
                name="Agreement"
                onChange={changeUserResponse}
                id="Agreement-check-strongly-disagree"
                label="Strongly Disagree"
                value="strongly disagree"
                checked={userResponses[questionIndex] === "strongly disagree"}
              />
            </div>
            <div className="botton">
              <Button
                type="button"
                className="prevButton"
                onClick={preQuestion}
                disabled={questionIndex === 0}
              >
                <span className="prevButton-span">Back</span>
              </Button>
              <Button
                type="button"
                className="nextButton"
                onClick={nextQuestion}
                disabled={
                  questionIndex === QUESTIONS.length - 1 ||
                  userResponses[questionIndex] === ""
                }
              >
                <span className="prevButton-span">Next</span>
              </Button>
              <Button
                type="button"
                className="submitButton"
                onClick={callOpenAI}
                disabled={
                  userResponses.includes("") ||
                  questionIndex !== QUESTIONS.length - 1
                }
              >
                <span className="submitButton-span">Submit</span>
              </Button>
            </div>
            <div className="api">
              <div>
                <input
                  className="api"
                  placeholder="API"
                  type="text"
                  value={userApi}
                  onChange={(e) => setApi(e.target.value)}
                ></input>
              </div>
              <>
                <button className="api_botton" onClick={() => setItem(userApi)}>
                  Submit
                </button>
              </>
            </div>
            <h4>{userResponses[questionIndex]}</h4>
            <div>{output}</div>
          </>
        )}
      </div>
    </div>
  );
}
