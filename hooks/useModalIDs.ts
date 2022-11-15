import { useState } from 'react'

const useModalIDs = () => {
    const [deleteID, setDeleteID] = useState(0);

    return {
        deleteID,
        setDeleteID
    }
}

export default useModalIDs