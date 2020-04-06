import axios from 'axios';
import { storage } from 'firebase';

export async function handleDownload(ref: storage.Reference) {
  const url = await ref.getDownloadURL();
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'blob',
    onDownloadProgress: event => {
      console.log(event);
    },
  });

  const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.setAttribute('download', ref.name);
  document.body.appendChild(link);
  link.click();
  link.remove();
}
