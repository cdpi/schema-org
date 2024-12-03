Nème tentative de créer un éditeur minimaliste pour saisir des données au format schema.org...

Et aussi un parser CSV pour importer les types (Thing, Property, Enum, DataType)

Mon but était de créer un dépôt de données ouvertes pour ma région... peut-être pour 2025...

### Dossiers

Un peu d'organisation dans la structure:

 - /database/ SQL et script pour générer la base de données.
 - /editor/ Éditeur minimaliste de données basées sur Schema.org.
 - /ld/ Essai de formats OpenData.
 - /schema-org/ Scripts Node (pas grand chose, parser CSV pour l'instant).
 - /tests/ Mini tests (console.assert)

### TODO

Structure de la base de données + récursivité (pour hiérarchie des types (Thing))
