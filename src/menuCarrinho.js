import { catalago, salvarLocalStorage, lerLocalStorage } from "./utilidades";

const idsProdutoCarrinhocomQuantidade = lerLocalStorage('carrinho') ?? {};

function abrirCarrinho() {
    document.getElementById("carrinho").classList.add('right-[0px]');
    document.getElementById("carrinho").classList.remove('right-[-360px]');
};

function fecharCarrinho() {
    document.getElementById("carrinho").classList.remove('right-[0px]');
    document.getElementById("carrinho").classList.add('right-[-360px]');
};

function irParaCheckout(){
    if (Object.keys(idsProdutoCarrinhocomQuantidade).length == 0) {
        return;
    }
    window.location.href = window.location.origin + "/checkOut.html";
}

export function inicializarCarrinho() {
    const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
    const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");
    const botairParaCheckout = document.getElementById("finalizar-compra");

    botaoAbrirCarrinho.addEventListener('click', abrirCarrinho);
    botaoFecharCarrinho.addEventListener('click', fecharCarrinho);
    botairParaCheckout.addEventListener('click', irParaCheckout);
};


function removerDoCarrinho(idProduto) {
    delete idsProdutoCarrinhocomQuantidade[idProduto];
    salvarLocalStorage('carrinho', idsProdutoCarrinhocomQuantidade);
    atualizarPrecoCarrinho();
    renderizarProdutosCarrinho();
}

function incrementarQuantidadeDeProduto(idProduto){
    idsProdutoCarrinhocomQuantidade[idProduto]++;
    salvarLocalStorage('carrinho', idsProdutoCarrinhocomQuantidade);
    atualizarPrecoCarrinho();
    atualizarInformaçaoQuantidade(idProduto);
}

function decrementarQuantidadeDeProduto(idProduto){
    if(idsProdutoCarrinhocomQuantidade[idProduto] == 1){
        removerDoCarrinho(idProduto);
        return
    }
    idsProdutoCarrinhocomQuantidade[idProduto]--;
    salvarLocalStorage('carrinho', idsProdutoCarrinhocomQuantidade);
    atualizarPrecoCarrinho();
    atualizarInformaçaoQuantidade(idProduto);
}

function atualizarInformaçaoQuantidade(idProduto) {
    document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutoCarrinhocomQuantidade[idProduto]; 
}

function desenharProdutoNoCarrinho(idProduto) {
    const produto = catalago.find((p) => p.id == idProduto);
    const conteinerProdutosCarrinho = document.getElementById("produtos-carrinho");
    
    const elementoArticle = document.createElement('article');
    const articleClasses = [
        "flex", 
        "bg-slate-100", 
        "rounded-lg", 
        "p-1", 
        "relative"
    ];
    
    for (const articleClass of articleClasses) {
        elementoArticle.classList.add(articleClass);
    };

    
    const cartaoProdutoCarrinho = `
    <button id="remover-item-${produto.id}" class="absolute top-0 right-2"><i class="fa-solid fa-circle-xmark text-slate-500 hover:text-slate-800"></i></button>
    <img src="./assets/img/${produto.nomeArquivoImagem}" alt="Carrinho: ${produto.nome}" class="h-24 rounded-lg">
    <div class="p-2 flex flex-col justify-between">
      <p class="text-slate-900 text-sm">${produto.nome}</p>
      <p class="text-slate-400 text-xs">Tamanho: M</p>
      <p class="text-green-700 text-lg">$${produto.preco}</p>
    </div>
    <div class='flex text-slate-950 items-end absolute bottom-0 right-2 text-l'>
        <button id='decrementar-produto-${produto.id}'>-</button>
        <p id='quantidade-${produto.id}' class='ml-2'>${idsProdutoCarrinhocomQuantidade[produto.id]}</p>
        <button id='incrementar-produto-${produto.id}'class='ml-2'>+</button>
    </div>`;

    elementoArticle.innerHTML = cartaoProdutoCarrinho;
  conteinerProdutosCarrinho.appendChild(elementoArticle);

  document.getElementById(`decrementar-produto-${produto.id}`).addEventListener('click', () => decrementarQuantidadeDeProduto(produto.id));
  document.getElementById(`incrementar-produto-${produto.id}`).addEventListener('click', () => incrementarQuantidadeDeProduto(produto.id));
  document.getElementById(`remover-item-${produto.id}`).addEventListener('click', () => removerDoCarrinho(produto.id));
};

export function renderizarProdutosCarrinho() {
    const conteinerProdutosCarrinho = document.getElementById("produtos-carrinho");
    conteinerProdutosCarrinho.innerHTML = "";
    for (const idProduto in idsProdutoCarrinhocomQuantidade) {
        desenharProdutoNoCarrinho(idProduto);
    }
};

export function adicionarAoCarrinho(idProduto){
    if (idProduto in idsProdutoCarrinhocomQuantidade){
        incrementarQuantidadeDeProduto(idProduto);
        return
    }
    idsProdutoCarrinhocomQuantidade[idProduto] = 1;
    salvarLocalStorage('carrinho', idsProdutoCarrinhocomQuantidade);
    desenharProdutoNoCarrinho(idProduto);
    atualizarPrecoCarrinho();
};

export function atualizarPrecoCarrinho() {
    const precoCarrinho = document.getElementById(`preco-total`);
    let precoTotalCarrinho = 0;
    for (const idProdutoNoCarrinho in idsProdutoCarrinhocomQuantidade) {
        precoTotalCarrinho += 
            catalago.find((p) => p.id == idProdutoNoCarrinho).preco * 
            idsProdutoCarrinhocomQuantidade[idProdutoNoCarrinho];
    }
    precoCarrinho.innerText = `Total: $${precoTotalCarrinho}`;
};

export function atualizarPrecoCarrinhoCheckout() {
    const precoCarrinho = document.getElementById(`preco-total`);
    let precoTotalCarrinho = 0;
    for (const idProdutoNoCarrinho in idsProdutoCarrinhocomQuantidade) {
        precoTotalCarrinho += 
            catalago.find((p) => p.id == idProdutoNoCarrinho).preco * 
            idsProdutoCarrinhocomQuantidade[idProdutoNoCarrinho];
    }
    precoCarrinho.innerText = `Total: $${precoTotalCarrinho}`;
}