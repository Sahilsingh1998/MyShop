from PIL import Image
from pathlib import Path

base = Path(__file__).resolve().parent.parent / 'assets'
# source images to create variants for
sources = [
    'slider.webp',
    'bycle-img-1.webp',
    'bike-img-2.webp',
    'bike-img-3.webp',
    'bike-img-4.webp',
    'bike-img-5.webp',
    'header-banner.webp'
]
# target widths
widths = [1400, 800, 400]

print('Generating responsive variants in:', base)
for name in sources:
    src = base / name
    if not src.exists():
        print('missing:', name)
        continue
    try:
        img = Image.open(src).convert('RGB')
        orig_w, orig_h = img.size
        for w in widths:
            if w >= orig_w:
                # skip creating larger than original
                target_w = orig_w
            else:
                target_w = w
            target_h = int(target_w * orig_h / orig_w)
            resized = img.copy()
            resized.thumbnail((target_w, target_h), Image.Resampling.LANCZOS)
            out_name = src.stem + f'-{target_w}' + src.suffix
            out_path = base / out_name
            resized.save(out_path, 'WEBP', quality=70, method=6)
            print(f'created {out_name} ({resized.size})')
    except Exception as e:
        print('error', name, e)
