import React from 'react';
import { mount } from 'enzyme';
import { create } from 'react-test-renderer';
import Header from '../../components/Header';
import ProviderMock from '../../__mocks__/ProviderMock';

describe('<Header />', () => {

  test('Header logo image', () => {
    const header = mount(
      <ProviderMock>
        <Header />
      </ProviderMock>
    );

    expect(header.find('.header__img')).toHaveLength(1);
  });

  test('Logged in User menu', () => {
    const user = { name: 'Test User', email: 'user@test.com' }
    const header = mount(
      <ProviderMock>
        <Header hasUser={true} user={user} />
      </ProviderMock>
    );

    expect(header.find('.gravatar-icon')).toHaveLength(1);
  });

  test('Not Logged User menu', () => {
    const header = mount(
      <ProviderMock>
        <Header hasUser={false} />
      </ProviderMock>
    );

    expect(header.find('.profile-icon')).toHaveLength(1);
  });

  test('Logout action', () => {
    const user = { name: 'Test User', email: 'user@test.com' }
    const logOutAction = jest.fn();
    const header = mount(
      <ProviderMock>
        <Header user={user} hasUser={true} logOutAction={logOutAction} />
      </ProviderMock>
    );

    const link = header.find('a[href="#logout"]');
    link.simulate('click');

    expect(logOutAction).toHaveBeenCalledTimes(1);

    header.unmount();
  });

  test('Header Snapshot', () => {
    const header = create(
      <ProviderMock>
        <Header />
      </ProviderMock>
    );

    expect(header.toJSON()).toMatchSnapshot();
  });

});
