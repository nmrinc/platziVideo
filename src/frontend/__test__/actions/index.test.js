//@concept TEST FOR ACTIONS

//@a Import the action that will be tested.
import { setFavourite, loginRequest } from '../../actions';
import actionTypes from '../../actions/actionTypes';
//@a Import a mock of the info that will be passed.
import movieMock from '../../__mocks__/movieMock';

describe('Actions', () => {
  test('Set Favourite', () => {
    //@a Assign the mock to the payload
    const payload = movieMock;

    //@a Create a structure to be expected
    const expectedAction = {
      type: actionTypes.SET_FAVOURITE,
      payload,
    };

    //@a Create the expected action to equal to the mock.
    expect(setFavourite(payload)).toEqual(expectedAction);
  });

  test('Login', () => {
    //@a Create the mock payload
    const payload = {
      email: 'test@test.com',
      password: 'password',
    };

    //@a crea the expected action
    const expectedAction = {
      type: actionTypes.LOGIN_REQUEST,
      payload,
    };

    expect(loginRequest(payload)).toEqual(expectedAction);
  });

});

/**
 * @concept Test only one test
 * @o To use this technique it's necessary to install globally jest
 * @a Use the following code changing the route for the test
 * @test >jest src/frontend/__test__/actions/index.test.js
 * ##----------------------------------------------------------------
 * @o If you want to test from a project with jest installed and configured to npm run test
 * @a Use the following code changing the route for the test
 * @test >npm run test -- src/frontend/__test__/actions/index.test.js
 */
