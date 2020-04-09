import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import FileRequestRow, { RequestProgress } from './FileRequestRow';
import { useFileManager } from '../../hooks/useFileManager';
import { FileRequestInfo, FileRequestType } from '../../modules/fileManager';

interface FileDownloadRowProps {
  info: FileRequestInfo;
}

const FileDownloadRow: React.FC<FileDownloadRowProps> = ({ info }) => {
  const [downloadProgress, setDownloadProgress] = useState<RequestProgress>({
    percent: 0,
    remainTime: 60,
  });
  const { completeRequst } = useFileManager();

  const { key, ref, completed } = info;

  const handleDownload = async () => {
    const url = await ref.getDownloadURL();
    const startTime = Date.now();
    const response = await Axios({
      url,
      method: 'GET',
      responseType: 'blob',
      onDownloadProgress: (event) => {
        const { loaded, total } = event;
        const percent = Math.round((loaded * 100) / total);
        const remainTime =
          ((total - loaded) * (Date.now() - startTime)) / loaded / 1000;

        setDownloadProgress({ percent, remainTime });
      },
    });

    console.log('download', response);

    return response.data;
  };

  useEffect(() => {
    handleDownload().then((data) => {
      const downloadUrl = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', ref.name);
      document.body.appendChild(link);
      link.click();
      link.remove();

      completeRequst(key, FileRequestType.DOWNLOAD);
    });
  }, []);

  return (
    <FileRequestRow
      key={key}
      name={ref.name}
      progress={downloadProgress}
      completed={completed}
    />
  );
};

export default FileDownloadRow;
