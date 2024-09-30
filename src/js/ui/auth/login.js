import { loginUser } from '../../api/auth/login.js';

export async function onLogin(event) {
  // Prevent the form from submitting the default way
  event.preventDefault();

  // Get form data
  const form = event.target;
  const email = form.email.value;
  const password = form.password.value;

  const userData = { email, password };

  try {
    // Call the API to login the user
    const result = await loginUser(userData);

    // Log the result and redirect the user to a profile or dashboard page
    console.log('Login successful:', result);
    window.location.href = '/'; // Adjust the redirection as needed

  } catch (error) {
    console.error('Error logging in:', error);
    alert('Login failed. Please check your credentials and try again.');
  }
}
