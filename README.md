# Projeto Gulp

## Para utilizar o projeto é necessário ter o [NodeJs](https://nodejs.org/en/) instalado.


## Entendendo a estrutura do projeto

### A pasta app:

- somente iremos alterar os arquivos que ficam localizados nesta pasta para o desenvolvimento do projeto
- a pasta **src/images**
  - local onde ficaram todas as images do projeto
- a pasta **src/jade**
  - local onde ficaram todos os arquivos referente ao nosso html, utilizando o [Jade](http://jade-lang.com/) como sintaxe
  - para cada arquivo criado na pasta **src/jade/pages/home/templates** deve ser importando dentro do arquivo src/jade/pages/home/index.jade, lembrando que para isso se tratando da página index
  - para cada página nova utilizar a mesma estrutra de pastas utilizada na home
- a pasta **src/js/inline**
  - local onde ficaram todos os arquivos JavaScripts que ficaram inline no seu projeto
- a pasta **src/js/app**
  - local onde ficaram todos os demais arquivos JavaScripts que for criado para o seu projeto
- a pasta **src/lib**
  - local onde ficaram todas as libs de terceiros, por padrão já temos duas libs que serão utilizadas para realizar o carregamento do css assícrono
- a pasta **src/scss**
  - local onde ficaram todos os arquivos [Sass](https://sass-lang.com/) referente ao estilo do nosso projeto utilizando o pradrão [SMACSS](https://smacss.com) para estruturar as pastas
- a pasta **src/fonts**
  - local onde ficaram todas as fonts utilizadas no seu projeto

### A pasta config:
- local onde ficam os arquivos de configuração do projeto
  - **gulpfile.js** - arquivo para configurar as nossas tasks do projeto, utilizando o [Gulp](https://gulpjs.com/)
  - **package.json** - arquivo que lista todas dependências do projeto e comandos subir o servidor local
  
### A pasta public: 
- essa pasta somente ficará visível quando estivermos usando o servidor local no ambiente de desenvolvimento, será explicado logo abaixo como usar
- esta pasta contém os arquivos que foram compilados da pasta src


### A pasta build: 
- esta pasta somente ficará visível quando estivermos usando o servidor local no ambiente de produção, será explicado logo abaixo como usar
- essa pasta contém os arquivos que foram compilados da pasta src, porém com todos os arquivos minificados prontos para serem enviados para a produção


### A pasta briefing: 
- esta pasta você pode colocar tudo que se refere as instruções do projeto, incluindo o psd


## Instalando as dependências do projeto:

- utilizando o terminal entre até a pasta **config** do projeto
- depois realize o seguinte comando:

```
npm install
```
- este comando irá realizar a instalação de todas as dependências do projeto



## Subindo o servidor local em ambiente de desenvolvimento

- pelo terminal acesse a pasta **config** do projeto
- realize o seguinte comando para sistemas baseado em Linux:

```
npm run start
```

- se em sistema Windows não funcionar use o comando:

```
npm run start-w
```
- ao realizar este comando note que foi criado a pasta **public** onde estão todos os arquivos exibidos pelo navegador
- este comando sobe o servidor local em seu computador e abrirá uma nova janela do navegador com o seu projeto iniciado pronto para o desenvolvimento
- lembrando que ao alterar qualquer arquivo da pasta **src** o projeto está cofigurado para realizar o reload da página automaticamente



## Subindo o servidor local em ambiente de produção
- pelo terminal acesse a pasta **config** do projeto
- realize o seguinte comando para sistemas baseado em Linux:

```
npm run build
```
- se em sistema Windows não funcionar use o comando:

```
npm run build-w
```
- ao realizar este comando note que foi criado a pasta **build** onde estão todos os arquivos exibidos pelo navegador
- este comando sobe o servidor local em seu computador e abrirá uma nova janela do navegador com o seu projeto pronto para ser enviado para a produção
- este servidor porém não está configurado com o livereload, é somente para visualizar o projeto final rodando
