import React, { useState, useEffect } from "react";
import { styled } from "@material-ui/styles";
import { Link, useParams } from "react-router-dom";
import { Sidebar } from "../../components";
import { ArrowBackIos } from "@material-ui/icons";
import Pusher from "pusher-js";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";

import AuthService from "../../services/Auth";
import MessagesService from "../../services/messages";
import { useStateValue } from "../../redux/state-provider";

export default function Conversations() {
  const [{ user }] = useStateValue();
  const [contact, setContact] = useState({});
  const [messages, setMessages] = useState(null);
  const [input, setInput] = useState("");

  let { id } = useParams();

  useEffect(() => {
    AuthService.GetUserDetails(id).then(({ data }) => {
      setContact(data);
    });

    MessagesService.SyncMessages().then(({ data: messages }) => {
      const filteredMessages = messages.filter(
        (message) =>
          (message.sender === user._id && message.recipient === id) ||
          (message.sender === id && message.recipient === user._id)
      );
      setMessages(filteredMessages);
    });
  }, [id, user._id]);

  useEffect(() => {
    const pusher = new Pusher("229afceab059fd11ec1e", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("messages");

    channel.bind("inserted", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  const checkReceiver = (message) => {
    let status;

    if (message.sender === user._id) {
      status = "posted";
    } else {
      status = "received";
    }

    return status;
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const newMessage = { sender: user._id, recipient: id, message: input };
    MessagesService.SendMessage(newMessage);
    setInput("");
  };

  return (
    <>
      <Sidebar />
      <Main>
        <Container>
          <Chat variant="outlined">
            <ChatHeader>
              <Link to="/dashboard/messages">
                <IconButton>
                  <ArrowBackIos />
                </IconButton>
              </Link>

              <RecipientInfo>
                <Typography variant="h6">{contact.fullName}</Typography>
              </RecipientInfo>
            </ChatHeader>

            <ChatBody>
              {messages &&
                messages.map((m) => {
                  return (
                    <Message
                      key={m._id}
                      message={m.message}
                      timestamp={m.created_at}
                      image={contact.image}
                      status={checkReceiver(m)}
                    />
                  );
                })}
            </ChatBody>
            <form>
              <Box m={1}>
                <TextField
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  color="primary"
                  label="Type a message"
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Box>

              <Button
                type="submit"
                onClick={sendMessage}
                style={{ display: "none" }}
              />
            </form>
          </Chat>
        </Container>
      </Main>
    </>
  );
}

function Message({ message, image, timestamp, status }) {
  return (
    <Box display="flex" alignItems="flex-end" mb={2}>
      {status === "received" && <ChatAvatar src={image} />}
      <ChatMessage status={status}>{message}</ChatMessage>
    </Box>
  );
}

const Main = styled("main")({
  height: "calc(100vh - 56px)",
  paddingTop: "16px",
});

const Chat = styled(Card)({});

const ChatHeader = styled(CardContent)({
  display: "flex",
  alignItems: "center",
  borderBottom: "1px solid rgb(233, 233, 233)",
});

const RecipientInfo = styled("div")({
  marginLeft: "1rem",

  "& > h6": {
    fontWeight: "bold",
  },
});

const ChatBody = styled(Box)({
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "calc(100vh - 300px)",
  overflowY: "scroll",
});

const ChatAvatar = styled(Avatar)({
  marginRight: "8px",
});

const ChatMessage = styled(Typography)(({ theme, status }) => ({
  wordWrap: "break-word",
  fontSize: "16px",
  padding: "10px",
  maxWidth: "256px",
  borderRadius:
    status === "posted" ? "10px 10px 1px 10px" : "10px 10px 10px 1px",
  marginLeft: status === "posted" && "auto",
  background: status === "posted" ? "#21b7fb" : "#e6e6e6",
  color: status === "posted" ? "white" : "black",
}));
