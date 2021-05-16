const { rule, shield } = require('graphql-shield')

const isAuthenticated = rule({ cache: 'contextual' })(
    async (parent, args, { req }, info) => {
        if (req.cookies.token) return true
    },
)

const permissions = shield({
    Mutation: {
        addMessage: isAuthenticated,
        deleteMessage: isAuthenticated,
        likeMessage: isAuthenticated,
    },
})

module.exports = permissions