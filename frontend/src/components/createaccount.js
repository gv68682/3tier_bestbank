import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/Auth/authContext';
import {MediaCard } from '../contexts/context';

import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button'
import { InputLabel } from '@mui/material';
import imge from './images/b_signup3.JPG'
import imge_s from './images/b_signup_s.JPG'

function CreateAccount() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState(false);

  const {auth} = useContext(AuthContext);
  const { signup } = useContext(AuthContext)
  const {userInfo} = useContext(AuthContext);
 // const ctx = useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      setStatus('Error: ' + label + '  is mandatory field!!');
      return false;
    }
    return true;
  }

  function pwdVal(field, onlyClear) {
    if (field.length < 8) {
      if (!onlyClear) setStatus('Error: Password field must contain 8 or more characters');
      return false
    }
    setStatus('');
    return true
  }

  function formValidate() {
    pwdVal(password, true);
    if (name.length > 0 && email.length > 0 && password.length > 0) { setValidation(true); }
    else setValidation(false);
  }

  useEffect(() => {
    formValidate();
  }, [name, email, password]);

  function handleCreate() {
    console.log(name, email, password);
    if (!validate(name, 'Name')) return;
    if (!validate(email, 'Email')) return;
    if (!pwdVal(password)) return;
   // ctx.users.push({ name, email, password, balance: 100 });
    setShow(false);
    signup(name, email, password)
    console.log("about to go to authContext signup function")
  }

  function clearForm() {
    setName('');
    setEmail('');
    setPassword('');
    setValidation(false);
    setShow(true);
  }

  if(!auth) {
    return <MediaCard
    header="Create Account"
    status={status}
    media={
      <CardMedia
        component="img"
        image={imge}
        sx={{flexGrow: 1, flexBasis: 0}}
        alt="green iguana"/>
    }
    actions={
      <div>
        <InputLabel>Name </InputLabel>
        <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br />
        <InputLabel>Email Adress </InputLabel>
        <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br />
        <InputLabel>Password </InputLabel>
        <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)} /><br />
        <Button variant='contained' type="submit" color='primary' disabled={!validation} onClick={handleCreate}>Create Account</Button>
      </div>
    }
    /> 
  } else {

    return <MediaCard
        header="Success"
        title= "Created new account"
        media={
        <CardMedia
          component="img"
          image={imge_s}
          sx={{flexGrow: 0, flexBasis: 0}}
          alt="green iguana"/>
        }
        actions={
          <div>
            <Button variant='contained' type="submit"  onClick={clearForm}>Add another account</Button>
          </div>
        }
    />
  }
}
export { CreateAccount };
