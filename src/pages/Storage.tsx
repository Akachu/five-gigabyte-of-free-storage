import React, { useEffect } from 'react';
import { storage } from 'firebase';
import { useParams } from 'react-router-dom';
import LoadingBarContainer from 'react-redux-loading-bar';
import styled from 'styled-components';
import { useFiles } from '../hooks/useFiles';
import FileTable from '../components/FileTable/FileTable';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import FileUploader from '../components/FileUploader/FileUploader';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
`;

const Storage: React.FC = () => {
  const { fileList, folderList, setRef } = useFiles();
  const { path } = useParams();

  useEffect(() => {
    const newRef = storage().ref(path);
    setRef(newRef);
  }, [path]);

  return (
    <Wrapper>
      <Header />
      <LoadingBarContainer style={{ backgroundColor: '#3f51b5' }} />
      <NavBar />
      <FileTable fileList={fileList || []} folderList={folderList || []} />
      <FileUploader />
    </Wrapper>
  );
};

export default Storage;
