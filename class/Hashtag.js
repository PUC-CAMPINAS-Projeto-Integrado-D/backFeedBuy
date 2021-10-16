class Hashtag{

    constructor({ID : null, Hashtag : null}){
      this.ID = ID;
      this.Hashtag = Hashtag;

      return this;
    }

    save(){
        console.log('Save inside Database');
        return {
            query: "INSERT INTO Hashtag(ID, Hashtag) VALUES(?, ?)",
            dados: [this.Hashtag]
         };
      }

    update(){
          console.log('Save inside Database');
          return {
              query: "UPDATE Mensagem SET Hashtag = ?WHERE ID = ?",
              dados: [this.Hashtag]
            };
      }

    delete(){
            console.log('Save inside Database');
            return {
                query: "DELETE FROM MensagemWHERE ID = ?",
                dados: [this.ID]
            };
      }

    toObject(){
        const ID = this.ID;
        const Hashtag = this.Hashtag;

        return {
            ID,
            Hashtag,
        };
    }
}
