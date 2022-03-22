import { UserContext, MediaCard } from '../contexts/context';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button'
import { InputLabel } from '@mui/material';

import imge from './NavBar/logo2.JPG'

function Home(){
  return (
    <> 
      <MediaCard
        header="Best Bank Landing Page"
        title= "Welcome to our bank!!"
        media={
        <CardMedia
          component="img"
          image={imge}
          sx={{flexGrow: 1, flexBasis: 0}}
          alt="Home page"/>
        }
        actions = { <div style={{color: 'white'}}><h4 > We value our customers!!! <br/> Explore various features <br/>as we keep enhancing <br/> our application to provide<br/> best user experience.</h4></div>}
      />
    
    </>  
  );  
}

export {Home};