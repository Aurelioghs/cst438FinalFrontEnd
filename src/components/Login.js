import React, {useState} from 'react';
import AdminHome from './AdminHome';
import StudentHome from './StudentHome';
import Signup from './Signup';

function Login() {
    const[user, setUser] = useState({username:'', password:''});
    const[isAuthenticated, setAuth] = useState(false);
    const [message, setMessage] = useState(' ');  // status message
    const [userRole, setUserRole] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        city: '',
        state_code: '',
        country_code: '',
    });
    

    const onChange = (event) => {
        setUser({...user, [event.target.name] : event.target.value});
    }

    const login = () => {
        var claims;
        fetch('http://localhost:8080/login', {
            method:'POST',
            headers: {'Content-Type':'application/json' },
            body: JSON.stringify(user)
        })
        .then(res => { 
            // console.log(res);
            const jwtToken = res.headers.get('Authorization');
            // console.log(jwtToken);
            if (jwtToken !== null) {
                sessionStorage.setItem("jwt", jwtToken);
                setAuth(true);
            }

            const parts = jwtToken.split('.');
            if (parts.length === 3) {
                const payloadBase64 = parts[1];
                const payloadJSON = atob(payloadBase64);
                claims = JSON.parse(payloadJSON);
                // console.log('Claims:', claims.sub);
            }
            fetch(`http://localhost:8080/user/${claims.sub}`, {headers: {'Authorization' : sessionStorage.getItem("jwt")}})
                .then(response => response.json()) 
                .then(data => {
                    // set student based on email
                    setUserRole(data);
                })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
    // add user
    const  signup = (newUser) => {
        setMessage('');
        console.log("start signup"); 
        console.log(newUser);
        fetch('http://localhost:8080/user',{ 
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(newUser)
        })
        .then(res => {
            if (res.ok) {
            console.log("signup ok");
            setMessage("User signed up.");
            } else {
            console.log('error signup ' + res.status);
            setMessage("Error. "+res.status);
            }})
        .catch(err => {
            console.error("exception signup "+ err);
            setMessage("Exception. "+err);
        })
    }

    if (isAuthenticated) {
        if (userRole.role === 'ADMIN') {
            // return <AdminHome />;
            console.log("Admin");
        } else {
            // return <StudentHome />;
            console.log("User");
        }
    } else {
        return (
            <div className="App">
                <h4>{message}</h4>
                <table>
                <tbody>
                <tr><td>
                <label htmlFor="username">UserName</label>
                </td><td>
                <input type="text" name="username" value={user.username} onChange={onChange} />
                </td></tr>
                <tr><td>
                <label htmlFor="password">Password</label>
                </td><td>
                <input type="text" name="password" value={user.password} onChange={onChange} />
                </td></tr>
                </tbody>
                </table>
            
            <br/>
                <button id="submit" onClick={login}>Login</button>
                <Signup signup={signup} />
            </div>
        );
    }
}
export default Login;