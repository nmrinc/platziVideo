/**
 * @concept Test for footer component
 * @context
 * If you want create a test for a component, you have to recreate the same structure of the component.
*/

//@a As the component uses React, you have to recreate the structure so import what's necessary.
import React from 'react';
//@a Import Mount from Enzyme so it help mount the component for test.
import { mount } from 'enzyme';
//@a Import "create" to generate a snapshot of the component.
import { create } from 'react-test-renderer';
//@a Import the component to be tested.
import Footer from '../../components/Footer';
//@a Import the Mock Provider
import ProviderMock from '../../__mocks__/ProviderMock';

//@o If you will make a series of test, you need to create a suite.
//@a  With the describe command. Pass the description and the tests.
describe('<Footer />', () => {
  //@a Create a const with the mounted component wrapped into the redux pattern
  const footer = mount(
    <ProviderMock>
      <Footer />
    </ProviderMock>
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

  /**
   * @concept SNAPSHOT TEST
   * @context This test help to create a snapshot of the structure given to our component.
   * @context So can be compared and if there's any change alert about it.
  */
  test('Footer Snapshot', () => {
    //@o This way if there's no snapshot created, will create it. And if there's one, will compare it.
    const footer = create(
      <ProviderMock>
        <Footer />
      </ProviderMock>
    );

    expect(footer.toJSON()).toMatchSnapshot();
    /**
     * @o If the snapshot fails, but the new structure it's correct.
     * @o You can update the snapshot with the following sentence.
     * @test >jest --updateSnapshot
     */
  });

});
