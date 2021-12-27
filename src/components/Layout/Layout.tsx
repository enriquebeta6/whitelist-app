// Dependencies
import { PropsWithChildren } from "react"
import { chakra } from "@chakra-ui/react"

// Assets
import background from '../../assets/background.png'

// Components
import Header from "../Header/Header"
import Footer from "../Footer/Footer"

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <chakra.div
      d="flex"
      height="auto"
      minHeight="100vh"
      flexDirection="column"
      bgGradient={{
        base: "linear-gradient(180deg, #0D80C2 0%, #0E0C5B 100%)",
        lg: "linear-gradient(122.26deg, #0D80C2 15.83%, #0E0C5B 84.01%)"
      }}
    >
      <chakra.div
        _before={{
          h: "100%",
          w: "100%",
          d: "block",
          opacity: 0.1,
          content: `""`,
          position: "absolute",
          bg: `url(${background})`,
          bgSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <chakra.div
        d="flex"
        zIndex={1}
        minHeight="100vh"
        flexDirection="column"
        position="relative"
      >
        <Header />

        {children}

        <Footer />
      </chakra.div>
    </chakra.div>
  )
}
