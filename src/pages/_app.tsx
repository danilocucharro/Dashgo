import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react' //CRIANDO UM CONTEXTO DO CHAKRA PARA QUE TODO O PROJETO TENHA ACESSO AO CHAKRA
import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
