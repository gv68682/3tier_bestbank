import { useContext, useState } from 'react';
import { MediaCard } from '../contexts/context';
import { AuthContext } from '../contexts/Auth/authContext';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button'
import { InputLabel } from '@mui/material';
import imge from './images/b_withdraw1.JPG'
import imge_s from './images/b_signup_s.JPG'
import { transactionsAPI } from '../services';

function Withdraw() {

  const { userInfo, saveUserInfo } = useContext(AuthContext);
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState(0);


  function validate(field, label) {

    if (userInfo.balance == "null" || !field || field <= 0 || field > userInfo.balance ) {
      console.log("balance", userInfo.balance)
      setWithdrawAmount(0);
      setStatus('Error: ' + label + 'Amount should be between $1 & Account balance')
      console.log("balance",userInfo.balance)
      setTimeout(() => setStatus(''), 6000);
      return false;
    }
    return true;
  }

  let handleWithdraw = async () => {
    console.log("withdrawAmount  " , withdrawAmount);
    if (!validate(withdrawAmount, 'Invalid transaction. ')) return;

    let newBalance = Number(userInfo.balance) - Number(withdrawAmount);
    await transactionsAPI.updateUser(userInfo._id, {balance: newBalance});
    userInfo.balance = newBalance;
    await saveUserInfo(userInfo._id);
    setShow(false);
  }

  function clearForm() {
    setWithdrawAmount(0);
    setShow(true);
  }

  if (show) {
    return <MediaCard
      header="Withdraw"
      title={`Latest Account Balance: ${userInfo.balance} `}
      status={status}
      media={
        <CardMedia
          component="img"
          image={imge}
          sx={{ maxWidth: 500, flexGrow: 1, flexBasis: 0 }}
          alt="withdraw page" />
      }
      actions={
        <div>
          <InputLabel>Withdraw Amount </InputLabel>
          <input type="number" className="form-control" id="name" placeholder="Enter Amount" value={withdrawAmount} onChange={e => setWithdrawAmount(e.currentTarget.value)} /><br />
          <Button variant='contained' type="submit" color='primary' onClick={handleWithdraw}>Withdraw Now</Button>
        </div>
      }
      status={status}
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
          alt="Withdraw page" />
      }
      actions={
        <div>
          <Button variant='contained' type="submit" onClick={clearForm}>Want to withdraw more?</Button>
          {/* <div>  {status}</div> */}
        </div>
      }
      status={status}
    />
  }
}

export { Withdraw };