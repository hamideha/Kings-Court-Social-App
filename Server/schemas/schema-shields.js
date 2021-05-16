const { rule, shield } = require('graphql-shield')

const isAuthenticated = rule({ cache: 'contextual' })(
    async (parent, args, ctx, info) => {
        return ctx.user
    },
)

const permissions = shield({
    Mutation: {
        deleteMessage: isAuthenticated,
        likeMessage: isAuthenticated,
    },
})

module.exports = permissions