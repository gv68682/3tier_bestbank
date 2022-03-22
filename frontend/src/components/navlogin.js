import {useContext, useState} from 'react';
import { AuthContext } from '../contexts/Auth/authContext';
import { MediaCard } from '../contexts/context';

import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button'
import { InputLabel } from '@mui/material';
import imge from './images/b_login.JPG'
import imge1 from './images/b_bank.JPG'
import imge_s from './images/b_signup_s.JPG'

function NavLogin(){

    const { login } = useContext(AuthContext)
    const {userInfo} = useContext(AuthContext);
    const {auth} = useContext(AuthContext);
 
    const [show, setShow]         = useState(true);
    const [status, setStatus]     = useState('');
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');

    function validate(field, label){
        if (!field) {
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''),3000);
            return false;
        }
        return true;
    }

  async function handleSubmit(){
    console.log(email,password);
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;
    if (await login(email, password) === false) {
      setStatus('Wrong Credentials!')
    }
  }    

if(!auth) {
    return <MediaCard
    header="Login"
    media={
      <CardMedia
        component="img"
        image={imge}
        sx={{flexGrow: 1, flexBasis: 0}}
        alt="Login page"/>
    }
    actions={
      <div>
        <InputLabel>Email Adress </InputLabel>
        <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br />
        <InputLabel>Password </InputLabel>
        <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)} /><br />
        <Button variant='contained' type="submit" color='primary' onClick={handleSubmit}>Login</Button> 
        {/* disabled={!validation}  */}
      </div>
    }
    status={status}
    /> 
  } else {

    return <MediaCard
        header="You are already logged in!!!"
        media={
            <CardMedia
              component="img"
              image={imge_s}
              sx={{flexGrow: 1, flexBasis: 0}}
              alt="Login page"/>
        }
    />
  }
}
 export { NavLogin };