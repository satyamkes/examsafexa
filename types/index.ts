// Shared types scaffolded per the Phase-1 brief (Section 6).
// Not wired to any backend yet — Phase 2 will connect these to
// the Mongoose models in /models and real API routes.

export interface User {
  name: string;
  email: string;
  phone: string;
  password?: string;
  gender?: "male" | "female" | "other" | "prefer_not_to_say";
  examSelected?: string; // Exam["_id"]
  examCenterSelected?: string; // ExamCenter["_id"]
  parentEmail?: string; // optional — powers the women's-safety notification flow
  liveLocationOptIn: boolean;
  createdAt: Date;
}

export interface Exam {
  name: string;
  code: string; // e.g. "NEET", "JEE-MAIN", "UPSC-CSE"
  examDate: Date;
  category: "medical" | "engineering" | "civil-services" | "state-psc" | "ssc" | "other";
}

export interface ExamCenter {
  name: string;
  address: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  examIds: string[];
}

export interface Community {
  examId: string;
  examCenterId: string;
  memberIds: string[];
  createdAt: Date;
}

// Phase 2+ — live location sharing (women's safety layer)
export interface LocationShare {
  userId: string;
  communityId?: string;
  isActive: boolean;
  lastLocation?: { lat: number; lng: number; updatedAt: Date };
  parentNotifiedAt?: Date;
}
