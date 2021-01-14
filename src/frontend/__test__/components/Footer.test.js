/**
 * @concept Test for footer component
 * @context
 * If you want create a test for a component, you have to recreate the same structure of the component.
*/

//@a As the component uses React and Redux, your have to recreate the structure so import what's necessary.
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
//@a Import Mount from Enzyme so it help mount the component for test.
import { mount } from 'enzyme';
//@a Import the component to be tested.
import Footer from '../../components/Footer';
//@a The component is connected to a store. So import it and create its constant.
import configureStore from '../../configs/configureStore';

const store = configureStore();

//@o If you will make a series of test, you need to create a suite.
//@a  With the describe command. Pass the description and the tests.
describe('<Footer />', () => {
  //@a Create a const with the mounted component wrapped into the redux way
  const footer = mount(
    <Provider store={store}>
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    </Provider>
  );

  //@a Test if component exists
  test('Render Footer Component', () => {
    //@o Search for a node of the component
    expect(footer.length).toEqual(1);
  });

  //@a Test if 3 buttons exists into the component
  test('Footer have 3 anchors', () => {
    //@o Find the <a></a> tag into the component and test if the length is equal to 3
    expect(footer.find('button')).toHaveLength(3);
  });
});
