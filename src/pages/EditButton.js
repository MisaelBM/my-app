import React from 'react';

function EditButton({id, nameUser, tel, email, imgProfile, confirmEdit}) {
    const handleEdit = async() => {
        fetch(`http://localhost/editContactServer.php?id=${id}&nameUser=${nameUser}&tel=${tel}&email=${email}&imgProfile=${imgProfile}`, {
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