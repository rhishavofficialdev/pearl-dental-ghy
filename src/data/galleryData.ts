// Pearl Dental Clinic - Instagram Gallery Data
// Uses authentic clinic photography and surgeon portraits

import pearlImg from '../assets/pearl.jpeg';
import doctorImg from '../assets/doctor.jpeg';
import doctor111Img from '../assets/doctor111.png';
import clinicImg from '../assets/service_clinic.png';
import bannerImg from '../assets/services_banner.png';
import cultureImg from '../assets/about_culture.png';
import heroBgImg from '../assets/hero_bg.png';

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: 'all' | 'smiles' | 'clinic' | 'team' | 'treatments';
  caption: string;
  tags: string[];
  likes: number;
  comments: number;
  date: string;
  postUrl: string;
  aspect?: 'square' | 'portrait' | 'landscape';
}

export const INSTAGRAM_PROFILE = {
  username: 'pearldentalclinic_ghy',
  displayName: 'Pearl Dental Clinic',
  url: 'https://instagram.com',
  location: 'Dispur, Guwahati, Assam',
  followers: '3.4k',
  postsCount: 148,
  bio: '✨ Transforming smiles in Guwahati | Cosmetic Dentistry & Implants\n👩‍⚕️ Dr. Nilakshi Talukdar (BDS)\n📍 Housing Tiniali, Hengrabari Rd, Dispur\n📞 +91 97291 48975',
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'post-1',
    image: pearlImg,
    title: 'Dr. Nilakshi Talukdar Consulting Patient',
    category: 'team',
    caption: 'Every great smile begins with a listening ear and gentle care. Dr. Nilakshi Talukdar taking time to design a personalized treatment plan for our patient at Pearl Dental Clinic Guwahati.',
    tags: ['#PearlDentalClinic', '#DrNilakshiTalukdar', '#GuwahatiDentist', '#PatientFirst', '#SmileDesign'],
    likes: 342,
    comments: 28,
    date: '2 days ago',
    postUrl: 'https://instagram.com',
    aspect: 'square',
  },
  {
    id: 'post-2',
    image: clinicImg,
    title: 'Modern Clinic Operatory & Advanced Equipment',
    category: 'clinic',
    caption: 'Clean, serene, and hospital-grade hygienic. Step inside our advanced treatment operatory equipped with cutting-edge dental technology for pain-free procedures.',
    tags: ['#DentalClinicGuwahati', '#SterilizationFirst', '#PainlessDentistry', '#ModernDental', '#DispurGuwahati'],
    likes: 285,
    comments: 19,
    date: '5 days ago',
    postUrl: 'https://instagram.com',
    aspect: 'square',
  },
  {
    id: 'post-3',
    image: bannerImg,
    title: 'Smile Consultation & Aesthetic Excellence',
    category: 'treatments',
    caption: 'A bright, confident smile changes everything. From single-visit teeth whitening to full cosmetic rehabilitation, we bring world-class dentistry to Assam.',
    tags: ['#SmileMakeover', '#TeethWhitening', '#CosmeticDentistGuwahati', '#DentalCareAssam', '#ConfidentSmile'],
    likes: 418,
    comments: 34,
    date: '1 week ago',
    postUrl: 'https://instagram.com',
    aspect: 'square',
  },
  {
    id: 'post-4',
    image: cultureImg,
    title: 'Compassionate Team & Patient-First Culture',
    category: 'smiles',
    caption: 'Seeing our patients leave with relaxed smiles is what makes every day worthwhile! Dental anxiety? Not at Pearl Dental Clinic. We ensure your comfort from start to finish.',
    tags: ['#HappyPatients', '#NoMoreDentalFear', '#GuwahatiHealthcare', '#GentleDentistry', '#PearlSmiles'],
    likes: 367,
    comments: 22,
    date: '1 week ago',
    postUrl: 'https://instagram.com',
    aspect: 'square',
  },
  {
    id: 'post-5',
    image: doctorImg,
    title: 'Meet Our Founder Dr. Nilakshi Talukdar',
    category: 'team',
    caption: 'Dedicated to precision endodontics, dental implants, and aesthetic smiles. Dr. Nilakshi Talukdar (BDS) brings 5+ years of clinical excellence to Dispur, Guwahati.',
    tags: ['#DentalSurgeon', '#AssamDoctors', '#BDS', '#GuwahatiCity', '#PearlDentalTeam'],
    likes: 512,
    comments: 47,
    date: '2 weeks ago',
    postUrl: 'https://instagram.com',
    aspect: 'square',
  },
  {
    id: 'post-6',
    image: heroBgImg,
    title: 'Welcoming Healthcare Ambience in Dispur',
    category: 'clinic',
    caption: 'A peaceful, relaxing environment designed to put you at ease the moment you walk through our doors. Visit us near Prajapati Bhawan, Hengrabari Road, Dispur.',
    tags: ['#DispurDental', '#GuwahatiClinics', '#PearlDentalAmbience', '#NorthEastIndia', '#OralHealth'],
    likes: 298,
    comments: 16,
    date: '2 weeks ago',
    postUrl: 'https://instagram.com',
    aspect: 'square',
  },
  {
    id: 'post-7',
    image: doctor111Img,
    title: 'Precision Diagnostics & Smile Planning',
    category: 'treatments',
    caption: 'Detailed digital assessment and clear communication before every procedure. We walk you through every step so you feel fully confident and informed.',
    tags: ['#DigitalDentistry', '#SmilePlanning', '#RootCanalExpert', '#ImplantsGuwahati', '#HealthyTeeth'],
    likes: 384,
    comments: 25,
    date: '3 weeks ago',
    postUrl: 'https://instagram.com',
    aspect: 'square',
  },
  {
    id: 'post-8',
    image: pearlImg,
    title: 'Complete Patient Care & Follow-Up',
    category: 'smiles',
    caption: 'Dental care does not end when your treatment is complete. Our dedicated follow-up care ensures your results stay radiant and healthy for years to come.',
    tags: ['#DentalCheckup', '#PreventiveCare', '#GuwahatiSmileCare', '#PearlDentalFamily'],
    likes: 331,
    comments: 21,
    date: '1 month ago',
    postUrl: 'https://instagram.com',
    aspect: 'square',
  },
];

export const GALLERY_CATEGORIES = [
  { id: 'all', label: 'All Photos' },
  { id: 'smiles', label: 'Patient Smiles' },
  { id: 'treatments', label: 'Treatments & Care' },
  { id: 'clinic', label: 'Clinic & Tech' },
  { id: 'team', label: 'Dr. & Team' },
];
