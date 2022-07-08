import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react' //CRIANDO UM CONTEXTO DO CHAKRA PARA QUE TODO O PROJETO TENHA ACESSO AO CHAKRA
import { theme } from '../styles/theme'
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext'
import { makeServer } from '../services/mirage'
import { QueryClientProvider, QueryClient } from 'react-query'

if(process.env.NODE_ENV === 'development'){// certificando que o servidor que esta rodando o app é de desenvolvimento
  makeServer();
}

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
