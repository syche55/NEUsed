import React, { useState } from 'react';
import {Modal} from './Modal';

const PostItem= (props) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
      setShowModal(prev => !prev);
  };

  // const post = props.posts[0];
  //   return (
  //       <>
  //           <li key={post._id} className='post__item' onClick={openModal}>
  //               <div className='post__item__link'>
  //                   <figure className='post__item__pic-wrap' data-category={post.price}>
  //                       <img
  //                           className='post__item__img'
  //                           alt='Product Image'
  //                           src={post.image}
  //                       />
  //                   </figure>
  //                   <div className='post__item__info'>
  //                       <p className='post__item__title'>{post.title}</p>
  //                       {/* <h5 className='post__item__content'>{props.description}</h5> */}
  //                       { post.status ?
  //                           <p className ='post__item__on'>Availble</p> : <p className ='post__item__off'>Sold Out</p>
  //                       }
  //                   </div>
  //               </div>
  //           </li>
  //           <Modal showModal={showModal} setShowModal={setShowModal} props={props}/>
  //       </>
  //   );

    const postItems = props.posts.map((post) =>{
      return (

          <li key={post._id} className='post__item' onClick={openModal}>
            <div className='post__item__link'>
              <figure className='post__item__pic-wrap' data-category={post.price}>
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
              <Modal showModal={showModal} setShowModal={setShowModal} props={props}/>
          </li>
      );
    }
    );
    return postItems;
}



export default PostItem;
