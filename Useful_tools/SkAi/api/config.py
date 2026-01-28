import os

def load_secrets(file_path="secrets.txt"):
    """
    Reads secrets.txt and loads them into environment variables.
    Format of file: KEY=VALUE
    """
    if not os.path.exists(file_path):
        print(f"Warning: {file_path} not found.")
        return

    with open(file_path, "r") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if "=" in line:
                key, value = line.split("=", 1)
                os.environ[key.strip()] = value.strip()

class Config:
    def __init__(self):
        load_secrets()
        self.LLM_PROVIDER = os.getenv("LLM_PROVIDER", "groq")
        self.LLM_API_KEY = os.getenv("LLM_API_KEY", "")
        self.LLM_MODEL = os.getenv("LLM_MODEL", "llama-3.3-70b-versatile")
        self.APP_ENV = os.getenv("APP_ENV", "dev")

config = Config()
