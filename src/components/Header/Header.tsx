// Dependencies
import { useState, useContext, useEffect } from 'react'
import {
  chakra,
  Flex,
  Image,
  Link,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useMediaQuery,
  useDisclosure
} from "@chakra-ui/react"
import { FormattedMessage } from 'react-intl'

// Assets
import logo from '../../assets/logo.png'
import usa from '../../assets/flags/usa.png'
import spain from '../../assets/flags/spain.png'
import brazil from '../../assets/flags/brazil.png'

// Components
import { IconMenu, IconGlobe, IconExternalLinkAlt } from '../Icons'

// Utils
import { requestAccount } from "../../utils/requestAccount"

// Context
import { I18nContext } from '../../providers/I18nContextProvider'

// Hooks
import { useProvider } from '../../hooks/useProvider'

function truncateAddress(address: string) {
  const addressStart = address.slice(0, 4)
  const addressEnd = address.slice(address.length - 4, address.length)

  return `${addressStart}...${addressEnd}`
}

interface HeaderMenuProps {
  onConnect: () => void
  selectedAddress: string | null
}

function HeaderMenu({ selectedAddress, onConnect } : HeaderMenuProps) {
  const { setLocale } = useContext(I18nContext)

  return (
    <Flex alignItems="center">
      <Link
        mr={6}
        isExternal
        color={'white'}
        d="inline-flex"
        alignItems={'center'}
        fontWeight={'semibold'}
        href="https://toyslegend.io/"
        _focus={{
          outline: "none"
        }}
      >
        <FormattedMessage
          id="donations.link.back-to-home"
          defaultMessage="Return to Home"
        />

        <IconExternalLinkAlt ml={2} />
      </Link>

      {!selectedAddress && (
        <Button 
          mr={6}
          color="white"
          padding="0 24px"
          cursor="pointer"
          onClick={onConnect}
          transition="all .3s ease-in-out"
          background="rgba(13, 128, 194, 0.6)"
          _hover={{
            background: "#0d80c2"
          }}
        >
          <FormattedMessage
            id="donations.link.connect-wallet"
            defaultMessage="Connect wallet"
          />
        </Button>
      )}

      {selectedAddress && (
        <Text color="#FFB544" mr={4} fontWeight='bold'>
          {selectedAddress}
        </Text>
      )}

      <Menu>
        <MenuButton
          as={Button}
          padding={0}
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
              defaultMessage="Language"
            />
          </Flex>
        </MenuButton>

        <MenuList border={0} background={'rgba(0, 0, 0, 0.2)'} transform="translateY(16px) !important">
          <MenuItem
            color="white"
            onClick={() => setLocale('pt')}
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
            <Image
              mr={4}
              w='16px'
              h='16px'
              src={brazil}
              alt="Brazil Flag"
            />

            <FormattedMessage
              id="menu.language.portuguese"
              defaultMessage="Portuguese"
            />
          </MenuItem>

          <MenuItem
            color="white"
            onClick={() => setLocale('es')}
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
            <Image
              mr={4}
              w='16px'
              h='16px'
              src={spain}
              alt="Spain Flag"
            />
            
            <FormattedMessage
              id="menu.language.spanish"
              defaultMessage="Spanish"
            />
          </MenuItem>

          <MenuItem
            color="white"
            onClick={() => setLocale('en')}
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
            <Image
              mr={4}
              w='16px'
              h='16px'
              src={usa}
              alt="USA Flag"
            />

            <FormattedMessage
              id="menu.language.english"
              defaultMessage="English"
            />
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}

function HeaderMenuMobile({ selectedAddress, onConnect } : HeaderMenuProps) {
  const { setLocale } = useContext(I18nContext)

  return (
    <Flex direction={'column'} alignItems='flex-start'>
      <Link
        isExternal
        color={'white'}
        d="inline-flex"
        alignItems={'center'}
        fontWeight={'semibold'}
        href="https://toyslegend.io/"
        _focus={{
          outline: "none"
        }}
      >
        <FormattedMessage
          id="donations.link.back-to-home"
          defaultMessage="Return to Home"
        />
      </Link>

      {!selectedAddress && (
        <Button
          padding={0}
          color="white"
          cursor="pointer"
          onClick={onConnect}
          transition="all .3s ease-in-out"
          background="rgba(13, 128, 194, 0.6)"
          _hover={{
            background: "#0d80c2"
          }}
        >
          <FormattedMessage
            id="donations.link.connect-wallet"
            defaultMessage="Connect wallet"
          />
        </Button>
      )}

      {selectedAddress && (
        <Text color="#FFB544" fontWeight='bold'>
          {selectedAddress}
        </Text>
      )}

      <Button
        padding={0}
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
            defaultMessage="Language"
          />
        </Flex>
      </Button>

      <Button
        padding={0}
        color="white"
        onClick={() => setLocale('pt')}
        background='initial'
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
        <Image
          mr={4}
          w='16px'
          h='16px'
          src={brazil}
          alt="Brazil Flag"
        />

        <FormattedMessage
          id="menu.language.portuguese"
          defaultMessage="Portuguese"
        />
      </Button>

      <Button
        padding={0}
        color="white"
        onClick={() => setLocale('es')}
        background='initial'
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
        <Image
          mr={4}
          w='16px'
          h='16px'
          src={spain}
          alt="Spain Flag"
        />
        
        <FormattedMessage
          id="menu.language.spanish"
          defaultMessage="Spanish"
        />
      </Button>

      <Button
        padding={0}
        color="white"
        background='initial'
        onClick={() => setLocale('en')}
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
        <Image
          mr={4}
          w='16px'
          h='16px'
          src={usa}
          alt="USA Flag"
        />

        <FormattedMessage
          id="menu.language.english"
          defaultMessage="English"
        />
      </Button>
    </Flex>
  )
}

export default function Header() {
  const provider = useProvider()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLowerThanLG] = useMediaQuery('(max-width: 62em)')
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null)

  useEffect(() => {
    if (!window.ethereum) return

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

    fetchAccount()
  }, [provider])

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
            onClick={onOpen}
            position="absolute"
            transform="translateY(-50%)"
          >
            <IconMenu />
          </chakra.button>
        )}

        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
        >
          <DrawerOverlay />

          <DrawerContent background='#0D80C2'>
            <DrawerCloseButton color="white" />
          
            <DrawerHeader color='white'>Menu</DrawerHeader>

            <DrawerBody>
              <HeaderMenuMobile selectedAddress={selectedAddress} onConnect={handleConnect} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        {!isLowerThanLG && (
          <HeaderMenu selectedAddress={selectedAddress} onConnect={handleConnect} />
        )}
      </Flex>
    </chakra.header>
  )
}
