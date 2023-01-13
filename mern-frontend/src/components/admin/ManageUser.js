import { Card, Container, Flex, Title, Badge, Text, Box, 
    SimpleGrid, Switch, Tooltip,  Indicator, Center, Button, 
    Dialog, Group, Chip, Paper } from "@mantine/core";
import { IconBrandGithub, IconChecks, IconReplace, IconUserX, IconX } from "@tabler/icons";
import axios from "axios"
import { useEffect, useState } from "react";
import AdminResetPassword from "./AdminResetPassword";
import {FcGoogle} from 'react-icons/fc'
import {FiHardDrive} from 'react-icons/fi'
import { showNotification as notify } from "@mantine/notifications";

const ManageUser = () => {
    const urlHost = process.env.REACT_APP_HOST;
    const currentUserEmail = localStorage.getItem('email');
    const [users, setUsers] = useState([]);
    const [opened, setOpened] = useState({
        status: false,
        user: '',
        action: ''
    });

    const getData = async () => {

        try {
            const response = await axios.get(`${urlHost}/api/admin/users`)
            setUsers(response.data.users)
        } catch (error) {
            
            notify({title: 'Oooops', message: `Unable to fetch user data`, color:'red', icon: <IconX /> })
            console.log(error.message);
        }
    }

    const handleDelete = async(delUser) => {
        setOpened({
            status: false,
            user: ''
        })
        console.log(delUser);
        if(delUser.role === 'admin') {
            notify({title: 'Oooops', message: `You can't delete superadmin`, color:'red', icon: <IconX /> })
            return;
        } 
        try {
            const response = await axios.delete(`${urlHost}/api/admin/users/delete/${delUser._id}`)
            setUsers(users.filter(user=>user._id!==delUser._id))
            notify({title: 'Success', message: response.data.status, icon: <IconChecks /> })
        } catch (error) {
            notify({title: 'Oooops', message: `Unable to delete`, color:'red', icon: <IconX /> })
            console.log(error.message);
        }
    }
    
    const handleRoleChange = async(roleChangeUser) => { 
        if(roleChangeUser.role==='superadmin'){
            notify({title: 'Oooops', message: `You can't change the role of superadmin`, color:'red', icon: <IconX /> })
            return;
        }
        try {
            let role = '';
            roleChangeUser.role === 'admin' ? role = 'user' : role = 'admin';
            const response = await axios.put(`${urlHost}/api/admin/users/rolechange/${roleChangeUser._id}/${role}`)
            setUsers(users.map(user=>(user._id===roleChangeUser._id ? {...user, role} : {...user})))
            notify({title: 'Success', message: response.data.status, icon: <IconChecks /> })
        } catch (error) {
            notify({title: 'Failed', message: 'Unable to change role', color: 'red', icon: <IconX /> })
            console.log(error.message);
        } 
    }

    const handleActiveChange = async(activeChangeUser)=>{
        try {
            let isActive = false;
            activeChangeUser.isActive ? isActive = false : isActive = true;
            const response = await axios.put(`${urlHost}/api/admin/users/activechange/${activeChangeUser._id}/${isActive}`)
            setUsers(users.map(user=>(user._id===activeChangeUser._id ? {...user, isActive} : {...user})))
            notify({title: 'Success', message: response.data.status, icon: <IconChecks /> })
        } catch (error) {
            notify({title: 'Failed', message: 'Unable to change status', color: 'red', icon: <IconX /> })
            console.log(error.message);
        } 
    }

    const handleAction =() => {
        setOpened({status: false, user: '', action: ''})
    }
        

    useEffect(()=> {
        getData();
        // eslint-disable-next-line
    },[])
        
   return (
    <Container mt="sm" size="lg">

        <Dialog shadow="xl" p={30} radius="sm" position={{ top: 20, left: 20 }} 
        transition="slide-up" transitionDuration={300} transitionTimingFunction="ease"
            opened={opened.status}
            withCloseButton
            onClose={() => setOpened({
                status: false,
                user: '',
                action: ''
            })}
            size="lg"
        >
        { opened.action==='delete' ? 
        (
            <>
            <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
                Are you sure you want to delete {opened.user.fullName} ? 
            </Text>

            <Group align="flex-end">
                <Button onClick={() => handleDelete(opened.user)}>Yes</Button>
                <Button onClick={() => setOpened({status: false, user:'', action:''})}>Cancel</Button>
            </Group>
            </>
        ) : ( <AdminResetPassword user={opened.user} action={handleAction} /> ) }
        </Dialog>

        <Title mb="sm" order={2}>
            Manage Users
        </Title>

    {users && users.map(user=>(
        <Card shadow="sm" p="md" m="lg" radius="md" withBorder key={user._id}>
            <SimpleGrid cols={3} spacing="lg"
                    breakpoints={[
                        { maxWidth: 'sm', cols: 3, spacing: 'sm' },
                        { maxWidth: 'xs', cols: 1, spacing: 'sm' },
                    ]}>
                <Box style={{pointerEvents: 'none'}}>
                    <Title mb="sm" order={3}>{user.fullName}</Title>

                    <Badge leftSection="mongodb_id:">{user._id}</Badge>
                    <Paper align="center" radius="md" py="xs" mt="xs">{user.email}  </Paper> 
                    <Chip.Group position="center" mt="sm">
                        <Chip checked={true}>{user.provider} {user.provider==='google' ? <FcGoogle /> : user.provider==='github' ? <IconBrandGithub color="DarkRed" /> :<FiHardDrive color="blue" /> }</Chip>
                        {user.isVerified ? <Chip checked={true}>Verified</Chip> : <Chip>Not verified</Chip>}
                        {user.isActive ? <Chip checked={true}>Active</Chip> : <Chip>Disabled</Chip>}
                    </Chip.Group> 
                </Box>
                <Center>
                    <Indicator inline label={user.role==='admin'?'Admin':'User'} size={20} position="middle-end" color="red" withBorder>
                        <img className="dbUserPic" alt="Profiles"
                        src={user.profile_pic} />
                    </Indicator>
                </Center>
                <Flex direction={"column"}>
                    <Tooltip label={user.role==='user' ? 'Switch to Admin rights' : 'Switch to User rights'}>
                        <Box>
                                <Switch disabled={user.email===currentUserEmail} label={user.role==='user' ? 'Make admin' : 'Make user'} checked ={user.role==='admin'} onChange={()=>handleRoleChange(user)}/>
                        </Box>
                    </Tooltip>
                    <Tooltip label={user.isActive ? 'Switch to disable user' : 'Switch to enable user'}>
                        <Box>
                            <Switch disabled={user.email===currentUserEmail} label={user.isActive? 'Disable' : 'Enable'} checked ={user.isActive} onChange={()=>handleActiveChange(user)}/>
                        </Box>
                    </Tooltip>
                    <Flex wrap="wrap" gap="sm">

                        <Tooltip label="Delete this user">
                            <Button disabled={user.role==='admin' || user.email===currentUserEmail} size="xs" variant="outline" color="red" onClick={()=>setOpened({status:true, user: user, action:'delete'})}><IconUserX />Delete User</Button> 
                        </Tooltip>
                        <Tooltip label="Reset Password">
                            <Button size="xs" variant="outline" onClick={()=>setOpened({status:true, user: user, action:'resetpassword'})}><IconReplace />Reset Password</Button>
                        </Tooltip>

                    </Flex>
                </Flex>
            </SimpleGrid>

        </Card>
    ))}
    </Container>
  )
}

export default ManageUser
