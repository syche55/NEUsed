import React, { useRef, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import moment from 'moment';
import './Modal.css';
import authContext from "../auth-context";

const Background = styled.div`
  width: 100%;
  height: 100%;
  margin: -70px;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  display: flex;
  z-index: 10000;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  position: absolute;
  right: 30%;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 1;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: block;
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 5px 24px;
    margin-bottom: 10px;
    background: #141414;
    color: #fff;
    border: none;
    border-radius: 10px;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const Modal = ( { showModal, setShowModal, props, creatorEmail }) => {

  function refreshPage() {
    // window.location.reload(false);
    // setTimeout(check, 1000);
    setTimeout(() => window.location.reload(), 1000);
  }
  
  const modalRef = useRef();

  const post = props;
  const apiEndpoint = process.env.REACT_APP_UI_API_ENDPOINT;
  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );
  const deletePostHandler = (postId) => {
    const requestBody = {
      query: `
              mutation {
                deletePost(postId: "${postId}"){
                    _id
                    title
                }
              }
            `,
    };
    console.log(postId);
    fetch(`${apiEndpoint}`, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
        .then((res) => {
          if (res.status !== 200 && res.status !== 201) {
            console.log(postId);
            throw new Error("Failed!");
          }
          window.alert("Successfully deleted!");
          return res.json();
        })
        .then((resData) => {
          this.setState((prevState) => {
            const updatedPosts = prevState.posts.filter((post) => {
              return post._id !== postId;
            });

            return { posts: updatedPosts };
          });
        })
        .catch((err) => {
          console.log(err);
        });
        refreshPage();
  };

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );
  const price = '$ ' + props.price;
  return (

    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <ModalImg src={props.image} alt='camera' />
              <ModalContent>
                <h1>{props.title}</h1>
                <p className= 'modal__desc'>{props.content}</p>
                <p className= 'modal__price'>{price}</p>
                {/* <ButtonMailto className= 'btn--outline'label="Buy" mailto={props.email} /> */}
                { props.email === creatorEmail ?
                    <div>
                      <Link
                          to='#'
                          onClick={(e) => {
                            window.location.href = ' mailto:' + props.email;
                            e.preventDefault();
                          }}
                      >
                        <button  style={{background: "green"}}>Edit</button>
                      </Link>
                      <Link
                          to='#'
                          onClick={(e) => {
                            deletePostHandler(post._id);
                            e.preventDefault();
                          }}
                      >
                        <button style={{background: "red"}}>Delete</button>
                      </Link>
                    </div> :
                    <Link
                        to='#'
                        onClick={(e) => {
                          window.location.href = ' mailto:' + props.email;
                          e.preventDefault();
                        }}
                    >
                      <button >Buy</button>
                    </Link>
                }
                <div className= 'modal__date'>{moment(props.createdAt, "YYYYMMDD").fromNow()}</div>
                <div className= 'modal__creater'>{props.creator}</div>
                { props.status ?
                <p className ='modal__item__on'>Availble</p> : <p className ='modal__item__off'>Sold Out</p>
                }
              </ModalContent>
              <CloseModalButton
                aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};
