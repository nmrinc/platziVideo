import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { logoutRequest } from '../../actions';

const Layout = (props) => {

  const { data, children, logoutRequest } = props;

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
        data && (
          <>
            <Header user={data.user} logOutAction={logoutRequest} />
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
  logoutRequest: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    data: state,
  };
};

const mapDispatchToProps = {
  logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
