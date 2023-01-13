import { Button, Flex, Text } from "@mantine/core"
import { motion } from "framer-motion"
import { IconBrandFacebook, IconBrandGithub, IconBrandGoogle } from "@tabler/icons";
import { buttonVariant } from "../../motion/LoginMotion";


const PassportLogin = () => {
  const urlHost = process.env.REACT_APP_HOST;
  const MoButton = motion(Button)

  const links = [
    {
        name: 'google',
        icon: <IconBrandGoogle />,
        iconName: 'oogle',
        variant: 'outline',
        variants: buttonVariant,
        whileHover: 'hover',
        onClick: `${urlHost}/api/auth/google`
    },
    {
        name: 'github',
        icon: <IconBrandGithub />,
        iconName: 'ithub',
        variant: 'outline',
        variants: buttonVariant,
        whileHover: 'hover',
        onClick: `${urlHost}/api/auth/github`
    },
    {
        name: 'facebook',
        icon: <IconBrandFacebook />,
        iconName: 'acebook',
        variant: 'outline',
        variants: buttonVariant,
        whileHover: 'hover',
        onClick: `${urlHost}/api/auth/facebook`
    },
  ]

  return (
    <div>
        <Flex
            // sx={{ width: 300 }}
            direction={{ base: 'column' }}
            gap={{ base: 'sm', sm: 'lg' }}
            justify={{ sm: 'center' }}
            wrap="wrap-reverse"
            >
                <Text mt="xs">Login using</Text>
                {links.map(link=>(
                        <MoButton 
                        key = {link.name}
                        variant = {link.variant}
                        variants = {link.variants} 
                        whileHover = {link.whileHover}
                        onClick = {()=>window.open(link.onClick, "_self")}
                        >
                        {link.icon}{link.iconName}
                        </MoButton>
                    )
                )}
                {/* <MoButton variants={buttonVariant} whileHover="hover" mb="md"  variant="outline" onClick={google}>
                  <IconBrandGoogle />oogle
                </MoButton>
                <MoButton variants={buttonVariant} whileHover="hover" mb="md"  variant="outline" onClick={github}>
                  <IconBrandGithub />itHub
                </MoButton>
                <MoButton variants={buttonVariant} whileHover="hover" mb="md"  variant="outline" onClick={facebook}>
                  <IconBrandFacebook/>acebook
                </MoButton> */}
        </Flex>
    </div>
  )
}

export default PassportLogin



