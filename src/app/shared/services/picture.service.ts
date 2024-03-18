import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { Picture } from '../models/Picture';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  private collectionName='Images';
  private bucketName ='images'

  constructor(private afs:AngularFirestore, private storage: AngularFireStorage) { }

  async create(filePic:Picture, fileLoad:File){
    filePic.id=this.afs.createId();
    let extension= fileLoad.name.split('.');
    const filePath=this.bucketName+'/'+filePic.id;
    const storeRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileLoad);
    await uploadTask;
    return this.afs.collection<Picture>(this.collectionName).doc(filePic.id).set(filePic);
  }
}
