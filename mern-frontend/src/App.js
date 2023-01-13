import './App.css';
import {BrowserRouter as Router , Routes , Route, Navigate} from 'react-router-dom'
import Login from './components/users/login/Login';
import Signup from './components/users/Signup';
import ForgotPassword from './components/users/ForgotPassword';
import ResetPassword from './components/users/ResetPassword';
import ManageUser from './components/admin/ManageUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmailVerification from './components/users/EmailVerification';
import UserProfile from './components/users/UserProfile';
import Home from './components/Home';
import { MantineProvider, ColorSchemeProvider} from '@mantine/core'
import { HeaderMegaMenu } from './components/Header/HeaderMegaMenu';
import { useEffect, useState } from 'react';
import FourOFour from './components/FourOFour'
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import { UserProfileGetDetailAPI } from './APIs/UserProfileAPI';
import { PassportLoginGetAPI } from './APIs/PassportLoginGetAPI';
import UserState from './components/Context/UserContext';
import Products from './components/Products/Products';
import Contact from './components/Contact';

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage({key: 'color-scheme', defaultValue: 'light'});
  const toggleColorScheme = ()=>{
    colorScheme==='dark' ? setColorScheme('light') : setColorScheme('dark')
  };

  const [user, setUser] = useState(false)
  const email = localStorage.getItem('email') ? localStorage.getItem('email') : false;

  useEffect(()=>{
    if(email) { //if email found on localstorage, get users detail
      UserProfileGetDetailAPI(email) 
      .then(function (response) {
        setUser(response.data.user)
      })
      .catch((e)=>console.log(e))
    } else { //if user tried to login with passport.js
      PassportLoginGetAPI()
      .then(response=>{
        setUser(response.data.user)
        localStorage.setItem("token", response.data.authtoken);
        localStorage.setItem("email", response.data.user.email);
      })
      .catch(e=>console.log(e));
    }
    // eslint-disable-next-line
  },[])
  
  useHotkeys([['mod+J', ()=> toggleColorScheme()]])  //CTRL + J in windows
  
return (
    <>
    <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={colorScheme}
      />

<Router>
  <UserState>
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider position='top-right' autoClose={2500}>
            <HeaderMegaMenu user={user} />
          <Routes>
            <Route exact path="/" element = {user ? <Home /> : <Navigate to="/login" />} />
            <Route exact path="/login" element ={user ? <Navigate to="/" /> : <Login userState={(user)=>setUser(user)}/>} />
            <Route exact path="/signup" element ={<Signup />} />
            <Route exact path="/emailverification" element ={<EmailVerification />} />
            <Route exact path="/userprofile" element ={<UserProfile updateChange={(user)=>setUser(user)}/>} />
            <Route exact path="/forgotpassword" element ={<ForgotPassword />} />
            <Route exact path="/resetpassword" element ={<ResetPassword />} />
            <Route exact path="/admin/users" element ={ user ? user.role==='admin' ? <ManageUser /> : <FourOFour /> : <FourOFour /> } />
            <Route exact path="/products/*" element ={ user ? user.type==='both' || user.type==='vendor' ? <Products /> : <FourOFour /> : <FourOFour /> } />
            <Route exact path="/contact" element ={<Contact />} />
            <Route exact path="/*" element ={ <FourOFour /> } />
          </Routes>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  </UserState>
</Router>
</>
  );
}

export default App;
