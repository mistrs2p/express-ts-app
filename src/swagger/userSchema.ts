export const userSchema = {
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: {
              type: 'string',
              description: "User's name",
            },
            email: {
              type: 'string',
              description: "User's email",
            },
            password: {
              type: 'string',
              description: "User's password",
            },
          },
          example: {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'strongpassword123',
          },
        },
      },
    },
  };