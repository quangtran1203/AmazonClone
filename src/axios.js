//fetch / post HTTP request
import axios from "axios";

const instance = axios.create({
    baseURL: 'https://us-central1-clone-6b2c5.cloudfunctions.net/api'  //API cloud function URL
});

export default instance;
//https://us-central1-clone-6b2c5.cloudfunctions.net/api
//http://localhost:5001/clone-6b2c5/us-central1/api
