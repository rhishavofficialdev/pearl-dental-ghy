// Swap gradient placeholders for real photography by adding `img` URLs and rendering them in <Tile/>.
export const services=[
['General Dentistry','Routine checkups, cleaning, fillings and preventive care.'],
['Teeth Cleaning','Professional cleaning and plaque/tartar removal.'],
['Teeth Whitening','Modern whitening treatments for a brighter smile.'],
['Dental Implants','Long-lasting replacement for missing teeth.'],
['Root Canal Treatment','Modern and comfortable root canal procedures.'],
['Braces & Orthodontics','Traditional and modern orthodontic solutions.'],
['Clear Aligners','Discreet teeth straightening with clear aligners.'],
['Cosmetic Dentistry','Smile enhancement and aesthetic dental treatments.'],
['Dental Veneers','Transform the appearance of your smile.'],
['Pediatric Dentistry','Gentle and comfortable dental care for children.'],
['Wisdom Tooth Treatment','Evaluation and treatment of wisdom tooth problems.'],
['Gum Treatment','Treatment and prevention of gum-related problems.']].map(([title,desc])=>({title,desc}))
export const packages=[
{name:'Pearl Essential',cta:'Choose Package',tone:'bg-sky',items:['Dental consultation','Dental examination','Professional cleaning','Basic oral health assessment']},
{name:'Pearl Bright',cta:'Choose Package',tone:'bg-mint',items:['Consultation','Dental cleaning','Teeth whitening','Smile assessment']},
{name:'Pearl Smile',cta:'Choose Package',tone:'bg-lav',items:['Consultation','Smile assessment','Whitening','Cosmetic consultation','Personalized smile plan']},
{name:'Pearl Complete',cta:'Book Consultation',tone:'bg-ivory',items:['Comprehensive dental consultation','Cleaning','X-ray/diagnostic assessment','Personalized treatment planning','Follow-up consultation']}]
export const reviews=[
{n:'Demo Patient A',t:'Whitening',r:'From the first consultation to the final treatment, the entire experience was comfortable and stress-free. The team genuinely cared about my smile.'},
{n:'Demo Patient B',t:'Clear Aligners',r:'I was nervous about aligners, but every step was explained clearly. Zero pressure, great results.'},
{n:'Demo Patient C',t:'Pediatric Care',r:'My son actually asked when he could come back. That says everything.'},
{n:'Demo Patient D',t:'Dental Veneers',r:'Natural, bright and exactly what I wanted. The smile plan made me feel in control.'}]
export const dentists=[
{n:'Dr. [Name]',q:'BDS',s:'Family & Pediatric Dentistry',e:'8 yrs',b:'Makes first visits calm, playful and stress-free.'}]
export const faqs=[
['How often should I visit the dentist?','Most people benefit from a checkup and cleaning every six months. We will suggest a schedule that fits you.'],
['Is teeth whitening safe?','Yes, when supervised by a dentist. We assess your teeth and gums first to keep it safe and comfortable.'],
['Are clear aligners painful?','You may feel mild pressure for a day or two with each new set, which usually settles quickly.'],
['How long does teeth whitening take?','In-clinic sessions typically take about an hour. Timing varies by treatment and is confirmed at consultation.'],
['Do you treat children?','Yes. Our pediatric care is gentle and designed to help kids feel at ease.'],
['Do you offer dental implants?','Yes. We start with an assessment to see whether implants suit you.'],
['How can I book an appointment?','Use the booking form, call, or message us on WhatsApp.'],
['What should I bring to my first appointment?','Photo ID, any previous dental records or X-rays, and a list of medications.'],
['Do you provide emergency dental treatment?','Call us as soon as possible and we will help you find the earliest slot.'],
['Do you offer consultation before treatment?','Yes. Every treatment starts with a consultation and a clear plan.']]
