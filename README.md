## **Artemis Maps**

A modern map-based interface built with Next.js 14, Google Maps APIs, and a polished UI powered by Radix + Tailwind.
Artemis Maps helps you visualize geospatial data, explore locations, and build interactive map workflows with ease.

---

## **🚀 Features**

* Interactive Google Maps integration (@react-google-maps/api)
* Smooth UI components powered by Radix Primitives
* Tailwind CSS styling with animations
* Light/Dark mode support via next-themes
* Fast rendering using Next.js App Router
* Recharts integration for map-related analytics
* Clean form handling using React Hook Form + Zod
* Elegant toasts, drawers, dialogs, popovers, tooltips, and more

---

## **🧰 Tech Stack**

### **Frontend Framework**

* Next.js 14.2.16
* React 18

### **Google Maps / Visualization**

* @react-google-maps/api
* recharts

### **UI / UX**

* Radix UI (Alerts, Dialogs, Popovers, Menus, Tabs, etc.)
* lucide-react icons
* sonner for notifications
* cmdk for command palette
* Tailwind CSS + tailwindcss-animate

### **Forms & Validation**

* react-hook-form
* zod
* @hookform/resolvers

### **State & Utility**

* clsx / class-variance-authority
* date-fns
* tailwind-merge

### **Dev Tools**

* TypeScript
* ESLint + Next.js rules
* PostCSS + Tailwind

---

## **📦 Installation**

Clone the project:

```
git clone https://github.com/YusufMalu001/Artemis_Maps.git
cd Artemis_Maps
```

Install dependencies:

```
npm install
```

---

## **▶️ Running the Project**

Start development server:

```
npm run dev
```

The app runs at:

```
http://localhost:3000
```

Build for production:

```
npm run build
npm start
```

---

## **🗂️ Folder Structure**

```
Artemis_Maps/
│
├── app/                 # Next.js app directory (routes, layouts, pages)
├── components/          # Reusable UI components
├── lib/                 # Utils, helpers, schemas
├── styles/              # Global CSS + Tailwind setup
├── public/              # Static assets
└── README.md
```

(Adjust names if your folders differ.)

---

## **🗺️ Google Maps API Setup**

Create a Google Cloud Maps API key and add it to your environment file:

```
GOOGLE_MAPS_API_KEY=your_key_here
```

Use it like:

```tsx
import { GoogleMap, LoadScript } from '@react-google-maps/api';
```

---

## **🧪 Validation (Zod + RHF) Example**

```tsx
const schema = z.object({
  location: z.string().nonempty(),
});

const form = useForm({
  resolver: zodResolver(schema),
});
```

---

## **🔥 Future Roadmap**

* Layer toggling (heatmaps, markers, clusters)
* Search & geocoding
* User-saved map sessions
* Data overlays (CSV / GeoJSON importer)
* Analytics dashboard powered by Recharts

---

## **🤝 Contributing**

* Fork the repo
* Create your feature branch
* Commit changes with clear messages
* Open a pull request

---

## **📩 Contact**

**Yusuf Malu Bhai Wala**
GitHub: **YusufMalu001**
