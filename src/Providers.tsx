// Dependencies
import { PropsWithChildren } from 'react'
import { ChakraProvider } from '@chakra-ui/react'

// Theme
import theme from './config/theme/theme'

// Providers
import I18nContextProvider from './providers/I18nContextProvider'

export default function Providers({ children }: PropsWithChildren<unknown>) {
  return (
    <I18nContextProvider>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </I18nContextProvider>
  )
}
