import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products').snapshotChanges()
      .pipe(map(changes => {
        return changes.map(c => {
          return { key: c.payload.key, ...c.payload.val() };
        });
      }));
  }

  get(id) {
    return this.db.object('products/' + id).valueChanges();
  }

  update(id, product) {
    return this.db.object('products/' + id).update(product);
  }

  delete(id) {
    console.log('delete ', id);
    return this.db.object('products/' + id).remove();
  }
}
