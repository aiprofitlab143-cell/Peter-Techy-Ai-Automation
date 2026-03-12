# Peter Techy Automation - AI Automation Portfolio Website

A premium, high-end portfolio website for an AI automation expert, built with Next.js 14, React, TailwindCSS, GSAP, Three.js, and Framer Motion.

## Features

- 🎨 Modern Dark Tech Theme
- ⚡ Next.js 14 with App Router
- 🎭 GSAP Scroll Animations
- 🌐 Three.js Interactive 3D Elements
- 📱 Fully Responsive
- 🔒 Secure Contact Form with Email Automation
- 🎯 SEO Optimized
- ✨ Framer Motion Animations

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd peter-techy-automation
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
peter-techy-automation/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts        # Contact form API
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                # Main page
├── public/
│   ├── robots.txt              # SEO robots.txt
│   └── sitemap.xml             # SEO sitemap
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
└── README.md
```

## Tech Stack

- **Frontend**: Next.js 14, React 18, TailwindCSS
- **Animations**: GSAP, Framer Motion, Three.js
- **UI Components**: Custom components with Shadcn UI patterns
- **Backend**: Next.js API Routes, Node.js
- **Email**: Nodemailer
- **Form Validation**: Client-side validation

## Deployment

### Deploy on Vercel

The easiest way to deploy is to use Vercel:

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables (`EMAIL_USER`, `EMAIL_PASS`)
5. Deploy

## Customization

### Colors
Edit `tailwind.config.ts` to change the color scheme.

### Content
Edit `app/page.tsx` to update the content.

### Contact Form
Edit `app/api/contact/route.ts` to customize email settings.

## License

MIT License - feel free to use this project for your own portfolio.

