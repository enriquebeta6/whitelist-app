// Dependencies
import { PropsWithChildren } from 'react'
import {
  Modal as ModalChakra,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalCloseButton
} from '@chakra-ui/react'

type ModalProps = Pick<ReturnType<typeof useDisclosure>, 'isOpen' | 'onClose'> & {
  showCloseButton?: boolean
};

export default function Modal({
  isOpen,
  onClose,
  children,
  showCloseButton = true
} : PropsWithChildren<ModalProps>) {
  return (
    <ModalChakra isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="rgba(255, 255, 255, 0.8)" />

      <ModalContent padding="30px 0 54px">
        {showCloseButton && (
          <ModalCloseButton />
        )}
        
        {children}
      </ModalContent>
    </ModalChakra>
  )
}
