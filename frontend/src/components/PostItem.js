import React, { useState } from 'react';
import {Modal} from './Modal';

function PostItem(props) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
      setShowModal(prev => !prev);
  };
  
  return (
    <>
      <li className='post__item' onClick={openModal}>
        <div className='post__item__link'>
          <figure className='post__item__pic-wrap' data-category={props.price}>
            <img
              className='post__item__img'
              alt='Travel Image'
              src={props.src}
            />
          </figure>
          <div className='post__item__info'>
            <h5 className='post__item__title'>{props.title}</h5>
            <h5 className='post__item__content'>{props.content}</h5>
            <h6 className ='post__item__staus'>{props.staus}</h6>
          </div>
        </div>
      </li>
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}


export default PostItem;