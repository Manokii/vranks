import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

const useFirestore = (collection, options = {order: {field: 'createdAt', direction: 'desc'}, limit : 0}) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = Boolean(options.limit) 
        ? projectFirestore.collection(collection)
        .orderBy(options.order.field, options.order.direction)
        .limit(options.limit)
        .onSnapshot(snap => {
            let documents = [];
            snap.forEach(doc => {
            documents.push({...doc.data(), id: doc.id});
            });
            setDocs(documents);
        }) 
        :  projectFirestore.collection(collection)
        .orderBy(options.order.field, options.order.direction)
        .onSnapshot(snap => {
            let documents = [];
            snap.forEach(doc => {
            documents.push({...doc.data(), id: doc.id});
            });
            setDocs(documents);
        });

    return () => unsub();
  }, [collection]);

  return docs;
}

export default useFirestore;