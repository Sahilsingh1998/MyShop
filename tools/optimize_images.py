from PIL import Image
from pathlib import Path

base = Path(__file__).resolve().parent.parent / 'assets'
plans = {
    'slider.webp': (1400, 1200),
    'bycle-img-1.webp': (900, 600),
    'bike-img-2.webp': (900, 600),
    'bike-img-3.webp': (900, 600),
    'bike-img-4.webp': (900, 600),
    'bike-img-5.webp': (900, 600),
    'header-banner.webp': (1600, 900),
}

print(f'Optimizing images in: {base}')
for name, size in plans.items():
    path = base / name
    if not path.exists():
        print(f'skip (missing): {name}')
        continue
    try:
        img = Image.open(path).convert('RGB')
        original_size = img.size
        img.thumbnail(size, Image.Resampling.LANCZOS)
        img.save(path, 'WEBP', quality=70, method=6)
        print(f'optimized {name}: {original_size} -> {img.size}')
    except Exception as e:
        print(f'error processing {name}: {e}')
