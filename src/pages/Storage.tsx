import React, { useEffect } from 'react';
import { storage } from 'firebase';
import { useParams } from 'react-router-dom';
import useItemList from '../hooks/useFiles';
import FileTable from '../components/FileTable/FileTable';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import LoadingBarContainer, { LoadingBar } from 'react-redux-loading-bar';

const Storage: React.FC = () => {
  const { fileList, folderList, setRef } = useItemList();
  const { path } = useParams();

  useEffect(() => {
    const newRef = storage().ref(path);
    setRef(newRef);
  }, [path]);

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
      <Header />
      <LoadingBarContainer style={{ backgroundColor: '#3f51b5' }} />
      <NavBar />
      <FileTable fileList={fileList} folderList={folderList} />
    </div>
  );
};

export default Storage;
