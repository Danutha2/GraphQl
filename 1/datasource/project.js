const {RESTDataSource} from '@apollo/datasource-rest';

class ProjectService extends RESTDataSource{

    constructor() {
        super();

        //Base URL for the REST API
        this.baseURL = 'http://localhost:3000/';

    }

    initialize(config) {}

    //Met
    

}

module.exports = ProjectService;