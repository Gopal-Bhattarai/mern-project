import { createContext, useReducer, useState } from "react";

export const UserContext = createContext();

const UserState = (props) => {

    let initialState = {
        totalUsers: 13,
        totalEmails: 63,
      }
      
    const reducer = (state,action) =>{
        switch(action.type) {
            case 'users':
            return { ...state, totalUsers : state.totalUsers + action.value}
            case 'emails':
            return { ...state, totalEmails : state.totalEmails - action.value}
            case 'reset':
            return initialState = { totalUsers: 0, totalEmails: 63 }
            default:
            return state
        }
    }

    const [count, dispatch] = useReducer(reducer, initialState);


    const urlHost = process.env.REACT_APP_HOST;

    // const loginUser = async ({email, password}) => {
    //   try {
    //     const response = await fetch(`${urlHost}/api/users/login`,{
    //       method: 'POST',
    //       headers: {
    //         'Content-Type' : 'application/json'
    //       },
    //       body: JSON.stringify({email, password})
    //     })
    //     const json = await response.json();
    //     return json;
    //   } catch (error) {
    //     console.log(error.message)
    //   }
    // }
    
  
      const [user, setUser] = useState({ });
  
      const getUser = (async () => {
        const localEmail = localStorage.getItem('email');
          if(localStorage.getItem('token')) {
              const response = await fetch(`${urlHost}/api/users/email/${localEmail}`,{
                  method: 'get',
                  headers: {
                  'Content-Type' : 'application/json',
                  "auth-token": localStorage.getItem('token')
                  },
              })
              const json = await response.json();
              setUser(json.user)
              localStorage.setItem('userid', json.user._id)
      
          } else { console.log('Token is not available')}
      });
  
  
      // const [users, setUsers] = useState([]);
  
    //   const getAllUsers = async () => {
    //       const response = await fetch(`${urlHost}/api/admin/allUsers`, {
    //           method: 'POST',
    //           headers:{
    //               "Content-Type" :"application/json",
    //               "auth-token": localStorage.getItem('token')
    //           }
    //       })
    //       const jsonUsers = await response.json();
    //       //console.log(jsonUsers);
    //       setUsers(jsonUsers)
    //   }
  
    //   const updateUserProfile = async (id,fullName,password) => {
    //       const response = await fetch(`${urlHost}/api/users/updateuser/${id}`,{
    //           method: 'PUT',
    //           headers: {
    //             'Content-Type' : 'application/json',
    //             "auth-token": localStorage.getItem('token')
    //           },
    //           body: JSON.stringify({fullName, password})
    //         });
    //         await response.json();
    //   }
  
    //   //Delete a User
    //   const deleteUser = async (id)=> {
    //   try {
    //     const response = await fetch(`${urlHost}/api/admin/deleteUser/${id}`,{
    //       method: 'DELETE',
    //       headers: {
    //         'Content-Type' : 'application/json',
    //         "auth-token": localStorage.getItem('token')
    //       }
    //     });
    //     const json = await response.json();
    //     setUsers(users.filter(user=>user._id!==id))
    //     console.log(json);
    //     getUser();
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // }

    return (
        <div>
            <UserContext.Provider value={{count, dispatch, getUser, user,  urlHost}}>
                {props.children}
            </UserContext.Provider>
        </div>
      )
}

export default UserState
