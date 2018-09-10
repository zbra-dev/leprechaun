import * as functions from 'firebase-functions';

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.onUserCreated = functions.auth.user().onCreate((user) => {
  admin.firestore().collection('users').doc(user.uid).set({
    name: user.displayName,
    email: user.email,
    picture: user.photoURL
  })
});

exports.onSoftwareUpdated = functions.firestore.document('softwares/{softwareId}').onUpdate(((change, context) => {
  let software = change.after.data();
  software.id = change.after.id;

  return admin.firestore()
    .collection('licenses')
    .where('software.id', '==', change.after.id).get()
    .then(snapshot => {
      let batch = admin.firestore().batch();
      snapshot.forEach(doc => batch.update(doc.ref, 'software', software));
      return batch.commit();
    })
}));

exports.onUserUpdated = functions.firestore.document('users/{userId}').onUpdate(((change, context) => {
  let user = change.after.data();
  user.id = change.after.id;

  return admin.firestore()
    .collection('licenses')
    .where('user.id', '==', change.after.id).get()
    .then(snapshot => {
      let batch = admin.firestore().batch();
      snapshot.forEach(doc => {
        batch.update(doc.ref,'user', user)
      });
      return batch.commit();
    });
}));
