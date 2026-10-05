const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const mediaConfig = {
  horses: {
    sultan: {
      images: [
        'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=1200&q=85'
      ],
      videos: [
        'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        'https://www.w3schools.com/html/mov_bbb.mp4'
      ]
    },
    rajveer: {
      images: [
        'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=85'
      ],
      videos: [
        'https://filesamples.com/samples/video/mp4/sample_640x360.mp4'
      ]
    },
    noor: {
      images: [
        'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=1200&q=85'
      ],
      videos: [
        'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
      ]
    },
    badal: {
      images: [
        'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1494955870715-979ca4f13bf0?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1200&q=85'
      ],
      videos: [
        'https://www.w3schools.com/html/mov_bbb.mp4'
      ]
    },
    chetak: {
      images: [
        'https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1566251037378-5e04e3bec343?auto=format&fit=crop&w=1200&q=85'
      ],
      videos: [
        'https://filesamples.com/samples/video/mp4/sample_640x360.mp4'
      ]
    },
    tara: {
      images: [
        'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1457530378978-8bac673b8062?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=85'
      ],
      videos: [
        // Tara has no video yet to test requirement 29: "Video coming soon" placeholder!
      ]
    }
  },
  farm: {
    'hero-bg.jpg': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1920&q=85',
    'stables.jpg': 'https://images.unsplash.com/photo-1538370965046-79c0d6907d47?auto=format&fit=crop&w=1200&q=85',
    'arena.jpg': 'https://images.unsplash.com/photo-1566251037378-5e04e3bec343?auto=format&fit=crop&w=1200&q=85',
    'pasture.jpg': 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=85',
    'riding.jpg': 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?auto=format&fit=crop&w=1200&q=85',
    'grooming.jpg': 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=1200&q=85',
    'heritage.jpg': 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=85'
  }
};

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    
    function makeReq(currentUrl, redirects = 0) {
      if (redirects > 5) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(new Error('Too many redirects'));
      }
      
      const req = client.get(currentUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const nextUrl = res.headers.location.startsWith('http') 
            ? res.headers.location 
            : new URL(res.headers.location, currentUrl).href;
          return makeReq(nextUrl, redirects + 1);
        }
        
        if (res.statusCode !== 200) {
          file.close();
          fs.unlink(dest, () => {});
          return reject(new Error(`Failed with status ${res.statusCode} for ${currentUrl}`));
        }
        
        res.pipe(file);
        file.on('finish', () => {
          file.close(() => resolve(dest));
        });
      });
      
      req.on('error', (err) => {
        file.close();
        fs.unlink(dest, () => {});
        reject(err);
      });
    }
    
    makeReq(url);
  });
}

async function run() {
  console.log('--- Starting Media Download ---');
  
  // Create base dirs
  const publicDir = path.join(__dirname, '..', 'public');
  const horsesBaseDir = path.join(publicDir, 'horses');
  const farmBaseDir = path.join(publicDir, 'farm');
  
  fs.mkdirSync(horsesBaseDir, { recursive: true });
  fs.mkdirSync(farmBaseDir, { recursive: true });
  
  // Download farm images
  console.log('Downloading farm media...');
  for (const [filename, url] of Object.entries(mediaConfig.farm)) {
    const dest = path.join(farmBaseDir, filename);
    try {
      await downloadFile(url, dest);
      console.log(`✓ Farm: ${filename}`);
    } catch (e) {
      console.error(`✗ Error downloading ${filename}:`, e.message);
    }
  }
  
  // Download horses media
  console.log('\nDownloading horse-specific media...');
  for (const [horseId, media] of Object.entries(mediaConfig.horses)) {
    const horseDir = path.join(horsesBaseDir, horseId);
    fs.mkdirSync(horseDir, { recursive: true });
    
    // Images
    for (let i = 0; i < media.images.length; i++) {
      const filename = `${horseId}-${i + 1}.jpg`;
      const dest = path.join(horseDir, filename);
      try {
        await downloadFile(media.images[i], dest);
        console.log(`✓ [${horseId}] Image: ${filename}`);
      } catch (e) {
        console.error(`✗ Error downloading ${horseId} image ${i + 1}:`, e.message);
      }
    }
    
    // Videos
    for (let i = 0; i < media.videos.length; i++) {
      const filename = `${horseId}-${i + 1}.mp4`;
      const dest = path.join(horseDir, filename);
      try {
        await downloadFile(media.videos[i], dest);
        console.log(`✓ [${horseId}] Video: ${filename}`);
      } catch (e) {
        console.error(`✗ Error downloading ${horseId} video ${i + 1}:`, e.message);
      }
    }
  }
  
  console.log('\n--- Media Download Completed! ---');
}

run();
