import React from 'react';
import { Link } from 'react-router-dom';

function PostItem(props) {
  return (
    <>
      <li className='post__item'>
        <Link className='post__item__link' to={props.path}>
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
        </Link>
      </li>
    </>
  );
}


export default PostItem;