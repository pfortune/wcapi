# Waterford City API
Reliable listing of all existing venues in Waterford City, concentrating on Bars, Restaurants, and Cafes to begin with.

API
----

Supports the following methods (soon). Throw errors for unsupported methods.

| **Verb** | **Method**                  | **Result**                               |
|----------|-----------------------------|------------------------------------------|
| GET      | /locations                  | returns list of locations                |
| GET      | /locations/:id              | returns a location                       |
| POST     | /locations                  | creates a location                       |
| GET      | /locations/:id/venues       | returns a list of venues for a location  |
| POST     | /locations/:id/venues       | creates a new venue for a location       |
| GET      | /locations/:id/venues/:id   | returns a venue                          |
| PUT      | /locations/:id/venues/:id   | updates a venue                          |