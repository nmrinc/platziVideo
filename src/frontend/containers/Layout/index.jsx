import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getData } from '../../actions/data';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loader from '../../components/Loader';

const Layout = (props) => {

  const { isLoading, data, children } = props;

  useEffect(() => {
    let didCancel = false;
    (async () => {
      try {
        !didCancel && await props.getData();
      } catch (err) {
        !didCancel && console.log('====================================');
        !didCancel && console.log(`Shit!! ${err.message}`);
        !didCancel && console.log('====================================');
      }
    })();
    return () => { didCancel = true; };
  }, []);

  const updateChildrenWithProps = React.Children.map(
    children,
    (child, i) => {
      return data && React.cloneElement(child, {
        data,
        index: i,
      });
    },
  );

  return (
    <div className='App'>
      {
        isLoading ?
          <Loader /> :
          data && (
            <>
              <Header user={data.user} />
              {updateChildrenWithProps}
              <Footer />
            </>
          )
      }
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.object,
  getData: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    data: state.data.data,
  };
};

const mapDispatchToProps = ({
  getData,
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
