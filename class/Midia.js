class Midia{

    constructor({ID : null, Link : null, NomeArquivo : null}){
      this.ID = ID;
      this.Link = Link;
      this.NomeArquivo = NomeArquivo;

      return this;
    }

    save(){
        console.log('Save inside Database');
        return {
            query: "INSERT INTO Midia(ID, Link, NomeArquivo) VALUES(?, ?, ?)",
            dados: [this.Link, this.NomeArquivo]
         };
      }

    update(){
          console.log('Save inside Database');
          return {
              query: "UPDATE Midia SET Link = ?, NomeArquivo = ? WHERE ID = ?",
              dados: [this.Link, this.NomeArquivo]
            };
      }

    delete(){
            console.log('Save inside Database');
            return {
                query: "DELETE FROM Midia WHERE ID = ?",
                dados: [this.ID]
            };
      }

    toObject(){
        const ID = this.ID;
        const Link = this.Link;
        const NomeArquivo = this.NomeArquivo;

        return {
            ID,
            Link,
            NomeArquivo,
        };
    }
}
