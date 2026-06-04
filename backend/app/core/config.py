from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "SentinelAI Incident Commander"
    environment: str = "development"
    demo_mode: bool = True

    database_url: str = "postgresql+psycopg://sentinel:sentinel@postgres:5432/sentinel"
    openai_api_key: str | None = None
    openai_model: str = "gpt-4.1"

    splunk_host: str = "https://splunk:8089"
    splunk_username: str = "admin"
    splunk_password: str = "changeme"
    splunk_index: str = "sentinel_ops"
    splunk_mcp_url: str = "http://splunk-mcp:7000"

    slack_bot_token: str | None = None
    slack_channel: str = "#incident-response"
    jira_base_url: str | None = None
    jira_project_key: str = "SRE"
    jira_email: str | None = None
    jira_api_token: str | None = None

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")


@lru_cache
def get_settings() -> Settings:
    return Settings()
