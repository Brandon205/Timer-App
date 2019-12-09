import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  state = { 
    email: '',
    password: '',
    message: '',
    redirect: ''
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('/auth/login', {email: this.state.email, password: this.state.password})
    .then(res => {
      if (res.data.type === 'error') {
        console.log(`Error: ${res.data.message}`);
      } else {
        localStorage.setItem('mernToken', res.data.token);
        this.props.liftToken(res.data);
      }
    }).catch(err => console.log(err)); // Rate limiter catch block
    this.setState({ redirect: <Redirect to="/" /> });
  }

  render() { 
    return ( 
      <div className="App">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <input className="text-input" type="text" name="email" onChange={this.handleChange} value={this.state.email} placeholder="Email" /><br/>
          <input className="text-input" type="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="Password" /><br/>
          <input className="submit" type="submit" value="Login"/>
        </form>
        {this.state.redirect}
      </div>
    );
  }
}

export default Login;
