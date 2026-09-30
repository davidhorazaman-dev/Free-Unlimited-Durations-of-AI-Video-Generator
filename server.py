#!/usr/bin/env python3
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from pathlib import Path
ROOT=Path(__file__).resolve().parent
class Handler(SimpleHTTPRequestHandler):
 def __init__(self,*a,**k): super().__init__(*a,directory=str(ROOT),**k)
if __name__=='__main__':
 print('Serving http://localhost:8000')
 ThreadingHTTPServer(('127.0.0.1',8000),Handler).serve_forever()
