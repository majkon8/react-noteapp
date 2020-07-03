import React from "../../../node_modules/react";
import styled from "../../../node_modules/styled-components";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AddCircle from "@material-ui/icons/AddCircle";
import Clear from "@material-ui/icons/Clear";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";

const Container = styled.div`
  margin-bottom: 30px;
`;

const CssTextField = withStyles({
  root: {
    "& .MuiInput-underline:after": {
      borderBottomColor: "#25b99a",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#25b99a",
      },
    },
    "& .MuiSvgIcon-root": {
      fontSize: "30px",
      color: "rgba(0, 0, 0, 0.54)",
    },
  },
})(FormControl);

const StyledInput = styled(CssTextField)`
  && {
    width: 80%;
    margin: 0 10px;

    div {
      height: 50px;
    }

    input {
      height: 50px;
      padding-right: 30px;
    }

    @media (max-width: 700px) {
      width: 70%;
    }

    @media (max-width: 333px) {
      width: 60%;
    }

    &:label.Mui-focused {
      color: green;
    }
  }
`;

const AddIconButton = styled(IconButton)`
  && {
    width: 60px;
    height: 60px;
    position: relative;
    bottom: 2px;

    &:hover {
      svg {
        color: #25b99a;
      }
    }

    svg {
      font-size: 40px;
      position: relative;
    }

    @media (max-width: 470px) {
      width: 40px;
      height: 40px;
      top: 8px;

      svg {
        font-size: 30px;
        bottom: 7px;
      }
    }
  }
`;

const ClearIconButton = styled(IconButton)`
  && {
    position: relative;
    right: 40px;
    bottom: 5px;
    padding: 8px;

    &:hover {
      svg {
        color: #25b99a;
      }
    }

    @media (max-width: 470px) {
      bottom: 0;
      top: 5px;
    }
  }
`;

const SearchBar = ({ toggleForm, changeHandler, filter, clearFilter }) => (
  <Container>
    <AddIconButton title="Add note" onClick={toggleForm}>
      <AddCircle />
    </AddIconButton>
    <StyledInput>
      <Input
        value={filter}
        onChange={changeHandler}
        placeholder="Search for a note..."
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </StyledInput>
    <ClearIconButton disabled={filter.length === 0} onClick={clearFilter}>
      <Clear />
    </ClearIconButton>
  </Container>
);

export default SearchBar;
