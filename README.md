# Projeto Gulp

## Para utilizar o projeto é necessário ter o [NodeJs](https://nodejs.org/en/) instalado.


## Entendendo a estrutura do projeto

### A pasta src:

- somente iremos alterar os arquivos que ficam localizados nesta pasta para o desenvolvimento do projeto
- a pasta **src/images**
  - local onde ficaram todas as images do projeto
- a pasta **src/jade**
  - local onde ficaram todos os arquivos referente ao nosso html, utilizando o [Jade](http://jade-lang.com/) como sintaxe
  - e para cada arquivo criado na pasta **src/jade/pages/home/templates** deve ser importando dentro do arquivo src/jade/pages/home/index.jade, lembrando que para isso se tratando da página index
- a pasta **src/js/inline**
  - local onde ficaram todos os arquivos JavaScripts que ficaram inline em nosso projeto
- a pasta **src/lib**
  - local onde ficaram todas as libs de terceiros, por padrão já temos duas libs que serão utilizadas para realizar o carregamento do css assícrono
- a pasta **src/scss**
  - local onde ficaram todos os arquivos [Sass](https://sass-lang.com/) referente ao estilo do nosso projeto utilizando o pradrão [SMACSS](https://smacss.com) para estruturar as pastas

### A pasta config:
- local onde ficam os arquivos de configuração do projeto
  - [**gulpfile.js**](https://gulpjs.com/) - arquivo para configurar as nossas tasks do projeto
  - **package.json** - arquivo que lista todas dependências do projeto e comandos rodar o servidor local
  
### A pasta public: 
- essa pasta somente ficará visível quando estivermos rodando o servidor local no ambiente de desenvolvimento

```
npm run start
```
- esta pasta contém os arquivos que foram compilados da pasta src


### A pasta build: 
- esta pasta somente ficará visível quando estivermos rodando o servidor local no ambiente de produção

```
npm run build
```
- essa pasta contém os arquivos que foram compilados da pasta src, porém com todos os arquivos minificados prontos para serem enviados para a produção



## Instalando as dependências do projeto:

- utilizando o terminal entre até a pasta **config** do projeto
- depois realize o seguinte comando:

```
npm i
```
- este comando irá realizar a instalação de todas as dependências do projeto



## Rodando o servidor local em ambiente de desenvolvimento

- pelo terminal acesse a pasta **config** do projeto
- realize o seguinte comando:

```
npm run start
```
- ao realizar este comando note que foi criado a pasta **public** onde estão todos os arquivos exibidos pelo navegador
- este comando ira rodar o servidor local em seu computador e abrirá uma nova janela do navegador com o seu projeto iniciado pronto para o desenvolvimento
- lembrando que ao alterar qualquer arquivo da pasta **src** o projeto está cofigurado para realizar o reload da página automaticamente



## Rodando o servidor local em ambiente de produção
- pelo terminal acesse a pasta **config** do projeto
- realize o seguinte comando:

```
npm run build
```
- ao realizar este comando note que foi criado a pasta **build** onde estão todos os arquivos exibidos pelo navegador
- este comando ira rodar o servidor local em seu computador e abrirá uma nova janela do navegador com o seu projeto pronto para ser enviado para a produção
- este servidor porém não está configurado com o livereload, é somente para visualizar o projeto final rodando
