class inicio {

    constructor() {
        
        this.prods_mais_vendidos();

    }

    prods_mais_vendidos() {
        
        console.log("Chamou o arquivo js");

        fetch("http://127.0.0.1:3000/produto", { method: "GET" })
        .then(response => response.json())
        .then(data => {
            for (const item of data) {
                console.log(item.image);
                var wrapper = document.querySelector(".wrapper");
                wrapper.innerHTML += `
                    <div class="block">
                        <div class="block-img">
                            <img src="${item.image}">
                        </div>
                        <div class="block-desc">
                            ${item.descricao}
                        </div>
                        <div class="block-valor">
                            R$ ${item.valor}
                        </div>
                        <div class="block-link">
                            <a href="#">Adicionar ao carrinho</a>
                            <a href="#">Ver mais</a>
                        </div>
                    </div>
                `;
            }
        })
        .catch(error => console.log("Erro: " + error));
    }

    carrocel() {

        

    }

}