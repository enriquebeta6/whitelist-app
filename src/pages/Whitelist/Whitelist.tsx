// Dependencies
import {
  Text,
  Button,
  Flex,
  chakra,
  Heading,
  ListItem,
  SimpleGrid,
  OrderedList,
} from '@chakra-ui/react'

import { FormattedMessage } from 'react-intl'

// Hooks
import { useDonations } from '../../hooks/useDonations'
import { useWhitelist } from '../../hooks/useWhitelist'

// Components
import Card from '../../components/Card/Card';
import Layout from '../../components/Layout/Layout';

function Whitelist() {
  const {
    isDonor,
    currentDonations,
    maxNumberOfDonators,
    checkIfIsDonator,
  } = useDonations();

  const {
    isWhitelisted,
    checkIfIsWhiteListed
  } = useWhitelist();

  return (
    <Layout>
      <chakra.main
        w="100%"
        flexWrap="wrap"
        rowGap={"1rem"}
        maxWidth="1440px"
        padding={{
          base: "0 16px",
          lg: "64px"
        }}
        d={{
          lg: "flex"
        }}
        justifyContent={{
          lg: "space-around"
        }}
        margin={{
          lg: "auto"
        }}
      >
        <chakra.div
          mb={{
            base: "1em",
            lg: 0
          }}
          maxWidth={{
            lg: '566px'
          }}
        >
          <Card>
            <SimpleGrid columns={1} spacing={4}>
              <Heading as='h1' fontSize="28px" color="#FFB544">
                <FormattedMessage
                  id="whitelist.title"
                  defaultMessage="Whitelist"
                />
              </Heading>

              <Heading as='h2' fontSize="16px" color="#FFB544">
                <FormattedMessage
                  id="benefits.title"
                  defaultMessage="Benefits"
                />
              </Heading>

              <OrderedList>
                <ListItem color="#CFCFCF" letterSpacing="0.01em" lineHeight="26px">
                  <FormattedMessage
                    id="benefits.item-1"
                    defaultMessage="Early access to TOKEN (TLC) pre-sale"
                  />
                </ListItem>

                <ListItem color="#CFCFCF" letterSpacing="0.01em" lineHeight="26px">
                  <FormattedMessage
                    id="benefits.item-2"
                    defaultMessage="Early access to the pre-sale of NFTs"
                  />
                </ListItem>

                <ListItem color="#CFCFCF" letterSpacing="0.01em" lineHeight="26px">
                  <FormattedMessage
                    id="benefits.item-3"
                    defaultMessage="Space in the Private Beta (PvE Survival Mode)"
                  />
                </ListItem>
              </OrderedList>

              {maxNumberOfDonators > 0 && (
                <>
                  <Heading as='h2' fontSize="16px" color="#FFB544">
                    <FormattedMessage
                      id="whitelist.allocations"
                      defaultMessage="Allocations"
                    />
                  </Heading>

                  <Flex>
                    <Text color="#FFB544" fontWeight="bold" mr={1}>
                      300
                    </Text>

                    <Text color="#CFCFCF">
                      <FormattedMessage
                        id="whitelist.allocations.from-giveaways"
                        defaultMessage="from giveaways"
                      />
                    </Text>
                  </Flex>

                  <Flex>
                    <Text color="#FFB544" fontWeight="bold" mr={1}>
                      2500
                    </Text>

                    <Text color="#CFCFCF">
                      <FormattedMessage
                        id="whitelist.allocations.from-donors"
                        defaultMessage="from donors"
                      />
                    </Text>
                  </Flex>
                </>
              )}
              
              <Flex
                wrap={"wrap"}
                rowGap={4}
                direction={{
                  base: 'column',
                  lg: 'row'
                }}
              >                
                {currentDonations >= 0 && isWhitelisted === null && (
                  <Button 
                    cursor="pointer"
                    onClick={checkIfIsWhiteListed}
                  >
                    <FormattedMessage
                      id="whitelist.button.check-if-is-whitelisted"
                      defaultMessage="Check if you're whitelisted"
                    />
                  </Button>
                )}
              </Flex>

              {isWhitelisted !== null && (
                <Text color={isWhitelisted ? "green.500" : "yellow.500"} fontSize="20px" fontWeight="bold">
                  {isWhitelisted && (
                    <FormattedMessage
                      id="whitelist.text.whitelisted"
                      defaultMessage="Congratulations, you're whitelisted"
                    />
                  )}

                  {!isWhitelisted && (
                    <FormattedMessage
                      id="whitelist.text.not-whitelisted"
                      defaultMessage="Sorry, you are'nt whitelisted"
                    />
                  )}
                </Text>
              )}
            </SimpleGrid>
          </Card>
        </chakra.div>

        <chakra.div
          mb={{
            base: "1em",
            lg: 0
          }}
          maxWidth={{
            lg: '566px'
          }}
        >
          <Card>
            <SimpleGrid columns={1} spacing={4} h="100%">
              <Heading as='h1' fontSize="28px" color="#FFB544">
                <FormattedMessage
                  id="donations.title"
                  defaultMessage="Donations"
                />
              </Heading>

              <Heading as='h2' fontSize="16px" color="#FFB544">
                <FormattedMessage
                  id="benefits.title"
                  defaultMessage="Benefits"
                />
              </Heading>

              <OrderedList>
                <ListItem color="#CFCFCF" letterSpacing="0.01em" lineHeight="26px">
                  <FormattedMessage
                    id="benefits.all-whitelist-benefits"
                    defaultMessage={`All whitelist benefits`}
                  />
                </ListItem>

                <ListItem color="#CFCFCF" letterSpacing="0.01em" lineHeight="26px">
                  <FormattedMessage
                    id="benefits.item-4"
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
                {currentDonations >= 0 && isDonor === null && (
                  <Button 
                    cursor="pointer"
                    onClick={checkIfIsDonator}
                  >
                    <FormattedMessage
                      id="donations.button.check-if-is-donor"
                      defaultMessage="Check if you're a donor"
                    />
                  </Button>
                )}
              </Flex>

              {isDonor !== null && (
                <Text color={isDonor ? "green.500" : "yellow.500"} fontSize="20px" fontWeight="bold">
                  {isDonor && (
                    <FormattedMessage
                      id="donations.text.donor"
                      defaultMessage="Congratulations, you're a donor"
                    />
                  )}

                  {!isDonor && (
                    <FormattedMessage
                      id="donations.text.not-a-donor"
                      defaultMessage="Sorry, you aren't a donor"
                    />
                  )}
                </Text>
              )}
            </SimpleGrid>
          </Card>
        </chakra.div>
      </chakra.main>
    </Layout>
  );
}

export default Whitelist;
