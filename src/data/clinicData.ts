// Pearl Dental Clinic - Central Data Store
// Info sourced from Google Maps: https://maps.app.goo.gl/E3Np5wPkRNKqKNUe7

export const CLINIC_INFO = {
  name: 'Pearl Dental Clinic',
  tagline: 'Your Smile, Our Passion',
  description: 'Pearl Dental Clinic is a trusted dental care facility in Guwahati, Assam, providing compassionate and professional dental treatments under Dr. Nilakshi Talukdar — with a gentle touch and patient-first approach.',
  address: 'Hengrabari Road, Housing Tiniali (Near Prajapati Bhawan), Dispur, Guwahati, Assam 781036',
  fullAddress: 'Pearl Dental Clinic, Hengrabari Road, Housing Tiniali, Near Prajapati Bhawan, Dispur, Guwahati, Assam 781036',
  phone: '+91 97291 48975',
  whatsapp: '919729148975',
  email: 'info@pearldentalghy.in',
  website: 'http://pearldentalghy.in/',
  mapUrl: 'https://maps.app.goo.gl/E3Np5wPkRNKqKNUe7',
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.2898862145637!2d91.78528289999999!3d26.1507689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a59b5269ae37b%3A0x6823f5e02a1e2a39!2sPearl%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1728370000000!5m2!1sen!2sin',
  rating: 4.9,
  reviewCount: 151,
  founded: '2015',
  patients: '10,000+',
  experience: '7+',
  hours: {
    weekdays: '8:00 AM – 8:00 PM',
    saturday: '8:00 AM – 8:00 PM',
    sunday: '8:00 AM – 2:30 PM',
  },
  social: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
  },
};

export const SERVICES = [
  {
    id: 'teeth-whitening',
    icon: '✨',
    title: 'Teeth Whitening',
    shortDesc: 'Brighten your smile with professional-grade whitening treatments.',
    description: 'Our advanced teeth whitening treatments use professional-grade bleaching agents that are safe, effective, and supervised by our dental professionals. Get up to 8 shades brighter in a single session.',
    price: '₹2,500 – ₹8,000',
    duration: '60-90 mins',
    color: '#0ea5e9',
  },
  {
    id: 'dental-implants',
    icon: '🦷',
    title: 'Dental Implants',
    shortDesc: 'Permanent tooth replacement that looks and feels natural.',
    description: 'Dental implants are the gold standard for tooth replacement. Our titanium implants fuse naturally with your jawbone, providing a permanent, stable foundation for crowns, bridges, or dentures.',
    price: '₹18,000 – ₹35,000',
    duration: '2-4 visits',
    color: '#06b6d4',
  },
  {
    id: 'invisalign',
    icon: '😁',
    title: 'Invisalign / Braces',
    shortDesc: 'Straighten teeth discreetly with clear aligners or traditional braces.',
    description: 'We offer both traditional metal braces and modern clear aligner therapy (Invisalign). Our orthodontic treatments are customized to your smile goals, lifestyle, and budget.',
    price: '₹25,000 – ₹80,000',
    duration: '6-24 months',
    color: '#0284c7',
  },
  {
    id: 'root-canal',
    icon: '💊',
    title: 'Root Canal Treatment',
    shortDesc: 'Pain-free root canal therapy to save your natural tooth.',
    description: 'Modern root canal treatment is virtually painless. We use advanced rotary endodontics and digital X-rays to precisely treat infected pulp while preserving your natural tooth structure.',
    price: '₹3,500 – ₹9,000',
    duration: '1-2 visits',
    color: '#7c3aed',
  },
  {
    id: 'tooth-extraction',
    icon: '🩺',
    title: 'Tooth Extraction',
    shortDesc: 'Gentle, painless extractions performed with expert precision.',
    description: 'Our tooth extraction procedures are performed with utmost care and advanced techniques to ensure a completely painless experience. Patients often say the tooth was gone before they even knew it.',
    price: '₹500 – ₹3,000',
    duration: '20-40 mins',
    color: '#ef4444',
  },
  {
    id: 'cosmetic-dentistry',
    icon: '💎',
    title: 'Cosmetic Dentistry',
    shortDesc: 'Smile makeovers with veneers, bonding & complete redesign.',
    description: 'Transform your smile with our comprehensive cosmetic services including porcelain veneers, composite bonding, smile makeovers, gum contouring, and complete smile design.',
    price: '₹5,000 – ₹1,20,000',
    duration: 'Varies',
    color: '#f59e0b',
  },
  {
    id: 'general-dentistry',
    icon: '🏥',
    title: 'General Dentistry',
    shortDesc: 'Complete oral health care for the whole family.',
    description: 'From routine cleanings and check-ups to fillings, extractions, and preventive care, our general dentistry services keep your entire family\'s oral health in top shape.',
    price: '₹500 – ₹5,000',
    duration: '30-60 mins',
    color: '#10b981',
  },
  {
    id: 'dental-crowns',
    icon: '👑',
    title: 'Crowns & Bridges',
    shortDesc: 'Restore damaged teeth with natural-looking crowns and bridges.',
    description: 'Our ceramic, porcelain, and zirconia crowns and bridges restore damaged or missing teeth to their natural appearance and function. Designed with precision using digital impressions.',
    price: '₹6,000 – ₹25,000',
    duration: '2-3 visits',
    color: '#f97316',
  },
];

export const TEAM = [
  {
    id: 1,
    name: 'Dr. Nilakshi Talukdar',
    role: 'Chief Dental Surgeon & Founder',
    qualification: 'BDS',
    experience: '7+ Years',
    speciality: 'Cosmetic Dentistry, Implants & General Dentistry',
<<<<<<< HEAD
    image: '/src/assets/doctor.jpeg',
=======
    image: '/src/assets/pearl.jpeg',
>>>>>>> bec2be8dd2c55115ccd5f650ec4a0f73b4a1118a
    bio: 'Dr. Nilakshi Talukdar is the founder and chief dental surgeon of Pearl Dental Clinic, Guwahati. With 7+ years of dedicated clinical experience, she specializes in smile makeovers, dental implants, and full-mouth rehabilitation — bringing world-class dental care to Assam with a gentle, patient-first approach.',
  },
];

// Real Google Reviews from Google Maps (https://maps.app.goo.gl/E3Np5wPkRNKqKNUe7)
// Sorted latest first — add new reviews at the TOP of this array
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'TUTUMONI Ramchiary',
    location: 'Guwahati, Assam',
    rating: 5,
    text: 'Had an excellent experience with Dr. Nilakshi. She is highly professional, gentle, and explains every procedure clearly, which made me feel comfortable and confident throughout my treatment. My tooth extraction was smooth and much less painful than I expected. The clinic is clean, well-equipped, and the staff is very cooperative and friendly. I am very happy with the service and would highly recommend Pearl Dental Clinic to anyone looking for quality dental care in Guwahati.',
    treatment: 'Tooth Extraction',
    date: '3 months ago',
    source: 'Google',
    isGoogle: true,
  },
  {
    id: 2,
    name: 'Amisha Taye',
    location: 'Guwahati, Assam',
    rating: 5,
    text: 'Had a very good experience overall. My friend underwent a tooth extraction which was painless and the tooth was extracted even before he knew. He also had a broken tooth which was filled like a real one and now his smile got brighter. The doctor and staff were very cooperative and friendly. The clinic was hygienic and clean. I will definitely visit again if I need dental treatment.',
    treatment: 'Tooth Extraction & Filling',
    date: '3 months ago',
    source: 'Google',
    isGoogle: true,
  },
  {
    id: 3,
    name: 'Saurav Jyoti Sarma',
    location: 'Guwahati, Assam',
    rating: 5,
    text: 'Visited this dental clinic recently and honestly had a pretty smooth experience. The doctor was friendly and explained everything properly without rushing. Staff behaviour was good and the clinic was neat and clean too. Treatment was comfortable and pricing felt reasonable as well. Recommended!',
    treatment: 'General Dentistry',
    date: '4 months ago',
    source: 'Google',
    isGoogle: true,
  },
  {
    id: 4,
    name: 'Hirok Jyoti Bhuyan',
    location: 'Guwahati, Assam',
    rating: 5,
    text: 'I recently got dental treatment done for both my mother and father under Dr. Nilakshi Talukdar, and I am truly grateful for the care and attention she provided. She is highly professional, knowledgeable, and very compassionate towards her patients. She took the time to explain each procedure clearly and made my parents feel at ease throughout their treatments. The clinic is well-maintained and hygienic, and the staff is courteous and supportive. I highly recommend Dr. Nilakshi Talukdar and Pearl Dental Clinic to anyone seeking quality dental care.',
    treatment: 'Family Dental Care',
    date: '4 months ago',
    source: 'Google',
    isGoogle: true,
  },
  {
    id: 5,
    name: 'Biplab Kalita',
    location: 'Dispur, Assam',
    rating: 5,
    text: 'My entire family has been coming to Pearl Dental since I discovered this clinic. Dr. Nilakshi and her team are so good with patients of all ages. My kids actually enjoy their dental visits now! Best dental care in Guwahati — professional, affordable and truly caring.',
    treatment: 'Family Dental Care',
    date: '5 months ago',
    source: 'Google',
    isGoogle: true,
  },
  {
    id: 6,
    name: 'Meenakshi Sharma',
    location: 'Jorhat, Assam',
    rating: 5,
    text: 'Traveled all the way from Jorhat for dental implants and it was 100% worth it. Best investment in my confidence ever! The implants look and feel like real teeth. Dr. Nilakshi is truly an artist — professional and world-class service right here in Assam.',
    treatment: 'Dental Implants',
    date: '6 months ago',
    source: 'Google',
    isGoogle: true,
  },
];

export const FAQS = [
  {
    q: 'How do I book an appointment?',
    a: 'You can book an appointment through our website form, by calling us at +91 97291 48975, or by sending us a WhatsApp message. We also accept walk-ins during working hours.',
  },
  {
    q: 'Do you accept dental insurance?',
    a: 'Yes, we accept most major dental insurance plans. Please contact us with your insurance details and we\'ll verify your coverage before your appointment.',
  },
  {
    q: 'Is teeth whitening safe?',
    a: 'Absolutely. Our professional whitening treatments are safe, supervised by dental professionals, and use clinically approved agents. We assess your eligibility first to ensure the best results.',
  },
  {
    q: 'How long does a dental implant procedure take?',
    a: 'The implant process typically spans 3-6 months including healing time. The initial surgery takes 1-2 hours, and we schedule follow-up visits for the healing period and crown placement.',
  },
  {
    q: 'Do you offer EMI or payment plans?',
    a: 'Yes! We offer 0% EMI options for treatments above ₹10,000 through our partner financing services. Ask our front desk team for details.',
  },
  {
    q: 'What age is appropriate for orthodontic treatment?',
    a: 'We recommend an orthodontic evaluation at age 7. However, braces and aligners can be effective at any age. Adults are great candidates for Invisalign!',
  },
  {
    q: 'How often should I visit the dentist?',
    a: 'We recommend visiting every 6 months for a routine check-up and cleaning. Regular visits help catch problems early and keep your oral health optimal.',
  },
  {
    q: 'Is the clinic hygienic and safe?',
    a: 'Yes. We follow strict sterilization protocols, use disposable instruments where applicable, and maintain hospital-grade hygiene standards throughout our clinic.',
  },
];

export const STATS = [
  { value: '10,000+', label: 'Happy Patients' },
  { value: '7+', label: 'Years of Excellence' },
  { value: '4.9★', label: 'Google Rating' },
  { value: '151+', label: 'Google Reviews' },
];
