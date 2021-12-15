// Dependencies
import { chakra, Text, Link, SimpleGrid, Flex } from '@chakra-ui/react'
import { FormattedMessage } from 'react-intl'

// Components
import { IconDiscord, IconFacebook, IconInstagram, IconTelegram, IconTwitter } from '../Icons'

export default function Footer() {
  return (
    <chakra.footer
      mt='auto'
      bg="rgba(0, 0, 0, 0.2)"
      padding={{
        base: "24px 16px",
        lg: "32px 64px"
      }}
    >
      <Flex
        alignItems="center"
        direction={{
          base: "column",
          lg: "row-reverse"
        }}
        justifyContent={{
          lg: "space-between"
        }}
      >
        <SimpleGrid columns={5} spacing={6} mb={{
          base: 4,
          lg: 0
        }}>
          <Link color="white" href="https://discord.gg/fvm54EJFs7" isExternal>
            <IconDiscord />
          </Link>

          <Link color="white" href="https://t.me/toyslegendnft" isExternal>
            <IconTelegram />
          </Link>

          <Link color="white" href="https://twitter.com/ToysLegendNFT" isExternal>
            <IconTwitter />
          </Link>

          <Link color="white" href="https://www.facebook.com/groups/toyslegend" isExternal>
            <IconFacebook />
          </Link>

          <Link color="white" href="https://www.instagram.com/toyslegendNFT/" isExternal>
            <IconInstagram />
          </Link>
        </SimpleGrid>

        <Text color="#CFCFCF" lineHeight="24px">
          <FormattedMessage
            id="footer.copyright"
            defaultMessage="Toys Legend. All Rights Reserved"
          />
        </Text>
      </Flex>
    </chakra.footer>
  )
}
