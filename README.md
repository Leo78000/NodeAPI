# NodeAPI
Node API, rendu du vendredi
Dépendances: npm install

NOM BDD: nodeapi

NOM table: nodeapi

NOMS COLONNE : id (Auto incrémentée), title(VARCHAR), date(DATE)

Liste des routes:

/movies(GET) : récupère liste des films en bdd en crée un fichier temporaire avec toutes les données de la BDD

/addmovies(POST) : ajouter un film à la bdd

/editmovies/id(PUT) : editer le film qui dont l'id est dans l'url

/deletemovie/id(DELETE) : supprime le film dont l'id est dans l'url

/recherche(GET) : recherche de films lié à IMDB

/(GET): redirection vers /recherche


