# Projet SCP - Server C# Project
SCP est un projet de serveur C# qui permet de gérer un relais et de 
récupérer des informations sur un calendrier.

Il possède deux endpoints principaux : Calendar et Relay.

SCP possède un un interface en Web qui permet d'interagir avec le relais 
ainsi que d'avoir un aperçu des informations du calendrier.


## Endpoints Calendar

  - [GET /Calendar]
  - [GET /Calendar/nextEvent]
  - [GET /Calendar/nextEvent/subject]
  - [GET /Calendar/nextEvent/beginning]
  - [GET /Calendar/nextEvent/beginning/YMDHM]
  - [GET /Calendar/nextEvent/ending]
  - [GET /Calendar/nextEvent/ending/YMDHM]
  - [GET /Calendar/nextEvent/TimeLeftUntilNextEvent/HMS]
  - [GET /Calendar/nextEvent/TimeLeftUntilNextEventEnd/HMS]

## Vue Rapide des Endpoints Calendar

- **GET /Calendar/nextEvent** : Retourne le prochain événement à venir
- **GET /Calendar/nextEvent/subject** : Affiche le sujet du prochain événement
- **GET /Calendar/nextEvent/beginning** : Fournit l'heure de début du prochain événement sous forme brute
- **GET /Calendar/nextEvent/beginning/YMDHM** : Fournit l'heure de début formatée en `yyyy-MM-dd, HH:mm`
- **GET /Calendar/nextEvent/ending** : Fournit l'heure de fin du prochain événement sous forme brute
- **GET /Calendar/nextEvent/ending/YMDHM** : Fournit l'heure de fin formatée en `yyyy-MM-dd, HH:mm`
- **GET /Calendar/nextEvent/TimeLeftUntilNextEvent/HMS** : Indique le temps restant avant le début du prochain événement sous format `hh:mm:ss`
- **GET /Calendar/nextEvent/TimeLeftUntilNextEventEnd/HMS** : Indique le temps restant avant la fin du prochain événement sous format `hh:mm:ss`

## A savoir

Calendar utilise un json au lieu de l'api de outloot "API GRAPH" car il n'est pour le moment pas disponible, le json se situe sous SCP/wwwroot/assets/json/data.json

## Endpoints


### GET /Calendar/nextEvent

Retourne le prochain événement a venir du calendrier

- **URL**: `/Calendar/nextEvent`
- **Méthode**: `GET`

### GET /Calendar/nextEvent/subject

Retourne le sujet du prochain événement

- **URL**: `/Calendar/nextEvent/subject`
- **Méthode**: `GET`
  - **200 OK**: 
    ```json
    { "subject": "Titre de l'événement" }
    ```

### GET /Calendar/nextEvent/beginning

Retourne l'heure de début du prochain événement sous format brute

- **URL**: `/Calendar/nextEvent/beginning`
- **Méthode**: `GET`
  - **200 OK**: 
    ```json
    { "beginning": "2025-03-12T15:30:00" }
    ```

### GET /Calendar/nextEvent/beginning/YMDHM

Retourne l'heure de début du prochain événement formaté en `yyyy-MM-dd, HH:mm`

- **URL**: `/Calendar/nextEvent/beginning/YMDHM`
- **Méthode**: `GET`
  - **200 OK**:
    ```json
    { "beginning": "2025-03-12, 15:30" }
    ```

### GET /Calendar/nextEvent/ending

Retourne l'heure de fin du prochain événement sous format brute

- **URL**: `/Calendar/nextEvent/ending`
- **Méthode**: `GET`
  - **200 OK**:
    ```json
    { "ending": "2025-03-12T17:00:00" }
    ```

### GET /Calendar/nextEvent/ending/YMDHM

Retourne l'heure de fin du prochain événement formaté en `yyyy-MM-dd, HH:mm`.

- **URL**: `/Calendar/nextEvent/ending/YMDHM`
- **Méthode**: `GET`
  - **200 OK**:
    ```json
    { "ending": "2025-03-12, 17:00" }
    ```

### GET /Calendar/nextEvent/TimeLeftUntilNextEvent/HMS

Retourne le temps restant jusqu'au début du prochain événement au format `hh:mm:ss`.

- **URL**: `/Calendar/nextEvent/TimeLeftUntilNextEvent/HMS`
- **Méthode**: `GET`
  - **200 OK**:
    ```json
    { "timeLeft": "02:15:30" }
    ```

### GET /Calendar/nextEvent/TimeLeftUntilNextEventEnd/HMS

Retourne le temps restant jusqu'à la fin du prochain événement au format `hh:mm:ss`.

- **URL**: `/Calendar/nextEvent/TimeLeftUntilNextEventEnd/HMS`
- **Méthode**: `GET`
  - **200 OK**:
    ```json
    { "timeLeft": "01:05:20" }
    ```

## Endpoint Relay

  - [GET /Relay/Toggle]
  - [GET /Relay/TurnOn]
  - [GET /Relay/TurnOff]
  - [GET /Relay/getStatus]
  - [POST /Relay/Timer]

## Vue Rapide des Endpoints Relay

- **Toggle** : Toggle l'état du relais
- **TurnOn** : Active le relais
- **TurnOff** : Désactive le relais
- **getStatus** : Récupère le statut du relais (true ou false)
- **Timer** : Programme une bascule du relais après un certain délai en seconds

## Endpoints

### GET /Relay/Toggle

Permet de basculer l'état du relais (toggle).

- **URL**: `/Relay/Toggle`
- **Méthode**: `GET`

### GET /Relay/TurnOn

Active le relais.

- **URL**: `/Relay/TurnOn`
- **Méthode**: `GET`

### GET /Relay/TurnOff

Désactive le relais.

- **URL**: `/Relay/TurnOff`
- **Méthode**: `GET`

### GET /Relay/getStatus

Retourne le statut du relais.

- **URL**: `/Relay/getStatus`
- **Méthode**: `GET`
  - **200 OK**: 
    ```json
    true
    ```

### POST /Relay/Timer

Définit un timer pour toggle le relais après un certain délai.

- **URL**: `/Relay/Timer`
- **Méthode**: `POST`
  - **Body (JSON)**:
    ```json
    {
      "Seconds": 10
    }
    ```
  - **200 OK**: 
    ```json
    "The timer have been set to 10 !"
    ```
