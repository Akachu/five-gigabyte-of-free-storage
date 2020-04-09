import React, { useState, useEffect } from 'react';
import FileRequestRow, { RequestProgress } from './FileRequestRow';
import { useFileManager } from '../../hooks/useFileManager';
import { FileRequestInfo, FileRequestType } from '../../modules/fileManager';

interface FileUploadRowProps {
  info: FileRequestInfo;
}

const FileUploadRow: React.FC<FileUploadRowProps> = ({ info }) => {
  const [uploadProgress, setUploadProgress] = useState<RequestProgress>({
    percent: 0,
    remainTime: 60,
  });
  const { completeRequst } = useFileManager();

  const { key, ref, file, completed } = info;

  useEffect(() => {
    const folder = ref.child(file!.name);
    const task = folder.put(file!);
    const startTime = Date.now();
    task.on('state_changed', (snapshot) => {
      const { totalBytes, bytesTransferred } = snapshot;
      const percent = (bytesTransferred / totalBytes) * 100;

      const remainTime =
        ((totalBytes - bytesTransferred) * (Date.now() - startTime)) /
        bytesTransferred /
        1000;

      setUploadProgress({ percent, remainTime });
    });

    task.then(() => {
      completeRequst(key, FileRequestType.UPLOAD);
    });
  }, []);

  return (
    <FileRequestRow
      key={key}
      name={file!.name}
      progress={uploadProgress}
      completed={completed}
    />
  );
};

export default FileUploadRow;
