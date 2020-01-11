import React, { useState, useEffect } from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import { FaArrowLeft } from "react-icons/fa";
import * as noteApi from "../../helpers/noteApi";
import { formatUpdateDate } from "../NoteApp/NoteApp";
import { withRouter, Redirect } from "react-router-dom";

const Container = styled.div`
  text-align: center;
  color: rgba(0, 0, 0, 0.87);
  width: 90%;
  margin: 0 auto;
`;

const Button = styled(IconButton)`
  && {
    position: absolute;
    top: 85px;
    left: 5px;

    &:hover {
      color: #25b99a;
    }
  }
`;

const NoteContainer = styled.div`
  margin-top: 55px;
`;

const Break = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  width: 100%;
`;

const TitleDiv = styled.div`
  position: relative;
  top: 19px;
  font-style: italic;
  @media (max-width: 500px) {
    text-align: left;
  }
`;

const DateDiv = styled.div`
  float: right;
  font-style: italic;
`;

const Clear = styled.div`
  clear: both;
`;

const ContentDiv = styled.div`
  text-align: left;
`;

const TagsDiv = styled.div`
  text-align: left;
  font-size: 14px;
`;

const RouterButton = withRouter(({ history }) => (
  <Button
    onClick={() => {
      history.push("/");
    }}
  >
    <FaArrowLeft />
  </Button>
));

export default function Note(props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    noteApi.get(props.match.params.id).then(response => {
      if (response === 404 || response === 500) {
        setError(true);
        return;
      }
      setTitle(response.title);
      setDate(formatUpdateDate(response.lastUpdate));
      setContent(response.content);
      setTags(response.tags);
    });
  });

  return (
    <Container>
      {error && <Redirect to="/" />}
      <RouterButton />
      <NoteContainer>
        <TitleDiv>{title}</TitleDiv>
        <DateDiv>{date}</DateDiv>
        <Clear />
        <Break />
        <ContentDiv>{content}</ContentDiv>
        <Break />
        <TagsDiv>{tags}</TagsDiv>
      </NoteContainer>
    </Container>
  );
}
