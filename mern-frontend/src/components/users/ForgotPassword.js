import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BackgroundImage, Box, Button, Card, Center, Container, Flex, Paper, Text, TextInput, Title } from "@mantine/core";
import ForgotPasswordImg from '../img/forgotpassword.png'
import { IconAt } from "@tabler/icons";
import {ForgotPasswordAPI} from "../../APIs/ForgotPasswordAPI";

const ForgotPassword = () => {
    // const urlHost = process.env.REACT_APP_HOST;

    const [email, setEmail] = useState('');

    // const config = {
    //     method: 'POST',
    //     url: `${urlHost}/api/users/forgotpassword`,
    //     headers: {
    //         'Content-Type' : 'application/json'
    //     },
    //     data: {email}
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        ForgotPasswordAPI({email})
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            toast('Recovery email sent, check your inbox')
            })
            .catch(function (error) {
            toast.warn(error.response.data.status);
            console.log(error);
            });

    }

  return (
    <Container>
        <Card shadow="sm" p="md" m="lg" radius="md" withBorder>
            <Title mb="sm" order={2}>
                Recover Password
            </Title>
            <Paper shadow="xl" radius="md"  >
                <BackgroundImage
                    radius="md"
                    src={ForgotPasswordImg}
                    style={{  height: 400 }}
                    alt="forgot">
                    
                    <form onSubmit={handleSubmit}>
                    <Flex my="sm" justify="flex-end"
                        align="flex-end"
                        direction="column"
                        wrap="wrap">
                        <Box p="lg" withBorder>

                        <TextInput
                            type="email"
                            label="Email Address"
                            placeholder="Your email"
                            icon={<IconAt size={16} />}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Text fz="xs" c="dimmed">
                            We'll never share your email with anyone else.
                        </Text>
             
                            <Button my="sm" type="submit" fullWidth variant="outline">Recover</Button>
                            <Center>
                                <Text size="sm">
                                    Need an account?{" "}
                                    <Link to="/signup">
                                    <Button compact variant="outline" size="xs">
                                        Sign up here
                                    </Button>
                                    </Link>{" "}
                                </Text>
                            </Center>
                        </Box>
                    </Flex>
                    </form>
                    
                    
                </BackgroundImage>
            </Paper>


        </Card>
    </Container>
  )
}

export default ForgotPassword
