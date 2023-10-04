import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import AppLogoText from "assets/img/app-logo-text.png";
import DepositAmountCircle from "assets/img/deposit-amount-circle.png";
import DepositBG from "assets/img/deposit-home-bg.png";
import HomeBannerBG from "assets/img/home-banner-bg.png";
import RoadmapBG from "assets/img/roadmap-bg.png";
import TeamBG from "assets/img/team-bg.png";
import TokenomicBG from "assets/img/tokenomic-bg.png";
import TokenomicCup from "assets/img/tokenomic-cup.png";
import ContactBg from "assets/img/contact-bg.png";
import { NavbarLandingPage } from "components/Navbar/NavbarLandingPage";
import { SectionContainer } from "components/container";
import { AppIcon } from "components/icons";
import "./styles.css";
import AvatarImage from "assets/img/avatar.png";
import { LuAtSign } from "react-icons/lu";

const teamList = [
  {
    name: "Romeo De Luca - CTO",
    role: "Head of Technology",
    description:
      "Romeo has played a significant role in driving technological innovation by demonstrating the system's resilience, efficiency, and security within the exchanges' trading framework. Romeo has held key positions in a number of large technology corporations for more than 15  years.",
    avatar: AvatarImage,
  },
  {
    name: "Romeo De Luca - CTO",
    role: "Head of Technology",
    description:
      "Romeo has played a significant role in driving technological innovation by demonstrating the system's resilience, efficiency, and security within the exchanges' trading framework. Romeo has held key positions in a number of large technology corporations for more than 15  years.",
    avatar: AvatarImage,
  },
  {
    name: "Romeo De Luca - CTO",
    role: "Head of Technology",
    description:
      "Romeo has played a significant role in driving technological innovation by demonstrating the system's resilience, efficiency, and security within the exchanges' trading framework. Romeo has held key positions in a number of large technology corporations for more than 15  years.",
    avatar: AvatarImage,
  },
  {
    name: "Romeo De Luca - CTO",
    role: "Head of Technology",
    description:
      "Romeo has played a significant role in driving technological innovation by demonstrating the system's resilience, efficiency, and security within the exchanges' trading framework. Romeo has held key positions in a number of large technology corporations for more than 15  years.",
    avatar: AvatarImage,
  },
];

const HomePage = () => {
  return (
    <Box>
      <Box className="landing-page-banner-container" bgImage={HomeBannerBG}>
        <NavbarLandingPage />
        <Flex
          direction="column"
          h="full"
          alignItems="center"
          pt="calc(1/4 * 100vh)"
          className="landing-page-banner-content-container"
        >
          <Text
            id="text-1"
            className="landing-page-banner-text linear-text-color-01"
          >
            Turbocharge Your Profits
            <br />
            with Automated Trading Bots
          </Text>
          <Text id="text-2" className="landing-page-banner-text">
            A trading platform with advance tools and essential bots for all
            financial markets.
            <br />
            24/7. Always at your service.
          </Text>
          <Flex mt="32px">
            <Button className="landing-page-banner-button" px="48px">
              Testnet Demo
            </Button>
            <Button className="landing-page-banner-button" ml="32px">
              Mainnet Access
            </Button>
          </Flex>
        </Flex>
      </Box>
      <Box bg="#0D171B">
        <SectionContainer
          aspectRatio={1.8}
          bgImage={TokenomicBG}
          bgRepeat="no-repeat"
          bgSize="cover"
        >
          <SimpleGrid columns={2}>
            <Box pt="48px">
              <Heading className="heading">Our Tokenomics</Heading>
              <Flex className="token-infor-container">
                <Box className="token-infor-content-container">
                  <Text className="token-infor-content-title">Token Name:</Text>
                  <Text className="token-infor-text">BetAZ TOKEN</Text>
                </Box>
                <Box width="2px" bg="#706A78" />
                <Box className="token-infor-content-container" ml="12px">
                  <Text className="token-infor-content-title">
                    Token Symbol:
                  </Text>
                  <Flex justify="center" alignItems="center" mt="12px">
                    <AppIcon size="32px" />
                    <Text className="token-infor-symbol">BetAZ</Text>
                  </Flex>
                </Box>
              </Flex>
              <SimpleGrid
                className="tokenomic-container"
                columns={3}
                spacing="12px"
              >
                {[
                  {
                    color: "#FACC15",
                    value: 3,
                    label: "Seed Round",
                  },
                  {
                    color: "#A855F7",
                    value: 10,
                    label: "Marketing & Partnership",
                  },
                  {
                    color: "#14B8A6",
                    value: 40,
                    label: "Burn pool",
                  },
                  {
                    color: "#F59E0B",
                    value: 5,
                    label: "Liquidity (Liquidity Pool & Market Making)",
                  },
                  {
                    color: "#6366F1",
                    value: 15,
                    label: "Team",
                  },
                  {
                    color: "#3B82F6",
                    value: 20,
                    label: "Ecosystem Incentive (Farming, Staking, Bonuses)",
                  },
                  {
                    color: "#EC4899",
                    value: 7,
                    label: "Private Round",
                  },
                ].map((e, index) => (
                  <Box
                    className="tokenomic-item"
                    key={`tokenomic-item-${index}`}
                  >
                    <Box className="tokenomic-item-color" bg={e.color} />
                    <Text className="tokenomic-item-value">{`${e.value}%`}</Text>
                    <Text className="tokenomic-item-describle">{e.label}</Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
            <Flex justify="center">
              <Image
                height={{ base: "770px" }}
                alt="Tokenomic-cup"
                src={TokenomicCup}
              />
            </Flex>
          </SimpleGrid>
        </SectionContainer>
        <SectionContainer
          aspectRatio={1.8}
          bgImage={DepositBG}
          bgRepeat="no-repeat"
          bgSize="cover"
          pt="48px"
        >
          <Heading className="heading">Deposit and Play</Heading>
          <SimpleGrid columns={2} spacing="100px">
            <Flex direction="column" justify="center">
              <Box className="deposit-box-container">
                <Text className="deposit-box-title">Deposit now</Text>
                <Box className="deposit-box-amount-box">
                  <Text>Amount</Text>
                  <Flex className="deposit-box-amount-input">
                    <Input
                      focusBorderColor="transparent"
                      sx={{ border: "0px" }}
                      value={0.001}
                    />
                    <Flex
                      w="100px"
                      alignItems="center"
                      pl="4px"
                      borderLeft="2px solid rgba(255, 255, 255, 0.4)"
                    >
                      <AppIcon />
                      BetAZ
                    </Flex>
                  </Flex>
                </Box>
                <Flex direction="column" alignItems="center" mt="24px">
                  <Button>START PLAYING</Button>
                  <Text mt="24px">By Clicking your agree with our</Text>
                  <Text className="linear-text-color-01 term-aggreement-text">
                    Terms and Conditions, Privacy Policy
                  </Text>
                </Flex>
              </Box>
            </Flex>
            <Flex
              maxW="600px"
              aspectRatio={1}
              bgImage={DepositAmountCircle}
              bgRepeat="no-repeat"
              bgSize="cover"
              direction="column"
              justify="center"
              alignItems="center"
            >
              <SimpleGrid
                spacing="32px"
                alignItems="center"
                display="flex"
                flexDirection="column"
              >
                <Image
                  height={{ base: "32px" }}
                  alt="app-logo-text"
                  src={AppLogoText}
                />
                <Text className="deposit-circle-quote">
                  Easy way for crypto Play
                </Text>
                <Text className="deposit-circle-amount linear-text-color-01">
                  $500,000
                </Text>
                <Box>
                  <Text className="deposit-circle-finish-title">
                    Finishes in:
                  </Text>
                  <SimpleGrid columns={4} spacing="10px">
                    <Flex alignItems="flex-end">
                      <Text className="deposit-circle-finish-countdown linear-text-color-01">
                        05
                      </Text>
                      <Text className="deposit-circle-finish-countdown-unit">
                        d
                      </Text>
                    </Flex>
                    <Flex alignItems="flex-end">
                      <Text className="deposit-circle-finish-countdown linear-text-color-01">
                        16
                      </Text>
                      <Text className="deposit-circle-finish-countdown-unit">
                        h
                      </Text>
                    </Flex>
                    <Flex alignItems="flex-end">
                      <Text className="deposit-circle-finish-countdown linear-text-color-01">
                        32
                      </Text>
                      <Text className="deposit-circle-finish-countdown-unit">
                        m
                      </Text>
                    </Flex>
                    <Flex alignItems="flex-end">
                      <Text className="deposit-circle-finish-countdown linear-text-color-01">
                        10
                      </Text>
                      <Text className="deposit-circle-finish-countdown-unit">
                        s
                      </Text>
                    </Flex>
                  </SimpleGrid>
                </Box>
              </SimpleGrid>
            </Flex>
          </SimpleGrid>
        </SectionContainer>
        <SectionContainer
          pt="48px"
          aspectRatio={0.7}
          bgImage={RoadmapBG}
          bgRepeat="no-repeat"
          bgSize="cover"
        >
          <Heading className="heading">Roadmap</Heading>
          <Box py="256px">
            <SimpleGrid
              alignItems="center"
              display="flex"
              flexDirection="column"
              spacing="40px"
            >
              <Box className="shining-container">
                <Text className="shining-text">H1-2023</Text>
              </Box>
              <Box
                borderRadius="12px"
                border={"2px solid #1BBEF5"}
                maxW="760px"
              >
                <Box className="roadmap-title-container">
                  <Text>Foundation and Infrastructure Development</Text>
                </Box>
                <SimpleGrid
                  p="24px"
                  spacing="12px"
                  bg="linear-gradient(180deg, #0D171B 0%, #163037 100%)"
                  borderBottomRadius="12px"
                >
                  {[
                    "Core infrastructure and architecture development for a decentralized trading platform",
                    "Implementation of connections to multiple exchanges to provide liquidity",
                    "Development of advanced trading features and tools",
                    "Research and implementation of robust security measures",
                  ].map((e) => (
                    <Flex alignItems="center">
                      <Box className="diamon-icon" />
                      <Text color="#A4B0B6">{e}</Text>
                    </Flex>
                  ))}
                </SimpleGrid>
              </Box>
              <Box className="shining-container">
                <Text className="shining-text">H2-2023</Text>
              </Box>
              <Box
                borderRadius="12px"
                border={"2px solid #1BBEF5"}
                maxW="760px"
              >
                <Box className="roadmap-title-container">
                  <Text>Beta Launch</Text>
                </Box>
                <SimpleGrid
                  p="24px"
                  spacing="12px"
                  bg="linear-gradient(180deg, #0D171B 0%, #163037 100%)"
                  borderBottomRadius="12px"
                >
                  {[
                    "Release the trading application with a variety of advanced trading bots and customization settings",
                    "Launch NFT collection genesis and enable trading of NFT assets",
                    "Conduct thorough user testing and gather feedback for iterative improvements",
                    "Implement risk management features to ensure user fund safety",
                    "Integration of KYC/AML compliance protocols",
                  ].map((e) => (
                    <Flex alignItems="center">
                      <Box className="diamon-icon" />
                      <Text color="#A4B0B6">{e}</Text>
                    </Flex>
                  ))}
                </SimpleGrid>
              </Box>
              <Box className="shining-container">
                <Text className="shining-text">H1-2024</Text>
              </Box>
              <Box
                borderRadius="12px"
                border={"2px solid #1BBEF5"}
                maxW="760px"
              >
                <Box className="roadmap-title-container">
                  <Text>Ecosystem Expansion</Text>
                </Box>
                <SimpleGrid
                  p="24px"
                  spacing="12px"
                  bg="linear-gradient(180deg, #0D171B 0%, #163037 100%)"
                  borderBottomRadius="12px"
                >
                  {[
                    "Expand the platform's functionality by integrating with other trading platforms and decentralized exchanges (DEX)",
                    "Provide users with access to a wider range of trading options and liquidity pools",
                    "Enable seamless and secure asset transfers between integrated platforms",
                    "Implement cross-platform portfolio tracking and management features",
                  ].map((e) => (
                    <Flex alignItems="center">
                      <Box className="diamon-icon" />
                      <Text color="#A4B0B6">{e}</Text>
                    </Flex>
                  ))}
                </SimpleGrid>
              </Box>
              <Box className="shining-container">
                <Text className="shining-text">H2-2024</Text>
              </Box>
              <Box
                borderRadius="12px"
                border={"2px solid #1BBEF5"}
                maxW="760px"
              >
                <Box className="roadmap-title-container">
                  <Text>AI Trading</Text>
                </Box>
                <SimpleGrid
                  p="24px"
                  spacing="12px"
                  bg="linear-gradient(180deg, #0D171B 0%, #163037 100%)"
                  borderBottomRadius="12px"
                >
                  {[
                    "Integrate AI Trading capabilities to enhance trading strategies",
                    "Implement machine learning algorithms and predictive models to assist users in making informed trading decisions",
                    "Offer AI-powered trade signals and market analysis tools",
                    "Develop customizable AI trading bots to cater to different user preferences",
                    "Continuously refine AI algorithms based on real-time market data",
                  ].map((e) => (
                    <Flex alignItems="center">
                      <Box className="diamon-icon" />
                      <Text color="#A4B0B6">{e}</Text>
                    </Flex>
                  ))}
                </SimpleGrid>
              </Box>
              <Box className="shining-container">
                <Text className="shining-text">H1-2025</Text>
              </Box>
              <Box
                borderRadius="12px"
                border={"2px solid #1BBEF5"}
                maxW="760px"
              >
                <Box className="roadmap-title-container">
                  <Text>Mobile App Development</Text>
                </Box>
                <SimpleGrid
                  p="24px"
                  spacing="12px"
                  bg="linear-gradient(180deg, #0D171B 0%, #163037 100%)"
                  borderBottomRadius="12px"
                >
                  {[
                    "Begin development of a mobile app for iOS and Android",
                    "Design intuitive and user-friendly mobile interfaces for seamless trading experiences",
                    "Implement core trading functionalities in the mobile app, including order placement, portfolio tracking, and real-time market data",
                    "Enable push notifications and real-time alerts for price movements and trading opportunities",
                  ].map((e) => (
                    <Flex alignItems="center">
                      <Box className="diamon-icon" />
                      <Text color="#A4B0B6">{e}</Text>
                    </Flex>
                  ))}
                </SimpleGrid>
              </Box>
            </SimpleGrid>
          </Box>
        </SectionContainer>
        <SectionContainer
          aspectRatio={1.8}
          bgImage={TeamBG}
          bgRepeat="no-repeat"
          bgSize="cover"
          pt="48px"
        >
          <Heading className="heading" textAlign="center">
            Team Member
          </Heading>
          <SimpleGrid columns={teamList.length} spacing="24px">
            {teamList.map((e, index) => (
              <Flex direction="column">
                <Image
                  w="full"
                  aspectRatio={0.8}
                  alt="Tokenomic-cup"
                  src={e.avatar}
                />
                <Box className="member-infor-container">
                  <Box py="24px" px="12px" bg="#131a20">
                    <Text className="member-name-text linear-text-color-01">
                      {e.name}
                    </Text>
                  </Box>
                  <Box className="member-description-container">
                    <Text className="member-role-text">{e.role}</Text>
                    <Box h="2px" bg="#2A3741" />
                    <Text className="member-description-text">
                      {e.description}
                    </Text>
                  </Box>
                </Box>
              </Flex>
            ))}
          </SimpleGrid>
        </SectionContainer>
        <SectionContainer pb="84px">
          <Flex bgImage={ContactBg} className="contact-container">
            <Text className="contact-title linear-text-color-01">
              Keep in touch
            </Text>
            <Box>
              <Text className="contact-description">
                Ink Whale lets you earn fixed interest and other rewards
              </Text>
              <Flex className="contact-email-container">
                <Flex className="contact-email-icon">
                  <LuAtSign size="24px" color="#FFF" />
                </Flex>
                <Input
                  focusBorderColor="transparent"
                  className="contact-email-input"
                  placeholder="Enter your email"
                />
              </Flex>
            </Box>
            <Button px="24px" minW="300px" height="44px">
              Subscribe
            </Button>
          </Flex>
        </SectionContainer>
      </Box>
    </Box>
  );
};

export default HomePage;
