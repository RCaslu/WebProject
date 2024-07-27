export const catalago = [
    {
        id: "1",
        nome: "Nike dunk Travis Scott",
        marca: "Nike",
        preco: 70,
        nomeArquivoImagem: "product-1.jpg",
        feminino: false,
    },
    {
        id: "2",
        nome: "Nike Lebron 17 Infrared",
        marca: "Nike",
        preco: 140,
        nomeArquivoImagem: "product-2.jpg",
        feminino: true,
    },
    {
        id: "3",
        nome: "Lebron 16 The king",
        marca: "Nike",
        preco: 180,
        nomeArquivoImagem: "product-3.jpg",
        feminino: false,
    },
    {
        id: "4",
        nome: "Nike dunk high gs olive green white",
        marca: "Nike",
        preco: 280,
        nomeArquivoImagem: "product-4.jpg",
        feminino: false,
    },
    {
        id: "5",
        nome: "Yeezy 450",
        marca: "Adidas",
        preco: 260,
        nomeArquivoImagem: "product-5.jpg",
        feminino: false,
    },
    {
        id: "6",
        nome: "Yeezy 350 cloud white",
        marca: "Adidas",
        preco: 290,
        nomeArquivoImagem: "product-6.jpg",
        feminino: true,
    },
    {
        id: "7",
        nome: "Nike air force 1 Travis Scott",
        marca: "Nike",
        preco: 380,
        nomeArquivoImagem: "product-7.jpg",
        feminino: true,
    },
    {
        id: "8",
        nome: "Air Jordan 1 Black Phantom",
        marca: "Nike",
        preco: 190,
        nomeArquivoImagem: "product-8.jpg",
        feminino: true,
        
    },
];

export function salvarLocalStorage(chave, informacao) {
    localStorage.setItem(chave, JSON.stringify(informacao));
}

export function lerLocalStorage(chave) {
    return JSON.parse(localStorage.getItem(chave));
}

export function apagardoLocalStorage(chave) {
    localStorage.removeItem(chave);
}

export function desenharProdutoCarrinhoSimples(idProduto, idContainerHTML, quantidadeProduto) {
    const produto = catalago.find((p) => p.id == idProduto);
    const conteinerProdutosCarrinho = document.getElementById(idContainerHTML);
    
    const elementoArticle = document.createElement('article');
    const articleClasses = [
        "flex", 
        "bg-stone-300", 
        "rounded-lg", 
        "p-1", 
        "relative",
        "mb-2",
        "w-80"
    ];
    
    for (const articleClass of articleClasses) {
        elementoArticle.classList.add(articleClass);
    };

    
    const cartaoProdutoCarrinho = `
    <img src="./assets/img/${produto.nomeArquivoImagem}" alt="Carrinho: ${produto.nome}" class="h-24 rounded-lg">
    <div class="p-2 flex flex-col justify-between">
      <p class="text-slate-900 text-sm">${produto.nome}</p>
      <p class="text-slate-400 text-xs">Tamanho: M</p>
      <p class="text-green-700 text-lg">$${produto.preco}</p>
    </div>
    <div class='flex text-slate-950 items-end absolute bottom-0 right-2 text-l'>
        <p id='quantidade-${produto.id}' class='ml-2'>${quantidadeProduto}</p>
    </div>`;

    elementoArticle.innerHTML = cartaoProdutoCarrinho;
  conteinerProdutosCarrinho.appendChild(elementoArticle);

};