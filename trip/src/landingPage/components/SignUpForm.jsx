import '../styles/header&signUp.css'

function SignUpForm({ formAppearing, InContent }) {
  function submitForm() {
    InContent('Log In');
    formAppearing(false);
  }
  function goBack(){
    formAppearing(false);
  }

  return (
    <>
      <form class='submit-form' action={submitForm}>
        <button name='go-back' onClick={goBack}><i class='bx  bx-x'  ></i> </button>
        <div>Welcome - In</div>
        <p>If you are not registred yet ,you can click here to register:</p>
        <a>register!</a>
        <label htmlFor='email' >email<input id='email' type='email' placeholder='Enter your email here ...' required /></label>
        <label htmlFor='password'>password<input id='paswd' type='password' placeholder='Please enter a password here...' required /></label>
        <button name='submit'>Submit</button>
      </form>
    </>
  );
}

export default SignUpForm;