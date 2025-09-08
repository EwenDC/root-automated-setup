export default {
  label: {
    ability: `Zdolność`,
    aggression: `Agresja`,
    balancedSuits: {
      false: `Losowe rozmieszczenie symboli polan`,
      true: `Zrównoważone rozmieszczenie symboli polan`,
    },
    changeLanguage: `Zmień język`,
    chooseVagabonds: {
      false: `Wszystkie postacie Włóczęgi do wyboru`,
      true: `Wybierz dostępne postacie Włóczęgi`
    },
    clearing: {
      fox: `Polana Lisów`,
      mouse: `Polana Myszy`,
      rabbit: `Polana Królików`,
    },
    closeMessage: `Zamknij wiadomość`,
    complexity: `Złożoność`,
    crafting: `Zdolność Przekuwania`,
    disableAll: `Wyłącz Wszystkie`,
    enableAll: `Włącz Wszystkie`,
    factionRating: [`Niska`, `Umiarkowana`, `Wysoka`],
    fixedFirstPlayer: {
      false: `Losowy wybór gracza rozpoczynającego grę <i>(Gracz 1 to osoba obsługująca aplikację, Gracz 2 to osoba siedząca zgodnie z ruchem wskazówek zegara, itd.)</i>`,
      true: `Ustalony pierwszy gracz <i>(Gracz 1 to pierwszy gracz w kolejności tur, Gracz 2 to drugi, itd.)</i>`,
    },
    fox: `Lis`,
    includeBotStep: `Uwzględnij konfigurację botów`,
    includeHirelings: `Uwzględnij Zaciężnych`,
    landmarkCount: `Liczba punktów terenu`,
    logoAlt: `Root`,
    logoText: `Automatyczna Konfiguracja`,
    mapChart: `Układ polan na mapie, uporządkowany od lewej do prawej i od góry do dołu`,
    militant: `Militarny`,
    mouse: `Mysz`,
    nextStep: `Następny Krok`,
    pageTitle: `Automatyczna Konfiguracja Root`,
    placeMarkers: {
      priority: `<li>Zbierz 12 znaczników priorytetu, a następnie umieść po jednym w każdej polanie, jak pokazano na poniższym wykresie.</li>`,
      suit: `<li>Zbierz 12 znaczników symboli, a następnie umieść po jednym w każdej polanie, jak pokazano na poniższym wykresie.</li>`,
      suitPriority: `<li>Zbierz 12 znaczników symboli i 12 znaczników priorytetu, a następnie umieść po jednym z każdego w każdej polanie, jak pokazano na poniższym wykresie.</li>`,
    },
    playerCount: `Liczba Graczy`,
    priority: `Priorytet {{count}}`,
    rabbit: `Królik`,
    redo: `Powtórz`,
    restartSetup: `Ponownie rozpocznij konfigurację`,
    ruin: `Ruiny`,
    specialAction: `Akcja Specjalna`,
    startingItems: `Przedmioty Startowe`,
    startWith: `Zacznij z <StartingItems>, </StartingItems>`,
    suitMarker: {
      fox: `Lisia polana`,
      mouse: `Mysia polana`,
      rabbit: `Królicza polana`,
    },
    useDraft: `Użyj wyboru frakcji przez draft`,
    undo: `Cofnij`,
    wealth: `Zasobność w karty`,
  },
  component: {
    buildings_one: `{{count}} Budynek`,
    buildings_few: `{{count}} Budynki`,
    buildings_many: `{{count}} Budynków`,
    bag: `Torba`,
    boot: `But`,
    coin: `Moneta`,
    crossbow: `Kusza`,
    hammer: `Młotek`,
    sword: `Miecz`,
    tea: `Herbata`,
    tokens_one: `{{count}} Żeton`,
    tokens_few: `{{count}} Żetony`,
    tokens_many: `{{count}} Żetonów`,
    torch: `Pochodnia`,
    warriors_one: `1 Pionek`,
    warriors_other: `{{count}} Wojowników`,
  },
  error: {
    factionHirelingExcluded: `Frakcja powiązana z tym Zaciężnym jest wymagana do konfiguracji`,
    hirelingSelected: `Równoważny Zaciężny dla tej frakcji jest już w grze`,
    landmarkNotEnoughPlayers: `Za mało graczy, aby grać z tym punktem terenu`,
    lockedFaction: `Nie można wybrać ostatniej frakcji, dopóki nie zostanie wybrana frakcja Militarna`,
    mapLandmarkUsed: `Punkt terenu mapy już został uwzględniony w konfiguracji mapy`,
    missingDeck: `Do przygotowania gry potrzebna jest talia kart! Proszę wybrać pudełko, które ją zawiera`,
    missingFaction: `Do przygotowania gry potrzebna jest co najmniej jedna frakcja! Proszę wybrać pudełko, które ją zawiera`,
    missingMap: `Do przygotowania gry potrzebna jest mapa! Proszę wybrać pudełko, które ją zawiera`,
    noDeck: `Nie wybrano żadnej talii! Proszę wybrać przynajmniej jedną talię`,
    noFaction: `Nie wybrano żadnej Frakcji! Proszę wybrać frakcję do gry`,
    noLandmark: `Nie wybrano żadnych punktów terenu! Proszę wybrać przynajmniej jeden punkt terenowy lub ustawić ich liczbę na zero`,
    noMap: `Nie wybrano żadnych map! Proszę wybrać przynajmniej jedną mapę`,
    noMilitantFaction: `Nie wybrano żadnych frakcji Militarnych! Proszę wybrać przynajmniej jedną frakcję Militarną`,
    tooFewFaction: `Wybrano za mało Frakcji! Proszę wybrać więcej Frakcji, wyłączyć wybór frakcji przez draft, lub zmniejszyć liczbę graczy`,
    tooFewHireling: `Za mało Zaciężnych do przeprowadzenia konfiguracji Zaciężnych! Może to być spowodowane tym, że obecny wybór Zaciężnych wymaga usunięcia zbyt wielu frakcji z konfiguracji`,
    tooFewLandmark: `Wybrano za mało punktów terenu! Proszę wybrać więcej punktów terenu lub zmniejszyć ich liczbę`,
    tooFewPlayerInsurgent: `Nie można używać frakcji niemilitarnych z mniej niż 3 graczami i bez botów lub zaciężnych`,
    tooFewVagabond: `Wybrano za mało postaci Włóczęgi! Proszę uwzględnić więcej postaci Włóczęgi lub wykluczyć niektóre Frakcje Włóczęgi`,
    tooManyCornerSetup: `Zbyt wiele wybranych frakcji wymaga polany narożnej do konfiguracji! Proszę zwiększyć wybór frakcji lub włączyć wybór frakcji przez draft`,
  },
  setupStep: {
    chooseExpansions: {
      body: `Witaj w Zautomatyzowanej Konfiguracji Root. Ta strona poprowadzi Cię przez zaawansowane zasady przygotowania rozgrywki popularnej gry planszowej Root, z minimalnym tasowaniem i bez kart konfiguracji! Aby rozpocząć, wybierz zawartość Root, w którą grasz. Gdy będziesz gotowy do przejścia do następnego kroku, użyj przycisków na dole strony, aby to zrobić.`,
    },
    seatPlayers: {
      title: `Rozmieść Graczy`,
      body: `Ustal kolejność siedzenia graczy, a następnie wybierz, ilu graczy bierze udział w grze i czy chcesz, aby aplikacja wybrała losowego gracza rozpoczynającego.`,
    },
    chooseMap: {
      title: `Wybierz i Skonfiguruj Mapę`,
      body: `W grupie zdecydujcie, na której mapie chcecie grać. Jeśli wybierzecie wiele map, zostanie wybrana losowa mapa.`,
    },
    setUpMap: {
      body: `<li>Umieść ruinę w czterech oznaczonych polanach, zakrywając pola oznaczone literą „R”.</li><li>Umieść następujące przedmioty na odpowiednich polach w zasobach przedmiotów w górnej części mapy: 2 <Boot/>, 2 <Bag/>, 1 <Crossbow/>, 1 <Hammer/>, 2 <Sword/>, 2 <Tea/>, 2 <Coin/>.</li><li>Połóż dwie kości bitwy w pobliżu mapy.</li>`,
    },
    chooseDeck: {
      title: `Wybierz i Skonfiguruj Talię`,
      body: `W grupie zdecydujcie, której talii chcecie użyć. Jeśli wybierzecie wiele talii, zostanie wybrana losowa talia.`,
    },
    setUpDeck: {
      title: `Skonfiguruj Talię`,
    },
    setUpBots: {
      title: `Skonfiguruj Boty`,
      body: `W grupie zdecydujcie, z którymi botami chcecie grać, postępując zgodnie z ich instrukcjami konfiguracji, opisanymi w Księdze Praw Rootbotyki.`,
    },
    chooseLandmarks: {
      title: `Skonfiguruj Punkty Terenu`,
      body: `W grupie zdecydujcie, z iloma punktami terenu chcecie grać i które z nich mają zostać uwzględnione w puli wyboru.`,
      body_mapLandmark: `W grupie zdecydujcie, z iloma punktami terenu chcecie grać <i>(oprócz już uwzględnionego punktu terenu mapy)</i> i które z nich mają zostać uwzględnione w puli wyboru.`,
    },
    chooseHirelings: {
      title: `Skonfiguruj Zaciężnych`,
      body: `W grupie zdecydujcie, czy chcecie grać z Zaciężnymi i które z nich mają zostać uwzględnione w puli wyboru.`,
    },
    postHirelingSetup: {
      subtitle: `Rozmieść Znaczniki Zaciężnych`,
      body: `Umieść trzy znaczniki Zaciężnych - oznaczone „4”, „8” i „12” - na polach „4”, „8” i „12” toru punktacji na mapie.`,
    },
    drawCards: {
      title: `Dobierz Pięć Kart`,
      body: `Każdy gracz dobiera pięć kart ze wspólnej talii. <i>(Trzy karty do zatrzymania wybierzesz później.)</i>`,
    },
    chooseFactions: {
      title: `Skonfiguruj Frakcje`,
      body: `W grupie wybierzcie, które frakcje chcecie uwzględnić w konfiguracji.`,
    },
    selectFaction: {
      subtitle: `Przydziel Frakcje`,
      subtitle_useDraft: `Wybierz Frakcję`,
      body: `Przydziel jedną z poniższych frakcji każdemu graczowi w dowolny sposób. Frakcje zostaną skonfigurowane od lewej do prawej. Możesz swobodnie wybierać frakcje z listy, aby zobaczyć ich statystyki.`,
      body_useDraft: `Gracz {{count}}, wybierz frakcję, którą chcesz zagrać z poniższej puli frakcji. Możesz swobodnie wybierać frakcje z listy, aby zobaczyć ich statystyki, zanim potwierdzisz swój wybór, naciskając „Następny Krok”.`,
    },
    placeScoreMarkers: {
      title: `Rozmieść Znaczniki Punktacji`,
      title_vagabondSetUp: `Rozmieść Znaczniki Punktacji i Relacji`,
      body: `Każdy gracz umieszcza znacznik punktacji swojej wybranej frakcji na polu „0” toru Punktacji.`,
      body_vagabondSetUp: `Każdy gracz umieszcza znacznik punktacji swojej wybranej frakcji na polu „0” toru Punktacji. Każdy gracz Włóczęgi umieszcza znacznik relacji dla każdej frakcji innej niż Włóczęga w grze na polu Neutralnym na swojej tabeli Relacji.`,
    },
    chooseHand: {
      title: `Wybierz Rękę Startową`,
      body: `Każdy gracz wybiera trzy karty z ręki do zatrzymania i kładzie pozostałe dwie karty zakryte na wspólnym stosie. Po zakończeniu, potasuj wspólną talię.`,
    },
    setupEnd: {
      title: `Rozpocznij Grę`,
      body: `Konfiguracja została zakończona. Gra rozpocznie się od Gracza {{count}}. Jeśli chcesz ponownie uruchomić proces konfiguracji, użyj poniższego przycisku.<p><i>„Root Automated Setup” stworzone przez Ewena Camerona</i><br/><i>Na podstawie gry planszowej „Root” wydanej przez Leder Games</i><br/><i>Aplikacja licencjonowana na CC BY-NC-SA 4.0</i></p>`,
    },
  },
  deck: {
    exiles: {
      name: `Banitów i Partyzantów `,
      setupTitle: `Skonfiguruj Talię Banitów i Partyzantów `,
      setup: `Weź talię Banitów i Partyzantów  z pudełka gry i umieść ją obok mapy. Potasuj talię.`,
      setup_twoPlayer: `Weź talię Banitów i Partyzantów  z pudełka gry i umieść ją obok mapy. Usuń wszystkie cztery karty Dominacji z talii. Potasuj talię.`,
    },
    standard: {
      name: `Standardowa`,
      setupTitle: `Skonfiguruj Talię Standardową`,
      setup: `Weź talię Standardową z pudełka gry i umieść ją obok mapy. Potasuj talię.`,
      setup_twoPlayer: `Weź talię Standardową z pudełka gry i umieść ją obok mapy. Usuń wszystkie cztery karty Dominacji z talii. Potasuj talię.`,
    },
  },
  expansion: {
    exilesDeck: `Talia Banitów i Partyzantów`,
    landmarkPack: `Punkty Terenu`,
    marauder: `Rozszerzenie Maruderzy`,
    marauderHirelings: `Paczka Zaciężnych Maruderów`,
    riverfolk: `Rozszerzenie Plemiona Rzeczne`,
    riverfolkHirelings: `Paczka Zaciężnych Plemion Rzecznych`,
    root: `Root`,
    underworld: `Rozszerzenie Podziemia`,
    underworldHirelings: `Paczka Zaciężnych Podziemia`,
    vagabondPack: `Paczka Włóczęgów`,
  },
  faction: {
    alliance: {
      name: `Sojusz Leśnych Stworzeń`,
      summaryTitle: `Gra Sojuszem`,
      summary: `<p>Jako Sojusz Leśnych Stworzeń, starasz się pozyskać sympatię uciśnionych stworzeń leśnych. Za każdym razem, gdy umieścisz <b>żeton Sympatyków</b> na mapie, zdobywasz punkty. Im więcej żetonów Sympatyków na mapie, tym więcej punktów zdobywasz.</p><p>Aby zdobyć sympatię, potrzebujesz jednak <b>Stronników</b> — kart umieszczonych na twojej planszy frakcji — pasujących do polan, na których chcesz zdobyć sympatię. Chociaż możesz dodawać własne karty do swoich Stronników, możesz też sprowokować swoich wrogów, aby zrobili to samo, wywołując <b>Bunt</b>: za każdym razem, gdy inna frakcja usuwa sympatyków lub przemieszcza wojowników na polanę z Sympatykami, muszą dodać jedną ze swoich kart do twoich Stronników.</p><p>Nie bój się tworzyć punktów strategicznych, ponieważ jesteś ekspertem w <b>Wojnie Partyzanckiej</b>: broniąc się w walce, używasz wyższego wyniku z kości. Umieszczaj swoich sympatyków na polanach, gdzie prawdopodobny jest konflikt, i zmuszaj przeciwnika do stawienia ci czoła!</p><p>Stronników można również wykorzystać do gwałtownej <b>Rewolty</b>, która niszczy <i>wszystkie</i> elementy twoich wrogów na polanie i umieszcza tam wojowników oraz nową <b>Bazę</b>. Bazy nie tylko zwiększają dobieranie kart, ale także pozwalają szkolić <b>Oficerów</b>, którzy dają darmowe akcje w każdej turze. Chroń swoje Bazy dobrze! Jeśli stracisz Bazę, stracisz również wielu Stronników i Oficerów.</p>`,
      setupTitle: `Konfiguracja Sojuszu Leśnych Stworzeń`,
      setup: {
        default: `<ol><li><b>Przygotowanie Wojowników.</b> Stwórz pulę 10 wojowników.</li><li><b>Rozmieszczenie Baz.</b> Umieść 3 Bazy na pasujących polach w swoim pudełku Baz.</li><li><b>Uzupełnienie Toru Sympatyków.</b> Umieść 10 żetonów Sympatyków na swoim torze Sympatyków.</li><li><b>Pozyskanie Stronników.</b> Dobierz 3 karty i umieść je zakryte na swoim stosie Stronników.</li></ol>`,
      },
      advancedSetup: {
        default: `<ol><li>Dobierz 3 <b>karty</b> i dodaj je zakryte do stosu Stronników.</li><li>Uzupełnij swój tor Sympatyków <b>żetonami Sympatyków</b>.</li><li>Umieść swoje 3 <b>Bazy</b> na pasujących polach w swoim pudełku Baz.</li></ol>`,
      },
    },
    corvid: {
      name: `Krucza Konspiracja`,
      summaryTitle: `Gra Kruczą Konspiracją`,
      summary: `<p>Jako Krucza Konspiracja, chcesz pokazać, że to ty jesteś prawdziwą siłą działającą za kulisami, kontrolującą losy wojny w Leśnogrodzie. Za każdym razem, gdy odwracasz <b>żeton intrygi</b>, który umieściłeś na mapie, zdobywasz punkty. Im więcej odkrytych intryg na mapie, tym więcej punktów zdobywasz.</p><p>Aby umieszczać i odwracać intrygi, musisz mądrze rekrutować i pozycjonować swoich wojowników. Twoja frakcja jest jedną z najlepszych w rekrutowaniu wojowników do twojej sprawy, ale będą oni rozproszeni, ponieważ rzadko będziesz mógł się wielokrotnie poruszać. Co więcej, nie możesz zbyt często walczyć, ponieważ umieszczenie intrygi wymaga usunięcia jednego lub więcej wojowników Kruczej Konspiracji, a nie możesz odwrócić intrygi, jeśli w jej polanie nie ma wojownika Kruczej Konspiracji.</p><p>Na szczęście twoi wojownicy są niezwykle <b>Zwinni</b>, co pozwala im poruszać się niezależnie od zasad. Dodatkowo, twoi <b>Ukryci Agenci</b> sprawiają, że twoje intrygi są niebezpieczne do stłumienia siłą — broniąc się w walce z zakrytym żetonem intrygi, zadajesz dodatkowe obrażenie.</p><p>Jednak uważaj, aby nie pozostawić swoich intryg otwartych na <b>Zdemaskowanie</b>. Każda wroga frakcja na polanie z zakrytym żetonem intrygi może pokazać ci pasującą kartę, aby odgadnąć, jaka to intryga. Jeśli mają rację, przejrzeli cię i udaremnili twoją intrygę! Usuwają intrygę i ignorują jej efekt. Jeśli jednak się mylą, łapiesz ich szpiega na gorącym uczynku. Twoja intryga pozostaje, a oni oddają ci kartę, którą ci pokazali. Dobrze blefuj.</p>`,
      setupTitle: `Konfiguracja Kruczej Konspiracji`,
      setup: {
        default: `<ol><li><b>Przygotowanie Wojowników i Intryg.</b> Stwórz pulę 15 wojowników i 8 zakrytych żetonów Intryg.</li><li><b>Rozproszenie.</b> Umieść 1 wojownika w dowolnej polanie każdego symbolu <i>(łącznie 3)</i>.</li></ol>`,
      },
      advancedSetup: {
        default: `<ol><li>Wybierz polanę ojczystą. Umieść tam 1 <b>wojownika</b> i 1 wybrany prze siebie zakryty <b>żeton intrygi</b>.</li><li>Umieść 1 <b>wojownika</b> w polanie każdego symbolu. <i>(Licząc poprzedni krok, umieść łącznie 4 wojowników.)</i></li></ol>`,
      },
    },
    cult: {
      name: `Jaszczurzy Kultyści`,
      summaryTitle: `Gra Jaszczurzymi Kultystami`,
      summary: `<p>Jako Jaszczurzy Kultyści, zaspokajacie potrzeby tych stworzeń, które zostały odrzucone przez inne frakcje. Zdobywasz punkty zwycięstwa, wykonując odpowiednie <b>Rytuały</b>, ujawniając karty z ręki odpowiadające polanom, na których masz <b>Ogrody</b>, i odrzucając karty, aby dokończyć rytuał. Im więcej Ogrodów masz na polanach odpowiadających ujawnionej karcie, tym więcej punktów zdobywasz.</p><p>Twoje łagodniejsze podejście oznacza, że na początku nie możesz walczyć ze swoimi wrogami; aby to zrobić, musisz radykalizować swoich wyznawców w <b>Akolitów</b>. Dzięki temu możesz przeprowadzać <b>Spiski</b> na polanach <b>Wygnańców</b>, symbolu najczęściej odrzucanego w poprzedniej rundzie.</p><p>Twoja <b>Nienawiść do Ptaków</b> oznacza, że twoje ptasie karty nie działają jak jokery w twoich Rytuałach. Twoje Ogrody rozprzestrzeniają wieści o twoim smoczym panu, przyciągając rzesze <b>Pielgrzymów</b>, więc rządzisz polaną, jeśli masz tam choćby jeden Ogród. Wreszcie, twoi Akolici zawsze dostają <b>Zemstę</b> na niegodziwcach: za każdym razem, gdy jeden z twoich wojowników zostaje usunięty podczas obrony w walce, zyskujesz kolejnego Akolitę.</p>`,
      setupTitle: `Konfiguracja Jaszczurzych Kultystów`,
      setup: {
        default: `<ol><li><b>Przygotowanie Wojowników.</b> Stwórz pulę 25 wojowników.</li><li><b>Rozmieszczenie Ogrodu i Wojowników.</b> Rozmieść 4 wojowników i 1 Ogród o symbolu odpowiadającym wybranej polanie na narożnej polanie, która nie jest polaną startową innego gracza i, jeśli to możliwe, jest po przekątnej od innej startowej polany. Następnie umieść 1 wojownika w każdej sąsiedniej polanie.</li><li><b>Wybór Wygnańców.</b> Umieść znacznik Wygnańców na dowolnym polu symbolu w tabeli Wygnańców. Symbol tego pola nazywany jest <i>Wygnańcem</i>.</li><li><b>Uzupełnienie Torów Ogrodów.</b> Umieść swoje 14 pozostałych Ogrodów na pasujących polach swoich torów Ogrodów od prawej do lewej.</li></ol>`,
      },
      advancedSetup: {
        default: `<ol><li>Wybierz polanę ojczystą, która nie sąsiaduje z ojczystymi polanami wroga.</li><li>Umieść 4 <b>wojowników</b> i 1 pasujący <b>ogród</b> w swojej polanie ojczystej. Rozmieść 3 <b>wojowników</b> w polanach sąsiadujących z nią tak równomiernie, jak to możliwe.</li><li>Umieść 2 <b>wojowników</b> w swoim pudełku Akolitów.</li><li>Wypełnij swoje tory Ogrodów <b>Ogrodami</b>, z wyjątkiem najbardziej lewego pola ogrodu na mapie.</li><li>Umieść swój <b>znacznik Wygnańców</b> na stronie Wygnańców na dowolnym polu pudełka Wygnańców.</li></ol>`,
      },
    },
    duchy: {
      name: `Podziemne Księstwo`,
      summaryTitle: `Gra Podziemnym Księstwem`,
      summary: `<p>Jako Podziemne Księstwo, chcesz pokazać obcym stworzeniom Leśnogrodu, że lepiej by im było jako poddanym Księcia. Za każdym razem, gdy przekonujesz jednego ze swoich <b>Ministrów</b> do sprawy pacyfikacji i zjednoczenia krainy powyżej, zdobywasz punkty. Im wyższa ranga Ministra, którego przekonujesz, tym więcej punktów zdobywasz.</p><p>Aby przekonać Ministra, musisz ujawnić karty, reprezentujące twoje poparcie wśród separatystów Leśnogrodu. Im wyższa ranga Ministra, tym więcej kart musisz ujawnić. Jednak możesz ujawniać tylko karty, które odpowiadają polanom z dowolną liczbą elementów Księstwa, pokazując swoje przyczółki w wirującym chaosie. Każdy przekonany Minister daje ci dodatkową akcję w każdej turze. Niektórzy Ministrowie nawet pozwalają ci zdobywać punkty zwycięstwa, reklamując twoje inwestycje w Leśnogrodzie.</p><p>Twoje krety są dobrze chronione w <b>Norze</b>, polanie, na którą tylko ty możesz wejść i którą zawsze rządzisz. Z Nory możesz przenieść się do dowolnego <b>Tunelu</b>, który wykopiesz w całym Leśnogrodzie. Gdy uspokoisz polany i ustanowisz władzę, możesz budować <b>Cytadele</b> i <b>Targi</b>, aby przyciągnąć więcej stworzeń do swojej sprawy. Jednak za każdym razem, gdy tracisz budynki, musisz ponieść <b>Cenę Porażki</b>, tracąc wpływy z Ministrem o najwyższej randze i odrzucając losową kartę.</p>`,
      setupTitle: `Konfiguracja Podziemnego Księstwa`,
      setup: {
        default: `<ol><li><b>Przygotowanie Wojowników i Tuneli.</b> Stwórz pulę 20 wojowników i 3 żetonów Tuneli.</li><li><b>Przygotowanie Nory.</b> Umieść planszę Nory obok mapy.</li><li><b>Na Powierzchni.</b> Umieść 2 wojowników i 1 tunel w narożnej polanie, która nie jest polaną startową innego gracza i, jeśli to możliwe, jest po przekątnej od polany startowej. Następnie umieść 2 wojowników w każdej polanie sąsiadującej z wybraną polaną narożną, z wyjątkiem Nory.</li><li><b>Uzupełnienie Torów Budynków.</b> Umieść 3 Cytadele i 3 Targi na pasujących polach swoich torów Budynków.</li><li><b>Zebranie Ministrów.</b> Umieść 9 kart Ministrów odkrytych na swoim stosie Nieprzekonanych Ministrów.</li><li><b>Uzupełnienie Pól Koron.</b> Umieść 9 koron na polach z punktami zwycięstwa na swojej planszy frakcji.</li></ol>`,
      },
      advancedSetup: {
        default: `<ol><li>Wybierz polanę ojczystą, która nie sąsiaduje z ojczystymi polanami wroga.</li><li>Umieść 2 <b>wojowników</b> i 1 <b>tunel</b> w swojej polanie ojczystej. Rozmieść 5 <b>wojowników</b> w polanach sąsiadujących z nią tak równomiernie, jak to możliwe.</li><li>Umieść swoją <b>planszę Nory</b> obok mapy. Wypełnij swoje tory Budynków swoimi <b>cytadelami</b> i <b>targami</b>. Umieść swoje 9 <b>kart Ministrów</b> na swoim stosie Nieprzekonanych Ministrów. Umieść swoje 9 <b>koron</b> na polach kwadratowych pokazujących punkty zwycięstwa.</li></ol>`,
      },
    },
    eyrie: {
      name: `Dynastie Orlich Gniazd`,
      summaryTitle: `Gra Dynastiami Orlich Gniazd`,
      summary: `<p>Jako Dynastie Orlich Gniazd, pragniesz przywrócić swojemu niegdyś dumnemu rodzajowi dawną chwałę, odzyskując kontrolę nad Leśnogrodem. W każdej turze zdobywasz punkty za swoje <b>Gniazda</b> na mapie. Im więcej Gniazd, tym więcej punktów zdobywasz.</p><p>Jednakże, jesteś związany <b>Dekretem</b>, mandatem od <b>Przywódcy</b> Orlich Gniazd. W każdej turze musisz dodawać karty do Dekretu, a następnie wykonywać akcję dla każdej karty w nim. Każda akcja musi odbywać się w polanie odpowiadającej jej karcie, więc planuj mądrze. Początkowo jest to proste, ale gdy Dekret wzrośnie do 10 lub 12 kart, będziesz musiał walczyć, aby wykonać każdą akcję. Jeśli nie możesz jej wykonać, wpadniesz w <b>Zamieszki</b>, tracąc punkty, zastępując Przywódcę i odrzucając Dekret.</p><p>Przede wszystkim pamiętaj: stworzenia naziemne drżą i rozpraszają się na twoje przybycie. Jesteś <b>Władcami Lasu</b> – rządzisz polaną nawet wtedy, gdy masz taką samą liczbę elementów. Jednakże, twoi ludzie odczuwają <b>Niechęć do Handlu</b>, więc często będziesz zdobywać mniej punktów za przekuwanie przedmiotów.</p>`,
      setupTitle: `Konfiguracja Dynastii Orlich Gniazd`,
      setup: {
        default: `<ol><li><b>Przygotowanie Wojowników.</b> Stwórz pulę 20 wojowników.</li><li><b>Rozmieszczenie Gniazda i Startowych Wojowników.</b> Umieść 1 Gniazdo i 6 wojowników w narożnej polanie, która nie jest polaną startową innego gracza i, jeśli to możliwe, jest po przekątnej od polany startowej.</li><li><b>Wybór Przywódcy.</b> Wybierz 1 z 4 kart Przywódców Orlich Gniazd i umieść ją w swoim slocie Karty Przywódcy. Zbierz pozostałych Przywódców odkrytych obok siebie.</li><li><b>Wsunięcie Wezyrów.</b> Wsuń swoje 2 karty Lojalnych Wezyrów, pokazując ich symbol, do kolumn Dekretu nad swoją planszą frakcji, zgodnie z listą na twoim Przywódcy.</li><li><b>Uzupełnienie Toru Gniazd.</b> Umieść swoje 6 pozostałych Gniazd na swoim torze Gniazd od prawej do lewej.</li></ol>`,
      },
      advancedSetup: {
        default: `<ol><li>Wybierz polanę ojczystą na krawędzi mapy, która ma 2+ polan między nią a ojczystymi polanami wroga.</li><li>Umieść 6 <b>wojowników</b> i 1 <b>gniazdo</b> w swojej polanie ojczystej.</li><li>Umieść dowolną <b>kartę Przywódcy</b> w swoim slocie Karty Przywódcy. Pozostałych 3 Przywódców trzymaj odkrytych w pobliżu.</li><li>Wsuń swoje 2 <b>Lojalnych Wezyrów</b> pod sloty kolumn Dekretu, zgodnie z listą na twoim obecnym Przywódcy.</li><li>Wypełnij swoje pola Gniazd <b>Gniazdami</b>, z wyjątkiem najbardziej lewego.</li></ol>`,
      },
    },
    keepers: {
      name: `Żelazna Straż`,
      summaryTitle: `Gra Żelazną Strażą`,
      summary: `<p>Jako Żelazna Straż, zdobywasz punkty, odzyskując <b>Relikty</b> utracone w przeszłych konfliktach. Będziesz musiał <b>Odnajdywać</b> Relikty w lasach, przemieszczać je do <b>Posterunku</b> tego samego typu, a następnie je <b>Odzyskiwać</b>. Pytanie jednak, czy te Relikty należą do ciebie, czy do Leśnogrodu?</p><p>Jako <b>Oddani Rycerze</b> wygnanego zakonu, ignorujecie pierwsze obrażenie, które otrzymacie w walce, jeśli macie w niej zarówno wojownika, jak i relikt, niezależnie od tego, czy atakujecie, czy bronicie się. Możecie również przemieszczać Relikty swoimi wojownikami.</p><p>Twoje Relikty to <b>Cenne Trofea</b>, więc dbaj o nie. Ilekroć wróg usunie Relikt w jakikolwiek sposób, zdobywa dwa punkty zamiast jednego i umieszcza go z powrotem w dowolnym lesie.</p><p>Z czasem rozbudujesz swoją <b>Świtę</b>, trzy kolumny kart, które pozwalają ci wykonywać akcje. Odnajdywanie i odzyskiwanie Reliktów narazi twoją Świtę na ryzyko, więc będziesz musiał planować z wyprzedzeniem i podejmować rozsądne ryzyko, aby odnieść sukces.</p>`,
      setupTitle: `Konfiguracja Żelaznej Straży`,
      setup: {
        default: `<ol><li><b>Początkowe Relikty.</b> Zbierz wszystkie dwanaście żetonów Reliktów i potasuj je zakryte <i>(bez pokazywania wartości)</i>. Umieść po jednym losowo w każdym lesie. <i>(Zalecamy, abyś po prostu przesuwał Relikty zakryte po planszy, a następnie umieszczał je tak szybko, jak to możliwe w grupie. W przeciwnym razie możesz użyć tej bardziej losowej, ale trudniejszej metody: Strażnik układa stos losowych Reliktów, a następnie inny gracz przecina stos, podnosi go i upuszcza Relikty jeden po drugim od dołu na lasy.)</i></li><li><b>Rozmieszczenie Wojowników.</b> Umieść czterech wojowników w narożnej polanie, która nie jest polaną startową innego gracza i, jeśli to możliwe, jest po przekątnej od polany startowej. Następnie umieść czterech wojowników w polanie na krawędzi mapy, która sąsiaduje z wybraną polaną.</li><li><b>Rozmieszczenie Pozostałych Reliktów.</b> Rozmieść wszystkie pozostałe Relikty losowo, tak równomiernie, jak to możliwe, w lasach niesąsiadujących z polanami zawierającymi twoich wojowników.</li><li><b>Wsunięcie Wiernych Sług.</b> Wsuń jedną kartę Wiernego Sługi w każdy slot Świty na swojej planszy frakcji.</li><li><b>Rozmieszczenie Posterunków.</b> Umieść swoje trzy budynki Posterunków na pasujących polach swoich Posterunków na planszy frakcji.</li></ol>`,
      },
      advancedSetup: {
        default: `<ol><li>Potasuj wszystkie 12 <b>żetonów Reliktów</b> zakryte. Umieść jeden zakryty losowo w każdym lesie.</li><li>Wybierz 2 sąsiadujące polany ojczyste na krawędzi mapy, które mają 2+ polan między nimi a ojczystymi polanami wroga. Umieść 4 <b>wojowników</b> w każdej polanie ojczystej.</li><li>Umieść wszelkie pozostałe <b>Relikty</b> losowo, tak równomiernie, jak to możliwe, w dowolnych lasach, które nie sąsiadują z twoimi polanami ojczystymi.</li><li>Wsuń kartę <b>Wiernego Sługi</b> w każdy z twoich slotów kolumn Świty. Umieść swoje 3 <b>Posterunki</b> na pasujących polach Posterunków.</li></ol>`,
      },
    },
    marquise: {
      name: `Markiza de Kot`,
      summaryTitle: `Gra Markizą`,
      summary: `<p>Jako Markiza de Kot, chcesz przekształcić Leśnogród w przemysłową i militarną potęgę. Za każdym razem, gdy umieścisz <b>budynek</b> na mapie, zdobywasz punkty. Im więcej budynków danego typu znajduje się na mapie, tym więcej punktów zdobywasz.</p><p>Aby napędzić tę budowę, musisz rozwijać i chronić połączoną gospodarkę <b>drzewną</b>. Budowa infrastruktury sprawia, że twoje tury są bardziej efektywne i pomaga ci dobierać więcej kart, więc dąż do zapewnienia sobie prawa do ekspansji. Twoja armia jest legionem, co pozwala ci egzekwować swoje rządy żelazną pięścią, jeśli to konieczne.</p><p>Siedziba twojej władzy to <b>Twierdza Markizy de Kot</b>, struktura tak imponująca, że żadna inna frakcja nie może umieszczać elementów w jej polanie. Co więcej, twoje <b>Szpitale Polowe</b> pomogą ci utrzymać się w walce. Ilekroć którykolwiek z twoich wojowników zostanie usunięty, możesz wydać kartę odpowiadającą polanie wojowników, aby umieścić ich z powrotem w swojej twierdzy - dopóki stoi. Dobrze ją chroń!</p>`,
      setupTitle: `Konfiguracja Markizy de Kot`,
      setup: {
        default: `<ol><li><b>Przygotowanie Wojowników i Drewna.</b> Stwórz pulę 25 wojowników i 8 żetonów drewna.</li><li><b>Umieść Twierdzę.</b> Umieść żeton Twierdzy w dowolnej narożnej polanie.</li><li><b>Garnizon.</b> Umieść wojownika w każdej polanie, z wyjątkiem polany leżącej po przekątnej od polany z żetonem Twierdzy.</li><li><b>Rozmieszczenie Startowych Budynków.</b> Umieść 1 Tartak, 1 Warsztat i 1 Koszary. Możesz je rozmieścić między polaną z żetonem Twierdzy a dowolnymi sąsiadującymi polanami, w dowolnej kombinacji.</li><li><b>Uzupełnienie Torów Budynków.</b> Umieść swoje pozostałe 5 Tartaków, 5 Warsztatów i 5 Koszar na pasujących torach Budynków od prawej do lewej. <i>(Pozostaw najbardziej lewe pole każdego toru puste.)</i></li></ol>`,
      },
      advancedSetup: {
        default: `<ol><li>Wybierz 3 sąsiadujące ze sobą polany ojczyste.</li><li>Umieść 2 <b>wojowników</b> w każdej ze swoich polan ojczystych. Umieść 1 <b>wojownika</b> w każdej innej polanie.</li><li>Umieść <b>żeton twierdzy</b> w jednej ze swoich polan ojczystych, jeśli to możliwe, niesąsiadującej z polaną ojczystą wroga. Umieść 1 <b>tartak</b>, <b>warsztat</b> i <b>koszary</b> na mapie, każdy w innej polanie ojczystej.</li><li>Wypełnij swój tor Budynków swoimi <b>budynkami</b>, z wyjątkiem najbardziej lewych pól.</li></ol>`,
      },
    },
    riverfolk: {
      name: `Kompania Plemion Rzecznych`,
      summaryTitle: `Gra Kompanią Plemion Rzecznych`,
      summary: `<p>Jako Kompania Plemion Rzecznych, pływasz po rzekach wijących się przez wielki Leśnogród, oferując swoje usługi każdej frakcji, która może zapłacić. Zdobywasz punkty zwycięstwa, zakładając <b>Faktorie Handlowe</b> w polanach.</p><p>Chociaż budowa Faktorii Handlowych jest opłacalnym sposobem na zdobywanie punktów, to samo dotyczy surowej akumulacji bogactwa. Każdego Świtu zdobywasz punkty w zależności od tego, ile <b>Funduszy</b> zgromadziłeś i zarobiłeś w poprzedniej rundzie. Będziesz jednak musiał również zainwestować i wydać swoje Fundusze, aby rozwinąć i chronić swoją sieć handlową, zachowując równowagę między dywidendami a wzrostem.</p><p>Będziesz zarabiać Fundusze, gdy inne frakcje kupią twoje <b>Usługi</b>, czy to korzystanie z twoich łodzi rzecznych, czy wojowników najemników, a nawet jedną z kart w twojej publicznej ręce, która jest cała <b>Na Sprzedaż</b>. Możesz ustalać ceny swoich Usług w każdej turze, więc staraj się przewidzieć, których Usług będą potrzebować inne frakcje.</p><p>Budowanie Faktorii Handlowych pomaga ci rozszerzyć bazę klientów i sprzedawać więcej Usług, ponieważ frakcja może kupić od ciebie więcej Usług, jeśli rozszerzy się na więcej polan, na których masz Faktorie Handlowe. Ale bądź ostrożny, gdy twoje Faktorie Handlowe zostaną zniszczone, nie można ich odbudować! Chociaż możesz nie rządzić wieloma polanami, zawsze możesz poruszać się wzdłuż ścieżek rzecznych, ponieważ jesteś frakcją <b>Pływaków</b>.</p>`,
      setupTitle: `Konfiguracja Kompanii Plemion Rzecznych`,
      setup: {
        default: `<ol><li><b>Przygotowanie Wojowników.</b> Stwórz pulę 15 wojowników.</li><li><b>Rozmieszczenie Wojowników.</b> Umieść 4 wojowników w dowolnych polanach graniczących z rzeką.</li><li><b>Uzupełnienie Torów Faktorii.</b> Umieść 9 Faktorii na pasujących polach swoich torów Faktorii.</li><li><b>Pozyskanie Startowych Funduszy.</b> Umieść 3 wojowników w swoim pudełku Płatności.</li><li><b>Ustalenie Cen Początkowych.</b> Umieść 1 znacznik Usługi na dowolnym polu każdego ze swoich torów Usług.</li></ol>`,
      },
      advancedSetup: {
        default: `<ol><li>Umieść 4 <b>wojowników</b> w dowolnych polanach wzdłuż rzeki.</li><li>Umieść 3 <b>wojowników</b> w swoim pudełku Płatności.</li><li>Wypełnij swoje tory Faktorii pasującymi <b>Faktoriami</b>.</li><li>Umieść swoje 3 <b>znaczniki Usług</b> na torze Usług, ustalając cenę dla każdej usługi.</li></ol>`,
      },
    },
    vagabond: {
      name: `Włóczęga`,
      summaryTitle: `Gra Włóczęgą`,
      summary: `<p>Jako Włóczęga, będziesz grać po wszystkich stronach konfliktu, nawiązując przyjaźnie i wrogów w zależności od tego, co ci pasuje. Zdobywasz punkty poprzez swoje <b>Relacje</b>, pomagając przyjaznym frakcjom, dając im karty, oraz zwiększając swoją niesławę u wrogich frakcji, usuwając ich elementy w walce. Będziesz również zdobywać punkty, wyruszając na <b>Misje</b>, aby szerzyć swoją dobrą opinię wśród stworzeń Leśnogrodu.</p><p>Aby skutecznie poruszać się i działać, będziesz musiał zarządzać swoim plecakiem <b>Przedmiotów</b>, rozszerzając swój wybór poprzez eksplorację starożytnych <b>Ruin</b> i udzielanie pomocy innym frakcjom. Będąc <b>Samotnym Wędrowcem</b>, nie możesz rządzić polaną ani uniemożliwić innej frakcji rządzenia nią, ale jesteś <b>Zwinny</b>, więc możesz poruszać się niezależnie od tego, kto rządzi twoją polaną.</p>`,
      setupTitle: `Konfiguracja Włóczęgi`,
      setup: {
        default: `<ol><li><b>Wybór Postaci.</b> Wybierz kartę Postaci i umieść ją w swoim slocie Karty Postaci.</li><li><b>Rozmieszczenie Pionka.</b> Umieść swój pionek Włóczęgi w dowolnym lesie.</li><li><b>Pozyskanie Misji.</b> Potasuj talię Misji, dobierz 3 karty Misji i umieść je odkryte obok siebie.</li><li><b>Zaludnij Ruiny.</b> Umieść przedmioty <Bag/>, <Boot/>, <Hammer/> i <Sword/> oznaczone literą „R” pod ruinami losowo, chyba że zostało to już zrobione.</li><li><b>Weź Przedmioty Startowe.</b> Weź przedmioty oznaczone literą „S” wymienione na twojej karcie Postaci. Umieść wszystkie wymienione przedmioty <Tea/>, <Coin/> i <Bag/> odkryte na pasujących torach swojej planszy frakcji. Umieść wszystkie inne wymienione przedmioty odkryte w swoim Plecaku. Zwróć wszelkie pozostałe przedmioty oznaczone literą „S” do pudełka.</li></ol>`,
        vagabondSetUp: `<ol><li><b>Wybór Postaci.</b> Wybierz kartę Postaci i umieść ją w swoim slocie Karty Postaci.</li><li><b>Rozmieszczenie Pionka.</b> Umieść swój pionek Włóczęgi w dowolnym lesie.</li><li><b>Zaludnij Ruiny.</b> Umieść przedmioty <Bag/>, <Boot/>, <Hammer/> i <Sword/> oznaczone literą „R” pod ruinami losowo <i>(wraz z istniejącymi przedmiotami)</i>.</li><li><b>Weź Przedmioty Startowe.</b> Weź przedmioty oznaczone literą „S” wymienione na twojej karcie Postaci. Umieść wszystkie wymienione przedmioty <Tea/>, <Coin/> i <Bag/> odkryte na pasujących torach swojej planszy frakcji. Umieść wszystkie inne wymienione przedmioty odkryte w swoim Plecaku. Zwróć wszelkie pozostałe przedmioty oznaczone literą „S” do pudełka.</li></ol>`,
      },
      advancedSetup: {
        default: `<ol><li>Umieść swój <b>pionek</b> w dowolnym lesie.</li><li>Potasuj talię Misji. Dobierz 3 <b>Misje</b>, aby rozdać w pobliżu.</li><li>Umieść <b>przedmioty ruin</b> <Bag/>, <Boot/>, <Hammer/> i <Sword/> <i>(oznaczone literą „R”)</i> pod ruinami losowo, chyba że zostało to już zrobione.</li><li>Umieść <b>kartę postaci</b> „{{vagabond}}” w swoim slocie Karty Postaci. Umieść <b>przedmioty startowe</b> <InitialStartingItems>, </InitialStartingItems> i <FinalStartingItem/> <i>(oznaczone literą „S”)</i> w swoim Plecaku i na pasujących torach, zgodnie z potrzebą.</li></ol>`,
        vagabondSetUp: `<ol><li>Umieść swój <b>pionek</b> w dowolnym lesie.</li><li>Umieść dodatkowe <b>przedmioty ruin</b> <Bag/>, <Boot/>, <Hammer/> i <Sword/> <i>(oznaczone literą „R”)</i> pod ruinami losowo <i>(wraz z istniejącymi przedmiotami)</i>.</li><li>Umieść <b>kartę postaci</b> „{{vagabond}}” w swoim slocie Karty Postaci. Umieść <b>przedmioty startowe</b> <InitialStartingItems>, </InitialStartingItems> i <FinalStartingItem/> <i>(oznaczone literą „S”)</i> w swoim Plecaku i na pasujących torach, zgodnie z potrzebą.</li></ol>`,
      },
    },
    warlord: {
      name: `Władca Szczurów`,
      summaryTitle: `Gra Władcą Szczurów`,
      summary: `<p>Jako Władca Szczurów, zdobywasz punkty, <b>nękając</b> swoich wrogów. Na koniec swojej tury, im więcej polan, którymi rządzisz, nie ma żadnych elementów wroga – żadnych wojowników, żadnych budynków, niczego – tym więcej punktów zdobywasz.</p><p>Aby rosnąć w siłę i przyciągać wojowników, musisz zdobywać przedmioty i dodawać je do swojego piętrzącego się <b>Skarbca</b>. Buty, torby i monety zwiększają twoje <b>Dowództwo</b>, podczas gdy młotki, herbaty, miecze i kusze zwiększają twoją <b>Waleczność</b>. Twoja <b>Pogarda dla Handlu</b> oznacza, że rzadko zdobywasz punkty za przekuwanie przedmiotów, ale możesz kraść przedmioty wrogom dzięki swoim <b>Szabrownikom</b>!</p><p>Szczurom przewodzi Lord, wojownik-demagog, którego kapryśny <b>Nastrój</b> daje ci zdolność na turę. Twój wódz ma obsesję na punkcie gromadzenia, więc im więcej zdobywasz przedmiotów, tym mniej Nastrojów masz do wyboru.</p><p>Deklarując się jako prawdziwy głos Leśnogrodu, możesz wzniecać <b>Szturmy</b>, które niszczą wrogie budynki i żetony oraz plądrują ruiny w poszukiwaniu przedmiotów.</p>`,
      setupTitle: `Konfiguracja Władcy Szczurów`,
      setup: {
        default: `<ol><li><b>Garnizon.</b> Umieść swojego wodza, czterech wojowników i jedną twierdzę w narożnej polanie, która nie jest polaną startową innego gracza i, jeśli to możliwe, jest po przekątnej od polany startowej.</li><li><b>Rozmieszczenie Przedmiotów.</b> Umieść przedmioty <Bag/>, <Boot/>, <Hammer/> i <Sword/> oznaczone literą „R” pod ruinami losowo, chyba że zostało to już zrobione.</li><li><b>Pozyskanie Upartego.</b> Umieść swoją kartę Nastroju „Uparty” w swoim slocie Karty Nastroju.</li></ol>`,
        vagabondSetUp: `<ol><li><b>Garnizon.</b> Umieść swojego wodza, czterech wojowników i jedną twierdzę w narożnej polanie, która nie jest polaną startową innego gracza i, jeśli to możliwe, jest po przekątnej od polany startowej.</li><li><b>Pozyskanie Upartego.</b> Umieść swoją kartę Nastroju „Uparty” w swoim slocie Karty Nastroju.</li></ol>`,
      },
      advancedSetup: {
        default: `<ol><li>Wybierz polanę ojczystą na krawędzi mapy, która ma 2+ polan między nią a ojczystymi polanami wroga.</li><li>Umieść swojego <b>wodza</b>, 4 <b>wojowników</b> i 1 <b>twierdzę</b> w swojej polanie ojczystej.</li><li>Umieść swoją <b>kartę Nastroju „Uparty”</b> w swoim slocie Karty Nastroju.</li><li>Umieść <b>przedmioty ruin</b> <Bag/>, <Boot/>, <Hammer/> i <Sword/> <i>(oznaczone literą „R”)</i> pod ruinami losowo, chyba że zostało to już zrobione.</li></ol>`,
        vagabondSetUp: `<ol><li>Wybierz polanę ojczystą na krawędzi mapy, która ma 2+ polan między nią a ojczystymi polanami wroga.</li><li>Umieść swojego <b>wodza</b>, 4 <b>wojowników</b> i 1 <b>twierdzę</b> w swojej polanie ojczystej.</li><li>Umieść swoją <b>kartę Nastroju „Uparty”</b> w swoim slocie Karty Nastroju.</li></ol>`,
      },
    },
  },
  hireling: {
    band: {
      name: `Popularny Zespół`,
      setupTitle: `Skonfiguruj Popularny Zespół`,
      setupTitle_demoted: `Skonfiguruj Uliczną Bandę`,
      setup: `Gracz {{count}}, weź kartę Zaciężnych i 5 wojowników dla Popularnego Zespołu z pudełka gry. Rozmieść 2 wojowników Zespołu, każdego w innej polanie. Umieść pozostałych wojowników i kartę obok mapy <i>(stroną niezdegradowaną do góry)</i>.`,
      setup_demoted: `Gracz {{count}}, weź kartę Zaciężnych i 5 wojowników dla Ulicznej Bandy z pudełka gry. Umieść ich obok mapy <i>(stroną zdegradowaną „Uliczna Banda” do góry)</i>.`,
    },
    bandits: {
      name: `Zbójcy`,
      setupTitle: `Skonfiguruj Zbójców`,
      setupTitle_demoted: `Skonfiguruj Gangi Bandytów`,
      setup: `Gracz {{count}}, weź kartę Zaciężnych i 4 wojowników dla Zbójców z pudełka gry. Rozmieść 2 bandytów, po jednym na ścieżce, na której jeszcze go nie ma. Umieść pozostałych bandytów i kartę obok mapy <i>(stroną niezdegradowaną do góry)</i>.`,
      setup_demoted: `Gracz {{count}}, weź kartę Zaciężnych i 4 wojowników dla Gangów Bandytów z pudełka gry. Umieść ich obok mapy <i>(stroną zdegradowaną „Gangi Bandytów” do góry)</i>.`,
    },
    dynasty: {
      name: `Ostatnia Dynastia`,
      setupTitle: `Skonfiguruj Ostatnią Dynastię`,
      setupTitle_demoted: `Skonfiguruj Ptasich Arystokratów`,
      setup: `Gracz {{count}}, weź kartę Zaciężnych i 5 wojowników dla Ostatniej Dynastii z pudełka gry. Rozmieść wszystkich 5 wojowników Dynastii w polanie na krawędzi mapy. Umieść kartę obok mapy <i>(stroną niezdegradowaną do góry)</i>.`,
      setup_demoted: `Gracz {{count}}, weź kartę Zaciężnych Ostatniej Dynastii z pudełka gry. Umieść ją obok mapy stroną zdegradowaną „Ptasi Arystokraci” do góry.`,
    },
    exile: {
      name: `Wygnaniec`,
      setupTitle: `Skonfiguruj Wygnańca`,
      setupTitle_demoted: `Skonfiguruj Bandytę`,
      setup: `Gracz {{count}}, weź kartę Zaciężnych, pionka i 3 maczugi dla Wygnańca z pudełka gry. Umieść pionek Wygnańcy w dowolnym lesie. Umieść kartę obok mapy <i>(stroną niezdegradowaną do góry)</i> i 3 maczugi na wierzchu <i>(stroną niewyczerpaną do góry)</i>.`,
      setup_demoted: `Gracz {{count}}, weź kartę Zaciężnych Wygnańca z pudełka gry. Umieść ją obok mapy stroną zdegradowaną „Bandyta” do góry. Umieść <b>przedmioty ruin</b> <Bag/>, <Boot/>, <Hammer/> i <Sword/> <i>(oznaczone literą „R”)</i> pod ruinami losowo, tak jakby Włóczęga był w grze.`,
    },
    expedition: {
      name: `Słoneczna Ekspedycja`,
      setupTitle: `Skonfiguruj Słoneczną Ekspedycję`,
      setupTitle_demoted: `Skonfiguruj Krecich Rzemieślników`,
      setup: `Gracz {{count}}, weź kartę Zaciężnych, 8 wojowników i 3 żetony przyczółków dla Słonecznej Ekspedycji z pudełka gry. Rozmieść żeton przyczółka i 3 wojowników Ekspedycji w dowolnej polanie. Umieść pozostałych wojowników, żetony i kartę obok mapy <i>(stroną niezdegradowaną do góry)</i>.`,
      setup_demoted: `Gracz {{count}}, weź kartę Zaciężnych Słonecznej Ekspedycji z pudełka gry. Umieść ją obok mapy stroną zdegradowaną „Kreci Rzemieślnicy” do góry.`,
    },
    flameBearers: {
      name: `Powiernicy Ognia`,
      setupTitle: `Skonfiguruj Powierników Ognia`,
      setupTitle_demoted: `Skonfiguruj Szczurzych Szmuglerów`,
      setup: `Gracz {{count}}, weź kartę Zaciężnych i 6 wojowników dla Powierników Ognia z pudełka gry. Rozmieść 2 wojowników Powierników Ognia w dowolnych polanach (nawet tych samych). Umieść pozostałych wojowników i kartę obok mapy <i>(stroną niezdegradowaną do góry)</i>.`,
      setup_demoted: `Gracz {{count}}, weź kartę Zaciężnych Powierników Ognia z pudełka gry. Umieść ją obok mapy stroną zdegradowaną „Szczurzy Szmuglerzy” do góry.`,
    },
    flotilla: {
      name: `Rzeczna Flotylla`,
      setupTitle: `Skonfiguruj Rzeczną Flotyllę`,
      setupTitle_demoted: `Skonfiguruj Wydrzych Nurków`,
      setup: `Gracz {{count}}, weź kartę Zaciężnych i pionka dla Rzecznej Flotylli z pudełka gry. Umieść pionka Flotylli w polanie na krawędzi mapy i rzeki. Umieść kartę obok mapy <i>(stroną niezdegradowaną do góry)</i>.`,
      setup_demoted: `Gracz {{count}}, weź kartę Zaciężnych Rzecznej Flotylli z pudełka gry. Umieść ją obok mapy stroną zdegradowaną „Wydrzy Nurkowie” do góry.`,
    },
    patrol: {
      name: `Leśny Patrol`,
      setupTitle: `Skonfiguru Leśny Patrol`,
      setupTitle_demoted: `Skonfiguruj Kocich Medyków`,
      setup: `Gracz {{count}}, weź kartę Zaciężnych i 12 wojowników dla Leśnego Patrolu z pudełka gry. Rozmieść wojownika Patrolu w każdej polanie. Umieść kartę obok mapy <i>(stroną niezdegradowaną do góry)</i>.`,
      setup_demoted: `Gracz {{count}}, weź kartę Zaciężnych Leśnego Patrolu z pudełka gry. Umieść ją obok mapy stroną zdegradowaną „Koci Medycy” do góry.`,
    },
    prophets: {
      name: `Prorocy Ciepłego Słońca`,
      setupTitle: `Skonfiguruj Proroków Ciepłego Słońca`,
      setupTitle_demoted: `Skonfiguruj Wysłanników Jaszczurów`,
      setup: `Gracz {{count}}, weź kartę Zaciężnych i 4 wojowników dla Proroków Ciepłego Słońca z pudełka gry. Rozmieść wojownika Proroków w każdej polanie z ruiną. Umieść kartę obok mapy <i>(stroną niezdegradowaną do góry)</i>.`,
      setup_demoted: `Gracz {{count}}, weź kartę Zaciężnych Proroków Ciepłego Słońca z pudełka gry. Umieść ją obok mapy stroną zdegradowaną „Wysłannicy Jaszczurów” do góry.`,
    },
    protector: {
      name: `Wściekły Opiekun`,
      setupTitle: `Skonfiguruj Wściekłego Opiekuna`,
      setupTitle_demoted: `Skonfiguruj Stoickiego Opiekuna`,
      setup: `Gracz {{count}}, weź kartę Zaciężnych i pionka dla Wściekłego Opiekuna z pudełka gry. Umieść pionek Opiekuna na dowolnej polanie. Umieść kartę obok mapy <i>(stroną niezdegradowaną do góry)</i>.`,
      setup_demoted: `Gracz {{count}}, weź kartę Zaciężnych i pionka dla Wściekłego Opiekuna z pudełka gry. Umieść ich obok mapy <i>(stroną zdegradowaną „Stoicki Opiekun” do góry)</i>.`,
    },
    spies: {
      name: `Szpiedzy Konspiracji`,
      setupTitle: `Skonfiguruj Szpiegów Konspiracji`,
      setupTitle_demoted: `Skonfiguruj Strażników Kruków`,
      setup: `Gracz {{count}}, weź kartę Zaciężnych i 6 wojowników dla Szpiegów Konspiracji z pudełka gry. Rozmieść 2 wojowników Szpiegów, po jednym w dwóch polanach o pasującym symbolu. Umieść pozostałych wojowników i kartę obok mapy <i>(stroną niezdegradowaną do góry)</i>.`,
      setup_demoted: `Gracz {{count}}, weź kartę Zaciężnych Szpiegów Konspiracji z pudełka gry. Umieść ją obok mapy stroną zdegradowaną „Strażnicy Kruków” do góry.`,
    },
    uprising: {
      name: `Wiosenne Powstanie`,
      setupTitle: `Skonfiguruj Wiosenne Powstanie`,
      setupTitle_demoted: `Skonfiguruj Króliczych Zwiadowców`,
      setup: `Gracz {{count}}, weź kartę Zaciężnych, 4 wojowników i kość powstania dla Wiosennego Powstania z pudełka gry. Rzuć kością powstania dwa razy i rozmieść wojownika Powstania w pasujących polanach. Umieść pozostałych wojowników, kość i kartę obok mapy <i>(stroną niezdegradowaną do góry)</i>.`,
      setup_demoted: `Gracz {{count}}, weź kartę Zaciężnych Wiosennego Powstania z pudełka gry. Umieść ją obok mapy stroną zdegradowaną „Króliczy Zwiadowcy” do góry.`,
    },
    vaultKeepers: {
      name: `Strażnicy Krypty`,
      setupTitle: `Skonfiguruj Strażników Krypty`,
      setupTitle_demoted: `Skonfiguruj Borsuczych Ochroniarzy`,
      setup: `Gracz {{count}}, weź kartę Zaciężnych, 6 wojowników i 6 budynków skarbca dla Strażników Skarbca z pudełka gry. Rozmieść 2 wojowników Strażników i budynek skarbca w dowolnej polanie z wolnym miejscem na budynek. Umieść pozostałych wojowników, budynki i kartę obok mapy <i>(stroną niezdegradowaną do góry)</i>.`,
      setup_demoted: `Gracz {{count}}, weź kartę Zaciężnych Strażników Krypty z pudełka gry. Umieść ją obok mapy stroną zdegradowaną „Borsuczy Ochroniarze” do góry.`,
    },
  },
  landmark: {
    city: {
      name: `Zaginione Miasto`,
      setupTitle: `Skonfiguruj Zaginione Miasto`,
      setup: `Gracz {{count}}, umieść punkt terenu Zaginione Miasto w polanie nad rzeką. Nie może zawierać punktu terenu ani z nim sąsiadować. Weź kartę punktu terenu „Zaginione Miasto” z pudełka gry i umieść ją obok mapy stroną gry do góry.`,
      setup_lake: `Gracz {{count}}, umieść punkt terenu Zaginione Miasto w polanie nad jeziorem. Nie może zawierać punktu terenu ani z nim sąsiadować. Weź kartę punktu terenu „Zaginione Miasto” z pudełka gry i umieść ją obok mapy stroną gry do góry.`,
    },
    ferry: {
      name: `Prom`,
      setupTitle: `Skonfiguruj Prom`,
      setup: `Gracz {{count}}, umieść punkt terenu Prom w polanie nad rzeką. Nie może zawierać punktu terenu ani z nim sąsiadować. Jeśli posiadasz kartę punktu terenu „Prom”, weź ją z pudełka gry i umieść obok mapy stroną gry do góry. Jeśli nie posiadasz tej karty, Prom ma następującą zasadę podczas gry:<p>„Raz na turę, gracz wykonujący ruch z polany Promu może przemieścić się do sąsiedniej polany wzdłuż rzeki, przemieszczając również Prom. <i>(Przestrzega to normalnych zasad ruchu.)</i> Po wykonaniu tego ruchu, ten gracz dobiera jedną kartę.”</p>`,
      setup_lake: `Gracz {{count}}, umieść punkt terenu Prom w polanie nad jeziorem. Nie może zawierać punktu terenu ani z nim sąsiadować. Jeśli posiadasz kartę punktu terenu „Prom”, weź ją z pudełka gry i umieść obok mapy stroną gry do góry. Jeśli nie posiadasz tej karty, Prom ma następującą zasadę podczas gry:<p>„Raz na turę, gracz wykonujący ruch z polany Promu może przemieścić się do innej polany nad jeziorem, przemieszczając również Prom. <i>(Przestrzega to normalnych zasad ruchu.)</i> Po wykonaniu tego ruchu, ten gracz dobiera jedną kartę.”</p>`,
    },
    forge: {
      name: `Legendarna Kuźnia`,
      setupTitle: `Skonfiguruj Legendarną Kuźnię`,
      setup: `Gracz {{count}}, umieść punkt terenu Legendarna Kuźnia w polanie. Nie może zawierać punktu terenu ani z nim sąsiadować. Weź kartę punktu terenu „Legendarna Kuźnia” z pudełka gry i umieść ją obok mapy stroną gry do góry.<br/>W zależności od symbolu polany Legendarniej Kuźni, usuń następujące przedmioty z puli przedmiotów na mapie i umieść je na karcie Legendarna Kuźnia:<p><Fox/>: <Sword/> <Sword/> <Crossbow/> <Hammer/></p><p><Mouse/>: <Bag/> <Bag/> <Tea/> <Tea/></p><p><Rabbit/>: <Boot/> <Boot/> <Coin/> <Coin/></p>`,
    },
    market: {
      name: `Czarny Rynek`,
      setupTitle: `Skonfiguruj Czarny Rynek`,
      setup: `Gracz {{count}}, umieść punkt terenu Czarny Rynek w polanie, która ma dokładnie jeden slot na budynek i żadnej ruiny. Nie może zawierać punktu terenu ani z nim sąsiadować. Weź kartę punktu terenu „Czarny Rynek” z pudełka gry i umieść ją obok mapy stroną gry do góry.<br/>Dobierz trzy karty, ale na nie nie patrz. Umieść je zakryte obok karty Czarnego Rynku.`,
    },
    tower: {
      name: `Wieża`,
      setupTitle: `Skonfiguruj Wieżę`,
      setup: `Gracz {{count}}, umieść punkt terenu Wieża w polanie, która ma ruinę. Nie może zawierać punktu terenu. Jeśli posiadasz kartę punktu terenu „Wieża”, weź ją z pudełka gry i umieść obok mapy stroną gry do góry. Jeśli nie posiadasz tej karty, Wieża ma następującą zasadę podczas gry:<p>„Na koniec Wieczoru gracza, jeśli kontroluje polanę Wieży, zdobywa jeden punkt.”</p>`,
    },
    treetop: {
      name: `Starszy Wierzchołek Drzewa`,
      setupTitle: `Skonfiguruj Starszy Wierzchołek Drzewa`,
      setup: `Gracz {{count}}, umieść Starszy Wierzchołek Drzewa w narożnej polanie. Nie może zawierać punktu terenu ani z nim sąsiadować. Weź kartę punktu terenu „Starszy Wierzchołek Drzewa” z pudełka gry i umieść ją obok mapy stroną gry do góry.`,
    },
  },
  map: {
    autumn: {
      name: `Jesień`,
      setupTitle: `Skonfiguruj Mapę Jesień`,
      setup: `<li>Weź planszę mapy Jesień/Zima z pudełka gry i umieść ją stroną Jesień do góry.</li>`,
      fixedSuits: `Użyj nadrukowanych symboli polan dla Mapy Jesień`,
    },
    lake: {
      name: `Jezioro`,
      setupTitle: `Skonfiguruj Mapę Jezioro`,
      setup: `<li>Weź planszę mapy Jezioro/Góry z pudełka gry i umieść ją stroną Jezioro do góry.</li>`,
      fixedSuits: `Użyj sugerowanych symboli polan dla Mapy Jezioro`,
      useLandmark: `Użyj konfiguracji specyficznej dla mapy dla punktu terenu Prom na mapie Jezioro`,
      landmarkSetup: `<li>Umieść element Promu zgodnie z poniższym wykresem. Jeśli posiadasz kartę punktu terenu „Prom”, weź ją z pudełka gry i umieść obok mapy stroną gry do góry.</li>`,
    },
    mountain: {
      name: `Góry`,
      setupTitle: `Skonfiguruj Mapę Góry`,
      setup: `<li>Weź planszę mapy Jezioro/Góry z pudełka gry i umieść ją stroną Góry do góry.</li><li>Umieść 6 żetonów zamkniętych ścieżek, aby zakryć 6 ścieżek o ciemniejszym kolorze z wykopaną ziemią.</li>`,
      fixedSuits: `Użyj sugerowanych symboli polan dla Mapy Góry`,
      useLandmark: `Użyj konfiguracji specyficznej dla mapy dla punktu terenu Wieża na mapie Góry`,
      landmarkSetup: `<li>Umieść element Wieży zgodnie z poniższym wykresem. Jeśli posiadasz kartę punktu terenu „Wieża”, weź ją z pudełka gry i umieść obok mapy stroną gry do góry.</li>`,
    },
    winter: {
      name: `Zima`,
      setupTitle: `Skonfiguruj Mapę Zima`,
      setup: `<li>Weź planszę mapy Jesień/Zima z pudełka gry i umieść ją stroną Zima do góry.</li>`,
    },
  },
  vagabond: {
    adventurer: {
      name: `Poszukiwacz Przygód`,
      action: `Improwizacja`,
      effect:
        `Raz na turę, podczas wykonywania akcji Misji, możesz traktować jeden niewyczerpany przedmiot jako dowolny inny przedmiot. Kiedy wyczerpiesz go, aby ukończyć misję, uszkodź również ten przedmiot.`,
    },
    arbiter: {
      name: `Rozjemca`,
      action: `Ochrona`,
      effect:
        `Przed rzutem kośćmi w walce, obrońca może zaciągnąć Rozjemce w polanie walki. Rozjemca zdobywa jeden punkt zwycięstwa i dodaje wszystkie swoje nieuszkodzone <Sword/> do maksymalnej liczby obrażeń zadawanych przez obrońcę. Rozjemca nie może zaciągnąć siebie ani zostać zaciągniętym przeciwko sobie.`,
    },
    harrier: {
      name: `Lotnik`,
      action: `Szybowanie`,
      effect:
        `Wyczerp <Torch/>, aby przemieścić tylko swój pionek Włóczęgi <i>(nie inne elementy)</i> do dowolnej polany <i>(nawet Wrogiej)</i> na mapie, bez wyczerpywania żadnych <Boot/>.`,
    },
    ranger: {
      name: `Strażnik`,
      action: `Kryjówka`,
      effect:
        `Wyczerp jedną <Torch/>, aby naprawić trzy przedmioty. Następnie natychmiast zakończ Dzień i rozpocznij Wieczór.`,
    },
    ronin: {
      name: `Ronin`,
      action: `Szybki Cios`,
      effect:
        `Możesz wyczerpać <Sword/>, aby zadać dodatkowe obrażenie w walce <i>(po rzucie)</i>.`,
    },
    scoundrel: {
      name: `Łotr`,
      action: `Spalona Ziemia`,
      effect:
        `Wyczerp <Torch/> i umieść ją w swojej polanie. Usuń wszystkie elementy wroga z tej polany. Elementy nie mogą być umieszczane ani przemieszczane do polany z <Torch/>. <i>(Pozostajesz w tej polanie. Gdy się z niej przemieścisz, nie możesz do niej wrócić. <Torch/> nie może zostać usunięta kartą „Przychylność...” ponieważ nie jest elementem wroga.)</i>`,
    },
    thief: {
      name: `Złodziej`,
      action: `Kradzież`,
      effect:
        `Wyczerp jedną <Torch/>, aby wziąć losową kartę od dowolnego gracza w twojej polanie.`,
    },
    tinker: {
      name: `Majsterkowicz`,
      action: `Dniówka`,
      effect:
        `Wyczerp jedną <Torch/>, aby wziąć kartę ze stosu kart odrzuconych, której symbol odpowiada twojej polanie. <i>(Zawsze możesz wziąć ptasią kartę.)</i>`,
    },
    vagrant: {
      name: `Przybłęda`,
      action: `Namowa`,
      effect:
        `Wyczerp <Torch/>, aby zainicjować walkę w swojej polanie. Ty wybierasz atakującego i obrońcę, ty wybierasz kolejność, w jakiej każdy z nich usuwa swoje budynki i żetony, i ty usuwasz elementy za każdego. <i>(Zdobywasz jeden punkt zwycięstwa za każdy usunięty budynek lub żeton dowolnego gracza oraz za każdy usunięty element wrogi dowolnego gracza.)</i>`,
    },
  },
};
