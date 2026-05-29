import mongoose from "mongoose";

export const connectdB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("CONNECT DATABASE");
  } catch (error) {
    console.log("error form database" + error);
  }
};
