import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { Picture } from '../models/Picture';
import { finalize, of } from 'rxjs';
import { Recipe } from '../models/Recipe';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  private collectionName='Images';
  private bucketName ='images'

  constructor(private afs:AngularFirestore, private storage: AngularFireStorage) { }

  async create(filePic:Picture, fileLoad:File){
    filePic.id= filePic.id==""? this.afs.createId():filePic.id;

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

  addPicUrlToMap(recipes:Recipe[], pictures:Map<string , any>){
    for(let recipe of recipes){
      this.getPicture(recipe.image_id).subscribe({
        next:value=> {
          this.getUrl(value?value[0]:null).subscribe({
            next:url=>{

              pictures.set(recipe.id,url);
            },
            error:err=>{
              console.error(err);
            }
          })
        },
        error:err=> {
          console.error(err);
        },
      });
    }
  }


  getUrl(pic:any){
    if(!pic) return of("");
    return this.storage.ref(this.bucketName+"/"+pic.id+"."+pic.extension).getDownloadURL();
  }
  async delete(pic:Picture){
    this.storage.ref(this.bucketName+"/"+pic.id+"."+pic.extension).delete();
    await this.afs.doc(this.collectionName +'/'+ pic.id).ref.delete();
  }
  async update(pic:Picture, fileLoad:File){
    await this.delete(pic);
    await this.create(pic, fileLoad);
  }
}
