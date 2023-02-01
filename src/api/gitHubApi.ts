import axios from 'axios';


export const gitHubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    }
})