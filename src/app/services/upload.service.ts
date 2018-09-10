import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private fireStorage: AngularFireStorage) {  }

  async pushUpload(path: string, upload: Upload) {
    return new Promise((resolve, reject) => {
      let uploadTask = this.fireStorage.ref(`${path}/${upload.file.name}`).put(upload.file);
      uploadTask.task.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: any) => {
          upload.progress = String((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          console.log(error);
          reject();
        },
        async () => {
          upload.url = await uploadTask.task.snapshot.ref.getDownloadURL();
          upload.name = upload.file.name;
          resolve();
        }
      )
    })
  }

  deleteUpload(upload: Upload) {
    this.deleteFileStorage(upload.name);
  }

  private deleteFileStorage(name: string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${name}`).delete();
  }
}

export class Upload {
  $key: string;
  file: File;
  name: string;
  url: string = null;
  progress: string;
  createdAt: Date = new Date();

  constructor(file: File) {
    this.file = file;
  }
}
