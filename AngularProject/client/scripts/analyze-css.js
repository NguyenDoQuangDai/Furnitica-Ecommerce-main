const fs = require('fs');
const path = require('path');

// CSS Analysis Tool
function analyzeCSSFiles() {
  const cssFiles = [
    'src/assets/css/style.css',
    'src/assets/css/reponsive.css',
    'src/assets/libs/bootstrap/css/bootstrap.min.css',
    'src/assets/libs/font-awesome/css/font-awesome.min.css',
    'src/assets/libs/nivo-slider/css/nivo-slider.css',
    'src/assets/libs/owl-carousel/assets/owl.carousel.min.css',
    'src/assets/libs/slick-slider/css/slick.css',
    'src/assets/libs/slick-slider/css/slick-theme.css'
  ];

  let totalSize = 0;
  const analysis = [];

  cssFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      totalSize += stats.size;
      
      analysis.push({
        file: file,
        size: `${sizeKB} KB`,
        sizeBytes: stats.size
      });
    }
  });

  console.log('📊 CSS File Analysis:');
  console.log('========================');
  analysis.forEach(item => {
    console.log(`${item.file}: ${item.size}`);
  });
  console.log('========================');
  console.log(`Total CSS Size: ${(totalSize / 1024).toFixed(2)} KB`);
  
  // Suggestions
  console.log('\n💡 Optimization Suggestions:');
  console.log('- Use PostCSS PurgeCSS to remove unused CSS');
  console.log('- Combine similar CSS files');
  console.log('- Use CSS minification');
  console.log('- Consider using CSS-in-JS for component-specific styles');
  
  return analysis;
}

// Check for unused CSS classes
function findUnusedClasses() {
  console.log('\n🔍 Checking for potentially unused CSS...');
  
  const htmlFiles = getAllFiles('src', ['.html', '.ts']);
  const cssContent = fs.readFileSync('src/assets/css/style.css', 'utf8');
  
  // Extract CSS classes (simple regex)
  const cssClasses = cssContent.match(/\.[a-zA-Z][\w-]*/g) || [];
  const uniqueClasses = [...new Set(cssClasses.map(cls => cls.substring(1)))];
  
  const htmlContent = htmlFiles.map(file => {
    try {
      return fs.readFileSync(file, 'utf8');
    } catch (e) {
      return '';
    }
  }).join(' ');
  
  const unusedClasses = uniqueClasses.filter(className => {
    return !htmlContent.includes(className);
  });
  
  console.log(`Found ${unusedClasses.length} potentially unused classes:`);
  unusedClasses.slice(0, 20).forEach(cls => console.log(`- .${cls}`));
  
  if (unusedClasses.length > 20) {
    console.log(`... and ${unusedClasses.length - 20} more`);
  }
}

function getAllFiles(dir, extensions) {
  let files = [];
  
  function scanDir(currentDir) {
    try {
      const items = fs.readdirSync(currentDir);
      
      items.forEach(item => {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          scanDir(fullPath);
        } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
          files.push(fullPath);
        }
      });
    } catch (e) {
      // Skip directories we can't read
    }
  }
  
  scanDir(dir);
  return files;
}

// Run analysis
analyzeCSSFiles();
findUnusedClasses();
