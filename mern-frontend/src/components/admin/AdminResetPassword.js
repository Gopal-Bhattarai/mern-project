import { Box, Button, PasswordInput, Text, Title } from '@mantine/core';
import { IconAt, IconCheck, IconLock, IconX } from '@tabler/icons';
import axios from 'axios';
import React, { useState } from 'react'
import { showNotification as notify } from "@mantine/notifications";


const AdminResetPassword = ({user, action}) => {
    const urlHost = process.env.REACT_APP_HOST;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const config = {
        method: 'POST',
        url: `${urlHost}/api/admin/users/resetpassword/${user._id}`,
        headers: {
            'Content-Type' : 'application/json'
        },
        data: {password}
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            return notify({title: 'Oooops', message: `Passwords do not matched`, color:'red', icon: <IconX /> })
        }

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                notify({title: 'Success', message: response.data.status, icon: <IconCheck /> })
                action(true);
            })
            .catch(function (error) {
                notify({title: 'Oooops', message: error.response.data, color:'red', icon: <IconX /> })
                console.log(error);
            });

    }

  return (
        <form onSubmit={handleSubmit}>
            <Box>
            <Title mb="sm" order={2}>Reset Password</Title>
                <Text><IconAt size="16" />  {user.email}</Text>
            </Box>
            <Box my="sm">
                <PasswordInput
                    icon={<IconLock size={16} />}
                    label="Password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
            </Box>
            <Box my="sm">
                <PasswordInput
                    icon={<IconLock size={16} />}
                    label="Confirm Password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    />
            </Box>

            <Button my="sm" type="submit">
                Reset Password
            </Button>

        </form>
  )
}

export default AdminResetPassword

