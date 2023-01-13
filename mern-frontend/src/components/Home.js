import { createStyles, Box, Card, Container, Image, SimpleGrid, Title,  Text, Paper } from "@mantine/core"
import { Carousel } from "@mantine/carousel";
import Logo from './img/GB_Tech_Logo.png'
import LogoDark from './img/logo_dark.png'
import SignUpImg from './img/signup.png'
import ResetImg from './img/resetpassword.png'
import ForgotImg from './img/forgotpassword.png'
import ChartTest from "./Chart";
import ChartUsers from "./ChartUsers";
import SubscribeForm from "./SubscribeForm";
import ChartProducts from "./ChartProducts";

const useStyles = createStyles((theme) => ({

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

const Home = () => {
  const { theme } = useStyles();
 
  return (
    <Container size="xl" mt="sm">
      <Card shadow="lg">
        <SimpleGrid cols={2} breakpoints={[
        { maxWidth: 980, cols: 3, spacing: 'md' },
        { maxWidth: 755, cols: 2, spacing: 'sm' },
        { maxWidth: 600, cols: 1, spacing: 'sm' },
      ]}>
          <Box align="center">
            <Image src={theme.colorScheme === 'dark' ? LogoDark : Logo } alt="GB Technology" />
          </Box>
          <Box align="center">
            <Title order={1}>Who are we?</Title>
            <Box my="sm">
              <Text>
                We are bunch of Supernatural idiots!
              </Text>
            </Box>
          </Box>
        </SimpleGrid>
      </Card>
      <Carousel
        withIndicators
        height={200}
        slideSize="33.333333%"
        slideGap="md"
        breakpoints={[
          { maxWidth: 'md', slideSize: '50%' },
          { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
        ]}
        loop
        align="start"
      >
      <Carousel.Slide><Image src={SignUpImg} /></Carousel.Slide>
      <Carousel.Slide><Image src={ResetImg} /></Carousel.Slide>
      <Carousel.Slide><Image src={ForgotImg} /></Carousel.Slide>
      {/* ...other slides */}
    </Carousel>

    <SimpleGrid cols={3} my="md" breakpoints={[
        { maxWidth: 980, cols: 3, spacing: 'md' },
        { maxWidth: 755, cols: 2, spacing: 'sm' },
        { maxWidth: 600, cols: 1, spacing: 'sm' },
      ]}>

        <Paper shadow="md" align="center">
          <ChartTest type="bar" />
        </Paper>

        <Paper shadow="md" align="center">
          <ChartTest type="line" />
        </Paper>

        <Paper shadow="md" align="center">
          <ChartTest type="area" />
        </Paper>


        <Paper shadow="lg" align="center" p="xs" mb="md" withBorder>
          <ChartUsers type="bar" />
        </Paper>

        <Paper shadow="lg" align="center" p="xs" mb="md" withBorder>
          <ChartProducts type="bar" />
        </Paper>

        <Paper shadow="lg" align="center" p="xs" mb="md" withBorder>
          <SubscribeForm />
        </Paper>

    </SimpleGrid>

    

    </Container>
  )
}

export default Home
