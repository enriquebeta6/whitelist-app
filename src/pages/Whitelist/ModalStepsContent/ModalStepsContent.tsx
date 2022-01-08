// Dependencies
import {
  Text,
  Heading,
  Spinner,
  ModalBody,
} from '@chakra-ui/react'
import { FormattedMessage } from 'react-intl'

interface ModalStepsContentProps {
  stepMessageID?: StepMessageIDs
}

export default function ModalStepsContent({ stepMessageID } : ModalStepsContentProps) {
  return (
    <ModalBody d="flex" flexDirection="column" alignItems="center" padding={6}>
      <Spinner size="xl" color="#FFB544" thickness="6px" />

      <Heading margin="24px 0" as='h1' fontSize="32px" color="gray.800">
        <FormattedMessage
          id={stepMessageID}
          defaultMessage={"Waiting transactions"}
        />
      </Heading>

      <Text textAlign={'justify'}>
        <FormattedMessage
          id={"donations.step.not-refresh"}
          defaultMessage={"Please don't refresh the page"}
        />
      </Text>
    </ModalBody>
  )
}
