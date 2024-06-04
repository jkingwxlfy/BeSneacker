import { useEffect } from 'react'
import { useAppDispatch } from '../../../hooks/redux'

import './mymodal.scss'

interface IMyModalProps {
    isModal: boolean
    setModal: (isModal: boolean) => void
    children: React.ReactNode
}

const MyModal: React.FC<IMyModalProps> = ({ isModal, setModal, children }) => {
    const onCloseModal = () => {
        setModal(false)
    }

    const clazzWrapper = isModal ? 'my-modal modal-active' : 'my-modal'
    const clazzContent = isModal
        ? 'my-modal__content modal-active'
        : 'my-modal__content'

    return (
        <div className={clazzWrapper} onClick={onCloseModal}>
            <div
                className={clazzContent}
                onClick={event => event.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

export default MyModal
