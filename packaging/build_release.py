from pathlib import Path
import argparse,shutil,zipfile,tarfile
ROOT=Path(__file__).resolve().parents[1];DIST=ROOT/"dist-release";BUNDLE=ROOT/"build-bundle"
FILES=["index.html","styles.css","app.js","api-contract.json","desktop_launcher.py","package.json","README.md","LICENSE","VERSION","Dockerfile"]
DIRS=["deploy","packaging"]
def clean():
    if DIST.exists(): shutil.rmtree(DIST)
    if BUNDLE.exists(): shutil.rmtree(BUNDLE)
    DIST.mkdir();BUNDLE.mkdir()
def stage():
    for n in FILES:
        p=ROOT/n
        if p.exists(): shutil.copy2(p,BUNDLE/n)
    for n in DIRS:
        p=ROOT/n
        if p.exists(): shutil.copytree(p,BUNDLE/n)
def zip_dir(src,out):
    with zipfile.ZipFile(out,"w",zipfile.ZIP_DEFLATED) as z:
        for p in src.rglob("*"):
            if p.is_file(): z.write(p,p.relative_to(src.parent))
def tar_dir(src,out):
    with tarfile.open(out,"w:gz") as t:t.add(src,arcname=src.name)
def main():
    ap=argparse.ArgumentParser();ap.add_argument("--platform",required=True);ap.add_argument("--variant",required=True);a=ap.parse_args()
    clean();stage();base="Free-Unlimited-Durations-AI-Video-Generator-"+a.platform+"-"+a.variant
    zip_dir(BUNDLE,DIST/(base+".zip"));tar_dir(BUNDLE,DIST/(base+".tar.gz"))
if __name__=="__main__":main()
