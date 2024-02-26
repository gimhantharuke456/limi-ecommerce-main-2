import mongoose from "mongoose";

// Define the Farm schema
const farmSchema = new mongoose.Schema({
  farmName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  farmImages: [
    {
      type: String,
    },
  ],
  contactDetails: {
    type: String,
    required: true,
  },
  organicCertificates: [
    {
      type: String,
    },
  ],
});

const Farm = mongoose.model("Farm", farmSchema);

export default Farm;
