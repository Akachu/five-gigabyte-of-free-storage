import React, { useEffect } from 'react';
import { storage } from 'firebase';
import { useParams } from 'react-router-dom';
import LoadingBarContainer from 'react-redux-loading-bar';
import useItemList from '../hooks/useFiles';
import FileTable from '../components/FileTable/FileTable';
import Header from '../components/Header';
import NavBar from '../components/NavBar';

const Storage: React.FC = () => {
  const { fileList, folderList, setRef } = useItemList();
  const { path } = useParams();

  useEffect(() => {
    const newRef = storage().ref(path);
    setRef(newRef);
  }, [path]);

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <Header />
      <LoadingBarContainer style={{ backgroundColor: '#3f51b5' }} />
      <NavBar />
      <FileTable fileList={fileList || []} folderList={folderList || []} />
    </div>
  );
};

export default Storage;
