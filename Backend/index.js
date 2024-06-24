import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import mongoose from 'mongoose';
import booksRouter from "./routes/booksRouter.js";
import userRouter from "./routes/userRouter.js"
import admin from 'firebase-admin'

const app = express();

// MiddleWares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.type,
    projectId: process.env.project_id,
    private_key_id: process.env.private_key_id,
    client_id: process.env.client_id,
    auth_uri: process.env.auth_uri,
    token_uri: process.env.token_uri,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.client_x509_cert_url,
    universe_domain: process.env.universe_domain,
    clientEmail: process.env.client_email,
    privateKey: process.env.private_key.replace(/\\n/g, '\n')
  }),
  databaseURL: process.env.databaseURL
});

app.use("/api/books", booksRouter);
app.use("/api",userRouter);

mongoose.connect("mongodb://127.0.0.1:27017/bookstore")
  .then(() => {
    console.log("Connected to database");
    app.listen(8080, () => {
      console.log(`App is listening on port 8080`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
