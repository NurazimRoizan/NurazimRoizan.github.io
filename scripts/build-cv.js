const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const cvYaml = path.join(rootDir, 'cv', 'Nurazim_Roizan_CV.yaml');
const outputDir = path.join(rootDir, 'cv', 'rendercv_output');
const targetPdf = path.join(rootDir, 'public', 'Nurazim_Roizan_CV.pdf');

console.log('Rendering CV with RenderCV...');
execSync(`python -m rendercv render "${cvYaml}"`, {
  cwd: path.join(rootDir, 'cv'),
  stdio: 'inherit',
  env: { ...process.env, PYTHONIOENCODING: 'utf-8', PYTHONUTF8: '1' }
});

const pdfFiles = fs.readdirSync(outputDir).filter(f => f.endsWith('.pdf'));
if (pdfFiles.length > 0) {
  // Pick the newest or matched PDF
  const newestPdf = pdfFiles.map(f => ({
    name: f,
    time: fs.statSync(path.join(outputDir, f)).mtime.getTime()
  })).sort((a, b) => b.time - a.time)[0].name;

  const sourcePdf = path.join(outputDir, newestPdf);
  fs.copyFileSync(sourcePdf, targetPdf);
  console.log(`✅ Successfully copied ${newestPdf} to public/Nurazim_Roizan_CV.pdf!`);
} else {
  console.error(`❌ No PDF generated in ${outputDir}`);
  process.exit(1);
}
