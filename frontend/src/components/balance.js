import { useContext, useState } from 'react';
import { MediaCard } from '../contexts/context';
import { AuthContext } from '../contexts/Auth/authContext';

import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button'
import { InputLabel } from '@mui/material';
import imge from './images/b_balance.JPG'
import imge_s from './images/b_signup_s.JPG'
import { transactionsAPI } from '../services';


function Balance() {

  const { userInfo, saveUserInfo } = useContext(AuthContext);
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');
  const {auth} = useContext(AuthContext);

  function validate(field, label) {

    if (!field) {
      setStatus('Error: '+ label + '  is mandatory field!!')
      setTimeout(() => setStatus(''), 6000);
      return false;
    }
    return true;
  }

 let handleSubmit = async () => {
    console.log("Account Balance", userInfo.balance);
    console.log(userInfo.email)
    console.log(email)
    if (!validate(email, 'Email')) return;
    if (email !== userInfo.email){
        setStatus('Error: '+ "Entered email doesn't belong to you!")
        setTimeout(() => setStatus(''), 5000);
        setTimeout(() =>  clearForm(), 5000);
        return false;      
    }
      let response = await   saveUserInfo(userInfo._id);
      console.log("Current user balance:" , response)
      setShow(false);
  }
  function clearForm() {
    setEmail('');
    setShow(true);
  }

  if (show) {
    return <MediaCard
      header="Check Balance"
      status={status}
      media={
        <CardMedia
          component="img"
          image={imge}
          sx={{ flexGrow: 1, flexBasis: 0 }}
          alt="Balance page" />
      }
      actions={
        <div>
          <InputLabel>Email</InputLabel>
          <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br />
          <Button variant='contained' type="submit" color='primary' onClick={handleSubmit}>Balance</Button>
        </div>
      }
    />
  } else {

    return <MediaCard
      header= {`Latest Account Balance: ${userInfo.balance} `}
      title= {<h5>"You can also see account balance <br/> from deposit or withdraw sections."</h5>}
      media={
        <CardMedia
          component="img"
          image={imge_s}
          sx={{ flexGrow: 0, flexBasis: 0 }}
          alt="Balance page" />
      }
      actions={
        <div>
          <Button variant='contained' type="submit" onClick={clearForm}>Want to check balance again?</Button>
        </div>
      }
    />
  }

}

// function BalanceMsg(props){
//   return(<>
//     <h5>Success</h5>
//     <button type="submit" 
//       className="btn btn-light" 
//       onClick={() => props.setShow(true)}>
//         Check balance again
//     </button>
//   </>);
// }

// function BalanceForm(props){
//   const [email, setEmail]   = useState('');
//   const [balance, setBalance] = useState('');  
//   const ctx = useContext(UserContext);  

//   function handle(){
//     const user = ctx.users.find((user) => user.email == email);
//     if (!user) {
//       props.setStatus('fail!')      
//       return;      
//     }

//     setBalance(user.balance);
//     console.log(user);
//     props.setStatus('Your balance is: ' + user.balance);      
//     props.setShow(false);
//   }

//   return (<>

//     Email<br/>
//     <input type="input" 
//       className="form-control" 
//       placeholder="Enter email" 
//       value={email} 
//       onChange={e => setEmail(e.currentTarget.value)}/><br/>

//     <button type="submit" 
//       className="btn btn-light" 
//       onClick={handle}>
//         Check Balance
//     </button>

//   </>);
// }

export { Balance };