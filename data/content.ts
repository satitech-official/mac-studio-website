export type Course = {
  title: string;
  category: string;
  image: string;
  description: string;
  duration: string;
  age: string;
  level: string;
};

export const courses: Course[] = [
  {
    title: "Expressive Sketching",
    category: "Drawing",
    image: "https://images.pexels.com/photos/11077392/pexels-photo-11077392.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Build observation, confident linework and a sketchbook habit that feels entirely your own.",
    duration: "Flexible studio module*",
    age: "Teens & adults",
    level: "Beginner friendly",
  },
  {
    title: "Canvas in Colour",
    category: "Painting",
    image: "https://images.pexels.com/photos/31280579/pexels-photo-31280579.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Explore composition, colour mixing and expressive brushwork on canvas.",
    duration: "Flexible studio module*",
    age: "Kids & adults",
    level: "All levels",
  },
  {
    title: "Acrylic Stories",
    category: "Painting",
    image: "https://images.pexels.com/photos/36764905/pexels-photo-36764905.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Layer bold colour, texture and personal narratives with versatile acrylic techniques.",
    duration: "Flexible studio module*",
    age: "Age 10+",
    level: "All levels",
  },
  {
    title: "Mindful Mandalas",
    category: "Mindful Art",
    image: "https://images.pexels.com/photos/30567278/pexels-photo-30567278.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Slow down through rhythm, pattern, colour and meditative mark-making.",
    duration: "Workshop format*",
    age: "Age 12+",
    level: "Beginner friendly",
  },
  {
    title: "Clay & Form",
    category: "Craft",
    image: "https://images.unsplash.com/photo-1753164725860-ffcd260b7b32?auto=format&fit=crop&q=80&w=1200",
    description: "Discover the satisfying language of shape through tactile, hands-on clay practice.",
    duration: "Workshop format*",
    age: "Kids & adults",
    level: "Beginner friendly",
  },
  {
    title: "Modern Calligraphy",
    category: "Lettering",
    image: "https://images.pexels.com/photos/9016466/pexels-photo-9016466.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Learn graceful letterforms, pressure control and the pleasure of writing by hand.",
    duration: "Workshop format*",
    age: "Age 12+",
    level: "Beginner friendly",
  },
  {
    title: "Little Makers Lab",
    category: "Kids",
    image: "https://images.pexels.com/photos/8382373/pexels-photo-8382373.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "A playful space for young artists to imagine, experiment and make without fear.",
    duration: "Flexible studio module*",
    age: "Children",
    level: "Play-led",
  },
  {
    title: "Mixed Media Play",
    category: "Craft",
    image: "https://images.pexels.com/photos/7951693/pexels-photo-7951693.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Combine paint, paper, pattern and found textures into expressive layered artworks.",
    duration: "Workshop format*",
    age: "Age 8+",
    level: "All levels",
  },
];

export const gallery = [
  { src: "https://images.pexels.com/photos/31280579/pexels-photo-31280579.jpeg?auto=compress&cs=tinysrgb&w=1400", category: "Painting", alt: "Artist applying vivid paint to a canvas", caption: "Colour finds its own rhythm" },
  { src: "https://images.pexels.com/photos/8382373/pexels-photo-8382373.jpeg?auto=compress&cs=tinysrgb&w=1400", category: "Young artists", alt: "Children creating paintings in an art class", caption: "Small hands, expansive ideas" },
  { src: "https://images.unsplash.com/photo-1753164725860-ffcd260b7b32?auto=format&fit=crop&q=82&w=1400", category: "Craft", alt: "Hands shaping clay on a pottery wheel", caption: "Form emerging from touch" },
  { src: "https://images.pexels.com/photos/1107574/pexels-photo-1107574.jpeg?auto=compress&cs=tinysrgb&w=1400", category: "Painting", alt: "Close view of hands painting on canvas", caption: "The beautiful work in progress" },
  { src: "https://images.pexels.com/photos/6925021/pexels-photo-6925021.jpeg?auto=compress&cs=tinysrgb&w=1400", category: "Studio", alt: "Colourful paints and brushes on an artist palette", caption: "A palette of possibilities" },
  { src: "https://images.pexels.com/photos/9016466/pexels-photo-9016466.jpeg?auto=compress&cs=tinysrgb&w=1400", category: "Lettering", alt: "Hand practicing brush calligraphy", caption: "A quieter kind of expression" },
  { src: "https://images.pexels.com/photos/8382271/pexels-photo-8382271.jpeg?auto=compress&cs=tinysrgb&w=1400", category: "Young artists", alt: "Young artists focused on canvases in class", caption: "Learning through making" },
  { src: "https://images.pexels.com/photos/6920235/pexels-photo-6920235.jpeg?auto=compress&cs=tinysrgb&w=1400", category: "Studio", alt: "Hands making an expressive red artwork", caption: "Permission to make a beautiful mess" },
  { src: "https://images.pexels.com/photos/7858858/pexels-photo-7858858.jpeg?auto=compress&cs=tinysrgb&w=1400", category: "Painting", alt: "Watercolour brush moving across a painted surface", caption: "Attention in every stroke" },
  { src: "https://images.pexels.com/photos/17639517/pexels-photo-17639517.jpeg?auto=compress&cs=tinysrgb&w=1400", category: "Studio", alt: "Hands covered in vibrant paint", caption: "Creativity you can feel" },
];

export const reasons = [
  ["01", "Encouraging mentorship", "Guidance that builds skill without flattening your individual voice."],
  ["02", "Hands-on learning", "Make, test, adjust and learn through a tactile studio process."],
  ["03", "Room to experiment", "A warm environment where curiosity matters more than perfection."],
  ["04", "For every age", "Thoughtful creative experiences for children, teens and adults."],
  ["05", "Personal attention", "Support shaped around pace, confidence and creative goals."],
  ["06", "Beyond the classroom", "Workshops, showcases and community moments that keep art alive."],
];

export const processSteps = ["Idea", "Sketch", "Practice", "Learn", "Create", "Exhibit", "Celebrate"];

export const faqs = [
  ["Who can join MAC Studio classes?", "MAC Studio welcomes children, teens and adults. The right program depends on age, interest and current comfort level; send an enquiry and the studio can help you choose."],
  ["Do beginners need previous art experience?", "Not at all. Many experiences are designed as welcoming entry points, with guidance that meets learners where they are."],
  ["What materials should students bring?", "Material requirements vary by course or workshop. Please confirm with the studio before your first session so you only bring what is genuinely needed."],
  ["How can I register?", "Choose any Register button, complete the short form and continue to WhatsApp. Your details will be prepared as a message for you to review before sending."],
  ["Are trial sessions available?", "Trial-session availability has not been verified. Please call or WhatsApp the studio for the latest options."],
  ["Where is MAC Studio located?", "MAC Studio is in Sector 57, Gurugram, Haryana. The map shown here is an area search until the studio confirms its exact public pin."],
  ["Do you organise exhibitions and competitions?", "The studio supports creative events and showcases. Current opportunities are shared directly by MAC Studio as dates are confirmed."],
  ["Are private or customised sessions available?", "Custom session availability is unverified. Share what you have in mind through WhatsApp and the studio can respond personally."],
];

export const testimonials = [
  { quote: "The space feels encouraging from the first mark. I stopped worrying about making it perfect and started enjoying the process.", name: "Sample learner story", role: "Illustrative content · replace with verified feedback" },
  { quote: "A thoughtful creative routine can do wonders for a child’s confidence. The best part is seeing an idea become something they are proud to share.", name: "Sample parent perspective", role: "Illustrative content · replace with verified feedback" },
  { quote: "Clear guidance, room to experiment, and a studio atmosphere that makes you want to stay curious.", name: "Sample workshop reflection", role: "Illustrative content · replace with verified feedback" },
];

export const stats = [
  { value: "—", label: "Years of creative learning" },
  { value: "—", label: "Happy students" },
  { value: "—", label: "Workshops conducted" },
  { value: "—", label: "Creative projects" },
];
