// Dependencies
import {
  Text,
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
import donateButton from '../../assets/donate-button.png'

// Hooks
import { useDonations } from '../../hooks/useDonations'

// Components
import Card from '../../components/Card/Card';
import Layout from '../../components/Layout/Layout';
import ModalError from '../../components/ModalError/ModalError';
import ModalSuccess from '../../components/ModalSuccess/ModalSuccess';

function Donations() {
  const [isLowerThanLG] = useMediaQuery('(max-width: 62em)')
  const {
    hashTax,
    setHashTax,
    status,
    setStatus,
    errorMessageID,
    currentDonations,
    maxNumberOfDonators,
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

              <Flex>
                <Text color="#CFCFCF" lineHeight="26px" mr={1}>
                  <FormattedMessage
                    id="donations.current-donors"
                    defaultMessage="Current Donors"
                  />
                  :
                </Text>

                <Text color="#FFB544" lineHeight="26px" fontWeight="bold">
                  {currentDonations} / {maxNumberOfDonators}
                </Text>
              </Flex>

              <chakra.button onClick={makeDonation}>
                <Image src={donateButton} alt="Donate button" />
              </chakra.button>
            </SimpleGrid>
          </Card>
        </chakra.div>

        {isLowerThanLG && (
          <Image src={character} margin="2rem auto" />
        )}
      </chakra.main>

      <ModalSuccess
        hashTax={hashTax}
        isOpen={!!hashTax}
        onClose={() => {
          setHashTax(null)
        }}
      />

      <ModalError
        errorMessageID={errorMessageID}
        isOpen={status === 'error'}
        onClose={() => {
          setStatus('idle')
        }}
      />
    </Layout>
  );
}

export default Donations;
