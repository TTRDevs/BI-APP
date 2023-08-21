import React from 'react';
import DashboardBox from '@/components/DashboardBox';

type Props = {};

function Row3(props: Props) {
  return (
    <>
      <DashboardBox gridArea="g" />
      <DashboardBox gridArea="h" />
      <DashboardBox gridArea="i" />
      <DashboardBox gridArea="j" />
    </>
  );
}

export default Row3;
