export type Condition = string
export type ExamType = string
export type Subject = string

export interface Owner {
  name: string
  year: string
  percentile?: string
  exam?: string
}

export interface OwnerDetails {
  name: string
  city: string
  karmaXP: number
}

export interface Book {
  id: number
  title: string
  author: string
  mrp: number
  price: number
  condition: Condition
  class: string
  subject: Subject
  examType: ExamType
  category: string
  image: string
  images: string[]
  description: string
  stock: boolean
  seller: string
  sellerYear: string
  rating: number
  trending: boolean
  featured: boolean
  recentlyAdded: boolean
  highlyAnnotated: boolean
  lineage: Owner[]
  seniorNotes?: string
  studyTips?: string[]
  karmaXP?: number
  pages: number
  edition: string
  language: string
  owner: OwnerDetails | null
}

const priceByCondition: Record<string, number> = { Mint: 0.55, Good: 0.45, Annotated: 0.35, Worn: 0.25 }
function calcPrice(mrp: number, condition: string): number { return Math.round(mrp * (priceByCondition[condition] || 0.4)) }

const sellers = [
  { name: "Rahul Sharma", year: "JEE Advanced 2024 · AIR 2340", xp: 280, city: "Delhi" },
  { name: "Priya Patel", year: "JEE Advanced 2024 · AIR 1250", xp: 340, city: "Mumbai" },
  { name: "Arjun Reddy", year: "NEET 2024 · AIR 850", xp: 310, city: "Hyderabad" },
  { name: "Sneha Kapoor", year: "NEET 2024 · AIR 1200", xp: 260, city: "Pune" },
  { name: "IITian Bookstore", year: "IIT Bombay 2023 batch", xp: 420, city: "Mumbai" },
  { name: "Vikram Singh", year: "JEE Main 2024 · 99.2 %ile", xp: 390, city: "Jaipur" },
  { name: "Aishwarya Nair", year: "NEET 2024 · AIR 950", xp: 350, city: "Chennai" },
  { name: "Ankit Verma", year: "Class 12 CBSE 2024 · 96 %", xp: 200, city: "Lucknow" },
  { name: "Neha Gupta", year: "Class 12 CBSE 2024 · 94 %", xp: 180, city: "Kolkata" },
  { name: "Dr. Mehta's Coaching", year: "NEET mentoring since 2019", xp: 500, city: "Delhi" },
  { name: "Mukesh Agarwal", year: "NEET 2024 · AIR 2000", xp: 220, city: "Bhopal" },
]

const lineage_1: Owner[] = [
  { name: "Rahul Sharma", year: "2023-24", percentile: "98.2", exam: "JEE Advanced" },
  { name: "Ananya Gupta", year: "2022-23", percentile: "96.5", exam: "JEE Main" },
  { name: "Vivek Singh", year: "2021-22", percentile: "94.1", exam: "JEE Main" },
]
const lineage_2: Owner[] = [{ name: "Priya Patel", year: "2023-24", percentile: "99.1", exam: "JEE Advanced" }]
const lineage_3: Owner[] = [{ name: "Arjun Reddy", year: "2023-24", percentile: "97.8", exam: "NEET" }, { name: "Kavya Sharma", year: "2022-23", percentile: "95.2", exam: "NEET" }]
const lineage_ncert: Owner[] = [{ name: "Vikram Singh", year: "2023-24", percentile: "99.2", exam: "JEE Main" }]
const lineage_empty: Owner[] = []

export const books = [
  { id: 1, title: "MS Chauhan Organic Chemistry for JEE", author: "MS Chauhan", mrp: 850, condition: "Mint", class: "12", subject: "Chemistry", examType: "JEE", category: "Chemistry", image: "https://m.media-amazon.com/images/I/51m7e6pBTsL._SX342_SY445_.jpg", description: "One of the most comprehensive organic chemistry books for JEE Advanced. Contains thousands of problems with detailed solutions.", stock: true, seller: sellers[0].name, sellerYear: sellers[0].year, rating: 4.8, trending: true, recentlyAdded: true, highlyAnnotated: true, lineage: lineage_1, seniorNotes: "Must-have for JEE Organic Chemistry. Solve every problem and you'll crack organic easily.", studyTips: ["Complete NCERT first", "Solve all in-chapter examples", "Mark reactions you forget", "Revise named reactions weekly"], karmaXP: sellers[0].xp },
  { id: 2, title: "HC Verma Concepts of Physics Volume 1", author: "HC Verma", mrp: 695, condition: "Good", class: "11", subject: "Physics", examType: "JEE", category: "Physics", image: "https://m.media-amazon.com/images/I/51r1H3jSGrL._SX342_SY445_.jpg", description: "The foundation of physics for JEE and NEET. Covers all Class 11 concepts with beautiful explanations.", stock: true, seller: sellers[1].name, sellerYear: sellers[1].year, rating: 4.9, trending: true, recentlyAdded: true, highlyAnnotated: false, lineage: lineage_2, seniorNotes: "Read theory from HC Verma, then solve Irodov. This builds physics intuition.", studyTips: ["Read theory thoroughly", "Solve without looking at solutions", "Make formula sheets per chapter"], karmaXP: sellers[1].xp },
  { id: 3, title: "HC Verma Concepts of Physics Volume 2", author: "HC Verma", mrp: 725, condition: "Good", class: "12", subject: "Physics", examType: "JEE", category: "Physics", image: "https://m.media-amazon.com/images/I/51r1H3jSGrL._SX342_SY445_.jpg", description: "Volume 2 covers Class 12 physics concepts. Essential for board exams and competitive exams.", stock: true, seller: sellers[1].name, sellerYear: sellers[1].year, rating: 4.9, trending: true, recentlyAdded: false, highlyAnnotated: false, lineage: lineage_2, seniorNotes: "Chapters on Electromagnetism and Optics are crucial for JEE Advanced.", studyTips: ["Master electromagnetic theory", "Practice optics derivations", "Solve all objective questions"], karmaXP: sellers[1].xp },
  { id: 4, title: "SL Arora Class 11 Physics", author: "SL Arora", mrp: 550, condition: "Worn", class: "11", subject: "Physics", examType: "CBSE", category: "Physics", image: "https://m.media-amazon.com/images/I/51r1H3jSGrL._SX342_SY445_.jpg", description: "Complete Class 11 physics textbook. Great for CBSE board exam preparation.", stock: true, seller: sellers[7].name, sellerYear: sellers[7].year, rating: 4.5, trending: false, recentlyAdded: true, highlyAnnotated: true, lineage: lineage_empty, seniorNotes: "SL Arora is perfect for CBSE boards. NCERT + SL Arora = 95+ in boards.", karmaXP: sellers[7].xp },
  { id: 5, title: "SL Arora Class 12 Physics", author: "SL Arora", mrp: 580, condition: "Good", class: "12", subject: "Physics", examType: "CBSE", category: "Physics", image: "https://m.media-amazon.com/images/I/51r1H3jSGrL._SX342_SY445_.jpg", description: "Class 12 physics reference book with detailed derivations and numerical problems.", stock: true, seller: sellers[8].name, sellerYear: sellers[8].year, rating: 4.4, trending: false, recentlyAdded: false, highlyAnnotated: false, lineage: lineage_empty, seniorNotes: "Focus on derivations from SL Arora. CBSE asks direct derivation questions worth 5 marks.", karmaXP: sellers[8].xp },
  { id: 6, title: "Arihant JEE PYQ Book (2024 Edition)", author: "Arihant Experts", mrp: 650, condition: "Mint", class: "12", subject: "All Subjects", examType: "JEE", category: "PYQs", image: "https://m.media-amazon.com/images/I/51m7e6pBTsL._SX342_SY445_.jpg", description: "Previous Year Questions for JEE Main & Advanced with detailed solutions.", stock: true, seller: sellers[0].name, sellerYear: sellers[0].year, rating: 4.7, trending: true, recentlyAdded: true, highlyAnnotated: false, lineage: lineage_1, seniorNotes: "PYQs are gold for JEE. My score improved by 40 marks just from PYQs.", studyTips: ["Attempt as mock tests", "Analyze mistakes carefully", "Track topic-wise performance"], karmaXP: sellers[0].xp },
  { id: 7, title: "Arihant NEET PYQ Book (2024 Edition)", author: "Arihant Experts", mrp: 650, condition: "Mint", class: "12", subject: "All Subjects", examType: "NEET", category: "PYQs", image: "https://m.media-amazon.com/images/I/51m7e6pBTsL._SX342_SY445_.jpg", description: "Previous Year Questions for NEET with detailed solutions.", stock: true, seller: sellers[2].name, sellerYear: sellers[2].year, rating: 4.7, trending: true, recentlyAdded: true, highlyAnnotated: false, lineage: lineage_3, seniorNotes: "Solve NEET PYQs from last 10 years. Many questions repeat with changed numbers.", studyTips: ["Solve chapter-wise first", "Then attempt full mocks", "Focus on repeated concepts"], karmaXP: sellers[2].xp },
  { id: 8, title: "NCERT Physics Class 11", author: "NCERT", mrp: 230, condition: "Good", class: "11", subject: "Physics", examType: "CBSE", category: "NCERT", image: "https://m.media-amazon.com/images/I/51r1H3jSGrL._SX342_SY445_.jpg", description: "NCERT Physics textbook for Class 11. The holy grail for board exams and competitive exams.", stock: true, seller: sellers[5].name, sellerYear: sellers[5].year, rating: 4.6, trending: false, recentlyAdded: false, highlyAnnotated: true, lineage: lineage_ncert, seniorNotes: "NCERT is non-negotiable. Read every line. Many JEE/NEET questions come directly from NCERT.", karmaXP: sellers[5].xp },
  { id: 9, title: "NCERT Physics Class 12", author: "NCERT", mrp: 240, condition: "Good", class: "12", subject: "Physics", examType: "CBSE", category: "NCERT", image: "https://m.media-amazon.com/images/I/51r1H3jSGrL._SX342_SY445_.jpg", description: "NCERT Physics textbook for Class 12. Essential for board exams.", stock: true, seller: sellers[5].name, sellerYear: sellers[5].year, rating: 4.6, trending: false, recentlyAdded: false, highlyAnnotated: false, lineage: lineage_ncert, seniorNotes: "Don't skip the 'Additional Exercises' at end of each chapter.", karmaXP: sellers[5].xp },
  { id: 10, title: "NCERT Chemistry Class 11", author: "NCERT", mrp: 220, condition: "Good", class: "11", subject: "Chemistry", examType: "CBSE", category: "NCERT", image: "https://m.media-amazon.com/images/I/51m7e6pBTsL._SX342_SY445_.jpg", description: "NCERT Chemistry textbook for Class 11. Foundation for all chemistry concepts.", stock: true, seller: sellers[3].name, sellerYear: sellers[3].year, rating: 4.5, trending: false, recentlyAdded: true, highlyAnnotated: true, lineage: lineage_empty, seniorNotes: "NCERT Chemistry is extra important for NEET. Direct questions come from here.", karmaXP: sellers[3].xp },
  { id: 11, title: "NCERT Chemistry Class 12", author: "NCERT", mrp: 230, condition: "Annotated", class: "12", subject: "Chemistry", examType: "CBSE", category: "NCERT", image: "https://m.media-amazon.com/images/I/51m7e6pBTsL._SX342_SY445_.jpg", description: "NCERT Chemistry textbook for Class 12. Contains helpful handwritten margin notes.", stock: true, seller: sellers[3].name, sellerYear: sellers[3].year, rating: 3.5, trending: false, recentlyAdded: false, highlyAnnotated: true, lineage: lineage_empty, seniorNotes: "Organic Chemistry chapters in Class 12 NCERT are super important for both JEE and NEET.", karmaXP: sellers[3].xp },
  { id: 12, title: "NCERT Biology Class 11", author: "NCERT", mrp: 250, condition: "Mint", class: "11", subject: "Biology", examType: "NEET", category: "NCERT", image: "https://m.media-amazon.com/images/I/51r1H3jSGrL._SX342_SY445_.jpg", description: "NCERT Biology textbook for Class 11. Complete and untouched.", stock: true, seller: sellers[6].name, sellerYear: sellers[6].year, rating: 4.8, trending: true, recentlyAdded: true, highlyAnnotated: false, lineage: lineage_empty, seniorNotes: "For NEET, NCERT Biology is everything. Read each chapter 3-4 times.", karmaXP: sellers[6].xp },
  { id: 13, title: "NCERT Biology Class 12", author: "NCERT", mrp: 260, condition: "Mint", class: "12", subject: "Biology", examType: "NEET", category: "NCERT", image: "https://m.media-amazon.com/images/I/51r1H3jSGrL._SX342_SY445_.jpg", description: "NCERT Biology textbook for Class 12. Almost new condition with clean pages.", stock: true, seller: sellers[6].name, sellerYear: sellers[6].year, rating: 4.8, trending: true, recentlyAdded: false, highlyAnnotated: false, lineage: lineage_empty, seniorNotes: "Genetics & Biotechnology are high-weightage topics in NEET. Master them.", karmaXP: sellers[6].xp },
  { id: 14, title: "Cengage Physics Series - Mechanics", author: "Cengage Learning", mrp: 1200, condition: "Good", class: "11", subject: "Physics", examType: "JEE", category: "Cengage", image: "https://m.media-amazon.com/images/I/51r1H3jSGrL._SX342_SY445_.jpg", description: "Advanced physics book for JEE preparation covering mechanics in depth.", stock: true, seller: sellers[4].name, sellerYear: sellers[4].year, rating: 4.7, trending: false, recentlyAdded: false, highlyAnnotated: false, lineage: lineage_empty, seniorNotes: "Only start Cengage after completing NCERT and HC Verma.", karmaXP: sellers[4].xp },
  { id: 15, title: "Cengage Chemistry Series - Organic", author: "Cengage Learning", mrp: 1250, condition: "Annotated", class: "12", subject: "Chemistry", examType: "JEE", category: "Cengage", image: "https://m.media-amazon.com/images/I/51m7e6pBTsL._SX342_SY445_.jpg", description: "Advanced organic chemistry for JEE with thousands of practice problems and margin notes.", stock: true, seller: sellers[4].name, sellerYear: sellers[4].year, rating: 4.6, trending: false, recentlyAdded: false, highlyAnnotated: true, lineage: lineage_empty, seniorNotes: "The reaction mechanisms in Cengage Organic are brilliantly explained.", karmaXP: sellers[4].xp },
  { id: 16, title: "Cengage Mathematics Series - Algebra", author: "Cengage Learning", mrp: 1150, condition: "Good", class: "11", subject: "Mathematics", examType: "JEE", category: "Cengage", image: "https://m.media-amazon.com/images/I/51m7e6pBTsL._SX342_SY445_.jpg", description: "Comprehensive algebra book for JEE mathematics preparation.", stock: false, seller: sellers[4].name, sellerYear: sellers[4].year, rating: 4.7, trending: false, recentlyAdded: false, highlyAnnotated: false, lineage: lineage_empty, seniorNotes: "Algebra in Cengage is top-notch. Practice every single example.", karmaXP: sellers[4].xp },
  { id: 17, title: "Errorless Physics (Universal Book)", author: "Universal Book", mrp: 780, condition: "Good", class: "12", subject: "Physics", examType: "NEET", category: "Errorless", image: "https://m.media-amazon.com/images/I/51r1H3jSGrL._SX342_SY445_.jpg", description: "Errorless physics book for NEET with PYQs and practice sets.", stock: true, seller: sellers[9].name, sellerYear: sellers[9].year, rating: 4.5, trending: false, recentlyAdded: true, highlyAnnotated: false, lineage: lineage_empty, seniorNotes: "Errorless series is great for NEET physics. Solutions are very detailed.", karmaXP: sellers[9].xp },
  { id: 18, title: "Errorless Chemistry (Universal Book)", author: "Universal Book", mrp: 800, condition: "Good", class: "12", subject: "Chemistry", examType: "NEET", category: "Errorless", image: "https://m.media-amazon.com/images/I/51m7e6pBTsL._SX342_SY445_.jpg", description: "Complete errorless chemistry for NEET with chapter-wise questions.", stock: true, seller: sellers[9].name, sellerYear: sellers[9].year, rating: 4.4, trending: false, recentlyAdded: false, highlyAnnotated: false, lineage: lineage_empty, seniorNotes: "For NEET Chemistry, NCERT + Errorless is a deadly combination.", karmaXP: sellers[9].xp },
  { id: 19, title: "Errorless Biology (Universal Book)", author: "Universal Book", mrp: 750, condition: "Good", class: "12", subject: "Biology", examType: "NEET", category: "Errorless", image: "https://m.media-amazon.com/images/I/51r1H3jSGrL._SX342_SY445_.jpg", description: "Errorless biology for NEET with NCERT-based questions and diagrams.", stock: true, seller: sellers[9].name, sellerYear: sellers[9].year, rating: 4.6, trending: false, recentlyAdded: true, highlyAnnotated: false, lineage: lineage_empty, seniorNotes: "Use Errorless for practice only after studying NCERT thoroughly.", karmaXP: sellers[9].xp },
  { id: 20, title: "DC Pandey Physics for NEET - Set", author: "DC Pandey", mrp: 950, condition: "Good", class: "12", subject: "Physics", examType: "NEET", category: "Physics", image: "https://m.media-amazon.com/images/I/51r1H3jSGrL._SX342_SY445_.jpg", description: "Complete physics set for NEET preparation with concept explanations and problems.", stock: true, seller: sellers[10].name, sellerYear: sellers[10].year, rating: 4.5, trending: false, recentlyAdded: false, highlyAnnotated: false, lineage: lineage_empty, seniorNotes: "DC Pandey is perfect for building NEET physics concepts from scratch.", karmaXP: sellers[10].xp },
].map(b => {
  const seller = sellers.find(s => s.name === b.seller)
  return {
    ...b, price: calcPrice(b.mrp, b.condition), featured: b.trending || b.rating >= 4.8,
    images: [b.image], pages: 800, edition: "2024", language: "English",
    owner: seller ? { name: seller.name, city: seller.city, karmaXP: seller.xp } : { name: b.seller, city: "India", karmaXP: b.karmaXP || 0 },
  }
})

export const categories = [
  { name: "Physics", gradient: "from-blue-500 to-cyan-500", icon: "⚛️", count: books.filter(b => b.subject === "Physics").length },
  { name: "Chemistry", gradient: "from-purple-500 to-pink-500", icon: "🧪", count: books.filter(b => b.subject === "Chemistry").length },
  { name: "Mathematics", gradient: "from-red-500 to-orange-500", icon: "📐", count: books.filter(b => b.subject === "Mathematics").length },
  { name: "Biology", gradient: "from-green-500 to-emerald-500", icon: "🧬", count: books.filter(b => b.subject === "Biology").length },
  { name: "PYQs", gradient: "from-yellow-500 to-amber-500", icon: "📝", count: books.filter(b => b.category === "PYQs").length },
  { name: "NCERT", gradient: "from-orange-500 to-red-500", icon: "📖", count: books.filter(b => b.category === "NCERT").length },
]

export const testimonials = [
  { name: "Arjun Mehta", role: "JEE Advanced 2024", content: "I sold my books and got fair prices. The buyer was a junior who really needed them. Win-win!", rating: 5 },
  { name: "Sneha Sharma", role: "NEET 2024", content: "Bought HC Verma and Arihant PYQ at 40% below MRP. Books were in great condition!", rating: 5 },
  { name: "Ravi Patel", role: "Class 12 CBSE 2024", content: "Senior guidance helped me plan my preparation. Found great tips for board exams.", rating: 5 },
]

export const seniorStories = [
  { name: "Ishita Verma", college: "IIT Bombay", exam: "JEE Advanced", year: 2024, story: "I started JEE prep in Class 11 with just NCERT books. I bought HC Verma and Cengage from a senior on Swapo Scholar at half the price. That's when I realized expensive coaching isn't everything — smart book selection matters more.", tips: ["Focus on NCERT first", "Solve PYQs religiously", "Revise every weekend", "Master a few books, not many"], avatar: "I", rating: 4.8, karmaXP: 450 },
  { name: "Karan Joshi", college: "AIIMS Delhi", exam: "NEET", year: 2024, story: "After scoring 96% in Class 10, I thought NEET would be easy. I failed my first mock. A senior guided me and sold me his NCERT Biology with handwritten notes. Those notes were my game-changer.", tips: ["NCERT Biology is non-negotiable", "Practice 100+ questions daily", "Focus on NCERT Chemistry line by line", "Take weekly mock tests"], avatar: "K", rating: 4.7, karmaXP: 720 },
  { name: "Priya Sharma", college: "Delhi University", exam: "CBSE", year: 2024, story: "I didn't go to any coaching. I studied from second-hand books bought on Swapo Scholar. Seniors' margin notes were incredibly helpful — like they were personally guiding me.", tips: ["Master NCERT textbooks", "Write answers in points", "Practice previous year papers", "Time management is key"], avatar: "P", rating: 4.9, karmaXP: 380 },
]

export const liveFeed = [
  { name: "Rahul", action: "passed down", book: "MS Chauhan Organic Chemistry" },
  { name: "Priya", action: "sold", book: "HC Verma Physics Vol 1" },
  { name: "Arjun", action: "shared", book: "NEET PYQ Book" },
  { name: "Sneha", action: "passed down", book: "NCERT Chemistry Class 12" },
  { name: "Vikram", action: "donated", book: "NCERT Physics Set" },
  { name: "Aishwarya", action: "sold", book: "NCERT Biology Class 11" },
]

export const faqs = [
  { q: "How do I sell my old books?", a: "Go to the Sell page, fill in the book details, set your price, and submit. Buyers will find and contact you." },
  { q: "How is the price determined?", a: "Sellers set their own prices. We suggest fair pricing — typically 30-55% below MRP so both sides benefit." },
  { q: "What is Karma XP?", a: "Karma XP is earned when you sell books at great discounts. Higher XP unlocks Top Mentor badges and featured listings." },
  { q: "What is Study Lineage?", a: "Study Lineage tracks a book's previous owners and their exam scores. A rich lineage adds 'Artifact Value' to the book." },
  { q: "Is payment handled on the platform?", a: "We connect buyers and sellers. Payment is arranged directly between them. Always meet safely and verify the book condition." },
]
