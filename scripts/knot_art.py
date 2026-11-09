"""A single periodic trefoil curve, rendered as a smooth tube and a flat mark."""
import json
import math
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / 'dist' / 'assets'
TAU = math.tau


def cross(a, b):
    return (a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0])


def unit(v):
    size = math.sqrt(sum(x*x for x in v))
    return tuple(x/size for x in v)


def rotate(p):
    # Match the favicon's frontal camera, retaining depth for crossings and light.
    return flat_project(p)


def curve(t):
    return (math.sin(t)+2*math.sin(2*t), math.cos(t)-2*math.cos(2*t), -math.sin(3*t))


def derivative(t):
    return (math.cos(t)+4*math.cos(2*t), -math.sin(t)+4*math.sin(2*t), -3*math.cos(3*t))


def smooth_tube():
    # The frame and its analytic normal are periodic, including at the closing seam.
    steps, sides, radius = 384, 128, .36
    key, fill = unit((-.3, -.45, 1.5)), unit((.6, .2, 1.1))
    half = unit(tuple(key[k]+(1 if k == 2 else 0) for k in range(3)))
    rows = []
    for i in range(steps):
        t = i*TAU/steps
        c, tangent = curve(t), unit(derivative(t))
        u = unit(cross(tangent, (0, 0, 1)))
        v = cross(tangent, u)
        row = []
        for j in range(sides):
            angle = j*TAU/sides
            n = tuple(u[k]*math.cos(angle)+v[k]*math.sin(angle) for k in range(3))
            row.append((rotate(tuple(c[k]+radius*n[k] for k in range(3))), rotate(n)))
        rows.append(row)
    # Fit the complete surface, rather than assuming its center is the origin.
    bounds = [(min(vertex[0][k] for row in rows for vertex in row),
               max(vertex[0][k] for row in rows for vertex in row)) for k in [0, 1]]
    scale = min(430/(high-low) for low, high in bounds)
    tx = 260-scale*sum(bounds[0])/2
    ty = 250-scale*sum(bounds[1])/2
    ground_y = ty+scale*bounds[1][1]+14
    faces = []
    for i in range(steps):
        for j in range(sides):
            corners = [rows[i][j], rows[(i+1)%steps][j], rows[(i+1)%steps][(j+1)%sides], rows[i][(j+1)%sides]]
            n = unit(tuple(sum(c[1][k] for c in corners)/4 for k in range(3)))
            if n[2] < -.015:
                continue
            diffuse = max(0, sum(n[k]*key[k] for k in range(3)))
            reflected = max(0, sum(n[k]*fill[k] for k in range(3)))
            specular = max(0, sum(n[k]*half[k] for k in range(3)))**42
            shade = min(250, round(31+158*diffuse**.85+22*reflected+58*specular))
            color = f'rgb({shade},{min(255,shade+2)},{shade})'
            points = ' '.join(f'{tx+c[0][0]*scale:.2f},{ty+c[0][1]*scale:.2f}' for c in corners)
            # Matching subpixel strokes close rasterization cracks, without a visible mesh.
            polygon = f'<polygon points="{points}" fill="{color}" stroke="{color}" stroke-width=".65" stroke-linejoin="round"/>'
            faces.append((sum(c[0][2] for c in corners)/4, polygon))
    artwork = ''.join(face for _, face in sorted(faces, key=lambda f: f[0]))
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="520" height="520" viewBox="0 0 520 520"><title>One continuous knot</title><defs><filter id="ground" x="-60%" y="-200%" width="220%" height="500%"><feGaussianBlur stdDeviation="9"/></filter><filter id="surface" x="-2%" y="-2%" width="104%" height="104%"><feGaussianBlur stdDeviation=".3"/></filter></defs><ellipse cx="260" cy="{ground_y:.2f}" rx="107" ry="8" fill="#25291f" opacity=".13" filter="url(#ground)"/><g filter="url(#surface)">{artwork}</g></svg>'


def flat_project(p):
    x, y, z = p
    a = -.35
    return (x*math.cos(a)-y*math.sin(a), x*math.sin(a)+y*math.cos(a), z)


def crossings(samples=360):
    points = [flat_project(curve(i*TAU/samples)) for i in range(samples)]
    found = []
    for i in range(samples):
        p, p2 = points[i], points[(i+1)%samples]
        a = (p2[0]-p[0], p2[1]-p[1])
        for j in range(i+4, samples):
            if i+samples-j < 4:
                continue
            q, q2 = points[j], points[(j+1)%samples]
            b = (q2[0]-q[0], q2[1]-q[1])
            determinant = a[0]*b[1]-a[1]*b[0]
            if abs(determinant) < 1e-10:
                continue
            delta = (q[0]-p[0], q[1]-p[1])
            u = (delta[0]*b[1]-delta[1]*b[0])/determinant
            v = (delta[0]*a[1]-delta[1]*a[0])/determinant
            if 0 <= u < 1 and 0 <= v < 1:
                ti, tj = (i+u)*TAU/samples, (j+v)*TAU/samples
                top = ti if flat_project(curve(ti))[2] > flat_project(curve(tj))[2] else tj
                found.append((p[0]+u*a[0], p[1]+u*a[1], top))
    return found


def flat_geometry():
    samples = [flat_project(curve(i*TAU/720)) for i in range(720)]
    low = [min(p[k] for p in samples) for k in [0, 1]]
    high = [max(p[k] for p in samples) for k in [0, 1]]
    scale = min(45/(high[k]-low[k]) for k in [0, 1])
    offset = [(64-scale*(high[k]+low[k]))/2 for k in [0, 1]]

    def point(t):
        p = flat_project(curve(t))
        return (offset[0]+scale*p[0], offset[1]+scale*p[1])

    def path(start, end, segments=72, closed=False):
        result = []
        dt = (end-start)/segments
        a = point(start)
        result.append(f'M{a[0]:.3f} {a[1]:.3f}')
        for i in range(segments):
            t, t2 = start+i*dt, start+(i+1)*dt
            a, b = point(t), point(t2)
            da, db = flat_project(derivative(t)), flat_project(derivative(t2))
            c = (a[0]+scale*da[0]*dt/3, a[1]+scale*da[1]*dt/3)
            d = (b[0]-scale*db[0]*dt/3, b[1]-scale*db[1]*dt/3)
            result.append(f'C{c[0]:.3f} {c[1]:.3f} {d[0]:.3f} {d[1]:.3f} {b[0]:.3f} {b[1]:.3f}')
        if closed:
            result.append('Z')
        return ''.join(result)

    intersections = crossings()
    assert len(intersections) == 3, f'Expected three trefoil crossings, found {len(intersections)}'
    gaps, bridges = [], []
    for x, y, t in intersections:
        gaps.append(f'<circle cx="{offset[0]+scale*x:.3f}" cy="{offset[1]+scale*y:.3f}" r="4.7" fill="#000"/>')
        speed = math.hypot(*flat_project(derivative(t))[:2])*scale
        half_span = 10.5/speed
        bridges.append(path(t-half_span, t+half_span, segments=8))
    return path(0, TAU, closed=True), gaps, bridges


def flat_svg(ink='#161714', background=None):
    path, gaps, bridges = flat_geometry()
    tile = f'<rect width="64" height="64" rx="12" fill="{background}"/>' if background else ''
    strokes = f'<path d="{path}" mask="url(#crossings)"/>' + ''.join(f'<path d="{p}"/>' for p in bridges)
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><title>Kyungwon Kwon knot mark</title><defs><mask id="crossings" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64"><rect width="64" height="64" fill="#fff"/>{"".join(gaps)}</mask></defs>{tile}<g fill="none" stroke="{ink}" stroke-width="5.8" stroke-linecap="round" stroke-linejoin="round">{strokes}</g></svg>'


def write_knot_assets():
    OUT.mkdir(parents=True, exist_ok=True)
    # These are generated from geometry; no hand-painted joint or closing cap is used.
    (OUT/'knot-3d.svg').write_text(smooth_tube())
    (OUT/'knot-2d.svg').write_text(flat_svg())
    (OUT/'favicon-knot.svg').write_text(flat_svg('#efefea', '#161714'))
    start, end = rotate(curve(0)), rotate(curve(TAU))
    d0, d1 = rotate(derivative(0)), rotate(derivative(TAU))
    seam = max(abs(a-b) for a, b in zip(start+d0, end+d1))
    assert seam < 1e-10
    print(json.dumps({'closed_curve_seam_error': seam, 'crossings': len(crossings()), 'assets': ['knot-3d.svg', 'knot-2d.svg', 'favicon-knot.svg']}))


if __name__ == '__main__':
    write_knot_assets()
