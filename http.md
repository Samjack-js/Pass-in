## HTTP

### POST `/events`

> Create a new event.

#### Request body

```json
{
  "title": "Novo evento",
  "details": null,
  "maximumAttendees": 1
}
```

#### Response body

```json
{
  "eventId": "73234f8f-92c4-4dd3-950b-9707bee50d71"
}
```

### POST `/events/:eventId/attendees`

> Create a new attendee in an event.

#### Request body

```json
{
  "name": "Bárbara Marcheti",
  "email": "bfiorin@gmail.com"
}
```

#### Response body

```json
{
  "attendeeId": 7
}
```

### GET `/events/:eventId`

> Return events data.

#### Response body

```json
{
  "event": {
    "id": "73234f8f-92c4-4dd3-950b-9707bee50d71",
    "title": "Startup Summit",
    "slug": "startup-summit",
    "details": "O melhor evento de startups da América Latina",
    "maximumAttendees": 200,
    "attendeesAmount": 1
  }
}
```

### GET `/attendees/:attendeeId/badge`

> Create a badge for an attendee.

#### Response body

```json
{
  "badge": {
    "name": "Diego Fernandes",
    "email": "diego@rocketseat.com.br",
    "eventTitle": "Startup Summit",
    "checkInURL": "http://localhost:3333/attendees/7/check-in"
  }
}
```

### GET `/attendees/:attendeeId/check-in`

> Create an check in of a attendee.

#### Response body

```json
201 Created
```

### GET `/events/:eventId/attendees?query=diego`

> Return data for a specific attendee by name in a specific event.

#### Response body

```json
{
  "attendees": [
    {
      "id": 7,
      "name": "Diego Fernandes",
      "email": "diego@rocketseat.com.br",
      "createdAt": "2024-04-04T20:18:12.544Z",
      "checkedInAt": "2024-04-04T20:21:34.395Z"
    }
  ],
  "total": 1
}
```
