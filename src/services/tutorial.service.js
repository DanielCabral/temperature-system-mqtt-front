import {db} from '../firebase'

export default class FirebaseService {
    static getDataList = (nodePath, callback, size = 10) => {

        let query = db.ref(nodePath)
                                   .limitToLast(size);
        query.on('value', dataSnapshot => {
            let items = [];
            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                
                items.push(item);
            });
            callback(items);
        });

        return query;
    };

}