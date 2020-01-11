import React from "../../../node_modules/react";
import styled from "../../../node_modules/styled-components";
import { FaEvernote } from "../../../node_modules/react-icons/fa";

const HeaderDiv = styled.header`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: rgb(50, 60, 60);
  font-size: 30px;
  color: #25b99a;
  font-weight: 400;
  margin-bottom: 40px;
  span {
    margin-left: 5px;
  }
`;

const NoteIcon = styled(FaEvernote)`
  font-size: 60px;
  margin-right: 5px;
  color: #25b99a;
`;

const Header = () => (
  <HeaderDiv>
    <NoteIcon />
    <span>NoteApp</span>
  </HeaderDiv>
);

export default Header;
