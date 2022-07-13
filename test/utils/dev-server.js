import path from 'path';
import StaticServer from 'static-server';

const server = new StaticServer({
  rootPath: path.join(path.resolve(), 'public'),
  port: 9999,
});

export function startServer() {
  return new Promise((resolve) => {
    server.start(() => {
      console.log(`Using http://localhost:${server.port}`);
      resolve(`http://localhost:${server.port}`);
    })
  });
};