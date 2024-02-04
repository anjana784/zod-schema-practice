import { AdSchema, VehicleType, PropertyType, AdType } from "./schema/Ad";

const car: VehicleType = {
  mainCategory: "vehicle",
  subCategory: "car",
  title: "A car in good condition",
  description: "A breif description about the car",
  location: {
    district: "Ratnapura",
    city: "Embilipitya",
    address: "Kolonna",
  },
  contact: {
    name: "Anjana",
    phone: "0761234567",
    email: "hello@anjana784.dev",
  },
  negotiable: true,
  paymentPeriod: "perDay",
};

const house: PropertyType = {
  mainCategory: "property",
  subCategory: "house",
  title: "A house with 3 bedrooms",
  description: "A breif description about the house",
  location: {
    district: "Ratnapura",
    city: "Embilipitya",
    address: "Kolonna",
  },
  contact: {
    name: "Anjana",
    phone: "0761234567",
    email: "hello@anjana784.dev",
  },
  negotiable: true,
  paymentPeriod: "perYear",
};

const validatedCar = AdSchema.safeParse(car);
const validatedHouse = AdSchema.safeParse(house);

if (validatedCar.success) {
  console.log("Car is valid", validatedCar.data);
} else {
  console.log("Car is invalid", validatedCar.error.issues[0]);
}

if (validatedHouse.success) {
  console.log("House is valid", validatedHouse.data);
} else {
  console.log("House is invalid", validatedHouse.error.issues[0]);
}
