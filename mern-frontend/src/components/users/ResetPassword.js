import { Box, Button, Card, Container, Image, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import { IconAt } from "@tabler/icons";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ResetPasswordImg from '../img/resetpassword.png'
import PassInput from './PassInput.tsx'
import PassConfirmInput from './PassConfirmInput.tsx'
import { ResetPasswordAPI } from "../../APIs/ResetPasswordAPI";

const ResetPassword = () => {
    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');
    const email = new URLSearchParams(search).get('email');
    const token = new URLSearchParams(search).get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(true);
    const [strength, setStrength] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault();

        // if(password !== confirmPassword) {
        //     return toast.warn('Passwords do not matched')
        // }

        ResetPasswordAPI({id, email, password, token})
            .then(function (response) {
            console.log(JSON.stringify(response.data));
            toast('Password Reset successful!')
            
            })
            .catch(function (error) {
            toast.warn(`Error: ${error.response.data}`);
            console.log(error);
            });

    }

  return (
    <Container size="md">
    <Card shadow="sm" p="md" m="lg" radius="md" withBorder>
        <SimpleGrid cols="2" spacing="lg" breakpoints={[
        { maxWidth: 'md', cols: 2, spacing: 'md' },
        { maxWidth: 'sm', cols: 1, spacing: 'sm' },
        { maxWidth: 'xs', cols: 1, spacing: 'sm' },
      ]}>


            <Paper shadow="xl" radius="md" withBorder>
                    <Image radius="md" src={ResetPasswordImg} 
                    alt="signup" sx={{ maxWidth: 480 }} fit="contain"/>
                    
                    <Box my="sm" ml="lg" >
                        <Text size="sm">
                            Suddenly remembered your password? <Link to="/login"><Button compact variant="outline" size="xs">Login here</Button></Link>{" "}
                        </Text>
                    </Box>
            </Paper>

            <Box>
                <Title mb="sm" order={2}>Reset Password</Title>
                <Text><IconAt size="16" />  {email}</Text>
                <form onSubmit={handleSubmit}>
                    <Box my="sm">
                        <PassInput returnPassword={(pwd)=>setPassword(pwd)} returnStrength={str=>setStrength(str)} />
                    
                        {/* <PasswordInput
                            icon={<IconLock size={16} />}
                            label="Password"
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            /> */}
                    </Box>
                    <Box my="sm">
                        <PassConfirmInput password={password} strength={strength} confirmReturn = {(val) => setConfirmPassword(val)}/>
                        {/* <PasswordInput
                            icon={<IconLock size={16} />}
                            label="Confirm Password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            /> */}
                    </Box>
                    <Button disabled={confirmPassword} my="sm" type="submit">
                        Reset Password
                    </Button>

            </form>
            </Box>
            </SimpleGrid>
        </Card>
    </Container>
  )
}

export default ResetPassword
