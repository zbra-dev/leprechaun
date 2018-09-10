import { Injectable } from '@angular/core';
import {AbstractRepository, Serializer, Model} from './abstract.repository';
import {AngularFirestore, DocumentSnapshot} from 'angularfire2/firestore';
import {License, LicenseSerializer} from './license.repository';

@Injectable()
export class UserRepository extends AbstractRepository<User>{

  constructor(db: AngularFirestore) {
    super(db, 'users', new UserSerializer());
  }


}

export class User extends Model {
  constructor(public id: string,
              public name: string,
              public email: string,
              public picture: string) {
    super(id);
  }
}

export class UserSerializer implements Serializer<User> {
  public deserialize(snapshot: DocumentSnapshot<any>): User {
    const data = snapshot.data();
    return new User(snapshot.id, data.name, data.email, data.picture);
  }
  public serialize(user: User): Object {
    return new Object({
      name: user.name,
      email: user.email,
      picture: user.picture
    })
  }
}
