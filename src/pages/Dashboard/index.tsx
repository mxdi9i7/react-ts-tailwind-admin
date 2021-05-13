import React, { useState } from 'react';
import Layout from '../../components/Layout';

interface Props {}

const DashboardPage: React.FC<Props> = (props: Props) => {
  const [state, setState] = useState();
  return (
    <Layout>
      <h1>dash</h1>
    </Layout>
  );
};

export default DashboardPage;
