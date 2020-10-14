## Firestore Config

### Sample Firebase Config

You can get your firebase config data in [Firebase Console](https://console.firebase.google.com/project/[PROJECT-ID]/settings/general/web)

#### Here is an example data:

```js
{
    apiKey: "ABC123",
    authDomain: "vranks-4f50b.firebaseapp.com",
    databaseURL: "https://vranks-4f50b.firebaseio.com",
    projectId: "vranks-4f50b",
    storageBucket: "vranks-4f50b.appspot.com",
    messagingSenderId: "720882747924",
    appId: "1:720882747924:web:c82be28827108d4512b501",
    measurementId: "G-04J7NRSK6F"
}
```

Then you set it up in `/firebase/config`

```js
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/analytics";

var firebaseConfig = {
  apiKey: "ABC123",
  authDomain: "vranks-4f50b.firebaseapp.com",
  databaseURL: "https://vranks-4f50b.firebaseio.com",
  projectId: "vranks-4f50b",
  storageBucket: "vranks-4f50b.appspot.com",
  messagingSenderId: "720882747924",
  appId: "1:720882747924:web:c82be28827108d4512b501",
  measurementId: "G-04J7NRSK6F",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
```

## Firestore Hook Usage

```js
import useFirestore from './hooks/useFirestore';

const App = (props) => {
   const docs = useFirestore('collection_name');
   return (
      // ...
   );
}
```

## Storage Hook Usage

```js
import React from 'react'
import useStorage from '../hooks/useStorage';

// takes file & setFile as props
const SampleStorageUsage = ({file, setFile}) => {

   const { progress, url } = useStorage(file);

   useEffect(() => {
       if (url) {
         setFile(null);
       }
   }, [url, setFile]);

   return (
      // ...
   )
}

export default SampleStorageUsage

```

## React Redux Usage

```js
import React, {useDispatch, useSelector} from 'react-redux';
import {setExample} from './redux/actions';

const SampleReduxUsage = (props) => {
   const example = useSelector(state => state.example)
   const dispatch = useDispatch();

   dipatch(setExample({data: 'sample data here'}))

   return (
      // ...
   )
}
```

Only select the actions that you're going to use

```js
import { setExample } from "./redux/actions";
```
