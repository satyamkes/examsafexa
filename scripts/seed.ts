import fs from "node:fs";
import path from "node:path";
import mongoose from "mongoose";
import Exam from "../models/Exam";
import ExamCenter from "../models/ExamCenter";

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [key, ...valueParts] = trimmed.split("=");
    if (!process.env[key]) {
      process.env[key] = valueParts.join("=").replace(/^["']|["']$/g, "");
    }
  }
}

const exams = [
  { name: "NEET UG", code: "NEET-UG", category: "medical", examDate: new Date("2027-05-02") },
  { name: "JEE Main", code: "JEE-MAIN", category: "engineering", examDate: new Date("2027-01-24") },
  { name: "JEE Advanced", code: "JEE-ADV", category: "engineering", examDate: new Date("2027-05-23") },
  { name: "UPSC CSE Prelims", code: "UPSC-CSE", category: "civil-services", examDate: new Date("2027-05-30") },
  { name: "SSC CGL", code: "SSC-CGL", category: "ssc", examDate: new Date("2027-09-12") },
  { name: "UPPSC PCS", code: "UPPSC-PCS", category: "state-psc", examDate: new Date("2027-10-10") },
  { name: "BPSC CCE", code: "BPSC-CCE", category: "state-psc", examDate: new Date("2027-11-07") },
] as const;

const centers = [
  {
    name: "Delhi Public School Rohini",
    address: "Sector 24, Rohini, New Delhi",
    city: "New Delhi",
    state: "Delhi",
    lat: 28.729,
    lng: 77.096,
    examCodes: ["NEET-UG", "JEE-MAIN", "SSC-CGL", "UPSC-CSE"],
  },
  {
    name: "Kendriya Vidyalaya IIT Powai",
    address: "IIT Area, Powai, Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    lat: 19.1334,
    lng: 72.9133,
    examCodes: ["JEE-MAIN", "JEE-ADV", "NEET-UG"],
  },
  {
    name: "St. Xavier's Collegiate School",
    address: "30 Mother Teresa Sarani, Kolkata",
    city: "Kolkata",
    state: "West Bengal",
    lat: 22.5489,
    lng: 88.3537,
    examCodes: ["NEET-UG", "JEE-MAIN", "SSC-CGL"],
  },
  {
    name: "National College Jayanagar",
    address: "36th B Cross Road, Jayanagar, Bengaluru",
    city: "Bengaluru",
    state: "Karnataka",
    lat: 12.925,
    lng: 77.583,
    examCodes: ["JEE-MAIN", "JEE-ADV", "UPSC-CSE"],
  },
  {
    name: "Patna Science College",
    address: "Ashok Rajpath, Patna University Campus",
    city: "Patna",
    state: "Bihar",
    lat: 25.6205,
    lng: 85.1723,
    examCodes: ["BPSC-CCE", "SSC-CGL", "NEET-UG"],
  },
  {
    name: "Lucknow Public College",
    address: "Gomti Nagar Extension, Lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    lat: 26.8467,
    lng: 80.9462,
    examCodes: ["UPPSC-PCS", "UPSC-CSE", "SSC-CGL"],
  },
];

async function main() {
  loadEnvLocal();

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is required. Add it to .env.local before running npm run seed.");
  }

  await mongoose.connect(process.env.MONGODB_URI);

  const examDocs = await Promise.all(
    exams.map((exam) =>
      Exam.findOneAndUpdate({ code: exam.code }, exam, { upsert: true, new: true, setDefaultsOnInsert: true })
    )
  );

  const examIdByCode = new Map(examDocs.map((exam) => [exam.code, exam._id]));

  await Promise.all(
    centers.map((center) =>
      ExamCenter.findOneAndUpdate(
        { name: center.name },
        {
          name: center.name,
          address: center.address,
          city: center.city,
          state: center.state,
          lat: center.lat,
          lng: center.lng,
          examIds: center.examCodes.map((code) => examIdByCode.get(code)).filter(Boolean),
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      )
    )
  );

  console.log(`Seeded ${examDocs.length} exams and ${centers.length} centers.`);
  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
