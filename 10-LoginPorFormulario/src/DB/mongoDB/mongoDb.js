import mongoose from "mongoose";

export const connectMongo = async () => {
    const URL = "mongodb+srv://Ximena:5OmZ0uyg6sraSd4Q@coder.kcakzry.mongodb.net/?retryWrites=true&w=majority";
    await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("DB Connected");
}