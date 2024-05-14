import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; 

const users = [
  { username: 'admin1', password: 'password1' },
  { username: 'admin2', password: 'password2' },
  { username: 'user', password: '1234' },
];

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const user = users.find((user) => user.username === username && user.password === password);
    if (user) {
      navigate('/app'); 
    } else {
      alert('Credenciales inválidas');
    }
  };

  return (
    <div className="main-container">
      <div className="container d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="card text-center">
          <div className="card-header">
            <h2>Mr. Frog</h2>
          </div>
          <div className="card-body">
            <input type="text" className="form-control mb-3" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" className="form-control mb-3" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="btn btn-primary" onClick={handleLogin}>Iniciar sesión</button>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>© Mr.Frog 2024 . Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Login;
