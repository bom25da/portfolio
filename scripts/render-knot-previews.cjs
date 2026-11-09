// Rasterize the original vectors for browser fallbacks and a review sheet.
// Pass a directory containing an installed sharp package, then the preview output directory.
const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require(require.resolve('sharp', {paths:[process.cwd(), ...(process.argv[2] ? [process.argv[2]] : [])]}));
const root = path.resolve(__dirname, '..');
const assets = path.join(root, 'dist', 'assets');
const output = path.resolve(process.argv[3] || path.join(root, '.sites-runtime', 'knot-preview'));

async function main(){
  await fs.mkdir(output, {recursive:true});
  const icon = await fs.readFile(path.join(assets, 'favicon-knot.svg'));
  const sizes = [16, 32, 48, 64, 180];
  const pngs = await Promise.all(sizes.map(size=>sharp(icon, {density:288}).resize(size,size).png().toBuffer()));
  for(let i=0;i<sizes.length;i++){
    const filename = sizes[i]===180 ? 'apple-touch-icon-knot.png' : `favicon-knot-${sizes[i]}.png`;
    await fs.writeFile(path.join(assets, filename), pngs[i]);
  }
  const icoHeader=Buffer.alloc(6+4*16);
  icoHeader.writeUInt16LE(1,2);icoHeader.writeUInt16LE(4,4);
  let offset=icoHeader.length;
  for(let i=0;i<4;i++){
    const entry=6+i*16;
    icoHeader[entry]=sizes[i];icoHeader[entry+1]=sizes[i];
    icoHeader.writeUInt16LE(1,entry+4);icoHeader.writeUInt16LE(32,entry+6);
    icoHeader.writeUInt32LE(pngs[i].length,entry+8);icoHeader.writeUInt32LE(offset,entry+12);
    offset+=pngs[i].length;
  }
  await fs.writeFile(path.join(root,'dist','favicon.ico'),Buffer.concat([icoHeader,...pngs.slice(0,4)]));
  await sharp(path.join(assets,'knot-3d.svg'),{density:144}).resize(1040,1040).png().toFile(path.join(assets,'knot-3d-balanced.png'));
  const tube=await sharp(path.join(assets,'knot-3d-balanced.png')).resize(600,600).png().toBuffer();
  const flat=await sharp(path.join(assets,'knot-2d.svg'),{density:576}).resize(300,300).png().toBuffer();
  const largeIcon=await sharp(icon,{density:576}).resize(256,256).png().toBuffer();
  await fs.writeFile(path.join(output,'knot-3d.png'),tube);
  await fs.writeFile(path.join(output,'knot-2d.png'),flat);
  await fs.writeFile(path.join(output,'favicon-preview.png'),largeIcon);
  const data=bytes=>`data:image/png;base64,${bytes.toString('base64')}`;
  const preview=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760">
  <rect width="1200" height="760" fill="#efefea"/>
  <g font-family="Arial,sans-serif" fill="#161714"><text x="50" y="56" font-size="18" font-weight="700" letter-spacing="1">KYUNGWON KWON / ONE CONTINUOUS KNOT</text><path d="M50 83H1150M640 119V699" stroke="#c7c8bf"/>
  <g font-family="monospace" font-size="12"><text x="50" y="128">01 / SMOOTH 3D FORM</text><text x="695" y="128">02 / FLAT MARK &amp; FAVICON</text></g>
  <image href="${data(tube)}" x="35" y="140" width="560" height="560"/>
  <image href="${data(flat)}" x="707" y="176" width="190" height="190"/>
  <image href="${data(largeIcon)}" x="949" y="195" width="156" height="156"/>
  <g font-family="monospace" font-size="10" fill="#676861"><text x="756" y="396">2D / VECTOR</text><text x="973" y="396">FAVICON / 64 PX</text></g>
  <rect x="697" y="463" width="448" height="100" rx="12" fill="#e3e4dc" stroke="#c7c8bf"/>
  <image href="${data(pngs[0])}" x="721" y="505" width="16" height="16"/>
  <text x="750" y="518" font-size="15">springcotton.com</text><text x="1106" y="518" font-size="17">×</text>
  <g font-family="monospace" font-size="10" fill="#676861"><text x="698" y="591">BROWSER TAB / ACTUAL 16 PX ICON</text><text x="50" y="719">CLOSED CURVE / CONTINUOUS SURFACE</text><text x="695" y="719">SVG + 16 / 32 / 48 / 64 PX + APPLE TOUCH</text></g>
  </g></svg>`;
  await fs.writeFile(path.join(output,'knot-design-preview.svg'),preview);
  await sharp(Buffer.from(preview)).png().toFile(path.join(output,'knot-design-preview.png'));
  console.log(JSON.stringify({preview:path.join(output,'knot-design-preview.png'),favicon:path.join(output,'favicon-preview.png'),generated:sizes}));
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
