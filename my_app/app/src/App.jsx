import { useState } from "react";
import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

export function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am ChatGPTasdasdasda111",
      sender: "ChatGPT",
    },
  ]);
  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };
  };

  const newMessdages = [...messages, newMessage]; //all the old messages, + the new message

  //update out message state
  setMessages(newMessdages);
  return (
    <div className="App">
      <div style={{ position: "relative", height: "800px", width: "700" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList>
              {messages.map((message, i) => {
                console.log(message);
                return <Message key={i} model={message} />;
              })}
            </MessageList>
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default App;
