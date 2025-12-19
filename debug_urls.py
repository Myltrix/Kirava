# debug_urls.py
from django.urls import reverse
from django.conf import settings

print("=== DIAGNOSTIC INFO ===")
print(f"DEBUG: {settings.DEBUG}")
print(f"Google Client ID: {settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY[:30]}...")

try:
    google_url = reverse('social:begin', args=['google-oauth2'])
    print(f"Google OAuth URL: {google_url}")
    print(f"Full Google OAuth URL: http://localhost:8000{google_url}")
except Exception as e:
    print(f"Error getting Google URL: {e}")

print("\nExpected redirect URIs in Google Console:")
print("1. http://localhost:8000/social-auth/complete/google-oauth2/")
print("2. http://127.0.0.1:8000/social-auth/complete/google-oauth2/")
print("=== END DIAGNOSTIC ===")