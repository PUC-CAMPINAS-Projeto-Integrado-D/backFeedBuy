class Anuncio{
    constructor({ID = null, Descricao = null, Preco = null, Marca = null, Anunciante = null}){

        this.ID = ID;
        this.Descricao = Descricao;
        this.Preco = Preco;
        this.Marca = Marca;
        this.Anunciante = Anunciante;

        return this;
    }

    update(){
        console.log('Save inside Database');
        return {
            query: "UPDATE Anuncio SET Descricao = ?, Preco = ?, Marca = ?, Anunciante = ? WHERE ID = ?",
            dados: [
                this.ID,
                this.Descricao,
                this.Preco,
                this.Marca,
                this.Anunciante
            ]
        };
    }

    delete(){
        console.log('Save inside Database');
        return {
            query: "DELETE FROM Anuncio WHERE ID = ?",
            dados: [this.ID]
        };
    }

    save(){
        console.log('Save inside Database');
        return {
            query: "INSERT INTO Anuncio (Descricao, Preco, Marca, Anunciante) VALUES (?, ?, ?, ?)",
            dados: [
                this.Descricao,
                this.Preco,
                this.Marca,
                this.Anunciante
            ]
        };
    }

    toObject(){
        ID = this.ID;
        Descricao = this.Descricao;
        Preco = this.Preco;
        Marca = this.Marca;
        Anunciante = this.Anunciante;

        return {
            ID,
            Descricao,
            Preco,
            Marca,
            Anunciante,
        };
    }
}
