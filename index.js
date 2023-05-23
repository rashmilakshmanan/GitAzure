const { RESTDataSource } = require('apollo-datasource-rest');
const { ApolloServer, gql } = require('apollo-server');
const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');
// publishEvent(id: String, type: String, specversion: String, source: String, contenttype: String ): publishAPI 
const UserService = require('./datasources/user');

const express = require('express');
const app = express()

const typeDefs = gql`
  type Query {
    projects: [Project]
    findProjectById(id: ID): Project
    findUserById(userId:ID): User
    products: [Product]
    publishAPI:publishAPI
  }
  scalar JSON
scalar JSONObject

type MyType {
  myValue: JSON
  deo: JSONObject
}
  type deo{
    projectName: String
    event: event
  }
  type event{
    eventName: String
    eventData: eventData

  }
  type eventData{
    user: String
    query: String
    channel: String
    action: String
    refererpage: String
    device_type: String
    sessionId: String

  }
  type respones{
    response: String
  }
  type User{
    userId:String
    firstName:String
    lastName:String
    age:Int
    emailId:String
    phoneNo:String
  }
  type Mutation {
    postUserId(userId: String, firstName: String,lastName: String, age: Int, emailId: String, phoneNo: String): User
    publishEvent(id: String, type: String, specversion: String, source: String, contenttype: String ): publishAPI 
  }
 
  type publishAPI{
    contenttype: String
    data1: String
    data2: String
    data3: String
    id: String
    message: String
    rig: String
    source: String
    specversion: String
    status: String
    type: String
  }
  type Project {
    id: ID!
    projectName: String
    startDate: String
    client: String
    employees: [Int]
  }
  
  type Product{
    brand_name:String
    product_name:String
    price:String
    image:String
    sale:Boolean
    
  }
`;

const dataSources = () => ({
  userService: new UserService()
});

const resolvers = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
  Query: {
    projects: (parent, args, { dataSources }, info) => {
      return dataSources.projectService.getProjects();
    },
    findProjectById: (parent, { id }, { dataSources }, info) => {
      return dataSources.projectService.findProjectById(id);
    },
    findUserById: (parent, { userId }, { dataSources }, info) => {
      return dataSources.userService.findUserById(userId);
    },
    products:(parent, args, { dataSources }, info)=>{
      return dataSources.userService.getProducts();
    }
  },
  Mutation: {
    postUserId: async (_source, { userId, firstName,lastName,age,emailId,phoneNo }, { dataSources }) => {
      console.log("calling save api for postUserId")
      const User = await dataSources.userService.postUserId({ userId, firstName,lastName,age,emailId,phoneNo })
      return User
    },
    publishEvent: async (_source, args, { dataSources }) => {
      console.log("inside mutation");
      const User = await dataSources.userService.publishEvent()
      return User

  },
}
};

const gqlServer = new ApolloServer({ typeDefs, resolvers, dataSources });

gqlServer
  .listen({ port: process.env.port || 4000 })
  .then(({ url }) => console.log(`graphQL server started on ${url}`));

