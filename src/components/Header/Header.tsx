// Dependencies
import { useState, useContext, useEffect } from 'react'
import {
  chakra,
  Flex,
  Image,
  Link,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useMediaQuery
} from "@chakra-ui/react"
import { FormattedMessage } from 'react-intl'

// Assets
import logo from '../../assets/logo.png'
import homeButton from '../../assets/home-button.png'
import connectButton from '../../assets/connect-button.png'

// Components
import { IconMenu, IconGlobe } from '../Icons'

// Utils
import { requestAccount } from "../../utils/requestAccount"

// Context
import { I18nContext } from '../../providers/I18nContextProvider'

function truncateAddress(address: string) {
  const addressStart = address.slice(0, 4)
  const addressEnd = address.slice(address.length - 4, address.length)

  return `${addressStart}...${addressEnd}`
}

export default function Header() {
  const { setLocale } = useContext(I18nContext)
  const [isLowerThanLG] = useMediaQuery('(max-width: 62em)')
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null)

  useEffect(() => {
    if (!window.ethereum) return

    async function fetchAccount() {
      try {
        const [address] =
          await window.ethereum.request({ method: 'eth_accounts' })

        address && setSelectedAddress(truncateAddress(address))
      } catch(error) {
        console.error(error)
      }
    }

    if (window.ethereum.isConnected()) {
      fetchAccount()
    }

    function handleAccountChange(accounts: string[]) {
      const [newAddress] = accounts

      if (newAddress) {
        setSelectedAddress(truncateAddress(accounts[0]))
      } else {
        setSelectedAddress(null)
      }
    }

    window.ethereum.on('accountsChanged', handleAccountChange);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountChange);
    }
  }, [])

  async function handleConnect() {
    try {
      const [address] = await requestAccount()

      setSelectedAddress(truncateAddress(address))
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <chakra.header
      padding={{
        base: "24px 10px",
        lg: "24px 64px"
      }}
      marginBottom="32px"
      position="relative"
      bgColor="rgba(0, 0, 0, 0.2)"
    >
      <Flex justifyContent={{
        base: 'center',
        lg: "space-between"
      }}>
        <Image
          src={logo}
          alt="Toys Legend Logo"
        />

        {isLowerThanLG && (
          <chakra.button
            d="flex"
            top="50%"
            right="16px"
            color="white"
            position="absolute"
            transform="translateY(-50%)"
          >
            <IconMenu />
          </chakra.button>
        )}

        {!isLowerThanLG && (
          <Flex alignItems="center">
            <Link mr={4} d="inline-block" href="https://toyslegend.io/" isExternal>
              <Image src={homeButton} alt="Home button" />
            </Link>

            {!selectedAddress && (
              <chakra.button mr={4} onClick={handleConnect}>
                <Image src={connectButton} alt="Connect button" />
              </chakra.button>
            )}

            {selectedAddress && (
              <Text color="#FFB544" mr={4} fontWeight={'bold'}>
                {selectedAddress}
              </Text>
            )}

            <Menu>
              <MenuButton
                as={Button}
                color="white"
                background='rgba(0, 0, 0, 0)'
                _active={{
                  color: 'white',
                  background: 'rgba(0, 0, 0, 0)'
                }}
                _hover={{
                  color: 'white',
                  background: 'rgba(0, 0, 0, 0)'
                }}
                _focus={{
                  outline: "none"
                }}
              >
                <Flex alignItems="center">
                  <IconGlobe mr={2} />

                  <FormattedMessage
                    id="menu.language"
                    defaultMessage="Donations"
                  />
                </Flex>
              </MenuButton>

              <MenuList border={0} background={'rgba(0, 0, 0, 0.2)'} transform="translateY(16px) !important">
                <MenuItem
                  color="white"
                  onClick={() => setLocale('pt-BR')}
                  _hover={{
                    background: 'initial'
                  }}
                  _active={{
                    background: 'initial'
                  }}
                  _focus={{
                    background: 'initial'
                  }}
                >
                  <FormattedMessage
                    id="menu.language.portuguese"
                    defaultMessage="Donations"
                  />
                </MenuItem>

                <MenuItem
                  color="white"
                  onClick={() => setLocale('es-VE')}
                  _hover={{
                    background: 'initial'
                  }}
                  _active={{
                    background: 'initial'
                  }}
                  _focus={{
                    background: 'initial'
                  }}
                >
                  <FormattedMessage
                    id="menu.language.spanish"
                    defaultMessage="Donations"
                  />
                </MenuItem>

                <MenuItem
                  color="white"
                  onClick={() => setLocale('en-US')}
                  _hover={{
                    background: 'initial'
                  }}
                  _active={{
                    background: 'initial'
                  }}
                  _focus={{
                    background: 'initial'
                  }}
                >
                  <FormattedMessage
                    id="menu.language.english"
                    defaultMessage="Donations"
                  />
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        )}
      </Flex>
    </chakra.header>
  )
}
