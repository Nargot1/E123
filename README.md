# Forum

Prosty serwis forum pozwalający na tworzenie, przeglądanie, like'owanie, edycję i usuwanie postów.

## Funkcjonalności
- Przeglądanie listy postów (sortowanie po dacie i liczbie like'ów).
- Wyszukiwanie postów po tytule.
- Tworzenie postu (tytuł, treść).
- Wyświetlanie pełnego postu z liczbą like'ów.
- Like'owanie postu.
- Edycja i usuwanie postu.
- Proste logowanie/wylogowanie oparte na cookie.

## Instrukcja instalacji i uruchomienia
1. Sklonuj repozytorium:
   ```bash
   git clone <repo-url>
   cd E123
   ```
2. Zainstaluj zależności:
   ```bash
   npm install
   ```
3. Uruchom Docker.
4. Otwórz konsolę w dockerze i wklej komendę:
    ```bash
    docker run -d --name mongo -p 27017:27017 mongo:6.0;
    ```
5. Uruchom aplikację:
   ```bash
   npm start
   ```
6. Otwórz w przeglądarce:
   - http://localhost:3000

## Lista endpointów
- GET /
  - Lista postów. Query opcjonalne: `?q=wyszukaj` (po tytule), `?sort=date|likes`.
- GET /create
  - Formularz tworzenia postu (wymaga zalogowania).
- POST /create
  - Zapisuje nowy wątek (wymaga zalogowania).
- GET /show?id=<id>
  - Wyświetla pojedynczy wątek.
- GET /edit?id=<id>
  - Formularz edycji (tylko właściciel).
- POST /edit
  - Zapisuje zmiany w postu (tylko właściciel).
- POST /like
  - Like'uje wątek (wymaga zalogowania).
- POST /delete
  - Usuwa wątek (tylko właściciel).
- GET /logout
  - Wylogowanie (usuwa cookie `account`).

## Technologie
- Node.js + Express
- EJS
- MongoDB
- cookie-parser
- Crypto
- CSS

## Autor
- Jakub Witkowski
