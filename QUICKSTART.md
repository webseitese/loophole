# Resume Optimizer - Quick Start Guide

## 🎯 What You Have

A **75% complete** AI-powered resume optimization web application with:

✅ Authentication (email/password + Google OAuth)
✅ Resume upload & AI parsing (PDF/DOCX)
✅ AI optimization with GPT-4o
✅ ATS score calculation
✅ Cover letter generation
✅ PDF export
✅ Beautiful responsive UI

## 🚀 Quick Setup (5 minutes)

### 1. Install Node.js Dependencies

```bash
cd c:\Users\neast\.gemini\antigravity\scratch\webapp
npm install
```

### 2. Create Environment File

Create `.env.local` in the webapp folder:

```env
# Required
DATABASE_URL="postgresql://user:password@localhost:5432/resume_optimizer"
NEXTAUTH_SECRET="your-random-secret-32-chars"
NEXTAUTH_URL="http://localhost:3000"
OPENAI_API_KEY="sk-your-openai-key"

# Optional (for Google OAuth)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-secret"

# Optional (for file uploads)
BLOB_READ_WRITE_TOKEN="vercel-blob-token"
```

### 3. Setup Database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Run the App

```bash
npm run dev
```

Open http://localhost:3000

## 📋 Test Checklist

1. ✅ Sign up with email/password
2. ✅ Upload a resume (PDF or DOCX)
3. ✅ Create optimization with job description
4. ✅ View ATS scores and improvements
5. ✅ Download optimized PDF

## 🔑 Required Services

### Must Have:
- **PostgreSQL database** (local or cloud)
- **OpenAI API key** (for AI features)

### Optional:
- **Google OAuth credentials** (for social login)
- **Vercel Blob storage** (for file uploads, or use local storage)
- **Stripe account** (for payments - not implemented yet)

## 📁 Project Structure

```
webapp/
├── app/
│   ├── page.tsx              # Landing page
│   ├── auth/                 # Login/signup
│   ├── dashboard/            # Main app
│   │   ├── page.tsx         # Dashboard
│   │   ├── cv/upload/       # Upload CV
│   │   ├── optimize/        # Create optimization
│   │   └── optimization/    # Results
│   ├── pricing/             # Pricing page
│   └── api/                 # Backend APIs
├── components/ui/           # UI components
├── lib/                     # Core logic
└── prisma/                  # Database
```

## 🎨 Features

### For All Users (FREE):
- 3 optimizations per month
- 1 master CV
- Basic ATS score
- PDF export

### For PRO Users ($9.99/mo):
- 50 optimizations per month
- 3 master CVs
- Cover letter generator (3 variants)
- Advanced ATS analysis

### For UNLIMITED Users ($19.99/mo):
- Unlimited optimizations
- Unlimited CVs
- Everything in PRO

> **Note:** Payment integration not yet implemented. All users currently have FREE limits.

## 🚧 What's Missing (Optional)

- Stripe payment integration
- DOCX export
- CV edit page
- LinkedIn optimizer

## 💡 Tips

- Use a real OpenAI API key for best results
- Test with actual resumes and job descriptions
- ATS scores are estimates, not guarantees
- Monthly usage resets on the 1st of each month

## 🆘 Troubleshooting

**"npm not found"**
→ Install Node.js from nodejs.org

**"Database connection failed"**
→ Check DATABASE_URL in .env.local

**"OpenAI error"**
→ Verify OPENAI_API_KEY is correct

**"Module not found"**
→ Run `npm install` again

## 📞 Next Steps

1. **Test locally** - Make sure everything works
2. **Get API keys** - OpenAI, database, etc.
3. **Deploy to Vercel** - `vercel deploy`
4. **Add Stripe** - If you want payments (optional)

---

**Ready to optimize resumes with AI! 🚀**
