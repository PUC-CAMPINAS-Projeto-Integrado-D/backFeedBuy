class ItensCompra {
    constructor({ ID = null, Anuncio = null, Valor = null, Quantidade = null, Compra = null }) {

        this.ID = ID;
        this.Anuncio = Anuncio;
        this.Valor = Valor;
        this.Quantidade = Quantidade;
        this.Compra = Compra;

        return this;
    }

    save() {
        return {
            query: 'INSERT INTO ItensCompra (Anuncio, Valor, Quantidade, Compra) VALUES ?',
            dados: [
                this.Anuncio,
                this.Valor,
                this.Quantidade,
                this.Compra,
            ],
        };
    }

}

module.exports = ItensCompra;
