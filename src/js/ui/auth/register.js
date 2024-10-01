import { registerUser } from '../../api/auth/register.js';

export async function onRegister(event) {
  // Prevent the form from submitting the default way
  event.preventDefault();

  // Get form data
  const form = event.target;
  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;

  const userData = {
    name,
    email,
    password,
  };

  try {
    // Call the API to register the user
    const result = await registerUser(userData);
    console.log('Registration successful:', result);

    // Redirect to the login page and show a success message
    alert('Registration successful. Redirecting to login page...')
    window.location.href = '/auth/login/';
  } catch (error) {
    console.error('Error registering user:', error);
    alert('Registration failed. User might be taken already. Please try again with different information.');
  }
}