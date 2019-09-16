import mongoose from 'mongoose';

export default async (req, res, next) => {
  try {
    const isConnected = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    if (isConnected) console.log('connecting to mongodb...');
  } catch (error) {
    process.exit(1);
    console.log(error.message);
  }
};
