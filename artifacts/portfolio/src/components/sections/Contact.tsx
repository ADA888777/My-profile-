import { useEffect, useRef, useState } from "react";
import "@/styles/contact-footer.css";

/*
The inbox address is assembled at runtime instead of sitting in the source
as one plain string, so simple scrapers that crawl the repository or the
built JS bundle do not harvest it.
*/
const MAILBOX = ["hshmhshm", "72"].join("");
const MAIL_DOMAIN = ["gmail", "com"].join(".");
const getReceiver = () => MAILBOX + "@" + MAIL_DOMAIN;

const TELEGRAM_URL = "https://t.me/Ada778877";

const LIMITS = { name: 80, email: 120, message: 2000 };
/* Shortest time a real person needs to fill the brief (anti-bot). */
const MIN_FILL_MS = 2500;

const PROJECT_TYPES = [
  "موقع تعريفي",
  "متجر إلكتروني",
  "تطبيق ويب",
  "مراجعة أمنية / اختبار اختراق",
  "هوية بصرية وتصميم",
  "تسويق رقمي",
  "شيء آخر",
];

const BUDGETS = [
  "أقل من 2,000 ر.س",
  "من 2,000 إلى 5,000 ر.س",
  "من 5,000 إلى 15,000 ر.س",
  "أكثر من 15,000 ر.س",
];

type FieldName = "name" | "email" | "projectType" | "message";

const FIELD_IDS: Record<FieldName, string> = {
  name: "ada-name",
  email: "ada-email",
  projectType: "ada-type",
  message: "ada-message",
};

/*
Deliberately regex-free e-mail check: no backtracking surprises and it is
easy to read. The server side (FormSubmit) validates again.
*/
function looksLikeEmail(value: string) {
  const v = value.trim();
  if (v.length < 6 || v.indexOf(" ") !== -1) return false;
  const at = v.indexOf("@");
  if (at < 1 || at !== v.lastIndexOf("@")) return false;
  const dot = v.lastIndexOf(".");
  return dot > at + 1 && dot < v.length - 2;
}

const RULES: Record<FieldName, { message: string; isValid: (value: string) => boolean }> = {
  name: { message: "اكتب اسمك من فضلك", isValid: (v) => v.trim().length >= 2 },
  email: { message: "اكتب بريداً إلكترونياً صحيحاً", isValid: looksLikeEmail },
  projectType: { message: "اختر نوع المشروع", isValid: (v) => v !== "" },
  message: { message: "اكتب سطرين على الأقل عن مشروعك", isValid: (v) => v.trim().length >= 15 },
};

const EMPTY_FORM = { name: "", email: "", projectType: "", budget: "", message: "" };

type FormValues = typeof EMPTY_FORM;
type AnyFieldEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

export function Contact() {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("");
  /* Honeypot: invisible to humans, usually filled in by bots. */
  const [honey, setHoney] = useState("");
  const mountedAt = useRef(Date.now());
  const successHeading = useRef<HTMLHeadingElement>(null);

  /* Move focus to the confirmation so screen readers land on it. */
  useEffect(() => {
    if (submitted) successHeading.current?.focus();
  }, [submitted]);

  const validate = (field: FieldName, value: string) => {
    const rule = RULES[field];
    const isValid = rule.isValid(value);
    setErrors((prev) => {
      const next = { ...prev };
      if (isValid) {
        delete next[field];
      } else {
        next[field] = rule.message;
      }
      return next;
    });
    return isValid;
  };

  const handleChange = (field: keyof FormValues) => (event: AnyFieldEvent) => {
    const value = event.target.value;
    setValues((prev) => ({ ...prev, [field]: value }));
    if (field !== "budget" && errors[field as FieldName]) {
      validate(field as FieldName, value);
    }
  };

  const handleBlur = (field: FieldName) => (event: AnyFieldEvent) => {
    validate(field, event.target.value);
  };

  const resetForm = () => {
    setValues(EMPTY_FORM);
    setErrors({});
    setStatus("");
    setHoney("");
    mountedAt.current = Date.now();
    setSubmitted(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setStatus("");

    const order: FieldName[] = ["name", "email", "projectType", "message"];
    const nextErrors: Partial<Record<FieldName, string>> = {};
    order.forEach((field) => {
      if (!RULES[field].isValid(values[field])) nextErrors[field] = RULES[field].message;
    });
    setErrors(nextErrors);

    const firstInvalid = order.find((field) => nextErrors[field]);
    if (firstInvalid) {
      document.getElementById(FIELD_IDS[firstInvalid])?.focus();
      return;
    }

    /* Drop obvious bot submissions without sending them anywhere. */
    if (honey.trim() !== "" || Date.now() - mountedAt.current < MIN_FILL_MS) {
      setSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/" + getReceiver(), {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name.trim().slice(0, LIMITS.name),
          email: values.email.trim().slice(0, LIMITS.email),
          project_type: values.projectType,
          budget: values.budget || "غير محددة",
          message: values.message.trim().slice(0, LIMITS.message),
          _subject: "موجز مشروع جديد من " + values.name.trim(),
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!response.ok) throw new Error("send failed");
      setValues(EMPTY_FORM);
      setSubmitted(true);
    } catch {
      setStatus("تعذّر الإرسال الآن. جرّب مرة أخرى، أو راسلني على تليجرام مباشرة.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="ada-ct" aria-labelledby="contact-title">
      {/* Shared gradient used by the icons in this section. */}
      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="ada-g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="55%" stopColor="#7c3bed" />
            <stop offset="100%" stopColor="#5b21b6" />
          </linearGradient>
        </defs>
      </svg>

      <div className="wrap">
        <div className="head">
          <span className="eyebrow">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4L3 21l1.1-3.4A8.4 8.4 0 1 1 21 11.5Z" />
            </svg>
            تواصل معي
          </span>
          <h2 id="contact-title" className="h2">
            عندك مشروع؟ <b>خلّنا نبدأ</b>
          </h2>
          <p className="sub">
            املأ الموجز في دقيقة، وأرجع لك بنطاق العمل والمدة والسعر — مكتوبة، بلا مفاجآت.
          </p>
        </div>

        <div className="cols">
          {/* ---------- the brief ---------- */}
          <div className="card">
            <p className="hp" aria-live="polite">
              {isSubmitting ? "جاري الإرسال" : submitted ? "تم استلام الموجز" : ""}
            </p>

            {submitted ? (
              <div className="ok">
                <div className="ok-m" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3 ref={successHeading} tabIndex={-1}>
                  وصلني موجزك
                </h3>
                <p>أراجعه وأرد عليك خلال 24 ساعة. وإذا الموضوع مستعجل، راسلني على تليجرام مباشرة.</p>
                <div className="acts">
                  <a className="sb sb-g" href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                    راسلني على تليجرام
                  </a>
                  <button type="button" className="sb sb-p" onClick={resetForm}>
                    إرسال موجز آخر
                  </button>
                </div>
              </div>
            ) : (
              <form className="form" onSubmit={handleSubmit} noValidate>
                {/* Honeypot - hidden from real users. */}
                <p className="hp">
                  <label htmlFor="ada-bot">لا تملأ هذا الحقل</label>
                  <input
                    id="ada-bot"
                    name="bot-field"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honey}
                    onChange={(event) => setHoney(event.target.value)}
                  />
                </p>

                <div className="row2">
                  <div className={errors.name ? "f bad" : "f"}>
                    <label htmlFor={FIELD_IDS.name}>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="12" cy="8" r="3.6" />
                        <path d="M4.5 20c0-3.6 3.4-6.2 7.5-6.2s7.5 2.6 7.5 6.2" />
                      </svg>
                      الاسم <i aria-hidden="true">*</i>
                    </label>
                    <input
                      id={FIELD_IDS.name}
                      name="name"
                      type="text"
                      autoComplete="name"
                      maxLength={LIMITS.name}
                      placeholder="اسمك أو اسم شركتك"
                      required
                      aria-invalid={errors.name ? true : undefined}
                      aria-describedby="ada-name-error"
                      value={values.name}
                      onChange={handleChange("name")}
                      onBlur={handleBlur("name")}
                    />
                    <span className="err" id="ada-name-error">
                      {errors.name}
                    </span>
                  </div>

                  <div className={errors.email ? "f bad" : "f"}>
                    <label htmlFor={FIELD_IDS.email}>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="2.5" y="5" width="19" height="14" rx="3" />
                        <path d="m3.5 7 8.5 6 8.5-6" />
                      </svg>
                      البريد الإلكتروني <i aria-hidden="true">*</i>
                    </label>
                    <input
                      id={FIELD_IDS.email}
                      name="email"
                      type="email"
                      dir="ltr"
                      inputMode="email"
                      autoComplete="email"
                      maxLength={LIMITS.email}
                      placeholder="name@example.com"
                      required
                      aria-invalid={errors.email ? true : undefined}
                      aria-describedby="ada-email-error"
                      value={values.email}
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                    />
                    <span className="err" id="ada-email-error">
                      {errors.email}
                    </span>
                  </div>
                </div>

                <div className="row2">
                  <div className={errors.projectType ? "f bad" : "f"}>
                    <label htmlFor={FIELD_IDS.projectType}>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="16" rx="3" />
                        <path d="M3 9h18" />
                      </svg>
                      نوع المشروع <i aria-hidden="true">*</i>
                    </label>
                    <span className="sel">
                      <select
                        id={FIELD_IDS.projectType}
                        name="project_type"
                        required
                        aria-invalid={errors.projectType ? true : undefined}
                        aria-describedby="ada-type-error"
                        value={values.projectType}
                        onChange={handleChange("projectType")}
                        onBlur={handleBlur("projectType")}
                      >
                        <option value="">— اختر —</option>
                        {PROJECT_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </span>
                    <span className="err" id="ada-type-error">
                      {errors.projectType}
                    </span>
                  </div>

                  <div className="f">
                    <label htmlFor="ada-budget">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="2.5" y="6" width="19" height="12" rx="2.5" />
                        <circle cx="12" cy="12" r="2.6" />
                      </svg>
                      الميزانية التقريبية
                    </label>
                    <span className="sel">
                      <select
                        id="ada-budget"
                        name="budget"
                        value={values.budget}
                        onChange={handleChange("budget")}
                      >
                        <option value="">— غير محددة بعد —</option>
                        {BUDGETS.map((budget) => (
                          <option key={budget} value={budget}>
                            {budget}
                          </option>
                        ))}
                      </select>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </span>
                  </div>
                </div>

                <div className={errors.message ? "f bad" : "f"}>
                  <label htmlFor={FIELD_IDS.message}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4L3 21l1.1-3.4A8.4 8.4 0 1 1 21 11.5Z" />
                    </svg>
                    تفاصيل المشروع <i aria-hidden="true">*</i>
                  </label>
                  <textarea
                    id={FIELD_IDS.message}
                    name="message"
                    rows={4}
                    maxLength={LIMITS.message}
                    placeholder="عندي متجر صغير وأبغى موقع يعرض المنتجات ويستقبل الطلبات. متى تقدرين تبدئين؟"
                    required
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby="ada-message-error"
                    value={values.message}
                    onChange={handleChange("message")}
                    onBlur={handleBlur("message")}
                  />
                  <span className="err" id="ada-message-error">
                    {errors.message}
                  </span>
                </div>

                <button type="submit" className={isSubmitting ? "btn go" : "btn"} disabled={isSubmitting}>
                  <span className="lbl">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M21.9 4.3 18.7 19.4c-.2 1-.9 1.3-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8L18 6.1c.4-.3-.1-.5-.6-.2L7.3 12.3l-4.6-1.4c-1-.3-1-1 .2-1.5l18-6.9c.8-.3 1.5.2 1 2.8Z" />
                    </svg>
                    أرسل الموجز
                  </span>
                  <span className="spin" aria-hidden="true" />
                </button>

                <p className="note">
                  بياناتك تصلني مباشرة ولا تُشارك مع أي جهة. الموجز غير ملزم — مجرد بداية نقاش.
                </p>
                <p className="stat" role="status">
                  {status}
                </p>
              </form>
            )}
          </div>

          {/* ---------- side panels ---------- */}
          <aside className="side">
            <div className="panel">
              <h3>طريق أسرع</h3>
              <p className="lead">تفضّل محادثة مباشرة؟ هذي أسرع وسيلة توصلني.</p>

              <a className="ch" href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                <span className="ch-i" aria-hidden="true">
                  <svg className="fl" viewBox="0 0 24 24">
                    <path d="M21.9 4.3 18.7 19.4c-.2 1-.9 1.3-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8L18 6.1c.4-.3-.1-.5-.6-.2L7.3 12.3l-4.6-1.4c-1-.3-1-1 .2-1.5l18-6.9c.8-.3 1.5.2 1 2.8Z" />
                  </svg>
                </span>
                <span className="ch-t">
                  <b>تليجرام</b>
                  <span>الأسرع — رد خلال ساعات</span>
                </span>
                <svg className="ch-a" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14 6l-6 6 6 6" />
                </svg>
              </a>

              <a className="ch" href={"mailto:" + getReceiver()}>
                <span className="ch-i" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <rect x="2.5" y="5" width="19" height="14" rx="3" />
                    <path d="m3.5 7 8.5 6 8.5-6" />
                  </svg>
                </span>
                <span className="ch-t">
                  <b dir="ltr">{getReceiver()}</b>
                  <span>للمراسلات الرسمية والملفات</span>
                </span>
                <svg className="ch-a" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14 6l-6 6 6 6" />
                </svg>
              </a>
            </div>

            <div className="panel">
              <h3>ماذا يحدث بعد الإرسال؟</h3>
              <p className="lead">بلا انتظار مجهول — هذي الخطوات بالضبط.</p>
              <ol className="flow">
                <li>
                  <b>أقرأ موجزك وأرد خلال 24 ساعة</b>
                  <span>برد مكتوب، لا رسالة آلية.</span>
                </li>
                <li>
                  <b>مكالمة قصيرة لتحديد النطاق</b>
                  <span>من 15 إلى 20 دقيقة نتفق فيها على المطلوب بالضبط.</span>
                </li>
                <li>
                  <b>عرض سعر ومدة مكتوبان</b>
                  <span>تعرف الرقم والتاريخ قبل ما تلتزم بأي شيء.</span>
                </li>
              </ol>
              <span className="live">
                <i aria-hidden="true" /> متاحة لمشاريع جديدة
              </span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
