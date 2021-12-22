import cors from 'cors';

const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? process.env.origin : '*',
    methods: '*',
    optionsSuccessStatus: 200,
};

export default cors(corsOptions);