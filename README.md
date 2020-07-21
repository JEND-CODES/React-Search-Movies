Ce composant React permet de consulter en temps réel la base de données cinématographiques TmDb API (themoviedb.org) qui comporte plus de 565 000 films.

Démo => http://movies.planetcode.fr

![TMDB](data:image/png;base64,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)
