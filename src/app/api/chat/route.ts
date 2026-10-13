import { NextResponse } from 'next/server';
import { getHorses, getHorseById, getFarmhousePackages, getExperiences } from '@/lib/db';
import { FARM_CONFIG } from '@/data/config';

export async function POST(req: Request) {
  try {
    const { message, language = 'english', history = [] } = await req.json();

    if (!message || message.trim() === '') {
      return NextResponse.json({ error: 'Message cannot be empty.' }, { status: 400 });
    }

    const allHorses = await getHorses({ status: 'approved' });
    const packages = await getFarmhousePackages();
    const experiences = await getExperiences();

    // Check if Gemini API key is provided
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (apiKey) {
      try {
        const systemPrompt = `You are the official Equestrian Concierge for "Horse County" and "Yog Maya Range" located in Jodhpur, Rajasthan, India.
Tagline: "HORSES • HERITAGE • PASSION".
Farmhouse Name: "Yog Maya Range".

Current Live Approved Horses Database:
${JSON.stringify(allHorses.map(h => ({
  id: h.id,
  name: h.name,
  breed: h.breed,
  age: h.ageDisplay,
  gender: h.genderRole,
  height: h.height,
  color: h.color,
  price: h.price,
  rawPrice: h.rawPrice,
  availability: h.availability,
  training: h.training,
  lineage: h.lineage,
  description: h.description,
  link: `/horses/${h.id}`
})), null, 2)}

Farmhouse & Event Packages at Yog Maya Range:
${JSON.stringify(packages.map(p => ({
  name: p.name,
  duration: p.duration,
  capacity: p.guestCapacity,
  price: p.price,
  description: p.description
})), null, 2)}

Supported Experiences:
${JSON.stringify(experiences.map(e => ({
  title: e.title,
  duration: e.duration,
  price: e.price
})), null, 2)}

Strict Guidelines:
1. Respond in the language the user speaks: Hindi (Devanagari), Hinglish (Roman Hindi), or English.
2. Only mention horses and facts that exist in the database above. Never invent fake horses, fake breeds, or fake prices.
3. If no horse matches their price or criteria, clearly say no horse is currently listed under that condition and suggest contacting concierge or browsing all available horses.
4. For horse selling queries, explain our 4-step consignment review process and provide the link /sell.
5. For booking farmhouse or event queries, mention Yog Maya Range facilities and link /book or /farmhouse.
6. Keep tone noble, polite, hospitable, and concise.`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [{ text: `${systemPrompt}\n\nUser Question: "${message}"` }]
                }
              ],
              generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 600
              }
            })
          }
        );

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (aiText) {
            // Find if any horse was mentioned to attach interactive card
            const matchedHorse = allHorses.find(h => message.toLowerCase().includes(h.name.toLowerCase()));

            return NextResponse.json({
              reply: aiText,
              horse: matchedHorse || null,
              provider: 'gemini'
            });
          }
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to local engine:', geminiError);
      }
    }

    // Local Intelligent Grounded Response Engine (Hindi, Hinglish, English)
    const lower = message.toLowerCase();

    // 1. Price-based search: e.g. "3 lakh ke andar", "under 300000", "below 2.5 lakh", "price"
    const priceMatch = lower.match(/(?:under|below|less than|ke andar|se kam|budget|price|ke niche)\s*(?:of|rs\.?|inr|₹)?\s*(\d+(?:\.\d+)?)\s*(?:lakh|l|lac|k|000)?/i) ||
      lower.match(/(\d+(?:\.\d+)?)\s*(?:lakh|l|lac)\s*(?:ke andar|se kam|tak|budget|under|below)/i);

    if (priceMatch) {
      let limitNum = parseFloat(priceMatch[1]);
      if (lower.includes('lakh') || lower.includes('lac') || lower.includes(' l')) {
        limitNum = limitNum * 100000;
      } else if (limitNum < 100) {
        limitNum = limitNum * 100000;
      }

      const affordable = allHorses.filter(h => h.rawPrice <= limitNum && h.availability === 'Available');

      if (affordable.length > 0) {
        const horseListText = affordable.map(h => `• ${h.name} (${h.breed}, ${h.genderRole}) — ${h.price}`).join('\n');
        const reply = lower.includes('kya') || lower.includes('batao') || lower.includes('hai') || lower.includes('andar')
          ? `₹${(limitNum / 100000).toFixed(1)} Lakh के बजट में हमारे पास निम्नलिखित घोड़े उपलब्ध हैं:\n\n${horseListText}\n\nआप किसी भी घोड़े की विस्तृत जानकारी देख सकते हैं या ट्रायल राइडिंग बुक कर सकते हैं।`
          : `Here are the horses currently available under ₹${(limitNum / 100000).toFixed(1)} Lakh:\n\n${horseListText}\n\nYou can click on any horse profile to view videos, pedigree, or submit a purchase enquiry.`;

        return NextResponse.json({
          reply,
          horses: affordable,
          actionLinks: [{ label: 'View All Horses', href: '/horses' }]
        });
      } else {
        const minHorse = allHorses.reduce((prev, curr) => prev.rawPrice < curr.rawPrice ? prev : curr);
        const reply = lower.includes('hai') || lower.includes('andar') || lower.includes('kam')
          ? `वर्तमान में ₹${(limitNum / 100000).toFixed(1)} Lakh के अंदर कोई घोड़ा सूचीबद्ध नहीं है। हमारी न्यूनतम शुरुआती कीमत ${minHorse.name} के लिए ${minHorse.price} है। आप अधिक जानकारी के लिए हमारे कन्सीयर्ज से संपर्क कर सकते हैं।`
          : `Currently, no horses are listed under ₹${(limitNum / 100000).toFixed(1)} Lakh. Our starting collection begins with ${minHorse.name} at ${minHorse.price}.`;

        return NextResponse.json({
          reply,
          actionLinks: [{ label: 'Explore All Horses', href: '/horses' }, { label: 'Contact Concierge', href: '/contact' }]
        });
      }
    }

    // 2. Specific Horse query (Sultan, Rajveer, Noor, Badal, Chetak, Tara)
    const mentionedHorse = allHorses.find(h => lower.includes(h.name.toLowerCase()));
    if (mentionedHorse) {
      const isHindi = lower.includes('kya') || lower.includes('batao') || lower.includes('hai') || lower.includes('kaise') || lower.includes('ke baare');

      let reply = '';
      if (lower.includes('price') || lower.includes('keemat') || lower.includes('kitne') || lower.includes('cost')) {
        reply = isHindi
          ? `${mentionedHorse.name} (${mentionedHorse.breed}) की कीमत ${mentionedHorse.price} है। स्थिति: ${mentionedHorse.availability}। इसमें संपूर्ण पशु चिकित्सा प्रमाण पत्र (Vet Clearance) शामिल है।`
          : `The acquisition price for ${mentionedHorse.name} (${mentionedHorse.breed} ${mentionedHorse.genderRole}) is ${mentionedHorse.price}. Current Status: ${mentionedHorse.availability}. Includes comprehensive veterinary inspection.`;
      } else if (lower.includes('photo') || lower.includes('pic') || lower.includes('image') || lower.includes('video') || lower.includes('dekh')) {
        reply = isHindi
          ? `यहाँ ${mentionedHorse.name} की आधिकारिक तस्वीरें और वीडियो हैं। आप इसकी प्रोफाइल पर जाकर सभी सत्यापित तस्वीरें देख सकते हैं।`
          : `Here is the dedicated media showcase for ${mentionedHorse.name}. Every photograph and video is authentic and belongs strictly to this horse.`;
      } else {
        reply = isHindi
          ? `${mentionedHorse.name} एक ${mentionedHorse.ageDisplay} का शुद्ध ${mentionedHorse.breed} ${mentionedHorse.genderRole} है।\n• कद: ${mentionedHorse.height}\n• रंग: ${mentionedHorse.color}\n• ट्रेनिंग: ${mentionedHorse.training}\n• कीमत: ${mentionedHorse.price}\n• स्थिति: ${mentionedHorse.availability}`
          : `${mentionedHorse.name} is a magnificent ${mentionedHorse.ageDisplay} purebred ${mentionedHorse.breed} ${mentionedHorse.genderRole}.\n• Height: ${mentionedHorse.height}\n• Color: ${mentionedHorse.color}\n• Training: ${mentionedHorse.training}\n• Valuation: ${mentionedHorse.price}\n• Availability: ${mentionedHorse.availability}`;
      }

      return NextResponse.json({
        reply,
        horse: mentionedHorse,
        actionLinks: [
          { label: `View ${mentionedHorse.name} Profile`, href: `/horses/${mentionedHorse.id}` },
          { label: `Buy ${mentionedHorse.name}`, href: `/buy?horse=${mentionedHorse.id}` },
          { label: `Book Trial for ${mentionedHorse.name}`, href: `/book?horse=${mentionedHorse.id}` }
        ]
      });
    }

    // 3. Selling Horse query
    if (lower.includes('sell') || lower.includes('bechna') || lower.includes('beche') || lower.includes('consignment')) {
      const isHindi = lower.includes('karna') || lower.includes('hai') || lower.includes('kaise') || lower.includes('bechna');
      const reply = isHindi
        ? `Horse County में अपना घोड़ा बेचने (Sell Your Horse) की प्रक्रिया सरल और पारदर्शी है:\n\n1. "Sell Your Horse" पेज पर फॉर्म भरें और घोड़े की फोटो/वीडियो अपलोड करें।\n2. हमारी पशु चिकित्सा और वंशावली मूल्यांकन समिति आपके विवरण की जांच करेगी।\n3. स्वीकृति के बाद आपका घोड़ा हमारे विशिष्ट खरीदार नेटवर्क में प्रकाशित हो जाएगा।`
        : `The horse consignment process at Horse County consists of 4 steps:\n\n1. Submit your horse specifications, lineage, and photos via the Sell Your Horse portal.\n2. Our Stud Evaluation Board reviews health, conformation, and pedigree.\n3. Upon approval, your horse is published to our verified equestrian buyers network.`;

      return NextResponse.json({
        reply,
        actionLinks: [{ label: 'Sell Your Horse Page', href: '/sell' }]
      });
    }

    // 4. Farmhouse & Event Booking at Yog Maya Range
    if (lower.includes('farm') || lower.includes('farmhouse') || lower.includes('yog maya') || lower.includes('event') || lower.includes('party') || lower.includes('wedding') || lower.includes('shoot')) {
      const isHindi = lower.includes('karna') || lower.includes('hai') || lower.includes('ke liye') || lower.includes('book');
      const reply = isHindi
        ? `योग माया रेंज (Yog Maya Range) हमारे 150 एकड़ का हेरिटेज फार्महाउस और इक्वेस्ट्रियन सैंक्चुअरी है।\n\nयहाँ आप निम्नलिखित इवेंट्स बुक कर सकते हैं:\n• प्री-वेडिंग और फैशन फोटोशूट्स (रॉयल घोड़ों के साथ)\n• प्राइवेट बर्थडे और एनिवर्सरी पार्टीज\n• क्लासिकल राइडिंग सेशंस और फार्म टूर\n\nआप सीधे ऑनलाइन बुकिंग रिक्वेस्ट भेज सकते हैं।`
        : `Yog Maya Range is our premier 150-acre Rajasthan farmhouse and equestrian estate.\n\nAvailable Event & Stay Options:\n• Pre-wedding and film photoshoots with purebred warhorses\n• Private celebrations, birthdays, and anniversaries\n• Classical arena riding masterclasses and stable tours\n\nSubmit your booking request online to reserve dates.`;

      return NextResponse.json({
        reply,
        actionLinks: [
          { label: 'Explore Yog Maya Range', href: '/farmhouse' },
          { label: 'Book Farmhouse Event', href: '/book' }
        ]
      });
    }

    // 5. General greeting or inquiry fallback
    const isHindi = lower.includes('namaste') || lower.includes('kaise') || lower.includes('kya') || lower.includes('batao');
    const reply = isHindi
      ? `नमस्ते! 🙏 मैं हॉर्स काउंटी (Horse County) और योग माया रेंज (Yog Maya Range) का एआई असिस्टेंट हूँ।\n\nआप मुझसे हमारे मारवाड़ी/काठियावाड़ी घोड़ों, कीमतों, फोटो/वीडियो, घोड़ा बेचने की प्रक्रिया, या फार्महाउस बुकिंग के बारे में पूछ सकते हैं।`
      : `Welcome to Horse County & Yog Maya Range! I can assist you with:\n\n• Exploring available Marwari and Kathiawari horses & pricing\n• Selling your horse through verified consignment\n• Booking trial riding or private visits\n• Yog Maya Range farmhouse & photoshoot bookings`;

    return NextResponse.json({
      reply,
      actionLinks: [
        { label: 'Explore Horses', href: '/horses' },
        { label: 'Sell Your Horse', href: '/sell' },
        { label: 'Book Visit / Farmhouse', href: '/book' }
      ]
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error processing chat query' }, { status: 500 });
  }
}
