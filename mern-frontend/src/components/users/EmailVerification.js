import { useState } from "react"
import { toast } from "react-toastify";
import { Button, Card, Container, Text, TextInput, Title } from "@mantine/core";
import { IconSend } from "@tabler/icons";
import { EmailVerificationAPI } from "../../APIs/EmailVerificationAPI";

const EmailVerification = () => {
    const [token, setToken] = useState('');

    const handleVerify = (e) => {
        e.preventDefault();
        EmailVerificationAPI({key: token})
        // axios.get(`${urlHost}/api/users/emailverification?key=${token}`)
            .then(function (response) {
            localStorage.setItem('token', response.data.authtoken);
            localStorage.setItem('email', response.data.user.email);
            toast('Email successfully verified, you may now continue with login')
            window.open("/", "_self")
            })
            .catch(function (error) {
              console.log('gettin err');

            toast.warn(`Sorry, email ${error.response.data.keyValue.email} is not verified`)
            console.log(error);
            });
    }

  return (
    <Container size="md">
    <Card mx="xl" shadow="lg" withBorder>
      <Title my="sm" order={3}>Email Address verification <IconSend /></Title>
        <Text>You have 60 minutes to verify your email address, after that the token will expire</Text>
        <Text>Please check your email inbox for token key, or you may directly click on the link provided in your email address. </Text> <br />
        <TextInput type="text" value={token} onChange={(e)=>setToken(e.target.value)} /> <br />
        <Button mt="md" onClick={handleVerify}>Verify</Button>
    </Card>
    </Container>
  )
}

export default EmailVerification
