import React, { Component } from 'react'
import { Input, Button} from 'semantic-ui-react'
import '../Registration/register.css'

class Login extends Component {
    render() {
        return (
            <div>
              <Input className={'customInput'}placeholder='Email' />
              <Input className={'customInput'} placeholder='Password' />
              <br/>
              <Button className={'customButton'} >Login</Button>

            </div>
        );
    }
}
export default Login;