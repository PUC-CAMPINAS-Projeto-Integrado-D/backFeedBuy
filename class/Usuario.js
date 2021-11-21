class Usuario{

    constructor({ID = null, Email = null, Senha = null, Nome = null, Cargo = 'COMPRADOR'}){
        this.ID = ID;
        this.Email = Email;
        this.Senha = Senha;
        this.Nome = Nome;
        this.Cargo = Cargo;

        return this;
    }

    save(){
        return {
            query: "INSERT INTO Usuario (Email, Senha, Nome, Cargo) VALUES(?, ?, ?, ?)",
            dados: [this.Email, this.Senha, this.Nome, this.Cargo]
        };
    }

    update(){
        console.log('Save inside Database');
        return {
            query: "UPDATE Usuario SET Email = ?, Senha= ?, Nome = ?, Cargo = ? WHERE ID = ?",
            dados: [this.Usuario, this.Anuncio]
        };
    }

    delete(){
        console.log('Save inside Database');
        return {
            query: "DELETE FROM Usuario WHERE ID = ?",
            dados: [this.ID]
        };
    }

    getUserData(){
        return {
            query: "SELECT * FROM Usuario WHERE Nome = ? OR Email = ? LIMIT 1",
            dados: [this.Nome, this.Email]
        };
    }

    getUserByID(){
        return {
            query: "SELECT * FROM Usuario WHERE ID = ? LIMIT 1",
            dados: [this.ID]
        };
    }

    toObject(){
        const ID = this.ID;
        const Usuario = this.Usuario;
        const Email = this.Email;
        const Senha = this.Senha;
        const Nome = this.Nome;
        const Cargo = this.Cargo;

        return {
            ID,
            Usuario,
            Email,
            Senha,
            Nome,
            Cargo,
        };
    }
}

module.exports = Usuario;
