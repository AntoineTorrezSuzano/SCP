# Projet SCP - Server C# Project
SCP est un projet de serveur C# qui permet de g�rer un relais et de 
r�cup�rer des informations sur un calendrier.

Il poss�de deux endpoints principaux : Calendar et Relay.

SCP poss�de un un interface en Web qui permet d'interagir avec le relais 
ainsi que d'avoir un aper�u des informations du calendrier.


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

- **GET /Calendar/nextEvent** : Retourne le prochain �v�nement � venir
- **GET /Calendar/nextEvent/subject** : Affiche le sujet du prochain �v�nement
- **GET /Calendar/nextEvent/beginning** : Fournit l'heure de d�but du prochain �v�nement sous forme brute
- **GET /Calendar/nextEvent/beginning/YMDHM** : Fournit l'heure de d�but format�e en `yyyy-MM-dd, HH:mm`
- **GET /Calendar/nextEvent/ending** : Fournit l'heure de fin du prochain �v�nement sous forme brute
- **GET /Calendar/nextEvent/ending/YMDHM** : Fournit l'heure de fin format�e en `yyyy-MM-dd, HH:mm`
- **GET /Calendar/nextEvent/TimeLeftUntilNextEvent/HMS** : Indique le temps restant avant le d�but du prochain �v�nement sous format `hh:mm:ss`
- **GET /Calendar/nextEvent/TimeLeftUntilNextEventEnd/HMS** : Indique le temps restant avant la fin du prochain �v�nement sous format `hh:mm:ss`

## A savoir

Calendar utilise un json au lieu de l'api de outloot "API GRAPH" car il n'est pour le moment pas disponible, le json se situe sous SCP/wwwroot/assets/json/data.json

## Endpoints


### GET /Calendar/nextEvent

Retourne le prochain �v�nement a venir du calendrier

- **URL**: `/Calendar/nextEvent`
- **M�thode**: `GET`

### GET /Calendar/nextEvent/subject

Retourne le sujet du prochain �v�nement

- **URL**: `/Calendar/nextEvent/subject`
- **M�thode**: `GET`
  - **200 OK**: 
    ```json
    { "subject": "Titre de l'�v�nement" }
    ```

### GET /Calendar/nextEvent/beginning

Retourne l'heure de d�but du prochain �v�nement sous format brute

- **URL**: `/Calendar/nextEvent/beginning`
- **M�thode**: `GET`
  - **200 OK**: 
    ```json
    { "beginning": "2025-03-12T15:30:00" }
    ```

### GET /Calendar/nextEvent/beginning/YMDHM

Retourne l'heure de d�but du prochain �v�nement format� en `yyyy-MM-dd, HH:mm`

- **URL**: `/Calendar/nextEvent/beginning/YMDHM`
- **M�thode**: `GET`
  - **200 OK**:
    ```json
    { "beginning": "2025-03-12, 15:30" }
    ```

### GET /Calendar/nextEvent/ending

Retourne l'heure de fin du prochain �v�nement sous format brute

- **URL**: `/Calendar/nextEvent/ending`
- **M�thode**: `GET`
  - **200 OK**:
    ```json
    { "ending": "2025-03-12T17:00:00" }
    ```

### GET /Calendar/nextEvent/ending/YMDHM

Retourne l'heure de fin du prochain �v�nement format� en `yyyy-MM-dd, HH:mm`.

- **URL**: `/Calendar/nextEvent/ending/YMDHM`
- **M�thode**: `GET`
  - **200 OK**:
    ```json
    { "ending": "2025-03-12, 17:00" }
    ```

### GET /Calendar/nextEvent/TimeLeftUntilNextEvent/HMS

Retourne le temps restant jusqu'au d�but du prochain �v�nement au format `hh:mm:ss`.

- **URL**: `/Calendar/nextEvent/TimeLeftUntilNextEvent/HMS`
- **M�thode**: `GET`
  - **200 OK**:
    ```json
    { "timeLeft": "02:15:30" }
    ```

### GET /Calendar/nextEvent/TimeLeftUntilNextEventEnd/HMS

Retourne le temps restant jusqu'� la fin du prochain �v�nement au format `hh:mm:ss`.

- **URL**: `/Calendar/nextEvent/TimeLeftUntilNextEventEnd/HMS`
- **M�thode**: `GET`
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

- **Toggle** : Toggle l'�tat du relais
- **TurnOn** : Active le relais
- **TurnOff** : D�sactive le relais
- **getStatus** : R�cup�re le statut du relais (true ou false)
- **Timer** : Programme une bascule du relais apr�s un certain d�lai en seconds

## Endpoints

### GET /Relay/Toggle

Permet de basculer l'�tat du relais (toggle).

- **URL**: `/Relay/Toggle`
- **M�thode**: `GET`

### GET /Relay/TurnOn

Active le relais.

- **URL**: `/Relay/TurnOn`
- **M�thode**: `GET`

### GET /Relay/TurnOff

D�sactive le relais.

- **URL**: `/Relay/TurnOff`
- **M�thode**: `GET`

### GET /Relay/getStatus

Retourne le statut du relais.

- **URL**: `/Relay/getStatus`
- **M�thode**: `GET`
  - **200 OK**: 
    ```json
    true
    ```

### POST /Relay/Timer

D�finit un timer pour toggle le relais apr�s un certain d�lai.

- **URL**: `/Relay/Timer`
- **M�thode**: `POST`
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
