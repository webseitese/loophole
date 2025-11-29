# 🚀 Kompletní Průvodce Nasazením - Resume Optimizer

Tento průvodce vás provede **krok za krokem** od začátku až po funkční aplikaci na internetu.

---

## 📋 ČÁST 1: Co budete potřebovat (Příprava)

### Účty, které si musíte vytvořit:

1. ✅ **GitHub** - pro uložení kódu (ZDARMA)
2. ✅ **Vercel** - pro hosting webu (ZDARMA)
3. ✅ **OpenAI** - pro AI funkce (PLATBA ~$5-10/měsíc)
4. ✅ **Vercel Postgres** - pro databázi (ZDARMA)

### Software, který musíte nainstalovat:

1. ✅ **Node.js** - runtime pro spuštění aplikace
2. ✅ **Git** - pro nahrání kódu na GitHub

---

## 🔧 ČÁST 2: Instalace Software (Windows)

### Krok 1: Nainstalujte Node.js

1. Jděte na: **https://nodejs.org/**
2. Stáhněte **LTS verzi** (doporučená verze)
3. Spusťte instalátor
4. Klikejte "Next" a nechte výchozí nastavení
5. **DŮLEŽITÉ:** Zaškrtněte "Automatically install necessary tools"
6. Dokončete instalaci

**Ověření:**
```powershell
# Otevřete PowerShell a napište:
node --version
npm --version

# Měli byste vidět čísla verzí (např. v18.17.0)
```

### Krok 2: Nainstalujte Git

1. Jděte na: **https://git-scm.com/download/win**
2. Stáhněte instalátor
3. Spusťte instalátor
4. Při instalaci:
   - Použijte výchozí nastavení
   - Editor: můžete vybrat "Use Visual Studio Code" pokud ho máte
5. Dokončete instalaci

**Ověření:**
```powershell
git --version
# Měli byste vidět: git version 2.x.x
```

---

## 🌐 ČÁST 3: Vytvoření Účtů

### Krok 3A: GitHub Účet

1. Jděte na: **https://github.com**
2. Klikněte **"Sign up"**
3. Vyplňte:
   - Email
   - Heslo
   - Username (např. "vase-jmeno")
4. Ověřte email
5. **HOTOVO!** ✅

### Krok 3B: Vercel Účet

1. Jděte na: **https://vercel.com/signup**
2. Klikněte **"Continue with GitHub"**
3. Přihlaste se přes GitHub (spojí se automaticky)
4. Povolte Vercel přístup k vašim repozitářům
5. **HOTOVO!** ✅

### Krok 3C: OpenAI Účet

1. Jděte na: **https://platform.openai.com/signup**
2. Zaregistrujte se (email + heslo)
3. Ověřte email
4. **DŮLEŽITÉ:** Přidejte platební metodu:
   - Jděte na: https://platform.openai.com/account/billing/overview
   - Klikněte "Add payment method"
   - Přidejte kreditní kartu
   - Doporučuji nastavit limit: $10/měsíc (Settings → Limits)
5. **HOTOVO!** ✅

---

## 🔑 ČÁST 4: Získání API Klíčů

### Krok 4A: OpenAI API Klíč

1. Jděte na: **https://platform.openai.com/api-keys**
2. Klikněte **"Create new secret key"**
3. Pojmenujte ho: "Resume Optimizer"
4. Klikněte **"Create secret key"**
5. **DŮLEŽITÉ:** Zkopírujte klíč HNED (začíná `sk-...`)
6. Uložte ho do poznámkového bloku - **už ho neuvidíte!**

**Příklad klíče:**
```
sk-proj-abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
```

### Krok 4B: Vygenerujte NextAuth Secret

**Metoda 1 - PowerShell:**
```powershell
# Otevřete PowerShell a spusťte:
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

**Metoda 2 - Online:**
1. Jděte na: **https://generate-secret.vercel.app/32**
2. Zkopírujte vygenerovaný string

**Příklad:**
```
a8f3k2m9p1q5r7s4t6u8v2w3x5y7z9b1
```

Uložte ho do poznámkového bloku!

---

## 💾 ČÁST 5: Příprava Projektu

### Krok 5: Nainstalujte Závislosti

```powershell
# Otevřete PowerShell
# Přejděte do složky projektu:
cd c:\Users\neast\.gemini\antigravity\scratch\webapp

# Nainstalujte všechny balíčky (trvá 2-5 minut):
npm install

# Měli byste vidět progress bar a nakonec:
# "added XXX packages"
```

**Co se stane:**
- Stáhne se ~200MB knihoven
- Vytvoří se složka `node_modules`
- To je normální! ✅

---

## 📤 ČÁST 6: Nahrání na GitHub

### Krok 6A: Vytvořte GitHub Repozitář

1. Jděte na: **https://github.com/new**
2. Vyplňte:
   - **Repository name:** `resume-optimizer`
   - **Description:** "AI-powered resume optimization app"
   - **Visibility:** Private (nebo Public)
   - ❌ **NEZAŠKRTÁVEJTE** "Add a README file"
3. Klikněte **"Create repository"**

### Krok 6B: Nahrajte Kód

```powershell
# V PowerShell, ve složce projektu:
cd c:\Users\neast\.gemini\antigravity\scratch\webapp

# Inicializujte Git:
git init

# Přidejte všechny soubory:
git add .

# Vytvořte první commit:
git commit -m "Initial commit - Resume Optimizer"

# Připojte GitHub repozitář (NAHRAĎTE "vase-jmeno"):
git remote add origin https://github.com/vase-jmeno/resume-optimizer.git

# Nahrajte kód:
git branch -M main
git push -u origin main
```

**Pokud se vás Git zeptá na přihlášení:**
- Username: váš GitHub username
- Password: použijte **Personal Access Token** (ne heslo!)
  - Vytvořte ho zde: https://github.com/settings/tokens
  - Vyberte "Generate new token (classic)"
  - Zaškrtněte "repo"
  - Zkopírujte token a použijte jako heslo

---

## 🚀 ČÁST 7: Nasazení na Vercel

### Krok 7A: Importujte Projekt

1. Jděte na: **https://vercel.com/new**
2. Klikněte **"Import Git Repository"**
3. Najděte váš `resume-optimizer` repozitář
4. Klikněte **"Import"**

### Krok 7B: Konfigurace Projektu

Vercel automaticky detekuje Next.js. Nastavení:

- **Framework Preset:** Next.js (automaticky)
- **Root Directory:** `./` (výchozí)
- **Build Command:** `npm run build` (výchozí)
- **Output Directory:** `.next` (výchozí)

**ZATÍM NEKLIKEJTE "Deploy"!** ⚠️

### Krok 7C: Vytvořte Databázi

1. V Vercel dashboardu, nahoře klikněte **"Storage"**
2. Klikněte **"Create Database"**
3. Vyberte **"Postgres"**
4. Pojmenujte: `resume-optimizer-db`
5. Vyberte region: **Washington, D.C., USA (iad1)** (nejblíže Evropě)
6. Klikněte **"Create"**

**Počkejte 1-2 minuty** - databáze se vytváří...

### Krok 7D: Připojte Databázi k Projektu

1. V databázi klikněte **"Connect Project"**
2. Vyberte váš `resume-optimizer` projekt
3. Klikněte **"Connect"**

**Co se stalo:**
- Vercel automaticky přidal `DATABASE_URL` do environment variables ✅

---

## 🔐 ČÁST 8: Nastavení Environment Variables

### Krok 8: Přidejte Zbývající Proměnné

1. V Vercel projektu jděte na **"Settings"** → **"Environment Variables"**
2. Přidejte tyto proměnné **JEDNU PO DRUHÉ:**

#### Proměnná 1: NEXTAUTH_SECRET
```
Key:   NEXTAUTH_SECRET
Value: a8f3k2m9p1q5r7s4t6u8v2w3x5y7z9b1
       (váš vygenerovaný secret z kroku 4B)
```
Klikněte **"Add"**

#### Proměnná 2: NEXTAUTH_URL
```
Key:   NEXTAUTH_URL
Value: https://vase-aplikace.vercel.app
       (nahraďte skutečnou URL - uvidíte po deployi)
```
**POZNÁMKA:** Tuto URL zatím nevíte, přidáte ji POZDĚJI po prvním deployi!

#### Proměnná 3: OPENAI_API_KEY
```
Key:   OPENAI_API_KEY
Value: sk-proj-abc123...
       (váš OpenAI API klíč z kroku 4A)
```
Klikněte **"Add"**

#### Proměnná 4: BLOB_READ_WRITE_TOKEN (Volitelné)
```
Key:   BLOB_READ_WRITE_TOKEN
Value: (necháme prázdné - Vercel ho přidá automaticky)
```

**DATABASE_URL už tam je** z kroku 7D ✅

---

## 🎯 ČÁST 9: První Deploy

### Krok 9A: Spusťte Deploy

1. V Vercel projektu jděte na **"Deployments"**
2. Klikněte **"Deploy"** (nebo "Redeploy")
3. **Počkejte 2-5 minut** - Vercel:
   - Stahuje kód z GitHubu
   - Instaluje závislosti
   - Buildí aplikaci
   - Nasazuje na server

**Sledujte progress:**
- Building... ⏳
- Deploying... ⏳
- **Ready!** ✅

### Krok 9B: Získejte URL

Po úspěšném deployi uvidíte:
```
✅ Production: https://resume-optimizer-abc123.vercel.app
```

**Zkopírujte tuto URL!**

### Krok 9C: Aktualizujte NEXTAUTH_URL

1. Jděte zpět na **"Settings"** → **"Environment Variables"**
2. Najděte `NEXTAUTH_URL`
3. Klikněte **"Edit"**
4. Změňte na vaši skutečnou URL:
   ```
   https://resume-optimizer-abc123.vercel.app
   ```
5. Klikněte **"Save"**
6. **DŮLEŽITÉ:** Klikněte **"Redeploy"** aby se změny projevily!

---

## 🗄️ ČÁST 10: Inicializace Databáze

### Krok 10: Spusťte Migrace

```powershell
# V PowerShell, ve složce projektu:
cd c:\Users\neast\.gemini\antigravity\scratch\webapp

# Nastavte DATABASE_URL (zkopírujte z Vercel):
$env:DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"

# Spusťte migrace:
npx prisma migrate deploy

# Měli byste vidět:
# ✅ Migration applied successfully
```

**Kde najít DATABASE_URL:**
1. Vercel → Storage → Vaše databáze
2. Klikněte **".env.local"** tab
3. Zkopírujte celý `DATABASE_URL` string

---

## 🎉 ČÁST 11: Test Aplikace

### Krok 11: Otevřete Aplikaci

1. Jděte na vaši URL: `https://resume-optimizer-abc123.vercel.app`
2. Měli byste vidět **landing page** ✅

### Krok 11B: Zaregistrujte se

1. Klikněte **"Get Started"**
2. Vyplňte:
   - Jméno
   - Email
   - Heslo (min 8 znaků)
3. Klikněte **"Sign up"**
4. Měli byste být přesměrováni na **dashboard** ✅

### Krok 11C: Nahrajte CV

1. Klikněte **"Upload New Resume"**
2. Nahrajte PDF nebo DOCX soubor
3. Pojmenujte ho (např. "My Resume")
4. Klikněte **"Upload & Parse Resume"**
5. **Počkejte 10-30 sekund** - AI parsuje CV
6. Měli byste vidět parsed CV data ✅

### Krok 11D: Vytvořte Optimalizaci

1. Jděte na **"Optimize Resume"**
2. Vyberte vaše CV
3. Vložte job description (min 100 znaků)
4. Vyplňte company name a role (volitelné)
5. Klikněte **"Optimize Resume"**
6. **Počkejte 20-60 sekund** - AI optimalizuje
7. Měli byste vidět:
   - ATS score before/after
   - Improvements list
   - Keywords added
   - Download PDF button ✅

---

## ✅ HOTOVO! Co máte:

✅ Funkční web na internetu
✅ AI optimalizace CV
✅ Databáze uživatelů
✅ Autentizace (přihlášení/registrace)
✅ PDF export
✅ Cover letter generation (PRO users)

---

## 🔧 Řešení Problémů

### Problém 1: "Build failed"

**Řešení:**
```powershell
# Zkontrolujte lokálně:
npm run build

# Pokud selže, opravte chyby a:
git add .
git commit -m "Fix build errors"
git push
```

### Problém 2: "Database connection failed"

**Řešení:**
1. Zkontrolujte, že `DATABASE_URL` je správně nastavená
2. Ověřte, že migrace proběhly: `npx prisma migrate deploy`
3. Zkuste resetovat databázi ve Vercel Storage

### Problém 3: "OpenAI API error"

**Řešení:**
1. Zkontrolujte, že `OPENAI_API_KEY` je správně
2. Ověřte, že máte kredity na OpenAI účtu
3. Zkontrolujte usage limits: https://platform.openai.com/usage

### Problém 4: "NextAuth error"

**Řešení:**
1. Zkontrolujte, že `NEXTAUTH_URL` odpovídá vaší Vercel URL
2. Ověřte, že `NEXTAUTH_SECRET` je nastavený
3. Redeploy aplikaci

---

## 💰 Náklady

| Služba | Cena |
|--------|------|
| Vercel Hosting | **ZDARMA** |
| Vercel Postgres | **ZDARMA** (až 256MB) |
| Vercel Blob Storage | **ZDARMA** (až 1GB) |
| OpenAI API | **~$0.01-0.05** za optimalizaci |

**Celkem:** Pouze platíte za OpenAI API volání

**Tip:** Nastavte si limit na OpenAI účtu ($10/měsíc) aby vás to nepřekvapilo!

---

## 📞 Další Kroky

### Volitelné Vylepšení:

1. **Vlastní doména:**
   - Vercel → Settings → Domains
   - Přidejte svou doménu (např. `moje-cv.cz`)

2. **Google OAuth:**
   - Google Cloud Console
   - Vytvořte OAuth credentials
   - Přidejte do Vercel env variables

3. **Stripe platby:**
   - Zaregistrujte se na Stripe
   - Přidejte Stripe keys
   - Uživatelé budou moci platit za PRO/UNLIMITED

4. **Analytics:**
   - Přidejte Google Analytics
   - Sledujte návštěvnost

---

## 🎓 Naučili jste se:

✅ Jak funguje Next.js
✅ Jak nasadit na Vercel
✅ Jak používat PostgreSQL databázi
✅ Jak integrovat OpenAI API
✅ Jak spravovat environment variables
✅ Jak používat Git a GitHub

**Gratulujeme! Máte funkční AI aplikaci na internetu! 🎉**
