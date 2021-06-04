const graphql = require('graphql');
const Product = require('../models/product')
const Order = require('../models/order')

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLFloat,
    GraphQLInt,
    GraphQLID
} = graphql;

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        category: {type: GraphQLString},
        filter: {type: GraphQLString},
        price: {type: GraphQLFloat}
    })
})

const OrderType = new GraphQLObjectType({
    name: "Order",
    fields: () => ({
        id: { type: GraphQLID},
        ownerId: {type: GraphQLString},
        date: { type: GraphQLString },
        pickupDate: { type: GraphQLString },
        clientDetails: { type: GraphQLString },
        total: {type: GraphQLFloat },
        items: { type: GraphQLList(ProductType) }
    })
})

const ProductInputType = new GraphQLInputObjectType({
    name: "ProductInput",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        category: { type: GraphQLString },
        filter: { type: GraphQLString },
        price: { type: GraphQLFloat },
        quantity: { type: GraphQLInt },
        size: { type: GraphQLString },
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        hello: {
            type: GraphQLString,
            resolve() {
                return 'Hello graphql';
            },
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return Product.find({})
            }
        },
        products: {
            type: new GraphQLList(ProductType),
            args: {category: {type: GraphQLString}},
            resolve(parent, args) {
                return Product.find({category: args.category})
            }
        },
        orders: {
            type: new GraphQLList(OrderType),
            args: {ownerId: {type: GraphQLString}},
            resolve(parent, args) {
                return Order.find({ownerId: args.ownerId})
            }
        }
    }
})

const RootMutation = new GraphQLObjectType({
    name: "RootMutation",
    fields: {
        addOrder: {
            type: OrderType,
            args: {
                id: { type: GraphQLID},
                ownerId: {type: GraphQLString},
                date: { type: GraphQLString },
                pickupDate: { type: GraphQLString },
                clientDetails: { type: GraphQLString },
                total: {type: GraphQLFloat },
                items: { type: GraphQLList(ProductInputType) }
            },
            resolve(parent, args) {
                let order = new Order(
                    {
                        id: args.id,
                        ownerId: args.ownerId,
                        date: args.date,
                        pickupDate: args.pickupDate,
                        clientDetails: args.clientDetails,
                        total: args.total,
                        items: args.items
                    }
                )
                return order.save()
            }
            }
    }
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});

 module.exports = schema;