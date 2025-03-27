import '../styles/Cadastro.css';
import { useEffect, useState } from 'react';
import Contatos from './Contatos';

function Cadastro() {
    const [nameUser, setNameUser] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [imgProfile, setImgProfile] = useState("");
    const [reload, setReload] = useState(0);

    function HandleSubmit(e) {
        e.preventDefault();
        if (nameUser === '' || email === '' || tel === '' || imgProfile === '') {
            return alert('Preencha todos os campos');
        };
        
        const formData = `nameUser=${nameUser}&email=${email}&tel=${tel}&imgProfile=${imgProfile}`;
        fetch("http://localhost/AddContactServer.php", {
            method: "POST",
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }}).then(response => response.json())
            .then(() => {
                console.log("Upload feito com sucesso!")
                setNameUser('');
                setEmail('');
                setTel('');
                setImgProfile('');
                setReload(reload + 1);
            })
            .catch(error => console.error("Erro no upload", error));
    };

    return (
        <>
            <main>
                <div className="container">
                    <h1 className="title-cadastro">Cadastro</h1>
                    <hr/>
                    <div className="inputs-content">
                        <div className="input-content">
                            <label htmlFor="name" className="input-text">Nome</label>
                            <input type="text" id="name" name="name" className="input-info" value={nameUser} onChange={(e) => setNameUser(e.target.value)} />
                        </div>
                        <div className="input-content">
                            <label htmlFor="tel" className="input-text">Telefone</label>
                            <input type="tel" id="tel" name="tel" className="input-info" value={tel} onChange={(e) => setTel(e.target.value)} />
                        </div>
                        <div className="input-content">
                            <label htmlFor="email" className="input-text">Email</label>
                            <input type="email" id="email" name="email" className="input-info" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input-content">
                            <label htmlFor="img-profile" className="input-text">Imagem de perfil(Url)</label>
                            <input id="img-profile" name="img-profile" className="input-info" type="url" value={imgProfile} onChange={(e) => setImgProfile(e.target.value)} />
                        </div>
                        <button className="btn-confirm" onClick={e => HandleSubmit(e)}>Cadastrar</button>
                    </div>
                </div>
            </main>
            <Contatos reloadView={reload} />
        </>
    );
};

export default Cadastro;