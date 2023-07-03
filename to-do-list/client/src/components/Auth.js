import { useState } from 'react'
import { useCookies } from 'react-cookie' 

const Auth = () => {

  const [ cookies, setCookie] = useCookies(null)
  const [isLogin,setIsLogin] = useState(true)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error,setError] = useState(null)

  const handleSubmit = async (e, endpoint) => {
    console.log("enpoint", endpoint)
    e.preventDefault()
    if( !isLogin && password !== confirmPassword) {
      setError('Make sure password match!')
      return 
    }

    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
      method: 'POST',
      headers: { 'content-type' : 'application/json'},
      body: JSON.stringify({email, password})
    })

    const data = await response.json()

    console.log("cookie data", data)
    
    if(data.detail) {
      setError(data.detail)
      console.log(data.detail)
    } else {
      setCookie('Email', data.email)
      setCookie('AuthToken', data.token)

      window.location.reload()
    }
  }

  const viewLogin = (status) => {
      setError(null)
      setIsLogin(status)
  }
    return (
      <div className = "auth-container">
        <div className = "auth-container-box">
          <form>
            <h2>{isLogin ? 'Please log in' : 'Please Sign up!'}</h2>

            <input 
            type="email" 
            placeholder="Enter Email" 
            onChange = {(e) => setEmail(e.target.value)}
            />

            <input 
            type="password" 
            placeholder="Enter Password"
            onChange = {(e) => setPassword(e.target.value)} 
            />

           {!isLogin && 
           <input 
           type = "password" 
           placeholder = "Confirm Password" 
           onChange = {(e) => setConfirmPassword(e.target.value)}
           /> }

           <input 
           type ="submit" 
           className = "create" 
           onClick = {(e) => handleSubmit(e, isLogin ? 'login' : 'signup')}
           />

           {error && <p>{error}</p>}
          </form>
          <div className = "auth-options">
            <button 
            onClick={() => viewLogin(false)}
            style={{backgroundColor: !isLogin ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188)'}}
            >Sign Up</button>
            <button 
            onClick={() => viewLogin(true)}
            style={{backgroundColor: isLogin ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188)'}}
            >Login In</button>
          </div>
        </div>
      </div>
    )
  }
  
  export default Auth
  