import axios from 'axios';


export const gitHubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',

    // Agregar headers de autorizacion para sumar peticiones en github, con un token acces valido 
    // headers: {
    //     Authorization: 'Bearer github_pat_{{  TOKEN ACCES }}'
    // }
})