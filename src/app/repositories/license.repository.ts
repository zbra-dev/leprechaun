import { Injectable } from '@angular/core';
import { AbstractRepository, Model, Serializer } from './abstract.repository';
import { AngularFirestore, DocumentSnapshot } from 'angularfire2/firestore';
import { User } from './user.repository';
import { Software } from './software.repository';
import {Observable} from 'rxjs';

@Injectable()
export class LicenseRepository extends AbstractRepository<License>{

  constructor(db: AngularFirestore) {
    super(db, 'licenses', new LicenseSerializer());
  }

  async getUserLicenses(userid: String): Promise<License[]> {
    let licenseList: License[] = [];
    await this.collection.ref.where('user.id', '==' , userid).get().then(snapshot => {
      snapshot.forEach(doc => licenseList.push(new License(doc.id, doc.data().key, doc.data().software, null)));
    })
    return licenseList;
  }
}


export class License extends Model {
  constructor(public id: string,
              public key: string,
              public software: Software,
              public user: User) {
    super(id);
  }
}

export class LicenseSerializer implements Serializer<License>{
  public deserialize(snapshot: DocumentSnapshot<any>): License {
    const data = snapshot.data();
    return new License(snapshot.id, data.key, data.software, data.user);
  }
  public serialize(license: License): Object {
    if (license.user) {
      return new Object({
        key: license.key,
        software: Object({
          id: license.software.id,
          name: license.software.name,
          version: license.software.version
        }),
        user: Object({
          id: license.user.id,
          name: license.user.name,
          email: license.user.email,
          picture: license.user.picture
        })
      })
    }
    return new Object({
      key: license.key,
      software: Object({
        id: license.software.id,
        name: license.software.name,
        version: license.software.version
      }),
      user: Object()
    })
  }
}
