export class HEROPlaceholderAPI {
        #BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/events';
    getTreats() {
        return fetch(`${this.#BASE_URL}`)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error(resp.statusText)
                }
                return resp.json();

            })
    }

} 