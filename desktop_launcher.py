import os, threading, webbrowser
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
HOST="127.0.0.1"; PORT=int(os.environ.get("AI_VIDEO_PORT","8000"))
class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args): pass
def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    server=ThreadingHTTPServer((HOST,PORT),QuietHandler)
    url=f"http://{HOST}:{PORT}/index.html"
    threading.Timer(0.8,lambda:webbrowser.open(url)).start()
    print(f"AI Explainer Video Generator: {url}")
    try: server.serve_forever()
    except KeyboardInterrupt: pass
    finally: server.server_close()
if __name__=="__main__": main()
