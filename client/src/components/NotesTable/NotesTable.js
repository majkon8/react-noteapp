import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import styled from "styled-components";
import { formatUpdateDate } from "../NoteApp/NoteApp";
import { withRouter } from "react-router-dom";

const IconStyles = `
  font-size: 20px;
  cursor: pointer;
  margin: 0 10px;
  opacity: 0.75;

  &:hover {
    opacity: 1;
  }

  @media(max-width: 550px) {
    margin: 0 20px;
  }
`;

const PenIcon = styled(FaPen)`
  color: #25b99a;
  ${IconStyles}
`;

const TrashIcon = styled(FaTrashAlt)`
  color: #c84646;
  ${IconStyles}
`;

const CustomTableRow = styled(TableRow)`
  && {
    cursor: pointer;
    &:hover {
      background: #ddd;
    }
  }
`;

const CustomTableCell = styled(TableCell)`
  && {
    padding-right: 5px;
    padding-left: 5px;
    text-align: center;
    text-overflow: ellipsis;
    max-width: 500px;
    white-space: nowrap;
    overflow: hidden;

    @media (max-width: 770px) {
      max-width: 300px;
    }

    @media (max-width: 700px) {
      max-width: 200px;
    }

    @media (max-width: 595px) {
      max-width: 150px;
    }

    @media (max-width: 550px) {
      max-width: 300px;
    }
  }
`;

function createData(title, content, updateDate, id) {
  return { title, content, updateDate, id };
}

const RouterTableRow = withRouter(({ history, ...props }) => (
  <CustomTableRow
    {...props}
    onClick={e => {
      if (e.target.nodeName === "svg" || e.target.nodeName === "path") return;
      history.push(`/notes/${props.id}`);
    }}
  />
));

export default function NotesTable({ notes, deleteNote, openForm }) {
  const [windowWidth, setWindowWidth] = useState();
  const [rows, setRows] = useState();

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.onresize = () => {
      setWindowWidth(window.innerWidth);
    };
  }, []);

  useEffect(() => {
    if (typeof notes === "undefined") return;
    const rows = notes.map(note =>
      createData(
        note.title,
        note.content,
        formatUpdateDate(note.lastUpdate),
        note._id
      )
    );

    setRows(rows);
  }, [notes]);
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <CustomTableCell />
            <CustomTableCell>Title</CustomTableCell>
            {windowWidth > 550 && (
              <>
                <CustomTableCell>Content</CustomTableCell>
                <CustomTableCell>Last Update</CustomTableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map(row => (
              <RouterTableRow id={row.id} key={row.id}>
                <CustomTableCell>
                  <PenIcon id={row.id} title="Edit note" onClick={openForm} />
                  <TrashIcon
                    id={row.id}
                    title="Delete note"
                    onClick={deleteNote}
                  />
                </CustomTableCell>
                <CustomTableCell>{row.title}</CustomTableCell>
                {windowWidth > 550 && (
                  <>
                    <CustomTableCell>{row.content}</CustomTableCell>
                    <CustomTableCell>{row.updateDate}</CustomTableCell>
                  </>
                )}
              </RouterTableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
