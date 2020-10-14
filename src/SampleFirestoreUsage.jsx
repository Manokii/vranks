import React from 'react'
import useFirestore from '../hooks/useFirestore';

const SampleFirestoreUsage = () => {
    
    const docs = useFirestore('collection_name'); // returns an array of documents from collection_name
    return (
        <div>
            
        </div>
    )
}

export default SampleFirestoreUsage
