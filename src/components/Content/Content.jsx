import React, {useContext} from 'react'
import { Button } from '@mui/material';
	
import { SnackbarContext } from '../../Context/SnackbarContext';

const Content = () => {
  const { setSnackbar } = useContext(SnackbarContext);
  // const handleClick = () => {
  //   console.log(setSnackbar);
  //   setSnackbar('Message test');
  // };

  return (
    <div>
      <Button onClick={()=>setSnackbar('Message test', "success")}>Open simple snackbar</Button>
    </div>  
  )
}

export default Content