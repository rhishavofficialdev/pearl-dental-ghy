// Pearl Dental Clinic - Central Data Store

export const CLINIC_INFO = {
  name: 'Pearl Dental Clinic',
  tagline: 'Your Smile, Our Passion',
  description: 'Pearl Dental Clinic is a premier dental care facility in Guwahati, Assam, providing world-class dental treatments with state-of-the-art technology and a compassionate team of dental professionals.',
  address: 'Guwahati, Assam 781007, India',
  fullAddress: 'Pearl Dental Clinic, Guwahati, Assam 781007, India',
  phone: '+91 97291 48975',
  whatsapp: '919729148975',
  email: 'info@pearldentalclinic.in',
  mapUrl: 'https://www.google.com/maps/place/Pearl+Dental+Clinic/@26.1507689,91.7852829,17z',
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.2898862145637!2d91.78528289999999!3d26.1507689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a59b5269ae37b%3A0x6823f5e02a1e2a39!2sPearl%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1728370000000!5m2!1sen!2sin',
  rating: 4.8,
  reviewCount: 124,
  founded: '2015',
  patients: '10,000+',
  experience: '10+',
  hours: {
    weekdays: '9:00 AM – 8:00 PM',
    saturday: '9:00 AM – 6:00 PM',
    sunday: '10:00 AM – 4:00 PM',
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
    id: 'pediatric',
    icon: '👶',
    title: 'Pediatric Dentistry',
    shortDesc: 'Gentle, fun dental care for children of all ages.',
    description: 'Our child-friendly dental care uses a gentle approach to make dental visits a positive experience. We treat children with patience, creating lifelong healthy dental habits.',
    price: '₹500 – ₹4,000',
    duration: '30-45 mins',
    color: '#ec4899',
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
    qualification: 'BDS, MDS (Prosthodontics)',
    experience: '7+ Years',
    speciality: 'Cosmetic Dentistry, Implants & General Dentistry',
    image: '/src/assets/doctor.png',
    bio: 'Dr. Nilakshi Talukdar is the founder and chief dental surgeon of Pearl Dental Clinic, Guwahati. With 7+ years of dedicated clinical experience, she specializes in smile makeovers, dental implants, and full-mouth rehabilitation — bringing world-class dental care to Assam with a gentle, patient-first approach.',
  },
];


export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Rahul Das',
    location: 'Guwahati',
    rating: 5,
    text: 'Absolutely amazing experience! Got my smile makeover done here and I\'m over the moon with the results. Dr. Priya is incredibly skilled and the entire team makes you feel so comfortable. The clinic is spotlessly clean and modern.',
    treatment: 'Smile Makeover',
    date: 'September 2026',
  },
  {
    id: 2,
    name: 'Anjali Bora',
    location: 'Dispur',
    rating: 5,
    text: 'I was terrified of dental visits, but Pearl Dental changed my life. Got my root canal done completely painlessly. Dr. Ankita is a magician! The staff is so gentle and patient. Will never go anywhere else.',
    treatment: 'Root Canal Treatment',
    date: 'August 2026',
  },
  {
    id: 3,
    name: 'Biplab Kalita',
    location: 'Guwahati',
    rating: 5,
    text: 'My son has been going to Pearl Dental since he was 5. Dr. Priya and her team are so good with children. My son actually enjoys his dental visits now! Best pediatric dental care in Guwahati.',
    treatment: 'Pediatric Dentistry',
    date: 'October 2026',
  },
  {
    id: 4,
    name: 'Meenakshi Sharma',
    location: 'Jorhat',
    rating: 5,
    text: 'Traveled all the way from Jorhat for dental implants and it was 100% worth it. Best investment in my confidence ever! The implants look and feel like real teeth. Professional and world-class service.',
    treatment: 'Dental Implants',
    date: 'July 2026',
  },
  {
    id: 5,
    name: 'Dhruv Nath',
    location: 'Guwahati',
    rating: 5,
    text: 'Got Invisalign done by Dr. Rajesh and the transformation is unbelievable. The whole process was smooth, well-explained and the results are exactly what I wanted. Pearl Dental is the best in Assam!',
    treatment: 'Invisalign',
    date: 'September 2026',
  },
];

export const FAQS = [
  {
    q: 'How do I book an appointment?',
    a: 'You can book an appointment through our website form below or by sending us a WhatsApp message. We also accept walk-ins during working hours.',
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
  { value: '1', label: 'Expert Doctor' },
  { value: '98%', label: 'Patient Satisfaction' },
];
