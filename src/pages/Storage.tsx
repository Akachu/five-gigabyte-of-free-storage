import React, { useEffect } from 'react';
import { Breadcrumbs, Typography, Link } from '@material-ui/core';
import useItemList from '../hooks/useFiles';
import FileTable from '../components/FileTable/FileTable';

const Storage: React.FC = () => {
  const { fileList, folderList, setRef, ref, isLoading } = useItemList();

  useEffect(() => {
    setRef(ref);
  }, []);

  return (
    <div>
      {/* <Transition in={isLoading} timeout={0}>
        {state => (
          <LinearProgress
            variant="determinate"
            value={isLoading ? 0 : 100}
            style={{
              transition: "0.5s ease-in-out",
              ...transitionStyles[state]
            }}
          />
        )}
      </Transition> */}
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          color="inherit"
          href="/"
          // onClick={handleClick}
        >
          Material-UI
        </Link>
        <Link
          color="inherit"
          href="/getting-started/installation/"
          // onClick={handleClick}
        >
          Core
        </Link>
        <Typography color="textPrimary">Breadcrumb</Typography>
      </Breadcrumbs>
      <FileTable fileList={fileList} folderList={folderList} />
    </div>
  );
};

export default Storage;
