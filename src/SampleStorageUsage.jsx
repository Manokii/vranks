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
        <div>
            
        </div>
    )
}

export default SampleStorageUsage
