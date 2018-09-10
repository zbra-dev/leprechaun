import {AngularFirestore, DocumentData, DocumentReference, DocumentSnapshot} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {serialize} from '@angular/compiler/src/i18n/serializers/xml_helper';

export abstract class Model {
  constructor(public readonly id: string) { }
}


export class AbstractRepository<T extends Model> {
  protected readonly collection = this.db.collection(this.collectionName);
  private serializer: Serializer<T>;

  constructor(private db: AngularFirestore, private collectionName: string, deserializer: Serializer<T>) {
    this.serializer = deserializer;
  }


  private async deserializeDocument(document: DocumentReference): Promise<T> {
    const snapshot = await document.get();
    return this.serializer.deserialize(<DocumentSnapshot<any>>snapshot);
  }

  public list(): Observable<T[]> {
    return this.collection
      .snapshotChanges()
      .pipe(map(o  => o.map((s) => this.serializer.deserialize(<DocumentSnapshot<any>>s.payload.doc))));
  }

  public async add(record: T): Promise<T> {
    const document = await this.collection.add(this.serializer.serialize(record));
    return await this.deserializeDocument(document);
  }
  public async delete(id: string) {
    (await this.collection.doc(id)).delete();
  }

  public async update(record: T) {
    (await this.collection.doc(record.id)).update(this.serializer.serialize(record));
  }

  public async get(id: string) : Promise<T> {
    let documentSnapshot = await this.collection.doc(id).ref.get();
    return this.serializer.deserialize(<DocumentSnapshot<any>>documentSnapshot);
  }

}

export interface Serializer<T> {
  deserialize(snapshot: DocumentSnapshot<any>): T;
  serialize(object: T): Object;
}
