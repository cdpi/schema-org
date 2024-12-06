Nème tentative de créer un éditeur minimaliste pour saisir des données au format schema.org...

Et aussi un parser CSV pour importer les types (Thing, Property, Enum, DataType)

Mon but était de créer un dépôt de données ouvertes pour ma région... peut-être pour 2025...

### Dossiers

Un peu d'organisation dans la structure:

 - /database/ SQL et script pour générer la base de données.
 - /editor/ Éditeur minimaliste de données basées sur Schema.org.
 - /i18n/ Traduction des labels en français.
 - /ld/ Essai de formats OpenData.
 - /schema-org/ Scripts Node (pas grand chose, parser CSV pour l'instant).
 - /tests/ Mini tests (console.assert)

Un peu d'organisation dans le dossier editor:

 - /database/ Base de données SQLite.
 - /lib/ Scripts application.
 - /public/ Au lieu de www pour dossier static express.
 - /views/ Au lieu de templates (logique Application express ?).

### TODO

Structure de la base de données + récursivité (pour hiérarchie des types (Thing))
