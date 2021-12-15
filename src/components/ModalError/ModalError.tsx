// Dependencies
import {
  Text,
  Modal,
  Heading,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { FormattedMessage } from 'react-intl'

// Components
import { IconExclamationCircle } from '../Icons'

interface ModalSuccessProps extends Pick<ReturnType<typeof useDisclosure>, 'isOpen' | 'onClose'> {
  errorMessageID?: ErrorMessageIDs
}

export default function ModalError({
  isOpen,
  onClose,
  errorMessageID
} : ModalSuccessProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="rgba(255, 255, 255, 0.8)" />

      <ModalContent padding="30px 0 54px">
        <ModalCloseButton />

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
      </ModalContent>
    </Modal>
  )
}
