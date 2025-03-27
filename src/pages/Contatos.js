import '../styles/Contatos.css';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import { useEffect, useState } from 'react';

function Contatos({reloadView}) {
    const [response, setResponse] = useState('');
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editTel, setEditTel] = useState('');
    const [editImgProfile, setEditImgProfile] = useState('');
    const [editId, setEditId] = useState('');
    const [editActivee, setEditActive] = useState(false);
    
    const setVarEdit = (id, name, email, tel, imgProfile) => {
        setEditName(name);
        setEditEmail(email);
        setEditTel(tel);
        setEditImgProfile(imgProfile);
        setEditId(id);
    };

    const ViewContact = async() => {
        fetch("http://localhost/viewContactsServer.php", {
            method: "GET"
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                setEditActive(false);
                setResponse(data.map((contact) => (
                    <div className="contacts-content" key={contact.id}>
                        <div className="contacts-content-btrn">
                            <button className="contacts-btn" onClick={() => {
                                setVarEdit(contact.id, contact.nome, contact.email, contact.telefone, contact.imagem_perfil);
                                setEditActive(true);
                            }}>Editar</button>
                            <DeleteButton id={contact.id} confirmDelete={ViewContact} />
                        </div>
                        <img className="contacts-img" src={contact.imagem_perfil} alt="Imagem do contato" />
                        <div className="contacts-content-info">
                            <p className="contacts-info">Nome: {contact.nome}</p>
                            <p className="contacts-info">Telefone: {contact.telefone}</p>
                            <p className="contacts-info">Email: {contact.email}</p>
                        </div>
                    </div>
                )));
            })
            .catch(error => console.error("Erro no upload", error));
    };

    useEffect(() => {
        ViewContact();     
    }, [reloadView]);

    return (
        <>
            <div className="contacts-container">
                <h1 className="contacts-title">Contatos</h1>
                <hr/>
                <div className="contacts">
                    {response}
                </div>
            </div>
            {editActivee ? <div  className="contacts-edit">
                <div className="input-content">
                    <label htmlFor="name" className="input-text">Nome</label>
                    <input type="text" id="editName" name="editName" className="input-info" value={editName} onChange={(e) => {setEditName(e.target.value), console.log(e.target.value, editName, editEmail)}} />
                </div>
                <div className="input-content">
                    <label htmlFor="tel" className="input-text">Telefone</label>
                    <input type="tel" id="editTel" name="tel" className="input-info" value={editTel} onChange={(e) => setEditTel(e.target.value)} />
                </div>
                <div className="input-content">
                    <label htmlFor="email" className="input-text">Email</label>
                    <input type="email" id="editEmail" name="editEmail" className="input-info" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                </div>
                <div className="input-content">
                    <label htmlFor="img-profile" className="input-text">Imagem de perfil(Url)</label>
                    <input id="editImg-profile" name="editImg-profile" className="input-info" type="url" value={editImgProfile} onChange={(e) => setEditImgProfile(e.target.value)} />
                </div>
                <EditButton id={editId} nameUser={editName} email={editEmail} tel={editTel} imgProfile={editImgProfile} confirmEdit={ViewContact} />
                <button className="btn-cancel" onClick={() => setEditActive(false)}>Cancelar</button>
            </div> : null}
        </>
    );
};

export default Contatos;