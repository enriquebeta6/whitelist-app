// Dependencies
import {
  Text,
  Heading,
  ModalBody,
} from '@chakra-ui/react'
import { FormattedMessage } from 'react-intl'

// Components
import { IconExclamationCircle } from '../../../components/Icons'

interface ModalErrorContentProps {
  errorMessageID?: ErrorMessageIDs
}

export default function ModalErrorContent({
  errorMessageID
} : ModalErrorContentProps) {
  return (
    <ModalBody d="flex" flexDirection="column" alignItems="center" padding={6}>
      <IconExclamationCircle
        w={"80px"}
        h={"80px"}
        color="red.600"
      />

      <Heading margin="24px 0" as='h1' fontSize="32px" color="red.600">
        <FormattedMessage
          id={"donations.error.generic.title"}
          defaultMessage={"Something went wrong"}
        />
      </Heading>

      <Text textAlign={'justify'}>
        <FormattedMessage
          id={errorMessageID}
          defaultMessage={"Please try again"}
        />
      </Text>
    </ModalBody>
  )
}
