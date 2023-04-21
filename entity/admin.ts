export interface Admin {
  getUserName: () => string;
  getPassword: () => string;
}

export default function admin(userName: string, password: string): Admin {
  return {
    getUserName: () => userName,
    getPassword: () => password,
  };
}
