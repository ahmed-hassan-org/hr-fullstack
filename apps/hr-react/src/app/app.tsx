import { Container } from '@chakra-ui/react';
import './app.scss';
import Routing from './core/router/Routing';

export function App() {
  return (
    <Container bg={'gray.50'} maxW={'full'} h={'100vh'}>
      <Routing />
    </Container>
  );
}

export default App;
