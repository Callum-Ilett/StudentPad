import React, { useState, useEffect } from "react";
import { styled } from "@material-ui/styles";
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar";

import {
  Avatar,
  Box,
  Card,
  Container,
  ListItem,
  Typography,
} from "@material-ui/core";

import AuthService from "../../services/Auth";
import { useStateValue } from "../../redux/state-provider";

export default function Messages() {
  const [contacts, setContacts] = useState([]);
  const [contactInfo, setContactInfo] = useState([]);

  const [{ user }] = useStateValue();

  useEffect(() => {
    AuthService.GetUserDetails(user._id).then(({ data }) => {
      setContacts(data.contact_list);
    });
  }, [user._id]);

  useEffect(() => {
    contacts &&
      contacts.forEach((contact) => {
        AuthService.GetUserDetails(contact).then(({ data }) => {
          setContactInfo((prevState) => [...prevState, data]);
        });
      });
  }, [contacts]);

  return (
    <>
      <Sidebar />
      <Main>
        <Container>
          <Typography variant="h6" gutterBottom>
            Contacts
          </Typography>
          <Contacts variant="outlined">
            {contacts.length > 0 ? (
              contactInfo.map((contact) => {
                return (
                  <Contact
                    key={contact._id}
                    id={contact._id}
                    name={contact.fullName}
                    profileImage={contact.image}
                  />
                );
              })
            ) : (
              <>
                <Typography>
                  No contacts, search for properties and find a landlord
                </Typography>

                <Link to="/">Search for properties</Link>
              </>
            )}
          </Contacts>
        </Container>
      </Main>
    </>
  );
}

function Contact({ id, name, profileImage, message }) {
  return (
    <Link to={`/dashboard/messages/${id}`}>
      <ListItem component={Box} mt={0.5} mb={0.5} button>
        <Box display="flex" alignItems="center">
          <Avatar src={profileImage} />

          <ContactInformation>
            <ContactName color="textPrimary">{name}</ContactName>
            <LastMessage color="textSecondary" noWrap>
              {message}
            </LastMessage>
          </ContactInformation>
        </Box>
      </ListItem>
    </Link>
  );
}

const Main = styled("main")({
  height: "calc(100vh - 56px)",
  paddingTop: "16px",
});

const Contacts = styled(Card)({});

const ContactInformation = styled("div")(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

const ContactName = styled(Typography)({
  fontWeight: "bold",
});

const LastMessage = styled(Typography)({
  width: "248px",
});
