import { atualizarPrecoCarrinhoCheckout } from "./src/menuCarrinho";
import { apagardoLocalStorage, desenharProdutoCarrinhoSimples, salvarLocalStorage } from "./src/utilidades";
import { lerLocalStorage } from "./src/utilidades";


function desenharProdutosCheckout(){
    const idsProdutoCarrinhocomQuantidade = lerLocalStorage('carrinho') ?? {};
    for (const idProduto in idsProdutoCarrinhocomQuantidade){
        desenharProdutoCarrinhoSimples(idProduto, "container-produtos-checkout", idsProdutoCarrinhocomQuantidade[idProduto]);
    }
}

function finalizarCompra(evento){
    evento.preventDefault();
    const idsProdutoCarrinhocomQuantidade = lerLocalStorage('carrinho') ?? {};
    if (Object.keys(idsProdutoCarrinhocomQuantidade).length == 0){
        return;
    }
    const dataAtual = new Date();
    const pedidoFeito = {
        dataPedido: dataAtual,
        pedido: idsProdutoCarrinhocomQuantidade
    };
    const historicoDePedidos = lerLocalStorage('historico') ?? [];
    const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];

    salvarLocalStorage('historico', historicoDePedidosAtualizado);
    apagardoLocalStorage('carrinho');

    window.location.href = window.location.origin + "/pedidos.html"

}

desenharProdutosCheckout();
atualizarPrecoCarrinhoCheckout();
document.addEventListener('submit', (evt) => finalizarCompra(evt));