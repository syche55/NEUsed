import React, { useState } from 'react';
import Modal from './Modal';

const PostItem= (props) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
      setShowModal(prev => !prev);
  };

      const post = props.post;
      const price = '$ ' +post.price;
      return (

        <>
          <li className='post__item' onClick={openModal}>
            <div className='post__item__link'>
              <figure className='post__item__pic-wrap' data-category={price}>
                <img
                  className='post__item__img'
                  alt='Product Image'
                  src={post.image}
                />
              </figure>
              <div className='post__item__info'>
                <p className='post__item__title'>{post.title}</p>
                {/* <h5 className='post__item__content'>{props.description}</h5> */}
                { post.status ?
                <p className ='post__item__on'>Availble</p> : <p className ='post__item__off'>Sold Out</p>
                }
              </div>
            </div>
          </li>
          <Modal showModal={showModal} setShowModal={setShowModal} props={post} creatorEmail={props.creatorEmail} />
          </>
      );
}



export default PostItem;
