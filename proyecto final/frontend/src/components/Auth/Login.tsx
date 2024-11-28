import React from 'react';

const Login: React.FC = () => {
  const googleLogin = () => {
    window.location.href = 'http://localhost:4000/api/auth/google';
  };

  return (
    <div>
      {/* ...Formulario de login existente... */}
      <button onClick={googleLogin}>Iniciar sesión con Google</button>
    </div>
  );
};

export default Login;
