from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import argparse
parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=8766);args=parser.parse_args()
root=Path(__file__).resolve().parent.parent
class Handler(SimpleHTTPRequestHandler):
    extensions_map={**SimpleHTTPRequestHandler.extensions_map,'.webp':'image/webp','.svg':'image/svg+xml','.js':'text/javascript','.css':'text/css','.json':'application/json'}
    def __init__(self,*a,**kw):super().__init__(*a,directory=str(root),**kw)
ThreadingHTTPServer(('127.0.0.1',args.port),Handler).serve_forever()
