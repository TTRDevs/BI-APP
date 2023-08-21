import React from 'react';
import DashboardBox from '@/components/DashboardBox';

type Props = {};

function Row2(props: Props) {
  return (
    <>
      <DashboardBox gridArea="d" />
      <DashboardBox gridArea="e" />
      <DashboardBox gridArea="f" />
    </>
  );
}

export default Row2;
