import React, { FormEvent, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../Resources/DataContext';
import { AppRoutes } from '../Router/AppRoutes';

const LoginPage = () => {

    const ctx = useContext(DataContext);
    sessionStorage.setItem('isAuth', 'false');

    function handleSubmit(event: FormEvent): void {
        event.preventDefault();
        checkParams(repoId, token)
    }

    const [repoId, setrepoId] = useState('');
    const [token, setToken] = useState('');

    const navigate = useNavigate();

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
                    ctx.setCredentials(repoId, token)
                        .then(() => {
                            localStorage.setItem('repoId', id);
                            localStorage.setItem('repoToken', token);
                            localStorage.setItem('isAuth', 'true');
                        }).then(() => window.location.reload());
                } else {
                    console.log('Connection failed');
                }
            }).catch((e) => console.log(e));
    }

    return (
        <div className='h-full flex items-center justify-center'>
            <div className="p-5 w-5/6 max-w-lg bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Analyze your Git repo</h5>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Repository ID</label>
                        <input onChange={(e) => setrepoId(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-50 focus:border-green-500 block w-full p-2.5 dark:bg-green-600 dark:border-green-500 dark:placeholder-green-4000 dark:text-white" placeholder="ID" required>
                        </input>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Token</label>
                        <input onChange={(e) => setToken(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Token" required></input>
                    </div>
                    <button type="submit" className="w-full text-white bg-nav-bg hover:bg-nav-bg focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Login to your repo</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage