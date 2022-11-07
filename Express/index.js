const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/profile', (req, res) => {
    res.send('Profile Page');
})

app.get('/guide', (req, res) => {
    res.send('Guide Page');
})

app.get('/blog/:name?/:empresa?', (req, res) => {
    // REQ => Dados enviados pelo usuario
    // RES => Dados que serao enviados para o usuario
    let name = req.params.name;
    let empresa = req.params.empresa;
    res.send('<h1>Blog Page of ' + name + ' que trabalha na ' + empresa + '</h1>');
})
// Criar um endpoint para receber um artigo opcional

app.get('/blog/:artigo?', (req, res) => {
    let artigo = req.params.artigo;
    if (artigo){
        res.send('<h1>Blog Page about ' + artigo + '</h1>');
    }else {
        res.send('<h1>Blog Page</h1>');
    }
})

// About query params
app.get('/about/youtube', (req, res) => {
    let canal = req.query['canal'];
    if (canal) {
        res.send('<h1>About Page of ' + canal + ' channel from youtube</h1>');
    } else {
        res.send('<h1>About Page of some channel from youtube</h1>');
    }
})

app.listen(3000,(erro) => {
    if(erro){
        console.log(erro);
    }else{
        console.log('Server running on port 3000');
    }
})
