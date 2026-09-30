import os,webbrowser
APP_URL=os.environ.get("AI_VIDEO_APP_URL","https://longestformaiexplainervideogenerator.ai")
def main():
    webbrowser.open(APP_URL)
    print("Opened production application: "+APP_URL)
if __name__=="__main__": main()
