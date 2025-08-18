const {ApolloServer,gql} = require('apollo-server');
const EmployeeService =require('./datasource/file')
const _ = require('lodash');


const typeDefs = gql`
    type Query {
        employees(id: ID,
        firstName: String,
        lastName: String,
        designation: String,
        department: String @deprecated(reason: "Use 'team' instead"),
        nearestCity: String): [Employee],
        findEmployeeById(id: ID!): Employee
    }
    type Employee {
        id: ID!,
        firstName: String,
        lastName: String,
        designation: String,
        department: String @deprecated(reason: "Use 'team' instead"),
        nearestCity: String
    }

`
//There are three decorators in GraphQL "skip ,include, and deprecated".
//skip: If the condition is true, the field is skipped.
//include: If the condition is true, the field is included.
//deprecated: It's just a waring message.

const dataSources = () => ({
    employeeService: new EmployeeService()
});

const resolvers = {
    Query: {

        employees:  (parents,args,{dataSources},info) => {
            return dataSources.employeeService.getEmployees(args);
        },
        
        findEmployeeById: (parents,{id},{dataSources},info) => {
            return dataSources.employeeService.findEmployee({id}) [0];
        }




    }
}


const gqlServer = new ApolloServer({typeDefs, resolvers,dataSources});


gqlServer.listen(3000).then(({ url }) => {
  console.log(`GraphQL server running at ${url}`);
})
