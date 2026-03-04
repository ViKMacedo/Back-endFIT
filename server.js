import express, { request } from "express";
import { prisma } from "./lib/prisma.ts";

const app = express();
app.use(express.json());

app.post("/livros", async (req, res) => {
  await prisma.livro.create({
    data: {
      nome: req.body.nome,
      publicado: req.body.publicado,
      autor: req.body.autor,
    },
  });

  res.status(201).json(req.body);
});

app.put("/livros/:id", async (req, res) => {
  await prisma.livro.update({
    where: {
      id: req.params.id,
    },
    data: {
      nome: req.body.nome,
      publicado: req.body.publicado,
      autor: req.body.autor,
    },
  });

  res.status(201).json(req.body);
});

app.get("/livros", async (req, res) => {
  let users = [];

  if (req.query.name) {
    users = await prisma.livro.findMany({
      where: {
        nome: req.query.nome,
        publicado: req.query.publicado,
        autor: req.query.autor,
      },
    });
  } else {
    const users = await prisma.livro.findMany();
    res.status(200).json(users);
  }
});

app.delete("/livros/:id", async (req, res) => {
  await prisma.livro.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ message: "Usuário deletado com sucesso!" });
});

app.listen(3000);

/* 
user: victor
senha:serverfit
*/
