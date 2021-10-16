class Produto{

    constructor({ID : null, Marca : null){
      this.ID = ID;
      this.Marca = Marca;

      return this;
    }

    save(){
        console.log('Save inside Database');
        return {
            query: "INSERT INTO Produto(ID, Marca) VALUES(?, ?)",
            dados: [this.Marca]
         };
      }

    delete(){
            console.log('Save inside Database');
            return {
                query: "DELETE FROM Produto WHERE ID = ?",
                dados: [this.ID]
            };
      }

    toObject(){
        const ID = this.ID;
        const Marca = this.Marca;

        return {
            ID,
            Marca,
        };
    }
}
