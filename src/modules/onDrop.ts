import { storage } from 'firebase';

// TODO: 업로드 saga로 처리하기

export const onDrop = (
  folder: storage.Reference,
  callBack: Function = () => {},
) => {
  return (acceptedFiles: File[]) =>
    acceptedFiles.forEach(file => {
      const ref = folder.child(file.name);
      const task = ref.put(file);
      task.on('state_changed', snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);

        switch (snapshot.state) {
          case storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
          default:
            break;
        }
      });

      task.then(() => {
        callBack();
      });
    });
};
