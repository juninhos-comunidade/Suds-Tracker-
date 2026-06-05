import { Autenticar } from '../services/autenticacaoUsuarioService.js';
const autenticar = new Autenticar();


export class autenticacaoController{    
    async autenticarUsuario(req, res) {
      const {email, senha} = req.body;
      
      if(!email||!senha){
          return res
          .status(400)
          .json({ error: "Email e Senha são obrigatórios." });
        }

      const novoUsuario = await autenticar.usuarioEntrar({email,senha});

      return res.status(200).json({
        mensagem: "Usuário cadastrado com sucesso!",
        novoUsuario,
      });
    }
}