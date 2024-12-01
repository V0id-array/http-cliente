import { useState } from 'react';
import { login } from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      const token = localStorage.getItem('token'); // Verificar si el token se guarda
      console.log('Token almacenado:', token);
      navigate('/items'); // Redirigir a la página de items
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError('Credenciales incorrectas.');
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-8 rounded shadow-md" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Entrar</button>
      </form>
    </div>
  );
}
