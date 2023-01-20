import {
    createStyles,    Header,    Group,    Button,
    Divider,    Box,    Burger,    Drawer,    ScrollArea,    Image,  ActionIcon, Indicator,
  } from '@mantine/core';
  import Logo from '../img/GB_Tech_Logo.png'
  import LogoDark from '../img/logo_dark.png'
  import { useDisclosure } from '@mantine/hooks';
  import { Link } from 'react-router-dom';
import { ColorScheme } from './ColorScheme';
import { IconBuildingStore, IconHome, IconLogin, IconLogout, IconUserPlus, IconUsers } from '@tabler/icons';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { TiShoppingCart } from 'react-icons/ti';
import { ShoppingCartContext } from '../Context/ShopingCartContext';
  
  const useStyles = createStyles((theme) => ({
    link: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
      textDecoration: 'none',
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontWeight: 500,
      fontSize: theme.fontSizes.sm,
  
      [theme.fn.smallerThan('sm')]: {
        height: 42,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      },
  
      ...theme.fn.hover({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      }),
    },
  
    subLink: {
      width: '100%',
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      borderRadius: theme.radius.md,
  
      ...theme.fn.hover({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      }),
  
      '&:active': theme.activeStyles,
    },
  
    dropdownFooter: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      margin: -theme.spacing.md,
      marginTop: theme.spacing.sm,
      padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
      paddingBottom: theme.spacing.xl,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
    },
  
    hiddenMobile: {
      [theme.fn.smallerThan('sm')]: {
        display: 'none',
      },
    },
  
    hiddenDesktop: {
      [theme.fn.largerThan('sm')]: {
        display: 'none',
      },
    },
  }));
  
  
  export function HeaderMegaMenu({user}) {
    const urlHost = process.env.REACT_APP_HOST;
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const { classes, theme } = useStyles();

    const { count } = useContext(UserContext);
    const {cart} = useContext(ShoppingCartContext)

    const handleSignOut = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('userid');
      const location = `${urlHost}/api/auth/logout`;
      window.open(location, "_self");
    }

    return (
      <Box pb={20}>
        <Header height={60} px="md">
          <Group position="apart" sx={{ height: '100%' }}>
            <img src={theme.colorScheme === 'dark' ? LogoDark : Logo } height={"50px"} alt="GB Technology" />
  
            <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
              <Link to="/" className={classes.link}>
                <IconHome /> Home
              </Link>

            { user ? 
              (
                <>
                {user ? user.role==='admin' ? (
                  
                <Link to="/admin/users" className={classes.link}>
                  <Indicator inline label={count.totalUsers} position="top-start" size={16}>
                    <IconUsers /> Users
                  </Indicator>
                </Link>
                  ) : void 0 : void 0 }

                {user ? user.type==='vendor' || user.type==='both' ? (
                <Link to="/products" className={classes.link}>
                  <IconBuildingStore /> Products
                </Link> ) : void 0 : void 0 }

                <Group className={classes.hiddenMobile}>
                  <Link to="/userprofile" className={classes.link}>
                  <Indicator label={count.totalEmails} size={16} color="red">
                      <Image width={32} radius="lg" fit="contain" src ={user.profile_pic} alt='user' />
                  </Indicator> &nbsp;
                      {user.fullName}
                  </Link>
                  {/* <Tooltip label="Sign out to protect your data">
                    <Button radius="xl" variant="gradient" gradient={{ from: 'orange', to: 'red' }} onClick={handleSignOut}> &nbsp;Log out</Button>
                  </Tooltip> */}
                    <ActionIcon variant="outline" mx="sm" onClick={handleSignOut} title="Sign out to protect your privacy" >
                      <IconLogout />
                    </ActionIcon>
                </Group>
                </> 
              ) 
            : (
              <>
                <Group className={classes.hiddenMobile}>
                  <Link to="/login"><Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}><IconLogin /> Log in</Button></Link>
                  <Link to="/signup"><Button mr="xs" variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}><IconUserPlus /> Sign up</Button></Link>
                </Group>
              </>
            ) }
                <Group >
                  <Indicator label={cart.total_item} showZero={false} dot={false} inline size={16} >
                    <ActionIcon component={Link} to = "/cart" variant='outline' radius="lg">
                        <TiShoppingCart />
                    </ActionIcon>
                  </Indicator>
                  <ColorScheme />
                </Group>
            </Group>

            <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
          </Group>
        </Header>
  
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigation"
          className={classes.hiddenDesktop}
          zIndex={1000000}
        >
          <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx="-md">
            <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
  
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/userprofile" className={classes.link}>
              Profile
            </Link>
            <Link to="/admin/users" className={classes.link}>
              Users
            </Link>
  
            <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
  
            <Group position="center" grow pb="xl" px="md">
              <Link to="/login"><Button variant="default">Log in</Button></Link>
              <Link to="/signup"><Button variant="default">Sign up</Button></Link>
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
    );
  }