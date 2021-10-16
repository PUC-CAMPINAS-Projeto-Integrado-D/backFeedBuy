class Visualizacao{
    constructor({ID : null, Usuario : null, Anuncio : null}){
      this.ID = ID;
      this.Usuario = Usuario;
      this.Anuncio = Anuncio;

      return this;
    }

    save(){
        console.log('Save inside Database');
        return {
            query: "INSERT INTO Visualizacao (ID, Usuario, Anuncio) VALUES(?, ?, ?)",
            dados: [this.Usuario, this.Anuncio]
         };
      }

    update(){
          console.log('Save inside Database');
          return {
              query: "UPDATE Visualizacao SET Usuario = ?, Anuncio = ?, WHERE ID = ?",
              dados: [this.Usuario, this.Anuncio]
            };
      }

    delete(){
            console.log('Save inside Database');
            return {
                query: "DELETE FROM Visualizacao, WHERE ID = ?",
                dados: [this.ID]
            };
      }

    toObject(){
        const ID = this.ID;
        const Usuario = this.Usuario;
        const Anuncio = this.Anuncio;

        return {
            ID,
            Usuario,
            Anuncio,
        };
    }
}
