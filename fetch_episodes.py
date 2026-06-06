import urllib.request
import json
import os

def load_env():
    if os.path.exists(".env"):
        with open(".env") as f:
            for line in f:
                if "=" in line:
                    key, value = line.strip().split("=", 1)
                    os.environ[key] = value

load_env()

PODCAST_ID = os.getenv("BUZZSPROUT_PODCAST_ID")
API_TOKEN = os.getenv("BUZZSPROUT_API_TOKEN")
URL = f"https://www.buzzsprout.com/api/{PODCAST_ID}/episodes.json"
OUTPUT_FILE = "./public/data/episodes.json"

def fetch_episodes():
    headers = {
        "Authorization": f"Token token={API_TOKEN}",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    
    req = urllib.request.Request(URL, headers=headers)
    
    try:
        print("Connecting to Buzzsprout (identifying as browser)...")
        with urllib.request.urlopen(req) as response:
            if response.status == 200:
                data = json.loads(response.read().decode('utf-8'))
                
                # Filter: Only keep published episodes (no drafts)
                published_episodes = [ep for ep in data if ep.get('published_at')]
                
                os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
                
                with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
                    json.dump(published_episodes, f, indent=2, ensure_ascii=False)
                
                print(f"✅ Success! {len(published_episodes)} published episodes saved to {OUTPUT_FILE}")
            else:
                print(f"❌ Failed with status: {response.status}")
    except urllib.error.HTTPError as e:
        print(f"❌ HTTP Error {e.code}: {e.reason}")
        if e.code == 403:
            print("Hint: Check if the API Token is still valid in your Buzzsprout settings.")
    except Exception as e:
        print(f"❌ Unexpected Error: {e}")

if __name__ == "__main__":
    fetch_episodes()