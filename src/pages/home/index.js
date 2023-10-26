import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import AppLogoText from "assets/img/app-logo-text.png";
import AvatarImage from "assets/img/avatar.png";
import ContactBg from "assets/img/contact-bg.png";
import DepositAmountCircle from "assets/img/deposit-amount-circle.png";
import DepositBG from "assets/img/deposit-home-bg.png";
import HomeBannerBG from "assets/img/home-banner-bg.png";
import RoadmapBG from "assets/img/roadmap-bg.png";
import TeamBG from "assets/img/team-bg.png";
import TokenomicBG from "assets/img/tokenomic-bg.png";
import TokenomicCup from "assets/img/tokenomic-cup.png";
import { NavbarLandingPage } from "components/Navbar/NavbarLandingPage";
import { SectionContainer } from "components/container";
import { AppIcon } from "components/icons";
import { LuAtSign } from "react-icons/lu";
import "./styles.css";
import betaz_token from "utils/contracts/betaz_token_calls";
import { useState, useCallback, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserBalance, fetchBuyStatus } from "store/slices/substrateSlice";
import { formatTokenBalance } from "utils";
import { clientAPI } from "api/client";
import { convertTimeStampToNumber } from "utils";
import CommonButton from "components/button/commonButton";
import useInterval from "hooks/useInterval";
import BETAZCountDown from "components/countdown/CountDown";
import StakingPool from "components/stakingPool/StakingPool";

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

const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

const HomePage = () => {
  const dispatch = useDispatch();
  const { currentAccount, buyStatus } = useSelector((s) => s.substrate);
  const [maxbuyAmount, setMaxbuyAmount] = useState(10);
  const [azeroAmount, setAzeroAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenRatio, setTokenRatio] = useState(0);

  /*************** Count down time ********************/
  let endTimeNumber = convertTimeStampToNumber(buyStatus?.endTime);
  useInterval(() => {
    dispatch(fetchBuyStatus());
  }, 7000);

  /*************** End Count down time ********************/

  /*************** Buy token ******************************/
  const getMaxbuy = async () => {
    const [amountTokenSold, amountMaxBuy, tokenRatio] = await Promise.all([
      await betaz_token.getAmountTokenSold(defaultCaller),
      await betaz_token.getMaxBuyAmount(defaultCaller),
      await betaz_token.getTokenRatio(defaultCaller),
    ]);
    setMaxbuyAmount(
      (
        (parseFloat(amountMaxBuy?.replaceAll(",", "")) -
          parseFloat(amountTokenSold?.replaceAll(",", ""))) /
        tokenRatio
      ).toFixed(4)
    );
    setTokenRatio(tokenRatio);
  };

  const onChangeToken = useCallback((e) => {
    const { value } = e.target;
    const reg = /^\d*\.?\d*$/;
    let tokenValue = 0;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      tokenValue = parseFloat(value);
      if (tokenValue < 0) tokenValue = 1;
      if (tokenValue > maxbuyAmount) {
        toast.error("Not enough Balance!");
        setAzeroAmount(maxbuyAmount);
      } else {
        setAzeroAmount(value);
      }
    }
  });

  const buy = async () => {
    const difference = endTimeNumber - +new Date();
    if (azeroAmount === "") {
      toast.error("invalid inputs!");
      return;
    }
    if (difference <= 0) {
      toast.error("End time buy!");
      return;
    }
    if (!buyStatus?.status) {
      toast.error("Can not buy!");
      return;
    }
    setIsLoading(true);
    if (currentAccount?.address) {
      let buyAmount = parseFloat(azeroAmount);
      const result = await betaz_token.buy(currentAccount, buyAmount);
      if (result) {
        toast.success(`Buy BetAZ success`);
        dispatch(fetchUserBalance({ currentAccount }));
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMaxbuy();
  }, [onChangeToken]);

  /*************** End Buy token ******************************/

  /*************** Send mail **********************************/
  const [input, setInput] = useState("");

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSendEmail = async (email) => {
    const match = email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const options = {
      email: email,
      subject: "Welcome to BETAZ",
      text: "Thanks for subscribe!",
    };

    if (email === "") toast.error("Email is required!");
    else if (!match) {
      toast.error("Email is invalid!");
    } else {
      setIsLoading(true);
      const toastSendEmail = toast.loading("Sending email...");
      const emailExist = await clientAPI("post", "/getEmailExist", {
        email: email,
      });

      if (emailExist === email) {
        toast.error("Email already exists!");
      } else {
        const subscribe = await clientAPI("post", "/sendEmail", options);
        if (subscribe) toast.success("subcribe success");
      }
      setIsLoading(false);
      toast.dismiss(toastSendEmail);
    }
  };
  /*************** End Send mail ******************************/

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
          id="section-tokenomic"
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
          id="section-deposit"
          pb="84px"
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
                      value={azeroAmount}
                      onChange={onChangeToken}
                      // type="number"
                    />
                    <Flex
                      w="100px"
                      alignItems="center"
                      gap={1}
                      pl="4px"
                      borderLeft="2px solid rgba(255, 255, 255, 0.4)"
                    >
                      <AppIcon size="18px" />
                      BetAZ
                    </Flex>
                  </Flex>
                </Box>
                <Flex direction="column" alignItems="center" mt="24px">
                  <CommonButton
                    onClick={() => buy()}
                    text="BUY NOW"
                    isLoading={isLoading}
                  />
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
                  {!isNaN(maxbuyAmount)
                    ? formatTokenBalance(maxbuyAmount * tokenRatio, 4)
                    : 0}
                </Text>
                <Box>
                  <Text className="deposit-circle-finish-title">
                    Finishes in:
                  </Text>
                  <BETAZCountDown date={endTimeNumber} />
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
          id="section-roadmap"
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
          pb="84px"
          id="section-team-member"
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
        <SectionContainer pb="84px" id="section-contact-us">
          <FormControl>
            <Flex bgImage={ContactBg} className="contact-container">
              <Text className="contact-title linear-text-color-01">
                Keep in touch
              </Text>
              <Box>
                <Text className="contact-description">
                  BETAZ lets you earn fixed interest and other rewards
                </Text>
                <Flex className="contact-email-container">
                  <Flex className="contact-email-icon">
                    <LuAtSign size="24px" color="#FFF" />
                  </Flex>
                  <Input
                    type="email"
                    value={input}
                    onChange={handleInputChange}
                    focusBorderColor="transparent"
                    className="contact-email-input"
                    placeholder="Enter your email"
                  />
                </Flex>
              </Box>
              <Button
                px="24px"
                minW="300px"
                height="44px"
                isDisabled={isLoading}
                onClick={() => handleSendEmail(input)}
              >
                Subscribe
              </Button>
            </Flex>
          </FormControl>
        </SectionContainer>
      </Box>
      <StakingPool />
    </Box>
  );
};

export default HomePage;
