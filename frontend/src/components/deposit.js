import { useContext, useState } from 'react';
import { MediaCard } from '../contexts/context';
import { AuthContext } from '../contexts/Auth/authContext';

import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button'
import { InputLabel } from '@mui/material';
import imge from './images/b_deposit.JPG'
import imge_s from './images/b_signup_s.JPG'
import { transactionsAPI } from '../services';


function Deposit() {

  const { userInfo, saveUserInfo } = useContext(AuthContext);
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');
  const [depositAmount, setDepositAmount] = useState(0);


  function validate(field, label) {

    if (!field || field <= 0 || field > 10000) {
      setDepositAmount(0);
      setStatus('Error: ' + label + 'Amount should be between $1 & $10000')
      setTimeout(() => setStatus(''), 6000);
      // alert('Amount should be between 1 & 10000')
      return false;
    }
    return true;
  }

  let handleCreate = async () => {
    console.log("deposit amount", depositAmount);
    if (!validate(depositAmount, 'Invalid transaction. ')) return;
    console.log("userinfo balance", userInfo.balance)
    let newBalance = Number(userInfo.balance) + Number(depositAmount);
    console.log(userInfo._id)
    await transactionsAPI.updateUser(userInfo._id, {balance: newBalance});
    console.log("userinfo balance after UPDATE", userInfo.balance)
    userInfo.balance = newBalance;
    console.log("local storage userinfo balance", userInfo.balance)
    await saveUserInfo(userInfo._id);
    console.log("userinfo balance after GET Call", userInfo.balance)
    setShow(false);
  }
  function clearForm() {
    setDepositAmount(0);
    setShow(true);
  }

  if (show) {
    return <MediaCard
      header="Deposit"
      title={`Latest Account Balance: ${userInfo.balance} `}
      status={status}
      media={
        <CardMedia
          component="img"
          image={imge}
          sx={{ flexGrow: 1, flexBasis: 0 }}
          alt="Deposit page" />
      }
      actions={
        <div>
          <InputLabel>Deposit Amount </InputLabel>
          <input type="number" className="form-control" id="name" placeholder="Enter Amount" value={depositAmount} onChange={e => setDepositAmount(e.currentTarget.value)} /><br />
          <Button variant='contained' type="submit" color='primary' onClick={handleCreate}>Deposit Now</Button>
        </div>
      }
    />
  } else {

    return <MediaCard
      header="Success"
      title={`Latest Account Balance: ${userInfo.balance} `}
      media={
        <CardMedia
          component="img"
          image={imge_s}
          sx={{ flexGrow: 0, flexBasis: 0 }}
          alt="Deposit page" />
      }
      actions={
        <div>
          <Button variant='contained' type="submit" onClick={clearForm}>Want to deposit more?</Button>
        </div>
      }
    />
  }

}

export { Deposit };