class cadastro_pruduto {

    constructor() {

        this.idatual = 0;

        this.evento_click_cadastrar(this.idatual);

    }

    evento_click_cadastrar(idatual) {

        let btnCadastrar = document.querySelector("#cadastrar");
        
        btnCadastrar.addEventListener('click', (event) => {
            event.preventDefault();
            this.inserir(idatual);
        })

    }

    to_base64(file) {

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

    }

    inserir(idatual) {

        let elImage = document.querySelector("#image").files[0];
        let stringBase64 = "";

        this.to_base64(elImage).then(
            (resp) => {
                stringBase64 = resp.split(',', 2)[1];
                console.log(stringBase64)
            },
            (erro) => {
                console.log(erro);
            }
        );

        let prod = {
            id: idatual,
            image: document.getElementById("image").value,
            descricao: document.getElementById("descricao").value,
            info: document.getElementById("informacao").value,
            grupo: document.getElementById("categoria").value,
            valor: document.getElementById("valor").value,
            estoque: document.getElementById("estoque").value
        }

        let json = JSON.stringify(prod);
        let url;
        let metodo;
        let myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        if (this.idatual == 0) {
            url = "http://127.0.0.1:3000/produto";
            metodo = "POST";
        }
        else {
            url = "http://127.0.0.1:3000/produto/" + this.idatual;
            metodo = "PUT";
        }

        fetch(url, { method: metodo, body: json, edirect: 'follow', headers: myHeaders })
        .then(result => {
            if (result.status == 201) {
                console.log("Produto cadastrado com sucesso!");
            }
            else {
                console.log("Falha ao inserir dados!");
            }
        });

    }

    alterar() {

    }

    deletar() {

    }

    consultar() {

    }

    listar() {

    }

}