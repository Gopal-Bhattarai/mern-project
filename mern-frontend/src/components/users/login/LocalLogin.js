import { Box, Button, PasswordInput, TextInput, Text } from "@mantine/core"
import { IconAt, IconLock, IconX } from "@tabler/icons"
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LoginAPI } from "../../../APIs/LoginAPI";
import { buttonVariant } from "../../motion/LoginMotion";
import { showNotification as notify } from "@mantine/notifications";


const LocalLogin = ({ userState }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
  
      LoginAPI({email, password})
        .then(function (response) {
          const json = response.data;
          console.log(json);
          localStorage.setItem("token", json.authtoken);
          localStorage.setItem("email", email);
          localStorage.setItem("userid", json.user._id);
          userState(response.data.user);
        })
        .catch(function (error) {
          notify({title:'Error Login', message: error.response.data.status, color: "red", icon: <IconX /> })
          console.log(error);
          setLoading(false)
        });
    };

  //turn mantine component into motion component
  const MoButton = motion(Button)
  return (
    <Box>
        <form onSubmit={handleSubmit}>
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
            <PasswordInput
                icon={<IconLock size={16} />}
                label="Password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </Box>

            <Box height="100px">
            <MoButton loading={loading} 
            variants={buttonVariant}
            whileHover="hover"
            type="submit">Login</MoButton> 
            </Box>

            <Box my="sm">
            <Text size="sm">
                Need an account?{" "}
                <Button component={Link} to="/signup" compact variant="outline" size="xs">
                    Sign up here
                </Button>
            </Text>
            </Box>

            <Box my="sm">
            <Text size="sm">
                Forgot password?{" "}
                <Button component={Link} to="/forgotpassword" compact variant="outline" size="xs">
                    Recover here
                </Button>
            </Text>
            </Box>

        </form>
    </Box>
  )
}

export default LocalLogin
