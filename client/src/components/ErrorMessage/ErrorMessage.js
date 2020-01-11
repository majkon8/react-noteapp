import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  height: 40px;
  background: #ffb3b3;
  margin: 10px auto;
  line-height: 20px;
  box-sizing: border-box;
  padding: 10px 14px;
  text-align: left;
  color: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
`;

export default function ErrorMessage({ errorText }) {
  return <Container>{errorText}</Container>;
}
