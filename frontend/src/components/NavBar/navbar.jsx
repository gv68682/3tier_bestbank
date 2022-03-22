import styled from "styled-components";
import logo from "./logo2.JPG";
import { AuthContext } from '../../contexts/Auth/authContext';
import {useContext} from 'react';

const Container = styled.nav`
  background-color: black;
  align-self: stretch;
`;
const Logo = styled.img`
  padding: 16px;
  width: 80px;
`;
const List = styled.ul`
  list-style-type: none;
  padding: 2px 0;
  margin: 0;
`;

const Item = styled.li`
  padding: 16px 24px;
  a {
    text-decoration: none;
    color: ${(props) => {
      return props.active ? "#dc3545" : "white";
    }};
    font-weight: ${(props) => (props.active ? "bold" : "normal")};
  }
`;

const NavBar = (props) => {
  
  const {userInfo,  logout, auth} = useContext(AuthContext);
  return (
    <Container>
      <Logo src={logo} />

      <List>
        <Item active>
          <a href="/">
            <b>Best Bank</b>
          </a>
        </Item>
        <Item>
          { !auth ? <a href="#/createAccount">Create Account</a> : <div style={{color: 'blue'}}>{`Welcome ${auth.name}`}</div>}
        </Item>
        <Item>
          { !auth ? <a href="#/login">Login</a>  : <span style={{color: 'blue'}}>{userInfo.email}</span>}
        </Item>
        <Item>
          {auth ? <a href="#/deposit">Deposit</a> : <></>}
        </Item>
        <Item>
          {auth ? <a href="#/withdraw">Withdraw</a> : <></>}
        </Item>
        <Item>
            {auth ? <a href="#/balance">Balance</a> : <></>}
        </Item>
        <Item>
            {auth ? <a href="#/alldata">All Data</a> : <></>}
        </Item>
        {auth ? <Item onClick={logout}> <a href="/login"> Log Out </a> </Item> : <></>}
        {/* <Item onClick={logout}>Log out</Item> */}
      </List>
    </Container>
  );
};

export { NavBar };
