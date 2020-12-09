import React, { useState } from 'react';
import { Modal } from './components/Modal';

export default function About() {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(prev => !prev);
    };
    return (
        <div >
            <h3>NEUsed App v0.1.0</h3>
            <p>Front End: Yijing Liu, Jing Shen</p>
            <p>Back End: Yixuan Yu, Siyu Chen</p>
            <button onClick={openModal}>test</button>
            <Modal showModal={showModal} setShowModal={setShowModal} />
        </div>
    );
}
