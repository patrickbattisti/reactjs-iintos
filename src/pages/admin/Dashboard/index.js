import React from 'react';

import { Card1, Card3, Card4, Text, Card2, Container } from './styles';

import Events from './components/Events';
import Campaign from './components/Campaign';
import Projects from './components/Projects';
import Activities from './components/Activities';
import { useUserContext } from '~/context/UserContext';

const Dashboard = () => {
  const { user } = React.useCallback(useUserContext(), []);

  const isUserIIntos = React.useMemo(
    () => user?.role === 'IINTOS-Admin' || user?.role === 'IINTOS-Partner',
    [user] //      user?.role === 'Admin',
  );

  return (
    <Container>
      <Card1>
        <Text>Events</Text>
        <Events />
      </Card1>

      <Card2>
        <Text>Campaign</Text>
        <Campaign />
      </Card2>

      <Card3>
        <Text>My Projects</Text>
        <Projects />
      </Card3>

      <Card4>
        <Text>Activities</Text>
        <Activities />
      </Card4>
    </Container>
  );
};

export default Dashboard;
