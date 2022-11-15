import { useState } from 'react'

const useCrudModals = () => {
    const [showAddModal, setShowAddModal] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

    return {
        showAddModal,
        setShowAddModal,
        showSuccessModal,
        setShowSuccessModal,
        showDeleteModal,
        setShowDeleteModal
    }
}

export default useCrudModals