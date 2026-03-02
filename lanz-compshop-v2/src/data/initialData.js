// ─── HARD-CODED IN-MEMORY DATA ────────────────────────────────────────────────

export const INITIAL_USERS = [
  { id: 1, username: "firstadmin", email: "davesales27@gmail.com", password: "admin123", role: "admin", createdAt: "2025-05-16T01:18:04" },
  { id: 4, username: "TitoBadang", email: "ziobeppe82@gmail.com", password: "admin123", role: "admin", createdAt: "2025-05-16T06:36:38" },
  { id: 5, username: "employee1", email: "ewan@gmail.com", password: "emp123", role: "employee", createdAt: "2025-05-16T09:42:10" },
];

export const INITIAL_SERVICES = [
  { serviceIndex: 2, serviceId: 102, serviceType: "Typing Job" },
  { serviceIndex: 4, serviceId: 101, serviceType: "Printing" },
  { serviceIndex: 5, serviceId: 104, serviceType: "Passport Booking" },
  { serviceIndex: 6, serviceId: 103, serviceType: "Computer Rental" },
  { serviceIndex: 7, serviceId: 105, serviceType: "NBI Clearance" },
];

export const INITIAL_REQUESTS = [
  { requestIndex: 50, requestId: 50, serviceType: "Printing", customerName: "John Dela Cruz", timestamp: "2025-05-25T14:00:00", fileUpload: null },
  { requestIndex: 51, requestId: 51, serviceType: "Typing Job", customerName: "Maria Santos", timestamp: "2025-05-25T15:30:00", fileUpload: null },
];

export const INITIAL_ACTIVE = [
  { activeIndex: 21, requestId: 51 },
];

export const TIME_SLOTS = [
  { value: "12:00", label: "12:00 PM" }, { value: "12:30", label: "12:30 PM" },
  { value: "13:00", label: "1:00 PM" },  { value: "13:30", label: "1:30 PM" },
  { value: "14:00", label: "2:00 PM" },  { value: "14:30", label: "2:30 PM" },
  { value: "15:00", label: "3:00 PM" },  { value: "15:30", label: "3:30 PM" },
  { value: "16:00", label: "4:00 PM" },  { value: "16:30", label: "4:30 PM" },
  { value: "17:00", label: "5:00 PM" },  { value: "17:30", label: "5:30 PM" },
  { value: "18:00", label: "6:00 PM" },
];
