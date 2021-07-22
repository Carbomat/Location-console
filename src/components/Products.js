import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from 'react-multi-carousel';
import SocialIcons from './UI/SocialIcons';
import 'react-multi-carousel/lib/styles.css';
import classes from '../styles/Doctors.module.css';
import getProducts from '../actions/user';

const Products = () => {
  const { user: currentUser } = useSelector(state => state.auth);
  const { products } = useSelector(state => state.user);
  const { message } = useSelector(state => state.message);
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const dispatch = useDispatch();

    useEffect(() => {
        console.log("bro", currentUser)
        
    if (products.length === 0 ) {
      setLoading(true);
      dispatch(getProducts())
        .then(() => {
          setSuccessful(true);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [products, dispatch]);
/*
  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  */
  const productsList = products.map(product => (
    <div key={product.id}>
      
        <div className="d-flex flex-column align-items-center">
                  <img src={product.image} alt={product.name} className={`rounded-circle ${classes.img}`} />
                  <h5 className={`text-dark p-4 ${classes.border}`}>Neuf</h5>
          <h5 className={`text-dark p-4 ${classes.border}`}>{product.name}</h5>
          <p className="text-secondary mt-3">
            <strong>Tarif:&nbsp;</strong>
            {product.prix}
          </p>
        </div>
      
      
    </div>
  ));
  return (
    <div className="container text-center">
      <div>
        <h3>Location de consoles</h3>
        <p className="text-secondary">Cliquez sur une console pour voir les details</p>
      </div>
      {loading && <span className="spinner-border spinner-border-lg" />}
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite={false}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 3,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
              {productsList}
      </Carousel>
      {message && (
        <div className="form-group">
          <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
