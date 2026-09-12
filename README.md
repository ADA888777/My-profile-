# موقع جود عبد الفتاح (Portfolio)

موقع شخصي عربي (RTL) يعرض الخدمات التقنية والأعمال: برمجة، أمن سيبراني، تصميم، تسويق، واستشارات.

**الموقع المنشور:** https://my-profile-87.netlify.app/

---

## التقنيات

| الطبقة | الأداة |
| --- | --- |
| الواجهة | React 18 + TypeScript |
| البناء | Vite |
| التنسيق | Tailwind CSS v4 |
| المكونات | shadcn/ui + Radix UI |
| الحركات | Framer Motion |
| التوجيه | wouter |
| الاستضافة | Netlify |
| مدير الحزم | pnpm workspaces |

## بنية المستودع

```text
artifacts/
  portfolio/          موقع البورتفوليو  <-- هذا هو المشروع المنشور
    public/           ملفات ستاتيكية (robots.txt, sitemap.xml, logo, opengraph)
    src/
      components/     layout/ + sections/ + ui/
      pages/          Home, not-found
      index.css       متغيرات الثيم والأدوات المخصصة
  api-server/         خادم Express غير مستخدم من قبل الموقع
  mockup-sandbox/     ساندبوكس تجارب غير مستخدم
lib/                  مكتبات db / api-spec / api-client غير مستخدمة من الموقع
netlify.toml          إعدادات البناء + رأوس الأمان والتخزين المؤقت
```

## التشغيل محلياً

```bash
pnpm install
pnpm --filter @workspace/portfolio run dev      # خادم التطوير
pnpm --filter @workspace/portfolio run build    # بناء للإنتاج
pnpm --filter @workspace/portfolio run serve    # معاينة البناء
pnpm run typecheck                              # فحص الأنواع
```

> المشروع يعتمد pnpm حصراً (هناك سكربت preinstall يمنع npm و yarn).

## النشر

النشر تلقائي من فرع `main` عبر Netlify:

- أمر البناء: `pnpm install --no-frozen-lockfile && pnpm --filter @workspace/portfolio run build`
- مجلد النشر: `artifacts/portfolio/dist/public`
- رأوس الأمان (CSP، HSTS، X-Frame-Options ...) معرفة في `netlify.toml`
- أي مسار غير موجود يُرجع بكود 404 حقيقي (لتجنب soft 404 في Google)

## السيو والوصولية

- `<html lang="ar" dir="rtl">` مع meta description و canonical و Open Graph و Twitter Cards
- بيانات منسقة JSON-LD (Person + ProfessionalService + WebSite)
- `robots.txt` و `sitemap.xml` في `artifacts/portfolio/public/`
- رابط تخطي إلى المحتوى، تركيز مرئي للوحة المفاتيح، واحترام `prefers-reduced-motion`
- الأداة `.bidi-isolate` تمنع انقلاب النصوص اللاتينية مثل `C#` داخل الصفحة العربية

## مهام متبقية (تحتاج قراراً يدوياً)

- [ ] استبدال صور المشاريع في `Projects.tsx` بلقطات حقيقية (الحالية قوالب عامة على i.ibb.co)
- [ ] إضافة روابط واتساب / LinkedIn وملف السيرة الذاتية في `Footer.tsx`
- [ ] إضافة أدلة للأرقام المعروضة في `About.tsx` (الشهادات، المشاريع)
- [ ] حذف `artifacts/api-server` و `artifacts/mockup-sandbox` و `lib/` إن لم تُستخدم
- [ ] حذف `artifacts/portfolio/public/images/hero-bg.png` (لم يعد مستخدماً)
- [ ] نقل الاعتماديات من `devDependencies` إلى `dependencies` في `artifacts/portfolio/package.json`
- [ ] نقل نموذج التواصل إلى Netlify Forms أو Netlify Function لإخفاء البريد تماماً
- [ ] إضافة ملف LICENSE (package.json يذكر MIT)

## الترخيص

MIT
