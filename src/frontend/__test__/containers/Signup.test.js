import React from 'react';
import { mount } from 'enzyme';
import Signup from '../../containers/Signup';
import ProviderMock from '../../__mocks__/ProviderMock';

describe('<Signup />', () => {

  test('Signup form submit ', () => {
    //@o This is a mock function
    const preventDefault = jest.fn();

    const signup = mount(
      <ProviderMock>
        <Signup />
      </ProviderMock>
    );

    //@o As we're going to test the form functionality
    //@a Create a simulation of the submit. Passing preventDefault as the value.
    signup.find('form').simulate('submit', { preventDefault });

    //@o As the expect, pass the preventDefault fn and check if it's called just 1 time.
    expect(preventDefault).toHaveBeenCalledTimes(1);

    //@a Last, after the test ends unmount the component
    signup.unmount();
  });

});
