/* eslint-disable import/no-anonymous-default-export */
export default {
  label: {
    aggression: "Aggression",
    changeLanguage: "Change Language",
    closeMessage: "Close Message",
    complexity: "Complexity",
    crafting: "Crafting Ability",
    factionRating: ["LOW", "MODERATE", "HIGH"],
    fixedFirstPlayer: {
      false:
        "Randomise first player <i>(Player 1 is the person operating this app, Player 2 is the person sitting clockwise from them, etc.)</i>",
      true: "Fix first player <i>(Player 1 is the first player in turn order, Player 2 is the second, etc.)</i>",
    },
    fox: "Fox",
    includeBotStep: "Include bot set up",
    includeHirelings: "Include Hirelings",
    landmarkCount: "Landmark Count",
    logoAlt: "ROOT",
    logoText: "Automated Setup",
    militant: "Militant",
    mouse: "Mouse",
    nextStep: "Next Step",
    pageTitle: "Root Automated Setup",
    playerCount: "Player Count",
    rabbit: "Rabbit",
    redo: "Redo",
    restartSetup: "Restart Setup",
    selectVagabonds:
      "Select which vagabond characters you would like to include in the faction draft.",
    specialAction: "Special Action",
    startingItems: "Starting Items",
    undo: "Undo",
    useMapLandmark:
      "Use the included Landmark for the selected Map <i>(overriding the landmark's default set up with the map-specific version)</i>",
    wealth: "Card Wealth",
  },
  component: {
    buildings: "{{count}} Buildings",
    bag: "Bag",
    boot: "Boot",
    coin: "Coin",
    crossbow: "Crossbow",
    hammer: "Hammer",
    sword: "Sword",
    tea: "Tea",
    tokens: "{{count}} Tokens",
    torch: "Torch",
    warriors_one: "1 Pawn",
    warriors_other: "{{count}} Warriors",
  },
  error: {
    baseExpansionRequired: "A base copy of Root is required for set up",
    factionHirelingExcluded: "The Faction associated with this Hireling is required for set up",
    hirelingSelected: "An equivalent Hireling for this faction is already in play",
    landmarkNotEnoughPlayers: "Not enough players to play with this landmark",
    lockedFaction: "Cannot select last faction until a Militant faction has been selected",
    mapLandmarkUsed: "Landmark already included in map set up",
    noDeck: "No Decks selected! Please select at least one Deck",
    noFaction: "No Faction selected! Please select a faction to play",
    noLandmark:
      "No Landmarks selected! Please select at least one Landmark, or set the Landmark count to zero",
    noMap: "No Maps selected! Please select at least one Map",
    noMilitantFaction: "No Militant Factions selected! Please select at least one Militant Faction",
    tooFewFaction:
      "Not enough Factions selected! Please select more Factions, or lower the player count",
    tooFewHireling:
      "Not enough Hirelings to perform Hireling set up! This could be because the current Hireling selection requires removing too many factions from the draft",
    tooFewLandmark:
      "Not enough Landmarks selected! Please select more Landmarks, or lower the Landmark count",
    tooFewPlayerInsurgent:
      "Cannot use non-militant factions with less than 3 players and no bots or hirelings",
    tooFewVagabond:
      "Not enough Vagabond characters selected! Please include more Vagabond characters, or exclude some Vagabond Factions",
  },
  setupStep: {
    chooseExpansions: {
      body: "Welcome to the Root Automated Setup. This page will guide you through the advanced set up rules for the popular board game Root, with minimal shuffling and no set up cards required! To get started, select which Root content you are playing with. When you are ready to move on to the next step, use the buttons at the bottom of the page to do so.",
    },
    seatPlayers: {
      title: "Seat Players",
      body: "Determine the player seating order, then select how many players you are playing with, and if you wish for the app to choose a random starting player.",
    },
    chooseMap: {
      title: "Choose and Set up Map",
      body: "As a group, decide which map you would like to play on. If you select multiple maps, a random map will be chosen from the selected.",
    },
    chooseDeck: {
      title: "Choose and Set up Deck",
      body: "As a group, decide which deck you would like to use. If you select multiple decks, a random deck will be chosen from the selected.",
    },
    setUpDeck: {
      title: "Set up Deck",
    },
    setUpBots: {
      title: "Set up Bots",
      body: "As a group, decide which bots you would like to play with, following their set up instructions as described in the Law of Rootbotics.",
    },
    chooseLandmarks: {
      title: "Set up Landmarks",
      body: "As a group, decide how many landmarks you want to play with, and which ones to include in the selection pool.",
      body_mapLandmark:
        "As a group, decide how many landmarks you want to play with <i>(in addition to the already included map landmark)</i>, and which ones to include in the selection pool.",
    },
    chooseHirelings: {
      title: "Set up Hirelings",
      body: "As a group, decide if you want to play with hirelings, and which ones to include in the selection pool.",
    },
    postHirelingSetup: {
      subtitle: "Place Hireling Markers",
      body: 'Place the three hireling markers - marked "4," "8," and "12" - on the "4," "8," and "12" spaces of the score track on the map.',
    },
    drawCards: {
      title: "Draw Five Cards",
      body: "Each player draw five cards from the shared deck. <i>(You will choose three cards to keep later.)</i>",
    },
    chooseFactions: {
      title: "Set up Factions",
      body: "As a group, select which factions you would like to include in the faction draft.",
    },
    selectFaction: {
      subtitle: "Choose Faction",
      body: 'Player {{count}}, choose which faction you would like to play from the faction pool below. You may freely select factions from the list to see their stats, before confirming your selection by pressing "Next Step."',
    },
    placeScoreMarkers: {
      title: "Place Score Markers",
      title_vagabondSetUp: "Place Score and Relationship Markers",
      body: 'Each player place their chosen faction\'s score marker on the "0" space of the score track.',
      body_vagabondSetUp:
        'Each player place their chosen faction\'s score marker on the "0" space of the score track. Each Vagabond player place a relationship marker for every non-Vagabond faction in play on the Indifferent space of Relationships.',
    },
    chooseHand: {
      title: "Choose Starting Hands",
      body: "Each player chooses three cards in their hand to keep and puts the other two cards face down on the shared deck. When finished, shuffle the shared deck.",
    },
    setupEnd: {
      title: "Begin Play",
      body: 'The set up is now complete. Play will begin with Player {{count}}. If you wish to restart the setup process, use the button below.<p><i>"Root Automated Setup" Developed By Ewen Cameron</i><br/><i>Based on the board game "Root" published by Leder Games</i><br/><i>Application Licensed under CC BY-NC-SA 4.0</i></p>',
    },
  },
  deck: {
    exiles: {
      name: "Exiles and Partisans",
      setupTitle: "Set up the Exiles and Partisans Deck",
      setup:
        "Grab the Exiles and Partisans deck from the game box and place it next to the map. Shuffle the deck.",
      setup_twoPlayer:
        "Grab the Exiles and Partisans deck from the game box and place it next to the map. Remove all four dominance cards from the deck. Shuffle the deck.",
    },
    standard: {
      name: "Standard",
      setupTitle: "Set up the Standard Deck",
      setup:
        "Grab the Standard deck from the game box and place it next to the map. Shuffle the deck.",
      setup_twoPlayer:
        "Grab the Standard deck from the game box and place it next to the map. Remove all four dominance cards from the deck. Shuffle the deck.",
    },
  },
  expansion: {
    exilesDeck: "Exiles and Partisans Deck",
    landmarkPack: "Landmarks Pack",
    marauder: "Marauder Expansion",
    marauderHirelings: "Marauder Hireling Pack",
    riverfolk: "Riverfolk Expansion",
    riverfolkHirelings: "Riverfolk Hireling Pack",
    root: "Root",
    underworld: "Underworld Expansion",
    underworldHirelings: "Underworld Hireling Pack",
    vagabondPack: "Vagabond Pack",
  },
  faction: {
    alliance: {
      name: "Woodland Alliance",
      summaryTitle: "Playing the Alliance",
      summary:
        "<p>As the Woodland Alliance, you work to gain more sympathy of the oppressed forest creatures. Each time you place a <b>sympathy token</b> on the map, you score points. The more sympathy tokens on the map, the more points you score.</p><p>To gain sympathy, though, you will need <b>supporters</b> - cards placed on your faction board - matching the clearings where you want sympathy. While you can add your own cards to your supporters, you can goad your enemies into doing the same by provoking <b>Outrage</b>: whenever another faction removes sympathy or moves warriors into a sympathetic clearing, they must add one of their own cards to your supporters.</p><p>Don't be afriad to set up chokepoints, as you are experts in <b>Guerrilla War</b>: when defending in battle, you use the higher die. Place your sympathy in clearings where conflict is likely, and force your opponent to face you!</p><p>Supporters can also be put toward violent <b>revolt</b>, which destorys <i>all</i> of your enemies' pieces in a clearing and places warriors and a new <b>base</b> there. Bases not only increase your card draw, but also let you train <b>officers</b>, which give you free actions each turn. Protect your bases well! If you lose a base, you'll lose many supporters and officers too.</p>",
      setupTitle: "Set up the Woodland Alliance",
      setup:
        "<i>1.</i> Draw 3 <b>cards</b> and add them face down to your Supporters stack.<br/><i>2.</i> Fill your Sympathy track with <b>sympathy tokens</b>.<br/><i>3.</i> Put your 3 <b>bases</b> on your matching Bases spaces.",
    },
    corvid: {
      name: "Corvid Conspiracy",
      summaryTitle: "Playing the Corvids",
      summary:
        "<p>As the Corvid Conspiracy, you want to show that you are the true power behind the scenes, controlling the tides of the Woodland war. each time you flip a <b>plot</b> token you've placed on the map, you score points. The more face-up plots on the map when you do, the more points you score.</p><p>To place and flip plots, you must recruit and position your warriors wisely. Your faction is among the best at recruiting warriors to your cause, but they'll be spread thin, as you'll be hard pressed to move too often. Even more, you can't afford to battle too much, as placing a plot requires you to remove one or more Corvid warriors, and you cannot flip a plot unless its clearing has a Corvid warrior.</p><p>Thankfully, your warriors are exceedingly <b>Nimble</b>, letting them move regardless of rule. Additionally, your <b>Embedded Agents</b> make your plots dangerous to quash with brute force - when defending in battle with a facedown plot token, you deal an extra hit.</p><p>However, take care in leaving your plots open to <b>Exposure</b>. Any enemy faction in a clearing with a facedown plot can show you a matching card to guess which plot it is. If they're right, they've infiltrated you and foiled your plot! They remove the plot and ignore its effect. If they're wrong, though, you catch their spy red-handed. Your plot remains, and they give you the card they showed you. Bluff well.</p>",
      setupTitle: "Set up the Corvid Conspiracy",
      setup:
        "<i>1.</i> Choose a homeland clearing. Put 1 <b>warrior</b> and 1 <b>plot token</b> of your choice face down there.<br/><i>2.</i> Put 1 <b>warrior</b> in a clearing of each suit. <i>(Counting the previous step, place 4 warriors in total.)</i>",
    },
    cult: {
      name: "Lizard Cult",
      summaryTitle: "Playing the Lizard Cult",
      summary:
        "<p>As the Lizard Cult, you cater to those creatures who have been discarded by the other factions. You score victory points by performing the proper <b>rituals</b>, revealing cards from your hand matching clearings where you have <b>gardens</b>, and discarding cards to complete the rite. The more gardens you have in clearings matching the revealed card, the more points you score.</p><p>Your gentler apporach means you cannot battle your foes at first; to do so, you must radicalize your followers into <b>acolytes</b>. By doing so, you can perform <b>conspiracies</b> in clearings of the <b>Outcast</b>, the suit discarded the most over the prior round.</p><p>Your <b>Hatred of Birds</b> means your bird cards are not wild in your rituals. Your gardens spread the news of your dragon lord, drawing throngs of <b>Pilgrims</b>, so you rule a clearing if you have even a single garden there. Finally, your acolytes always get <b>Revenge</b> on the wicked: whenever one of your warriors is removed while defending, you gain another acolyte.</p>",
      setupTitle: "Set up the Lizard Cult",
      setup:
        "<i>1.</i> Choose a homeland clearing that is not adjacent to enemy homelands.<br/><i>2.</i> Put 4 <b>warriors</b> and 1 matching <b>garden</b> in your homeland. Put 3 <b>warriors</b> in clearings adjacent to it as evenly as possible.<br/><i>3.</i> Put 2 <b>warriors</b> in your Acolytes box.<br/><i>4.</i> Fill your Gardens tracks with <b>gardens</b>, except the leftmost space of the garden on the map.<br/><i>5.</i> Put your <b>outcast marker</b> on its Outcast side on any space of the Outcast box.",
    },
    duchy: {
      name: "Underground Duchy",
      summaryTitle: "Playing the Duchy",
      summary:
        "<p>As the Underground Duchy, you want to show the foreign creatures of the Woodland that they would be better off as subjects. Each time you sway one of your <b>ministers</b> to the cause of pacifying and unifying the land above, you score points. The higher the rank of the minister you sway, the more points you score.</p><p>To sway a minister you must reveal cards, representing your support among Woodland separatists. The higher the minister's rank, the more cards you must reveal. However, you can only reveal cards that match clearings with any number of Duchy peices, showing your foothold in the swirling chaos. Each swayed minister gives you an extra action every turn. Some ministers even let you score victory points by touting your investments in the Woodland.</p><p>Your moles are well protected in <b>the Burrow</b>, a clearing only you can enter and which you always rule. From the Burrow, you can move to any <b>tunnel</b> you dig throughout the Woodland. Once you've pacified clearings and established rule, you can build <b>citadels</b> and <b>markets</b> to draw more creatures to your cause. However, whenever you lose buildings, you must pay the <b>Price of Failure</b> by losing sway with a minister of highest rank and discarding a random card.</p>",
      setupTitle: "Set up the Underground Duchy",
      setup:
        "<i>1.</i> Choose a homeland clearing that is not adjacent to enemy homelands.<br/><i>2.</i> Put 2 <b>warriors</b> and 1 <b>tunnel</b> in your homeland. Put 5 <b>warriors</b> among clearings adjacent to it as evenly as possible.<br/><i>3.</i> Put your <b>Burrow board</b> near the map. Fill your Buildings tracks with your <b>citadels</b> and <b>markets</b>. Put your 9 <b>minister cards</b> on your Unswayed Ministers pile. Put your 9 <b>crowns</b> on the square spaces showing victory points.",
    },
    eyrie: {
      name: "Eyrie Dynasties",
      summaryTitle: "Playing the Eyrie",
      summary:
        "<p>As the Eyrie Dynasties, you wish to restore your once-dignified kind to your former glory by retaking control of the Woodland. Each turn, you score points for your <b>roosts</b> on the map. The more roosts, the more points you score.</p><p>However, you are bound by the <b>Decree</b>, a mandate from the Eyrie <b>leader</b>. Each turn, you must add cards to the Decree, and then take an action for each card in it. Each action must happen in the clearing matching its card, so plan wisely. At first this is simple, but as the Decree grows to 10 or 12 cards, you'll find yourself scrambling to complete every action. If you can't complete one, you'll fall into <b>turmoil</b>, losing you points, replacing your leader, and discarding the Decree.</p><p>Above all, remember: the ground creatures tremble and scatter upon your arrival. You are the <b>Lords of the Forest</b> - you rule a clearing even when tied for prescence. However, your people feel <b>Disdain for Trade</b>, so you'll often score fewer points for crafting items.</p>",
      setupTitle: "Set up the Eyrie Dynasties",
      setup:
        "<i>1.</i> Choose a homeland clearing on the map edge clearing that has 2+ clearings between it and enemy homelands.<br/><i>2.</i> Put 6 <b>warriors</b> and 1 <b>roost</b> in your homeland.<br/><i>3.</i> Put any <b>leader card</b> on your Leader Card slot. Keep the other 3 leaders face up nearby.<br/><i>4.</i> Tuck your 2 <b>Loyal Viziers</b> under the Decree column slots as listed on your current leader.<br/><i>5.</i> Fill your Roosts spaces with <b>roosts</b>, except the leftmost.",
    },
    keepers: {
      name: "Keepers in Iron",
      summaryTitle: "Playing the Keepers",
      summary:
        "<p>As the Keepers in Iron, you score points by recovering <b>relics</b> lost in past conflicts. You will need to <b>delve</b> relics out of the forests, move them to a <b>waystation</b> of the same type, and then <b>recover</b> them. Whether these relics belong to you or the Woodland, though, is another question.</p><p>As <b>Devout Knights</b> of an exiled order, you ignore the first hit you take in battle if you have both a warrior and a relic in it, whether attacking or defending. You can also move relics with your warriors.</p><p>Your relics are <b>Prized Trophies</b>, so keep them safe. Whenever an enemy removes a relic in any way, they score two points in-stead of one, and put it back in any forest.</p><p>Over time, you will grow your <b>Retinue</b>, three columns of cards that let you take actions. Delving and recovering relics will put your Retinue at risk, though, so you will need to plan ahead and take prudent risks in order to succeed.</p>",
      setupTitle: "Set up the Keepers in Iron",
      setup:
        "<i>1.</i> Shuffle all 12 <b>relic tokens</b> face down. Place one face down randomly in each forest.<br/><i>2.</i> Choose 2 adjacent homeland clearings on the map edge that have 2+ clearings between them and enemy homelands. Put 4 <b>warriors</b> in each homeland.<br/><i>3.</i> Put any remaining <b>relics</b>, as evenly as possible, among any forests that are not adjacent to your homelands.<br/><i>4.</i> Tuck a <b>Faithful Retainer</b> card into each of your Retinue column slots.",
    },
    marquise: {
      name: "Marquise de Cat",
      summaryTitle: "Playing the Marquise",
      summary:
        "<p>As the Marquise de Cat, you want to turn the Woodland into an industrial and military powerhouse. Each time you place a <b>building</b> on the map, you score points. The more of that building type there is on the map, the more points you score.</p><p>To fuel this construction, you must grow and protect an interconnected economy of <b>wood</b>. Building up infrastructure makes your turns more efficient and helps you draw more cards, so strike out to secure your right to expansion. Your military is legion, letting you enforce your rule with an iron fist, if necessary.</p><p>The seat of your power is the <b>Keep of Marquise de Cat</b>, a structure so imposing that no other faction can place pieces in its clearing. Even more, your <b>Field Hospitals</b> will help keep you in the fight. Whenever any of your warriors are removed, you can spend a card matching the warriors' clearing to place them back at your keep - as long as it stands. Protect it well!</p>",
      setupTitle: "Set up the Marquise de Cat",
      setup:
        "<i>1.</i> Choose 3 homeland clearings, each adjacent to one other.<br/><i>2.</i> Put 2 <b>warriors</b> in each of your homelands. Put 1 <b>warrior</b> in each other clearing.<br/><i>3.</i> Put the <b>keep token</b> in one of your homelands, not adjacent to an enemy homeland if able. Put 1 <b>sawmill</b>, <b>workshop</b>, and <b>recruiter</b> on the map, each in a different homeland of yours.<br/><i>4.</i> Fill your Buildings track with your <b>buildings</b>, except the leftmost spaces.",
    },
    riverfolk: {
      name: "Riverfolk Company",
      summaryTitle: "Playing the Riverfolk Company",
      summary:
        "<p>As the Riverfolk Company, you ply the rivers winding through the great Woodland, offering your services to any faction who can pay. You score victory points by establishing <b>trade posts</b> throughout the clearings.</p><p>Though the construction of trade posts is a viable way to score points, so too is the raw accumulation of wealth. Each Birdsong, you score points depending on how many <b>funds</b> you've saved up and earned over the last round. However, you'll also need to commit and spend your funds to expand and guard your trade network, strking a balance between dividends and growth.</p><p>You'll earn funds as other factions buy your <b>services</b>, whether the use of your riverboats or mercenary warriors, or even one of the cards in your public hand, which is all <b>For Sale</b>. You can set the prices of your services each turn, so try to predict which services the other factions will need.</p><p>Building trade posts helps you expand your clientele and sell more services, as a faction can buy more services from you as they expand into more clearings where you have trade posts. But be careful, when your trade posts are destroyed they cannot be rebuilt! While you may not rule many clearings, you can always move along river paths since you're a faction of <b>Swimmers</b>.</p>",
      setupTitle: "Set up the Riverfolk Company",
      setup:
        "<i>1.</i> Put 4 <b>warriors</b> among any clearings along the river.<br/><i>2.</i> Put 3 <b>warriors</b> in your Payments box.<br/><i>3.</i> Fill your Trade Posts tracks with matching <b>trade posts</b>.<br/><i>4.</i> Put your 3 <b>service markers</b> on your Services track, setting a price for each service.",
    },
    vagabond: {
      name: "Vagabond",
      summaryTitle: "Playing the Vagabond",
      summary:
        "<p>As the Vagabond, you will play all sides of the conflict, making friends and foes as it suits you. You score points through your <b>relationships</b>, as you aid friendly factions by giving them cards, and as you grow your infamy with hostile factions by removing their pieces in battle. You'll also score points as you go on <b>quests</b> to spread your good name amongst the creatures of the Woodland.</p><p>To move and act effectively, you'll need to manage your satchel of <b>items</b>, expanding your selection by exploring ancient <b>ruins</b> and providing aid to other factions. Being a <b>Lone Wanderer</b>, you cannot rule a clearing or stop another faction from ruling one, but you are <b>Nimble</b>, so you can move regardless of who rules your clearing.</p>",
      setupTitle: "Set up the Vagabond",
      setup:
        '<i>1.</i> Put your <b>pawn</b> in any forest.<br/><i>2.</i> Shuffle the quest deck. Draw 3 <b>quests</b> to deal out nearby.<br/><i>3.</i> Put the <Bag/>, <Boot/>, <Hammer/>, and <Sword/> <b>ruin items</b> <i>(marked with "R")</i> under the ruins randomly, unless this has already been done.<br/><i>4.</i> Put the "{{vagabond}}" <b>character card</b> in your Character Card slot. Put the <InitialStartingItems>, </InitialStartingItems>, and <FinalStartingItem/> <b>starting items</b> <i>(marked with "S")</i> in your Satchel and on their matching tracks, as needed.',
      setup_vagabondSetUp:
        '<i>1.</i> Put your <b>pawn</b> in any forest.<br/><i>2.</i> Shuffle the quest deck. Draw 3 <b>quests</b> to deal out nearby.<br/><i>3.</i> Put the additional <Bag/>, <Boot/>, <Hammer/>, and <Sword/> <b>ruin items</b> <i>(marked with "R")</i> under the ruins randomly <i>(with the existing items)</i>.<br/><i>4.</i> Put the "{{vagabond}}" <b>character card</b> in your Character Card slot. Put the <InitialStartingItems>, </InitialStartingItems>, and <FinalStartingItem/> <b>starting items</b> <i>(marked with "S")</i> in your Satchel and on their matching tracks, as needed.',
    },
    warlord: {
      name: "Lord of the Hundreds",
      summaryTitle: "Playing the Hundreds",
      summary:
        "<p>As the Lord of the Hundreds, you score points as you <b>oppress</b> your foes. At the end of your turn, the more clearings you rule that have <i>no</i> enemy pieces - no warriors, no buildings, nothing - the more points you score.</p><p>To grow in power and attract warriors, you must gain items and add them to your towering <b>Hoard</b>. Boots, bags, and coins increase your <b>Command</b>, while hammers, tea, swords, and the crossbow increase your <b>Prowess</b>. Your <b>Contempt for Trade</b> means you rarely score from crafting item, but you can steal items from enemies with your <b>Looters</b>!</p><p>Leading the Hundreds is your warlord, a warrior-demagogue whose fickle <b>mood</b> gives you an ability for the turn. Your warlord is obsessed with hoarding, so as you gain more items, you will have fewer moods to choose from.</p><p>Declaring yourself to be the true voice of the Woodland, you can incite <b>mobs</b>, which destroy enemy buildings and tokens, and raid ruins for their items.</p>",
      setupTitle: "Set up the Lord of the Hundreds",
      setup:
        '<i>1.</i> Choose a homeland clearing on the map edge that has 2+ clearings between it and enemy homelands.<br/><i>2.</i> Put your <b>warlord</b>, 4 <b>warriors</b>, and 1 <b>stronghold</b> in your homeland.<br/><i>3.</i> Pur your <b>Stubborn mood card</b> in your Mood Card slot.<br/><i>4.</i> Put the <Bag/>, <Boot/>, <Hammer/>, and <Sword/> <b>ruin items</b> <i>(marked with "R")</i> under the ruins randomly, unless this has already been done.',
      setup_vagabondSetUp:
        "<i>1.</i> Choose a homeland clearing on the map edge that has 2+ clearings between it and enemy homelands.<br/><i>2.</i> Put your <b>warlord</b>, 4 <b>warriors</b>, and 1 <b>stronghold</b> in your homeland.<br/><i>3.</i> Pur your <b>Stubborn mood card</b> in your Mood Card slot.",
    },
  },
  hireling: {
    band: {
      name: "Popular Band",
      setupTitle: "Set up the Popular Band",
      setupTitle_demoted: "Set up the Street Band",
      setup:
        "Player {{count}}, grab the hireling card and 5 warriors for the Popular Band from the game box. Place 2 Band warriors, each in a different clearing. Place the remaining warriors and card next to the map <i>(non-demoted side up)</i>.",
      setup_demoted:
        'Player {{count}}, grab the hireling card and 5 warriors for the Popular Band from the game box. Place them next to the map <i>(with the card\'s demoted "Street Band" side up)</i>.',
    },
    bandits: {
      name: "Highway Bandits",
      setupTitle: "Set up the Highway Bandits",
      setupTitle_demoted: "Set up the Bandit Gangs",
      setup:
        "Player {{count}}, grab the hireling card and 4 warriors for the Highway Bandits from the game box. Place 2 bandits, one each on a path without one. Place the remaining bandits and card next to the map <i>(non-demoted side up)</i>.",
      setup_demoted:
        'Player {{count}}, grab the hireling card and 4 warriors for the Highway Bandits from the game box. Place them next to the map <i>(with the card\'s demoted "Bandit Gangs" side up)</i>.',
    },
    dynasty: {
      name: "Last Dynasty",
      setupTitle: "Set up the Last Dynasty",
      setupTitle_demoted: "Set up the Bluebird Nobles",
      setup:
        "Player {{count}}, grab the hireling card and 5 warriors for the Last Dynasty from the game box. Place all 5 Dynasty warriors in a clearing on the map edge. Place the card next to the map <i>(non-demoted side up)</i>.",
      setup_demoted:
        'Player {{count}}, grab the Last Dynasty hireling card from the game box. Place it next to the map with it\'s demoted "Bluebird Nobles" side up.',
    },
    exile: {
      name: "The Exile",
      setupTitle: "Set up the Exile",
      setupTitle_demoted: "Set up the Brigand",
      setup:
        "Player {{count}}, grab the hireling card, pawn, and 3 club items for the Exile from the game box. Place the Exile pawn in any forest. Place the card next to the map <i>(non-demoted side up)</i> and the 3 Club items on top of it <i>(unexhaused side up)</i>.",
      setup_demoted:
        'Player {{count}}, grab the Exile hireling card from the game box. Place it next to the map with it\'s demoted "The Bandit" side up. Put the <Bag/>, <Boot/>, <Hammer/>, and <Sword/> <b>ruin items</b> <i>(marked with "R")</i> under the ruins randomly as if the Vagabond were in play.',
    },
    expedition: {
      name: "Sunward Expedition",
      setupTitle: "Set up the Sunward Expedition",
      setupTitle_demoted: "Set up the Mole Artisans",
      setup:
        "Player {{count}}, grab the hireling card, 8 warriors, and 3 foothold tokens for the Sunward Expedition from the game box. Place a foothold token and 3 Expedition warriors in any clearing. Place the remaining warriors, tokens, and card next to the map <i>(non-demoted side up)</i>.",
      setup_demoted:
        'Player {{count}}, grab the Sunward Expedition hireling card from the game box. Place it next to the map with it\'s demoted "Mole Artisans" side up.',
    },
    flamebearers: {
      name: "Flame Bearers",
      setupTitle: "Set up the Flame Bearers",
      setupTitle_demoted: "Set up the Rat Smugglers",
      setup:
        "Player {{count}}, grab the hireling card and 6 warriors for the Flame Bearers from the game box. Place 2 Bearer warriors among any clearings (even the same). Place the remaining warriors and card next to the map <i>(non-demoted side up)</i>.",
      setup_demoted:
        'Player {{count}}, grab the Flame Bearers hireling card from the game box. Place it next to the map with it\'s demoted "Rat Smugglers" side up.',
    },
    flotilla: {
      name: "Riverfolk Flotilla",
      setupTitle: "Set up the Riverfolk Flotilla",
      setupTitle_demoted: "Set up the Otter Divers",
      setup:
        "Player {{count}}, grab the hireling card and pawn for the Riverfolk Flotilla from the game box. Place the Flotilla pawn in a clearing on the map edge and river. Place the card next to the map <i>(non-demoted side up)</i>.",
      setup_demoted:
        'Player {{count}}, grab the Riverfolk Flotilla hireling card from the game box. Place it next to the map with it\'s demoted "Otter Divers" side up.',
    },
    patrol: {
      name: "Forest Patrol",
      setupTitle: "Set up the Forest Patrol",
      setupTitle_demoted: "Set up the Feline Physicians",
      setup:
        "Player {{count}}, grab the hireling card and 12 warriors for the Forest Patrol from the game box. Place a Patrol warrior in each clearing. Place the card next to the map <i>(non-demoted side up)</i>.",
      setup_demoted:
        'Player {{count}}, grab the Forest Patrol hireling card from the game box. Place it next to the map with it\'s demoted "Feline Physicians" side up.',
    },
    prophets: {
      name: "Warm Sun Prophets",
      setupTitle: "Set up the Warm Sun Prophets",
      setupTitle_demoted: "Set up the Lizard Envoys",
      setup:
        "Player {{count}}, grab the hireling card and 4 warriors for the Warm Sun Prophets from the game box. Place a Prophet warrior in each clearing with a ruin. Place the card next to the map <i>(non-demoted side up)</i>.",
      setup_demoted:
        'Player {{count}}, grab the Warm Sun Prophets hireling card from the game box. Place it next to the map with it\'s demoted "Lizard Envoys" side up.',
    },
    protector: {
      name: "Furious Protector",
      setupTitle: "Set up the Furious Protector",
      setupTitle_demoted: "Set up the Stoic Protector",
      setup:
        "Player {{count}}, grab the hireling card and pawn for the Furious Protector from the game box. Place the Protector pawn in any clearing. Place the card next to the map <i>(non-demoted side up)</i>.",
      setup_demoted:
        'Player {{count}}, grab the hireling card and pawn for the Furious Protector from the game box. Place them next to the map <i>(with the card\'s demoted "Stoic Protector" side up)</i>.',
    },
    spies: {
      name: "Corvid Spies",
      setupTitle: "Set up the Corvid Spies",
      setupTitle_demoted: "Set up the Raven Sentinels",
      setup:
        "Player {{count}}, grab the hireling card and 6 warriors for the Corvid Spies from the game box. Place 2 Spy warriors, one each in two clearings of matching suit. Place the remaining warriors and card next to the map <i>(non-demoted side up)</i>.",
      setup_demoted:
        'Player {{count}}, grab the Corvid Spies hireling card from the game box. Place it next to the map with it\'s demoted "Raven Sentinels" side up.',
    },
    uprising: {
      name: "Spring Uprising",
      setupTitle: "Set up the Spring Uprising",
      setupTitle_demoted: "Set up the Rabbit Scouts",
      setup:
        "Player {{count}}, grab the hireling card, 4 warriors, and uprising die for the Spring Uprising from the game box. Roll the uprising die twice and place an Uprising warrior in matching clearings. Place the remaining warriors, die, and card next to the map <i>(non-demoted side up)</i>.",
      setup_demoted:
        'Player {{count}}, grab the Spring Uprising hireling card from the game box. Place it next to the map with it\'s demoted "Rabbit Scouts" side up.',
    },
    vaultkeepers: {
      name: "Vault Keepers",
      setupTitle: "Set up the Vault Keepers",
      setupTitle_demoted: "Set up the Badger Bodyguards",
      setup:
        "Player {{count}}, grab the hireling card, 6 warriors, and 6 vault buildings for the Vault Keepers from the game box. Place 2 Keeper warriors and a vault building in any clearing with an open building slot. Place the remaining warriors, buildings, and card next to the map <i>(non-demoted side up)</i>.",
      setup_demoted:
        'Player {{count}}, grab the Vault Keepers hireling card from the game box. Place it next to the map with it\'s demoted "Badger Bodyguards" side up.',
    },
  },
  landmark: {
    city: {
      name: "Lost City",
      setupTitle: "Set up the Lost City",
      setup:
        'Player {{count}}, place the Lost City landmark in a clearing on the river. It cannot have a landmark or be adjacent to one. Grab the "Lost City" landmark card from the game box and place it next to the board on it\'s non-setup side.',
      setup_lake:
        'Player {{count}}, place the Lost City landmark in a coastal clearing. It cannot have a landmark or be adjacent to one. Grab the "Lost City" landmark card from the game box and place it next to the board on it\'s non-setup side.',
    },
    ferry: {
      name: "Ferry",
      setupTitle: "Set up the Ferry",
      setup:
        'Player {{count}}, place the Ferry landmark in a clearing on the river. It cannot have a landmark or be adjacent to one. If you have "The Ferry" landmark card, take it from the game box and place it next to the board on it\'s non-setup side. If you do not have the card, the Ferry has the following rule during play:<p>"Once per turn, a player taking a move from the Ferry\'s clearing can move to an adjacent clearing along the river, moving the Ferry as well. <i>(This follows normal movement rules.)</i> After taking this move, that player draws one card."</p>',
      setup_lake:
        'Player {{count}}, place the Ferry landmark in a coastal clearing. It cannot have a landmark or be adjacent to one. If you have "The Ferry" landmark card, take it from the game box and place it next to the board on it\'s non-setup side. If you do not have the card, the Ferry has the following rule during play:<p>"Once per turn, a player taking a move from the Ferry\'s clearing can move to another coastal clearing, moving the Ferry as well. <i>(This follows normal movement rules.)</i> After taking this move, that player draws one card."</p>',
    },
    forge: {
      name: "Legendary Forge",
      setupTitle: "Set up the Legendary Forge",
      setup:
        "Player {{count}}, place the Legendary Forge landmark in a clearing. It cannot have a landmark or be adjacent to one. Grab the \"Legendary Forge\" landmark card from the game box and place it next to the board on it's non-setup side.<br/>Based on the suit of the Legendary Forge's clearing, remove the following items from the item supply on the map, and place them on the Legendary Forge card:<p><Fox/>: <Sword/> <Sword/> <Crossbow/> <Hammer/></p><p><Mouse/>: <Bag/> <Bag/> <Tea/> <Tea/></p><p><Rabbit/>: <Boot/> <Boot/> <Coin/> <Coin/></p>",
    },
    market: {
      name: "Black Market",
      setupTitle: "Set up the Black Market",
      setup:
        'Player {{count}}, place the Black Market landmark in a clearing that has exactly one building slot and no ruin. It cannot have a landmark or be adjacent to one. Grab the "Black Market" landmark card from the game box and place it next to the board on it\'s non-setup side.<br/>Draw three cards but do not look at them. Place them face down next to the Black Market card.',
    },
    tower: {
      name: "Tower",
      setupTitle: "Set up the Tower",
      setup:
        'Player {{count}}, place the Tower landmark in a clearing that has a ruin. It cannot have a landmark. If you have "The Tower" landmark card, take it from the game box and place it next to the board on it\'s non-setup side. If you do not have the card, the Tower has the following rule during play:<p>"At the end of a player\'s Evening, if they rule the Tower\'s clearing, they score one point."</p>',
    },
    treetop: {
      name: "Elder Treetop",
      setupTitle: "Set up the Elder Treetop",
      setup:
        'Player {{count}}, place the Elder Treetop in a corner clearing. It cannot have a landmark or be adjacent to one. Grab the "Elder Treetop" landmark card from the game box and place it next to the board on it\'s non-setup side.',
    },
  },
  map: {
    autumn: {
      name: "Autumn",
      setupTitle: "Set up the Autumn Map",
      setup:
        '<i>1.</i> Grab the Autumn/Winter map board from the game box and place it down with the Autumn side facing up.<br/><i>2.</i> Collect the 12 suit markers, flip them face down, and shuffle them, then place one on each clearing, covering the printed suit symbols.<br/><i>3.</i> Place a ruin in each slot on the map marked with an "R" <i>(four in total)</i>.<br/><i>4.</i> Place these items on the matching spaces of the item supply near the top of the map: 2 <Boot/>, 2 <Bag/>, 1 <Crossbow/>, 1 <Hammer/>, 2 <Sword/>, 2 <Tea/>, 2 <Coin/>.<br/><i>5.</i> Place the two dice near the map.',
    },
    lake: {
      name: "Lake",
      setupTitle: "Set up the Lake Map",
      setup:
        '<i>1.</i> Grab the Lake/Mountain map board from the game box and place it down with the Lake side facing up.<br/><i>2.</i> Collect the 12 suit markers, flip them face down, and shuffle them, then place one on each clearing.<br/><i>3.</i> Place a ruin in each slot on the map marked with an "R" <i>(four in total)</i>.<br/><i>4.</i> Place these items on the matching spaces of the item supply near the top of the map: 2 <Boot/>, 2 <Bag/>, 1 <Crossbow/>, 1 <Hammer/>, 2 <Sword/>, 2 <Tea/>, 2 <Coin/>.<br/><i>5.</i> Place the two dice near the map.',
      landmarkSetup:
        'Place the Ferry piece in the corner clearing that is also a coastal clearing. If you have "The Ferry" landmark card, take it from the game box and place it next to the board on it\'s non-setup side.',
    },
    mountain: {
      name: "Mountain",
      setupTitle: "Set up the Mountain Map",
      setup:
        '<i>1.</i> Grab the Lake/Mountain map board from the game box and place it down with the Mountain side facing up.<br/><i>2.</i> Place the 6 closed path markers to cover the 6 paths of darker colour with excavated ground.<br/><i>3.</i> Collect the 12 suit markers, flip them face down, and shuffle them, then place one on each clearing.<br/><i>4.</i> Place a ruin in each slot on the map marked with an "R" <i>(four in total)</i>.<br/><i>5.</i> Place these items on the matching spaces of the item supply near the top of the map: 2 <Boot/>, 2 <Bag/>, 1 <Crossbow/>, 1 <Hammer/>, 2 <Sword/>, 2 <Tea/>, 2 <Coin/>.<br/><i>6.</i> Place the two dice near the map.',
      landmarkSetup:
        'Place the Tower piece in the central clearing showing two towers. If you have "The Tower" landmark card, take it from the game box and place it next to the board on it\'s non-setup side.',
    },
    winter: {
      name: "Winter",
      setupTitle: "Set up the Winter Map",
      setup:
        '<i>1.</i> Grab the Autumn/Winter map board from the game box and place it down with the Winter side facing up.<br/><i>2.</i> Collect the 12 suit markers, flip them face down, and shuffle them, then place one on each clearing.<br/><i>3.</i> Place a ruin in each slot on the map marked with an "R" <i>(four in total)</i>.<br/><i>4.</i> Place these items on the matching spaces of the item supply near the top of the map: 2 <Boot/>, 2 <Bag/>, 1 <Crossbow/>, 1 <Hammer/>, 2 <Sword/>, 2 <Tea/>, 2 <Coin/>.<br/><i>5.</i> Place the two dice near the map.',
    },
  },
  vagabond: {
    adventurer: {
      name: "Adventurer",
      action: "Improvise",
      effect:
        "Once per turn while taking the Quest action, you may treat one unexhausted item as any other item. When you exhaust it to complete the quest, also damage that item.",
    },
    arbiter: {
      name: "Arbiter",
      action: "Protector",
      effect:
        "Before dice are rolled in a battle, the defender may enlist the Arbiter in the clearing of battle. The Arbiter scores one victory point and adds all of his undamaged <Sword/> to the maximum rolled hits of the defender. The Arbiter cannot enlist himself or be enlisted against himself.",
    },
    harrier: {
      name: "Harrier",
      action: "Glide",
      effect:
        "Exhaust a <Torch/> to move only your Vagabond pawn <i>(not other pieces)</i> to any clearing <i>(even Hostile)</i> on the map without exhausting any <Boot/>.",
    },
    ranger: {
      name: "Ranger",
      action: "Hideout",
      effect:
        "Exhaust one <Torch/> to repair three items. Then, immediately end Daylight and begin Evening.",
    },
    ronin: {
      name: "Ronin",
      action: "Swift Strike",
      effect: "You may exhaust a <Sword/> to deal an extra hit in battle <i>(after rolling)</i>.",
    },
    scoundrel: {
      name: "Scoundrel",
      action: "Scorched Earth",
      effect:
        'Exhaust a <Torch/> and place it in your clearing. Remove all enemy pieces from that clearing. Pieces cannot be placed in or moved into the clearing with the <Torch/>. <i>(You remain in this clearing. Once you move out, you cannot move back in. The <Torch/> cannot be removed with a "Favor of the..." card because it is not an enemy piece.)</i>',
    },
    thief: {
      name: "Thief",
      action: "Steal",
      effect: "Exhaust one <Torch/> to take a random card from any player in your clearing.",
    },
    tinker: {
      name: "Tinker",
      action: "Day Labor",
      effect:
        "Exhaust one <Torch/> to take a card from the discard pile whose suit matches your clearing. <i>(You can always take a bird card.)</i>",
    },
    vagrant: {
      name: "Vagrant",
      action: "Instigate",
      effect:
        "Exhaust a <Torch/> to initiate a battle in your clearing. You choose the attacker and defender, you choose the order in which they each remove their own buildings and tokens, and you remove pieces for each. <i>(Score a victory point per building or token of either player removed, and per Hostile piece of either player removed.)</i>",
    },
  },
};
