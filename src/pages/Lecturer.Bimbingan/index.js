import { Layout } from './Layout'
import React, { useMemo } from 'react'
import Helmet from "react-helmet";
import { Navigation } from 'pages/Root/hoc'
import { useRouteMatch } from 'react-router'
import List from 'pages/Lecturer.Bimbingan.List';
import Details from 'pages/Lecturer.Bimbingan.Details';

export const LecturerBimbingan = () => {
  const { path } = useRouteMatch();
  const navigation = useMemo(() => ([
    {
      "component": List,
      "path": `/`,
      exact: true,
      icon: 'home'
    },
    {
      "component": Details,
      "path": `/mahasiswa/:id`,
      exact: true,
      icon: 'home'
    },
  ]), []);

  return (
    <>
      <Helmet>
        <title>Dashboard - Bimbingan</title>
      </Helmet>
      <Navigation base={path} navigation={navigation}>
        <Layout />
      </Navigation>
    </>
  )
}