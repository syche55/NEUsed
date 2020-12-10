import React, { useState } from 'react';

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
        </div>
    );
}
