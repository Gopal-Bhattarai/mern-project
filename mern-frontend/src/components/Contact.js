import React, {useContext} from 'react'
import { UserContext } from './Context/UserContext'

const Contact = () => {
    const { count } = useContext(UserContext)
  return (
    <div>
        {count.totalUsers}
    </div>
  )
}

export default Contact
