import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

// ── Purchased Customers Schema ─────────────────────────────────────────────
const purchasedSchema = new mongoose.Schema({
  date: { type: String, required: false, default: '' }, // optional
  customerName: { type: String, required: true },       // keep required
  item: {
    type: String,
    enum: ['Rug', 'Casa furniture', 'Gebbe', 'Sophie Garcia', 'Mkm furnitures', 'Sereno pots'],
    required: false,
    default: ''
  },
  itemPurchasedAmount: { type: Number, required: false, default: 0 },
  telephoneNumber: { type: String, required: false, default: '' },
  value: { type: Number, required: false, default: 0 },
  shortDescription: { type: String, default: '' },
}, { timestamps: true });

export const PurchasedCustomer = mongoose.models.PurchasedCustomer || mongoose.model('PurchasedCustomer', purchasedSchema);

// ── Visiting Clients Schema ────────────────────────────────────────────────
const visitingClientSchema = new mongoose.Schema({
  date: { type: String, required: false, default: '' },
  clientName: { type: String, required: true },         // keep required
  contactNumber: { type: String, required: false, default: '' },
  location: { type: String, required: false, default: '' },
  email: { type: String, default: '' },
  lastVisitDate: { type: String, required: false, default: '' },
  remarks: { type: String, default: '' },
  complimentStatus: { type: String, enum: ['Yes', 'No'], default: 'No' },
}, { timestamps: true });

export const VisitingClient = mongoose.models.VisitingClient || mongoose.model('VisitingClient', visitingClientSchema);

// ── Daily Visiting Customers Schema ────────────────────────────────────────
const dailyVisitingSchema = new mongoose.Schema({
  date: { type: String, required: false, default: '' },
  customerName: { type: String, required: true },       // keep required
  item: {
    type: String,
    enum: ['Rug', 'Casa furniture', 'Gebbe', 'Sophie Garcia', 'Mkm furnitures', 'Sereno pots'],
    required: false,
    default: ''
  },
  itemPurchasedAmount: { type: Number, required: false, default: 0 },
  telephoneNumber: { type: String, required: false, default: '' },
  value: { type: Number, required: false, default: 0 },
  shortDescription: { type: String, default: '' },
}, { timestamps: true });

export const DailyVisitingCustomer = mongoose.models.DailyVisitingCustomer || mongoose.model('DailyVisitingCustomer', dailyVisitingSchema);

export async function connectToDB() {
  if (mongoose.connection.readyState >= 1) return;

  const options = {
    serverSelectionTimeoutMS: 30000,   // 30 seconds
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    family: 4,                         // Prefer IPv4
  };

  try {
    await mongoose.connect(MONGODB_URI!, options);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    throw err;
  }
}

// ── Purchased Customers Helpers ────────────────────────────────────────────
export async function addPurchasedCustomer(data: any) {
  await connectToDB();
  await PurchasedCustomer.create({
    date: data.date,
    customerName: data.customerName,
    item: data.item,
    itemPurchasedAmount: Number(data.itemPurchasedAmount),
    telephoneNumber: data.telephoneNumber,
    value: Number(data.value),
    shortDescription: data.shortDescription || '',
  });
}

export async function getAllPurchasedCustomers() {
  await connectToDB();
  const docs = await PurchasedCustomer.find({}).lean();
  return docs.map((doc: any) => ({
    _id: doc._id.toString(),
    Date: doc.date,
    'Customer Name': doc.customerName,
    Item: doc.item,
    'Purchased Amount': doc.itemPurchasedAmount,
    'Telephone Number': doc.telephoneNumber,
    Value: doc.value,
    'Short Description': doc.shortDescription || '',
  }));
}

export async function getPurchasedCustomerById(id: string) {
  await connectToDB();
  const doc = await PurchasedCustomer.findById(id).lean();
  if (!doc) return null;
  return {
    _id: doc._id.toString(),
    date: doc.date,
    customerName: doc.customerName,
    item: doc.item,
    itemPurchasedAmount: doc.itemPurchasedAmount,
    telephoneNumber: doc.telephoneNumber,
    value: doc.value,
    shortDescription: doc.shortDescription || '',
  };
}

export async function updatePurchasedCustomer(id: string, data: any) {
  await connectToDB();
  await PurchasedCustomer.findByIdAndUpdate(id, {
    date: data.date,
    customerName: data.customerName,
    item: data.item,
    itemPurchasedAmount: Number(data.itemPurchasedAmount),
    telephoneNumber: data.telephoneNumber,
    value: Number(data.value),
    shortDescription: data.shortDescription || '',
  });
}

export async function deletePurchasedCustomer(id: string) {
  await connectToDB();
  await PurchasedCustomer.findByIdAndDelete(id);
}

// ── Visiting Clients Helpers ──────────────────────────────────────────────
export async function addVisitingClient(data: any) {
  await connectToDB();
  await VisitingClient.create({
    date: data.date,
    clientName: data.clientName,
    contactNumber: data.contactNumber,
    location: data.location,
    email: data.email || '',
    lastVisitDate: data.lastVisitDate,
    remarks: data.remarks || '',
    complimentStatus: data.complimentStatus,
  });
}

export async function getAllVisitingClients() {
  await connectToDB();
  const docs = await VisitingClient.find({}).lean();
  return docs.map((doc: any) => ({
    _id: doc._id.toString(),
    Date: doc.date,
    'Client Name': doc.clientName,
    'Contact Number': doc.contactNumber,
    Location: doc.location,
    Email: doc.email || '',
    'Last Visit Date': doc.lastVisitDate,
    Remarks: doc.remarks || '',
    'Compliment Status': doc.complimentStatus,
  }));
}

export async function getVisitingClientById(id: string) {
  await connectToDB();
  const doc = await VisitingClient.findById(id).lean();
  if (!doc) return null;
  return {
    _id: doc._id.toString(),
    date: doc.date,
    clientName: doc.clientName,
    contactNumber: doc.contactNumber,
    location: doc.location,
    email: doc.email || '',
    lastVisitDate: doc.lastVisitDate,
    remarks: doc.remarks || '',
    complimentStatus: doc.complimentStatus,
  };
}

export async function updateVisitingClient(id: string, data: any) {
  await connectToDB();
  await VisitingClient.findByIdAndUpdate(id, {
    date: data.date,
    clientName: data.clientName,
    contactNumber: data.contactNumber,
    location: data.location,
    email: data.email || '',
    lastVisitDate: data.lastVisitDate,
    remarks: data.remarks || '',
    complimentStatus: data.complimentStatus,
  });
}

export async function deleteVisitingClient(id: string) {
  await connectToDB();
  await VisitingClient.findByIdAndDelete(id);
}

// ── Daily Visiting Customers Helpers ──────────────────────────────────────
export async function addDailyVisitingCustomer(data: any) {
  await connectToDB();
  await DailyVisitingCustomer.create({
    date: data.date,
    customerName: data.customerName,
    item: data.item,
    itemPurchasedAmount: Number(data.itemPurchasedAmount),
    telephoneNumber: data.telephoneNumber,
    value: Number(data.value),
    shortDescription: data.shortDescription || '',
  });
}

export async function getAllDailyVisitingCustomers() {
  await connectToDB();
  const docs = await DailyVisitingCustomer.find({}).lean();
  return docs.map((doc: any) => ({
    _id: doc._id.toString(),
    Date: doc.date,
    'Customer Name': doc.customerName,
    Item: doc.item,
    'Purchased Amount': doc.itemPurchasedAmount,
    'Telephone Number': doc.telephoneNumber,
    Value: doc.value,
    'Short Description': doc.shortDescription || '',
  }));
}

export async function getDailyVisitingCustomerById(id: string) {
  await connectToDB();
  const doc = await DailyVisitingCustomer.findById(id).lean();
  if (!doc) return null;
  return {
    _id: doc._id.toString(),
    date: doc.date,
    customerName: doc.customerName,
    item: doc.item,
    itemPurchasedAmount: doc.itemPurchasedAmount,
    telephoneNumber: doc.telephoneNumber,
    value: doc.value,
    shortDescription: doc.shortDescription || '',
  };
}

export async function updateDailyVisitingCustomer(id: string, data: any) {
  await connectToDB();
  await DailyVisitingCustomer.findByIdAndUpdate(id, {
    date: data.date,
    customerName: data.customerName,
    item: data.item,
    itemPurchasedAmount: Number(data.itemPurchasedAmount),
    telephoneNumber: data.telephoneNumber,
    value: Number(data.value),
    shortDescription: data.shortDescription || '',
  });
}

export async function deleteDailyVisitingCustomer(id: string) {
  await connectToDB();
  await DailyVisitingCustomer.findByIdAndDelete(id);
}