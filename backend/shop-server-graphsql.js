const { ApolloServer, gql } = require('apollo-server');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const products = require('../data/products.json');

//Объект typeDef определяет список типов, которые доступны в проекте
const typeDefs = gql`
    type Product{
        id: ID!
        name: String!
        price: Float!
        description: String
        category: [String!]!
    }
    
    type Query{
        products: [Product]!
    }
    
`;

// type Mutation
// {
//     addProduct(name: String!, price: Float!, description: String, category: [String]): Product
//     updateProduct(id: ID!, name: String, price: Float, description: String, category: [String]): Product
//     deleteProduct(id: ID!): Boolean
// }

//Resolver — функция, которая возвращает данные для определённого поля.
const resolvers = {
    Query:{
        products: () => products,
    },
};
//

// Mutation:{
//   addProduct: (_, args) => {
//       const newProduct = { id: String(products.length + 1), ...args };
//       products.push(newProduct);
//       return newProduct;
//     },
//   updateProduct: (_, args) => {
//       const index = products.findIndex(p => p.id === args.id);
//       if (index >= 0) {
//         products[index] = { ...products[index], ...args };
//         return products[index];
//       }
//       throw new Error('Product not found');
//     },
//   deleteProduct: (_, args) => {
//       const index = products.findIndex(p => p.id === args.id);
//       if (index >= 0) {
//         products.splice(index, 1);
//         return true;
//       }
//       return false;
//     },
// },
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`GraphQL сервер запущен на ${url}`);
  });