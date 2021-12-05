class Compra {
    constructor({
        Usuario = null,
        Endereco = null,
        Observacoes = null,
        Data = null,
    }) {

        this.Usuario = Usuario;
        this.Endereco = Endereco;
        this.Observacoes = Observacoes;
        this.Data = Data;

        return this;
    }

    save() {
        return {
            query: 'INSERT INTO Compra (Usuario, Endereco, Observacoes) VALUES (?, ?, ?)',
            dados: [
                this.Usuario,
                this.Endereco,
                this.Observacoes
            ],
        };
    }

}

module.exports = Compra;
