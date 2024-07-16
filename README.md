# Gestion des tâches
Dans cette application, on se propose de gérer des tâches.

Chaque tâche possède les propriétés suivantes
- Identifiant de la tâche (qui ne sera pas affiché).
- Nom de la tâche.
- Temps estimé pour la réalisation de la tâche.
- Temps restant estimé pour terminer la tâche.
- Statut de la tâche: Non commencée, En cours, En pause, terminée.

## Etape 1
- Créez une application React avec un composant Task qui représente la tâche décrite précédemment.
- Utilisez un tableau de tâches qui représentera les tâches à afficher.
- La tâche est représentée avec un élément progress bar.
  - Ajoutez une icône pour pouvoir éditer la tâche (composant FaEdit de react-icons/fa).
  - Ajoutez une icône pour pouvoir supprimer la tâche  (composant TiDelete de react-icons/ti).
  - Ajoutez une icône pour pouvoir déplacer la tâche vers le haut (composant GoMoveToTop de react-icons/go).
  - Ajoutez une icône pour pouvoir déplacer la tâche vers le bas (composant GoMoveToBottom de react-icons/go).

## Etape 2
- Mettez en place les PropTypes et les DefaultTypes pour les composants.
- Ajoutez un tooltip qui affiche des informations complémentaires pour la tâche. Lorsque la souris est positionnée au-dessus de la barre de progression. Les informations à afficher sont le temps total et le temps restant.
- Ajoutez des tests unitaires pour cette application.  
Vous pouvez ajouter des tests pour les composants suivants
  - **Progressbar**: vérifiez que la valeur est correctement affichée.
  - **ToolTip**: vérifiez qu'un tooltip est affiché uniquement lorsque le curseur est sur la progressbar.
  - **Tâche**: vérifiez que le composant gérant la tâche, affiche la bonne valeur de progression et les bonnes icônes.

## Etape 3
- Ajoutez un composant groupe qui affiche des informations concernant les tâches du groupe.  
  - Nombre de tâches.
  - Temps total pour toutes les tâches.
  - Temps restant pour toutes les tâches.
- Mettez en place un formulaire pour pouvoir éditer les caractéristiques de chaque tâche.
- Gérez la suppression et le déplacement des tâches à l'aide des icônes.

## Etape 4
- Installez et utilisez Redux pour gérer l'état de de votre application.
  - Création du fichier tasksSlice.js pour la gestion des tâches.
  - Création du fichier store.js pour la configuration du store.
  - Passage du store via le composant Provider.
  - Utilisation du store dans l'application.
- Mettez en place Redux Persist pour sauvegarder tous les changements et pour ne pas perdre les données en cas de rechargement de l'application.

## Etape 5
- Optimisez les performances de l'application (optimisez le composant Task).

## Etape 6
- Créez une animation lors de l'affichage de la liste des tâches.

## Etape 7
- Mettez en place l'internationalisation en gérant 2 langues dans l'application.  
Dans cette application nous gérerons les 2 langues suivantes:
  - Français.
  - Anglais.
