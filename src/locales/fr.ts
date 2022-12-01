/* eslint-disable import/no-anonymous-default-export */
export default {
  label: {
    aggression: `Agressivité`,
    balancedSuits: {
      false: `Placement aléatoire des marqueurs de couleur de clairière`,
      true: `Placement équilibré des marqueurs de couleur de clairière`,
    },
    changeLanguage: `Changer de langue `,
    clearing: {
      fox: `Clairière renard`,
      mouse: `Clairière souris`,
      rabbit: `Clairière lapin`,
    },
    closeMessage: `Fermer le message`,
    complexity: `Difficulté`,
    crafting: `Fabrication`,
    factionRating: [`FAIBLE`, `MODÉRÉE`, `ÉLEVÉE`],
    fixedFirstPlayer: {
      false: `Rendre aléatoire le premier joueur <i>(Joueur 1 est la personne utilisant cette application, Joueur 2 est la personne à côté dans le sens des aiguilles d’une montre, etc.)</i>`,
      true: `Fixer le premier joueur <i>(Joueur 1 est la première personne, Joueur 2 est la seconde, etc.)</i>`,
    },
    fox: `Renard`,
    includeBotStep: `Inclure la mise en place des robots`,
    includeHirelings: `Inclure les recrues`,
    landmarkCount: `Nombre de lieux`,
    logoAlt: `ROOT`,
    logoText: `Mise en place automatique`,
    mapChart: `Schéma des clairières du plateau, ordonnées de gauche à droite et de haut en bas`,
    militant: `Militaire`,
    mouse: `Souris`,
    nextStep: `Étape suivante`,
    pageTitle: `Mise en place automatique de Root`,
    /* Loi de Root v2@C.1 + Lois de la Rootbotique@3.1 */
    placeMarkers: {
      priority: `<li>Prenez les 12 marqueurs de priorité, puis placez-en un dans chaque clairière, comme indiqué dans le schéma ci-dessous.</li>`,
      suit: `<li>Prenez les 12 marqueurs de couleur, puis placez-en un dans chaque clairière, comme indiqué dans le schéma ci-dessous.</li>`,
      suitPriority: `<li>Prenez les 12 marqueurs de couleur et les 12 marqueurs de priorité, puis placez-en un de chaque dans chaque clairière, comme indiqué dans le schéma ci-dessous.</li>`,
    },
    playerCount: `Nombre de joueurs`,
    priority: `Priorité {{count}}`,
    rabbit: `Lapin`,
    redo: `Refaire`,
    restartSetup: `Recommencer la mise en place`,
    selectVagabonds: `Sélectionnez les personnages Vagabond que vous souhaitez inclure dans le draft de factions.`,
    specialAction: `Action spéciale `,
    startingItems: `Objets de départ`,
    useDraft: `Drafter les factions`,
    undo: `Annuler`,
    wealth: `Main de cartes`,
  },
  component: {
    buildings: `{{count}} Bâtiments`,
    bag: `Sac`,
    boot: `Botte`,
    coin: `Pièce`,
    crossbow: `Arbalète`,
    hammer: `Marteau`,
    sword: `Épée`,
    tea: `Café`,
    tokens: `{{count}} Jetons`,
    torch: `Torche`,
    warriors_one: `1 Pion`,
    warriors_other: `{{count}} Guerriers`,
  },
  error: {
    baseExpansionRequired: `Un exemplaire du jeu de base de Root est requis pour la mise en place`,
    factionHirelingExcluded: `La faction associée à cette recrue est requise pour la mise en place`,
    hirelingSelected: `Une recrue équivalente à cette faction est déjà en jeu`,
    landmarkNotEnoughPlayers: `Pas assez de joueurs pour jouer avec ce lieu`,
    lockedFaction: `Impossible de sélectionner la dernière faction tant qu’une faction militaire n’a pas été sélectionnée`,
    mapLandmarkUsed: `Lieu déjà inclus dans la mise en place du plateau`,
    noDeck: `Aucun paquet sélectionné ! Veuillez sélectionner au moins un paquet`,
    noFaction: `Aucune faction sélectionnée ! Veuillez sélectionner une faction à jouer`,
    noLandmark: `Aucun lieu sélectionné ! Veuillez sélectionner au moins un lieu ou mettre le nombre de lieux à zéro`,
    noMap: `Aucun plateau sélectionné ! Veuillez sélectionner au moins un plateau`,
    noMilitantFaction: `Aucune faction militaire sélectionnée ! Veuillez sélectionner au moins une faction militaire`,
    tooFewFaction: `Pas assez de factions sélectionnées ! Veuillez sélectionner plus de factions, désactiver le draft de factions ou réduire le nombre de joueurs`,
    tooFewHireling: `Pas assez de recrues pour mettre en place les recrues ! Cela peut être dû au fait que la sélection actuelle de recrues nécessite de supprimer trop de factions de la mise en place`,
    tooFewLandmark: `Pas assez de lieux sélectionnés ! Veuillez sélectionner plus de lieux ou réduire le nombre de lieux`,
    tooFewPlayerInsurgent: `Impossible d’utiliser des factions non militaires avec moins de 3 joueurs et sans robot ni recrue`,
    tooFewVagabond: `Pas assez de personnages Vagabond sélectionnés ! Veuillez inclure plus de personnages Vagabond ou exclure des factions Vagabond`,
    tooManyCornerSetup: `Trop de factions sélectionnées ont besoin d’une clairière en coin du plateau pour leur mise en place ! Veuillez sélectionner plus de factions ou activer le draft de factions`,
  },
  setupStep: {
    chooseExpansions: {
      body: `Bienvenue dans la mise en place automatique de Root. Cette page vous guidera à travers les règles de mise en place avancée du jeu de société populaire Root, avec peu de mélange de cartes et aucune carte de mise en place nécessaire ! Pour commencer, sélectionnez le contenu de Root avec lequel vous jouez. Lorsque vous êtes prêt à passer à l’étape suivante, utilisez les boutons en bas de la page.`,
    },
    seatPlayers: {
      title: `Placement des Joueurs`,
      body: `Déterminez les positions des joueurs autour de la table, puis sélectionnez le nombre de joueurs avec lesquels vous jouez et si vous souhaitez que l’application choisisse aléatoirement un premier joueur.`,
    },
    chooseMap: {
      title: `Choix et mise en place du Plateau`,
      body: `Décidez ensemble avec quel plateau vous souhaitez jouer. Si vous sélectionnez plusieurs plateaux, un plateau sera choisi aléatoirement parmi ceux sélectionnés.`,
    },
    /* Loi de Root v2@5.1.4 + 5.1.5 + 5.1.6 */
    setUpMap: {
      body: `<li>Placez une ruine sur chaque emplacement du plateau marqué d’un « R » <i>(4 au total)</i>.</li><li>Placez ces objets sur leurs emplacements correspondants dans la réserve d’objets de la partie supérieure du plateau : 2 <Boot/>, 2 <Bag/>, 1 <Crossbow/>, 1 <Hammer/>, 2 <Sword/>, 2 <Tea/>, 2 <Coin/>.</li><li>Posez les deux dés près du plateau.</li>`,
    },
    chooseDeck: {
      title: `Choix et mise en place du Paquet`,
      body: `Décidez ensemble quel paquet de cartes vous souhaitez utiliser. Si vous sélectionnez plusieurs paquets, un paquet sera choisi aléatoirement parmi ceux sélectionnés.`,
    },
    setUpDeck: {
      title: `Mise en place du Paquet`,
    },
    setUpBots: {
      title: `Mise en place des Robots`,
      body: `Décidez ensemble avec quels robots vous souhaitez jouer, en suivant leurs instructions de mise en place comme décrit dans les Lois de la Rootbotique.`,
    },
    chooseLandmarks: {
      title: `Mise en place des Lieux`,
      body: `Décidez ensemble avec combien de lieux vous souhaitez jouer et lesquels inclure dans la sélection.`,
      body_mapLandmark: `Décidez ensemble avec combien de lieux vous souhaitez jouer <i>(en plus du lieu déjà inclus avec le plateau)</i>, et lesquels inclure dans la sélection.`,
    },
    chooseHirelings: {
      title: `Mise en place des Recrues`,
      body: `Décidez ensemble si vous souhaitez jouer avec des recrues et lesquelles inclure dans la sélection.`,
    },
    postHirelingSetup: {
      subtitle: `Placement des marqueurs Recrue`,
      body: `Placez les trois marqueurs Recrue — marqués « 4 », « 8 », et « 12 » — sur les cases « 4 », « 8 », et « 12 » de la piste de score sur le plateau.`,
    },
    drawCards: {
      title: `Pioche de cinq cartes`,
      body: `Chaque joueur pioche cinq cartes du paquet. <i>(Vous choisirez trois cartes à conserver plus tard.)</i>`,
    },
    chooseFactions: {
      title: `Mise en place des Factions`,
      body: `Sélectionnez ensemble les factions que vous souhaitez inclure dans la mise en place.`,
    },
    selectFaction: {
      subtitle: `Affectation des Factions`,
      subtitle_useDraft: `Choix de Faction`,
      /* Loi de Root v2@5.1.1 */
      body: `Assignez une des factions ci-dessous à chaque joueur selon la méthode de votre choix. Les factions seront mises en place de gauche à droite. Vous pouvez sélectionner librement des factions dans la liste pour consulter leurs informations.`,
      body_useDraft: `Joueur {{count}}, choisissez la faction que vous souhaitez jouer dans la liste de factions ci-dessous. Vous pouvez sélectionner librement des factions dans la liste pour consulter leurs informations, avant de confirmer votre sélection en appuyant sur « Étape suivante ».`,
    },
    /* Loi de Root v2@5.1.2 + 9.3.6 */
    placeScoreMarkers: {
      title: `Placement des marqueurs de score`,
      title_vagabondSetUp: `Placement des marqueurs de score et de relation`,
      body: `Chaque joueur place son marqueur de score sur la case « 0 » de la piste de score.`,
      body_vagabondSetUp: `Chaque joueur place son marqueur de score sur la case « 0 » de la piste de score. Chaque joueur Vagabond prend les marqueurs de relation des factions en jeu (hors Vagabond) et les place sur la case Indifférent de son tableau de relations.`,
    },
    chooseHand: {
      title: `Choix des mains de départ`,
      body: `Chaque joueur choisit trois cartes dans sa main qu’il souhaite conserver et place les deux autres cartes face cachée sur le paquet. Ensuite, mélangez le paquet.`,
    },
    setupEnd: {
      title: `Commencer à jouer`,
      body: `La mise en place est maintenant terminée. La partie commencera avec le Joueur {{count}}. Si vous souhaitez recommencer le processus de mise en place, utilisez le bouton ci-dessous.<p><i>« Mise en place automatique de Root » développé par Ewen Cameron</i><br/><i>Traduction française par Romain Storai et Steeve Fontaine</i><br/><i>Basé sur le jeu de société « Root » publié par Leder Games</i><br/><i>Application sous licence CC BY-NC-SA 4.0</i></p>`,
    },
  },
  deck: {
    exiles: {
      name: `Exilés et Partisans`,
      setupTitle: `Mise en place du paquet Exilés et Partisans`,
      setup: `Prenez le paquet de cartes Exilés et Partisans dans la boîte de jeu et placez-le à côté du plateau. Mélangez le paquet.`,
      /* Loi de Root v2@5.1.3 */
      setup_twoPlayer: `Prenez le paquet de cartes Exilés et Partisans dans la boîte de jeu et placez-le à côté du plateau. Retirez du paquet les quatre cartes Domination. Mélangez le paquet.`,
    },
    standard: {
      name: `Base`,
      setupTitle: `Mise en place du paquet de base`,
      setup: `Prenez le paquet de cartes de base dans la boîte de jeu et placez-le à côté du plateau. Mélangez le paquet.`,
      /* Loi de Root v2@5.1.3 */
      setup_twoPlayer: `Prenez le paquet de cartes de base dans la boîte de jeu et placez-le à côté du plateau. Retirez du paquet les quatre cartes Domination. Mélangez le paquet.`,
    },
  },
  expansion: {
    /* Loi de Root v2@B.5 */
    exilesDeck: `Paquet de cartes Exilés et Partisans`,
    landmarkPack: `Pack de Lieux`,
    marauder: `Extension Maraudeur`,
    marauderHirelings: `Pack de Recrues Maraudeur`,
    /* Loi de Root v2@B.2 */
    riverfolk: `Extension Compagnie de la Rivière`,
    riverfolkHirelings: `Pack de Recrues Compagnie de la Rivière`,
    /* Loi de Root v2@B.1 */
    root: `Root`,
    /* Loi de Root v2@B.3 */
    underworld: `Extension Monde Souterrain`,
    underworldHirelings: `Pack de Recrues Monde Souterrain`,
    /* Loi de Root v2@B.6 */
    vagabondPack: `Pack Vagabond`,
  },
  faction: {
    alliance: {
      name: `Alliance de la Forêt`,
      summaryTitle: `Jouer l’Alliance`,
      summary: `<p>En jouant l’Alliance de la Forêt, vous faites votre possible pour vous attirer la sympathie des créatures opprimées de la Forêt. Chaque fois que vous placez un <b>jeton de Sympathie</b> sur le plateau, vous marquez des points. Plus vous en avez placé, plus vous gagnez de points.</p><p>Gagner la sympathie des peuples nécessite des <b>partisans</b>, des cartes placées sur votre plateau de faction, de la couleur des clairières où vous souhaitez agir. Vous pouvez ajouter vos propres cartes à vos partisans, mais vous pouvez aussi inciter vos adversaires à en faire autant en provoquant l’<b>Indignation</b> : lorsqu’une autre faction retire de la sympathie ou déplace des guerriers dans une clairière sympathisante, elle doit ajouter une carte à votre pile de partisans.</p><p>N’hésitez pas à mettre en place des points d’étranglement, car vous êtes expert en <b>Guérilla</b> : lorsque vous défendez en combat, vous utilisez le plus grand résultat. Placez votre Sympathie là où les conflits sont les plus probables, et forcez vos adversaires à vous affronter !</p><p>Les partisans peuvent être poussés à une violente <b>révolte</b>, ce qui détruit <i>toutes</i> les pièces adverses d’une clairière et vous permet d’y placer une <b>base</b> et des guerriers. Les bases améliorent votre pioche et vous permettent d’entraîner des <b>officiers</b>, qui vous donnent des actions gratuites chaque tour. Protégez vos bases ! Si vous en perdez une, vous perdrez de nombreux partisans et officiers.</p>`,
      setupTitle: `Mise en place de l’Alliance de la Forêt`,
      /* Loi de Root v2@8.3 */
      setup: `<ol><li><b>Préparer les guerriers.</b> Formez une réserve de 10 guerriers.</li><li><b>Placer les bases.</b> Placez 3 bases sur les cases Base correspondantes du plateau de faction.</li><li><b>Remplir la piste de Sympathie.</b> Placez 10 jetons de Sympathie sur votre piste de Sympathie.</li><li><b>Gagner des partisans.</b> Piochez 3 cartes et placez-les face cachée dans votre pile de partisans.</li></ol>`,
      advancedSetup: `<ol><li>Piochez 3 cartes et placez-les face cachée dans votre pile de <b>partisans</b>.</li><li>Placez vos <b>bases</b> sur leurs emplacements réservés.</li><li>Remplissez votre piste de sympathie avec vos <b>jetons de Sympathie</b>.</li></ol>`,
    },
    corvid: {
      name: `Conspiration des Corvidés`,
      summaryTitle: `Jouer les Corvidés`,
      summary: `<p>En tant que membre de la Conspiration des Corvidés, vous voulez prouver que c’est vous qui détenez le pouvoir et qui tirez les ficelles du conflit qui agite les Sous-Bois. Vous marquez des points chaque fois que vous retournez un jeton de <b>Complot</b> précédemment placé sur le plateau. Et plus il y a de Complots face visible sur le plateau lorsque vous le faites, plus vous marquez de points.</p><p>Pour placer et retourner des Complots, vous devez recruter des guerriers et les placer stratégiquement. Votre faction est une des meilleures lorsqu’il s’agit de rallier des guerriers à sa cause, mais ces derniers ont tendance à s’éparpiller et vous déplacer trop souvent n’est pas forcément une bonne idée. De plus, vous ne pouvez pas vous permettre de beaucoup combattre, étant donné qu’il vous faut retirer au moins un de vos guerriers pour placer un Complot, mais qu’il faut aussi des guerriers Corvidés sur la clairière d’un Complot pour le retourner.</p><p>Heureusement, vos guerriers sont particulièrement <b>Agiles</b>, ce qui en facilite le déplacement. Vos <b>Agents Secrets</b> quant à eux protègent efficacement vos Complots des attaques en infligeant une perte supplémentaire en combat lorsque vous êtes le défenseur et avez un jeton de Complot face cachée.</p><p>Soyez cependant vigilant à ne pas laisser d’opportunité à vos adversaires de <b>déjouer vos Complots</b>. Un adversaire dans une clairière avec un jeton de Complot face cachée peut vous montrer une carte de la couleur de la clairière pour tenter de deviner de quel type de Complot il s’agit. S’il a raison, c’est qu’il est parvenu à infiltrer la Conspiration et à déjouer votre Complot ! Il retire alors le Complot et ignore son effet. S’il se trompe et que vous avez réussi à démasquer son espion, votre Complot reste en place et il doit vous donner la carte qu’il vous a montrée. Il va falloir bluffer…`,
      setupTitle: `Mise en place de la Conspiration des Corvidés`,
      /* Loi de Root v2@13.3 */
      setup: `<ol><li><b>Préparer les guerriers et les Complots.</b> Formez une réserve de 15 guerriers et 8 jetons de Complot face cachée.</li><li><b>Déploiement.</b> Placez 1 guerrier dans une clairière de chaque couleur <i>(3 en tout).</i></li></ol>`,
      advancedSetup: `<ol><li>Choisissez une clairière en tant que territoire. Placez-y 1 <b>guerrier</b> et 1 <b>complot</b> de votre choix, face cachée.</li><li>Placez 1 <b>guerrier</b> dans une clairière de chaque couleur <i>(en comptant l’étape précédente, vous placerez donc 4 guerriers en tout)</i>.</li></ol>`,
    },
    cult: {
      name: `Culte des Lézards`,
      summaryTitle: `Jouer le Culte des Lézards`,
      summary: `<p>En jouant le Culte des Lézards, vous vous occupez des créatures rejetées par les autres factions. Vous marquez des points de victoire en exécutant les <b>rituels</b> appropriés, en révélant des cartes de votre main de la même couleur que les clairières où vous possédez des <b>jardins</b>, et en défaussant des cartes pour compléter le rite. Plus vous avez de jardins de la couleur de la carte révélée, plus vous marquez de points.</p><p>Cette approche vous empêche de combattre vos adversaires en début de partie. Pour cela vous devez radicaliser vos membres et en faire des <b>acolytes</b>. Vous pourrez ainsi effectuer des <b>conspirations</b> dans les clairières de <b>Parias</b>, la couleur de carte la plus défaussée lors de la manche précédente.</p><p>Votre <b>Haine des oiseaux</b> vous empêche d’utiliser vos cartes Oiseau comme jokers pour vos rituels. Vos jardins répandent la parole de votre seigneur dragon, attirant des foules de <b>Pèlerins</b>. Vous contrôlez une clairière dès que vous y avez au moins un jardin. Enfin, vos acolytes obtiennent toujours <b>Vengeance</b> sur vos adversaires : lorsqu’un de vos guerriers est retiré alors qu’il défend en combat, vous gagnez un nouvel acolyte.</p>`,
      setupTitle: `Mise en place du Culte des Lézards`,
      /* Loi de Root v2@10.3 */
      setup: `<ol><li><b>Préparer les guerriers.</b> Formez une réserve de 25 guerriers.</li><li><b>Placer les guerriers.</b> Placez 4 guerriers et un jardin de la couleur de la clairière dans une clairière en coin qui n’est pas la clairière en coin de départ d’un autre joueur et qui est, si possible, diagonalement opposée à la clairière en coin de départ d’un autre joueur.</li><li><b>Choisir les Parias.</b> Placez le marqueur de Parias sur une couleur dans la case Parias. La couleur choisie est appelée <b>Paria</b>.</li><li><b>Piste des jardins.</b> Placez vos 14 jardins restants sur les cases correspondantes de votre piste de jardins, de droite à gauche.</li></ol>`,
      advancedSetup: `<ol><li>Choisissez une clairière en tant que territoire, si possible non adjacente à un territoire adverse.</li><li>Placez 4 <b>guerriers</b> et 1 <b>jardin</b> de la couleur correspondante dans la clairière de votre territoire. Placez 3 <b>guerriers</b> parmi les clairières adjacentes à votre territoire, répartis de la façon la plus équitable possible.</li><li>Placez 2 <b>guerriers</b> sur votre case Acolytes.</li><li>Placez vos <b>jardins</b> sur leurs pistes respectives, en laissant vide la case la plus à gauche du jardin que vous avez placé. Placez votre <b>marqueur de parias</b>, face Parias visible, sur la case de votre choix de votre piste de Parias.</li></ol>`,
    },
    duchy: {
      name: `Duché Souterrain`,
      summaryTitle: `Jouer le Duché`,
      summary: `<p>En tant que membre du Duché Souterrain vous souhaitez asservir toutes les autres créatures des Sous-Bois. Chaque fois que vous ralliez un de vos <b>Ministres</b> à votre cause <i>(mettre fin à la guerre et unifier les terres au-dessus de vous)</i>, vous marquez des points. Plus le rang du Ministre Rallié est élevé, plus vous marquez de points.</p><p>Pour rallier un Ministre, vous devez révéler des cartes, qui représentent les membres des Sous-Bois qui vous soutiennent. Plus le rang du Ministre est élevé, plus vous devez révéler de cartes. Cependant, vous ne pouvez révéler que des cartes de la couleur des clairières où vous possédez des pièces, car elles témoignent de votre emprise sur cette zone chaotique. Chaque Ministre Rallié vous octroie une action supplémentaire par tour. Certains Ministres vous permettent de marquer des points de victoire en tirant parti de votre développement dans les Sous-Bois.</p><p>Vos taupes sont bien protégées dans <b>le Terrier</b>, une clairière où vous êtes le seul à pouvoir pénétrer et que vous contrôlez toujours. Depuis le Terrier, vous pouvez vous déplacer grâce aux <b>Tunnels</b> que vous avez creusés dans les Sous-Bois. Si vous parvenez à apaiser les tensions dans une clairière et à vous y établir, vous pourrez y construire des <b>Citadelles</b> et des <b>Marchés</b> afin de rallier encore plus de créatures à votre cause. Cependant, vous devez payer le <b>Prix de l’Échec</b>, c’est-à-dire perdre le soutien d’un de vos Ministres de plus haut rang et défausser une carte au hasard, lorsque vous perdez des bâtiments.</p>`,
      setupTitle: `Mise en place du Duché Souterrain`,
      /* Loi de Root v2@12.3 */
      setup: `<ol><li><b>Préparer les guerriers et les Tunnels.</b> Formez une réserve de 20 guerriers et 3 Tunnels près de vous.</li><li><b>Préparer le Terrier.</b> Placez le plateau Terrier à côté du plateau principal.</li><li><b>Émerger.</b> Placez 2 guerriers et 1 Tunnel dans une clairière en coin qui n’est pas la clairière en coin de départ d’un autre joueur et qui est, si possible, diagonalement opposée à la clairière en coin de départ d’un autre joueur. Placez ensuite 2 guerriers dans chaque clairière adjacente à la clairière choisie en coin de plateau, sauf dans le Terrier.</li><li><b>Remplir les pistes de bâtiments.</b> Placez 3 Citadelles et 3 Marchés sur les cases Bâtiment correspondantes.</li><li><b>Réunir des Ministres.</b> Placez 9 cartes de Ministres face visible sur votre pile de Ministres Non-Ralliés.</li><li><b>Remplir les cases couronnes.</b> Placez 9 Couronnes sur les cases avec des points de victoire de votre plateau de faction.</li></ol>`,
      advancedSetup: `<ol><li>Choisissez une clairière en tant que territoire, si possible non adjacente à un territoire adverse.</li><li>Placez 2 <b>guerriers</b> et 1 <b>tunnel</b> dans la clairière de votre territoire. Placez 5 <b>guerriers</b> parmi les clairières adjacentes à votre territoire, répartis de la façon la plus équitable possible.</li><li>Placez <b>le Terrier</b> à côté du plateau. Remplissez vos pistes de Bâtiments avec vos <b>Citadelles</b> et vos <b>Marchés</b>, placez vos 9 <b>cartes de Ministre</b> face visible sur votre pile de Ministres Non-Ralliés et vos 9 <b>Couronnes</b> sur les cases carrées avec des points de victoire.</li></ol>`,
    },
    eyrie: {
      name: `Dynasties de la Canopée`,
      summaryTitle: `Jouer la Canopée`,
      summary: `<p>En jouant les Dynasties de la Canopée, vous souhaitez redonner à votre espèce sa gloire d’antan au sein de la Forêt en reprenant le contrôle de ses clairières. À chaque tour, vous marquerez des points selon le nombre de <b>perchoirs</b> sur le plateau. Plus il y en a, plus vous gagnez de points.</p><p>Vous êtes cependant lié par votre <b>Décret</b>, mandaté par votre <b>dirigeant</b>. À chaque tour, vous devez y ajouter des cartes, puis effectuer une action pour chaque carte s’y trouvant. Chaque action doit s’effectuer dans une clairière de la couleur de la carte, planifiez donc en conséquence. C’est au début assez simple, mais lorsque le Décret grossit, vous devrez vous démener pour pouvoir accomplir chaque action. Si vous ne pouvez pas en accomplir une, vous subissez une <b>crise</b>, perdez des points, remplacez votre dirigeant et défaussez votre Décret.</p><p>N’oubliez pas que les créatures terrestres tremblent à votre arrivée. Vous êtes les <b>Seigneurs de la Forêt</b>. Vous contrôlez les clairières en cas d’égalité. Mais votre peuple éprouve le <b>Mépris du commerce</b>, et vous marquerez souvent moins de points lorsque vous fabriquerez des objets.</p>`,
      setupTitle: `Mise en place des Dynasties de la Canopée`,
      /* Loi de Root v2@7.3 */
      setup: `<ol><li><b>Préparer les guerriers.</b> Formez une réserve de 20 guerriers.</li><li><b>Placer le Perchoir et les guerriers de départ.</b> Placez 1 Perchoir et 6 guerriers dans une clairière en coin qui n’est pas la clairière en coin de départ d’un autre joueur et qui est, si possible, diagonalement opposée à la clairière en coin de départ d’un autre joueur.</li><li><b>Choisir un dirigeant.</b> Choisissez 1 de vos 4 dirigeants de la Canopée et placez-le sur l’emplacement Dirigeant de votre plateau de faction. Placez les 3 autres dirigeants face visible devant vous.</li><li><b>Placer les vizirs.</b> Glissez vos 2 cartes de Vizir Fidèle face visible dans les colonnes du Décret indiquées par votre dirigeant.</li><li><b>Piste de Perchoirs.</b> Placez vos 6 Perchoirs restants sur votre piste de Perchoirs de droite à gauche.</li></ol>`,
      advancedSetup: `<ol><li>Choisissez une clairière, en tant que territoire, en bordure et qui a au moins 2 clairières entre elle et les territoires adverses si possible.</li><li>Placez 1 <b>perchoir</b> et 6 <b>guerriers</b> dans la clairière de votre territoire.</li><li>Choisissez un <b>dirigeant</b>, et gardez les autres à portée. Placez votre dirigeant sur votre emplacement Dirigeant. Glissez vos 2 <b>Vizirs Fidèles</b> dans les colonnes du Décret indiquées par votre dirigeant. Remplissez votre piste de perchoirs avec vos <b>perchoirs</b>, en laissant vide la case la plus à gauche.</li></ol>`,
    },
    keepers: {
      name: `Gardiens d’Airain`,
      summaryTitle: `Jouer les Gardiens`,
      summary: `<p>En tant que Gardiens d’Airain, vous marquez des points en récupérant des <b>reliques</b> perdues lors de conflits passés. Vous devrez <b>fouiller</b> les bois à la recherche des reliques, les déplacer vers un <b>relais</b> du même type, puis <b>récupérez</b> ces reliques. Que ces reliques vous appartiennent ou appartiennent aux Sous-Bois, cependant, est une autre question.</p><p>Comme <b>Chevaliers Dévots</b> d’un ordre exilé, vous ignorez la première perte que vous subissez au combat si vous avez à la fois un guerrier et une relique, en attaque ou en défense. Vous pouvez également déplacer des reliques avec vos guerriers.</p><p>Vos reliques sont des <b>Trophées Prisés</b>, alors gardez-les en sécurité. À chaque fois qu’un adversaire retire une relique de quelque manière que ce soit, il marque deux points de victoire au lieu d’un et replace la relique dans n’importe quel bois.</p><p>Au fil du temps, vous développerez votre <b>escorte</b>, trois colonnes de cartes qui vous permettent d’effectuer des actions. Cependant, fouiller et récupérer des reliques mettra votre escorte en danger. Vous aurez besoin de planifier et agir avec prudence pour réussir.</p>`,
      setupTitle: `Mise en place des Gardiens d’Airain`,
      setup: `<ol><li><b>Placer les reliques de départ.</b> Prenez les 12 jetons Relique et mélangez-les face cachée <i>(valeur cachée)</i>. Placez-en un au hasard dans chaque bois. <i>(Nous recommandons que vous glissiez les reliques face cachée puis que vous les placiez rapidement avec l’aide des autres joueurs. Vous pouvez aussi utiliser cette méthode plus aléatoire mais plus longue : les Gardiens empilent les reliques précédemment mélangées, puis un autre joueur coupe la pile, la prend et fait tomber une par une dans les bois les reliques du dessous de la pile.)</i></li><li><b>Placer les guerriers.</b> Placez 4 guerriers dans une clairière en coin qui n’est pas la clairière en coin de départ d’un autre joueur et qui est, si possible, diagonalement opposée à la clairière en coin de départ d’un autre joueur. Puis placez 4 guerriers dans une clairière en bordure du plateau et adjacente à la clairière choisie en coin de plateau.</li><li><b>Placer l’Escorte Fidèle.</b> Glissez une carte Escorte Fidèle dans chaque colonne de votre Escorte.</li><li><b>Réunir les relais.</b> Placez 3 relais sur les cases Relais correspondantes de votre plateau de faction.</li></ol>`,
      advancedSetup: `<ol><li>Mélangez les 12 <b>jetons Relique</b> face cachée. Placez-en un au hasard dans chaque bois, face cachée.</li><li>Choisissez deux clairières adjacentes, en tant que territoire, en bordure et qui ont au moins 2 clairières entre elles et les territoires adverses si possible. Placez 4 <b>guerriers</b> dans chaque clairière de votre territoire.</li><li>Placez les éventuelles <b>reliques</b> restantes dans les bois non adjacents à votre territoire, réparties de la façon la plus équitable possible.</li><li>Glissez une carte <b>Escorte Fidèle</b> dans chaque colonne de votre Escorte.</li></ol>`,
    },
    marquise: {
      name: `Marquise de Chat`,
      summaryTitle: `Jouer la Marquise`,
      summary: `<p>En jouant la Marquise de Chat, vous cherchez à transformer la Forêt en puissance militaire et industrielle. Chaque fois que vous construisez un <b>bâtiment</b>, vous marquez des points. Plus vous possédez de bâtiments du même type sur le plateau, plus cela vous rapporte de points.</p><p>Cependant pour pouvoir continuer à construire, vous devez maintenir et protéger une production de <b>bois</b> forte et interconnectée. Construire des infrastructures rend vos tours plus efficaces et vous aide à piocher plus de cartes, faites donc en sorte de protéger votre expansion. Vos forces sont légion, vous permettant de faire appliquer votre règne par la force, si nécessaire.</p><p>Le siège de votre pouvoir est le <b>Donjon</b>, une structure si imposante qu’aucune autre faction ne peut placer de pièces dans sa clairière. De plus vos <b>Hôpitaux de campagne</b> vous aideront à rester au cœur des combats. Lorsque vos guerriers sont retirés, vous pouvez dépenser une carte de la couleur de la clairière où se trouvent ces guerriers pour les placer dans la clairière du Donjon, tant qu’il n’est pas détruit. Protégez-le à tout prix !</p>`,
      setupTitle: `Mise en place de la Marquise de Chat`,
      /* Loi de Root v2@6.3 */
      setup: `<ol><li><b>Préparer les guerriers et le bois.</b> Formez une réserve de 25 guerriers et 8 bois.</li><li><b>Le Donjon.</b> Placez le jeton du Donjon dans une clairière en coin du plateau au choix.</li><li><b>Garnison.</b> Placez 1 guerrier dans chaque clairière, excepté dans celle diagonalement opposée à votre Donjon.</li><li><b>Placer les bâtiments de départ.</b> Placez 1 Scierie, 1 Atelier et 1 Recruteur. Vous pouvez les placer librement dans la clairière du Donjon et/ou dans les clairières adjacentes.</li><li><b>Remplir les pistes de bâtiments.</b> Placez vos bâtiments restants (5 de chaque type) de droite à gauche sur leur piste de Bâtiment correspondante. <i>(Toutes les cases sauf la plus à gauche de chaque piste sont alors remplies.)</i></li></ol>`,
      advancedSetup: `<ol><li>Choisissez 3 clairières adjacentes qui formeront votre territoire.</li><li>Placez 2 <b>guerriers</b> dans chaque clairière de votre territoire. Placez 1 <b>guerrier</b> dans chaque autre clairière.</li><li>Placez votre <b>jeton Donjon</b> dans l’une des 3 clairières de votre territoire, non adjacente à un territoire adverse si possible. Placez 1 <b>scierie</b>, 1 <b>atelier</b> et 1 <b>recruteur</b> parmi les 3 clairières de votre territoire, 1 par clairière.</li><li>Remplissez votre piste de bâtiments avec vos <b>scieries</b>, <b>ateliers</b> et <b>recruteurs</b>, en laissant vides les cases les plus à gauche.</li></ol>`,
    },
    riverfolk: {
      name: `Compagnie de la Rivière`,
      summaryTitle: `Jouer la Compagnie de la Rivière`,
      summary: `<p>En jouant la Compagnie de la Rivière, vous parcourez les rivières qui traversent la grande Forêt et offrez vos services à toute faction qui en a les moyens. Vous marquez des points de victoire en établissant des <b>comptoirs commerciaux</b> dans les clairières et en faisant fructifier vos fonds.</p><p>Bien que la construction de comptoirs commerciaux soit un moyen efficace de marquer des points, il en va de même pour l’accumulation de richesses. À chaque Aurore, vous marquez des points en fonction des <b>fonds</b> que vous avez économisés et gagnés lors du tour précédent. Mais vous devrez également investir ou dépenser ces fonds pour étendre et protéger votre réseau commercial, en trouvant un équilibre entre dividendes et croissance.</p><p>Vous gagnez des fonds lorsque les autres factions achètent vos <b>services</b>, que ce soit vos bateaux, vos guerriers mercenaires, ou bien vos cartes en main qui sont toutes <b>À vendre</b>. Vous pouvez fixer les prix de vos services à chaque tour, essayez donc d’anticiper les besoins des autres factions.</p><p>Construire des comptoirs commerciaux vous aide à développer votre clientèle, car une faction peut vous acheter plus de services s’ils sont dans des clairières où vous avez des comptoirs. Mais attention, lorsqu’un comptoir est détruit, il ne peut plus être reconstruit ! Vous ne contrôlez pas beaucoup de clairières, mais vous pouvez toujours vous déplacer le long des rivières, car vous êtes d’excellents <b>Nageurs</b>.</p>`,
      setupTitle: `Mise en place de la Compagnie de la Rivière`,
      /* Loi de Root v2@11.3 */
      setup: `<ol><li><b>Préparer les guerriers.</b> Formez une réserve de 15 guerriers près de vous.</li><li><b>Placer les guerriers.</b> Placez 4 guerriers sur une ou plusieurs clairières connectées à une rivière.</li><li><b>Piste des comptoirs commerciaux.</b> Placez les 9 comptoirs sur leurs cases correspondantes sur la piste des comptoirs.</li><li><b>Fonds de départ.</b> Placez 3 guerriers sur votre case Paiements.</li><li><b>Prix de départ.</b> Placez 1 marqueur de services sur une des cases de chacune des pistes de services.</li></ol>`,
      advancedSetup: `<ol><li>Placez 4 <b>guerriers</b> sur une ou plusieurs clairières le long de la rivière.</li><li>Placez 3 <b>guerriers</b> dans votre case Paiements.</li><li>Placez vos <b>marqueurs de service</b> sur votre piste de services pour fixer vos prix de départ pour chaque service.</li><li>Placez vos <b>comptoirs commerciaux</b> sur vos pistes de comptoirs correspondantes.</li></ol>`,
    },
    vagabond: {
      name: `Vagabond`,
      summaryTitle: `Jouer le Vagabond`,
      summary: `<p>En jouant le Vagbond, vous participez au conflit sans prendre parti, et vous faites des amis ou des ennmis selon vos intérêts. Vous marquez des points en améliorant vos <b>relations</b>, en aidant les factions amicales en leur donnant des cartes, et en retirant du jeu les pièces des factions hostiles. Vous pouvez également marquer des points en effectuant des <b>quêtes</b> afin d’accroître votre popularité auprès des créatures de la Forêt.</p><p>Pour agir efficacement, vous devez gérer vos <b>objets</b> et élargir votre collection en explorant les <b>ruines</b> de la Forêt et en apportant votre aide aux autres factions. Vous êtes un <b>Voyageur Solitaire</b>, vous ne pouvez jamais contrôler de clairière ni empêcher un joueur d’en contrôler une, mais vous êtes <b>Agile</b> et vous pouvez toujours vous déplacer, peu importe qui contrôle votre clairière.</p>`,
      setupTitle: `Mise en place du Vagabond`,
      /* Loi de Root v2@9.3 */
      setup: `<ol><li><b>Personnage.</b> Choisissez une carte de personnage et placez-la sur votre plateau de faction.</li><li><b>Placer votre pion.</b> Placez le pion du Vagabond dans n’importe quel bois.</li><li><b>Piocher des quêtes.</b> Mélangez vos cartes Quête, piochez-en 3 et disposez-les face visible.</li><li><b>Préparer les ruines.</b> Placez aléatoirement les objets de ruine <Bag/>, <Boot/>, <Hammer/> et <Sword/> <i>(marqués avec un « R »)</i> sous les ruines, sauf si cela a déjà été fait.</li><li><b>Prendre les objets de départ.</b> Prenez les objets marqués d’un « D » indiqués sur votre carte de personnage. Placez les objets <Tea/>, <Coin/> et <Bag/> face visible sur leurs pistes de votre plateau de faction. Placez tous les autres objets face visible dans votre sacoche. Remettez les objets « D » restants dans la boite.</li></ol>`,
      setup_vagabondSetUp: `<ol><li><b>Personnage.</b> Choisissez une carte de personnage et placez-la sur votre plateau de faction.</li><li><b>Placer votre pion.</b> Placez le pion du Vagabond dans n’importe quel bois.</li><li><b>Préparer les ruines.</b> Placez aléatoirement les objets de ruine supplémentaires <Bag/>, <Boot/>, <Hammer/> et <Sword/> <i>(marquées avec un « R »)</i> sous les ruines <i>(avec les objets existants)</i>.</li><li><b>Prendre les objets de départ.</b> Prenez les objets marqués d’un « D » indiqués sur votre carte de personnage. Placez les objets <Tea/>, <Coin/> et <Bag/> face visible sur leurs pistes de votre plateau de faction. Placez tous les autres objets face visible dans votre sacoche. Remettez les objets « D » restants dans la boite.</li></ol>`,
      advancedSetup: `<ol><li>Placez votre <b>pion</b> dans n’importe quel bois.</li><li>Mélangez le paquet de quêtes, piochez 3 <b>quêtes</b> et placez-les à proximité, face visible.</li><li>Placez aléatoirement les <b>objets de ruine</b> <Bag/>, <Boot/>, <Hammer/> et <Sword/> <i>(marqués avec un « R »)</i> sous les ruines, sauf si cela a déjà été fait.</li><li>Placez la carte <b>Personnage</b> « {{vagabond}} » sur votre emplacement de carte de personnage. Placez les <b>objets de départ</b> <InitialStartingItems>, </InitialStartingItems> et <FinalStartingItem/> <i>(marqués avec un « D »)</i> dans votre sacoche ou sur les pistes correspondantes.</li></ol>`,
      advancedSetup_vagabondSetUp: `<ol><li>Placez votre <b>pion</b> dans n’importe quel bois.</li><li>Placez aléatoirement les <b>objets de ruine</b> supplémentaires <Bag/>, <Boot/>, <Hammer/> et <Sword/> <i>(marquées avec un « R »)</i> sous les ruines <i>(avec les objets existants)</i>.</li><li>Placez la carte <b>Personnage</b> « {{vagabond}} » sur votre emplacement de carte de personnage. Placez les <b>objets de départ</b> <InitialStartingItems>, </InitialStartingItems> et <FinalStartingItem/> <i>(marqués avec un « D »)</i> dans votre sacoche ou sur les pistes correspondantes.</li></ol>`,
    },
    warlord: {
      name: `Seigneur des Nuées`,
      summaryTitle: `Jouer le Seigneur des Nuées`,
      summary: `<p>En tant que Seigneur des Nuées, vous marquez des points lorsque vous <b>opprimez</b> vos ennemis. À la fin de votre tour, plus vous contrôlez de clairières qui n’ont <i>aucune</i> pièce adverse — pas de guerrier, pas de bâtiment, rien — plus vous marquez de points.</p><p>Pour gagner en puissance et attirer des guerriers, vous devez acquérir des objets et les ajouter à votre imposant <b>Butin</b>. Les bottes, les sacs et les pièces augmentent votre <b>Autorité</b>, tandis que les marteaux, le café, les épées et l’arbalète augmentent votre <b>Prouesse</b>. Votre <b>Dédain du commerce</b> vous fait rarement marquer des points en fabriquant des objets, mais vous pouvez voler des objets à vos adversaires avec vos <b>pilleurs</b> !</p><p>À la tête des Nuées se trouve votre seigneur de guerre, un guerrier-démagogue dont l’<b>humeur</b> inconstante vous donne une capacité pour le tour. Votre seigneur de guerre est obsédé par la thésaurisation, donc plus vous acquérez d’objets, moins vous aurez le choix pour son humeur.</p><p>En vous déclarant être la vraie voix des Sous-Bois, vous pouvez provoquer les <b>cohues</b>, qui détruisent les bâtiments et les jetons adverses, et pillent les ruines pour leurs objets.</p>`,
      setupTitle: `Mise en place du Seigneur des Nuées`,
      setup: `<ol><li><b>Garnison.</b> Placez votre Seigneur de guerre, 4 guerriers et 1 bastion dans une clairière en coin qui n’est pas la clairière en coin de départ d’un autre joueur et qui est, si possible, diagonalement opposée à la clairière en coin de départ d’un autre joueur.</li><li><b>Placer les objets.</b> Placez aléatoirement les objets de ruine <Bag/>, <Boot/>, <Hammer/> et <Sword/> <i>(marqués avec un « R »)</i> sous les ruines, sauf si cela a déjà été fait.</li><li><b>Devenir Tenace.</b> Placez la carte d’humeur « Tenace » dans votre emplacement d’humeur.</li></ol>`,
      setup_vagabondSetUp: `<ol><li><b>Garnison.</b> Placez votre Seigneur de guerre, 4 guerriers et 1 bastion dans une clairière en coin qui n’est pas la clairière en coin de départ d’un autre joueur et qui est, si possible, diagonalement opposée à la clairière en coin de départ d’un autre joueur.</li><li><b>Devenir Tenace.</b> Placez la carte d’humeur « Tenace » dans votre emplacement d’humeur.</li></ol>`,
      advancedSetup: `<ol><li>Choisissez une clairière, en tant que territoire, en bordure et qui a au moins 2 clairières entre elle et les territoires adverses si possible.</li><li>Placez votre <b>Seigneur de guerre</b>, 4 <b>guerriers</b> et 1 <b>bastion</b> dans la clairière de votre territoire.</li><li>Placez la <b>carte d’humeur</b> « Tenace » dans votre emplacement d’humeur.</li><li>Placez aléatoirement les <b>objets de ruine</b> <Bag/>, <Boot/>, <Hammer/> et <Sword/> <i>(marqués avec un « R »)</i> sous les ruines, sauf si cela a déjà été fait.</li></ol>`,
      advancedSetup_vagabondSetUp: `<ol><li>Choisissez une clairière, en tant que territoire, en bordure et qui a au moins 2 clairières entre elle et les territoires adverses.</li><li>Placez votre <b>Seigneur de guerre</b>, 4 <b>guerriers</b> et 1 <b>bastion</b> dans la clairière de votre territoire.</li><li>Placez la <b>carte d’humeur</b> « Tenace » dans votre emplacement d’humeur.</li></ol>`,
    },
  },
  hireling: {
    band: {
      name: `Groupe Populaire`,
      setupTitle: `Mise en place du Groupe Populaire`,
      setupTitle_demoted: `Mise en place du Groupe de Rue`,
      setup: `Joueur {{count}}, prenez la carte Recrue et les 5 guerriers du Groupe Populaire dans la boîte de jeu. Placez 2 guerriers, chacun dans une clairière différente. Placez les guerriers restants et la carte Recrue <i>(face non-reléguée « Groupe Populaire » visible)</i> à côté du plateau.`,
      setup_demoted: `Joueur {{count}}, prenez la carte Recrue et les 5 guerriers du Groupe Populaire dans la boîte de jeu. Placez-les à côté du plateau <i>(avec la carte Recrue face reléguée « Groupe de Rue » visible)</i>.`,
    },
    bandits: {
      name: `Bandits de Grand Chemin`,
      setupTitle: `Mise en place des Bandits de Grand Chemin`,
      setupTitle_demoted: `Mise en place des Gangs de Bandits`,
      setup: `Joueur {{count}}, prenez la carte Recrue et les 4 guerriers des Bandits de Grand Chemin dans la boîte de jeu. Placez 2 guerriers, chacun sur un chemin différent. Placez les guerriers restants et la carte Recrue <i>(face non-reléguée « Bandits de Grand Chemin » visible)</i> à côté du plateau.`,
      setup_demoted: `Joueur {{count}}, prenez la carte Recrue et les 4 guerriers des Bandits de Grand Chemin dans la boîte de jeu. Placez-les à côté du plateau <i>(avec la carte Recrue face reléguée « Gangs de Bandits » visible)</i>.`,
    },
    dynasty: {
      name: `Dernière Dynastie`,
      setupTitle: `Mise en place de la Dernière Dynastie`,
      setupTitle_demoted: `Mise en place des Nobles Merles`,
      setup: `Joueur {{count}}, prenez la carte Recrue et les 5 guerriers de la Dernière Dynastie dans la boîte de jeu. Placez les 5 guerriers dans une clairière en bordure. Placez la carte Recrue <i>(face non-reléguée « Dernière Dynastie » visible)</i> à côté du plateau.`,
      setup_demoted: `Joueur {{count}}, prenez la carte Recrue de la Dernière Dynastie dans la boîte de jeu. Placez-la à côté du plateau <i>(face reléguée « Nobles Merles » visible)</i>.`,
    },
    exile: {
      name: `L’Exilé`,
      setupTitle: `Mise en place de l’Exilé`,
      setupTitle_demoted: `Mise en place du Hors-la-Loi`,
      setup: `Joueur {{count}}, prenez la carte Recrue, le pion et les 3 objets Gourdin de l’Exilé dans la boîte de jeu. Placez le pion dans n’importe quel bois. Placez la carte Recrue <i>(face non-reléguée « Exilé » visible)</i> à côté du plateau et placez les 3 objets Gourdin dessus <i>(face visible)</i>.`,
      setup_demoted: `Joueur {{count}}, prenez la carte Recrue de l’Exilé dans la boîte de jeu. Placez-la à côté du plateau <i>(face reléguée « Hors-la-Loi » visible)</i>. Placez aléatoirement les <b>objets de ruine</b> <Bag/>, <Boot/>, <Hammer/> et <Sword/> <i>(marqués d’un « R »)</i> sous les ruines, comme si le Vagabond était en jeu.`,
    },
    expedition: {
      name: `Expédition du Soleil`,
      setupTitle: `Mise en place de l’Expédition du Soleil`,
      setupTitle_demoted: `Mise en place des Artisans Taupes`,
      setup: `Joueur {{count}}, prenez la carte Recrue, les 8 guerriers et les 3 jetons Mine de l’Expédition du Soleil dans la boîte de jeu. Placez 1 jeton Mine et 3 guerriers dans n’importe quelle clairière. Placez les guerriers et jetons restants et la carte Recrue <i>(face non-reléguée « Expédition du Soleil » visible)</i> à côté du plateau.`,
      setup_demoted: `Joueur {{count}}, prenez la carte Recrue de l’Expédition du Soleil dans la boîte de jeu. Placez-la à côté du plateau <i>(face reléguée « Artisans Taupes » visible)</i>.`,
    },
    flamebearers: {
      name: `Porteurs de Flammes`,
      setupTitle: `Mise en place des Porteurs de Flammes`,
      setupTitle_demoted: `Mise en place des Contrebandiers Rats`,
      setup: `Joueur {{count}}, prenez la carte Recrue et les 6 guerriers des Porteurs de Flammes dans la boîte de jeu. Placez 2 guerriers dans une ou plusieurs clairières. Placez les guerriers restants et la carte Recrue <i>(face non-reléguée « Porteurs de Flammes » visible)</i> à côté du plateau.`,
      setup_demoted: `Joueur {{count}}, prenez la carte Recrue des Porteurs de Flammes dans la boîte de jeu. Placez-la à côté du plateau <i>(face reléguée « Contrebandiers Rats » visible)</i>.`,
    },
    flotilla: {
      name: `Flotille Marchande`,
      setupTitle: `Mise en place de la Flotille Marchande`,
      setupTitle_demoted: `Mise en place des Plongeurs Loutres`,
      setup: `Joueur {{count}}, prenez la carte Recrue et le pion de la Flotille Marchande dans la boîte de jeu. Placez le pion dans une clairière en bordure, le long de la rivière. Placez la carte Recrue <i>(face non-reléguée « Flotille Marchande » visible)</i> à côté du plateau.`,
      setup_demoted: `Joueur {{count}}, prenez la carte Recrue de la Flotille Marchande dans la boîte de jeu. Placez-la à côté du plateau <i>(face reléguée « Plongeurs Loutres » visible)</i>.`,
    },
    patrol: {
      name: `Patrouille de la Forêt`,
      setupTitle: `Mise en place de la Patrouille de la Forêt`,
      setupTitle_demoted: `Mise en place des Médecins Félins`,
      setup: `Joueur {{count}}, prenez la carte Recrue et les 12 guerriers de la Patrouille de la Forêt dans la boîte de jeu. Placez 1 guerrier dans chaque clairière. Placez la carte Recrue <i>(face non-reléguée « Patrouille de la Forêt » visible)</i> à côté du plateau.`,
      setup_demoted: `Joueur {{count}}, prenez la carte Recrue de la Patrouille de la Forêt dans la boîte de jeu. Placez-la à côté du plateau <i>(face reléguée « Médecins Félins » visible)</i>.`,
    },
    prophets: {
      name: `Prophètes du Levant`,
      setupTitle: `Mise en place des Prophètes du Levant`,
      setupTitle_demoted: `Mise en place des Messagers Lézards`,
      setup: `Joueur {{count}}, prenez la carte Recrue et les 4 guerriers des Prophètes du Levant dans la boîte de jeu. Placez 1 guerrier dans chaque clairière avec une ruine. Placez la carte Recrue <i>(face non-reléguée « Prophètes du Levant » visible)</i> à côté du plateau.`,
      setup_demoted: `Joueur {{count}}, prenez la carte Recrue des Prophètes du Levant dans la boîte de jeu. Placez-la à côté du plateau <i>(face reléguée « Messagers Lézards » visible)</i>.`,
    },
    protector: {
      name: `Protecteur Courroucé`,
      setupTitle: `Mise en place du Protecteur Courroucé`,
      setupTitle_demoted: `Mise en place du Protecteur Stoïque`,
      setup: `Joueur {{count}}, prenez la carte Recrue et le pion du Protecteur Courroucé dans la boîte de jeu. Placez le pion dans n’importe quelle clairière. Placez la carte Recrue <i>(face non-reléguée « Protecteur Courroucé » visible)</i> à côté du plateau.`,
      setup_demoted: `Joueur {{count}}, prenez la carte Recrue et le pion du Protecteur Courroucé dans la boîte de jeu. Placez-les à côté du plateau <i>(avec la carte Recrue face reléguée « Protecteur Stoïque » visible)</i>.`,
    },
    spies: {
      name: `Espions Corvidés`,
      setupTitle: `Mise en place des Espions Corvidés`,
      setupTitle_demoted: `Mise en place des Sentinelles Corbeaux`,
      setup: `Joueur {{count}}, prenez la carte Recrue et les 6 guerriers des Espions Corvidés dans la boîte de jeu. Placez 2 guerriers, un chacun dans deux clairières de la même couleur. Placez les guerriers restants et la carte Recrue <i>(face non-reléguée « Espions Corvidés » visible)</i> à côté du plateau.`,
      setup_demoted: `Joueur {{count}}, prenez la carte Recrue des Espions Corvidés dans la boîte de jeu. Placez-la à côté du plateau <i>(face reléguée « Sentinelles Corbeaux » visible)</i>.`,
    },
    uprising: {
      name: `Printemps des Souris`,
      setupTitle: `Mise en place du Printemps des Souris`,
      setupTitle_demoted: `Mise en place des Éclaireurs Lapins`,
      setup: `Joueur {{count}}, prenez la carte Recrue, les 4 guerriers et le dé Soulèvement du Printemps des Souris dans la boîte de jeu. Lancez le dé Soulèvement deux fois et placez 1 guerrier dans les clairières correspondantes. Placez les guerriers restants, le dé et la carte Recrue <i>(face non-reléguée « Printemps des Souris » visible)</i> à côté du plateau.`,
      setup_demoted: `Joueur {{count}}, prenez la carte Recrue du Printemps des Souris dans la boîte de jeu. Placez-la à côté du plateau <i>(face reléguée « Éclaireurs Lapins » visible)</i>.`,
    },
    vaultkeepers: {
      name: `Gardiens du Caveau`,
      setupTitle: `Mise en place des Gardiens du Caveau`,
      setupTitle_demoted: `Mise en place des Gardes du Corps Blaireaux`,
      setup: `Joueur {{count}}, prenez la carte Recrue, les 6 guerriers et les 6 bâtiments Caveau des Gardiens du Caveau dans la boîte de jeu. Placez 2 guerriers et 1 bâtiment Caveau dans n’importe quelle clairière avec un emplacement de bâtiment libre. Placez les guerriers et les bâtiments restants et la carte Recrue <i>(face non-reléguée « Gardiens du Caveau » visible)</i> à côté du plateau.`,
      setup_demoted: `Joueur {{count}}, prenez la carte Recrue des Gardiens du Caveau dans la boîte de jeu. Placez-la à côté du plateau <i>(face reléguée « Gardes du Corps Blaireaux » visible).`,
    },
  },
  landmark: {
    city: {
      name: `Cité Perdue`,
      setupTitle: `Mise en place de la Cité Perdue`,
      setup: `Joueur {{count}}, placez la Cité Perdue dans une clairière le long de la rivière. Cette clairière ne doit pas contenir un autre Lieu ou être adjacente à une clairière contenant un autre Lieu. Prenez la carte de lieu « Cité Perdue » dans la boîte de jeu et placez-la à côté du plateau, face non-mise en place visible.`,
      setup_lake: `Joueur {{count}}, placez la Cité Perdue dans une clairière côtière. Cette clairière ne doit pas contenir un autre Lieu ou être adjacente à une clairière contenant un autre Lieu. Prenez la carte de lieu « Cité Perdue » dans la boîte de jeu et placez-la à côté du plateau, face non-mise en place visible.`,
    },
    ferry: {
      name: `Radeau`,
      setupTitle: `Mise en place du Radeau`,
      setup: `Joueur {{count}}, placez le Radeau dans une clairière le long de la rivière. Cette clairière ne doit pas contenir un autre Lieu ou être adjacente à une clairière contenant un autre Lieu. Si vous avez la carte de lieu « Radeau », sortez-la de la boîte de jeu et placez-la à côté du plateau, face non-mise en place visible. Si vous n’avez pas la carte, le Radeau a la règle suivante pendant la partie :<p>« Une fois par tour, un joueur se déplaçant depuis la clairière comportant le Radeau peut se déplacer avec le Radeau vers une clairière adjacente le long de la rivière. <i>(Et ce selon les règles de déplacement habituelles.)</i> Après s’être ainsi déplacé, ce joueur pioche une carte. »</p>`,
      setup_lake: `Joueur {{count}}, placez le Radeau dans une clairière côtière. Cette clairière ne doit pas contenir un autre Lieu ou être adjacente à une clairière contenant un autre Lieu. Si vous avez la carte de lieu « Radeau », sortez-la de la boîte de jeu et placez-la à côté du plateau, face non-mise en place visible. Si vous n’avez pas la carte, le Radeau a la règle suivante pendant la partie :<p>« Une fois par tour, un joueur se déplaçant depuis la clairière côtière comportant le Radeau peut se déplacer avec le Radeau vers une autre clairière côtière. <i>(Et ce selon les règles de déplacement habituelles.)</i> Après s’être ainsi déplacé, ce joueur pioche une carte. »</p>`,
    },
    forge: {
      name: `Forge Légendaire`,
      setupTitle: `Mise en place de la Forge Légendaire`,
      setup: `Joueur {{count}}, placez la Forge Légendaire dans une clairière. Cette clairière ne doit pas contenir un autre Lieu ou être adjacente à une clairière contenant un autre Lieu. Prenez la carte de lieu « Forge Légendaire » de la boîte de jeu et placez-la à côté du plateau, face non-mise en place visible.<br/>Selon la couleur de la clairière de la Forge Légendaire, retirez les objets suivants de la réserve d’objets du plateau, et placez-les sur la carte « Forge Légendaire » :<p><Fox/> : <Sword/> <Sword/> <Crossbow/> <Hammer/></p><p><Mouse/> : <Bag/> <Bag/> <Tea/> <Tea/></p><p><Rabbit/> : <Boot/> <Boot/> <Coin/> <Coin/></p>`,
    },
    market: {
      name: `Marché Noir`,
      setupTitle: `Mise en place du Marché Noir`,
      setup: `Joueur {{count}}, placez le Marché Noir dans une clairière qui a exactement un emplacement de bâtiment et aucune ruine. Cette clairière ne doit pas contenir un autre Lieu ou être adjacente à une clairière contenant un autre Lieu. Prenez la carte de lieu « Marché Noir » dans la boîte de jeu et placez-la à côté du plateau, face non-mise en place visible.<br/>Piochez 3 cartes sans les regarder et placez-les face cachée à côté de la carte « Marché Noir ».`,
    },
    tower: {
      name: `Tour`,
      setupTitle: `Mise en place de la Tour`,
      setup: `Joueur {{count}}, placez la Tour dans une clairière avec une ruine. Cette clairière ne doit pas contenir un autre Lieu. Si vous avez la carte de lieu « Tour », sortez-la de la boîte de jeu et placez-la à côté du plateau, face non-mise en place visible. Si vous n’avez pas la carte, la Tour a la règle suivante pendant la partie :<p>« À la fin du Crépuscule d’un joueur, s’il contrôle la clairière avec la Tour, il marque 1 point de victoire. »</p>`,
    },
    treetop: {
      name: `Arbre Vénérable`,
      setupTitle: `Mise en place de l’Arbre Vénérable`,
      setup: `Joueur {{count}}, placez l’Arbre Vénérable dans une clairière en coin. Cette clairière ne doit pas contenir un autre Lieu ou être adjacente à une clairière contenant un autre Lieu. Prenez la carte de lieu « Arbre Vénérable » dans la boîte de jeu et placez-la à côté du plateau, face non-mise en place visible.`,
    },
  },
  map: {
    autumn: {
      name: `Automne`,
      setupTitle: `Mise en place du plateau Automne`,
      setup: `<li>Prenez le plateau Automne/Hiver dans la boîte de jeu et placez-le avec la face Automne visible.</li>`,
      fixedSuits: `Sur le plateau Automne, utiliser les couleurs de clairière imprimées`,
    },
    lake: {
      name: `Lac`,
      setupTitle: `Mise en place du plateau Lac`,
      setup: `<li>Prenez le plateau Lac/Montagne dans la boîte de jeu et placez-le avec la face Lac visible.</li>`,
      fixedSuits: `Sur le plateau Lac, utiliser les couleurs de clairière suggérées`,
      useLandmark: `Sur le plateau Lac, utiliser la mise en place du Radeau spécifique à ce plateau`,
      landmarkSetup: `<li>Placez le Radeau comme indiqué dans le schéma ci-dessous. Si vous avez la carte de lieu « Radeau », sortez-la de la boîte de jeu et placez-la à côté du plateau, face non-mise en place visible.</li>`,
    },
    mountain: {
      name: `Montagne`,
      setupTitle: `Mise en place du plateau Montagne`,
      /* Loi de Root v2@D.3.1 */
      setup: `<li>Prenez le plateau Lac/Montagne dans la boîte de jeu et placez-le avec la face Montagne visible.</li><li>Placez les 6 marqueurs de chemin fermé sur les 6 chemins plus foncés creusés dans la terre.</li>`,
      fixedSuits: `Sur le plateau Montagne, utiliser les couleurs de clairière suggérées`,
      useLandmark: `Sur le plateau Montagne, utiliser la mise en place de la Tour spécifique à ce plateau`,
      landmarkSetup: `<li>Placez la Tour comme indiqué dans le schéma ci-dessous. Si vous avez la carte de lieu « Tour », sortez-la de la boîte de jeu et placez-la à côté du plateau, face non-mise en place visible.</li>`,
    },
    winter: {
      name: `Hiver`,
      setupTitle: `Mise en place du plateau Hiver`,
      setup: `<li>Prenez le plateau Automne/Hiver dans la boîte de jeu et placez-le avec la face Hiver visible.</li>`,
    },
  },
  vagabond: {
    /* Loi de Root v2@E.7 */
    adventurer: {
      name: `Aventurier`,
      action: `Improvisation`,
      effect: `Une fois par tour, lorsque vous effectuez l’action Quête, vous pouvez considérer un objet non épuisé comme s’il s’agissait de n’importe quel autre objet. Lorsque vous épuisez cet objet pour accomplir la quête, endommagez-le aussi.`,
    },
    /* Loi de Root v2@E.5 */
    arbiter: {
      name: `Médiateur`,
      action: `Protection`,
      effect: `Avant de lancer les dés pour un combat, le défenseur peut enrôler le Médiateur dans la clairière du combat. Le Médiateur marque 1 point de victoire et ajoute toutes ses <Sword/> intactes au maximum de pertes infligées par le défenseur. Le Médiateur ne peut pas s’enrôler lui-même.`,
    },
    /* Loi de Root v2@E.9 */
    harrier: {
      name: `Chasseur`,
      action: `Vol plané`,
      effect: `Épuisez une <Torch/> pour déplacer votre pion Vagabond <i>(pas d’autres pièces)</i> dans n’importe quelle clairière <i>(même Hostile)</i> du plateau sans épuiser de <Boot/>.`,
    },
    /* Loi de Root v2@E.3 */
    ranger: {
      name: `Rôdeur`,
      action: `Refuge`,
      effect: `Épuisez une <Torch/> pour réparer 3 objets. Mettez ensuite immédiatement fin au Jour et passez au Crépuscule.`,
    },
    /* Loi de Root v2@E.8 */
    ronin: {
      name: `Ronin`,
      action: `Frappe rapide`,
      effect: `Vous pouvez épuiser une <Sword/> pour infliger 1 perte additionnelle au combat <i>(après avoir lancé les dés)</i>.`,
    },
    /* Loi de Root v2@E.6 */
    scoundrel: {
      name: `Brigand`,
      action: `Terre brûlée`,
      effect: `Épuisez une <Torch/> et placez-la dans votre clairière. Retirez toutes les pièces adverses de cette clairière. Pour le reste de la partie, il n’est plus possible de placer de pièces dans cette clairière ni d’en déplacer vers celle-ci. <i>(Vous restez dans cette clairière. Une fois que vous en sortez, vous ne pouvez plus y entrer.)</i>`,
    },
    /* Loi de Root v2@E.1 */
    thief: {
      name: `Voleur`,
      action: `Larcin`,
      effect: `Épuisez une <Torch/> pour prendre une carte au hasard dans la main d’un joueur de votre clairière.`,
    },
    /* Loi de Root v2@E.2 */
    tinker: {
      name: `Bricoleur`,
      action: `Travailleur`,
      effect: `Épuisez une <Torch/> pour prendre une carte de la défausse de la même couleur que votre clairière. <i>(Vous pouvez toujours prendre une carte Oiseau.)</i>`,
    },
    /* Loi de Root v2@E.4 */
    vagrant: {
      name: `Miséreux`,
      action: `Provocation`,
      effect: `Épuisez une <Torch/> pour initier un combat dans votre clairière. Vous choisissez l’attaquant et le défenseur, ainsi que l’ordre dans lequel chacun retire des bâtiments et des jetons. Vous retirez également les pièces. <i>(Marquez 1 point de victoire par bâtiment ou jeton de chaque joueur retiré, ainsi que par pièce hostile des joueurs retirée.)</i>`,
    },
  },
};
