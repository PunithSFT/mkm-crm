import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

// ── Purchased Customers (existing) ───────────────────────────────────────
const purchasedSchema = new mongoose.Schema({
  date: { type: String, required: true },
  customerName: { type: String, required: true },
  item: { type: String, enum: ['Rug', 'Casa furniture', 'Gebbe', 'Sophie Garcia', 'Mkm furnitures', 'Sereno pots'], required: true },
  itemPurchasedAmount: { type: Number, required: true },
  telephoneNumber: { type: String, required: true },
  value: { type: Number, required: true },
  shortDescription: { type: String, default: '' },
}, { timestamps: true });

const PurchasedCustomer = mongoose.models.PurchasedCustomer || mongoose.model('PurchasedCustomer', purchasedSchema);

// ── Visiting Clients (new) ────────────────────────────────────────────────
const visitingClientSchema = new mongoose.Schema({
  date: { type: String, required: true },
  clientName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, default: '' },
  lastVisitDate: { type: String, required: true },
  remarks: { type: String, default: '' },
  complimentStatus: { type: String, enum: ['Yes', 'No'], required: true },
}, { timestamps: true });

const VisitingClient = mongoose.models.VisitingClient || mongoose.model('VisitingClient', visitingClientSchema);

// ── Daily Visiting Customers (same as Purchased) ──────────────────────────
const dailyVisitingSchema = new mongoose.Schema({
  date: { type: String, required: true },
  customerName: { type: String, required: true },
  item: { type: String, enum: ['Rug', 'Casa furniture', 'Gebbe'], required: true },
  itemPurchasedAmount: { type: Number, required: true },
  telephoneNumber: { type: String, required: true },
  value: { type: Number, required: true },
  shortDescription: { type: String, default: '' },
}, { timestamps: true });

const DailyVisitingCustomer = mongoose.models.DailyVisitingCustomer || mongoose.model('DailyVisitingCustomer', dailyVisitingSchema);

// lib/db.ts (update your connectToDB function)
export async function connectToDB() {
  if (mongoose.connection.readyState >= 1) return;

  const options = {
    serverSelectionTimeoutMS: 30000,   // 30 seconds (default is 30s, but explicit)
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    family: 4,                         // force IPv4 (sometimes helps with DNS)
  };

  try {
    await mongoose.connect(process.env.MONGODB_URI!, options);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    throw err; // let caller handle
  }
}

// ── Purchased Customers helpers ──────────────────────────────────────────
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
    Date: doc.date,
    'Customer Name': doc.customerName,
    Item: doc.item,
    'Purchased Amount': doc.itemPurchasedAmount,
    'Telephone Number': doc.telephoneNumber,
    Value: doc.value,
    'Short Description': doc.shortDescription || '',
  }));
}

// ── Visiting Clients helpers ─────────────────────────────────────────────
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

// ── Daily Visiting Customers helpers (same shape as Purchased) ────────────
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
    Date: doc.date,
    'Customer Name': doc.customerName,
    Item: doc.item,
    'Purchased Amount': doc.itemPurchasedAmount,
    'Telephone Number': doc.telephoneNumber,
    Value: doc.value,
    'Short Description': doc.shortDescription || '',
  }));
}