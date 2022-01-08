// Dependencies
import { chakra } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export default function Card({ children }: PropsWithChildren<unknown>) {
  return (
    <chakra.article
      borderRadius="3xl"
      bg="rgba(0, 0, 0, 0.2)"
      padding={{
        base: 4,
        lg: 6
      }}
      h="100%"
    >
      {children}
    </chakra.article>
  )
}
