import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('categories', ref => ref.orderByChild('/value/name'))
      .snapshotChanges().pipe(
        map(changes => {
          return changes.map(c => {
            return { key: c.payload.key, value: c.payload.val() };
          });
        })
      );
  }
}
