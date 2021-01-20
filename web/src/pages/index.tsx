import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { Container } from '../pages-styles/index';
import Header from '../components/Header';

const Home = () => {
  return (
    <Container>
      <Header />
    </Container>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
