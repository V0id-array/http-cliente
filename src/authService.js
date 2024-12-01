// This is a mock authentication service
export const login = (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'user' && password === 'password') {
          resolve('mock-jwt-token');
        } else {
          reject('Invalid credentials');
        }
      }, 1000); // Simulating network request
    });
  };
  