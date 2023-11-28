import React, {useState} from 'react';
import AdminHome from './AdminHome';
import StudentHome from './StudentHome';

function Login() {
    const[user, setUser] = useState({username:'', password:''});
    const[isAuthenticated, setAuth] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [student, setStudent] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        status: '',
        statusCode: 0,
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
            fetch(`http://localhost:8080/student/${claims.sub}`, {headers: {'Authorization' : sessionStorage.getItem("jwt")}})
                .then(response => response.json()) 
                .then(data => {
                    // set student based on email
                    setStudent(data);
                })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));

        
    }

    if (isAuthenticated) {
        if (student.role === 'ADMIN') {
            return <AdminHome />;
        } else {
            return <StudentHome />;
        }
    } else {
        return (
            <div className="App">
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
                </div>
        );
    }
}
export default Login;