import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from 'angularfire2/firestore';
import { AbstractRepository, Model, Serializer} from './abstract.repository';
import {User} from './user.repository';

@Injectable()
export class SoftwareRepository extends AbstractRepository<Software> {

  constructor(db: AngularFirestore) {
    super(db, 'softwares', new SoftwareSerializer());
  }
}


export class Software extends Model {
  constructor(public id: string,
              public name: string,
              public version: string,
              public icon: string) {
    super(id);
  }

}

export class SoftwareSerializer implements Serializer<Software> {
  public deserialize(snapshot: DocumentSnapshot<any>): Software {
    const data = snapshot.data();
    return new Software(snapshot.id, data.name, data.version, data.icon);
  }
  public serialize(software: Software): Object {
      return new Object({
        name: software.name,
        version: software.version,
        icon: software.icon
      })
    }
}
