/* eslint-disable no-unused-vars, no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { AnyNsRecord } from 'dns';

import { App } from '../src/app';

const should = chai.should();

chai.use(chaiHttp);

process.env.NODE_ENV = 'test';
process.env.KEY_SECRET = 'test';
process.env.DB_NAME = 'demo';
process.env.DB_USER = 'admin';
process.env.DB_PASS = 'pass';
process.env.DB_PORT = '3306';

const app = new App();

// eslint-disable-next-line max-lines-per-function
describe('Demo test', () => {
  let server: AnyNsRecord;
  let email: string;
  let password: string;
  let token: string;
  let storeId: string;

  step('run server', (done: any) => {
    app.run().then(() => {
      server = Reflect.get(app, 'server');
      done();
    });
  });

  step('create user', (done) => {
    chai
      .request(server)
      .post('/user')
      .end((err: any, res: any) => {
        res.should.have.status(201);
        res.body.should.property('email');
        res.body.should.property('password');
        email = res.body.email;
        password = res.body.password;
        done();
      });
  });

  step('login', (done) => {
    chai
      .request(server)
      .post('/login')
      .send({ email, password })
      .end((err: any, res: any) => {
        res.should.have.status(200);
        res.body.should.property('token');
        token = res.body.token;
        done();
      });
  });

  step('list stores', (done) => {
    chai
      .request(server)
      .get('/stores')
      .set('Authorization', token)
      .end((err: any, res: any) => {
        res.should.have.status(200);
        res.body.should.property('data');
        res.body.data.should.be.a('array');
        if (res.body.data.length > 0) {
          res.body.data[0].should.property('id');
          res.body.data[0].should.property('name');
          storeId = res.body.data[0].id;
        }
        done();
      });
  });

  step('list orders', (done) => {
    chai
      .request(server)
      .get(`/stores/${storeId}/orders`)
      .set('Authorization', token)
      .end((err: any, res: any) => {
        res.should.have.status(200);
        res.body.should.property('data');
        res.body.data.should.property('orders');
        res.body.data.should.property('total');
        res.body.data.orders.should.be.a('array');
        if (res.body.data.orders.length > 0) {
          res.body.data.orders[0].should.property('amount');
        }
        done();
      });
  });

  step('close app', (done) => {
    app.close();
    done();
  });
});
