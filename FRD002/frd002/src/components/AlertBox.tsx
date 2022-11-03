import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";

export default function AlertBox() {
    const [isShownAltertBox, b] = useState<boolean>(true)
    return (
        <div>
            <Modal show={isShownAltertBox}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => b(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => b(false)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}