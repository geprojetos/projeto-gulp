let versao = 5;

let arquivos = [
    "/",
    "css/style.css",
    "lib/csspreload.js",
    "lib/loadcss.js",
    "images/logo-gulp.png"
]

self.addEventListener("install", function(){
    console.log("Instalou Service Workers")
});

self.addEventListener("activate", function(){
    caches.open("projeto-gulp" + versao).then(cache => {
        cache.addAll(arquivos)
            .then(function(){
                caches.delete("projeto-gulp" + (versao - 1 ))   
                caches.delete("projeto-gulp")   
            })
        
    })
});


self.addEventListener("fetch", function(event){

    let pedido = event.request
    let promiseResposta = caches.match(pedido).then(respostaCache => {
        let resposta = respostaCache ? respostaCache : fetch(pedido)
        return resposta
    });

    event.respondWith(promiseResposta)
});