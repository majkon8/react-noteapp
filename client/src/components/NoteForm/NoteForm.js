import React, { useState, useEffect } from "react";
import styled from "../../../node_modules/styled-components";
import { MdNoteAdd } from "react-icons/md";
import { FaTimes, FaRegSave } from "react-icons/fa";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#25b99a"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#25b99a"
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#25b99a"
      }
    }
  }
})(TextField);

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`;

const FormContainer = styled.div`
  width: 90%;
  background: white;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 90px;
  padding: 20px;
  border-radius: 3px;

  @media (max-width: 500px) {
    padding: 10px;
  }
`;

const Form = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  padding: 10px;
  box-sizing: border-box;

  span {
    font-size: 18px;
  }
`;

const NoteAddIcon = styled(MdNoteAdd)`
  font-size: 24px;
  position: relative;
  top: 3px;
  color: #25b99a;
`;

const CustomIconButton = styled(IconButton)`
  && {
    position: absolute;
    right: 25px;
    top: 25px;
    color: #c84646;

    @media (max-width: 500px) {
      top: 15px;
      right: 15px;
    }
  }
`;

const FieldsContainer = styled.div`
  text-align: center;
  margin-top: 10px;
`;

const CustomField = styled(CssTextField)`
  && {
    width: 90%;
    margin: 10px 0;
  }
`;

const ButtonContainer = styled.div`
  height: 43px;
  width: 90%;
  display: flex;
  justify-content: flex-end;
  margin: 10px auto;
`;

const StyledButton = styled(Button)`
  && {
    width: 100px;
    background: #25b99a;
    color: white;
    text-transform: none;

    &:hover {
      background: #1d957b;
    }
  }
`;

const SaveIcon = styled(FaRegSave)`
  position: relative;
  bottom: 2px;
  right: 5px;
`;

export default function NoteForm({
  toggleForm,
  addNote,
  selectedNote,
  getNote,
  updateNote
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (selectedNote === null) return;
    getNote(selectedNote).then(note => {
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags);
    });
  }, []);

  const hideForm = e => {
    if (e.target === e.currentTarget) {
      toggleForm();
    }
  };

  const handleChange = e => {
    switch (e.target.name) {
      case "title":
        setTitle(e.currentTarget.value);
        break;
      case "content":
        setContent(e.currentTarget.value);
        break;
      case "tags":
        setTags(e.currentTarget.value);
        break;
    }
  };

  const addNoteHandler = () => {
    addNote(title, content, tags).then(toggleForm());
  };

  const updateNoteHandler = () => {
    updateNote(selectedNote, title, content, tags).then(toggleForm());
  };

  const addOrUpdateHandler = async () => {
    const errors = await addErrors();
    if (errors.length === 0) {
      selectedNote === null ? addNoteHandler() : updateNoteHandler();
    }
  };

  const addErrors = () => {
    const errors = [];
    if (title.trim() === "") errors.push("Title is required");
    if (content.trim() === "") errors.push("Content is required");
    setErrors(errors);
    return errors;
  };

  return (
    <Container onClick={hideForm}>
      <FormContainer>
        <Form>
          <span>
            <NoteAddIcon />
            New Note
          </span>
          <CustomIconButton onClick={toggleForm}>
            <FaTimes />
          </CustomIconButton>
          {errors.map(error => (
            <ErrorMessage errorText={error} />
          ))}
          <FieldsContainer>
            <CustomField
              name="title"
              label="Title"
              variant="outlined"
              value={title}
              onChange={handleChange}
              inputProps={{
                maxLength: 20
              }}
            />
            <CustomField
              name="content"
              variant="outlined"
              label="Content"
              multiline={true}
              rows={3}
              rowsMax={10}
              value={content}
              onChange={handleChange}
            />
            <CustomField
              name="tags"
              label="Tags"
              variant="outlined"
              value={tags}
              onChange={handleChange}
            />
          </FieldsContainer>
          <ButtonContainer>
            <StyledButton variant="contained" onClick={addOrUpdateHandler}>
              <SaveIcon />
              Save
            </StyledButton>
          </ButtonContainer>
        </Form>
      </FormContainer>
    </Container>
  );
}
