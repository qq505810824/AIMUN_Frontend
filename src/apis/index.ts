// index.js
import Authorization from './Authorization';
import OpenAIModel from './OpenAIModel';
import User from './User';

export default class Api {
    Authorization: Authorization;
    User: User;
    OpenAIModel: OpenAIModel;

    constructor() {
        this.Authorization = new Authorization();
        this.User = new User();
        this.OpenAIModel = new OpenAIModel();
    }
}
