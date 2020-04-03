import { storage } from 'firebase';
import { useCallback } from 'react';

export const onDrop = (folder: storage.Reference) => {
  // return useCallback((acceptedFiles: File[]) => {
  //   // acceptedFiles.forEach();
  // }, []);
  return (acceptedFiles: File[]) =>
    acceptedFiles.forEach(file => {
      const ref = folder.child(file.name);
      const task = ref.put(file);
      task.on('state_changed', snapshot => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');

        switch (snapshot.state) {
          case storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      });

      task.then(() => {
        task.snapshot.ref.getDownloadURL().then((downloadURL: any) => {
          console.log('File available at', downloadURL);
        });
      });
    });
};
