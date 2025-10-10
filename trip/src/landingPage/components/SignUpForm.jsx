import '../styles/header&signUp.css'

function SignUpForm({ formAppearing, InContent }) {
  function submitForm() {
    InContent('Log In');
    formAppearing(false);
  }

  return (
    <form action={submitForm}>
      <label htmlFor='userName' >userName<input id='username' type='text' placeholder='Enter your userName here ...' required/></label>
      <label htmlFor='email' >email<input id='email' type='email' placeholder='Enter your email here ...' required/></label>
      <label htmlFor='password'>password<input id='paswd' type='password' placeholder='Please enter a password here...' required/></label>
      <label htmlFor='notes'>
        <textarea id='notes' placeholder='Any notes you want to submit with the form ...'></textarea>
      </label>
      <button>Submit</button>
    </form>
  );
}

export default SignUpForm;