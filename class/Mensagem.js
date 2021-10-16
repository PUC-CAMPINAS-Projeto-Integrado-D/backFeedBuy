class Mensagem{

    constructor({ID : null, Remetente : null, Conteudo : null, Chat : null}){
      this.ID = ID;
      this.Remetente = Remetente;
      this.Conteudo = Conteudo;

      return this;
    }

    save(){
        console.log('Save inside Database');
        return {
            query: "INSERT INTO Mensagem (ID, Remetente, Conteudo, Chat) VALUES(?, ?, ?, ?)",
            dados: [this.Remetente, this.Conteudo, this.Chat]
         };
      }

    update(){
          console.log('Save inside Database');
          return {
              query: "UPDATE Mensagem SET Remetente = ?, Conteudo = ?, Chat = ? WHERE ID = ?",
              dados: [this.Remetente, this.Conteudo, this.Chat]
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
        const Remetente = this.Remetente;
        const Conteudo = this.Conteudo;
        const Chat = this.Chat;

        return {
            ID,
            Remetente,
            Conteudo,
            Chat,
        };
    }
}
