import { createContext, useState, useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { AuthContext } from './Auth/authContext';
import Typography from '@mui/material/Typography';
//import imge from './images/b_withdraw.JPG'
const UserContext = createContext(null);

function MediaCard(props) {
  return (
    <>
      <Card sx={{ maxWidth:1100, display: 'flex', justifyContent: 'flex-start', columnGap: '0%', background: 'black' }} >
        <div style={{ display: 'flex', flexDirection: "column", flexGrow: 1, columnGap: '1%' }}>
          <CardContent sx={{ flexGrow: 3, marginBottom: '5%' }}>
            <Typography gutterBottom variant="h4" sx={{ color: 'white' }} component="div">
              {props.header}
            </Typography>
            <Typography variant="body2" gutterBottom variant="h5" color="text.secondary" sx={{ color: '#dc3545' }} >
              {props.title}
            </Typography>
          </CardContent>
          <CardActions sx={{ flexGrow: 2 }}>
            {console.log("Media card")}
            {props.actions}
          </CardActions>
          <div style={{ color: 'white' }}>{props.status} </div>
        </div>
        {props.media}
      </Card>
    </>
  );
}

// const UserProvider = ({ children }) => {
//     // const {auth} = useContext(AuthContext);
//     // let userInfoData = null
//     // userInfoData = JSON.parse(localStorage.getItem('userInfo'))
//     // const [userInfo, setUserInfo] = useState(userInfoData)

//     const [userInfo, setUserInfo] = useState(null)
//     const updateUserInfo = async () => {
//       localStorage.setItem('userInfo', JSON.stringify(userInfo))
//     }
//     return (
//       <UserContext.Provider value={{ updateUserInfo, userInfo, setUserInfo }}>
//         {children}
//       </UserContext.Provider>
//     )
// }

export { MediaCard };












// const styles = {
//   card: {
//     displayFlex: "column",
//     justify: "flex-column",
//     width: '50px',
//     color: 'red'

//   }
// }



// const MediaCard = (props) => {
//   return (
//     <Box sx={{display: 'flex', justifyContent:'flex-start', columnGap:'12%', background:'black'}}>
//       <Box >
//         <Typography gutterBottom variant="h4" sx={{ color: 'white' }} component="div">
//           {props.header}
//         </Typography>
//         <Button> SignUp</Button>
//         <Button> Signin</Button>
//       </Box>
//       <Box sx={{background: 'white'}}>
//         <img src={bank} width="100px" height="100px"/>
//       </Box>
//     </Box>
//   )
// }


// function Card(props){
//     function classes(){
//       const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
//       const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
//       return 'card mb-3 ' + bg + txt;
//     }

//     return (
//       <div className={classes()} style={{maxWidth: "32rem", height: "29rem"}}>
//         <div className="card-header"><h2>{props.header}</h2></div>
//         <div className="card-body">
//           <img src={bank} width="50%"/>
//           {props.title && (<h5 className="card-title">{props.title}</h5>)}
//           {props.text && (<p className="card-text">{props.text}</p>)}
//           <div>{props.body}</div>
//           {props.status && (<div id='createStatus'>{props.status}</div>)}
//         </div>
//       </div>      
//     );    
//   }