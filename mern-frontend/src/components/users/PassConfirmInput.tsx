import { useEffect, useState } from 'react';
import { PasswordInput, Tooltip } from '@mantine/core';

export default function PassConfirmInput({password, strength, confirmReturn}) {
  const [focused, setFocused] = useState(false);
  const [conpwd, setConpwd] = useState('');


  useEffect(()=>{
    password ? password===conpwd ? confirmReturn(false) : confirmReturn(true) : void 0
    // eslint-disable-next-line
  },[conpwd, password])
  
  return (
    <>
    { strength===100 && 
    <PasswordInput
      label= "Confirm Password"
      placeholder="Confirm password again..."
      error= {focused ? !password ? 'Empty Password is not allowed' : void 0 : void 0}
      withAsterisk
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onChange={(e)=>setConpwd(e.target.value)}
      inputContainer={(children) =>(
        <Tooltip label={password!==conpwd ? 'Password does not match' : 'Password matched'}
        color = {password!==conpwd ? 'red' : 'green' }
        position="bottom-start" opened={focused}>
          {children}
        </Tooltip>
      )}
    />
    }
    </>
  );
}