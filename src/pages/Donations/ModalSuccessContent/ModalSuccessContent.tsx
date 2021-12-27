// Dependencies
import {
  Text,
  Link,
  Heading,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react'
import { FormattedMessage } from 'react-intl'

// Components
import { IconExternalLinkAlt, IconCheckCircle } from '../../../components/Icons'

interface ModalSuccessContentProps {
  hashTax: string
}

export default function ModalSuccessContent({ hashTax } : ModalSuccessContentProps) {
  const explorerURL = process.env.REACT_APP_PUBLIC_EXPLORER_URL
  const txURL = `${explorerURL}/tx/${hashTax}`

  return (
    <>
      <ModalBody d="flex" flexDirection="column" alignItems="center" padding={6}>
        <IconCheckCircle
          w={"80px"}
          h={"80px"}
          color="green.700"
        />

        <Heading margin="24px 0" as='h1' fontSize="32px" color="green.700">
          <FormattedMessage
            id="donations.modal.success.title"
            defaultMessage="Thank you for your donation!"
          />
        </Heading>

        <Text>
          <FormattedMessage
            id="donations.modal.success.text"
            defaultMessage="The donation has been confirmed succesfully, you can check the transaction in the following link"
          />
        </Text>
      </ModalBody>

      <ModalFooter padding="0 24px" d="flex" justifyContent="center">
        <Link
          d="flex"
          isExternal
          href={txURL}
          alignItems="center"
        >
          <FormattedMessage
            id="donations.modal.success.link"
            defaultMessage="View on BSCSCAN"
          />
          {' '}<IconExternalLinkAlt w={4} h={4} ml={2} />
        </Link>
      </ModalFooter>
    </>
  )
}
