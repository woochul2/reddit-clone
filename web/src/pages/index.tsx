import { withUrqlClient } from 'next-urql';
import Header from '../components/Header';
import { Container } from '../pages-styles/index';
import { createUrqlClient } from '../utils/createUrqlClient';

const Home = () => {
  return (
    <Container>
      <Header />
    </Container>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
