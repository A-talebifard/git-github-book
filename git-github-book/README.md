# کتاب جامع Git و GitHub

کتاب آنلاین فارسی Git و GitHub — نسخه‌ی کاملاً لوکال و بدون وابستگی به منابع خارجی.

## ساختار پروژه

```
git-github-book/
├── index.html              # صفحه اصلی کتاب
├── css/
│   ├── style.css           # استایل اصلی + @font-face declarations
│   └── atom-one-dark.min.css  # تم highlight.js
├── js/
│   ├── book.js             # اسکریپت‌های اختصاصی کتاب (search, sidebar, etc.)
│   ├── mermaid.min.js      # موتور رسم نمودارها (نسخه 10.9.0)
│   ├── highlight.min.js    # syntax highlighting
│   ├── highlight-bash.min.js
│   ├── highlight-yaml.min.js
│   ├── highlight-markdown.min.js
│   ├── highlight-powershell.min.js
│   └── highlight-json.min.js
├── fonts/
│   ├── Vazirmatn-*.ttf     # فونت فارسی (6 وزن)
│   ├── JetBrainsMono-*.ttf # فونت کد (4 وزن)
│   └── Inter-*.ttf         # فونت لاتین (5 وزن)
└── img/
    └── avatar.jpg          # عکس پروفایل نویسنده
```

## ویژگی‌ها

- **کاملاً لوکال**: 0 درخواست خارجی، آفلاین کار می‌کند
- **RTL فارسی**: راست‌چین با فونت Vazirmatn
- **Dark Modern**: پالت Catppuccin Mocha (بنفش/فیروزه‌ای)
- **22 فصل جامع** + جلد + واژه‌نامه + درباره نویسنده
- **18 نمودار Mermaid** (به انگلیسی)
- **68 بلاک کد** با syntax highlighting و دکمه Copy
- **Sidebar + Search** با جستجوی آنی (Ctrl+K)
- **SEO بهینه**: Open Graph، Twitter Card، Schema.org
- **ریسپانسیو**: موبایل و دسکتاپ

## استفاده

### اجرای محلی

کافیست فایل `index.html` را در مرورگر باز کنید:

```bash
# روش 1: باز کردن مستقیم
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows

# روش 2: با سرور محلی (توصیه شده)
python3 -m http.server 8000
# سپس: http://localhost:8000
```

### Deploy روی GitHub Pages

```bash
# 1. یک repo جدید بسازید (مثلا: git-github-book)
# 2. کل پوشه را push کنید
git init
git add .
git commit -m "Initial commit: Git & GitHub book"
git remote add origin git@github.com:A-talebifard/git-github-book.git
git push -u origin main

# 3. در GitHub: Settings → Pages → Source: main branch
# 4. سایت در https://a-talebifard.github.io/git-github-book/ در دسترس خواهد بود
```

## میانبرهای صفحه‌کلید

| کلید | عملکرد |
|------|--------|
| `Ctrl+K` | جستجو در کتاب |
| `Esc` | بستن جستجو |
| `→` | فصل بعدی |
| `←` | فصل قبلی |

## نویسنده

**A-Talebifard**
- GitHub: [https://github.com/A-talebifard](https://github.com/A-talebifard)
- LinkedIn: [https://www.linkedin.com/in/abbastalebifard/](https://www.linkedin.com/in/abbastalebifard/)

## لایسنس

© ۱۴۰۴ A-Talebifard. تمام حقوق محفوظ است.
