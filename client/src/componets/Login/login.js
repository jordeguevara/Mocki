import React, { Component } from 'react'
import { Input, Button} from 'semantic-ui-react'

class Login extends Component {
    render() {
        return (
            <div>
              <Input placeholder='Email...' />
              <Input placeholder='Password...' />
              <Button>Login</Button>

            </div>
        );
    }
}
export default Login;