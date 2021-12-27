// Dependencies
import {
  Text,
  Button,
  Flex,
  Image,
  chakra,
  Heading,
  ListItem,
  SimpleGrid,
  OrderedList,
  useMediaQuery,
} from '@chakra-ui/react'

import { FormattedMessage } from 'react-intl'

// Assets
import character from '../../assets/character.png'

// Hooks
import { useDonations } from '../../hooks/useDonations'

// Components
import Card from '../../components/Card/Card';
import Modal from '../../components/Modal/Modal';
import Layout from '../../components/Layout/Layout';
import ModalErrorContent from './ModalErrorContent/ModalErrorContent';
import ModalStepsContent from './ModalStepsContent/ModalStepsContent';
import ModalSuccessContent from './ModalSuccessContent/ModalSuccessContent';

function Donations() {
  const [isLowerThanLG] = useMediaQuery('(max-width: 62em)')
  const {
    hashTax,
    setHashTax,
    status,
    setStatus,
    isDonor,
    stepMessageID,
    errorMessageID,
    currentDonations,
    maxNumberOfDonators,
    checkIfIsDonator,
    makeDonation
  } = useDonations();

  return (
    <Layout>
      <chakra.main
        w="100%"
        maxWidth="1440px"
        padding={{
          base: "0 16px",
          lg: "64px"
        }}
        d={{
          lg: "flex"
        }}
        alignItems={{
          lg: "center"
        }}
        justifyContent={{
          lg: "space-around"
        }}
        margin={{
          lg: "auto"
        }}
      >
        {!isLowerThanLG && (
          <Image src={character} maxWidth="580px" w="100%" />
        )}

        <chakra.div maxWidth={{
          lg: '566px'
        }}>
          <Card>
            <SimpleGrid columns={1} spacing={4}>
              <Heading as='h1' fontSize="28px" color="#FFB544">
                <FormattedMessage
                  id="donations.title"
                  defaultMessage="Donations"
                />
              </Heading>

              <Heading as='h2' fontSize="16px" color="#FFB544">
                <FormattedMessage
                  id="donations.benefits.title"
                  defaultMessage="Benefits"
                />
              </Heading>

              <OrderedList>
                <ListItem color="#CFCFCF" letterSpacing="0.01em" lineHeight="26px">
                  <FormattedMessage
                    id="donations.benefits.item-1"
                    defaultMessage="Early access to TOKEN (TLC) pre-sale"
                  />
                </ListItem>

                <ListItem color="#CFCFCF" letterSpacing="0.01em" lineHeight="26px">
                  <FormattedMessage
                    id="donations.benefits.item-2"
                    defaultMessage="Early access to the pre-sale of NFTs"
                  />
                </ListItem>

                <ListItem color="#CFCFCF" letterSpacing="0.01em" lineHeight="26px">
                  <FormattedMessage
                    id="donations.benefits.item-3"
                    defaultMessage="Space in the Private Beta (PvE Survival Mode)"
                  />
                </ListItem>

                <ListItem color="#CFCFCF" letterSpacing="0.01em" lineHeight="26px">
                  <FormattedMessage
                    id="donations.benefits.item-4"
                    defaultMessage={`Donor's Halo: NFT skill card that increases your character's stats and adds an aesthetic accessory. Only 2500 units will be available and these could be traded.`}
                  />
                </ListItem>
              </OrderedList>

              {maxNumberOfDonators > 0 && (
                <Flex>
                  <Text color="#CFCFCF" mr={1}>
                    <FormattedMessage
                      id="donations.current-donors"
                      defaultMessage="Current Donors"
                    />
                    :
                  </Text>
                  
                  <Text color="#FFB544" fontWeight="bold">
                    {currentDonations} / {maxNumberOfDonators}
                  </Text>
                </Flex>
              )}
              
              <Flex
                wrap={"wrap"}
                rowGap={4}
                direction={{
                  base: 'column',
                  lg: 'row'
                }}
              >
                {currentDonations !== maxNumberOfDonators && (
                  <Button
                    mr={4}
                    w={{
                      base: '100%',
                      lg: 'auto'
                    }}
                    color="white"
                    cursor="pointer"
                    padding="0 24px"
                    onClick={makeDonation}
                    transition="all .3s ease-in-out"
                    background="rgba(13, 128, 194, 0.6)"
                    _hover={{
                      background: "#0d80c2"
                    }}
                  >
                    <FormattedMessage
                      id="donations.button.donate"
                      defaultMessage="Donate 25 BUSD"
                    />
                  </Button>
                )}
                
                {currentDonations > 0 && isDonor === null && (
                  <Button 
                    cursor="pointer"
                    onClick={checkIfIsDonator}
                  >
                    <FormattedMessage
                      id="donations.button.check-whitelisted"
                      defaultMessage="Check if you're whitelisted"
                    />
                  </Button>
                )}
              </Flex>

              {maxNumberOfDonators > 0 && currentDonations === maxNumberOfDonators && (
                <Text color="red.500" fontWeight="bold">
                  <FormattedMessage
                    id="donations.text.sold-out"
                    defaultMessage="Sold out"
                  />
                </Text>
              )}
              
              {isDonor !== null && (
                <Text color={isDonor ? "green.500" : "yellow.500"} fontSize="20px" fontWeight="bold">
                  {isDonor && (
                    <FormattedMessage
                      id="donations.text.whitelisted"
                      defaultMessage="Congratulations, you're whitelisted"
                    />
                  )}

                  {!isDonor && (
                    <FormattedMessage
                      id="donations.text.not-whitelisted"
                      defaultMessage="Sorry, you are'nt whitelisted"
                    />
                  )}
                </Text>
              )}
            </SimpleGrid>
          </Card>
        </chakra.div>

        {isLowerThanLG && (
          <Image src={character} margin="2rem auto" />
        )}
      </chakra.main>
      
      <Modal
        showCloseButton={status !== 'loading'}
        isOpen={status !== 'idle'}
        onClose={() => {
          setHashTax(null)
          setStatus('idle')
        }}
      > 
        {status === 'loading' && (
          <ModalStepsContent stepMessageID={stepMessageID} />
        )}

        {status === 'success' && hashTax && (
          <ModalSuccessContent hashTax={hashTax} />
        )}

        {status === 'error' && (
          <ModalErrorContent errorMessageID={errorMessageID} />
        )}
      </Modal>
    </Layout>
  );
}

export default Donations;
