// auth.js jason
const jwt = require('jsonwebtoken');
const secret = '123' //Ponto de vulnerabiliadde porque a chave secreta não acessível
//Recomenda-se gravar em variaveis de ambiente de sistema operacional

async function generateToken(user){
    const id = user.id;
    const email = user.email;
    const token = jwt.sign({id, email}, secret, {expiresIn:'1h'});
    return token;

}

//Metodo para verificar a validade do token jwt
async function verifyToken(req, res, next){
    //Extrair o cabeçalho que contem o token
    const authheader = req.headers['authorization'];
    if(!authheader){
        return res.status(401).json({message:'Token não informado'});
    }
    //Extrair o token
    const token = authheader.split(' ')[1]; //Separar pelo espaço para ignorar a palavra Bearer
    if (!token) {
        return res.status(401).json({message:'Token não informado'});
    }
    //Verificar a validade
    jwt.verify(token, secret, (err, decoded)=>{
        if (err) {
            //Caso ocorra erro
            return res.status(401).json({message:'Token inválido'});
        }
        req.user = decoded;
        next();
    });
}

module.exports = {generateToken, verifyToken};