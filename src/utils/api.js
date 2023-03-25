export const mockLoginApi = async (email, password) => {
  console.log(email);

  console.log(password);
  // mock user data
  const user = {
    email: 'A@gmail.com',
    password: '123',
  };
  // simulate a delay of 1 second to mimic network request
  await new Promise(resolve => setTimeout(resolve, 1000));
  // check if the email and password match the mock user data
  // const isLoggedIn = email == 'A@gmail.com' && password == '123';
  const isLoggedIn = email == '' && password == '';
  return isLoggedIn;
};
