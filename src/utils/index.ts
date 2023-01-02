interface ILogin {
  email: string,
  password: string,
}
export function Login({ email, password }: ILogin): Promise<string> {
  const delay = (0.7 + Math.random() * 2) * 1000;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password === 'admin123' && !!email) {
        resolve('Foi');
      } else {
        reject({ message: 'e-mail or password wrong.' });
      }

    }, delay);
  })
}
