import React, { FormEvent, useContext, useState } from 'react'
import { DataContext } from '../../Resources/DataContext';

const LoginPage = () => {

    const ctx = useContext(DataContext);
    sessionStorage.setItem('isAuth', 'false');

    function handleSubmit(event: FormEvent): void {
        event.preventDefault();
    }

    const [repoId, setrepoId] = useState('');
    const [token, setToken] = useState('');

    const checkParams = async (id: string, token: string) => {
        const baseUrl: string = 'https://gitlab.stud.idi.ntnu.no/api/v4/projects/';
        const targetUrl = baseUrl.concat(id);
        const fetchUrl: URL = new URL(targetUrl);

        if (id === '' || token === '') {
            console.log('Fyll inn begge felt');
            return;
        }

        await fetch(fetchUrl, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            })
        })
            .then(res => {
                if (res.status.toString()[0] === '2') {
                    console.log('Connection success!');
                    ctx.setIsAuthorized(true);
                    
                } else {
                    console.log('Connection failed');
                }
            }).catch((e) => console.log(e));
    }

    return (
        <div className='grid place-items-center justify-center h-full'>
            <div className='flex flex-col gap-2 justify-center items-center'>
                <span>Logg inn!</span>
                <form
                    className='flex flex-cols-2 gap-4'
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <label>ID til repoet ditt</label>
                    <input type="text" className='outline' onChange={(e) => setrepoId(e.target.value)} />
                </form>
                <form
                    className='flex flex-cols-2 gap-4'
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <label>API token</label>
                    <input type="text" className='outline' onChange={(e) => setToken(e.target.value)} />
                </form>
                <button onClick={() => checkParams(repoId, token)}>Check!</button>
            </div>
        </div>
    )
}

export default LoginPage