import React from 'react';
import { Breadcrumbs, Typography, Link as LinkButton } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import { Home as HomeIcon } from '@material-ui/icons';
import styled from 'styled-components';

const StyledHomeIcon = styled(HomeIcon)`
  margin-right: 5px;
  margin-bottom: 0px;
  width: 20px;
  height: 20px;
`;

const StyledBreadcrumbs = styled(Breadcrumbs)`
  padding: 20px 10px;
  padding-bottom: 10px;
`;

const NavBar: React.FC = () => {
  const { path } = useParams();

  const pathList = (path || '').split('/');

  let pathString = '';

  const breadcrubsChilds = [];

  for (let i = 0; i < pathList.length; i++) {
    const row = pathList[i];
    if (i === 0 && row === '') continue;
    pathString += `/${row}`;

    if (i === pathList.length - 1) {
      breadcrubsChilds.push(<Typography color="textPrimary">{row}</Typography>);
      continue;
    }

    const link = `/storage${pathString}`;

    breadcrubsChilds.push(
      <LinkButton
        style={{ display: 'flex' }}
        component={Link}
        to={link}
        color="inherit"
      >
        {row}
      </LinkButton>,
    );
  }

  return (
    <StyledBreadcrumbs aria-label="breadcrumb">
      {pathList.length === 1 && pathList[0] === '' ? (
        <Typography color="textPrimary" style={{ display: 'flex' }}>
          <StyledHomeIcon />
          Home
        </Typography>
      ) : (
        <LinkButton
          style={{ display: 'flex' }}
          component={Link}
          to="/storage/"
          color="inherit"
        >
          <StyledHomeIcon />
          Home
        </LinkButton>
      )}
      {breadcrubsChilds.length !== 0 && breadcrubsChilds}
    </StyledBreadcrumbs>
  );
};

export default NavBar;
