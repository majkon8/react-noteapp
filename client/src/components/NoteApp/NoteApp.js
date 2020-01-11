import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import styled from "../../../node_modules/styled-components";
import NotesTable from "../NotesTable/NotesTable";
import NoteForm from "../NoteForm/NoteForm";
import * as noteApi from "../../helpers/noteApi";

const Container = styled.div`
  text-align: center;
  width: 70%;
  margin: 0 auto;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

export function formatUpdateDate(dateTime) {
  const date = new Date(dateTime);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}

export default function NoteApp() {
  const [notes, setNotes] = useState();
  const [filteredNotes, setFilteredNotes] = useState();
  const [isForm, setIsForm] = useState(false);
  const [selectedNoteToEdit, setSelectedNoteToEdit] = useState(null);
  const [filterString, setFilterString] = useState("");

  useEffect(() => showAllNotes(), []);

  useEffect(() => setFilteredNotes(notes), [notes]);

  useEffect(() => filterNotes(), [filterString]);

  const showAllNotes = () => {
    noteApi.getAll().then(result => {
      // if type of result is number then something went wrong and result is status code number e.g 500
      if (typeof result === "number") return;
      setNotes(result)});
  };

  const deleteNote = async e => {
    await noteApi.destroy(e.currentTarget.id);
    showAllNotes();
  };

  const getNote = id => noteApi.get(id);

  const addNote = async (title, content, tags) => {
    noteApi
      .create({
        title: title,
        content: content,
        tags: tags
      })
      .then(() => showAllNotes());
    setFilterString("");
  };

  const updateNote = async (id, title, content, tags) => {
    noteApi
      .update(id, {
        title: title,
        content: content,
        tags: tags
      })
      .then(() => showAllNotes());
  };

  const toggleForm = () => {
    setSelectedNoteToEdit(null);
    setIsForm(!isForm);
  };

  const openFormForEdit = e => {
    toggleForm();
    setSelectedNoteToEdit(e.currentTarget.id);
  };

  const updateFilter = e => {
    setFilterString(e.currentTarget.value.toLowerCase());
  };

  const clearFilter = () => {
    setFilterString("");
  };

  const filterNotes = () => {
    if (typeof notes === "undefined") return;
    const filteredNotes = notes.filter(
      note =>
        note.title.toLowerCase().includes(filterString) ||
        note.tags.toLowerCase().includes(filterString) ||
        formatUpdateDate(note.lastUpdate).includes(filterString)
    );
    setFilteredNotes(filteredNotes);
  };

  return (
    <Container>
      <SearchBar
        toggleForm={toggleForm}
        changeHandler={updateFilter}
        filter={filterString}
        clearFilter={clearFilter}
      />
      <NotesTable
        notes={filteredNotes}
        deleteNote={deleteNote}
        openForm={openFormForEdit}
      />
      {isForm && (
        <NoteForm
          toggleForm={toggleForm}
          addNote={addNote}
          selectedNote={selectedNoteToEdit}
          getNote={getNote}
          updateNote={updateNote}
        />
      )}
    </Container>
  );
}
