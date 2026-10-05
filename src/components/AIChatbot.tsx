'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { HORSES_DATA, Horse } from '@/data/horses';
import { FARM_CONFIG } from '@/data/config';
import {
  Sparkles,
  X,
  Send,
  ArrowRight,
  Maximize2,
  ExternalLink,
  Play,
  RotateCcw
} from 'lucide-react';
import { getYouTubeEmbedUrl } from '@/utils/media';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
  mediaType?: 'images' | 'video' | 'horse-card' | 'quick-links';
  horse?: Horse;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: `नमस्ते! 🙏 ${FARM_CONFIG.name} में आपका स्वागत है।\n\nमैं आपका रॉयल हॉर्स असिस्टेंट हूँ। आप मुझसे किसी भी भाषा (हिंदी, English या Hinglish) में बात कर सकते हैं।\n\nसिर्फ़ किसी भी घोड़े का नाम लिखें (जैसे Sultan, Rajveer, Noor, Badal, Chetak, Tara) और मैं उसकी पूरी जानकारी, फ़ोटो और वीडियो आपको दिखा दूँगा!`,
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
  }, []);

  const quickPrompts = [
    'Sultan ke baare me batao',
    'Sultan ki photos dikhao',
    'Sultan ka video',
    'Available Ghode',
    'Ghodo ke Price / Rate',
    'Ghoda kaise kharide?',
    'Ghoda book kaise kare?',
    'Farm ke baare me'
  ];

  // Helper function to detect Hindi / Hinglish
  const isHindiOrHinglish = (txt: string): boolean => {
    // Check Devanagari Unicode range
    if (/[\u0900-\u097F]/.test(txt)) return true;

    // Check common Roman Hindi / Hinglish keywords
    const hindiWords = [
      'kya', 'hai', 'hain', 'ka', 'ki', 'ke', 'ko', 'batao', 'dikhao', 'kaisa', 'kaisi',
      'kitna', 'kitne', 'dam', 'daam', 'keemat', 'kharidna', 'bechna', 'chahiye',
      'ghoda', 'ghode', 'ghodi', 'namaste', 'ram', 'pranam', 'kaise', 'lena',
      'dekho', 'kaha', 'kahan', 'bhai', 'mujhe', 'muja', 'mera', 'meri', 'bata',
      'dikha', 'rate', 'paisa', 'rupaye', 'aana', 'mil', 'milega'
    ];
    const words = txt.toLowerCase().split(/\s+/);
    return words.some((w) => hindiWords.includes(w));
  };

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
      const isHindi = isHindiOrHinglish(q);
      let replyText = '';
      let mediaType: ChatMessage['mediaType'];
      let targetHorse: Horse | undefined;

      // 1. Identify if ANY horse is mentioned (even partial match or slight spelling like 'sulthan')
      const horseNames = [
        { key: 'sultan', match: ['sultan', 'sulthan', 'sulta'] },
        { key: 'rajveer', match: ['rajveer', 'rajvir', 'rajveere'] },
        { key: 'noor', match: ['noor', 'nur'] },
        { key: 'badal', match: ['badal', 'baadal'] },
        { key: 'chetak', match: ['chetak', 'chethak'] },
        { key: 'tara', match: ['tara', 'taara'] }
      ];

      for (const hItem of horseNames) {
        if (hItem.match.some((m) => q.includes(m))) {
          targetHorse = HORSES_DATA.find((h) => h.id === hItem.key);
          break;
        }
      }

      // If a horse is identified
      if (targetHorse) {
        // A. PHOTO REQUEST (photo, tasveer, pic, image, dikhao)
        if (
          q.includes('photo') ||
          q.includes('image') ||
          q.includes('pic') ||
          q.includes('tasveer') ||
          q.includes('tasveere') ||
          q.includes('picture') ||
          q.includes('dikha')
        ) {
          mediaType = 'images';
          if (isHindi) {
            replyText = `ये लीजिए ${targetHorse.name} की असली और प्रमाणित तस्वीरें। हमारी सख्त फार्म नीति के अनुसार ये सिर्फ़ ${targetHorse.name} की ही तस्वीरें हैं।`;
          } else {
            replyText = `Here are ${targetHorse.name}'s verified photos. Each photo belongs exclusively to ${targetHorse.name}.`;
          }
        }
        // B. VIDEO REQUEST (video, clip, chalne ka, motion, run, daud)
        else if (
          q.includes('video') ||
          q.includes('clip') ||
          q.includes('chalne') ||
          q.includes('daud') ||
          q.includes('action') ||
          q.includes('motion')
        ) {
          if (targetHorse.videos.length > 0) {
            mediaType = 'video';
            if (isHindi) {
              replyText = `ये लीजिए ${targetHorse.name} का चाल और एक्शन वीडियो। आप इसे यहीं देख सकते हैं:`;
            } else {
              replyText = `Here is ${targetHorse.name}'s dedicated motion video:`;
            }
          } else {
            if (isHindi) {
              replyText = `${targetHorse.name} का वीडियो जल्द ही आ रहा है। फार्म के नियमों के अनुसार हम किसी दूसरे घोड़े का वीडियो नहीं दिखाते हैं।`;
            } else {
              replyText = `Video coming soon for ${targetHorse.name}. In accordance with our strict sanctuary policy, we never show another horse's video.`;
            }
          }
        }
        // C. PRICE / RATE REQUEST (price, rate, dam, keemat, kitne, cost, rupaye)
        else if (
          q.includes('price') ||
          q.includes('rate') ||
          q.includes('dam') ||
          q.includes('daam') ||
          q.includes('keemat') ||
          q.includes('kitne') ||
          q.includes('cost') ||
          q.includes('rupaye') ||
          q.includes('paisa')
        ) {
          mediaType = 'horse-card';
          if (isHindi) {
            replyText = `${targetHorse.name} (${targetHorse.breed}) की कीमत ${targetHorse.price} है।\n\n• उम्र: ${targetHorse.ageDisplay}\n• ऊँचाई: ${targetHorse.height}\n• स्थिति: ${targetHorse.availability === 'Available' ? 'उपलब्ध (Available)' : targetHorse.availability}\n\nआप नीचे दिए गए बटन से इसे खरीदने या देखने के लिए एन्क्वायरी भेज सकते हैं:`;
          } else {
            replyText = `${targetHorse.name} (${targetHorse.breed}) is valued at ${targetHorse.price}.\n\n• Age: ${targetHorse.ageDisplay}\n• Height: ${targetHorse.height}\n• Status: ${targetHorse.availability}\n\nYou can submit an enquiry below to buy or book a private trial:`;
          }
        }
        // D. GENERAL / HORSE NAME ONLY (Even if the user just typed "Sultan" or "Sultan kaisa hai")
        else {
          mediaType = 'horse-card';
          if (isHindi) {
            replyText = `${targetHorse.name} एक बहुत ही शानदार ${targetHorse.ageDisplay} का ${targetHorse.breed} ${targetHorse.gender === 'Male' ? 'नर (Stallion)' : 'मादा (Mare)'} घोड़ा है।\n\n• कीमत: ${targetHorse.price}\n• ऊँचाई: ${targetHorse.height}\n• स्थिति: ${targetHorse.availability === 'Available' ? 'उपलब्ध (Available)' : targetHorse.availability}\n• स्वभाव: ${targetHorse.temperament}\n• ट्रेनिंग: ${targetHorse.training}\n\nआप इसकी फ़ोटो या वीडियो देखने के लिए लिख सकते हैं: "${targetHorse.name} ki photo" या "${targetHorse.name} ka video"!`;
          } else {
            replyText = `${targetHorse.name} is a magnificent ${targetHorse.ageDisplay} ${targetHorse.breed} ${targetHorse.gender.toLowerCase()} horse.\n\n• Price: ${targetHorse.price}\n• Height: ${targetHorse.height}\n• Status: ${targetHorse.availability}\n• Temperament: ${targetHorse.temperament}\n• Training: ${targetHorse.training}\n\nYou can type "${targetHorse.name} photos" or "${targetHorse.name} video" to see more!`;
          }
        }
      }
      // 2. NO HORSE MENTIONED - GENERAL TOPICS

      // A. Greetings (namaste, ram ram, hello, hi, kaise ho, kya haal)
      else if (
        q.includes('namaste') ||
        q.includes('ram') ||
        q.includes('pranam') ||
        q.includes('hello') ||
        q.includes('hi') ||
        q.includes('hey') ||
        q.includes('kaise ho') ||
        q.includes('kya haal')
      ) {
        if (isHindi) {
          replyText = `नमस्ते! राम-राम सा! 🙏\n\n${FARM_CONFIG.name} में आपका स्वागत है। आप हमारे किसी भी घोड़े के बारे में पूछ सकते हैं:\n• Sultan\n• Rajveer\n• Noor\n• Badal\n• Chetak\n• Tara\n\nबस किसी भी घोड़े का नाम लिखें या पूछें कि घोड़ा कैसे खरीदना या बुक करना है!`;
        } else {
          replyText = `Greetings! Welcome to ${FARM_CONFIG.name}.\n\nYou can ask about any of our royal horses:\n• Sultan\n• Rajveer\n• Noor\n• Badal\n• Chetak\n• Tara\n\nJust type any horse name or ask how to buy, book, or visit!`;
        }
      }
      // B. Available Horses (available, konse, kitne, ghode, uplabdh)
      else if (
        q.includes('available') ||
        q.includes('uplabdh') ||
        q.includes('konse') ||
        q.includes('which horse') ||
        q.includes('what horse') ||
        q.includes('stock') ||
        (q.includes('kitne') && q.includes('ghod'))
      ) {
        const available = HORSES_DATA.filter((h) => h.availability === 'Available');
        if (isHindi) {
          const list = available.map((h) => `• ${h.name} (${h.breed}, ${h.ageDisplay}) — ${h.price}`).join('\n');
          replyText = `वर्तमान में हमारे पास ये घोड़े उपलब्ध (Available) हैं:\n\n${list}\n\nआप किसी भी घोड़े का नाम लिखकर उसके फोटो, वीडियो या डिटेल्स देख सकते हैं!`;
        } else {
          const list = available.map((h) => `• ${h.name} (${h.breed}, ${h.ageDisplay}) — ${h.price}`).join('\n');
          replyText = `Currently available horses in our collection:\n\n${list}\n\nType any horse name to see their full profile, photos, and video!`;
        }
      }
      // C. Price / Rates general
      else if (
        q.includes('price') ||
        q.includes('rate') ||
        q.includes('dam') ||
        q.includes('daam') ||
        q.includes('keemat') ||
        q.includes('cost') ||
        q.includes('budget') ||
        q.includes('kitna kharcha')
      ) {
        const prices = HORSES_DATA.map((h) => `• ${h.name} (${h.breed}): ${h.price} [${h.availability}]`).join('\n');
        if (isHindi) {
          replyText = `हमारे सभी घोड़ों की कीमत (Valuations) इस प्रकार है:\n\n${prices}\n\nसभी घोड़ों का पूरा मेडिकल और वेटेरिनरी चेकअप रिकॉर्ड साथ में मिलता है।`;
        } else {
          replyText = `Current horse collection pricing:\n\n${prices}\n\nAll horses include full veterinary soundness certificates.`;
        }
      }
      // D. How to Buy (buy, kharidna, lena, purchase)
      else if (
        q.includes('buy') ||
        q.includes('kharid') ||
        q.includes('lena') ||
        q.includes('purchase')
      ) {
        if (isHindi) {
          replyText = `घोड़ा खरीदने की प्रक्रिया बहुत सरल है:\n\n1. हमारी वेबसाइट पर किसी भी घोड़े को चुनें (जैसे Sultan या Rajveer)।\n2. 'Buy This Horse' या 'Buy a Horse' मेन्यू पर क्लिक करके फॉर्म भरें।\n3. हमारी टीम आपसे सीधे WhatsApp या फोन पर संपर्क करके ट्रायल राइड और ट्रांसफर की व्यवस्था करेगी।\n\nआप स्क्रीन के ऊपर 'Buy a Horse' पेज पर सीधे जा सकते हैं!`;
        } else {
          replyText = `To buy a horse:\n\n1. Select your preferred horse from our collection (e.g. Sultan, Rajveer, Noor).\n2. Click 'Buy This Horse' or visit the 'Buy a Horse' page.\n3. Submit the enquiry form, and our concierge will contact you to coordinate private trial riding, veterinary checks, and registration transfer.`;
        }
      }
      // E. How to Book / Visit (book, visit, dekhna, aana, ghumna, trial)
      else if (
        q.includes('book') ||
        q.includes('visit') ||
        q.includes('dekh') ||
        q.includes('aana') ||
        q.includes('ghumna') ||
        q.includes('trial') ||
        q.includes('tour')
      ) {
        if (isHindi) {
          replyText = `घोड़ा देखने या राइडिंग ट्रायल बुक करने के लिए:\n\n1. वेबसाइट पर 'Book a Horse' पेज पर जाएँ।\n2. अपनी पसंदीदा तारीख और समय चुनें।\n3. फॉर्म सबमिट करें — हमारा कंसीयर्ज तुरंत आपके विजिट की व्यवस्था कर देगा।`;
        } else {
          replyText = `To book a horse or visit our sanctuary:\n\n1. Go to the 'Book a Horse' page.\n2. Choose your preferred date, horse, and time slot.\n3. Submit your booking request and our concierge will confirm your private hospitality arrangements.`;
        }
      }
      // F. Sell horse (sell, bechna, bikwana)
      else if (
        q.includes('sell') ||
        q.includes('bech') ||
        q.includes('bikwa')
      ) {
        if (isHindi) {
          replyText = `अगर आप अपना घोड़ा बेचना चाहते हैं, तो वेबसाइट पर 'Sell Your Horse' पेज पर जाएँ। वहाँ अपने घोड़े की नस्ल, उम्र, फोटो और अपेक्षित दाम भरें। हमारा बोर्ड समीक्षा करके आपसे संपर्क करेगा।`;
        } else {
          replyText = `To sell your horse through our sanctuary network, please visit the 'Sell Your Horse' page and submit pedigree, height, age, photos, and expected price. Our team will review and connect with you.`;
        }
      }
      // G. About Farm / Location (farm, kahan, address, jagah, location, astabal, tabela)
      else if (
        q.includes('farm') ||
        q.includes('kahan') ||
        q.includes('address') ||
        q.includes('location') ||
        q.includes('jagah') ||
        q.includes('astabal') ||
        q.includes('tabela') ||
        q.includes('sanctuary')
      ) {
        if (isHindi) {
          replyText = `${FARM_CONFIG.name} राजस्थान के मारवाड़ हेरिटेज वैली में स्थित 150-एकड़ का एक विशाल शाही अस्तबल है। यहाँ आधुनिक महोगनी तबेले, 24 घंटे वेटेरिनरी डॉक्टर, और ओलंपिक स्तर का सैंड एरिना है। यहाँ मारवाड़ी और काठियावाड़ी घोड़ों का उच्च-स्तरीय संरक्षण किया जाता है।`;
        } else {
          replyText = `${FARM_CONFIG.name} is a 150-acre royal sanctuary located in Marwar Heritage Valley, Rajasthan. We feature climate-regulated mahogany stables, an Olympic dressage arena, and 24/7 resident veterinary supervision.`;
        }
      }
      // H. Fallback - Polite guidance
      else {
        if (isHindi) {
          replyText = `माफ़ कीजिए, मैं इसे ठीक से समझ नहीं पाया। 🙏\n\nआप मुझसे हमारे घोड़ों के बारे में कुछ भी पूछ सकते हैं, जैसे:\n• "Sultan ke baare me batao"\n• "Rajveer ki photo dikhao"\n• "Noor ka video dikhao"\n• "Available ghode konse hain"\n• "Ghodo ke rate kya hain"`;
        } else {
          replyText = `I don't have that specific information yet. You can ask about any of our horses:\n• "Tell me about Sultan"\n• "Show Sultan photos"\n• "Show Noor video"\n• "What horses are available?"\n• "Horse prices"`;
        }
      }

      const botMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mediaType,
        horse: targetHorse
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
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
            <span className="text-lg sm:text-xl">🐎</span>
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
              <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-lg">
                🐎
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Horse Assistant</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.2 rounded-full font-normal">
                    हिंदी / English
                  </span>
                </h3>
                <p className="text-[11px] text-[#c5a059]">
                  Ask about horses, photos, videos, buying & booking
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() =>
                  setMessages([
                    {
                      id: 'reset',
                      sender: 'assistant',
                      text: `Conversation refreshed. How may I assist you with our royal horses today? आप हिंदी या English में कुछ भी पूछ सकते हैं।`,
                      time: 'Just now'
                    }
                  ])
                }
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
                title="Reset Conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
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

                  {/* Render Horse Photo Gallery right inside chat */}
                  {m.mediaType === 'images' && m.horse && (
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <div className="grid grid-cols-3 gap-1.5 mb-2">
                        {m.horse.images.map((img, i) => (
                          <div
                            key={i}
                            className="aspect-[4/3] rounded-lg overflow-hidden border border-white/20 bg-black"
                          >
                            <img
                              src={img}
                              alt={`${m.horse?.name} photo ${i + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <Link
                        href={`/horses/${m.horse.id}`}
                        onClick={() => setIsOpen(false)}
                        className="text-[11px] font-semibold text-[#f3e5ab] hover:underline flex items-center gap-1"
                      >
                        <span>{m.horse.name} का पूरा पेज और डिटेल्स देखें →</span>
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
                          Full HD में देखें →
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
                        className="w-14 h-14 rounded-lg object-cover border border-[#d4af37]/40"
                      />
                      <div className="flex-1">
                        <div className="font-bold text-white">{m.horse.name}</div>
                        <div className="text-[10px] text-gray-400">
                          {m.horse.breed} • {m.horse.price}
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
              placeholder="सुलतान, राजवीर, दाम, फ़ोटो या कुछ भी पूछें..."
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
