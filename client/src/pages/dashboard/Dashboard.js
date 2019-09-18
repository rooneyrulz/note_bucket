import React from 'react';
import { Jumbotron } from 'reactstrap';

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <Jumbotron style={{ background: 'transparent' }}>
        <h1 className="text-primary display-4">Dashboard</h1>
      </Jumbotron>
    </div>
  );
};

export default Dashboard;
