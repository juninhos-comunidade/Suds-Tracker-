import { Request, Response } from 'express';
import { autenticar } from '../services/authService.js';

const userRepository = new UserRepository();
export class autenticacaoController{    
    async autenticarUsuario(req, res) {
      const {email, senha} = req.body;
      
      if(!email||!senha){
          return res
          .status(400)
          .json({ error: "Email e Senha são obrigatórios." });
        }

      const novoUsuario = await autenticar({email,senha});

      return res.status(200).json({
        mensagem: "Usuário cadastrado com sucesso!",
        usuario: novoUsuario,
      });
    }
}