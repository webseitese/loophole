# 🚀 RYCHLÝ PRŮVODCE - Nasazení Resume Optimizer

## KROK 1: Nahrát na GitHub

```powershell
# Přejděte do složky projektu:
cd c:\Users\neast\.gemini\antigravity\scratch\webapp

# Inicializujte Git:
git init

# Přidejte VŠECHNY soubory:
git add -A

# Vytvořte commit:
git commit -m "Initial commit - Resume Optimizer"

# Připojte GitHub repozitář (NAHRAĎTE "vase-jmeno"):
git remote add origin https://github.com/vase-jmeno/resume-optimizer.git

# Nahrajte kód:
git branch -M main
git push -u origin main
```

---

## KROK 2: Získat API klíče

### A) OpenAI API klíč
1. Jděte na: https://platform.openai.com/api-keys
2. Klikněte "Create new secret key"
3. Zkopírujte klíč (začíná `sk-proj-...`)
4. Uložte ho!

### B) NextAuth Secret
```powershell
# Spusťte v PowerShell:
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```
Zkopírujte výsledek!

---

## KROK 3: Vercel - Vytvořit databázi

1. Jděte na: https://vercel.com
2. Přihlaste se přes GitHub
3. Klikněte **"Storage"** (nahoře)
4. Klikněte **"Create Database"**
5. Vyberte **"Postgres"**
6. Pojmenujte: `resume-optimizer-db`
7. Region: **Washington, D.C., USA**
8. Klikněte **"Create"**

---

## KROK 4: Vercel - Importovat projekt

1. Klikněte **"Add New Project"**
2. Najděte `resume-optimizer` repozitář
3. Klikněte **"Import"**
4. **ZATÍM NEKLIKEJTE DEPLOY!**

---

## KROK 5: Připojit databázi

1. V databázi klikněte **"Connect Project"**
2. Vyberte váš projekt
3. Klikněte **"Connect"**

---

## KROK 6: Přidat Environment Variables

V projektu: **Settings** → **Environment Variables**

Přidejte TYTO 3 PROMĚNNÉ:

```
Key: OPENAI_API_KEY
Value: sk-proj-... (váš OpenAI klíč)
---
Key: NEXTAUTH_SECRET
Value: abc123... (vygenerovaný secret)
---
Key: NEXTAUTH_URL
Value: https://vase-aplikace.vercel.app (zatím nechte prázdné)
```

DATABASE_URL se přidá automaticky! ✅

---

## KROK 7: Deploy

1. Klikněte **"Deploy"**
2. Počkejte 2-5 minut
3. Zkopírujte URL: `https://resume-optimizer-xyz.vercel.app`

---

## KROK 8: Aktualizovat NEXTAUTH_URL

1. **Settings** → **Environment Variables**
2. Najděte `NEXTAUTH_URL`
3. Změňte na vaši skutečnou URL
4. Klikněte **"Redeploy"**

---

## KROK 9: Inicializovat databázi

```powershell
# Ve složce projektu:
cd c:\Users\neast\.gemini\antigravity\scratch\webapp

# Zkopírujte DATABASE_URL z Vercelu (Settings → Environment Variables → DATABASE_URL)
$env:DATABASE_URL="postgresql://..."

# Spusťte migrace:
npx prisma migrate deploy
```

---

## KROK 10: Otevřete web!

Jděte na: `https://vase-aplikace.vercel.app`

✅ Zaregistrujte se
✅ Nahrajte CV
✅ Vytvořte optimalizaci

---

## 🆘 Řešení problémů

### Git nevidí soubory:
```powershell
git add -A --force
git status  # Zkontrolujte co se přidalo
```

### Build failed:
```powershell
npm run build  # Zkontrolujte lokálně
```

### Database error:
- Ověřte že DATABASE_URL je správně
- Spusťte: `npx prisma migrate deploy`

### OpenAI error:
- Zkontrolujte API klíč
- Ověřte kredity na https://platform.openai.com/usage

---

## 📋 CHECKLIST

- [ ] Kód nahrán na GitHub
- [ ] OpenAI API klíč získán
- [ ] NextAuth Secret vygenerován
- [ ] Vercel účet vytvořen
- [ ] Postgres databáze vytvořena
- [ ] Databáze připojena k projektu
- [ ] ENV variables přidány
- [ ] První deploy hotov
- [ ] NEXTAUTH_URL aktualizován
- [ ] Databázové migrace spuštěny
- [ ] Web funguje!

---

## 💰 Náklady

- Vercel: **ZDARMA**
- Postgres: **ZDARMA**
- OpenAI: **~$0.01-0.05** za optimalizaci

**Celkem: Pouze platíte za AI volání**

---

## 🎉 HOTOVO!

Máte funkční AI aplikaci na internetu!

URL: https://vase-aplikace.vercel.app
