'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { HORSES_DATA, Horse, getHorseById } from '@/data/horses';
import { FARM_CONFIG } from '@/data/config';
import {
  Sparkles,
  X,
  Send,
  ArrowRight,
  Maximize2,
  ExternalLink,
  Play,
  RotateCcw,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { getYouTubeEmbedUrl } from '@/utils/media';

type ChatLanguage = 'english' | 'hindi' | 'hinglish';

interface ActionLink {
  label: string;
  href: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
  mediaType?: 'images' | 'video' | 'horse-card' | 'available-horses' | 'nav-link';
  horse?: Horse;
  horses?: Horse[];
  actionLinks?: ActionLink[];
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeHorse, setActiveHorse] = useState<Horse | null>(null);
  const [chatLanguage, setChatLanguage] = useState<ChatLanguage>('english');
  const [lastIntent, setLastIntent] = useState<string | null>(null);

  // Requirement 1: Default welcome message strictly in English
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: `Hello! 👋 Welcome to HORSE COUNTY.\n\nI'm your Horse Assistant. You can ask me about our horses, photos, videos, buying, selling, booking, and Yog Maya Range.\n\nYou can chat with me in English, Hindi, or Hinglish.`,
      time: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Listen for global custom event to trigger AI modal from navbar or horse details
  useEffect(() => {
    const handleOpenAI = (e: any) => {
      setIsOpen(true);
      if (e?.detail?.query) {
        processUserQuery(e.detail.query);
      }
    };
    window.addEventListener('open-ai-chat', handleOpenAI);
    return () => window.removeEventListener('open-ai-chat', handleOpenAI);
  }, [activeHorse, chatLanguage, lastIntent]);

  // Multilingual quick suggestion chips
  const quickPrompts = {
    english: [
      'Tell me about Sultan',
      "What is Sultan's price?",
      'Show Sultan photos',
      'Show Sultan video',
      'Available horses',
      'How to buy a horse?',
      'Buy a Horse page link',
      'About Horse County'
    ],
    hindi: [
      'सुल्तान के बारे में बताओ',
      'सुल्तान की कीमत कितनी है?',
      'सुल्तान की फोटो दिखाओ',
      'सुल्तान का वीडियो दिखाओ',
      'उपलब्ध घोड़े दिखाओ',
      'घोड़ा कैसे खरीदें?',
      'खरीद पेज का लिंक दो',
      'हॉर्स काउंटी के बारे में'
    ],
    hinglish: [
      'Sultan ke baare me batao',
      'Sultan ki price kya hai?',
      'Sultan ki photo dikhao',
      'Sultan ka video dikhao',
      'Available horses dikhao',
      'Ghoda kaise kharidu?',
      'Direct buying page ki link do',
      'Horse County ke baare me'
    ]
  }[chatLanguage];

  // =========================================================================
  // 1. LANGUAGE DETECTION ENGINE (Multilingual with Explicit Priority)
  // =========================================================================
  const detectLanguage = (text: string, currentLang: ChatLanguage): { lang: ChatLanguage; explicit: boolean } => {
    const lower = text.toLowerCase().trim();

    // Explicit requests have top priority
    if (
      /\b(in\s+english|english\s*(mein|me|mai|in|please|plz)?|answer\s*in\s*english|speak\s*in\s*english)\b/i.test(lower)
    ) {
      return { lang: 'english', explicit: true };
    }
    if (
      /([\u0900-\u097F]+.*\b(में|मे)\b)|(\b(in\s+hindi|hindi\s*(mein|me|mai|please|plz)?|answer\s*in\s*hindi|speak\s*in\s*hindi)\b)/i.test(lower)
    ) {
      return { lang: 'hindi', explicit: true };
    }
    if (
      /\b(in\s+hinglish|hinglish\s*(mein|me|mai|please|plz)?|answer\s*in\s*hinglish|speak\s*in\s*hinglish)\b/i.test(lower)
    ) {
      return { lang: 'hinglish', explicit: true };
    }

    // Devanagari characters detect pure Hindi
    if (/[\u0900-\u097F]/.test(text)) {
      return { lang: 'hindi', explicit: false };
    }

    // Common Roman Hindi / Hinglish keywords and spelling variations
    const hinglishKeywords = [
      'kya', 'hai', 'hain', 'ho', 'ka', 'ki', 'ke', 'ko', 'se', 'me', 'mein', 'mai',
      'par', 'pe', 'batao', 'bata', 'btao', 'bato', 'bataiye', 'dikhao', 'dikha', 'dikhaye', 'kaisa',
      'kaisi', 'kaise', 'kitna', 'kitni', 'kitne', 'dam', 'daam', 'keemat', 'kimat',
      'kharidna', 'kharidu', 'kharide', 'kharidne', 'bechna', 'bechu', 'beche', 'chahiye', 'chaiye',
      'ghoda', 'ghode', 'ghodi', 'namaste', 'ram', 'pranam', 'lena', 'lu', 'le',
      'dekho', 'dekhna', 'kaha', 'kahan', 'bhai', 'mujhe', 'muja', 'mera', 'meri',
      'mere', 'iski', 'iska', 'iske', 'isme', 'ismein', 'unka', 'unki', 'unke', 'rate',
      'bhav', 'paisa', 'paise', 'rupaye', 'mil', 'milega', 'milegi', 'aana', 'aau',
      'chalo', 'bhejo', 'bhej', 'kaun', 'kon', 'konse', 'kaunse', 'kaunsi', 'konsi',
      'kuch', 'kuchh', 'taki', 'sabse', 'accha', 'theek', 'karo', 'kare', 'hoga', 'hogi'
    ];

    const words = lower.split(/[^a-zA-Z0-9\u0900-\u097F]+/).filter(Boolean);
    const hasHinglish = words.some((w) => hinglishKeywords.includes(w));
    if (hasHinglish) {
      return { lang: 'hinglish', explicit: false };
    }

    // Default to English
    return { lang: 'english', explicit: false };
  };

  // =========================================================================
  // 2. HORSE IDENTIFICATION & COMPLETE SENTENCE UNDERSTANDING
  // =========================================================================
  const identifyHorse = (
    text: string,
    currentActive: Horse | null
  ): { horse?: Horse; isPronoun: boolean } => {
    const lower = text.toLowerCase();

    // Check known official horse names from HORSES_DATA
    const horseAliases: { id: string; aliases: string[] }[] = [
      { id: 'sultan', aliases: ['sultan', 'sulthan', 'sulta', 'सुल्तान'] },
      { id: 'rajveer', aliases: ['rajveer', 'rajvir', 'rajveere', 'राजवीर'] },
      { id: 'noor', aliases: ['noor', 'nur', 'नूर'] },
      { id: 'badal', aliases: ['badal', 'baadal', 'बादल'] },
      { id: 'chetak', aliases: ['chetak', 'chethak', 'चेतक'] },
      { id: 'tara', aliases: ['tara', 'taara', 'तारा'] }
    ];

    // CRITICAL: If the query is about Maharana Pratap's Chetak (Historical question),
    // do NOT treat it as a HORSE COUNTY horse sales query!
    const isHistoricalChetak =
      /\b(maharana\s+pratap|pratap|haldighati|history\s+of\s+chetak|itihas)\b/i.test(lower);

    if (!isHistoricalChetak) {
      for (const item of horseAliases) {
        if (item.aliases.some((alias) => new RegExp(`\\b${alias}\\b`, 'i').test(lower))) {
          const found = HORSES_DATA.find((h) => h.id === item.id);
          if (found) return { horse: found, isPronoun: false };
        }
      }
    }

    // Contextual Pronoun Reference to the currently active horse
    const pronounKeywords = [
      'iski', 'iska', 'iske', 'isme', 'ismein', 'isko', 'unka', 'unki', 'unke',
      'this horse', 'that horse', 'this one', 'it', 'he', 'him', 'she', 'her',
      'its', 'the horse', 'is ghode', 'inhe', 'inhein', 'isey', 'ise'
    ];

    const hasPronoun = pronounKeywords.some((p) => new RegExp(`\\b${p}\\b`, 'i').test(lower));

    // Follow-up questions without mentioning name (e.g. "price kya hai?", "photo dikhao", "video hai?")
    const isFollowUpMetric =
      (/\b(price|rate|cost|keemat|daam|dam|kitne|photo|photos|image|pic|tasveer|video|clip)\b/i.test(lower) ||
        /\b(isko\s+buy|buy\s+this|kharidna\s+hai|buy\s+karna\s+hai)\b/i.test(lower)) &&
      !/\b(available|all|sab|sabhi|farm|page|link|process|best|breed|website)\b/i.test(lower);

    if ((hasPronoun || isFollowUpMetric) && currentActive) {
      return { horse: currentActive, isPronoun: true };
    }

    return { isPronoun: false };
  };

  // =========================================================================
  // 3. CORE QUERY PROCESSOR & INTENT DECISION SYSTEM
  // =========================================================================
  const processUserQuery = (userText: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      time
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const q = userText.toLowerCase().trim();

      // Language detection
      const { lang: detectedLang, explicit: isExplicitLang } = detectLanguage(userText, chatLanguage);
      const activeLang = isExplicitLang ? detectedLang : (detectedLang || chatLanguage);
      if (isExplicitLang) {
        setChatLanguage(detectedLang);
      }

      // Horse & context identification
      const { horse: targetHorse } = identifyHorse(userText, activeHorse);
      if (targetHorse) {
        setActiveHorse(targetHorse);
      }

      let replyText = '';
      let mediaType: ChatMessage['mediaType'];
      let responseHorse: Horse | undefined = targetHorse;
      let actionLinks: ActionLink[] = [];
      let horsesList: Horse[] = [];
      let newIntent = '';

      // =====================================================================
      // 1. EXPLICIT LANGUAGE SWITCH REQUEST (Rule 3, Tests 14, 15, 16)
      // =====================================================================
      if (isExplicitLang && q.split(/\s+/).length <= 4) {
        newIntent = 'language-switch';
        if (activeLang === 'english') {
          replyText = `Switched to English. How can I help you with HORSE COUNTY and our royal horses today?`;
        } else if (activeLang === 'hindi') {
          replyText = `भाषा बदलकर हिंदी कर दी गई है। मैं HORSE COUNTY और हमारे घोड़ों के बारे में आपकी क्या सहायता कर सकता हूँ?`;
        } else {
          replyText = `Hinglish mode active! Main aapki HORSE COUNTY aur humare royal horses ke baare me kaise help kar sakta hoon?`;
        }
      }

      // =====================================================================
      // 2. DIRECT PAGE LINK / NAVIGATION INTENT (Rule 7 & 8, Test 7)
      // Answer the EXACT question: provide clickable button to REAL route, DO NOT repeat process!
      // =====================================================================
      else if (
        /\b(direct\s+)?(link|page|pe\s+le\s+chalo|par\s+le\s+chalo|le\s+chalo|jana\s+hai|open|chahiye|navigate|take\s+me)\b/i.test(q) &&
        /\b(buy|buying|kharid|kharidne|sell|selling|bech|bechne|book|booking|visit|horses|ghode|home|gallery|about|contact)\b/i.test(q)
      ) {
        newIntent = 'direct-page-link';

        if (/\b(buy|buying|kharid|kharidne)\b/i.test(q)) {
          const buyHref = targetHorse ? `/buy?horse=${targetHorse.id}` : '/buy';
          actionLinks = [{ label: targetHorse ? `Buy ${targetHorse.name} →` : 'Buy a Horse →', href: buyHref }];
          if (activeLang === 'english') {
            replyText = `Certainly 👍 Here is the direct link to the Buy a Horse page:`;
          } else if (activeLang === 'hindi') {
            replyText = `बिल्कुल 👍 यहाँ से सीधे Buy a Horse पेज पर जाएँ:`;
          } else {
            replyText = `Bilkul 👍 Yahan se direct Buy a Horse page par jao:`;
          }
        } else if (/\b(sell|selling|bech|bechne)\b/i.test(q)) {
          actionLinks = [{ label: 'Sell Your Horse →', href: '/sell' }];
          if (activeLang === 'english') {
            replyText = `Here is the direct link to the Sell Your Horse page:`;
          } else if (activeLang === 'hindi') {
            replyText = `यहाँ से सीधे Sell Your Horse पेज पर जाएँ:`;
          } else {
            replyText = `Bilkul 👍 Yahan se direct Sell Your Horse page par jao:`;
          }
        } else if (/\b(book|booking|visit)\b/i.test(q)) {
          const bookHref = targetHorse ? `/book?horse=${targetHorse.id}` : '/book';
          actionLinks = [{ label: targetHorse ? `Book ${targetHorse.name} Viewing →` : 'Book a Horse →', href: bookHref }];
          if (activeLang === 'english') {
            replyText = `Here is the direct link to the Book a Horse page:`;
          } else if (activeLang === 'hindi') {
            replyText = `यहाँ से सीधे Book a Horse पेज पर जाएँ:`;
          } else {
            replyText = `Bilkul 👍 Yahan se direct Book a Horse page par jao:`;
          }
        } else if (/\b(horses|ghode|collection)\b/i.test(q)) {
          actionLinks = [{ label: 'View Horses →', href: '/horses' }];
          if (activeLang === 'english') {
            replyText = `Here is the direct link to our Horses Collection:`;
          } else if (activeLang === 'hindi') {
            replyText = `यहाँ से सीधे हमारे Horses पेज पर जाएँ:`;
          } else {
            replyText = `Bilkul 👍 Yahan se direct Horses page par jao:`;
          }
        } else if (/\b(home)\b/i.test(q)) {
          actionLinks = [{ label: 'Home →', href: '/' }];
          if (activeLang === 'english') {
            replyText = `Here is the direct link to the Home page:`;
          } else if (activeLang === 'hindi') {
            replyText = `यहाँ से सीधे Home पेज पर जाएँ:`;
          } else {
            replyText = `Bilkul 👍 Yahan se direct Home page par jao:`;
          }
        } else if (/\b(gallery)\b/i.test(q)) {
          actionLinks = [{ label: 'Gallery →', href: '/gallery' }];
          if (activeLang === 'english') {
            replyText = `Here is the direct link to our Visual Gallery:`;
          } else if (activeLang === 'hindi') {
            replyText = `यहाँ से सीधे Gallery पेज पर जाएँ:`;
          } else {
            replyText = `Bilkul 👍 Yahan se direct Gallery page par jao:`;
          }
        } else if (/\b(contact|concierge)\b/i.test(q)) {
          actionLinks = [{ label: 'Contact Us →', href: '/contact' }];
          if (activeLang === 'english') {
            replyText = `Here is the direct link to our Concierge Contact page:`;
          } else if (activeLang === 'hindi') {
            replyText = `यहाँ से सीधे Contact पेज पर जाएँ:`;
          } else {
            replyText = `Bilkul 👍 Yahan se direct Contact page par jao:`;
          }
        }
      }

      // =====================================================================
      // 3. HISTORICAL QUESTIONS (Rule 15, Test 11)
      // "Maharana Pratap ka horse ka naam kya tha?"
      // =====================================================================
      else if (
        /\b(maharana\s+pratap|pratap|haldighati)\b/i.test(q)
      ) {
        newIntent = 'historical-chetak';
        actionLinks = [{ label: 'Explore Our Chetak Stallion →', href: '/horses/chetak' }];

        if (activeLang === 'english') {
          replyText = `Maharana Pratap's legendary war horse was named **Chetak**.\n\nAccording to historical tradition and folklore, Chetak was an extraordinary blue-grey/dapple Kathiawari or Marwari war stallion who carried Maharana Pratap during the historic Battle of Haldighati (1576). Chetak is remembered across Indian history for supreme courage, loyalty, and saving his master despite mortal battlefield wounds.\n\n(Note: At HORSE COUNTY, our champion grey stallion Chetak is named in tribute to this historic warrior lineage!)`;
        } else if (activeLang === 'hindi') {
          replyText = `महाराणा प्रताप के प्रसिद्ध और निष्ठावान घोड़े का नाम **चेतक** था।\n\nऐतिहासिक परंपराओं और लोकगाथाओं के अनुसार, चेतक हल्दीघाटी के ऐतिहासिक युद्ध (1576) में महाराणा प्रताप का सबसे विश्वसनीय साथी था। उसने गंभीर रूप से घायल होने के बावजूद 21 फीट चौड़े नाले को फांदकर अपने स्वामी के प्राणों की रक्षा की थी।\n\n(गौर करें: HORSE COUNTY में हमारा डैपल ग्रे स्टैलियन चेतक इसी ऐतिहासिक परंपरा के सम्मान में नामित है!)`;
        } else {
          replyText = `Maharana Pratap ke legendary war horse ka naam **Chetak** tha.\n\nHistorical tradition ke mutabiq, Chetak Haldighati ke yuddh (1576) mein Maharana Pratap ka fearless saathi tha, jisne khud ghayal hokar bhi apne swami ki jaan bachayi thi. Chetak ko unki unmatched loyalty aur bravery ke liye yaad kiya jata hai.\n\n(Fun Fact: HORSE COUNTY mein humare grey stallion Chetak ka naam isi historic lineage ke samman me rakha gaya hai!)`;
        }
      }

      // =====================================================================
      // 4. "BEST WEBSITE" / "WHERE SHOULD I BUY" (Rules 18 & 19, Tests 8 & 9)
      // Balanced, honest guidance; naturally mention HORSE COUNTY with internal link
      // =====================================================================
      else if (
        /\b(best\s+website|sabse\s+best\s+website|kaunsi\s+website|which\s+website|website\s+se\s+kharidu|site\s+se\s+kharidu)\b/i.test(q)
      ) {
        newIntent = 'best-website-guidance';
        actionLinks = [
          { label: 'View Available Horses →', href: '/horses' },
          { label: 'How to Buy at Horse County →', href: '/buy' }
        ];

        if (activeLang === 'english') {
          replyText = `There isn't one universally best horse website for everyone. The right platform depends on what you're looking for, such as horse breed, verified veterinary soundness, location, budget, and reliable handover support.\n\nWhen buying a horse online, always ensure the platform provides certified veterinary soundness certificates, transparent microchip numbers, and direct trial viewings.\n\nIf you want to explore purebred Marwari and Kathiawari horses currently listed with complete veterinary inspection records on HORSE COUNTY, you can check our available horses here:`;
        } else if (activeLang === 'hindi') {
          replyText = `सभी के लिए कोई एक "सबसे बेस्ट" वेबसाइट नहीं होती। सही प्लेटफॉर्म इस बात पर निर्भर करता है कि आप किस नस्ल, बजट, वेटरनरी प्रमाणन और स्थान की तलाश कर रहे हैं।\n\nऑनलाइन घोड़ा चुनते समय हमेशा प्रामाणिक वंशावली, माइक्रोचिप और वेटरनरी चेकअप की जाँच अवश्य करें।\n\nयदि आप HORSE COUNTY पर वर्तमान में सूचीबद्ध प्रमाणित मारवाड़ी और काठियावाड़ी घोड़ों का संग्रह देखना चाहते हैं, तो आप यहाँ से शुरुआत कर सकते हैं:`;
        } else {
          replyText = `Sabke liye koi ek universally best horse website nahi hoti. Right platform is baat par depend karta hai ki aap kaunsi breed, location, budget aur verification chahte hain.\n\nOnline khareedte waqt hamesha certified veterinary inspection, pedigree records aur microchip verification zaroor check karein.\n\nAgar aap HORSE COUNTY par currently listed Marwari aur Kathiawari horses explore karna chahte hain, toh aap yahan se dekh sakte hain:`;
        }
      }

      // =====================================================================
      // 5. EXTERNAL UNLISTED BREED INQUIRY (Rule 20, Test 10)
      // "Mujhe Arabian horse chahiye, koi listing/link do"
      // Check HORSE COUNTY first. If not listed: clearly state not listed. NO external links!
      // =====================================================================
      else if (
        /\b(arabian|thoroughbred|friesian|warmblood|andalusian|appaloosa)\b/i.test(q) &&
        !/\b(marwari|kathiawari)\b/i.test(q)
      ) {
        newIntent = 'external-breed-inquiry';
        const breedMentioned = q.includes('arabian') ? 'Arabian' : 'requested';
        actionLinks = [{ label: 'View Available Horses →', href: '/horses' }];

        if (activeLang === 'english') {
          replyText = `Currently, I don't see an ${breedMentioned} horse listed on HORSE COUNTY. Our sanctuary specializes specifically in the pure preservation of royal Marwari and Kathiawari champion bloodlines.\n\nYou can explore all horses currently available in our collection here:`;
        } else if (activeLang === 'hindi') {
          replyText = `वर्तमान में HORSE COUNTY पर कोई ${breedMentioned} घोड़ा सूचीबद्ध नहीं है। हमारा फार्म विशेष रूप से शुद्ध मारवाड़ी और काठियावाड़ी नस्ल के संरक्षण और प्रशिक्षण के लिए समर्पित है।\n\nआप हमारे उपलब्ध घोड़ों की सूची यहाँ देख सकते हैं:`;
        } else {
          replyText = `Currently, HORSE COUNTY par koi ${breedMentioned} horse listed nahi hai. Humara farm specifically royal Marwari aur Kathiawari breeds ke preservation ke liye dedicated hai.\n\nAap humare currently available horses yahan explore kar sakte hain:`;
        }
      }

      // =====================================================================
      // 6. GENERAL HORSE BUYING ADVICE (Rule 4 & 16, Test 1)
      // "muja horse ka bara mai kuch bato taki muja buying karna mai help mil saka"
      // CRITICAL FIX: "bara/bare/baare" means "about", NEVER a horse name!
      // =====================================================================
      else if (
        (/\b(help|guide|tips|salah|advice|check|taki)\b/i.test(q) && /\b(buy|buying|kharid|kharidne|kharidu)\b/i.test(q)) ||
        /\b(horse\s+ka\s+ba?re?\s+m[aei]in?\s+kuch\s+b[at]+o)\b/i.test(q) ||
        /\b(what\s+should\s+i\s+check\s+before\s+buying|konsa\s+horse\s+kharidna\s+chahiye|first\s+time\s+buyer)\b/i.test(q)
      ) {
        newIntent = 'general-buying-advice';
        actionLinks = [
          { label: 'View Available Horses →', href: '/horses' },
          { label: 'Buy a Horse Page →', href: '/buy' }
        ];

        if (activeLang === 'english') {
          replyText = `Here is essential guidance to help you choose and buy the right horse:\n\n1. **Riding Experience & Purpose**: Match the horse's temperament to your skill. Beginners should choose calm, well-schooled horses (like our gentle mare Noor), while experienced riders can opt for spirited stallions.\n2. **Breed Suitability**: Indigenous Marwari and Kathiawari horses possess exceptional endurance, loyal temperaments, and natural adaptation to Indian climates.\n3. **Pre-Purchase Veterinary Exam (PPE)**: Always verify joint soundness, leg radiographs, dental condition, negative Coggins, and up-to-date vaccinations.\n4. **Pedigree & Microchip**: Ensure official breed society registration and microchip verification.\n5. **Trial Ride**: Always schedule an in-person viewing and trial riding session.\n\nAt HORSE COUNTY, every horse includes complete veterinary soundness certificates and verified registration. You can explore our collection below:`;
        } else if (activeLang === 'hindi') {
          replyText = `घोड़ा खरीदने से पहले इन महत्वपूर्ण बातों का ध्यान रखें ताकि आपको सही निर्णय लेने में मदद मिले:\n\n1. **उद्देश्य और अनुभव**: अपने घुड़सवारी स्तर के अनुसार घोड़ा चुनें। शुरुआती सवारों के लिए शांत स्वभाव और अच्छी ट्रेनिंग वाले घोड़े (जैसे हमारी मेयर नूर) उत्तम होते हैं।\n2. **नस्ल और अनुकूलता**: मारवाड़ी और काठियावाड़ी घोड़े अपनी सहनशक्ति, वफादारी और भारतीय मौसम के अनुकूल होने के लिए प्रसिद्ध हैं।\n3. **वेटरनरी प्री-परचेज चेकअप**: पैरों की मजबूती, एक्स-रे, दाँत, टीकाकरण और डीवॉर्मिंग रिकॉर्ड अवश्य जाँचें।\n4. **माइक्रोचिप और वंशावली**: प्रमाणित ब्रीड सोसाइटी का रजिस्ट्रेशन और माइक्रोचिप सत्यापन देखें।\n5. **ट्रायल राइड**: खरीदने से पहले व्यक्तिगत रूप से मिलकर ट्रायल राइड जरूर लें।\n\nHORSE COUNTY में हमारे सभी घोड़ों के साथ प्रमाणित मेडिकल रिकॉर्ड मिलते हैं। आप हमारे उपलब्ध घोड़े यहाँ देख सकते हैं:`;
        } else {
          replyText = `Ghoda khareedne se pehle yeh zaroori baatein dhyan mein rakhein taki aapko sahi horse select karne mein help mile:\n\n1. **Experience & Purpose**: Apne riding level ke mutabiq horse choose karein. Beginners ke liye calm aur well-trained horses (jaise Noor) best hote hain.\n2. **Breed & Stamina**: Marwari aur Kathiawari horses apni loyalty, endurance aur Indian climate ke liye sabse behtareen maane jaate hain.\n3. **Veterinary Soundness**: Kharidne se pehle legs, joints, dental check, vaccinations aur clean medical certificate zaroor confirm karein.\n4. **Pedigree & Microchip**: Certified stud registry aur microchip ID verify karein.\n5. **Trial Ride**: Purchase se pehle personal viewing aur trial ride session zaroor schedule karein.\n\nHORSE COUNTY par humare sabhi horses verified medical clearance ke saath aate hain. Aap humare collection ko yahan explore kar sakte hain:`;
        }
      }

      // =====================================================================
      // 7. GENERAL HORSE KNOWLEDGE & BREEDS (Rule 14 & 17, Test 12)
      // "Sabse best horse kaunsa hai?", "India mein sabse famous horse breed kaunsi hai?"
      // =====================================================================
      else if (
        /\b(sabse\s+best\s+horse|which\s+horse\s+breed\s+is\s+best|best\s+breed|famous\s+breed|famous\s+horse\s+breed|indian\s+horse\s+breeds|breeds\s+in\s+india|rajasthan\s+ke\s+ghode)\b/i.test(q)
      ) {
        newIntent = 'general-breed-knowledge';
        actionLinks = [{ label: 'View Our Purebred Horses →', href: '/horses' }];

        if (activeLang === 'english') {
          replyText = `There is no single "best" horse for everyone, as it depends on your purpose (pleasure riding, dressage, endurance, or breeding).\n\nHowever, the most famous and celebrated indigenous horse breed in India is the **Marwari horse**, world-renowned for its distinct lyre-shaped inward-curving ears, royal Rajput heritage, courage, and stamina.\n\nOther notable Indian breeds include:\n• **Kathiawari**: Native to Saurashtra, famous for desert hardiness, agility, and dense bone.\n• **Zanskari & Spiti**: Resilient mountain ponies adapted to high altitudes.\n• **Manipuri Pony**: The historic, agile breed of traditional polo.\n\nAt HORSE COUNTY's Yog Maya Range, we specialize in purebred Marwari and Kathiawari champions.`;
        } else if (activeLang === 'hindi') {
          replyText = `कोई एक घोड़ा सभी के लिए "सर्वश्रेष्ठ" नहीं होता, यह आपके उद्देश्य (कैजुअल राइडिंग, शो, एंड्यूरेंस या ब्रीडिंग) पर निर्भर करता है।\n\nभारत की सबसे प्रसिद्ध और प्रतिष्ठित नस्ल **मारवाड़ी घोड़ा** है, जो अपने अंदर की ओर मुड़े हुए घुमावदार कानों (lyre ears), राजपूताना शौर्य और बेमिसाल वफादारी के लिए पूरी दुनिया में विख्यात है।\n\nभारत की अन्य प्रमुख नस्लें:\n• **काठियावाड़ी**: सौराष्ट्र की नस्ल, रेगिस्तानी मजबूती और चपलता के लिए प्रसिद्ध।\n• **ज़ांस्करी और स्पीति**: हिमालयी ऊंचाई के लिए मजबूत नस्लें।\n• **मणिपुरी पोनी**: ऐतिहासिक पोलो खेल की मूल नस्ल।\n\nHORSE COUNTY में हम मारवाड़ी और काठियावाड़ी नस्लों के शुद्ध संरक्षण में विशेषज्ञता रखते हैं।`;
        } else {
          replyText = `Sabke liye koi ek universal "best horse" nahi hota, yeh aapke purpose (riding, show, endurance ya breeding) par depend karta hai.\n\nLekin India ki sabse famous aur prestigious breed **Marwari horse** hai, jo apne inward-curving lyre ears, royal Rajasthani heritage aur fearless nature ke liye world-famous hai.\n\nIndia ki doosri famous breeds:\n• **Kathiawari**: Saurashtra ki desert breed, apni agility aur hard hooves ke liye jani jaati hai.\n• **Zanskari & Spiti**: High-altitude mountain ponies.\n• **Manipuri Pony**: Traditional polo ki historical breed.\n\nHORSE COUNTY ke Yog Maya Range mein hum Marwari aur Kathiawari horses ka pure preservation karte hain.`;
        }
      }

      // =====================================================================
      // 8. AVAILABLE HORSES (Rule 23, Test 13)
      // "Available horses dikhao", "Kaun kaun se horses available hain?"
      // Show ONLY horses with availability === 'Available' (Sultan, Rajveer, Noor, Chetak)
      // =====================================================================
      else if (
        /\b(available|uplabdh|konse|kaunse|konsa|kaunsa|stock)\b/i.test(q) &&
        /\b(horse|horses|ghoda|ghode|ghodi)\b/i.test(q)
      ) {
        newIntent = 'available-horses';
        const available = HORSES_DATA.filter((h) => h.availability === 'Available');
        mediaType = 'available-horses';
        horsesList = available;
        actionLinks = [{ label: 'View Complete Collection →', href: '/horses' }];

        if (activeLang === 'english') {
          const list = available.map((h) => `• ${h.name} (${h.breed}, ${h.ageDisplay}) — ${h.price}`).join('\n');
          replyText = `Here are the horses currently available in our collection:\n\n${list}\n\nClick any horse below to view complete details, verified photos, and video:`;
        } else if (activeLang === 'hindi') {
          const list = available.map((h) => `• ${h.name} (${h.breed}, ${h.ageDisplay}) — ${h.price}`).join('\n');
          replyText = `वर्तमान में हमारे पास ये घोड़े उपलब्ध (Available) हैं:\n\n${list}\n\nकिसी भी घोड़े की पूरी जानकारी, फोटो और वीडियो देखने के लिए नीचे क्लिक करें:`;
        } else {
          const list = available.map((h) => `• ${h.name} (${h.breed}, ${h.ageDisplay}) — ${h.price}`).join('\n');
          replyText = `Currently humare collection mein yeh ghode available hain:\n\n${list}\n\nKisi bhi ghode ke full details, photos aur video dekhne ke liye neeche click karein:`;
        }
      }

      // =====================================================================
      // 9. ALL HORSES PRICES / RATES LIST
      // "Ghodo ke rate kya hain?", "Horse prices"
      // =====================================================================
      else if (
        /\b(price|prices|rate|rates|cost|dam|daam|keemat|kimat|bhav)\b/i.test(q) &&
        /\b(all|sab|sabhi|ghode|horses|collection)\b/i.test(q)
      ) {
        newIntent = 'all-horse-prices';
        const priceList = HORSES_DATA.map((h) => `• ${h.name} (${h.breed}): ${h.price} [${h.availability}]`).join('\n');
        actionLinks = [{ label: 'Compare on Horses Page →', href: '/horses' }];

        if (activeLang === 'english') {
          replyText = `Here is the current valuation of all horses in our collection:\n\n${priceList}\n\nAll horses include certified veterinary soundness documentation and pedigree records.`;
        } else if (activeLang === 'hindi') {
          replyText = `हमारे सभी घोड़ों की वर्तमान कीमतें इस प्रकार हैं:\n\n${priceList}\n\nसभी घोड़ों के साथ प्रमाणित वेटरनरी साउंडनेस और वंशावली रिकॉर्ड शामिल हैं।`;
        } else {
          replyText = `Humare sabhi horses ki current valuations yeh hain:\n\n${priceList}\n\nSabhi horses ke saath certified veterinary soundness aur pedigree records included hain.`;
        }
      }

      // =====================================================================
      // 10. HORSE PHOTOS (Rule 11, Test 4)
      // "Sultan ki photo dikhao", "Photo dikhao"
      // =====================================================================
      else if (
        targetHorse &&
        /\b(photo|photos|image|images|pic|pics|picture|pictures|tasveer|tasveere|tasveerein|dikhao|dikha)\b/i.test(q) &&
        !/\b(video|clip)\b/i.test(q)
      ) {
        newIntent = 'horse-photo';
        if (targetHorse.images && targetHorse.images.length > 0) {
          mediaType = 'images';
          actionLinks = [{ label: `View ${targetHorse.name}'s Full Page →`, href: `/horses/${targetHorse.id}` }];
          if (activeLang === 'english') {
            replyText = `Here are ${targetHorse.name}'s verified photos from our sanctuary. Each photo belongs exclusively to ${targetHorse.name}:`;
          } else if (activeLang === 'hindi') {
            replyText = `ये लीजिए ${targetHorse.name} की असली और प्रमाणित तस्वीरें। हमारी सख्त फार्म नीति के अनुसार ये सिर्फ़ ${targetHorse.name} की ही तस्वीरें हैं:`;
          } else {
            replyText = `Yeh lijiye ${targetHorse.name} ki verified photos. Har photo exclusively ${targetHorse.name} ki hai:`;
          }
        } else {
          if (activeLang === 'english') {
            replyText = `This horse doesn't currently have a photo available on our website.`;
          } else if (activeLang === 'hindi') {
            replyText = `हमारी वेबसाइट पर इस घोड़े की फोटो अभी उपलब्ध नहीं है।`;
          } else {
            replyText = `Humari website par is horse ki photo abhi available nahi hai.`;
          }
        }
      }

      // =====================================================================
      // 11. HORSE VIDEOS (Rule 12)
      // "Sultan ka video dikhao", "Video hai?"
      // =====================================================================
      else if (
        targetHorse &&
        /\b(video|videos|clip|action|chalne|daud|running|motion)\b/i.test(q)
      ) {
        newIntent = 'horse-video';
        if (targetHorse.videos && targetHorse.videos.length > 0) {
          mediaType = 'video';
          actionLinks = [{ label: `View Full HD Video →`, href: `/horses/${targetHorse.id}` }];
          if (activeLang === 'english') {
            replyText = `Here is ${targetHorse.name}'s official motion video:`;
          } else if (activeLang === 'hindi') {
            replyText = `ये लीजिए ${targetHorse.name} का चाल और एक्शन वीडियो। आप इसे यहीं देख सकते हैं:`;
          } else {
            replyText = `Yeh lijiye ${targetHorse.name} ka official video. Aap isse yahin dekh sakte ho:`;
          }
        } else {
          // Tara has no video yet
          if (activeLang === 'english') {
            replyText = `This horse doesn't currently have a video available on our website. In accordance with our sanctuary policy, we never show another horse's video.`;
          } else if (activeLang === 'hindi') {
            replyText = `${targetHorse.name} का वीडियो अभी हमारी वेबसाइट पर उपलब्ध नहीं है। फार्म के नियमों के अनुसार हम किसी दूसरे घोड़े का वीडियो नहीं दिखाते हैं।`;
          } else {
            replyText = `${targetHorse.name} ka video abhi humari website par available nahi hai. Farm rules ke mutabiq hum kisi doosre ghode ka video show nahi karte.`;
          }
        }
      }

      // =====================================================================
      // 12. HORSE PRICE (Rule 10, Tests 3 & 5)
      // "Sultan ki price kya hai?", "Iski price kya hai?"
      // =====================================================================
      else if (
        targetHorse &&
        /\b(price|rate|cost|dam|daam|keemat|kimat|kitne|rupaye|paisa|value|valuation)\b/i.test(q)
      ) {
        newIntent = 'horse-price';
        mediaType = 'horse-card';
        actionLinks = [
          { label: `View ${targetHorse.name} Details →`, href: `/horses/${targetHorse.id}` },
          { label: `Buy ${targetHorse.name} →`, href: `/buy?horse=${targetHorse.id}` }
        ];

        if (activeLang === 'english') {
          replyText = `${targetHorse.name}'s price is ${targetHorse.price}. He is a ${targetHorse.ageDisplay} purebred ${targetHorse.breed} ${targetHorse.genderRole.toLowerCase()} and is currently ${targetHorse.availability}. You can view his complete details in the Horses section.`;
        } else if (activeLang === 'hindi') {
          replyText = `${targetHorse.name} की कीमत ${targetHorse.price} है। यह ${targetHorse.ageDisplay} का शुद्ध ${targetHorse.breed} ${targetHorse.gender === 'Male' ? 'स्टैलियन' : 'मेयर'} है और वर्तमान में ${targetHorse.availability === 'Available' ? 'उपलब्ध (Available)' : targetHorse.availability} है। आप Horses सेक्शन में उसकी पूरी जानकारी देख सकते हैं।`;
        } else {
          replyText = `${targetHorse.name} ki price ${targetHorse.price} hai. Woh ${targetHorse.ageDisplay} ka purebred ${targetHorse.breed} ${targetHorse.genderRole} hai aur currently ${targetHorse.availability} hai. Aap Horses section mein uski complete details dekh sakte ho.`;
        }
      }

      // =====================================================================
      // 13. BUY SPECIFIC HORSE ("Isko buy karna hai", "Sultan ko buy karna hai")
      // =====================================================================
      else if (
        targetHorse &&
        /\b(buy|purchase|kharid|kharidna|kharidu|lena|chahiye|chaiye)\b/i.test(q) &&
        !/\b(how|kaise|process|step|page|link)\b/i.test(q)
      ) {
        newIntent = 'buy-specific-horse';
        mediaType = 'horse-card';
        actionLinks = [
          { label: `Buy ${targetHorse.name} Now →`, href: `/buy?horse=${targetHorse.id}` },
          { label: `Book Viewing Trial →`, href: `/book?horse=${targetHorse.id}` }
        ];

        if (activeLang === 'english') {
          replyText = `Excellent choice! ${targetHorse.name} (${targetHorse.breed}, ${targetHorse.price}) is available for purchase enquiry. Click below to submit your enquiry and our concierge will arrange private trial rides and veterinary transfers:`;
        } else if (activeLang === 'hindi') {
          replyText = `उत्तम चयन! ${targetHorse.name} (${targetHorse.breed}, ${targetHorse.price}) के लिए खरीद फॉर्म सबमिट करने के लिए नीचे दिए गए बटन पर क्लिक करें। हमारी टीम ट्रायल राइड की व्यवस्था करेगी:`;
        } else {
          replyText = `Bahut badhiya! ${targetHorse.name} (${targetHorse.breed}, ${targetHorse.price}) ke liye direct purchase enquiry submit karne ke liye neeche diye gaye button par click karein:`;
        }
      }

      // =====================================================================
      // 14. SPECIFIC HORSE GENERAL INFO (Rule 10, Test 2)
      // "Sultan ke baare mein batao"
      // =====================================================================
      else if (targetHorse) {
        newIntent = 'horse-details';
        mediaType = 'horse-card';
        actionLinks = [
          { label: `View ${targetHorse.name} Details →`, href: `/horses/${targetHorse.id}` },
          { label: `Buy ${targetHorse.name} →`, href: `/buy?horse=${targetHorse.id}` }
        ];

        if (activeLang === 'english') {
          replyText = `${targetHorse.name} is a magnificent ${targetHorse.ageDisplay} purebred ${targetHorse.breed} ${targetHorse.genderRole.toLowerCase()}.\n\n• Price: ${targetHorse.price}\n• Height: ${targetHorse.height}\n• Status: ${targetHorse.availability}\n• Temperament: ${targetHorse.temperament}\n• Training: ${targetHorse.training}\n\nYou can ask "Show photo", "Show video", or "What is the price?" for more details!`;
        } else if (activeLang === 'hindi') {
          replyText = `${targetHorse.name} एक बहुत ही शानदार ${targetHorse.ageDisplay} का शुद्ध ${targetHorse.breed} ${targetHorse.gender === 'Male' ? 'स्टैलियन' : 'मेयर'} घोड़ा है।\n\n• कीमत: ${targetHorse.price}\n• ऊँचाई: ${targetHorse.height}\n• स्थिति: ${targetHorse.availability === 'Available' ? 'उपलब्ध (Available)' : targetHorse.availability}\n• स्वभाव: ${targetHorse.temperament}\n• ट्रेनिंग: ${targetHorse.training}\n\nआप "फोटो दिखाओ", "वीडियो दिखाओ" या "कीमत बताओ" लिखकर पूछ सकते हैं!`;
        } else {
          replyText = `${targetHorse.name} ek magnificent ${targetHorse.ageDisplay} ka purebred ${targetHorse.breed} ${targetHorse.genderRole} hai.\n\n• Price: ${targetHorse.price}\n• Height: ${targetHorse.height}\n• Status: ${targetHorse.availability}\n• Temperament: ${targetHorse.temperament}\n• Training: ${targetHorse.training}\n\nAap "Photo dikhao", "Video dikhao" ya "Price kya hai?" likhkar aur jaan sakte ho!`;
        }
      }

      // =====================================================================
      // 15. BUYING PROCESS EXPLANATION (Rule 24, Test 6)
      // "Ghoda kaise kharidu?", "How to buy a horse?"
      // =====================================================================
      else if (
        /\b(how\s+to\s+buy|buy\s+process|kaise\s+kharid|kharidna\s+hai|buy\s+karna\s+hai|ghoda\s+kaise\s+kharidu|kharidne\s+ka\s+process)\b/i.test(q) ||
        (/\b(buy|kharid)\b/i.test(q) && /\b(kaise|process|step|steps|procedure|how)\b/i.test(q))
      ) {
        newIntent = 'buying-process';
        actionLinks = [
          { label: 'Buy a Horse Page →', href: '/buy' },
          { label: 'View All Horses →', href: '/horses' }
        ];

        if (activeLang === 'english') {
          replyText = `To buy a horse from HORSE COUNTY:\n\n1. Browse our collection and select your preferred horse (e.g. Sultan, Rajveer, Noor).\n2. Submit the purchase enquiry form on the 'Buy a Horse' page.\n3. Our concierge will contact you directly via phone or WhatsApp to coordinate private trial riding, comprehensive veterinary soundness checks, and registry transfers.\n\nWould you like to open the Buy a Horse page?`;
        } else if (activeLang === 'hindi') {
          replyText = `हॉर्स काउंटी से घोड़ा खरीदने की प्रक्रिया बहुत आसान है:\n\n1. हमारे कलेक्शन में से अपना पसंदीदा घोड़ा चुनें (जैसे Sultan, Rajveer, Noor)।\n2. 'Buy a Horse' पेज पर जाकर खरीद फॉर्म सबमिट करें।\n3. हमारी कंसीयर्ज टीम आपसे सीधे संपर्क करके प्राइवेट ट्रायल राइडिंग, वेटरनरी चेकअप और रजिस्ट्रेशन ट्रांसफर की व्यवस्था करेगी।\n\nक्या आप सीधे खरीद पेज पर जाना चाहते हैं?`;
        } else {
          replyText = `Horse County se ghoda khareedne ka process bahut simple hai:\n\n1. Humare collection me se apna pasandeeda ghoda select karein (jaise Sultan, Rajveer, Noor).\n2. 'Buy a Horse' page par jaakar enquiry form submit karein.\n3. Humari concierge team aapse directly phone ya WhatsApp par contact karke trial riding, veterinary soundness check aur registry transfer coordinate karegi.\n\nKya aap direct Buy a Horse page par jaana chahte hain?`;
        }
      }

      // =====================================================================
      // 16. SELLING PROCESS EXPLANATION (Rule 25)
      // "Ghoda kaise bechu?", "how to sell a horse"
      // =====================================================================
      else if (
        /\b(how\s+to\s+sell|sell\s+process|kaise\s+bech|bechna\s+hai|sell\s+karna\s+hai|ghoda\s+kaise\s+bechu)\b/i.test(q) ||
        (/\b(sell|bech)\b/i.test(q) && /\b(kaise|process|step|how)\b/i.test(q))
      ) {
        newIntent = 'selling-process';
        actionLinks = [{ label: 'Sell Your Horse Page →', href: '/sell' }];

        if (activeLang === 'english') {
          replyText = `To sell your horse through our sanctuary network:\n\n1. Visit our 'Sell Your Horse' page.\n2. Submit your horse's breed, pedigree, age, height, photos, and valuation.\n3. Our inspection committee reviews the bloodline soundness and contacts you directly for verification.`;
        } else if (activeLang === 'hindi') {
          replyText = `अपने घोड़े को हमारे नेटवर्क के माध्यम से बेचने की प्रक्रिया:\n\n1. 'Sell Your Horse' पेज पर जाएँ।\n2. अपने घोड़े की नस्ल, उम्र, ऊँचाई, वंशावली, फोटो और अपेक्षित मूल्य भरें।\n3. हमारी चयन समिति वंशावली की समीक्षा करके आपसे सीधे संपर्क करेगी।`;
        } else {
          replyText = `Apne ghode ko humare network ke through bechne ke liye:\n\n1. 'Sell Your Horse' page par jayein.\n2. Apne horse ki breed, pedigree, age, height, photos aur expected price submit karein.\n3. Humari inspection committee review karke aapse directly contact karegi.`;
        }
      }

      // =====================================================================
      // 17. BOOKING PROCESS EXPLANATION (Rule 26)
      // "Ghoda book kaise kare?", "visit farm"
      // =====================================================================
      else if (
        /\b(how\s+to\s+book|book\s+process|kaise\s+book|book\s+karna\s+hai|visit\s+farm|trial\s+ride|appointment)\b/i.test(q) ||
        (/\b(book|visit)\b/i.test(q) && /\b(kaise|process|how)\b/i.test(q))
      ) {
        newIntent = 'booking-process';
        actionLinks = [{ label: 'Book a Horse Page →', href: '/book' }];

        if (activeLang === 'english') {
          replyText = `To book a private viewing or trial ride:\n\n1. Navigate to the 'Book a Horse' page.\n2. Choose your preferred horse, date, and viewing session.\n3. Submit your booking request and our concierge will confirm your private hospitality arrangements at our sanctuary.`;
        } else if (activeLang === 'hindi') {
          replyText = `प्राइवेट विजिट या ट्रायल राइड बुक करने के लिए:\n\n1. 'Book a Horse' पेज पर जाएँ।\n2. अपनी पसंदीदा तारीख, समय और घोड़ा चुनें।\n3. बुकिंग फॉर्म सबमिट करें — हमारी टीम तुरंत आपके आतिथ्य और विजिट की व्यवस्था करेगी।`;
        } else {
          replyText = `Private viewing ya trial ride book karne ke liye:\n\n1. 'Book a Horse' page par jayein.\n2. Apni preferred date, time aur horse choose karein.\n3. Booking submit karein — humari concierge team aapse confirm karke hospitality arrange karegi.`;
        }
      }

      // =====================================================================
      // 18. ABOUT HORSE COUNTY & YOG MAYA RANGE
      // =====================================================================
      else if (
        /\b(horse\s+county|yog\s*maya\s*range|sanctuary|farm|facilities|stables|arena|address|location|kahan|where)\b/i.test(q)
      ) {
        newIntent = 'farm-info';
        actionLinks = [
          { label: 'Inside Yog Maya Range Gallery →', href: '/#gallery' },
          { label: 'Read Our Heritage →', href: '/about' }
        ];

        if (activeLang === 'english') {
          replyText = `${FARM_CONFIG.name} is India's premier luxury equestrian sanctuary. Our breeding and training estate, Yog Maya Range, spans 150 pristine acres in the Marwar Heritage Valley, Rajasthan.\n\nOur facilities feature climate-regulated mahogany stables, an Olympic dressage silica sand arena, and 24/7 resident veterinary supervision dedicated to the pure preservation of royal Marwari and Kathiawari bloodlines.`;
        } else if (activeLang === 'hindi') {
          replyText = `${FARM_CONFIG.name} भारत का प्रमुख लक्जरी घुड़सवारी अभयारण्य है। हमारा फार्म, Yog Maya Range, राजस्थान के मारवाड़ हेरिटेज वैली में 150 एकड़ में फैला हुआ है।\n\nयहाँ महोगनी अस्तबल, ओलंपिक स्तर का ड्रेसिज सैंड एरिना और 24/7 वेटरनरी डॉक्टर्स की निगरानी उपलब्ध है, जो मारवाड़ी और काठियावाड़ी नस्ल के संरक्षण के लिए समर्पित हैं।`;
        } else {
          replyText = `${FARM_CONFIG.name} India ka premier luxury equestrian sanctuary hai. Humara breeding farm, Yog Maya Range, Rajasthan ke Marwar Heritage Valley me 150 acres me faila hua hai.\n\nYahan climate-regulated mahogany stables, Olympic dressage sand arena aur 24/7 resident veterinary supervision available hai, jo royal Marwari aur Kathiawari horses ke preservation ke liye dedicated hai.`;
        }
      }

      // =====================================================================
      // 19. GREETINGS
      // =====================================================================
      else if (
        /\b(hello|hi|hey|greetings|namaste|namaskar|ram\s*ram|pranam|kaise\s+ho|kya\s+haal)\b/i.test(q)
      ) {
        newIntent = 'greeting';
        actionLinks = [
          { label: 'View Available Horses →', href: '/horses' },
          { label: 'Buy a Horse →', href: '/buy' }
        ];

        if (activeLang === 'english') {
          replyText = `Hello! 👋 Welcome to ${FARM_CONFIG.name}.\n\nHow can I help you today? You can ask about our horses (Sultan, Rajveer, Noor, Badal, Chetak, Tara), prices, photos, videos, or buying process.`;
        } else if (activeLang === 'hindi') {
          replyText = `नमस्ते! राम-राम सा! 🙏 ${FARM_CONFIG.name} में आपका स्वागत है।\n\nमैं आपकी क्या मदद कर सकता हूँ? आप हमारे किसी भी घोड़े (Sultan, Rajveer, Noor, Badal, Chetak, Tara), कीमत, फोटो, वीडियो या खरीद प्रक्रिया के बारे में पूछ सकते हैं।`;
        } else {
          replyText = `Namaste! Ram-Ram sa! 🙏 ${FARM_CONFIG.name} me aapka swagat hai.\n\nAap humare kisi bhi ghode (Sultan, Rajveer, Noor, Badal, Chetak, Tara), prices, photos, videos ya buying process ke baare me pooch sakte hain.`;
        }
      }

      // =====================================================================
      // 20. GENERAL HORSE KNOWLEDGE / FALLBACK (Rules 14, 27, 28, 29)
      // Never refuse normal horse-related questions!
      // =====================================================================
      else {
        newIntent = 'general-or-fallback';

        // Check common horse questions (diet, lifespan, training, beginner)
        if (/\b(eat|diet|food|khana|kya\s+khate)\b/i.test(q)) {
          if (activeLang === 'english') {
            replyText = `Horses are natural herbivores. Their daily diet primarily consists of quality grass hay, pasture grazing, grains (such as oats or barley), essential minerals, and abundant clean fresh water. At HORSE COUNTY, our horses receive tailored organic nutrition programs under veterinary supervision.`;
          } else if (activeLang === 'hindi') {
            replyText = `घोड़े प्राकृतिक रूप से शाकाहारी होते हैं। उनके आहार में मुख्य रूप से उच्च गुणवत्ता वाली घास, हे (सूखी घास), जई या जौ जैसे अनाज, खनिज और भरपूर साफ पानी शामिल होता है। HORSE COUNTY में सभी घोड़ों को पोषण विशेषज्ञ डॉक्टरों की देखरेख में आहार दिया जाता है।`;
          } else {
            replyText = `Horses herbivores hote hain. Unki daily diet mein quality grass, hay, grains (jaise oats/barley), essential minerals aur saaf paani shamil hota hai. HORSE COUNTY me humare sabhi horses ko veterinary doctors ki dekhrekh mein customized diet di jaati hai.`;
          }
        } else if (/\b(live|age|lifespan|umar|kitne\s+saal)\b/i.test(q)) {
          if (activeLang === 'english') {
            replyText = `Domestic horses typically live between 25 to 30 years with proper veterinary care, balanced nutrition, and regular exercise. Many hardy indigenous breeds, such as purebred Marwaris, can maintain vibrant fitness well into their late twenties.`;
          } else if (activeLang === 'hindi') {
            replyText = `उचित देखभाल, संतुलित पोषण और नियमित व्यायाम के साथ घोड़ों का औसत जीवनकाल 25 से 30 वर्ष होता है। शुद्ध मारवाड़ी जैसी मजबूत भारतीय नस्लें अपनी उम्र के अंतिम वर्षों तक भी सक्रिय और स्वस्थ रहती हैं।`;
          } else {
            replyText = `Horses ka average lifespan 25 se 30 years hota hai agar unhe proper care, nutrition aur exercise mile. Marwari jaisi hardy breeds apni late twenties me bhi kaafi fit aur active rehti hain.`;
          }
        } else if (/\b(beginner|beginners|naye\s+riders?|seekhne)\b/i.test(q)) {
          actionLinks = [{ label: 'View Available Horses →', href: '/horses' }];
          if (activeLang === 'english') {
            replyText = `For beginners, the most important factors are calm temperament, predictable behavior, and sound foundational training rather than sheer speed. A gentle, forgiving horse (often called a 'schoolmaster', such as our silver-white mare Noor) is ideal for building confidence.`;
          } else if (activeLang === 'hindi') {
            replyText = `शुरुआती घुड़सवारों के लिए सबसे महत्वपूर्ण गुण शांत स्वभाव, भरोसेमंद व्यवहार और अच्छी ट्रेनिंग है। एक शांत और कोमल घोड़ी (जैसे हमारी नूर) आत्मविश्वास बढ़ाने के लिए सबसे आदर्श होती है।`;
          } else {
            replyText = `Beginners ke liye calm temperament aur well-schooled training sabse zaroori hoti hai. Ek gentle aur responsive horse (jaise humari mare Noor) confidence build karne ke liye perfect hoti hai.`;
          }
        } else {
          // Accurate, respectful guidance
          actionLinks = [
            { label: 'View All Horses →', href: '/horses' },
            { label: 'Contact Concierge →', href: '/contact' }
          ];

          if (activeLang === 'english') {
            replyText = `That information is not currently available on our website. You can ask me about:\n• Any horse: "Tell me about Sultan", "Sultan's price", "Show Sultan photos"\n• Availability: "Show available horses"\n• Guidance: "What should I check before buying a horse?", "Direct buying page link"\n• Sanctuary: "About Yog Maya Range"`;
          } else if (activeLang === 'hindi') {
            replyText = `यह जानकारी हमारी वेबसाइट पर अभी उपलब्ध नहीं है। आप मुझसे पूछ सकते हैं:\n• किसी घोड़े के बारे में: "सुल्तान के बारे में बताओ", "सुल्तान की कीमत", "सुल्तान की फोटो दिखाओ"\n• उपलब्धता: "उपलब्ध घोड़े दिखाओ"\n• खरीद मार्गदर्शन: "घोड़ा खरीदने के टिप्स", "खरीद पेज का लिंक दो"\n• फार्म: "Yog Maya Range के बारे में"`;
          } else {
            replyText = `Yeh information humari website par abhi available nahi hai. Aap mujhse pooch sakte hain:\n• Kisi horse ke baare me: "Sultan ke baare me batao", "Sultan ki price", "Sultan ki photo dikhao"\n• Availability: "Available horses dikhao"\n• Guidance: "Buying karna mai help", "Direct buying page ki link do"\n• Farm: "Yog Maya Range ke baare me"`;
          }
        }
      }

      setLastIntent(newIntent);

      const botMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mediaType,
        horse: responseHorse,
        horses: horsesList,
        actionLinks: actionLinks.length > 0 ? actionLinks : undefined
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 350);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const txt = input;
    setInput('');
    processUserQuery(txt);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[99999]">
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 sm:gap-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#aa8222] shadow-[0_10px_35px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_45px_rgba(212,175,55,0.7)] transform active:scale-95 hover:scale-105 transition-all duration-300 border border-[#f3e5ab]/60 touch-manipulation cursor-pointer"
            aria-label="Open AI Assistant"
          >
            <img
              src="/images/logo/horse-county-emblem.png"
              alt="HC"
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-contain shrink-0 shadow-sm"
            />
            <span>Ask AI</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-700 animate-ping absolute -top-1 -right-1" />
          </button>
        )}
      </div>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed inset-x-2 bottom-2 sm:inset-auto sm:bottom-6 sm:right-6 z-[99999] w-auto sm:w-[440px] h-[580px] sm:h-[640px] max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl bg-[#0f1115] border border-[#d4af37]/40 backdrop-blur-2xl">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#181a20] via-[#1f2229] to-[#121417] border-b border-[#d4af37]/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center overflow-hidden shrink-0 p-0.5 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                <img
                  src="/images/logo/horse-county-emblem.png"
                  alt="HORSE COUNTY"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Horse Assistant</span>
                  <button
                    type="button"
                    onClick={() => {
                      const next: ChatLanguage =
                        chatLanguage === 'english' ? 'hinglish' : chatLanguage === 'hinglish' ? 'hindi' : 'english';
                      setChatLanguage(next);
                    }}
                    className="text-[10px] text-emerald-400 bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/40 px-2 py-0.5 rounded-full font-medium transition-colors"
                    title="Click to toggle language (English / Hinglish / हिंदी)"
                  >
                    {chatLanguage === 'english' ? '🌐 English' : chatLanguage === 'hindi' ? '🌐 हिंदी' : '🌐 Hinglish'}
                  </button>
                </h3>
                <p className="text-[11px] text-[#c5a059]">
                  Ask about horses, photos, videos, buying & booking
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setActiveHorse(null);
                  setLastIntent(null);
                  setMessages([
                    {
                      id: 'reset',
                      sender: 'assistant',
                      text: `Conversation refreshed. How may I assist you with HORSE COUNTY today? Ask in English, Hindi (हिंदी), or Hinglish!`,
                      time: 'Just now'
                    }
                  ]);
                }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Reset Conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Filter Chips */}
          <div className="px-3 py-2 bg-[#090a0d] border-b border-white/5 overflow-x-auto flex items-center gap-2 text-xs no-scrollbar">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => processUserQuery(p)}
                className="shrink-0 px-2.5 py-1 rounded-full text-[11px] bg-white/5 hover:bg-[#d4af37]/20 text-gray-300 hover:text-[#f3e5ab] border border-white/10 hover:border-[#d4af37]/40 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-md ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#b8973b] text-black font-medium'
                      : 'bg-[#181a20] text-gray-200 border border-white/10 leading-relaxed'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>

                  {/* Render Action Buttons (e.g. [Buy a Horse →], [View Sultan Details →]) */}
                  {m.actionLinks && m.actionLinks.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-2">
                      {m.actionLinks.map((btn, bIdx) => (
                        <Link
                          key={bIdx}
                          href={btn.href}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#aa8222] shadow-[0_2px_8px_rgba(212,175,55,0.3)] hover:scale-105 transition-all"
                        >
                          <span>{btn.label}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Render Available Horses Grid */}
                  {m.mediaType === 'available-horses' && m.horses && m.horses.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2">
                      {m.horses.map((h) => (
                        <div
                          key={h.id}
                          className="flex items-center gap-2.5 p-2 rounded-xl bg-black/40 border border-white/10 hover:border-[#d4af37]/40 transition-colors"
                        >
                          <img
                            src={h.images[0]}
                            alt={h.name}
                            className="w-12 h-12 rounded-lg object-cover border border-[#d4af37]/30 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white text-xs truncate">{h.name}</span>
                              <span className="text-[11px] font-semibold text-[#f3e5ab]">{h.price}</span>
                            </div>
                            <p className="text-[10px] text-gray-400 truncate">
                              {h.breed} • {h.ageDisplay} • {h.genderRole}
                            </p>
                            <div className="mt-1 flex items-center gap-3 text-[10px]">
                              <Link
                                href={`/horses/${h.id}`}
                                onClick={() => setIsOpen(false)}
                                className="text-[#d4af37] hover:underline font-semibold"
                              >
                                Details →
                              </Link>
                              <Link
                                href={`/buy?horse=${h.id}`}
                                onClick={() => setIsOpen(false)}
                                className="text-emerald-400 hover:underline font-semibold"
                              >
                                Buy →
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Render Horse Photo Gallery right inside chat */}
                  {m.mediaType === 'images' && m.horse && (
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <div className="grid grid-cols-3 gap-1.5 mb-2">
                        {m.horse.images.map((img, i) => (
                          <div
                            key={i}
                            className="aspect-[4/3] rounded-lg overflow-hidden border border-white/20 bg-black group"
                          >
                            <img
                              src={img}
                              alt={`${m.horse?.name} photo ${i + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                        ))}
                      </div>
                      <Link
                        href={`/horses/${m.horse.id}`}
                        onClick={() => setIsOpen(false)}
                        className="text-[11px] font-semibold text-[#f3e5ab] hover:underline flex items-center gap-1"
                      >
                        <span>{m.horse.name} full gallery & details →</span>
                      </Link>
                    </div>
                  )}

                  {/* Render Horse Video Preview right inside chat */}
                  {m.mediaType === 'video' && m.horse && m.horse.videos.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <div className="rounded-xl overflow-hidden aspect-[16/9] border border-[#d4af37]/40 bg-black relative">
                        {getYouTubeEmbedUrl(m.horse.videos[0].src) ? (
                          <iframe
                            src={getYouTubeEmbedUrl(m.horse.videos[0].src)!}
                            title={m.horse.videos[0].title}
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <video
                            src={m.horse.videos[0].src}
                            controls
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-[10px] text-gray-400">
                          {m.horse.videos[0].title}
                        </span>
                        <Link
                          href={`/horses/${m.horse.id}`}
                          onClick={() => setIsOpen(false)}
                          className="text-[10px] text-[#d4af37] font-semibold hover:underline"
                        >
                          Full HD Page →
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Render Horse Mini Card */}
                  {m.mediaType === 'horse-card' && m.horse && (
                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-3">
                      <img
                        src={m.horse.images[0]}
                        alt={m.horse.name}
                        className="w-14 h-14 rounded-lg object-cover border border-[#d4af37]/40 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white truncate">{m.horse.name}</div>
                        <div className="text-[10px] text-gray-400 truncate">
                          {m.horse.breed} • {m.horse.price} • {m.horse.availability}
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <Link
                            href={`/horses/${m.horse.id}`}
                            onClick={() => setIsOpen(false)}
                            className="text-[10px] text-[#d4af37] hover:underline font-semibold"
                          >
                            Details
                          </Link>
                          <span>•</span>
                          <Link
                            href={`/buy?horse=${m.horse.id}`}
                            onClick={() => setIsOpen(false)}
                            className="text-[10px] text-emerald-400 hover:underline font-semibold"
                          >
                            Buy / Enquire
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-gray-500 mt-1 px-1">
                  {m.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-[#181a20] border border-white/10 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-[#13151a] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                chatLanguage === 'english'
                  ? 'Ask about Sultan, price, photos, buying...'
                  : chatLanguage === 'hindi'
                  ? 'सुल्तान, राजवीर, कीमत, फोटो या खरीद के बारे में पूछें...'
                  : 'Sultan, Rajveer, price, photo ya buying ke baare me poochhein...'
              }
              className="flex-1 bg-[#1a1c23] border border-white/15 focus:border-[#d4af37] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] text-black font-semibold hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
