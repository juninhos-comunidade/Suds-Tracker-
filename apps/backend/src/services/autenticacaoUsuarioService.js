import UserRepository from '../repositories/userRepository.js';


export class Autenticar{

    async usuarioEntrar({email,senha}){
    const usuario = await userRepository.findByEmail(email);
    if(!usuario){
        throw new Error('E-mail ou senha incorretos.')
    }
    const senhaValida = senha === usuario.senha
    
    if(!senhaValida){
        throw new Error('E-mail ou senha incorretos.')

    }
    const usuarioValido = true;

    return {usuario,usuarioValido}
    }

}