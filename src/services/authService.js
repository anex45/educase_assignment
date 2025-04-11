// Simple authentication service for demo purposes
// In a real application, you would connect to a backend API

const AUTH_KEY = 'popx_auth';

const authService = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        // For demo purposes, accept any email with a password longer than 5 chars
        if (password.length >= 6 && email.includes('@')) {
          const user = {
            email,
            name: email.split('@')[0],
            isLoggedIn: true
          };
          localStorage.setItem(AUTH_KEY, JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  },

  register: (userData) => {
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        if (userData.password.length >= 6 && userData.email.includes('@')) {
          const user = {
            ...userData,
            isLoggedIn: true
          };
          localStorage.setItem(AUTH_KEY, JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Invalid registration data'));
        }
      }, 500);
    });
  },

  logout: () => {
    localStorage.removeItem(AUTH_KEY);
  },

  getCurrentUser: () => {
    const user = localStorage.getItem(AUTH_KEY);
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(AUTH_KEY);
  }
};

export default authService;