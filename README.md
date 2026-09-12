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
  portfolio/                 موقع البورتفوليو  <-- هذا هو المشروع المنشور
    public/
      images/                لقطات المشاريع الحقيقية
      robots.txt, sitemap.xml, logo.jpeg, opengraph.jpg
    src/
      components/            layout/ + sections/ + ui/
      pages/                 Home, not-found
      styles/
        contact-footer.css   تنسيق قسم التواصل والفوتر
        glow-zone.css        خلفية النطاق المتدرّج (البطل + من أنا)
      index.css              متغيرات الثيم والأدوات المخصصة
  api-server/                خادم Express غير مستخدم من قبل الموقع
  mockup-sandbox/            ساندبوكس تجارب غير مستخدم
lib/                         مكتبات db / api-spec / api-client غير مستخدمة من الموقع
netlify.toml                 إعدادات البناء + رؤوس الأمان والتخزين المؤقت
zone-only.png                مرجع تصميم: الخلفية وحدها (غير مستخدم في البناء)
zone-scope.png               مرجع تصميم: نطاق الخلفية (غير مستخدم في البناء)
```

## التشغيل محلياً

```bash
pnpm install
pnpm --filter @workspace/portfolio run dev     # خادم التطوير
pnpm --filter @workspace/portfolio run build   # بناء للإنتاج
pnpm --filter @workspace/portfolio run serve   # معاينة البناء
pnpm run typecheck                             # فحص الأنواع
```

> المشروع يعتمد pnpm حصراً (هناك سكربت preinstall يمنع npm و yarn).

## النشر

النشر تلقائي من فرع `main` عبر Netlify:

- أمر البناء: `pnpm install --no-frozen-lockfile && pnpm --filter @workspace/portfolio run build`
- مجلد النشر: `artifacts/portfolio/dist/public`
- رؤوس الأمان (CSP، HSTS، X-Frame-Options ...) معرفة في `netlify.toml`
- أي مسار غير موجود يُرجع بكود 404 حقيقي (لتجنب soft 404 في Google)

## خلفية النطاق المتدرّج (Glow Zone)

خلفية بنفسجية بتوهّج ركني وحبيبات، تمتد من أعلى قسم البطل
«حلول تقنية احترافية تبدأ من الفكرة وتنتهي بنتيجة حقيقية» (`#home`)
حتى نهاية قسم «من أنا» (`#about`)، ثم تتلاشى إلى لون قسم «التقنيات».

القسمان متجاوران في الـ DOM، فيكفي غلاف واحد في `Home.tsx`:

```tsx
<div className="gz-wrap">
  <div className="gz-bg" aria-hidden="true">
    <span className="gz-orb gz-orb-1" /> ... <span className="gz-orb gz-orb-4" />
    <span className="gz-grain" />
    <span className="gz-fade" />
  </div>
  <div className="gz-content">
    <Hero />
    <About />
  </div>
</div>
```

التنسيق في `artifacts/portfolio/src/styles/glow-zone.css` وكل الأصناف بسابقة
`gz-` حتى لا تتعارض مع أدوات Tailwind. مفاتيح التحكّم على `.gz-wrap`:

| المتغير | الوظيفة |
| --- | --- |
| `--gz-top` / `--gz-mid` / `--gz-bottom` | تدرّج القاعدة من الأعلى إلى الأسفل |
| `--gz-next-rgb` | لون خلفية القسم التالي (مكوّنات RGB بمسافات) |
| `--gz-fade-h` | ارتفاع منطقة التلاشي |
| `--gz-grain` | قوة الحبيبات: `.15` خفيفة · `.23` متوازنة · `.35` واضحة |

ملاحظات مهمّة:

- `--gz-next-rgb` يجب أن يساوي لون خلفية القسم الذي يلي النطاق وإلا ظهر خط فاصل.
  قسم «التقنيات» خلفيته `bg-black/20` فوق `#09090B` أي `#070709` = `7 7 9`.
- `overflow: hidden` موضوع على `.gz-wrap` نفسه (يمنع التمرير الأفقي من الدوائر العريضة)،
  ولا يوضع على أي أب له، ولا يوضع `transform` على الغلاف لأنه يكسر مرجع `position: absolute`.
- لنقل التوهّج إلى زاوية أخرى: بدّل `bottom` / `left` في `.gz-orb-1..4` إلى `top` / `right`.
- الحبيبات ضجيج SVG مُدمج كـ data URI: لا طلب شبكة ولا ملف صورة.
- قسم البطل لم تبقَ له خلفية خاصة (حُذفت طبقة `.hero-backdrop` المعتمة لأنها تحجب النطاق)،
  وحدّ قسم «التقنيات» صار `border-b` بدل `border-y` حتى لا يقطع خط رقيق نهاية التلاشي.

## قسم التواصل والفوتر

التنسيق كله في `artifacts/portfolio/src/styles/contact-footer.css` ومحصور داخل
`.ada-ct` (التواصل) و `.ada-ft` (الفوتر) حتى لا تتعارض أسماء الأصناف القصيرة
(`card`, `cols`, `f`, `btn` ...) مع أدوات Tailwind في بقية الموقع.

نموذج «الموجز» يجمع: الاسم، البريد، نوع المشروع، الميزانية التقريبية، والتفاصيل.

- الإرسال عبر `formsubmit.co/ajax` (بدون خادم)، والبريد يُركَّب في وقت التشغيل حتى لا تحصده الروبوتات
- تحقق فوري من كل حقل عند الخروج منه، ورسائل خطأ عربية مرتبطة بـ `aria-describedby`
- مصيدة روبوتات (honeypot) + حد زمني أدنى للتعبئة
- حالة نجاح مستقلة مع نقل تركيز لوحة المفاتيح إليها

## السيو والوصولية

- `<html lang="ar" dir="rtl">` مع meta description و canonical و Open Graph و Twitter Cards
- بيانات منسقة JSON-LD (Person + ProfessionalService + WebSite) وتشمل حساب تليجرام في `sameAs`
- `robots.txt` و `sitemap.xml` في `artifacts/portfolio/public/`
- الخطوط العربية (Cairo، IBM Plex Sans Arabic، Tajawal) تُحمَّل من `index.html` لا عبر `@import` داخل CSS
- رابط تخطي إلى المحتوى، تركيز مرئي للوحة المفاتيح، واحترام `prefers-reduced-motion`
- الأداة `.bidi-isolate` تمنع انقلاب النصوص اللاتينية مثل `C#` داخل الصفحة العربية

## الأعمال المعروضة

كل رابط في `Projects.tsx` تم التحقق من أنه يفتح فعلاً، والصور لقطات حقيقية من النسخ المنشورة:

| المشروع | الرابط |
| --- | --- |
| منصة HS لربط الشركات بالمندوبين | https://ada888777.github.io/HSHS/ |
| سانورا — أكاديمية اللغات | https://sanoora.netlify.app/ |
| منصة آدا للتعلم الرقمي | https://mystore888.netlify.app/ |
| وريث — مبادرة التراث السعودي | https://ada888777.github.io/WAREETH/ |

> الروابط القديمة كانت تشير إلى `aba787.github.io` وهو حساب غير موجود، فكانت كل بطاقات
> الأعمال تفتح صفحة 404. الحساب الصحيح هو `ada888777.github.io`.

## مهام متبقية (تحتاج قراراً يدوياً)

- [ ] تفعيل بريد `hshmhshm72@gmail.com` في FormSubmit: أول إرسال من النموذج يطلب تأكيداً بالبريد لمرة واحدة
- [ ] إضافة أدلة للأرقام المعروضة في `About.tsx` (الشهادات، المشاريع، الطلاب)
- [ ] إضافة رابط واتساب وملف السيرة الذاتية إلى الفوتر إن رغبت
- [ ] تفعيل GitHub Pages لمستودع `Sanoora` أو الاعتماد على `sanoora.netlify.app`
- [ ] حذف `zone-only.png` و `zone-scope.png` من جذر المستودع (~4 ميجابايت مراجع تصميم فقط)
- [ ] حذف `artifacts/api-server` و `artifacts/mockup-sandbox` و `lib/` إن لم تُستخدم
- [ ] حذف `artifacts/portfolio/public/images/hero-bg.png` (لم يعد مستخدماً)
- [ ] حذف الأداتين `.hero-backdrop` و `.hero-fade` من `index.css` (لم تبقَ لهما استخدامات)
- [ ] نقل الاعتماديات من `devDependencies` إلى `dependencies` في `artifacts/portfolio/package.json`
- [ ] إزالة `https://i.ibb.co` من `img-src` في CSP (لم تبق صور خارجية)
- [ ] إضافة ملف LICENSE (package.json يذكر MIT)

## الترخيص

MIT
