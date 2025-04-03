import React from 'react';

function EditButton({id, nameUser, tel, email, imgProfile, salario, confirmEdit}) {
    const handleEdit = async() => {
        fetch(`https://sistemadecontroledeterritório.com/phpServer/editContactServer.php?id=${id}&nameUser=${nameUser}&tel=${tel}&email=${email}&imgProfile=${imgProfile}&salario=${salario}`, {
            method: "PUT"
        }).then(() => {
                console.log("Editado com sucesso");
                confirmEdit();
            })
            .catch(error => console.error("Erro no upload", error));
    };

    return (
        <>
            <button className="btn-confirm" onClick={() => handleEdit()}>Editar</button>
        </>
    );
};

export default EditButton;