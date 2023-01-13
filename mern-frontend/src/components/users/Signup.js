import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Flex, Image,  Card, Text,  Button,  Box, TextInput, Modal, 
    Container,  Group,  Paper,  Tooltip, Title, Checkbox, Radio
} from "@mantine/core";
import { IconAt, IconCheck, IconX } from "@tabler/icons";
import SignupImg from '../img/signup.png'
import PassInput from "./PassInput.tsx";
import PassConfirmInput from "./PassConfirmInput.tsx";
import { SignupAPI } from "../../APIs/SignupAPI";
import { showNotification as notify } from "@mantine/notifications";

const Signup = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(true);
  const [strength, setStrength] = useState(0)
  const [type, setType] = useState('');
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);


  //Customer(Buyer) signup config API
//   const config = {
//     method: "POST",
//     url: `${urlHost}/api/users/signup`,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     data: { fullName, email, password },
//   };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    setLoading(true);
    SignupAPI({fullName, email, password, type})
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      notify({title: 'Great', message: "Signup successful!, please check your email and click on email verification link", icon: <IconCheck /> })        
      navigate("/emailverification");
      })
      .catch(function (error) {
        notify({title: 'Error', message: "Internal Error", color:'red', icon: <IconX /> })        
        console.log(error);
        });
        setLoading(false)
  };

  return (
    <Container size="md">
        <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Terms of Use">
            <Text>
                Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern GB Technology's relationship with you in relation to this website. If you disagree with any part of these terms and conditions, please do not use our website.

                The term 'GB Technology' or 'us' or 'we' refers to the owner of the website whose registered office is [address]. Our company registration number is [company registration number and place of registration]. The term 'you' refers to the user or viewer of our website.

                The use of this website is subject to the following terms of use:

                The content of the pages of this website is for your general information and use only. It is subject to change without notice.
                This website uses cookies to monitor browsing preferences. If you do allow cookies to be used, the following personal information may be stored by us for use by third parties: [insert list of information].
                Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
                Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.
                This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
                All trade marks reproduced in this website which are not the property of, or licensed to, the operator are acknowledged on the website.
                Unauthorised use of this website may give rise to a claim for damages and/or be a criminal offence.
                From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).
                Your use of this website and any dispute arising out of such use of the website is subject to the laws of Nepal.
            </Text>
        </Modal>
        
      <Card shadow="sm" p="md" m="lg" radius="md" withBorder>
        
        <Flex>
            <Group pl="md">
                <Paper shadow="xl" radius="md" withBorder>
                    <Image radius="md" src={SignupImg} alt="signup" sx={{ maxWidth: 480 }} mx="auto"/>
                </Paper>
                
                <Flex sx={{ width: 310 }} justify="flex-start" align="flex-start" direction="column" wrap="wrap-reverse">
                    <Box my="sm" >
                        <Text size="sm">
                            Already have an account? <Link to="/login"><Button compact variant="outline" size="xs">Login here</Button></Link>{" "}
                        </Text>
                    </Box>
                    <form onSubmit={handleSubmit}>
                    <Title order={2}>Register to continue</Title>
                        <Paper my="sm" pl="xs" withBorder>
                            <Radio.Group name="typeOf" >
                                <Radio value="customer" label="Buyer" required onClick={()=>setType('customer')}/>
                                <Radio value="vender" label="Seller"  onClick={()=>setType('vendor')}/>
                                <Radio value="both" label="Both"  onClick={()=>setType('both')}/>
                            </Radio.Group>
                        </Paper>
                        <Box my="sm">
                        <TextInput
                            value={fullName}
                            label="Full Name"
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            />
                        </Box>
                        <Box my="sm">
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
                        </Box>
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
                        <Flex>
                            <Checkbox defaultChecked /> 
                            <> <Text size="sm">&nbsp; I agree to GB Technology's &nbsp;</Text>
                                <Button compact variant="outline" onClick={()=>setOpened(true)}>Terms of Use</Button>
                            </>
                        </Flex>
                        <Tooltip label="Click here to create new account with your details">
                        <Button disabled={confirmPassword} loading={loading} color="grape" my="sm" type="submit" >
                            Create Account
                        </Button>
                        </Tooltip>
                    </form>
                </Flex>
            </Group>
        </Flex>
        <Paper p="xs" m="md" radius="md" withBorder>
            <Text size="sm" p="lg">
            By clicking the "Create Account" button, you are creating a GB Technology's account, and you agree to its &nbsp;
            <Button compact variant="outline" onClick={()=>setOpened(true)}>Terms of Use</Button> &nbsp;
            and acknowledge that its Privacy Policy applies to you.  
            </Text>
        </Paper>
      </Card>
    </Container>
  );
};

export default Signup;
