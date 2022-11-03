import { useState } from 'react';
import { Button, Modal } from "react-bootstrap";

interface AlertBoxProps {
    isShowModal: boolean,
    closeModal: () => void
}

export default function AlertBox(props: AlertBoxProps) {

    // const [isShow, setIsShow] = useState<boolean>(true)

    const handleClose = () => {
        // setIsShow(false)
    }

    return (
        <div>
            <Modal show={props.isShowModal} onHide={props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.closeModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}