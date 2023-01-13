import { Button, Card, Paper } from "@mantine/core"
import { useReducer } from "react"


let initialState = {
  totalUsers: 13,
  totalEmails: 63,
}

const reducer = (state,action) =>{
  switch(action.type) {
    case 'user':
      return { ...state, totalUsers : state.totalUsers + action.value}
    case 'emails':
      return { ...state, totalEmails : state.totalEmails - action.value}
    case 'reset':
      return initialState = { totalUsers: 0, totalEmails: 63 }
    default:
      return state
  }
}

const FourOFour = () => {
const [count, dispatch] = useReducer(reducer, initialState)

  return (
    <div>
      <Card m="xl" p="xl" >
      <Paper p="lg">Total Likes : {count.firstCounter}</Paper>

      <Button onClick={(e)=>dispatch({type: 'Add User', value: 1})}>Like</Button>
      <Button onClick={(e)=>dispatch({type: 'New Email', value: 1})}>Dislike</Button>
      <Button onClick={(e)=>dispatch({type: 'reset'})}>Reset</Button>

     </Card>
    </div>
  )
}

export default FourOFour
