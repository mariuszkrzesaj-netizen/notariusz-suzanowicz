import React, { useState, useEffect, useMemo } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Copy,
  Check,
  Search,
  ChevronRight,
  ArrowUpRight,
  Car,
  Train,
  Bus,
  UserCheck,
  ShieldCheck,
  Scale,
  Building2,
  Landmark,
  CreditCard,
  FileText,
  Send,
  Star,
  ExternalLink,
  Menu,
  X,
  Info
} from 'lucide-react';

const NOTARY_DATA = {
  header: {
    title: "Kancelaria Notarialna",
    subtitle: "KANCELARIA NOTARIALNA · SIECHNICE",
    notaryName: "Piotr Suzanowicz Notariusz",
    fullName: "Kancelaria Notarialna Piotra Suzanowicza",
    phone: "+48 515 717 830",
    phoneRaw: "+48515717830",
    email: "suzanowicz@siechnice-notariusz.pl",
    hoursSummary: [
      { days: "Poniedziałek, środa, piątek", time: "9:00–17:00" },
      { days: "Wtorek, czwartek", time: "10:00–18:00" },
      { days: "Inne terminy", time: "po wcześniejszym uzgodnieniu" }
    ],
    consultations: "codziennie 8:00–20:00"
  },
  navigation: [
    { id: "home", label: "Strona główna", path: "/" },
    { id: "about", label: "O mnie", path: "/o-mnie" },
    { id: "services", label: "Zakres usług", path: "/zakres-uslug" },
    { id: "reviews", label: "Opinie", path: "/opinie", badge: "4,9 ★" },
    { id: "fees", label: "Opłaty", path: "/oplaty" },
    { id: "contact", label: "Kontakt", path: "/kontakt" },
    { id: "directions", label: "Dojazd", path: "/dojazd" }
  ],
  company: {
    firm: "Piotr Suzanowicz Notariusz",
    address: "ul. Marsz. Józefa Piłsudskiego 22 lok. 2a, 55-011 Siechnice",
    footerAddress: "55-011 Siechnice. ul. Marsz. Józefa Piłsudskiego 22 lok. 2a,",
    nip: "8982328082",
    regon: "544912790",
    accounts: [
      {
        id: "fees",
        label: "Konto do wpłaty opłat notarialnych",
        number: "76 1020 5242 0000 2402 0745 1604"
      },
      {
        id: "deposit",
        label: "Konto depozytowe",
        number: "20 1020 5242 0000 2202 0745 9888"
      }
    ]
  },
  home: {
    welcomeHeading: "Mam przyjemność powitać Państwa na stronie internetowej Kancelarii Notarialnej w Siechnicach",
    lead: "Czynności notarialne dla klientów indywidualnych, deweloperów, spółek, wspólnot i spółdzielni mieszkaniowych.",
    freeAdviceNote: "Zwracam uwagę, że porady u notariusza są zawsze darmowe."
  },
  about: {
    title: "Notariusz Piotr Suzanowicz",
    subtitle: "Poniżej znajdziecie Państwo kilka słów o mnie",
    intro: "Oferuję pełne zaangażowanie w wykonywaniu powierzonych mi czynności notarialnych, przy zachowaniu tajemnicy notarialnej oraz transparentności w działaniu. Zwracam uwagę, że porady u notariusza są zawsze darmowe. W każdej chwili można zadzwonić lub przyjść na spotkanie osobiście do kancelarii.",
    sectionHeading: "Kompetencje i doświadczenie zawodowe",
    paragraphs: [
      "Posiadam szerokie umiejętności praktyczne zarówno w obsłudze klientów indywidualnych, jak i podmiotów profesjonalnych, w tym deweloperów, podmiotów korporacyjnych, czy wspólnot mieszkaniowych lub spółdzielni, o czym szerzej można przeczytać w zakładce zakres usług.",
      "Jestem absolwentem stacjonarnych studiów prawniczych na Wydziale Prawa, Administracji i Ekonomii Uniwersytetu Wrocławskiego. Z notariatem jestem związany od siedmiu lat. Odbyłem aplikację notarialną we Wrocławskiej Izbie Notarialnej pod patronatem notariusza Hanny Strzelczyk. W lutym 2021 r. zostałem zatrudniony w kancelarii notarialnej Tarkowski & Klimza-Ciejpa spółka partnerska z siedzibą we Wrocławiu, gdzie najpierw pracowałem jako asystent notarialny, a następnie po zdaniu egzaminu notarialnego w 2023 r., jako zastępca notarialny do chwili otwarcia kancelarii notarialnej. W kwietniu 2026 r. zostałem powołany decyzją Ministra Sprawiedliwości na notariusza w Siechnicach."
    ],
    closing: "Zapraszam serdecznie,",
    signature: "Piotr Suzanowicz"
  },
  services: {
    heading: "Zakres usług",
    lead: "Czynności notarialne dla klientów indywidualnych, deweloperów, spółek, wspólnot i spółdzielni mieszkaniowych.",
    footerPrompt: "Pytania dotyczące konkretnej czynności? Zapraszam do kontaktu telefonicznego lub mailowego przed umówieniem wizyty — odpowiem na każde pytanie.",
    items: [
      { num: "01", title: "Umowy obrotu nieruchomościami", desc: "Umowy sprzedaży wszelkich nieruchomości mieszkalnych, usługowych, produkcyjnych i rolnych." },
      { num: "02", title: "Umowy przedwstępne", desc: "Mające na celu przygotowanie stron transakcji do zawarcia umowy końcowej (przyrzeczonej) oraz zabezpieczenie ich wykonania." },
      { num: "03", title: "Obsługa deweloperów", desc: "Nabycie gruntu, umowy rezerwacyjne, deweloperskie, cesje umów, przeniesienia własności po zakończeniu inwestycji. Obsługa całego procesu." },
      { num: "04", title: "Darowizny i dożywocie", desc: "Umowy darowizn nieruchomości, praw korporacyjnych w spółkach oraz rzeczy ruchomych. Umowy dożywocia nieruchomości." },
      { num: "05", title: "Sprawy spadkowe", desc: "Testamenty, akty poświadczenia dziedziczenia, działy spadku. Zrzeczenia dziedziczenia i zachowku, zbycie spadku, ugody zachowkowe, odrzucenia spadku." },
      { num: "06", title: "Małżeństwo i rodzina", desc: "Rozdzielności majątkowe (intercyzy), rozszerzenie majątku wspólnego, umowy podziału majątku wspólnego. Ugody alimentacyjne i dotyczące rozliczeń między małżonkami." },
      { num: "07", title: "Pożyczki", desc: "Umowy pożyczek wraz z zabezpieczeniami w postaci hipotek, poręczeń i oświadczeń o poddaniu się egzekucji co do obowiązku zapłaty." },
      { num: "08", title: "Zabezpieczenia wierzytelności", desc: "Oświadczenia o poddaniu się egzekucji co do obowiązku zapłaty i wydania, hipoteka, zastaw zwykły i rejestrowy, poręczenia." },
      { num: "09", title: "Najem okazjonalny i instytucjonalny", desc: "Oświadczenia najemcy o poddaniu się egzekucji co do obowiązku opróżnienia i wydania mieszkania lub domu jednorodzinnego." },
      { num: "10", title: "Pełnomocnictwa", desc: "Pełnomocnictwa do wszelkich czynności prawnych — zarządzanie majątkiem, sprawy gospodarcze, administracyjne, budowlane, bankowe, kredytowe, medyczne i korporacyjne." },
      { num: "11", title: "Poświadczenia notarialne", desc: "Poświadczenia własnoręczności podpisu, daty okazania dokumentu, pozostawania przy życiu oraz zgodności kopii z okazanym oryginałem dokumentu." },
      { num: "12", title: "Protokoły zgromadzeń i zebrań", desc: "Protokołowanie zgromadzeń i zebrań organów spółek, zebrań wspólnot mieszkaniowych oraz innych organów kolegialnych." },
      { num: "13", title: "Protokoły zdarzeń i stanów faktycznych", desc: "Protokołowanie otwarcia stron internetowych, SMS-ów, przesyłek, oświadczeń oraz innych zdarzeń wymagających urzędowego potwierdzenia." },
      { num: "14", title: "Depozyty notarialne", desc: "Przyjęcie na przechowanie dokumentów i papierów wartościowych. Depozyty pieniężne jako bezpieczny mechanizm rozliczenia ceny w transakcjach nieruchomościowych." },
      { num: "15", title: "Spółki", desc: "Umowy i statuty spółek, zmiany umów, zbycie udziałów i akcji. Przekształcenia, podziały, połączenia, likwidacje spółek. Proste Spółki Akcyjne i rejestr PSA." },
      { num: "16", title: "Fundacje rodzinne", desc: "Statuty i oświadczenia o ustanowieniu fundacji rodzinnej, umowy przeniesienia majątku na pokrycie funduszu założycielskiego, zmiany statutu fundacji rodzinnej." },
      { num: "17", title: "Wspólnoty mieszkaniowe", desc: "Umowy z udziałem wspólnot. Podziały i łączenia lokali, zbycie części nieruchomości wspólnej, ustanawianie służebności, zmiany udziałów, umowy o podział do korzystania." },
      { num: "18", title: "Spółdzielnie mieszkaniowe", desc: "Przekształcenia spółdzielczych własnościowych praw do lokalu we własność. Umowy z udziałem spółdzielni i czynności dotyczące spółdzielczych praw do lokalu." },
      { num: "19", title: "JST, Skarb Państwa i państwowe osoby prawne", desc: "Czynności notarialne z udziałem jednostek samorządu terytorialnego, Skarbu Państwa oraz państwowych osób prawnych, w tym zbycie i nabycie nieruchomości publicznych." },
      { num: "20", title: "Zarząd sukcesyjny", desc: "Akty powołania zarządcy sukcesyjnego, zgody zarządcy na dokonanie czynności, działy spadku z udziałem spadku objętego zarządem sukcesyjnym." },
      { num: "21", title: "Postępowania upadłościowe i restrukturyzacyjne", desc: "Umowy sprzedaży składników masy upadłości oraz czynności notarialne w toku postępowań restrukturyzacyjnych." }
    ]
  },
  reviews: {
    heading: "Opinie o kancelarii",
    lead: "Zweryfikowane oceny klientów Kancelarii Notarialnej Piotra Suzanowicza w Siechnicach w wyszukiwarce Google oraz serwisie Infobel.",
    googleUrl: "https://www.google.com/search?q=Notariusz+Piotr+Suzanowicz+Siechnice+opinie",
    platforms: [
      {
        name: "Google",
        rating: "4,9 / 5",
        count: "32 opinie",
        note: "Średnia ocena w Wizytówce Google"
      },
      {
        name: "Infobel",
        rating: "4,9 / 5",
        count: "30 opinii",
        note: "Średnia ocena w katalogu Infobel"
      }
    ],
    featuredReviews: [
      {
        author: "Mariusz Krzesaj",
        badge: "Lokalny przewodnik · 52 opinie · 73 zdjęcia",
        source: "Opinia z Google",
        rating: 5,
        date: "4 miesiące temu",
        text: "Współpraca z tym notariuszem to wzór profesjonalnego podejścia do klienta. Od samego początku otrzymałem rzeczowe wsparcie, a Pan Notariusz wykazał się ogromną wiedzą merytoryczną, co było kluczowe przy analizie mojej sprawy. Miałem do czynienia z bardzo skomplikowaną umową, która zawierała wiele niejasnych zapisów. Pan Notariusz poświęcił czas na dokładne przeanalizowanie każdego paragrafu, wyjaśniając mi konsekwencje prawne poszczególnych punktów w sposób zrozumiały i konkretny. Dzięki jego skrupulatności i uwadze skupionej na zabezpieczeniu moich interesów, uniknąłem niepotrzebnego ryzyka, a cała transakcja została sfinalizowana w sposób bezpieczny i poprawny prawnie. Doceniam fakt, że każde moje pytanie spotkało się z pełnym zaangażowaniem i cierpliwością."
      }
    ]
  },
  fees: {
    heading: "Opłaty i rachunki",
    lead: "Informacje o kosztach czynności notarialnych, sposobach płatności i rachunkach bankowych kancelarii.",
    cards: [
      {
        id: "notary-fees",
        title: "Opłaty notarialne",
        desc: "Struktura kosztów czynności notarialnej — podatki, opłaty sądowe i wynagrodzenie notariusza.",
        bullets: [
          "Podatki i opłaty rejestracyjne",
          "Opłaty sądowe",
          "Wynagrodzenie notariusza"
        ],
        cta: "Przejdź do opłat →"
      },
      {
        id: "payments-accounts",
        title: "Płatności i rachunki",
        desc: "Formy płatności oraz numery rachunków bankowych — podstawowego i depozytowego.",
        bullets: [
          "Przelew, gotówka, karta, BLIK",
          "Rachunek podstawowy",
          "Rachunek depozytów notarialnych"
        ],
        cta: "Przejdź do rachunków →"
      }
    ]
  },
  contact: {
    heading: "Skontaktuj się z kancelarią",
    subheading: "Jesteśmy do Twojej dyspozycji",
    lead: "Poniżej znajdują się wszystkie niezbędne informacje kontaktowe.",
    schedule: [
      { day: "Poniedziałek", hours: "9:00 – 17:00" },
      { day: "Wtorek", hours: "10:00 – 18:00" },
      { day: "Środa", hours: "9:00 – 17:00" },
      { day: "Czwartek", hours: "10:00 – 18:00" },
      { day: "Piątek", hours: "9:00 – 17:00" },
      { day: "Sobota, niedziela i święta", hours: "po wcześniejszym uzgodnieniu" }
    ],
    extraScheduleNote: "Inne terminy po wcześniejszym uzgodnieniu",
    consultationsHeading: "Godziny konsultacji online i telefonicznych",
    consultationsHours: "Codziennie 8:00 – 20:00"
  },
  directions: {
    heading: "Adres i mapa dojazdu",
    subheading: "Kancelaria w Siechnicach",
    lead: "Zobacz nasz adres i mapę. Kancelaria znajduje się w centrum Siechnic, w wygodnej lokalizacji blisko Urzędu Miejskiego Siechnic.",
    addressTitle: "Adres",
    addressLines: ["ul. marsz. Józefa Piłsudskiego 22 lok. 2a", "55-011 Siechnice"],
    car: {
      title: "Samochodem",
      desc: "Bezpłatny parking przy ul. Piłsudskiego przed kancelarią."
    },
    mobileNotary: {
      title: "Możliwość dojazdu",
      desc: "Możliwość dojazdu do klienta w celu podpisania dokumentów notarialnych w szczególnie uzasadnionych przypadkach."
    },
    transit: {
      title: "Komunikacja miejska",
      trainsTitle: "Przystanki kolejowe",
      trains: [
        { name: "Siechnice", distance: "700 m" },
        { name: "Święta Katarzyna", distance: "3 km" }
      ],
      buses: "autobusy linii: 83, 84, 85 oraz 80, 81, 89"
    }
  },
  privacyPolicy: {
    heading: "Polityka prywatności",
    subheading: "Polityka prywatności: KLAUZULA INFORMACYJNA DLA KLIENTA KANCELARII NOTARIALNEJ",
    points: [
      "1. Notariusz Piotr Suzanowicz prowadzący Kancelarię Notarialną Piotr Suzanowicz notariusz w Siechnicach (55-011), przy ulicy Marsz. J. Piłsudskiego 22 lok. 2a otrzymał od Państwa informacje stanowiące dane osobowe. Będzie z nich korzystał wyłącznie do celów związanych z realizacją czynności notarialnych podejmowanych na Państwa życzenie. Będzie ich również używał w ramach wykonywania obowiązków wynikających z odrębnych przepisów związanych z tymi czynnościami (np. pobranie opłat sądowych i podatku).",
      "2. Działania Notariusza podejmowane są na podstawie przepisów prawa nakładających na niego obowiązki związane z wykonywaną funkcją i zadaniami (spełnia to wymogi art. 6 ust. 1 lit. b i e oraz art. 9 ust. 2 lit. g, f oraz j Ogólnego Rozporządzenia o Ochronie Danych 2016/679 - RODO).",
      "3. Szczegółowy zakres obowiązków Notariusza definiują przepisy prawa powszechnie obowiązującego, a zwłaszcza ustawa z dnia 14 lutego 1991 r. – Prawo o notariacie, t.j. Dz. U. z 2017 r. poz. 2291 z późn. zm.",
      "4. Notariusz przekazywał będzie Państwa dane osobowe organom publicznym (np. sądom i organom skarbowym) w zakresie realizacji obowiązków prawnych. Państwa dane osobowe otrzymywać będzie również biuro rachunkowe, z którym Notariusz związany jest umową o świadczenie usług księgowych.",
      "5. Notariusz ma obowiązek prawny przechowywania Państwa danych osobowych przez okres 10 lat od momentu zakończenia czynności notarialnej, w związku z którą otrzymał te dane.",
      "6. Informacje stanowiące Państwa dane osobowe są wykorzystywane przez Notariusza w związku z istniejącymi wymogami ustawowymi. Oznacza to, że mają Państwo obowiązek podania danych osobowych niezbędnych do prawidłowego (zgodnego z prawem) wykonania czynności notarialnych. Odmowa przekazania tych informacji Notariusowi uniemożliwia przeprowadzenie czynności notarialnych.",
      "7. Zgodnie z obowiązującym prawem mają Państwo możliwość dostępu do informacji stanowiących Państwa dane osobowe. Możecie Państwo również dokonać ich sprostowania lub zażądać ich usunięcia, jeżeli jest to przewidziane przez przepisy ustawy – Prawo o notariacie.",
      "8. Jeżeli będą Państwo mieli pytania lub wątpliwości związane z działaniami Notariusza, które dotyczyć będą informacji będących Państwa danymi osobowymi, mogą Państwo przesłać je na adres poczty elektronicznej: suzanowicz@siechnice-notariusz.pl",
      "9. Jeżeli będą Państwo mieli zastrzeżenia związane z działaniami Notariusza, które dotyczyć będą informacji będących Państwa danymi osobowymi, mogą Państwo zwrócić się ze skargą do Prezesa Urzędu Ochrony Danych Osobowych."
    ]
  },
  copyright: "© 2026 Kancelaria Notarialna Piotra Suzanowicza. Wszelkie prawa zastrzeżone."
};

function NotaryLogo({ size = "md", className = "" }) {
  const dimensions = {
    sm: { wrapper: "px-3.5 py-2 rounded-lg", svgW: 165, svgH: 40 },
    md: { wrapper: "px-5 py-3 rounded-xl", svgW: 230, svgH: 56 },
    lg: { wrapper: "px-8 py-6 rounded-2xl", svgW: 360, svgH: 88 }
  }[size] || { wrapper: "px-5 py-3 rounded-xl", svgW: 230, svgH: 56 };

  return (
    <div
      className={`inline-flex items-center justify-center bg-[#0D254C] border border-[#7E97B8]/30 shadow-md select-none ${dimensions.wrapper} ${className}`}
      aria-label="Piotr Suzanowicz Notariusz"
    >
      <svg
        width={dimensions.svgW}
        height={dimensions.svgH}
        viewBox="0 0 640 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto h-auto max-w-full"
      >
        <g transform="translate(22, 14)">
          <line x1="12" y1="8" x2="12" y2="62" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          <line x1="52" y1="8" x2="52" y2="62" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          <line x1="12" y1="62" x2="52" y2="62" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          <line x1="32" y1="30" x2="32" y2="62" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" />
          <circle cx="32" cy="24" r="3.5" fill="#FFFFFF" />
          <path
            d="M17 65 H47 L54 96 L33.5 130 L33.5 92 C35.5 91.2 37 89.2 37 86.8 C37 83.8 34.8 81.5 32 81.5 C29.2 81.5 27 83.8 27 86.8 C27 89.2 28.5 91.2 30.5 92 L30.5 130 L10 96 L17 65 Z"
            fill="#FFFFFF"
          />
        </g>

        <line x1="104" y1="26" x2="104" y2="134" stroke="#7E97B8" strokeWidth="2.5" strokeLinecap="round" />

        <text
          x="132"
          y="86"
          fill="#FFFFFF"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="43"
          fontWeight="500"
          letterSpacing="5.5"
        >
          PIOTR SUZANOWICZ
        </text>
        <text
          x="375"
          y="124"
          textAnchor="middle"
          fill="#7E97B8"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="23"
          fontWeight="500"
          letterSpacing="8"
        >
          NOTARIUSZ
        </text>
      </svg>
    </div>
  );
}

function CopyButton({ text, label = "Kopiuj", light = false }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
        copied
          ? "bg-emerald-600 text-white"
          : light
          ? "bg-[#0D254C] hover:bg-[#173970] text-white"
          : "bg-[#163566] hover:bg-[#1E4482] text-white border border-[#7E97B8]/40"
      }`}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      <span>{copied ? "Skopiowano" : label}</span>
    </button>
  );
}

function OfficeStatusBadge() {
  const [status, setStatus] = useState({ open: false, text: "Konsultacje: 8:00–20:00" });

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours() + now.getMinutes() / 60;

      let officeOpen = false;
      let closingHour = "";

      if (day === 1 || day === 3 || day === 5) {
        if (hour >= 9 && hour < 17) {
          officeOpen = true;
          closingHour = "17:00";
        }
      } else if (day === 2 || day === 4) {
        if (hour >= 10 && hour < 18) {
          officeOpen = true;
          closingHour = "18:00";
        }
      }

      if (officeOpen) {
        setStatus({ open: true, text: `Kancelaria otwarta do ${closingHour}` });
      } else if (hour >= 8 && hour < 20) {
        setStatus({ open: true, text: "Konsultacje telefoniczne i online do 20:00" });
      } else {
        setStatus({ open: false, text: "Konsultacje codziennie 8:00–20:00" });
      }
    };

    checkStatus();
    const timer = setInterval(checkStatus, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#163566] text-white border border-[#7E97B8]/40">
      <span className={`w-2 h-2 rounded-full ${status.open ? "bg-emerald-400 animate-pulse" : "bg-[#7E97B8]"}`} />
      {status.text}
    </span>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [serviceQuery, setServiceQuery] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const navigate = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredServices = useMemo(() => {
    const q = serviceQuery.trim().toLowerCase();
    if (!q) return NOTARY_DATA.services.items;
    return NOTARY_DATA.services.items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.num.includes(q)
    );
  }, [serviceQuery]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 5000);
    setContactForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* Górny pasek informacyjny */}
      <div className="bg-[#0D254C] text-white border-b border-[#7E97B8]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <OfficeStatusBadge />
            <span className="text-white font-medium">
              Poniedziałek, środa, piątek: <strong className="font-bold">9:00–17:00</strong>
            </span>
            <span className="hidden sm:inline text-[#7E97B8]">•</span>
            <span className="text-white font-medium">
              Wtorek, czwartek: <strong className="font-bold">10:00–18:00</strong>
            </span>
            <span className="hidden md:inline text-[#7E97B8]">•</span>
            <span className="hidden md:inline text-[#B9CBE3]">Inne terminy</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span className="text-[#B9CBE3] font-medium">
              Konsultacje: <strong className="text-white font-bold">{NOTARY_DATA.header.consultations}</strong>
            </span>
            <div className="flex items-center gap-4">
              <a
                href={`tel:${NOTARY_DATA.header.phoneRaw}`}
                className="inline-flex items-center gap-1.5 font-bold text-white hover:text-[#B9CBE3] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#7E97B8]" />
                {NOTARY_DATA.header.phone}
              </a>
              <a
                href={`mailto:${NOTARY_DATA.header.email}`}
                className="hidden sm:inline-flex items-center gap-1.5 font-medium text-white hover:text-[#B9CBE3] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#7E97B8]" />
                {NOTARY_DATA.header.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Główna nawigacja o wysokim kontraście (WCAG AAA) */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-[#0D254C]/15 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate("home")}
            className="text-left focus:outline-none group shrink-0"
          >
            <NotaryLogo size="sm" className="group-hover:border-[#0D254C] transition-all" />
          </button>

          {/* Menu desktopowe — wyraźny ciemny granat na jasnym tle */}
          <nav className="hidden xl:flex items-center gap-1.5" aria-label="Główna nawigacja">
            {NOTARY_DATA.navigation.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(item.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-[15px] font-semibold transition-all border ${
                    isActive
                      ? "bg-[#0D254C] text-white border-[#0D254C] shadow-sm"
                      : "bg-white text-[#0D254C] border-transparent hover:bg-[#0D254C]/10 hover:border-[#0D254C]/30"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                        isActive
                          ? "bg-white text-[#0D254C] border-white"
                          : "bg-amber-100 text-amber-950 border-amber-400"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Szybki przycisk telefonu i hamburger mobilny */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={`tel:${NOTARY_DATA.header.phoneRaw}`}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0D254C] hover:bg-[#173970] text-white text-sm font-bold shadow-sm transition-colors"
            >
              <Phone className="w-4 h-4 text-[#B9CBE3]" />
              <span>{NOTARY_DATA.header.phone}</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-lg bg-[#0D254C] text-white hover:bg-[#173970] transition-colors"
              aria-label="Otwórz menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menu mobilne o wysokim kontraście */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-t-2 border-[#0D254C]/15 px-4 py-4 space-y-2 shadow-xl">
            {NOTARY_DATA.navigation.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-bold transition-colors border ${
                    isActive
                      ? "bg-[#0D254C] text-white border-[#0D254C]"
                      : "bg-slate-50 text-[#0D254C] border-slate-200 hover:bg-[#0D254C]/10"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                        isActive
                          ? "bg-white text-[#0D254C] border-white"
                          : "bg-amber-100 text-amber-950 border-amber-400"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Główna zawartość zakładek */}
      <main className="flex-1">
        {/* ================= 1. STRONA GŁÓWNA ================= */}
        {activeTab === "home" && (
          <div>
            <section className="relative bg-[#0D254C] text-white overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1E437A_0%,transparent_55%)] opacity-80" />
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
                <div className="grid lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-7 space-y-7">
                    <div>
                      <NotaryLogo size="lg" className="border-[#7E97B8]/40 bg-[#091B38]/90 shadow-2xl" />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#B9CBE3]">
                        <Scale className="w-4 h-4" />
                        {NOTARY_DATA.header.subtitle}
                      </span>
                      <button
                        type="button"
                        onClick={() => navigate("reviews")}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs font-bold hover:bg-amber-400/30 transition-colors"
                      >
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>4,9 / 5 w Google (32 opinie)</span>
                      </button>
                    </div>

                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-white">
                      {NOTARY_DATA.home.welcomeHeading}
                    </h1>

                    <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
                      {NOTARY_DATA.home.lead}
                    </p>

                    <div className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-[#163566] border border-[#7E97B8]/40 text-sm font-medium text-white">
                      <ShieldCheck className="w-5 h-5 text-[#B9CBE3] shrink-0" />
                      <span>{NOTARY_DATA.home.freeAdviceNote}</span>
                    </div>

                    <div className="pt-1 flex flex-wrap gap-4">
                      <button
                        type="button"
                        onClick={() => navigate("services")}
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#0D254C] font-bold text-sm transition-all shadow-lg"
                      >
                        <span>Zakres usług</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate("contact")}
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#163566] hover:bg-[#1E4482] text-white font-semibold text-sm border border-[#7E97B8]/50 transition-all"
                      >
                        <span>Skontaktuj się z kancelarią</span>
                      </button>
                    </div>
                  </div>

                  {/* Prawa karta informacyjna */}
                  <div className="lg:col-span-5">
                    <div className="bg-[#091B38]/95 backdrop-blur-md border border-[#7E97B8]/35 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
                      <div className="flex items-start justify-between border-b border-[#7E97B8]/25 pb-5">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-[#B9CBE3] font-bold">
                            Kancelaria Notarialna
                          </p>
                          <h2 className="font-serif text-2xl font-semibold text-white mt-1">
                            {NOTARY_DATA.header.notaryName}
                          </h2>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-[#163566] border border-[#7E97B8]/40 flex items-center justify-center text-[#B9CBE3]">
                          <Landmark className="w-5 h-5" />
                        </div>
                      </div>

                      <div className="space-y-3 text-sm">
                        <div className="text-xs uppercase tracking-wider text-[#B9CBE3] font-bold">
                          Godziny urzędowania
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-[#7E97B8]/20">
                          <span className="text-slate-200">Poniedziałek, środa, piątek</span>
                          <span className="font-bold text-white">9:00–17:00</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-[#7E97B8]/20">
                          <span className="text-slate-200">Wtorek, czwartek</span>
                          <span className="font-bold text-white">10:00–18:00</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-[#7E97B8]/20">
                          <span className="text-slate-200">Inne terminy</span>
                          <span className="font-medium text-[#B9CBE3]">po wcześniejszym uzgodnieniu</span>
                        </div>
                        <div className="flex justify-between py-1.5">
                          <span className="text-slate-200">Konsultacje</span>
                          <span className="font-bold text-white">codziennie 8:00–20:00</span>
                        </div>
                      </div>

                      <div className="pt-2 space-y-3">
                        <div className="flex items-start gap-3 text-sm text-slate-200">
                          <MapPin className="w-4 h-4 text-[#B9CBE3] shrink-0 mt-1" />
                          <span>
                            ul. Marsz. Józefa Piłsudskiego 22 lok. 2a
                            <br />
                            55-011 Siechnice
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          <a
                            href={`tel:${NOTARY_DATA.header.phoneRaw}`}
                            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white text-[#0D254C] hover:bg-slate-100 text-xs font-bold transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>{NOTARY_DATA.header.phone}</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => navigate("directions")}
                            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#163566] hover:bg-[#1E4482] text-white text-xs font-bold border border-[#7E97B8]/40 transition-colors"
                          >
                            <MapPin className="w-3.5 h-3.5 text-[#B9CBE3]" />
                            <span>Adres i mapa dojazdu</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Szybki przegląd głównych kategorii usług */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0D254C]">
                    Czynności notarialne
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-[#0D254C] mt-1">
                    Zakres usług kancelarii
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("services")}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0D254C] hover:text-[#1E4482] transition-colors"
                >
                  <span>Zobacz wszystkie 21 kategorii czynności</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {NOTARY_DATA.services.items.slice(0, 6).map((service) => (
                  <div
                    key={service.num}
                    onClick={() => {
                      setSelectedService(service);
                      navigate("services");
                    }}
                    className="group cursor-pointer bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#0D254C] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold tracking-widest text-[#0D254C] bg-[#0D254C]/10 px-2.5 py-1 rounded-md">
                          {service.num}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-[#0D254C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-[#0D254C] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-700 mt-2.5 leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Sekcja zaufania i opinii na stronie głównej */}
            <section className="bg-white border-y border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#0D254C]">
                      Zaufanie klientów
                    </span>
                    <h2 className="font-serif text-3xl font-bold text-[#0D254C] mt-1">
                      Opinie o kancelarii
                    </h2>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0D254C] text-white text-sm font-bold">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      Google: 4,9 / 5 (32 opinie)
                    </span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-[#0D254C] border border-slate-300 text-sm font-bold">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      Infobel: 4,9 / 5 (30 opinii)
                    </span>
                  </div>
                </div>

                {NOTARY_DATA.reviews.featuredReviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F8FAFC] rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    <div className="space-y-3 max-w-4xl">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-1 text-amber-500">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-[#0D254C]">{review.author}</span>
                        <span className="text-xs text-slate-600">{review.badge}</span>
                        <span className="text-xs font-semibold text-slate-600">• {review.date}</span>
                      </div>
                      <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
                        „{review.text}”
                      </p>
                    </div>
                    <div className="shrink-0">
                      <button
                        type="button"
                        onClick={() => navigate("reviews")}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0D254C] hover:bg-[#173970] text-white text-sm font-bold transition-colors"
                      >
                        <span>Zobacz zakładkę Opinie</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Skrót sekcji O mnie i Dojazd */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 border border-slate-200 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0D254C]">
                    Notariusz Piotr Suzanowicz
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#0D254C]">
                    Kompetencje i doświadczenie zawodowe
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {NOTARY_DATA.about.intro}
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("about")}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0D254C] hover:text-[#1E4482] pt-2"
                  >
                    <span>Czytaj więcej o doświadczeniu zawodowym</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-slate-200 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0D254C]">
                    Kancelaria w Siechnicach
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#0D254C]">
                    Lokalizacja i dogodny dojazd
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {NOTARY_DATA.directions.lead}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1 text-xs font-semibold text-[#0D254C]">
                    <span className="px-3 py-1.5 rounded-lg bg-[#0D254C]/10 border border-[#0D254C]/20">
                      Bezpłatny parking przed kancelarią
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-[#0D254C]/10 border border-[#0D254C]/20">
                      PKP Siechnice 700 m
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("directions")}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0D254C] hover:text-[#1E4482] pt-2"
                  >
                    <span>Sprawdź adres i mapę dojazdu</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ================= 2. O MNIE ================= */}
        {activeTab === "about" && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
            <div className="bg-[#0D254C] text-white rounded-2xl p-8 sm:p-10 shadow-lg space-y-6">
              <NotaryLogo size="md" className="border-[#7E97B8]/40 bg-[#091B38]" />
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#B9CBE3]">
                  Kancelaria Notarialna · Siechnice
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">
                  {NOTARY_DATA.about.title}
                </h1>
                <p className="text-lg text-[#B9CBE3] mt-2 font-medium">
                  {NOTARY_DATA.about.subtitle}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
              <p className="text-base text-slate-800 leading-relaxed font-medium bg-[#0D254C]/5 p-5 rounded-xl border-l-4 border-[#0D254C]">
                {NOTARY_DATA.about.intro}
              </p>

              <div className="pt-2 space-y-4">
                <h2 className="font-serif text-2xl font-bold text-[#0D254C]">
                  {NOTARY_DATA.about.sectionHeading}
                </h2>
                {NOTARY_DATA.about.paragraphs.map((paragraph, idx) => (
                  <p key={idx} className="text-base text-slate-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200">
                <p className="text-slate-700">{NOTARY_DATA.about.closing}</p>
                <p className="font-serif text-2xl font-bold text-[#0D254C] mt-1">
                  {NOTARY_DATA.about.signature}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#0D254C] font-bold">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                  <span>Ocena 4,9 / 5 w Google (32 opinie) oraz Infobel (30 opinii)</span>
                </div>
                <p className="text-sm text-slate-600">
                  Sprawdź zweryfikowane opinie klientów o współpracy z kancelarią.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate("reviews")}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0D254C] hover:bg-[#173970] text-white text-sm font-bold shrink-0 transition-colors"
              >
                <span>Przejdź do opinii</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        )}

        {/* ================= 3. ZAKRES USŁUG ================= */}
        {activeTab === "services" && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <span className="text-xs font-bold uppercase tracking-widest text-[#0D254C]">
                  {NOTARY_DATA.header.subtitle}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0D254C] mt-2">
                  {NOTARY_DATA.services.heading}
                </h1>
                <p className="text-base text-slate-700 mt-3 leading-relaxed">
                  {NOTARY_DATA.services.lead}
                </p>
              </div>

              <div className="w-full lg:w-80 relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={serviceQuery}
                  onChange={(e) => setServiceQuery(e.target.value)}
                  placeholder="Szukaj czynności (np. spadek, spółka)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#0D254C]"
                />
              </div>
            </div>

            {selectedService && (
              <div className="bg-[#0D254C] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-lg">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B9CBE3]">
                    <span>Wybrana czynność nr {selectedService.num}</span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-white">
                    {selectedService.title}
                  </h2>
                  <p className="text-sm text-slate-200 max-w-3xl leading-relaxed">
                    {selectedService.desc}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => navigate("contact")}
                    className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-[#0D254C] text-sm font-bold transition-colors"
                  >
                    Zapytaj o dokumenty
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className="px-4 py-2.5 rounded-xl bg-[#163566] hover:bg-[#1E4482] text-white text-sm font-medium border border-[#7E97B8]/40 transition-colors"
                  >
                    Zamknij podgląd
                  </button>
                </div>
              </div>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <div
                  key={service.num}
                  onClick={() => {
                    setSelectedService(service);
                    window.scrollTo({ top: 140, behavior: "smooth" });
                  }}
                  className={`group cursor-pointer bg-white rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                    selectedService?.num === service.num
                      ? "border-[#0D254C] ring-2 ring-[#0D254C]/25 shadow-md"
                      : "border-slate-200 hover:border-[#0D254C] shadow-sm hover:shadow-md"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold tracking-widest text-[#0D254C] bg-[#0D254C]/10 px-2.5 py-1 rounded-md">
                        {service.num}
                      </span>
                      <span className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#0D254C] flex items-center justify-center text-[#0D254C] group-hover:text-white transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#0D254C]">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-700 mt-2.5 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
                <p className="text-slate-700 text-sm">
                  Brak wyników dla frazy „{serviceQuery}”. Wyczyść wyszukiwanie, aby zobaczyć wszystkie 21 czynności.
                </p>
                <button
                  type="button"
                  onClick={() => setServiceQuery("")}
                  className="mt-4 px-4 py-2 rounded-lg bg-[#0D254C] text-white text-xs font-bold"
                >
                  Pokaż wszystkie usługi
                </button>
              </div>
            )}

            <div className="bg-[#0D254C] text-white rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <p className="text-base font-medium text-white max-w-3xl leading-relaxed">
                {NOTARY_DATA.services.footerPrompt}
              </p>
              <div className="flex flex-wrap gap-3 shrink-0">
                <a
                  href={`tel:${NOTARY_DATA.header.phoneRaw}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-[#0D254C] text-sm font-bold transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{NOTARY_DATA.header.phone}</span>
                </a>
                <button
                  type="button"
                  onClick={() => navigate("contact")}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#163566] hover:bg-[#1E4482] text-white text-sm font-bold border border-[#7E97B8]/40 transition-colors"
                >
                  <span>Formularz kontaktowy</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ================= 4. OPINIE ================= */}
        {activeTab === "reviews" && (
          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
            <div className="bg-[#0D254C] text-white rounded-2xl p-8 sm:p-10 shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <NotaryLogo size="sm" className="border-[#7E97B8]/40 bg-[#091B38]" />
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white pt-2">
                  {NOTARY_DATA.reviews.heading}
                </h1>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  {NOTARY_DATA.reviews.lead}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 shrink-0">
                {NOTARY_DATA.reviews.platforms.map((platform) => (
                  <div
                    key={platform.name}
                    className="bg-[#091B38] border border-[#7E97B8]/40 rounded-xl p-4 flex items-center justify-between gap-5"
                  >
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[#B9CBE3]">
                        {platform.name}
                      </div>
                      <div className="font-serif text-2xl font-bold text-white mt-0.5">
                        {platform.rating}
                      </div>
                      <div className="text-xs text-slate-300 mt-0.5">{platform.count}</div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              {NOTARY_DATA.reviews.featuredReviews.map((review, index) => (
                <article
                  key={index}
                  className="bg-white rounded-2xl p-7 sm:p-9 border border-slate-200 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-lg font-bold text-[#0D254C]">{review.author}</h2>
                      <p className="text-xs text-slate-600 mt-0.5">{review.badge}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-[#0D254C]/10 text-[#0D254C] text-xs font-bold">
                        {review.source}
                      </span>
                      <span className="text-xs text-slate-600 font-medium">{review.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                    <span className="ml-2 text-xs font-bold text-[#0D254C]">5 / 5</span>
                  </div>

                  <p className="text-base text-slate-800 leading-relaxed">
                    „{review.text}”
                  </p>
                </article>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-bold text-[#0D254C]">
                  Wszystkie 32 opinie w wizytówce Google
                </h3>
                <p className="text-sm text-slate-700">
                  Pełna lista zweryfikowanych ocen oraz możliwość dodania własnej opinii po wizycie w kancelarii.
                </p>
              </div>
              <a
                href={NOTARY_DATA.reviews.googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0D254C] hover:bg-[#173970] text-white text-sm font-bold shrink-0 transition-colors"
              >
                <span>Otwórz opinie w Google</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </section>
        )}

        {/* ================= 5. OPŁATY ================= */}
        {activeTab === "fees" && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0D254C]">
                {NOTARY_DATA.header.subtitle}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0D254C] mt-2">
                {NOTARY_DATA.fees.heading}
              </h1>
              <p className="text-base text-slate-700 mt-3 leading-relaxed">
                {NOTARY_DATA.fees.lead}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {NOTARY_DATA.fees.cards.map((card, idx) => (
                <div
                  key={card.id}
                  className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0D254C]/10 text-[#0D254C] flex items-center justify-center">
                      {idx === 0 ? <FileText className="w-6 h-6" /> : <CreditCard className="w-6 h-6" />}
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-[#0D254C]">
                      {card.title}
                    </h2>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {card.desc}
                    </p>
                    <ul className="space-y-2.5 pt-2">
                      {card.bullets.map((b, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-sm font-semibold text-[#0D254C]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0D254C]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <a
                      href={idx === 0 ? "#struktura-oplat" : "#rachunki-bankowe"}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#0D254C] hover:text-[#1E4482] transition-colors"
                    >
                      <span>{card.cta}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div id="struktura-oplat" className="bg-white rounded-2xl p-8 border border-slate-200 space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#0D254C]">
                Opłaty notarialne — składowe kosztów czynności
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-5 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0D254C]">01</div>
                  <h4 className="font-bold text-[#0D254C]">Podatki i opłaty rejestracyjne</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Podatek od czynności cywilnoprawnych (PCC) oraz podatek od spadków i darowizn pobierane i odprowadzane przez notariusza jako płatnika.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0D254C]">02</div>
                  <h4 className="font-bold text-[#0D254C]">Opłaty sądowe</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Opłaty sądowe za wnioski wieczystoksięgowe składane przez notariusza za pośrednictwem systemu teleinformatycznego.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0D254C]">03</div>
                  <h4 className="font-bold text-[#0D254C]">Wynagrodzenie notariusza</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Taksa notarialna ustalana na podstawie przepisów rozporządzenia Ministra Sprawiedliwości w sprawie maksymalnych stawek taksy notarialnej.
                  </p>
                </div>
              </div>
            </div>

            <div id="rachunki-bankowe" className="bg-[#0D254C] text-white rounded-2xl p-8 sm:p-10 space-y-6 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#7E97B8]/30 pb-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Płatności i numery kont bankowych kancelarii
                  </h3>
                  <p className="text-sm text-slate-200 mt-1">
                    Akceptowane formy płatności: <strong className="text-white">Przelew, gotówka, karta, BLIK</strong>
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#163566] border border-[#7E97B8]/40 text-xs font-bold text-white">
                  <CreditCard className="w-4 h-4 text-[#B9CBE3]" />
                  Przelew · Gotówka · Karta · BLIK
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {NOTARY_DATA.company.accounts.map((acc) => (
                  <div
                    key={acc.id}
                    className="bg-[#091B38] border border-[#7E97B8]/35 rounded-xl p-5 flex flex-col justify-between gap-4"
                  >
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[#B9CBE3]">
                        {acc.label}
                      </div>
                      <div className="font-mono text-base sm:text-lg font-bold text-white mt-2 tracking-wide">
                        {acc.number}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-[#7E97B8]/20">
                      <span className="text-xs text-slate-300">{NOTARY_DATA.company.firm}</span>
                      <CopyButton text={acc.number} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ================= 6. KONTAKT ================= */}
        {activeTab === "contact" && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
            <div className="max-w-3xl space-y-4">
              <NotaryLogo size="sm" />
              <div className="text-xs font-bold uppercase tracking-widest text-[#0D254C] pt-2">
                {NOTARY_DATA.contact.subheading}
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0D254C]">
                {NOTARY_DATA.contact.heading}
              </h1>
              <p className="text-base text-slate-700 leading-relaxed">
                {NOTARY_DATA.contact.lead}
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-white rounded-2xl p-7 border border-slate-200 space-y-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0D254C]/10 text-[#0D254C] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-600">Adres</div>
                      <div className="font-bold text-[#0D254C] mt-1">
                        ul. marsz. Józefa Piłsudskiego 22 lok. 2a, 55-011 Siechnice
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-[#0D254C]/10 text-[#0D254C] flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="flex-1 flex items-center justify-between gap-2">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-600">Telefon</div>
                        <a
                          href={`tel:${NOTARY_DATA.header.phoneRaw}`}
                          className="font-bold text-[#0D254C] hover:text-[#1E4482] text-lg mt-0.5 block"
                        >
                          {NOTARY_DATA.header.phone}
                        </a>
                      </div>
                      <CopyButton text={NOTARY_DATA.header.phone} light />
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-[#0D254C]/10 text-[#0D254C] flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex-1 flex items-center justify-between gap-2 flex-wrap">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-600">E-mail</div>
                        <a
                          href={`mailto:${NOTARY_DATA.header.email}`}
                          className="font-bold text-[#0D254C] hover:text-[#1E4482] mt-0.5 block break-all"
                        >
                          {NOTARY_DATA.header.email}
                        </a>
                      </div>
                      <CopyButton text={NOTARY_DATA.header.email} light />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-7 border border-slate-200 space-y-4 shadow-sm">
                  <div className="flex items-center gap-2.5 text-[#0D254C]">
                    <Clock className="w-5 h-5 text-[#0D254C]" />
                    <h2 className="font-serif text-xl font-bold">Godziny urzędowania</h2>
                  </div>

                  <div className="divide-y divide-slate-100 text-sm">
                    {NOTARY_DATA.contact.schedule.map((row, idx) => (
                      <div key={idx} className="py-2.5 flex justify-between gap-4">
                        <span className="text-slate-700 font-medium">{row.day}</span>
                        <span className="font-bold text-[#0D254C] text-right">{row.hours}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-xs font-semibold text-slate-700">
                    {NOTARY_DATA.contact.extraScheduleNote}
                  </div>

                  <div className="p-4 rounded-xl bg-[#0D254C] text-white flex items-center justify-between gap-4">
                    <span className="text-xs font-bold text-[#B9CBE3]">
                      {NOTARY_DATA.contact.consultationsHeading}
                    </span>
                    <span className="text-sm font-bold text-white shrink-0">
                      {NOTARY_DATA.contact.consultationsHours}
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200 shadow-sm">
                  <h2 className="font-serif text-2xl font-bold text-[#0D254C] mb-2">
                    Wyślij wiadomość do kancelarii
                  </h2>
                  <p className="text-sm text-slate-700 mb-6">
                    Porady i informacje udzielane przez notariusza w związku z dokonywaną czynnością są darmowe.
                  </p>

                  {formSent && (
                    <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm font-medium">
                      Dziękujemy za wiadomość. Kancelaria skontaktuje się z Państwem niezwłocznie.
                    </div>
                  )}

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                        Imię i nazwisko
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0D254C]"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                          Adres e-mail
                        </label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0D254C]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                          Numer telefonu
                        </label>
                        <input
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0D254C]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                        Treść wiadomości
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0D254C]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#0D254C] hover:bg-[#173970] text-white font-bold text-sm transition-colors shadow-md"
                    >
                      <Send className="w-4 h-4 text-[#B9CBE3]" />
                      <span>Wyślij wiadomość</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= 7. DOJAZD ================= */}
        {activeTab === "directions" && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0D254C]">
                {NOTARY_DATA.directions.subheading}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0D254C] mt-2">
                {NOTARY_DATA.directions.heading}
              </h1>
              <p className="text-base text-slate-700 mt-3 leading-relaxed">
                {NOTARY_DATA.directions.lead}
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-5">
                <div className="bg-[#0D254C] text-white rounded-2xl p-6 space-y-3 shadow-md">
                  <div className="flex items-center gap-2.5 text-[#B9CBE3] text-xs font-bold uppercase tracking-wider">
                    <MapPin className="w-4 h-4" />
                    <span>{NOTARY_DATA.directions.addressTitle}</span>
                  </div>
                  <div className="font-serif text-2xl font-bold text-white leading-snug">
                    {NOTARY_DATA.directions.addressLines[0]}
                    <br />
                    {NOTARY_DATA.directions.addressLines[1]}
                  </div>
                  <div className="pt-2">
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=ul.+Marsz.+J%C3%B3zefa+Pi%C5%82sudskiego+22+lok.+2a,+55-011+Siechnice"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-[#0D254C] text-xs font-bold transition-colors"
                    >
                      <span>Otwórz nawigację w Google Maps</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0D254C]/10 text-[#0D254C] flex items-center justify-center shrink-0">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-[#0D254C]">{NOTARY_DATA.directions.car.title}</h2>
                    <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                      {NOTARY_DATA.directions.car.desc}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0D254C]/10 text-[#0D254C] flex items-center justify-center shrink-0">
                      <Train className="w-5 h-5" />
                    </div>
                    <h2 className="font-bold text-[#0D254C]">{NOTARY_DATA.directions.transit.title}</h2>
                  </div>

                  <div className="space-y-2 pl-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      {NOTARY_DATA.directions.transit.trainsTitle}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {NOTARY_DATA.directions.transit.trains.map((t, i) => (
                        <div key={i} className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200">
                          <div className="text-sm font-bold text-[#0D254C]">{t.name}</div>
                          <div className="text-xs font-bold text-slate-700 mt-0.5">{t.distance}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100 text-sm text-slate-800">
                    <Bus className="w-4 h-4 text-[#0D254C] shrink-0" />
                    <span className="font-semibold">{NOTARY_DATA.directions.transit.buses}</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0D254C]/10 text-[#0D254C] flex items-center justify-center shrink-0">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-[#0D254C]">
                      {NOTARY_DATA.directions.mobileNotary.title}
                    </h2>
                    <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                      {NOTARY_DATA.directions.mobileNotary.desc}
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm h-full min-h-[460px] flex flex-col">
                  <iframe
                    title="Mapa dojazdu - Kancelaria Notarialna Piotr Suzanowicz Siechnice"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=17.1395%2C51.0285%2C17.1555%2C51.0365&layer=mapnik&marker=51.0325%2C17.1475"
                    className="w-full flex-1 rounded-xl border-0 min-h-[430px]"
                    loading="lazy"
                  />
                  <div className="px-3 pt-3 pb-1 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                    <span>ul. Marsz. Józefa Piłsudskiego 22 lok. 2a, 55-011 Siechnice</span>
                    <a
                      href="https://www.openstreetmap.org/?mlat=51.0325&mlon=17.1475#map=17/51.0325/17.1475"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#0D254C] hover:underline"
                    >
                      Powiększ mapę ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= 8. POLITYKA PRYWATNOŚCI ================= */}
        {activeTab === "privacy" && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0D254C]">
                Informacje prawne i RODO
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0D254C] mt-2">
                {NOTARY_DATA.privacyPolicy.heading}
              </h1>
              <p className="text-sm font-bold text-slate-800 mt-3">
                {NOTARY_DATA.privacyPolicy.subheading}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-4">
              {NOTARY_DATA.privacyPolicy.points.map((point, idx) => (
                <p key={idx} className="text-sm text-slate-700 leading-relaxed">
                  {point}
                </p>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Stopka */}
      <footer className="bg-[#091B38] text-slate-200 border-t border-[#7E97B8]/30 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid lg:grid-cols-12 gap-10 pb-10 border-b border-[#7E97B8]/25">
            <div className="lg:col-span-5 space-y-5">
              <NotaryLogo size="md" className="border-[#7E97B8]/35 bg-[#0D254C]" />
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B9CBE3]">
                <Building2 className="w-4 h-4" />
                <span>Dane Kancelarii Notarialnej</span>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-slate-400">Firma:</span>{" "}
                  <strong className="text-white">{NOTARY_DATA.company.firm}</strong>
                </p>
                <p>
                  <span className="text-slate-400">Adres:</span>{" "}
                  <span className="text-white">{NOTARY_DATA.company.footerAddress}</span>
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <span className="inline-flex items-center gap-2">
                    <span className="text-slate-400">NIP:</span>
                    <strong className="font-mono text-white">{NOTARY_DATA.company.nip}</strong>
                    <CopyButton text={NOTARY_DATA.company.nip} label="Kopiuj NIP" />
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="text-slate-400">REGON:</span>
                    <strong className="font-mono text-white">{NOTARY_DATA.company.regon}</strong>
                    <CopyButton text={NOTARY_DATA.company.regon} label="Kopiuj REGON" />
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-bold uppercase tracking-widest text-[#B9CBE3]">
                Numery kont bankowych kancelarii
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {NOTARY_DATA.company.accounts.map((acc) => (
                  <div
                    key={acc.id}
                    className="bg-[#0D254C] border border-[#7E97B8]/30 rounded-xl p-4 flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="text-xs text-[#B9CBE3] font-medium">{acc.label}:</div>
                      <div className="font-mono text-sm font-bold text-white mt-1.5 tracking-wide">
                        {acc.number}
                      </div>
                    </div>
                    <div>
                      <CopyButton text={acc.number} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
            <div className="flex flex-wrap items-center gap-4">
              {NOTARY_DATA.navigation.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(item.id)}
                  className="hover:text-white transition-colors font-semibold"
                >
                  {item.label}
                </button>
              ))}
              <span className="text-[#7E97B8]">•</span>
              <button
                type="button"
                onClick={() => navigate("privacy")}
                className="text-white hover:text-[#B9CBE3] font-bold underline underline-offset-4"
              >
                Polityka prywatności
              </button>
            </div>

            <p>{NOTARY_DATA.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
