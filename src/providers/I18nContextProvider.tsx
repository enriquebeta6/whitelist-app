// Dependencies
import { PropsWithChildren, useState, createContext } from 'react'
import { IntlProvider } from 'react-intl'

// Messages
import enUS from '../lang/en-US.json'
import esVE from '../lang/es-VE.json'
import ptBR from '../lang/pt-BR.json'

const [initialState] = navigator.language.split('-');

export const I18nContext = createContext({
  locale: initialState,
  setLocale: (_newLocale: string) => {}
})

const messages: Record<string, Record<string, string>> = {
  en: enUS,
  es: esVE,
  pt: ptBR
}

export default function I18nContextProvider({ children }: PropsWithChildren<unknown>) {
  const [locale, setLocale] = useState(initialState)

  return (
    <I18nContext.Provider value={{ locale, setLocale }}>
      <IntlProvider locale={locale} key={locale} defaultLocale="en-US" messages={messages[locale]}>
        {children}
      </IntlProvider>
    </I18nContext.Provider>
  )
}
