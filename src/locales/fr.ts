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
    disableAll: `Tout désélectionner`,
    enableAll: `Tout sélectionner`,
    factionRating: [`Faible`, `Modérée`, `Élevée`],
    fixedFirstPlayer: {
      false: `Rendre aléatoire le premier joueur <i>(Joueur 1 est la personne utilisant cette application, Joueur 2 est la personne à côté dans le sens des aiguilles d’une montre, etc.)</i>`,
      true: `Fixer le premier joueur <i>(Joueur 1 est la première personne, Joueur 2 est la seconde, etc.)</i>`,
    },
    fox: `Renard`,
    includeBotStep: `Inclure la mise en place des robots`,
    includeHirelings: `Inclure les nomades`,
    landmarkCount: `Nombre de monuments`,
    logoAlt: `Root`,
    logoText: `Mise en place automatique`,
    mapChart: `Schéma des clairières du plateau, ordonnées de gauche à droite et de haut en bas`,
    militant: `Militante`,
    mouse: `Souris`,
    nextStep: `Étape suivante`,
    pageTitle: `Mise en place automatique de Root`,
    placeMarkers: {
      // Loi de Root v2023.08.03@A.1 + Lois de la Rootbotique v2023.08.03@3.1
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
    // Loi de Root v2023.08.03@B.1.2
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
    factionHirelingExcluded: `La faction associée à ce nomade est requise pour la mise en place`,
    hirelingSelected: `Un nomade équivalent à cette faction est déjà en jeu`,
    landmarkNotEnoughPlayers: `Pas assez de joueurs pour jouer avec ce monument`,
    lockedFaction: `Impossible de choisir la dernière faction tant qu’une faction militante n’a pas été choisie`, // Loi de Root v2023.08.03@A.8.1.II
    mapLandmarkUsed: `Monument déjà inclus dans la mise en place du plateau`,
    noDeck: `Aucun paquet sélectionné ! Veuillez sélectionner au moins un paquet`,
    noFaction: `Aucune faction sélectionnée ! Veuillez sélectionner une faction à jouer`,
    noLandmark: `Aucun monument sélectionné ! Veuillez sélectionner au moins un monument ou mettre le nombre de monuments à zéro`,
    noMap: `Aucun plateau sélectionné ! Veuillez sélectionner au moins un plateau`,
    noMilitantFaction: `Aucune faction militante sélectionnée ! Veuillez sélectionner au moins une faction militante`,
    tooFewFaction: `Pas assez de factions sélectionnées ! Veuillez sélectionner plus de factions, désactiver le draft de factions ou réduire le nombre de joueurs`,
    tooFewHireling: `Pas assez de nomades pour mettre en place les nomades ! Cela peut être dû au fait que la sélection actuelle de nomades nécessite de supprimer trop de factions de la mise en place`,
    tooFewLandmark: `Pas assez de monuments sélectionnés ! Veuillez sélectionner plus de monuments ou réduire le nombre de monuments`,
    tooFewPlayerInsurgent: `Impossible d’utiliser des factions non militantes avec moins de 3 joueurs et sans robot ni nomade`,
    tooFewVagabond: `Pas assez de personnages Vagabond sélectionnés ! Veuillez inclure plus de personnages Vagabond ou exclure des factions Vagabond`,
    tooManyCornerSetup: `Trop de factions sélectionnées doivent commencer dans une clairière d’un coin du plateau ! Veuillez sélectionner plus de factions ou activer le draft de factions`, // Loi de Root v2023.08.03@5
  },
  setupStep: {
    chooseExpansions: {
      body: `Bienvenue dans la mise en place automatique de Root. Cette page vous guidera à travers les règles de mise en place avancée du jeu de société populaire Root, avec peu de mélange de cartes et aucune carte de mise en place nécessaire ! Pour commencer, sélectionnez le contenu de Root avec lequel vous jouez. Lorsque vous êtes prêt à passer à l’étape suivante, utilisez les boutons en bas de la page.`,
    },
    seatPlayers: {
      // Loi de Root v2023.08.03@A.4
      title: `Placement des joueurs`,
      body: `Déterminez la place des joueurs autour de la table, puis sélectionnez le nombre de joueurs avec lesquels vous jouez et si vous souhaitez que l’application choisisse aléatoirement un premier joueur.`,
    },
    chooseMap: {
      // Loi de Root v2023.08.03@A.1
      title: `Choix et installation du plateau`,
      body: `Choisissez ensemble le plateau de jeu que vous souhaitez utiliser. Si vous sélectionnez plusieurs plateaux, un plateau sera choisi aléatoirement parmi ceux sélectionnés.`,
    },
    setUpMap: {
      // Loi de Root v2023.08.03@5.1.4 + 5.1.5 + 5.1.6
      body: `<li>Placez une ruine sur chaque emplacement du plateau marqué d’un « R » <i>(4 au total)</i>.</li><li>Placez ces objets sur leurs emplacements correspondants dans la réserve d’objets de la partie supérieure du plateau : 2 <Boot/>, 2 <Bag/>, 1 <Crossbow/>, 1 <Hammer/>, 2 <Sword/>, 2 <Tea/>, 2 <Coin/>.</li><li>Posez les deux dés près du plateau.</li>`,
    },
    chooseDeck: {
      // Loi de Root v2023.08.03@A.2
      title: `Choix et installation du paquet de cartes`,
      body: `Choisissez ensemble quel paquet de cartes vous souhaitez utiliser. Si vous sélectionnez plusieurs paquets, un paquet sera choisi aléatoirement parmi ceux sélectionnés.`,
    },
    setUpDeck: {
      title: `Installation du paquet de cartes`,
    },
    setUpBots: {
      title: `Installation des robots`,
      body: `Choisissez ensemble avec quels robots vous souhaitez jouer, en suivant leurs instructions de mise en place comme décrit dans les Lois de la Rootbotique.`,
    },
    chooseLandmarks: {
      // Loi de Root v2023.08.03@A.5
      title: `Installation des monuments`,
      body: `Choisissez ensemble avec combien de monuments vous souhaitez jouer et lesquels inclure dans la sélection.`,
      body_mapLandmark: `Choisissez ensemble avec combien de monuments vous souhaitez jouer <i>(en plus du monument déjà inclus avec le plateau)</i>, et lesquels inclure dans la sélection.`,
    },
    chooseHirelings: {
      title: `Installation des nomades`,
      body: `Choisissez ensemble si vous souhaitez jouer avec des nomades et lesquels inclure dans la sélection.`,
    },
    postHirelingSetup: {
      // Loi de Root v2023.08.03@A.6.4
      subtitle: `Placement des marqueurs de nomade`,
      body: `Placez les trois marqueurs de nomade (« 4 », « 8 », et « 12 ») sur les cases correspondantes de la piste de score sur le plateau.`,
    },
    drawCards: {
      // Loi de Root v2023.08.03@A.7
      title: `Pioche de cinq cartes`,
      body: `Chaque joueur pioche cinq cartes. <i>(Vous choisirez plus tard les trois cartes que vous souhaitez conserver.)</i>`,
    },
    chooseFactions: {
      title: `Installation des factions`,
      body: `Sélectionnez ensemble les factions que vous souhaitez inclure dans la mise en place.`,
    },
    selectFaction: {
      subtitle: `Assignation des factions`, // Loi de Root v2023.08.03@5.1.1
      subtitle_useDraft: `Choix des factions`, // Loi de Root v2023.08.03@A.8.2
      body: `Assignez une des factions ci-dessous à chaque joueur selon la méthode de votre choix. Les factions seront mises en place de gauche à droite. Vous pouvez sélectionner librement des factions dans la liste pour consulter leurs informations.`, // Loi de Root v2023.08.03@5.1.1
      body_useDraft: `Joueur {{count}}, choisissez la faction que vous souhaitez jouer dans la liste de factions ci-dessous. Vous pouvez sélectionner librement des factions dans la liste pour consulter leurs informations, avant de confirmer votre sélection en appuyant sur « Étape suivante ».`,
    },
    placeScoreMarkers: {
      title: `Placement des marqueurs de score`,
      title_vagabondSetUp: `Placement des marqueurs de score et de relation`,
      body: `Chaque joueur place son marqueur de score sur la case « 0 » de la piste de score.`, // Loi de Root v2023.08.03@A.9
      body_vagabondSetUp: `Chaque joueur place son marqueur de score sur la case « 0 » de la piste de score. Chaque joueur Vagabond prend les marqueurs de relation des factions en jeu (hors Vagabond) et les place sur la case Indifférent de son tableau de relations.`, // Loi de Root v2023.08.03@9.3.6 + A.9
    },
    chooseHand: {
      // Loi de Root v2023.08.03@A.10
      title: `Choix des mains de départ`,
      body: `Chaque joueur choisit trois cartes à conserver parmi celles qu’il a en main, et replace les deux autres, face cachée, sur la pioche. Lorsque tous les joueurs ont choisi leurs cartes, mélangez la pioche.`,
    },
    setupEnd: {
      title: `Commencer à jouer`,
      body: `La mise en place est maintenant terminée. La partie commencera avec le Joueur {{count}}. Si vous souhaitez recommencer le processus de mise en place, utilisez le bouton ci-dessous.<p><i>« Mise en place automatique de Root » développé par Ewen Cameron</i><br/><i>Traduction française par Romain Storai et Steeve Fontaine</i><br/><i>Basé sur le jeu de société « Root » publié par Leder Games</i><br/><i>Application sous licence CC BY-NC-SA 4.0</i></p>`,
    },
  },
  deck: {
    exiles: {
      name: `Exilés et Partisans`, // Loi de Root v2023.08.03@B.7
      setupTitle: `Installation du paquet Exilés et Partisans`,
      setup: `Prenez le paquet de cartes Exilés et Partisans dans la boite de jeu et placez-le à côté du plateau. Mélangez le paquet.`,
      setup_twoPlayer: `Prenez le paquet de cartes Exilés et Partisans dans la boite de jeu et placez-le à côté du plateau. Retirez du paquet les quatre cartes Domination. Mélangez le paquet.`, // Loi de Root v2023.08.03@A.7
    },
    standard: {
      name: `Base`,
      setupTitle: `Mise en place du paquet de base`,
      setup: `Prenez le paquet de cartes de base dans la boite de jeu et placez-le à côté du plateau. Mélangez le paquet.`,
      setup_twoPlayer: `Prenez le paquet de cartes de base dans la boite de jeu et placez-le à côté du plateau. Retirez du paquet les quatre cartes Domination. Mélangez le paquet.`, // Loi de Root v2023.08.03@A.7
    },
  },
  expansion: {
    exilesDeck: `Paquet de cartes Exilés et Partisans`, // Loi de Root v2023.08.03@B.7
    landmarkPack: `Pack Monuments`, // Loi de Root v2023.08.03@B.8
    marauder: `Extension Maraude`, // Loi de Root v2023.08.03@B.4
    marauderHirelings: `Pack Nomades Maraude`, // Loi de Root v2023.08.03@B.10
    riverfolk: `Extension Compagnie de la Rivière`, // Loi de Root v2023.08.03@B.2
    riverfolkHirelings: `Pack Nomades de la Rivière`, // Loi de Root v2023.08.03@B.10
    root: `Root`, // Loi de Root v2023.08.03@B.1
    underworld: `Extension Monde Souterrain`, // Loi de Root v2023.08.03@B.3
    underworldHirelings: `Pack Nomades Souterrains`, // Loi de Root v2023.08.03@B.10
    vagabondPack: `Pack Vagabond`, // Loi de Root v2023.08.03@B.9
  },
  faction: {
    alliance: {
      name: `Alliance de la Forêt`,
      summaryTitle: `Jouer l’Alliance`,
      summary: `<p>En jouant l’Alliance de la Forêt, vous faites votre possible pour vous attirer la sympathie des créatures opprimées de la Forêt. Chaque fois que vous placez un <b>jeton de Sympathie</b> sur le plateau, vous marquez des points. Plus vous en avez placé, plus vous gagnez de points.</p><p>Gagner la sympathie des peuples nécessite des <b>partisans</b>, des cartes placées sur votre plateau de faction, de la couleur des clairières où vous souhaitez agir. Vous pouvez ajouter vos propres cartes à vos partisans, mais vous pouvez aussi inciter vos adversaires à en faire autant en provoquant l’<b>Indignation</b> : lorsqu’une autre faction retire de la sympathie ou déplace des guerriers dans une clairière sympathisante, elle doit ajouter une carte à votre pile de partisans.</p><p>N’hésitez pas à mettre en place des points d’étranglement, car vous êtes expert en <b>Guérilla</b> : lorsque vous défendez en combat, vous utilisez le plus grand résultat. Placez votre Sympathie là où les conflits sont les plus probables, et forcez vos adversaires à vous affronter !</p><p>Les partisans peuvent être poussés à une violente <b>révolte</b>, ce qui détruit <i>toutes</i> les pièces adverses d’une clairière et vous permet d’y placer une <b>base</b> et des guerriers. Les bases améliorent votre pioche et vous permettent d’entraîner des <b>officiers</b>, qui vous donnent des actions gratuites chaque tour. Protégez vos bases ! Si vous en perdez une, vous perdrez de nombreux partisans et officiers.</p>`,
      setupTitle: `Mise en place de l’Alliance de la Forêt`,
      setup: {
        default: `<ol><li><b>Préparer les guerriers.</b> Formez une réserve de 10 guerriers.</li><li><b>Placer les bases.</b> Placez 3 bases sur les cases Base correspondantes du plateau de faction.</li><li><b>Remplir la piste de Sympathie.</b> Placez 10 jetons de Sympathie sur votre piste de Sympathie.</li><li><b>Gagner des partisans.</b> Piochez 3 cartes et placez-les face cachée dans votre pile de partisans.</li></ol>`, // Loi de Root v2023.08.03@8.3
      },
      advancedSetup: {
        default: `<ol><li>Piochez 3 <b>cartes</b> et ajoutez-les face cachée à vos partisans.</li><li>Remplissez votre piste de Sympathie avec vos <b>jetons de Sympathie</b>.</li><li>Placez vos 3 <b>bases</b> sur les emplacements correspondants.</li></ol>`,
      },
    },
    corvid: {
      name: `Conspiration des Corvidés`,
      summaryTitle: `Jouer les Corvidés`,
      summary: `<p>En tant que membre de la Conspiration des Corvidés, vous voulez prouver que c’est vous qui détenez le pouvoir et qui tirez les ficelles du conflit qui agite les Sous-Bois. Vous marquez des points chaque fois que vous retournez un jeton de <b>Complot</b> précédemment placé sur le plateau. Et plus il y a de Complots face visible sur le plateau lorsque vous le faites, plus vous marquez de points.</p><p>Pour placer et retourner des Complots, vous devez recruter des guerriers et les placer stratégiquement. Votre faction est une des meilleures lorsqu’il s’agit de rallier des guerriers à sa cause, mais ces derniers ont tendance à s’éparpiller et vous déplacer trop souvent n’est pas forcément une bonne idée. De plus, vous ne pouvez pas vous permettre de beaucoup combattre, étant donné qu’il vous faut retirer au moins un de vos guerriers pour placer un Complot, mais qu’il faut aussi des guerriers Corvidés sur la clairière d’un Complot pour le retourner.</p><p>Heureusement, vos guerriers sont particulièrement <b>Agiles</b>, ce qui en facilite le déplacement. Vos <b>Agents Secrets</b> quant à eux protègent efficacement vos Complots des attaques en infligeant une perte supplémentaire en combat lorsque vous êtes le défenseur et avez un jeton de Complot face cachée.</p><p>Soyez cependant vigilant à ne pas laisser d’opportunité à vos adversaires de <b>déjouer vos Complots</b>. Un adversaire dans une clairière avec un jeton de Complot face cachée peut vous montrer une carte de la couleur de la clairière pour tenter de deviner de quel type de Complot il s’agit. S’il a raison, c’est qu’il est parvenu à infiltrer la Conspiration et à déjouer votre Complot ! Il retire alors le Complot et ignore son effet. S’il se trompe et que vous avez réussi à démasquer son espion, votre Complot reste en place et il doit vous donner la carte qu’il vous a montrée. Il va falloir bluffer…`,
      setupTitle: `Mise en place de la Conspiration des Corvidés`,
      setup: {
        default: `<ol><li><b>Préparer les guerriers et les Complots.</b> Formez une réserve de 15 guerriers et 8 jetons de Complot face cachée.</li><li><b>Déploiement.</b> Placez 1 guerrier dans une clairière de chaque couleur <i>(3 en tout)</li>.</li></ol>`, // Loi de Root v2023.08.03@13.3
      },
      advancedSetup: {
        default: `<ol><li>Choisissez une Patrie. Placez-y 1 <b>guerrier</b> et 1<b>jeton Complot</b> de votre choix face cachée.</li><li>Placez 1 <b>guerrier</b> dans une clairière de chaque couleur. <i>(Vous aurez donc placé 4 guerriers en tout à l’issue des étapes 1 et 2.)</i></li></ol>`,
      },
    },
    cult: {
      name: `Culte des Lézards`,
      summaryTitle: `Jouer le Culte des Lézards`,
      summary: `<p>En jouant le Culte des Lézards, vous vous occupez des créatures rejetées par les autres factions. Vous marquez des points de victoire en exécutant les <b>rituels</b> appropriés, en révélant des cartes de votre main de la même couleur que les clairières où vous possédez des <b>jardins</b>, et en défaussant des cartes pour compléter le rite. Plus vous avez de jardins de la couleur de la carte révélée, plus vous marquez de points.</p><p>Cette approche vous empêche de combattre vos adversaires en début de partie. Pour cela vous devez radicaliser vos membres et en faire des <b>acolytes</b>. Vous pourrez ainsi effectuer des <b>conspirations</b> dans les clairières de <b>Parias</b>, la couleur de carte la plus défaussée lors de la manche précédente.</p><p>Votre <b>Haine des oiseaux</b> vous empêche d’utiliser vos cartes Oiseau comme jokers pour vos rituels. Vos jardins répandent la parole de votre seigneur dragon, attirant des foules de <b>Pèlerins</b>. Vous contrôlez une clairière dès que vous y avez au moins un jardin. Enfin, vos acolytes obtiennent toujours <b>Vengeance</b> sur vos adversaires : lorsqu’un de vos guerriers est retiré alors qu’il défend en combat, vous gagnez un nouvel acolyte.</p>`,
      setupTitle: `Mise en place du Culte des Lézards`,
      setup: {
        default: `<ol><li><b>Préparer les guerriers.</b> Formez une réserve de 25 guerriers.</li><li>Placer les guerriers.</b> Dans la clairière dans un des coins qui n’est la clairière de départ en coin d’aucun autre joueur et, si possible, qui est diagonalement opposée à une clairière de départ en coin, placez 4 guerriers et un jardin de la même couleur imprimée que la clairière. Il s’agit de votre clairière de départ. Puis placez 1 guerrier dans chaque clairière adjacente.</li><li><b>Choisir les Parias.</b> Placez le marqueur de Parias sur une couleur dans la case Parias. La couleur choisie est appelée <i>Paria</i>.</li><li><b>Piste des jardins.</b> Placez vos 14 jardins restants sur les cases correspondantes de votre piste de jardins, de droite à gauche.</li></ol>`, // Loi de Root v2023.08.03@10.3
      },
      advancedSetup: {
        default: `<ol><li>Choisissez une Patrie qui n’est adjacente à aucune Patrie adverse.</li><li>Placez 4 <b>guerriers</b> et 1 <b>jardin</b> de la couleur correspondante dans votre Patrie. Placez 3 <b>guerriers</b> dans des clairières adjacentes en les répartissant le plus équitablement possible.</li><li>Placez 2 <b>guerriers</b> dans votre case Acolystes.</li><li>Remplissez vos pistes de jardins avec des <b>jardins</b>, en laissant vide la case la plus à gauche de la couleur du jardin sur le plateau.</li><li>Placez votre <b>marqueur de Parias</b>, face Parias visible sur une case au choix de votre piste de parias.</li></ol>`,
      },
    },
    duchy: {
      name: `Duché Souterrain`,
      summaryTitle: `Jouer le Duché`,
      summary: `<p>En tant que membre du Duché Souterrain vous souhaitez asservir toutes les autres créatures des Sous-Bois. Chaque fois que vous ralliez un de vos <b>Ministres</b> à votre cause <i>(mettre fin à la guerre et unifier les terres au-dessus de vous)</i>, vous marquez des points. Plus le rang du Ministre Rallié est élevé, plus vous marquez de points.</p><p>Pour rallier un Ministre, vous devez révéler des cartes, qui représentent les membres des Sous-Bois qui vous soutiennent. Plus le rang du Ministre est élevé, plus vous devez révéler de cartes. Cependant, vous ne pouvez révéler que des cartes de la couleur des clairières où vous possédez des pièces, car elles témoignent de votre emprise sur cette zone chaotique. Chaque Ministre Rallié vous octroie une action supplémentaire par tour. Certains Ministres vous permettent de marquer des points de victoire en tirant parti de votre développement dans les Sous-Bois.</p><p>Vos taupes sont bien protégées dans <b>le Terrier</b>, une clairière où vous êtes le seul à pouvoir pénétrer et que vous contrôlez toujours. Depuis le Terrier, vous pouvez vous déplacer grâce aux <b>Tunnels</b> que vous avez creusés dans les Sous-Bois. Si vous parvenez à apaiser les tensions dans une clairière et à vous y établir, vous pourrez y construire des <b>Citadelles</b> et des <b>Marchés</b> afin de rallier encore plus de créatures à votre cause. Cependant, vous devez payer le <b>Prix de l’Échec</b>, c’est-à-dire perdre le soutien d’un de vos Ministres de plus haut rang et défausser une carte au hasard, lorsque vous perdez des bâtiments.</p>`,
      setupTitle: `Mise en place du Duché Souterrain`,
      setup: {
        default: `<ol><li><b>Préparer les guerriers et les Tunnels.</b> Formez une réserve de 20 guerriers et 3 Tunnels près de vous.</li><li><b>Préparer le Terrier.</b> Placez le plateau Terrier à côté du plateau principal.</li><li><b>Émerger.</b> Placez 2 guerriers et 1 Tunnel dans une clairière en coin qui n’est la clairière de départ en coin d’aucun autre joueur et, si possible, qui est diagonalement opposée à une clairière de départ en coin. Il s’agit de votre clairière de départ. Placez ensuite 2 guerriers dans chaque clairière adjacente à la clairière choisie en coin de plateau, sauf dans le Terrier.</li><li><b>Remplir les pistes de bâtiments.</b> Placez 3 Citadelles et 3 Marchés sur les cases Bâtiment correspondantes.</li><li><b>Réunir des Ministres.</b> Placez 9 cartes de ministre face visible sur votre pile de Ministres Non-Ralliés.</li><li><b>Remplir les cases Couronne.</b> Placez 9 Couronnes sur les cases avec des points de victoire de votre plateau de faction.</li></ol>`, // Loi de Root v2023.08.03@12.3
      },
      advancedSetup: {
        default: `<ol><li>Choisissez une Patrie qui n’est adjacente à aucune Patrie adverse.</li><li>Placez 2 <b>guerriers</b> et 1 <b>Tunnel</b> dans votre Patrie. Placez 5 <b>guerriers</b> sur les clairières adjacentes, en les répartissant le plus équitablement possible.</li><li>Placez votre <b>plateau Terrier</b> à côté du plateau principal. Remplissez vos pistes de bâtiments avec vos <b>Citadelles</b> et vos <b>Marchés</b>. Placez vos 9 <b>cartes Ministre</b> face visible dans votre pile de Ministres Non-Ralliés. Placez vos 9 <b>couronnes</b> sur les cases carrées avec des points de victoire.</li></ol>`,
      },
    },
    eyrie: {
      name: `Dynasties de la Canopée`,
      summaryTitle: `Jouer la Canopée`,
      summary: `<p>En jouant les Dynasties de la Canopée, vous souhaitez redonner à votre espèce sa gloire d’antan au sein de la Forêt en reprenant le contrôle de ses clairières. À chaque tour, vous marquerez des points selon le nombre de <b>perchoirs</b> sur le plateau. Plus il y en a, plus vous gagnez de points.</p><p>Vous êtes cependant lié par votre <b>Décret</b>, mandaté par votre <b>dirigeant</b>. À chaque tour, vous devez y ajouter des cartes, puis effectuer une action pour chaque carte s’y trouvant. Chaque action doit s’effectuer dans une clairière de la couleur de la carte, planifiez donc en conséquence. C’est au début assez simple, mais lorsque le Décret grossit, vous devrez vous démener pour pouvoir accomplir chaque action. Si vous ne pouvez pas en accomplir une, vous subissez une <b>crise</b>, perdez des points, remplacez votre dirigeant et défaussez votre Décret.</p><p>N’oubliez pas que les créatures terrestres tremblent à votre arrivée. Vous êtes les <b>Seigneurs de la Forêt</b>. Vous contrôlez les clairières en cas d’égalité. Mais votre peuple éprouve le <b>Mépris du commerce</b>, et vous marquerez souvent moins de points lorsque vous fabriquerez des objets.</p>`,
      setupTitle: `Mise en place des Dynasties de la Canopée`,
      setup: {
        default: `<ol><li><b>Préparer les guerriers.</b> Formez une réserve de 20 guerriers.</li><li><b>Placer le Perchoir et les guerriers de départ.</b> Placez 1 Perchoir et 6 guerriers dans la clairière dans un des coins qui n’est la clairière de départ en coin d’aucun autre joueur et, si possible, qui est diagonalement opposée à une clairière de départ en coin. Il s’agit de votre clairière de départ.</li><li><b>Choisir un dirigeant.</b> Choisissez 1 de vos 4 dirigeants de la Canopée et placez-le sur l’emplacement Dirigeant de votre plateau de faction. Placez les 3 autres dirigeants face visible devant vous.</li><li><b>Placer les Vizirs.</b> Glissez vos 2 cartes de Vizir Fidèle face visible dans les colonnes du Décret indiquées par votre dirigeant.</li><li><b>Remplir la piste de Perchoirs.</b> Placez vos 6 Perchoirs restants sur votre piste de Perchoirs de droite à gauche.</li></ol>`, // Loi de Root v2023.08.03@7.3
      },
      advancedSetup: {
        default: `<ol><li>Choisissez une Patrie sur le bord du plateau avec au moins 2 clairières entre celle-ci et les Patries adverses.</li><li>Placez 6 <b>guerriers</b> et 1 <b>Perchoir</b> dans votre Patrie.</li><li>Placez 1 <b>carte Dirigeant</b> sur l’emplacement correspondant. Gardez les 3 autres Dirigeants face visible, à proximité.</li><li>Glissez vos 2 <b>Vizirs Fidèles</b> dans les colonnes du Décret indiquées par votre Dirigeant.</li><li>Remplissez vos pistes de Perchoirs avec des <b>Perchoirs</b>, en laissant la case la plus à gauche vide.</li></ol>`,
      },
    },
    keepers: {
      name: `Gardiens de Fer`,
      summaryTitle: `Jouer les Gardiens`,
      summary: `<p>En jouant les Gardiens de Fer, vous marquez des points en restaurant des <b>reliques</b> perdues lors d’anciens conflits. Vous devez pour cela <b>extraire</b> les reliques des bois, les déplacer vers un <b>Relais</b> du même type, et enfin <b>restaurer</b> les reliques. Nul ne sait, cependant, si ces reliques appartiennent aux Gardiens ou aux Sous-Bois…</p><p>En tant que <b>Chevaliers dévoués</b> d’un ordre jadis exilé, vous ignorez la première perte subie en combat si vous avez un guerrier ET une relique dans la clairière du combat, et ce, que vous soyez attaquant ou défenseur. Vous pouvez également déplacer les reliques avec vos guerriers.</p><p>Vos reliques sont des <b>Trophées convoités</b>, protégez-les donc bien. Chaque fois qu’un adversaire retire une relique (de quelque manière que ce soit), il marque 2 points de victoire au lieu de 1, et la replace dans un bois de son choix.</p>Au fil du temps, votre <b>Cortège</b> grossira. Ces 3 colonnes de cartes vous permettent d’effectuer des actions. Mais extraire et restaurer des reliques met les membres de votre Cortège en danger et vous devrez planifier prudemment vos actions pour espérer triompher.</p>`,
      setupTitle: `Mise en place des Gardiens de Fer`,
      setup: {
        default: `<ol><li><b>Placer les reliques de départ.</b> Prenez les 12 jetons Relique et mélangez-les face cachée <i>(leur valeur ne doit pas être visible)</i>. Placez-en 1 au hasard dans chaque bois. <i>(Nous vous conseillons de faire glisser les Reliques face cachée sur le plateau, et des les placer tous ensemblede cette façon le plus rapidement possible. Vous pouvez aussi essayer cette méthode : le joueur des Gardiens empile les reliques au hasard, un autre joueur coupe la pile, la prend et fat tomber les reliques une par une de bas en haut dans les bois.)</i></li><li><b>Placer les guerriers.</b> Placez 4 guerriers dans la clairière dans un des coins qui n’est la clairière de départ en coin d’aucun autre joueur et, si possible, qui est diagonalement opposée à une clairière de départ en coin. Puis placez 4 guerriers dans une clairière sur un bord du plateau et adjacente à la clairière choisie.</li><li><b>Placer le reste des reliques.</b> Placez aussi équitablement que possible le reste des reliques au hasard dans les bois qui ne sont pas adjacents aux clairières contenant vos guerriers.</li><li><b>Placer les Membres Loyaux du Cortège.</b> Glissez une carte Membre Loyal du Cortège dans chaque case Cortège de votre plateau de faction.</li><li><b>Prendre les Relais.</b> Placez vos 3 bâtiments Relais sur les cases Relais correspondantes de votre plateau de faction.</li></ol>`, // Loi de Root v2023.08.03@15.3
      },
      advancedSetup: {
        default: `<ol><li>Mélangez les 12 <b>jetons Relique</b> face cachée. Placez-en 1 face cachée au hasard dans chaque bois.</li><li>Choisissez vos Patries : 2 clairières adjacentes sur un bord du plateau avec au moins 2 clairières entre celles-ci et les Patries adverses. Placez 4 <b>guerriers</b> dans chaque Patrie.</li><li>Placez les <b>reliques</b> restantes, aussi équitablement que possible, dans les bois qui ne sont pas adjacents à vos Patries.</li><li>Glissez une <b>carte Membre Loyal du Cortège</b> dans chaque case Cortège de votre plateau de faction (une par colonne). Placez vos 3 Relais sur leurs emplacements correspondants.</li></ol>`,
      },
    },
    marquise: {
      name: `Marquise de Chat`,
      summaryTitle: `Jouer la Marquise`,
      summary: `<p>En jouant la Marquise de Chat, vous cherchez à transformer la Forêt en puissance militaire et industrielle. Chaque fois que vous construisez un <b>bâtiment</b>, vous marquez des points. Plus vous possédez de bâtiments du même type sur le plateau, plus cela vous rapporte de points.</p><p>Cependant pour pouvoir continuer à construire, vous devez maintenir et protéger une production de <b>bois</b> forte et interconnectée. Construire des infrastructures rend vos tours plus efficaces et vous aide à piocher plus de cartes, faites donc en sorte de protéger votre expansion. Vos forces sont légion, vous permettant de faire appliquer votre règne par la force, si nécessaire.</p><p>Le siège de votre pouvoir est le <b>Donjon</b>, une structure si imposante qu’aucune autre faction ne peut placer de pièces dans sa clairière. De plus vos <b>Hôpitaux de campagne</b> vous aideront à rester au cœur des combats. Lorsque vos guerriers sont retirés, vous pouvez dépenser une carte de la couleur de la clairière où se trouvent ces guerriers pour les placer dans la clairière du Donjon, tant qu’il n’est pas détruit. Protégez-le à tout prix !</p>`,
      setupTitle: `Mise en place de la Marquise de Chat`,
      setup: {
        default: `<ol><li><b>Préparer les guerriers et le bois.</b> Formez une réserve de 25 guerriers et 8 bois.</li><li><b>Le Donjon.</b> Placez le jeton du Donjon dans une clairière en coin du plateau au choix. Il s’agit de votre clairière de départ.</li><li><b>Garnison.</b> Placez 1 guerrier dans chaque clairière, excepté dans celle diagonalement opposée à la clairière avec le jeton du Donjon.</li><li><b>Placer les bâtiments de départ.</b> Placez 1 Scierie, 1 Atelier et 1 Recruteur. Vous pouvez les placer librement dans la clairière du Donjon et/ou dans les clairières adjacentes.</li><li><b>Remplir les pistes de bâtiments.</b> Placez vos bâtiments restants (5 Scieries, 5 Ateliers et 5 Recruteurs) de droite à gauche sur leur piste de Bâtiment correspondante. <i>(Toutes les cases sauf la plus à gauche de chaque piste sont alors remplies.)</i></li></ol>`, // Loi de Root v2023.08.03@6.3
      },
      advancedSetup: {
        default: `<ol><li>Choisissez 3 clairières, chacune adjacente à au moins une autre, comme Patries.</li><li>Placez 2 <b>guerriers</b> dans chacune de vos Patries et 1 <b>guerrier</b> dans toutes les autres clairières.</li><li>Placez le <b>jeton Donjon</b> dans une de vos Patries, non adjacent à une patrie adverse, si possible. Placez 1 <b>Scierie</b>, 1 <b>Atelier</b>, et 1 <b>Recruteur</b> sur le plateau, chacun dans une de vos Patries (tous dans une Patrie différente).</li><li>Remplissez vos pistes de bâtiments avec vos <b>bâtiments</b> en laissant les cases les plus à gauche vides.</li></ol>`,
      },
    },
    riverfolk: {
      name: `Compagnie de la Rivière`,
      summaryTitle: `Jouer la Compagnie de la Rivière`,
      summary: `<p>En jouant la Compagnie de la Rivière, vous parcourez les rivières qui traversent la grande Forêt et offrez vos services à toute faction qui en a les moyens. Vous marquez des points de victoire en établissant des <b>comptoirs commerciaux</b> dans les clairières et en faisant fructifier vos fonds.</p><p>Bien que la construction de comptoirs commerciaux soit un moyen efficace de marquer des points, il en va de même pour l’accumulation de richesses. À chaque Aurore, vous marquez des points en fonction des <b>fonds</b> que vous avez économisés et gagnés lors du tour précédent. Mais vous devrez également investir ou dépenser ces fonds pour étendre et protéger votre réseau commercial, en trouvant un équilibre entre dividendes et croissance.</p><p>Vous gagnez des fonds lorsque les autres factions achètent vos <b>services</b>, que ce soit vos bateaux, vos guerriers mercenaires, ou bien vos cartes en main qui sont toutes <b>À vendre</b>. Vous pouvez fixer les prix de vos services à chaque tour, essayez donc d’anticiper les besoins des autres factions.</p><p>Construire des comptoirs commerciaux vous aide à développer votre clientèle, car une faction peut vous acheter plus de services s’ils sont dans des clairières où vous avez des comptoirs. Mais attention, lorsqu’un comptoir est détruit, il ne peut plus être reconstruit ! Vous ne contrôlez pas beaucoup de clairières, mais vous pouvez toujours vous déplacer le long des rivières, car vous êtes d’excellents <b>Nageurs</b>.</p>`,
      setupTitle: `Mise en place de la Compagnie de la Rivière`,
      setup: {
        default: `<ol><li><b>Préparer les guerriers.</b> Formez une réserve de 15 guerriers.</li><li><b>Placer les guerriers.</b> Placez 4 guerriers sur une ou plusieurs clairières connectées à une rivière.</li><li><b>Piste des comptoirs commerciaux.</b> Placez les 9 comptoirs sur leurs cases correspondantes sur la piste des comptoirs.</li><li><b>Fonds de départ.</b> Placez 3 guerriers sur votre case Paiements.</li><li><b>Prix de départ.</b> Placez 1 marqueur de services sur une des cases de chacune des pistes de services.</li></ol>`, // Loi de Root v2023.08.03@11.3
      },
      advancedSetup: {
        default: `<ol><li>Placez 4 <b>guerriers</b> sur une ou plusieurs clairières le long de la rivière.</li><li>Placez 3 <b>guerriers</b> dans votre case Paiements.</li><li>Remplissez vos pistes de comptoirs commerciaux avec des <b>comptoirs commerciaux</b> correspondants.</li><li>Placez vos 3 <b>marqueurs de services</b> sur vos pistes de services pour fixer vos prix de départ pour chaque service.</li></ol>`,
      },
    },
    vagabond: {
      name: `Vagabond`,
      summaryTitle: `Jouer le Vagabond`,
      summary: `<p>En jouant le Vagbond, vous participez au conflit sans prendre parti, et vous faites des amis ou des ennmis selon vos intérêts. Vous marquez des points en améliorant vos <b>relations</b>, en aidant les factions amicales en leur donnant des cartes, et en retirant du jeu les pièces des factions hostiles. Vous pouvez également marquer des points en effectuant des <b>quêtes</b> afin d’accroître votre popularité auprès des créatures de la Forêt.</p><p>Pour agir efficacement, vous devez gérer vos <b>objets</b> et élargir votre collection en explorant les <b>ruines</b> de la Forêt et en apportant votre aide aux autres factions. Vous êtes un <b>Voyageur Solitaire</b>, vous ne pouvez jamais contrôler de clairière ni empêcher un joueur d’en contrôler une, mais vous êtes <b>Agile</b> et vous pouvez toujours vous déplacer, peu importe qui contrôle votre clairière.</p>`,
      setupTitle: `Mise en place du Vagabond`,
      setup: {
        default: `<ol><li><b>Choisir un personnage.</b> Choisissez une carte de personnage et placez-la sur votre plateau de faction.</li><li><b>Placer votre pion.</b> Placez le pion du Vagabond dans n’importe quel bois.</li><li><b>Piocher des Quêtes.</b> Mélangez vos cartes Quête, piochez-en 3 et disposez-les face visible.</li><li><b>Préparer les ruines.</b> Placez aléatoirement les 4 objets <Bag/>, <Boot/>, <Hammer/> et <Sword/> marqués d’un « R » sous les ruines, à moins que cette étape n’ait déjà été effectuée.</li><li><b>Prendre les objets de départ.</b> Prenez les objets marqués d’un « D » indiqués sur votre carte de personnage. Placez les objets <Tea/>, <Coin/>, et <Bag/> face visible sur leurs pistes de votre plateau de faction. Placez tous les autres objets face visible dans votre Sacoche. Remettez les objets « D » restants dans la boite.</li></ol>`, // Loi de Root v2023.08.03@9.3
        vagabondSetUp: `<ol><li><b>Choisir un personnage.</b> Choisissez une carte de personnage et placez-la sur votre plateau de faction.</li><li><b>Placer votre pion.</b> Placez le pion du Vagabond dans n’importe quel bois.</li><li><b>Préparer les ruines.</b> Placez aléatoirement les 4 objets supplémentaires <Bag/>, <Boot/>, <Hammer/> et <Sword/> marqués d’un « R » sous les ruines <i>(avec les objets existants)</i>.</li><li><b>Prendre les objets de départ.</b> Prenez les objets marqués d’un « D » indiqués sur votre carte de personnage. Placez les objets <Tea/>, <Coin/>, et <Bag/> face visible sur leurs pistes de votre plateau de faction. Placez tous les autres objets face visible dans votre Sacoche. Remettez les objets « D » restants dans la boite.</li></ol>`, // Loi de Root v2023.08.03@9.3
      },
      advancedSetup: {
        default: `<ol><li>Placez votre <b>pion</b> dans n’importe quel bois.</li><li>Mélangez le paquet de quêtes. Piochez 3 <b>quêtes</b> et placez-les à proximité.</li><li>Placez aléatoirement les 4 <b>objets « R »</b> <Bag/>, <Boot/>, <Hammer/> et <Sword/> sous les ruines, si ce n’est pas déjà fait.</li><li>Placez la carte <b>Personnage</b> « {{vagabond}} » sur son emplacement et les <b>objets « D »</b> <InitialStartingItems>, </InitialStartingItems> et <FinalStartingItem/> dans votre Sacoche ou sur les pistes correspondantes selon le cas.</li></ol>`,
        vagabondSetUp: `<ol><li>Placez votre <b>pion</b> dans n’importe quel bois.</li><li>Placez aléatoirement les 4 <b>objets « R »</b> <Bag/>, <Boot/>, <Hammer/> et <Sword/> supplémentaires sous les ruines <i>(avec les objets existants)</i>.</li><li>Placez la carte <b>Personnage</b> « {{vagabond}} » sur son emplacement et les <b>objets « D »</b> <InitialStartingItems>, </InitialStartingItems> et <FinalStartingItem/> dans votre Sacoche ou sur les pistes correspondantes selon le cas.</li></ol>`,
      },
    },
    warlord: {
      name: `Seigneur des Cents`,
      summaryTitle: `Jouer le Seigneur des Cents`,
      summary: `<p>En jouant le Seigneur des Cents, vous marquez des points en <b>opprimant</b> vos adversaires. À la fin de votre tour, plus vous contrôlez de clairières qui n’ont aucune pièce adverse <i>(pas de guerriers, pas de bâtiments, rien !)</i>, plus vous marquez de points.</p><p>Pour gagner en puissance et attirer des guerriers, vous devez ajouter des objets à votre énorme <b>Butin</b>. Les bottes, les sacs et les pièces augmentent votre <b>Autorité</b>, tandis que les marteaux, cafés, épées et arbalètes augmentent votre <b>Bravoure</b>. Votre <b>Dédain du commerce</b> limite votre gain de points lors de la fabrication des objets, mais vous pouvez toujours envoyer vos <b>Pillards</b> en voler à vos adversaires !</p><p>Votre seigneur de guerre se trouve à latête des Cents. Ce guerrier-démagogue à l’<b>humeur</b> variable vous accorde une capacité pour le tour. Son appât du gain limite progressivement le nombre d’humeurs disponibles au fil des objets amassés.</p><p>Comme vous vous êtes autoproclamés représentants de la vraie voix des Sous-Bois, vous pouvez inciter des <b>Foules</b> à détruire des bâtiments et jetons adverses, et à raser des ruines pour obtenir des objets.</p>`,
      setupTitle: `Mise en place du Seigneur des Cents`,
      setup: {
        default: `<ol><li><b>Garnison.</b> Placez votre seigneur de guerre, 4 guerriers et 1 Bastion dans une clairière en coin qui n’est la clairière de départ en coin d’aucun autre joueur et, si possible, qui est diagonalement opposée à une clairière de départ en coin.</li><li><b>Placer les objets.</b> Placez les 4 objets <Bag/>, <Boot/>, <Hammer/> et <Sword/> marqués d’un « R » aléatoirement sous les ruines, à moins que cette étape n’ait déjà été effectuée.</li><li><b>Devenir Tenace.</b> Placez la carte d’Humeur Tenace dans la case d’Humeur.</li></ol>`, // Loi de Root v2023.08.03@14.3
        vagabondSetUp: `<ol><li><b>Garnison.</b> Placez votre seigneur de guerre, 4 guerriers et 1 Bastion dans une clairière en coin qui n’est la clairière de départ en coin d’aucun autre joueur et, si possible, qui est diagonalement opposée à une clairière de départ en coin.</li><li><b>Devenir Tenace.</b> Placez la carte d’Humeur Tenace dans la case d’Humeur.</li></ol>`, // Loi de Root v2023.08.03@14.3
      },
      advancedSetup: {
        default: `<ol><li>Choisissez une Patrie sur le bord du plateau avec au moins 2 clairières entre celle-ci et les Patries adverses.</li><li>Placez votre <b>seigneur de guerre</b>, 4 <b>guerriers</b>, et 1 <b>Bastion</b> dans votre Patrie.</li><li>Placez votre <b>carte d’Humeur Tenace</b> dans l’emplacement correspondant.</li><li>Placez les 4 <b>objets « R »</b> <Bag/>, <Boot/>, <Hammer/> et <Sword/> sous les ruines au hasard, si ce n’est pas déjà fait.</li></ol>`,
        vagabondSetUp: `<ol><li>Choisissez une Patrie sur le bord du plateau avec au moins 2 clairières entre celle-ci et les Patries adverses.</li><li>Placez votre <b>seigneur de guerre</b>, 4 <b>guerriers</b>, et 1 <b>Bastion</b> dans votre Patrie.</li><li>Placez votre <b>carte d’Humeur Tenace</b> dans l’emplacement correspondant.</li></ol>`,
      },
    },
  },
  hireling: {
    band: {
      name: `Groupe Populaire`,
      setupTitle: `Mise en place du Groupe Populaire`,
      setupTitle_demoted: `Mise en place du Groupe de rue`,
      setup: `Joueur {{count}}, prenez la carte Nomade du Groupe Populaire et les 5 guerriers Groupe dans la boite de jeu. Placez 2 guerriers Groupe dans 2 clairières différentes. Placez les guerriers restants et la carte Nomade <i>(face promue « Groupe Populaire » visible)</i> à côté du plateau.`,
      setup_demoted: `Joueur {{count}}, prenez la carte Nomade du Groupe Populaire et les 5 guerriers Groupe dans la boite de jeu. Placez-les à côté du plateau <i>(avec la carte Nomade face rétrogradée « Groupe de rue » visible)</i>.`,
    },
    bandits: {
      name: `Bandits des Grands Chemins`,
      setupTitle: `Mise en place des Bandits des Grands Chemins`,
      setupTitle_demoted: `Mise en place des Gangs de Bandits`,
      setup: `Joueur {{count}}, prenez la carte Nomade des Bandits des Grands Chemins et les 4 guerriers Bandits dans la boite de jeu. Placez 2 guerriers Bandits, chacun sur un chemin qui n’en contient pas. Placez les guerriers restants et la carte Nomade <i>(face promue « Bandits des Grands Chemins » visible)</i> à côté du plateau.`,
      setup_demoted: `Joueur {{count}}, prenez la carte Nomade des Bandits des Grands Chemins et les 4 guerriers Bandits dans la boite de jeu. Placez-les à côté du plateau <i>(avec la carte Nomade face rétrogradée « Gangs de Bandits » visible)</i>.`,
    },
    dynasty: {
      name: `Dernière Dynastie`,
      setupTitle: `Mise en place de la Dernière Dynastie`,
      setupTitle_demoted: `Mise en place des Merles Nobles`,
      setup: `Joueur {{count}}, prenez la carte Nomade de la Dernière Dynastie et les 5 guerriers Dynastie dans la boite de jeu. Placez les 5 guerriers Dynastie dans une clairière sur un bord du plateau. Placez la carte Nomade <i>(face promue « Dernière Dynastie » visible)</i> à côté du plateau.`,
      setup_demoted: `Joueur {{count}}, prenez la carte Nomade de la Dernière Dynastie dans la boite de jeu. Placez-la à côté du plateau <i>(face rétrogradée « Merles Nobles » visible)</i>.`,
    },
    exile: {
      name: `L’Exilé`,
      setupTitle: `Mise en place de l’Exilé`,
      setupTitle_demoted: `Mise en place du Brigand`,
      setup: `Joueur {{count}}, prenez la carte Nomade de l’Exilé, le pion Exilé et les 3 objets Gourdin dans la boite de jeu. Placez le pion Exilé dans un bois. Placez la carte Nomade <i>(face promue « L’Exilé » visible)</i> à côté du plateau, et placez les 3 objets Gourdin dessus <i>(face visible)</i>.`,
      setup_demoted: `Joueur {{count}}, prenez la carte Nomade de l’Exilé dans la boite de jeu. Placez-la à côté du plateau <i>(face rétrogradée « Le Brigand » visible)</i>. Placez aléatoirement les objets « R » <Bag/>, <Boot/>, <Hammer/> et <Sword/> sous les ruines, comme si le Vagabond était en jeu.`,
    },
    expedition: {
      name: `Expédition de Lumière`,
      setupTitle: `Mise en place de l’Expédition de Lumière`,
      setupTitle_demoted: `Mise en place des Taupes Artisanes`,
      setup: `Joueur {{count}}, prenez la carte Nomade de l’Expédition de Lumière, les 8 guerriers Expédition et les 3 jetons Caverne dans la boite de jeu. Placez 1 jeton Caverne et 3 guerriers Expédition dans une clairière au choix. Placez les guerriers et jetons restants et la carte Nomade <i>(face promue « Expédition de Lumière » visible)</i> à côté du plateau.`,
      setup_demoted: `Joueur {{count}}, prenez la carte Nomade de l’Expédition de Lumière dans la boite de jeu. Placez-la à côté du plateau <i>(face rétrogradée « Taupes Artisanes » visible)</i>.`,
    },
    flamebearers: {
      name: `Porteurs de Flamme`,
      setupTitle: `Mise en place des Porteurs de Flamme`,
      setupTitle_demoted: `Mise en place des Rats Contrebandiers`,
      setup: `Joueur {{count}}, prenez la carte Nomade des Porteurs de Flamme et les 6 guerriers Porteurs dans la boite de jeu. Placez 2 guerriers Porteurs dans une ou plusieurs clairières au choix. Placez les guerriers restants et la carte Nomade <i>(face promue « Porteurs de Flamme » visible)</i> à côté du plateau.`,
      setup_demoted: `Joueur {{count}}, prenez la carte Nomade des Porteurs de Flamme dans la boite de jeu. Placez-la à côté du plateau <i>(face rétrogradée « Rats Contrebandiers » visible)</i>.`,
    },
    flotilla: {
      name: `Flottille de la Rivière`,
      setupTitle: `Mise en place de la Flottille de la Rivière`,
      setupTitle_demoted: `Mise en place des Loutres Plongeuses`,
      setup: `Joueur {{count}}, prenez la carte Nomade de la Flottille de la Rivière et le pion Flottille dans la boite de jeu. Placez le pion Flottille dans une clairière sur le bord du plateau et le long de la rivière. Placez la carte Nomade <i>(face promue « Flottille de la Rivière » visible)</i> à côté du plateau.`,
      setup_demoted: `Joueur {{count}}, prenez la carte Nomade de la Flottille de la Rivière dans la boite de jeu. Placez-la à côté du plateau <i>(face rétrogradée « Loutres Plongeuses » visible)</i>.`,
    },
    patrol: {
      name: `Gardes Forestiers`,
      setupTitle: `Mise en place des Gardes Forestiers`,
      setupTitle_demoted: `Mise en place des Infirmiers Félins`,
      setup: `Joueur {{count}}, prenez la carte Nomade des Gardes Forestiers et les 12 guerriers Gardes Forestiers dans la boite de jeu. Placez 1 guerrier Gardes Forestiers dans chaque clairière. Placez la carte Nomade <i>(face promue « Gardes Forestiers » visible)</i> à côté du plateau.`,
      setup_demoted: `Joueur {{count}}, prenez la carte Nomade des Gardes Forestiers dans la boite de jeu. Placez-la à côté du plateau <i>(face rétrogradée « Infirmiers Félins » visible)</i>.`,
    },
    prophets: {
      name: `Prophètes du Soleil`,
      setupTitle: `Mise en place des Prophètes du Soleil`,
      setupTitle_demoted: `Mise en place des Émissaires Lézards`,
      setup: `Joueur {{count}}, prenez la carte Nomade des Prophètes du Soleil et les 4 guerriers Prophètes dans la boite de jeu. Placez 1 guerrier Prophètes dans chaque clairière avec une ruine. Placez la carte Nomade <i>(face promue « Prophètes du Soleil » visible)</i> à côté du plateau.`,
      setup_demoted: `Joueur {{count}}, prenez la carte Nomade des Prophètes du Soleil dans la boite de jeu. Placez-la à côté du plateau <i>(face rétrogradée « Émissaires Lézards » visible)</i>.`,
    },
    protector: {
      name: `Protecteur Furieux`,
      setupTitle: `Mise en place du Protecteur Furieux`,
      setupTitle_demoted: `Mise en place du Protecteur Stoïque`,
      setup: `Joueur {{count}}, prenez la carte Nomade du Protecteur Furieux et le pion Protecteur dans la boite de jeu. Placez le pion Protecteur dans une clairière au choix. Placez la carte Nomade <i>(face promue « Protecteur Furieux » visible)</i> à côté du plateau.`,
      setup_demoted: `Joueur {{count}}, prenez la carte Nomade du Protecteur Furieux et le pion Protecteur dans la boite de jeu. Placez-les à côté du plateau <i>(avec la carte Nomade face rétrogradée « Protecteur Stoïque » visible)</i>.`,
    },
    spies: {
      name: `Espions Corvidés`,
      setupTitle: `Mise en place des Espions Corvidés`,
      setupTitle_demoted: `Mise en place des Corbeaux Sentinelles`,
      setup: `Joueur {{count}}, prenez la carte Nomade des Espions Corvidés et les 6 guerriers Espions dans la boite de jeu. Placez 2 guerriers Espions, un chacun dans 2 clairières différentes de la même couleur. Placez les guerriers restants et la carte Nomade <i>(face promue « Espions Corvidés » visible)</i> à côté du plateau.`,
      setup_demoted: `Joueur {{count}}, prenez la carte Nomade des Espions Corvidés dans la boite de jeu. Placez-la à côté du plateau <i>(face rétrogradée « Corbeaux Sentinelles » visible)</i>.`,
    },
    uprising: {
      name: `Révolte Printanière`,
      setupTitle: `Mise en place de la Révolte Printanière`,
      setupTitle_demoted: `Mise en place des Lapins Éclaireurs`,
      setup: `Joueur {{count}}, prenez la carte Nomade de la Révolte Printanière, les 4 guerriers Révolte et le dé de révolte dans la boite de jeu. Lancez le dé de révolte 2 fois, et placez un guerrier Révolte dans des clairières de la même couleur. Placez les guerriers restants, le dé et la carte Nomade <i>(face promue « Révolte Printanière » visible)</i> à côté du plateau.`,
      setup_demoted: `Joueur {{count}}, prenez la carte Nomade de la Révolte Printanière dans la boite de jeu. Placez-la à côté du plateau <i>(face rétrogradée « Lapins Éclaireurs » visible)</i>.`,
    },
    vaultkeepers: {
      name: `Gardiens du Coffre`,
      setupTitle: `Mise en place des Gardiens du Coffre`,
      setupTitle_demoted: `Mise en place des Blaireaux Gardes du corps`,
      setup: `Joueur {{count}}, prenez la carte Nomade des Gardiens du Coffre, les 6 guerriers Gardiens et les 6 bâtiments Coffre dans la boite de jeu. Placez 2 guerriers Gardiens et 1 bâtiment Coffre dans une clairière avec un emplacement de construction disponible. Placez les guerriers et les bâtiments restants et la carte Nomade <i>(face promue « Gardiens du Coffre » visible)</i> à côté du plateau.`,
      setup_demoted: `Joueur {{count}}, prenez la carte Nomade des Gardiens du Coffre dans la boite de jeu. Placez-la à côté du plateau <i>(face rétrogradée « Blaireaux Gardes du corps » visible).`,
    },
  },
  landmark: {
    city: {
      name: `Ville perdue`,
      setupTitle: `Mise en place de la Ville perdue`,
      setup: `Joueur {{count}}, placez le Monument Ville perdue dans une clairière le long de la rivière. La clairière ne peut pas être adjacente à un Monument, ni déjà en contenir un. Prenez la carte de Monument « Ville perdue » dans la boite de jeu et placez-la à côté du plateau, face effet visible.`,
      setup_lake: `Joueur {{count}}, placez le Monument Ville perdue dans une clairière côtière. La clairière ne peut pas être adjacente à un Monument, ni déjà en contenir un. Prenez la carte de Monument « Ville perdue » dans la boite de jeu et placez-la à côté du plateau, face effet visible.`,
    },
    ferry: {
      name: `Radeau`,
      setupTitle: `Mise en place du Radeau`,
      setup: `Joueur {{count}}, placez le Monument Radeau dans une clairière le long de la rivière. La clairière ne peut pas être adjacente à un Monument, ni déjà en contenir un. Si vous avez la carte de Monument « Le Radeau », sortez-la de la boite de jeu et placez-la à côté du plateau, face effet visible. Si vous n’avez pas la carte, le Radeau a la règle suivante pendant la partie :<p>« Une fois par tour, un joueur faisant un déplacement depuis la clairière du Radeau peut faire le déplacement vers un clairière adjacente le long de la rivière. Il déplace aussi le Radeau avec lui. <i>(Respectez les règles de déplacement habituelles.)</i> Après avoir fait le déplacement, ce joueur pioche 1 carte. »</p>`,
      setup_lake: `Joueur {{count}}, placez le Monument Radeau dans une clairière côtière. La clairière ne peut pas être adjacente à un Monument, ni déjà en contenir un. Si vous avez la carte de Monument « Le Radeau », sortez-la de la boite de jeu et placez-la à côté du plateau, face effet visible. Si vous n’avez pas la carte, le Radeau a la règle suivante pendant la partie :<p>« Une fois par tour, un joueur faisant un déplacement depuis la clairière du Radeau peut faire le déplacement vers une autre clairière côtière. Il déplace aussi le Radeau avec lui. <i>(Respectez les règles de déplacement habituelles.)</i> Après avoir fait le déplacement, ce joueur pioche 1 carte. »</p>`,
    },
    forge: {
      name: `Forge légendaire`,
      setupTitle: `Mise en place de la Forge légendaire`,
      setup: `Joueur {{count}}, placez le Monument Forge légendaire dans une clairière. La clairière ne peut pas être adjacente à un Monument, ni déjà en contenir un. Prenez la carte de Monument « Forge légendaire » dans la boite de jeu et placez-la à côté du plateau, face effet visible.<br/>Retirez les objets ci-dessous de la réserve d’objets du plateau, selon la couleur de clairière de la Forge légendaire, et placez-les sur la carte « Forge légendaire » :<p><Fox/> : <Sword/> <Sword/> <Crossbow/> <Hammer/></p><p><Mouse/> : <Bag/> <Bag/> <Tea/> <Tea/></p><p><Rabbit/> : <Boot/> <Boot/> <Coin/> <Coin/></p>`,
    },
    market: {
      name: `Marché noir`,
      setupTitle: `Mise en place du Marché noir`,
      setup: `Joueur {{count}}, placez le Monument Marché noir dans une clairière qui possède exactement 1 emplacement de construction, et aucune ruine. La clairière ne peut pas être adjacente à un Monument, ni déjà en contenir un. Prenez la carte de Monument « Marché noir » dans la boite de jeu et placez-la à côté du plateau, face effet visible.<br/>Piochez 3 cartes sans les regarder. Placez-les face cachée à côté de la carte « Marché noir ».`,
    },
    tower: {
      name: `Tour`,
      setupTitle: `Mise en place de la Tour`,
      setup: `Joueur {{count}}, placez le Monument Tour dans une clairière où se trouve une ruine. Il ne peut y avoir d’autre Monument dans cette clairière. Si vous avez la carte de Monument « La Tour », sortez-la de la boite de jeu et placez-la à côté du plateau, face effet visible. Si vous n’avez pas la carte, la Tour a la règle suivante pendant la partie :<p>« À la fin du Crépuscule d’un joueur, si celui-ci contrôle la clairière de la Tour, il marque 1 point de victoire. »</p>`,
    },
    treetop: {
      name: `Cime du vieil arbre`,
      setupTitle: `Mise en place de la Cime du vieil arbre`,
      setup: `Joueur {{count}}, placez le Monument Cime du vieil arbre dans une clairière dans un coin du plateau. La clairière ne peut pas être adjacente à un Monument, ni déjà en contenir un. Prenez la carte de Monument « Cime du vieil arbre » dans la boite de jeu et placez-la à côté du plateau, face effet visible.`,
    },
  },
  map: {
    autumn: {
      name: `Automne`,
      setupTitle: `Mise en place du plateau Automne`,
      setup: `<li>Prenez le plateau Automne/Hiver dans la boite de jeu et placez-le avec la face Automne visible.</li>`,
      fixedSuits: `Sur le plateau Automne, utiliser les couleurs de clairière imprimées`,
    },
    lake: {
      name: `Lac`,
      setupTitle: `Mise en place du plateau Lac`,
      setup: `<li>Prenez le plateau Lac/Montagne dans la boite de jeu et placez-le avec la face Lac visible.</li>`,
      fixedSuits: `Sur le plateau Lac, utiliser les couleurs de clairière suggérées`,
      useLandmark: `Sur le plateau Lac, utiliser la mise en place du Radeau spécifique à ce plateau`,
      landmarkSetup: `<li>Placez le Radeau comme indiqué dans le schéma ci-dessous. Si vous avez la carte de Monument « Le Radeau », sortez-la de la boite de jeu et placez-la à côté du plateau, face effet visible.</li>`,
    },
    mountain: {
      name: `Montagne`,
      setupTitle: `Mise en place du plateau Montagne`,
      setup: `<li>Prenez le plateau Lac/Montagne dans la boite de jeu et placez-le avec la face Montagne visible.</li><li>Placez les 6 marqueurs de chemin fermé sur les 6 chemins plus foncés creusés dans la terre.</li>`, // Loi de Root v2023.08.03@C.3.1
      fixedSuits: `Sur le plateau Montagne, utiliser les couleurs de clairière suggérées`,
      useLandmark: `Sur le plateau Montagne, utiliser la mise en place de la Tour spécifique à ce plateau`,
      landmarkSetup: `<li>Placez la Tour comme indiqué dans le schéma ci-dessous. Si vous avez la carte de Monument « La Tour », sortez-la de la boite de jeu et placez-la à côté du plateau, face effet visible.</li>`,
    },
    winter: {
      name: `Hiver`,
      setupTitle: `Mise en place du plateau Hiver`,
      setup: `<li>Prenez le plateau Automne/Hiver dans la boite de jeu et placez-le avec la face Hiver visible.</li>`,
    },
  },
  vagabond: {
    adventurer: {
      // Loi de Root v2023.08.03@D.7
      name: `Aventurier`,
      action: `Improvisation`,
      effect: `Une fois par tour, lorsque vous effectuez l’action Quête, vous pouvez considérer un objet non épuisé comme s’il s’agissait de n’importe quel autre objet. Lorsque vous épuisez cet objet pour accomplir la quête, endommagez-le aussi.`,
    },
    arbiter: {
      // Loi de Root v2023.08.03@D.5
      name: `Médiateur`,
      action: `Protection`,
      effect: `Avant de lancer les dés pour un combat, le défenseur peut enrôler le Médiateur dans la clairière du combat. Le Médiateur marque 1 point de victoire et ajoute toutes ses <Sword/> intactes au maximum de pertes infligées par le défenseur. Le Médiateur ne peut pas s’enrôler lui-même.`,
    },
    harrier: {
      // Loi de Root v2023.08.03@D.9
      name: `Chasseur`,
      action: `Vol plané`,
      effect: `Épuisez une <Torch/> pour déplacer votre pion Vagabond <i>(pas d’autres pièces)</i> dans n’importe quelle clairière <i>(même Hostile)</i> du plateau sans épuiser de <Boot/>.`,
    },
    ranger: {
      // Loi de Root v2023.08.03@D.3
      name: `Rôdeur`,
      action: `Refuge`,
      effect: `Épuisez une <Torch/> pour réparer 3 objets. Mettez ensuite immédiatement fin au Jour et passez au Crépuscule.`,
    },
    ronin: {
      // Loi de Root v2023.08.03@D.8
      name: `Ronin`,
      action: `Frappe rapide`,
      effect: `Vous pouvez épuiser une <Sword/> pour infliger 1 perte additionnelle au combat <i>(après avoir lancé les dés)</i>.`,
    },
    scoundrel: {
      // Loi de Root v2023.08.03@D.6
      name: `Brigand`,
      action: `Terre brûlée`,
      effect: `Épuisez une <Torch/> et placez-la dans votre clairière. Retirez toutes les pièces adverses de cette clairière. Pour le reste de la partie, il n’est plus possible de placer de pièces dans cette clairière ni d’en déplacer vers celle-ci. <i>(Vous restez dans cette clairière. Une fois que vous en sortez, vous ne pouvez plus y entrer.)</i>`,
    },
    thief: {
      // Loi de Root v2023.08.03@D.1
      name: `Voleur`,
      action: `Larcin`,
      effect: `Épuisez une <Torch/> pour prendre une carte au hasard dans la main d’un joueur de votre clairière.`,
    },
    tinker: {
      // Loi de Root v2023.08.03@D.2
      name: `Bricoleur`,
      action: `Travailleur`,
      effect: `Épuisez une <Torch/> pour prendre une carte de la défausse de la même couleur que votre clairière. <i>(Vous pouvez toujours prendre une carte Oiseau.)</i>`,
    },
    vagrant: {
      // Loi de Root v2023.08.03@D.4
      name: `Miséreux`,
      action: `Provocation`,
      effect: `Épuisez une <Torch/> pour initier un combat dans votre clairière. Vous choisissez l’attaquant et le défenseur, ainsi que l’ordre dans lequel chacun retire des bâtiments et des jetons. Vous retirez également les pièces. <i>(Marquez 1 point de victoire par bâtiment ou jeton de chaque joueur retiré, ainsi que par pièce hostile des joueurs retirée.)</i>`,
    },
  },
}
