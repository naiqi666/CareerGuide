import "./App.css";
import React, { useState } from "react";
import { Form, ProgressBar, Spinner } from "react-bootstrap";
import detailedQuestionBank from "./DetailQuestionBank";
import { useLocalStorage } from "./useLocalStroage";
// import { ReportPage } from "./ReportPage";
import OpenAI from "openai";
interface DetailedString {
  setReports: (newString: string) => void;
}
const DEFAULT_QUESTION_INDEX: number = 0;
// eslint-disable-next-line @typescript-eslint/no-unused-vars

const QUESTIONS: string[] = detailedQuestionBank.map((q) => q.question);
export function DetailPage({ setReports }: DetailedString): JSX.Element {
  const [userResponse, setUserResponses] = useState<string[]>(
    new Array(QUESTIONS.length).fill("")
  );
  const [userIndex, setUserIndex] = useState<number>(DEFAULT_QUESTION_INDEX);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [output, setOutput] = useState<string>("");
  const [userApi, setApi] = useState<string>("");

  function preQuestion(): void {
    setUserIndex(userIndex - 1);
  }

  function nextQuestion(): void {
    setUserIndex(userIndex + 1);
  }

  function changeUserResponse(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void {
    const updatedResponses: string[] = [...userResponse];
    updatedResponses[userIndex] = event.target.value;
    setUserResponses(updatedResponses);
  }
  const { setItem } = useLocalStorage("sss");

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
              "You will be provided with a list of questions and answers, your job is to turn these questions and answers into 5 different career options with the job title and a short description of each career. You will format these 5 careers into a Json file and only a Json format where the Job title should be under the name {title} and the description should be called {description} and description should include median salary number",
          },
          {
            role: "user",
            content:
              "Here is a list of questions: " +
              QUESTIONS.join(", ") +
              " And here is the combined output of answers: " +
              userResponse.join(", "),
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
      {/* <h4> {detailedQuestionBank[DEFAULT_QUESTION_INDEX].question}</h4> */}
      <br></br>
      {isLoading && (
        <>
          <p>Processing Results...</p>
          <br />
          <Spinner animation="border" role="status" />
        </>
      )}
      {!isLoading && (
        <>
          <Form.Group>
            <Form.Label className="textinfo">
              {detailedQuestionBank[userIndex].question}
            </Form.Label>
          </Form.Group>
          <ProgressBar
            className="ProgressBar"
            now={((userIndex + 1) / QUESTIONS.length) * 100}
            label={`${Math.floor(((userIndex + 1) / QUESTIONS.length) * 100)}%`}
          />
          <Form.Group>
            <Form.Control
              className="textarea"
              as="textarea"
              rows={3}
              placeholder="Enter Response"
              value={userResponse[userIndex]}
              onChange={changeUserResponse}
            />
          </Form.Group>
          <div>
            <button
              type="button"
              className="prebutton"
              onClick={preQuestion}
              disabled={userIndex === 0}
            >
              Back
            </button>
            <button
              type="button"
              className="nextbutton"
              onClick={nextQuestion}
              disabled={userIndex === QUESTIONS.length - 1}
            >
              Next
            </button>
            <button
              type="button"
              className="submitButton"
              onClick={callOpenAI}
              disabled={
                userResponse.includes("") || userIndex !== QUESTIONS.length - 1
              }
            >
              Submit
            </button>
            <h4>{userResponse[userIndex]}</h4>
            <div className="api">
              <>
                <input
                  className="api"
                  placeholder="API"
                  type="text"
                  value={userApi}
                  onChange={(e) => setApi(e.target.value)}
                ></input>
              </>
              <>
                <button className="api_botton" onClick={() => setItem(userApi)}>
                  Submit
                </button>
              </>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
