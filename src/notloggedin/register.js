import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';


export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      passwordconfirm: ''
    };
  };

  onFnameChange(e) {
    this.setState({
      firstname: e.target.value
    });
  };

  onLnameChange(e) {
    this.setState({
      lastname: e.target.value
    });
  };


  onUsernameChange(e) {
    this.setState({
      username: e.target.value
    });
  };

  onPasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  };

  onPasswordConfirm(e) {
    this.setState({
      passwordconfirm: e.target.value
    });
  };




  onRegister(e) {
    e.preventDefault();
    if (this.state.firstname === ''){
      alert("Forgot to put your firstname!")
    }else if(this.state.lastname ===''){
      alert("Forgot to put your lastname!")
    }  else if(this.state.password.length <= 5){
      alert("Your password needs to be at least 6 characters")
    }else if(this.state.password !== this.state.passwordconfirm){
      alert('Passwords did not match')
    }else
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        username: this.state.username,
        password: this.state.password,
        passwordconfirm: this.state.passwordconfirm
        // yourshopname: this.state.yourshopname,
        // street: this.state.street,
        // city: this.state.city,
        // state: this.state.state,
        // zipcode: this.state.zipcode
      })
    })
    .then(res => {
      switch(res.status) {
        case 200:
        console.log(res);
        console.log('User added: ', this.state.username);
        this.props.app.setState({currentPage: "Login"});
        break;
        default:
        console.log(res.status);
      }
    })
    .catch(err => console.log('Error ', err));
  }

  render() {
    return (
      <div>
        <div>
          <Navbar>
            <Nav activeKey={1} pullLeft bsstyle="pills">
              <NavItem eventKey={2}  onSelect={()=>this.props.redirect('Firstpage')}>
                Almost there!
              </NavItem>
            </Nav>

            <Nav activeKey={1} pullRight bsstyle="pills">
              <NavItem eventKey={2}  onSelect={()=>this.props.redirect('Firstpage')}>
                Home
              </NavItem>
              {/* <NavItem eventKey={2}  onSelect={()=>this.props.redirect('About')}>
              About
            </NavItem> */}
            <NavItem eventKey={2} onSelect={()=>this.props.redirect('Register')}>
              Register
            </NavItem>
            <NavItem eventKey={2} onSelect={()=>this.props.redirect('Login')}>
              Login
            </NavItem>
          </Nav>
        </Navbar>
      </div>
      <div className="container">
        <div className="row">
          <h2 >Register</h2>
          <div>
            <form>
              <div className="col-25">
                <label>First name: </label><br></br>
                <input type="firstname" onChange={e => this.onFnameChange(e)}></input>
              </div>
              <div className="col-25">
                <label>Last name: </label><br></br>
                <input type="lastname" onChange={e => this.onLnameChange(e)}></input>
              </div>
              <div className="col-25">
                <label>Email: </label><br></br>
                <input type="email" onChange={e => this.onUsernameChange(e)}></input>
              </div>
              <div className="col-75">
                <label>Password: </label><br></br>
                <input type="password" onChange={e => this.onPasswordChange(e)} ></input>
              </div>
              <div>
                <label>Re-enter password: </label><br></br>
                <input type="password" onChange={e => this.onPasswordConfirm(e)}></input>
              </div><br></br>
              <button type="submit" onClick={e => this.onRegister(e)} className="btn btn-default">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
}