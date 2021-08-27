module.exports = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER || 'wowocinema0@gmail.com',
        pass: process.env.EMAIL_PASSWORD || '!Abc123456',
    },
};
