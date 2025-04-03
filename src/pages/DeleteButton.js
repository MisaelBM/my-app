import React from "react";

function DeleteButton({id, confirmDelete}) {
    const DeleteContact = async(idElement) => {
        fetch(`https://sistemadecontroledeterritório.com/phpServer/deleteContactServer.php?id=${idElement}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
                },
        }).then(() => {
            console.log("Deletado com sucesso");
            confirmDelete();
        })
            .catch(error => console.error("Erro no upload", error));
    };
     return (
        <>
            <button className="contacts-btn" onClick={() => {confirm("Tem certeza que deseja deletar esse contato") ? DeleteContact(id) : console.log("Não deletado")}}>Excluir</button>
        </>
    );
};

export default DeleteButton;