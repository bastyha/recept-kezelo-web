import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { Picture } from '../models/Picture';
import { finalize, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  private collectionName='Images';
  private bucketName ='images'

  constructor(private afs:AngularFirestore, private storage: AngularFireStorage) { }

  async create(filePic:Picture, fileLoad:File){
    filePic.id=this.afs.createId();

    let file_path_name= fileLoad.name.split('.');
    let extension = file_path_name[file_path_name.length-1];
    filePic.extension=extension;
    
    const filePath=this.bucketName+'/'+filePic.id+'.'+extension;
    
    const uploadTask = this.storage.upload(filePath, fileLoad);

    await uploadTask;
    return this.afs.collection<Picture>(this.collectionName).doc(filePic.id).set(filePic);
  }

  getPicture(id:string){
    if(!id){
      return of([]);
    }
    return this.afs.collection<Picture>(this.collectionName, ref=>ref.where('id', '==', id)).valueChanges();
  }
  getUrl(pic:any){
    if(!pic) return of("");
    return this.storage.ref(this.bucketName+"/"+pic.id+"."+pic.extension).getDownloadURL();
  }
  async delete(pic:Picture){
    this.storage.ref(this.bucketName+"/"+pic.id+"."+pic.extension).delete();
    await this.afs.doc(this.collectionName +'/'+ pic.id).ref.delete();
  }
}
