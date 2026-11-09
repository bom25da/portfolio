"""Generate original vector artwork. Run from the repository root."""
import math
from pathlib import Path
from knot_art import write_knot_assets

OUT = Path(__file__).resolve().parents[1] / 'dist' / 'assets'
OUT.mkdir(parents=True, exist_ok=True)

def svg(w, h, body, bg=None):
    background = f'<path fill="{bg}" d="M0 0H{w}V{h}H0Z"/>' if bg else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}"><defs><filter id="shadow" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="18"/></filter><linearGradient id="paper" x2=".7" y2="1"><stop stop-color="#f5f5ee"/><stop offset="1" stop-color="#cbcdc4"/></linearGradient><linearGradient id="glass" x2="1" y2="1"><stop stop-color="#d7dbce" stop-opacity=".18"/><stop offset=".5" stop-color="#d7dbce" stop-opacity=".02"/><stop offset="1" stop-color="#d7dbce" stop-opacity=".13"/></linearGradient><radialGradient id="studio"><stop stop-color="#eceee5"/><stop offset="1" stop-color="#b6bcb0"/></radialGradient><pattern id="grid" width="45" height="45" patternUnits="userSpaceOnUse"><path d="M45 0H0V45" fill="none" stroke="#cccfc4" stroke-width=".5" opacity=".4"/></pattern></defs>{background}{body}</svg>'

def text(x,y,s,size=14,fill='#20221c',family='monospace',extra=''):
    return f'<text x="{x}" y="{y}" font-family="{family}" font-size="{size}" fill="{fill}" {extra}>{s}</text>'

def line(x,y,x2,y2,stroke='#64695d',extra=''):
    return f'<path d="M{x} {y}L{x2} {y2}" fill="none" stroke="{stroke}" {extra}/>'

def vecsub(a,b): return tuple(x-y for x,y in zip(a,b))
def cross(a,b):return (a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0])
def norm(a):
    d=math.sqrt(sum(x*x for x in a));return tuple(x/d for x in a)
def rotate(p):
    x,y,z=p
    y,z=y*math.cos(.65)-z*math.sin(.65),y*math.sin(.65)+z*math.cos(.65)
    x,z=x*math.cos(-.3)+z*math.sin(-.3),-x*math.sin(-.3)+z*math.cos(-.3)
    x,y=x*math.cos(-.35)-y*math.sin(-.35),x*math.sin(-.35)+y*math.cos(-.35)
    return x,y,z
def center(t):return ((2+.68*math.cos(3*t))*math.cos(2*t),(2+.68*math.cos(3*t))*math.sin(2*t),1.03*math.sin(3*t))

def knot(cx,cy,scale=72,steps=160,sides=20):
    vertices=[]
    for i in range(steps):
        t=i/steps*math.tau;c=center(t);tangent=norm(vecsub(center(t+.001),center(t-.001)))
        u=norm(cross(tangent,(0,0,1)));v=norm(cross(tangent,u));row=[]
        for j in range(sides):
            p=j/sides*math.tau
            row.append(rotate(tuple(c[k]+.36*(u[k]*math.cos(p)+v[k]*math.sin(p)) for k in range(3))))
        vertices.append(row)
    faces=[];light=norm((-.4,-.8,1.3))
    for i in range(steps):
        for j in range(sides):
            points=[vertices[i][j],vertices[(i+1)%steps][j],vertices[(i+1)%steps][(j+1)%sides],vertices[i][(j+1)%sides]]
            n=norm(cross(vecsub(points[1],points[0]),vecsub(points[3],points[0])))
            diffuse=abs(sum(n[k]*light[k] for k in range(3)))
            value=int(36+diffuse*155+max(0,diffuse-.8)*200)
            value=min(244,value)
            fill=f'rgb({value},{value+min(2,255-value)},{value})'
            pts=' '.join(f'{cx+x*scale:.2f},{cy+y*scale:.2f}' for x,y,z in points)
            face=f'<polygon points="{pts}" fill="{fill}" stroke="#20241a" stroke-opacity=".28" stroke-width=".35" stroke-linejoin="round"/>'
            faces.append((sum(p[2] for p in points)/4,face))
    return ''.join(p for z,p in sorted(faces))

write_knot_assets()

# Cloud platform: a structural object with explicitly conceptual system labels.
b='<rect width="1440" height="900" fill="url(#studio)"/><rect width="1440" height="900" fill="url(#grid)"/>'
b+=text(68,182,'sync.',145,'#30372b','Arial, sans-serif','font-weight="700" letter-spacing="-12"')
b+=text(74,222,'ONE CONNECTED WORKSPACE.',12,'#4c5446')
b+='<ellipse cx="760" cy="744" rx="270" ry="35" fill="#25311c" opacity=".3" filter="url(#shadow)"/>'
b+=knot(775,440,117)
for x,y,label,number in [(115,480,'CLOUD FILES','01'),(1070,300,'MEMBERSHIP','02'),(1000,690,'BILLING','03')]:
    b+=f'<rect x="{x}" y="{y}" width="225" height="83" rx="2" fill="#f3f4ed" fill-opacity=".75" stroke="#fff" stroke-opacity=".7"/>'
    b+=text(x+18,y+28,number,10,'#6d7565')+text(x+18,y+60,label,17,'#2c3324')
    b+=f'<circle cx="{x+199}" cy="{y+25}" r="3" fill="#59634c"/>'
b+=line(340,520,480,470,extra='stroke-dasharray="3 6"')+line(1070,342,990,370,extra='stroke-dasharray="3 6"')+line(1000,730,910,630,extra='stroke-dasharray="3 6"')
b+=text(72,824,'PRODUCT SYSTEM / 2022—PRESENT',11,'#555e4c')+text(1190,824,'DOF / SYNC',11,'#555e4c')
(OUT/'project-sync.svg').write_text(svg(1440,900,b))

# API architecture study.
b='<rect width="900" height="1050" fill="#1e231d"/><rect width="900" height="1050" fill="url(#grid)" opacity=".15"/>'
b+=text(56,176,'INVISIBLE',83,'#e5e9db','Arial, sans-serif','font-weight="700" letter-spacing="-5"')+text(56,254,'BY DESIGN.',83,'#e5e9db','Arial, sans-serif','font-weight="700" letter-spacing="-5"')
b+=text(60,297,'API / DATA / CONSISTENCY',12,'#9ca793')
for y,label,index in [(397,'INTERFACE','01'),(570,'API + CACHE','02'),(743,'DATA LAYER','03')]:
    b+=f'<path d="M100 {y+48}L600 {y-50}L790 {y+45}L290 {y+145}Z" fill="url(#glass)" stroke="#c7d5ba" stroke-opacity=".5"/>'
    b+=f'<path d="M100 {y+48}v20l190 97 500-100v-20M290 {y+145}v20" fill="none" stroke="#c7d5ba" stroke-opacity=".25"/>'
    b+=text(150,y+52,index,13,'#9caa91')+text(297,y+54,label,21,'#dde7d2','monospace','transform="rotate(-11 297 '+str(y+54)+')"')
for x,y in [(300,500),(530,460),(670,490),(300,674),(530,634),(670,664)]:
    b+=line(x,y,x,y+73,'#b8cda6','stroke-dasharray="3 6"')+f'<circle cx="{x}" cy="{y}" r="3" fill="#dcebd0"/>'
b+=text(60,977,'CLEAR CONTRACTS. CONSISTENT DATA.',11,'#a3ae99')
(OUT/'project-systems.svg').write_text(svg(900,1050,b))

# Multi-device interface concept; intentionally abstract, no fabricated product screenshot.
b='<rect width="900" height="1050" fill="#c7c9c0"/><circle cx="450" cy="520" r="320" fill="#dedfd7"/>'
b+=text(60,175,'ONE EXPERIENCE.',51,'#41463a','Arial, sans-serif','font-weight="700" letter-spacing="-2"')+text(60,224,'MANY FORMS.',51,'#41463a','Arial, sans-serif','font-weight="700" letter-spacing="-2"')
b+='<g transform="translate(150 336) rotate(-8 300 180)"><rect x="0" y="0" width="640" height="420" rx="10" fill="#444a3d"/><rect x="8" y="8" width="624" height="397" rx="5" fill="#eceee5"/><path d="M8 40H632" stroke="#c5cabd"/><circle cx="27" cy="24" r="3" fill="#979f8c"/><circle cx="39" cy="24" r="3" fill="#979f8c"/><circle cx="51" cy="24" r="3" fill="#979f8c"/>'
b+=text(30,76,'WORKSPACE',10,'#737d67')
for i in range(6):b+=f'<rect x="30" y="{103+i*34}" width="80" height="8" rx="2" fill="#d3d7c9"/>'
b+='<rect x="140" y="65" width="465" height="310" fill="#dde1d4"/>'
for i in range(12):
    rx=100+i*4;ry=55-i*3
    b+=f'<ellipse cx="370" cy="210" rx="{rx}" ry="{max(8,ry)}" transform="rotate({i*15} 370 210)" fill="none" stroke="#78866a" stroke-width=".8"/>'
b+=text(160,354,'3D VIEW / SCAN DATA',10,'#77846a')+'</g>'
b+='<ellipse cx="380" cy="900" rx="220" ry="25" fill="#3b442f" opacity=".23" filter="url(#shadow)"/>'
b+='<g transform="translate(112 470) rotate(9 130 210)"><rect x="0" y="0" width="242" height="432" rx="33" fill="#303629"/><rect x="7" y="7" width="228" height="418" rx="27" fill="#f1f3e9"/><rect x="82" y="14" width="80" height="19" rx="10" fill="#303629"/>'
b+=text(24,77,'bridge.',30,'#333b2c','Arial, sans-serif','font-weight="700"')+text(24,101,'YOUR CONNECTED WORKSPACE',7,'#68745d')
b+='<rect x="20" y="124" width="202" height="161" rx="5" fill="#d4dac9"/>'
for i in range(8):b+=f'<ellipse cx="121" cy="204" rx="{45+i*2}" ry="{20+i}" transform="rotate({i*22} 121 204)" fill="none" stroke="#77856a" stroke-width=".6"/>'
for y in [310,342,374]:b+=f'<rect x="23" y="{y}" width="28" height="21" rx="3" fill="#d8ddce"/><path d="M65 {y+5}H198M65 {y+14}H148" stroke="#b5bfaa" stroke-width="4"/>'
b+='</g>'+text(60,980,'REACT NATIVE / ELECTRON / THREE.JS',11,'#5e6952')
(OUT/'project-mobile.svg').write_text(svg(900,1050,b))

b='<rect width="1440" height="700" fill="#dddcd3"/><rect width="1440" height="700" fill="url(#grid)" opacity=".7"/>'
b+=text(65,184,'FROM LOGIC',95,'#30332a','Arial, sans-serif','font-weight="700" letter-spacing="-6"')+text(65,280,'TO LAUNCH.',95,'#30332a','Arial, sans-serif','font-weight="700" letter-spacing="-6"')
b+=text(70,330,'BUILD. VERIFY. SHIP. KEEP IT RUNNING.',12,'#676e5f')
for i,(label,small) in enumerate([('BUSINESS','UNDERSTAND THE WORK'),('DELIVERY','VERIFY THE CHANGE'),('OPERATIONS','SUPPORT THE SYSTEM')]):
    x=82+i*442;y=435
    b+=f'<rect x="{x+9}" y="{y+10}" width="390" height="151" fill="#383e2f" opacity=".11"/><rect x="{x}" y="{y}" width="390" height="151" fill="#eeeee5" stroke="#b4b9aa"/>'
    b+=text(x+20,y+32,f'0{i+1}',12,'#717b65')+text(x+20,y+88,label,33,'#3c4531','Arial, sans-serif','font-weight="700"')+text(x+20,y+125,small,10,'#737e65')
    if i<2:b+=line(x+390,y+73,x+441,y+73,'#6e7a60')+text(x+410,y+68,'→',22,'#6e7a60')
b+=text(1070,106,'CONTINUOUS',16,'#626d55')+text(1070,133,'BY INTENTION.',16,'#626d55')
b+=text(70,656,'ERP / CLOUD / CI &amp; CD / TEAM',11,'#6a745e')
(OUT/'project-operations.svg').write_text(svg(1440,700,b))
(OUT/'social.svg').write_text(svg(1200,630,text(55,65,'KYUNGWON KWON / PORTFOLIO',18)+text(50,300,'FULL-STACK',163,'#161714','Arial, sans-serif','font-weight="900" letter-spacing="-10"')+text(50,461,'ENGINEER',163,'#161714','Arial, sans-serif','font-weight="900" letter-spacing="-10"')+text(55,568,'SPRINGCOTTON.COM / SEOUL, KR',17),'#efefea'))
print('Generated original SVG assets:', ', '.join(p.name for p in OUT.glob('*.svg')))
