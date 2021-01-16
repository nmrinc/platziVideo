import gravatar from '../../utils/gravatar';

test('Gravatar Function test', () => {
  const email = 'oscar@arepa.dev';
  //@o This url it's obtained from https://es.gravatar.com/site/check/
  const gravatarUrl = 'https://gravatar.com/avatar/4b84ab1122c7ee522710c5ead5525839';

  //@a Test if the url received from the funtion it's equal to the gravatar url.
  expect(gravatarUrl).toEqual(gravatar(email));
});
