import './Signup.css'
const Signup = () => {
  const onSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className='signup-container'>
      <div className='main-heading-container'>
        <h1 className='main-heading'>SignUp</h1>

        <div className='heading-box'></div>
      </div>
      <form>
        <div className='form-container'>
          <div className='input-div'>
            <label htmlFor='Username'>Username</label>
            <input type='text' className='input input-username' />
          </div>
          <div className='input-div'>
            <label htmlFor='email'>Email</label>
            <input type='email' className='input input-email' />
          </div>
          <div className='input-div'>
            <label htmlFor='password'>Password</label>
            <input type='password' className='input input-password' />
          </div>
          <button className='submit-button' onClick={onSubmit}>
            Signup
          </button>
        </div>
      </form>
    </div>
  )
}

export default Signup
