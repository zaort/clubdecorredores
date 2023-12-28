const loginHandler = async (event) => {
 event.preventDefault();

 // Collect user input on the login fields
 const email = document.querySelector('#email-login').value.trim();
 const password = document.querySelector('#password-login').value.trim();

 if (email && password) {
  // POST request to the API endpoint. How was this endpoint/API created and defined as below?
  const response = await fetch('/api/users/login', {
   method: 'POST',
   body: JSON.stringify({ email, password }),
   headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
   //If successful, redirect the browser to the profile page
   document.location.replace('/profile');
  } else {
   alert(response.statusText);
  }
 }
};

const signupHandler = async (event) => {
 event.preventDefault();

 const name = document.querySelector('#name-signup').value.trim();
 const email = document.querySelector('#email-signup').value.trim();
 const password = document.querySelector('#password-signup').value.trim();

 if (name && email && password) {
  const response = await fetch('/api/users', {
   method: 'POST',
   body: JSON.stringify({ name, email, password }),
   headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
   document.location.replace('/profile');
  } else {
   alert(response.statusText);
  }
 }
};

document.querySelector('.login-form').addEventListener('submit', loginHandler);

document.querySelector('.signup-form').addEventListener('submit', signupHandler);
