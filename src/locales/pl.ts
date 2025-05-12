/* eslint-disable import/no-anonymous-default-export */
export default {
  label: {
    aggression: `Agresja`,
    balancedSuits: {
      false: `Losowe rozmieszczenie symboli polan`,
      true: `Zrównoważone rozmieszczenie symboli polan`
    },
    changeLanguage: `Zmień język`,
    clearing: {
      fox: `Polana Lisów`,
      mouse: `Polana Myszy`,
      rabbit: `Polana Królików`
    },
    closeMessage: `Zamknij wiadomość`,
    complexity: `Złożoność`,
    crafting: `Zdolność Przekuwania`,
    disableAll: `Wyłącz Wszystkie`,
    enableAll: `Włącz Wszystkie`,
    factionRating: [`Niska`, `Umiarkowana`, `Wysoka`],
    fixedFirstPlayer: {
      false: `Losowy wybór gracza rozpoczynającego grę <i>(Gracz 1 to osoba obsługująca aplikację, Gracz 2 to osoba siedząca zgodnie z ruchem wskazówek zegara, itd.)</i>`,
      true: `Ustalony pierwszy gracz <i>(Gracz 1 to pierwszy gracz w kolejności tur, Gracz 2 to drugi, itd.)</i>`
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
      suitPriority: `<li>Zbierz 12 znaczników symboli i 12 znaczników priorytetu, a następnie umieść po jednym z każdego w każdej polanie, jak pokazano na poniższym wykresie.</li>`
    },
    playerCount: `Liczba Graczy`,
    priority: `Priorytet {{count}}`,
    rabbit: `Królik`,
    redo: `Powtórz`,
    restartSetup: `Ponownie rozpocznij konfigurację`,
    selectVagabonds: `Wybierz postacie włóczęgów, które chcesz uwzględnić w drafcie frakcji.`,
    specialAction: `Akcja Specjalna`,
    startingItems: `Przedmioty Startowe`,
    useDraft: `Użyj wyboru frakcji przez draft`,
    undo: `Cofnij`,
    wealth: `Zasobność w karty`
  },
  component: {
    buildings: `{{count}} Budynków`, //TODO odmiana
    bag: `Torba`,
    boot: `But`,
    coin: `Moneta`,
    crossbow: `Kusza`,
    hammer: `Młotek`,
    sword: `Miecz`,
    tea: `Herbata`,
    tokens: `{{count}} Żetonów`, //TODO: odmiana
    torch: `Pochodnia`,
    warriors_one: `1 Pionek`,
    warriors_other: `{{count}} Wojowników`
  },
  error: {
    baseExpansionRequired: `Do konfiguracji wymagana jest podstawowa kopia gry Root`,
    factionHirelingExcluded: `Frakcja powiązana z tym Zaciężnym jest wymagana do konfiguracji`,
    hirelingSelected: `Równoważny Zaciężny dla tej frakcji jest już w grze`,
    landmarkNotEnoughPlayers: `Za mało graczy, aby grać z tym punktem terenu`,
    lockedFaction: `Nie można wybrać ostatniej frakcji, dopóki nie zostanie wybrana frakcja Militarna`,
    mapLandmarkUsed: `Punkt terenu mapy już został uwzględniony w konfiguracji mapy`,
    noDeck: `Nie wybrano żadnej talii! Proszę wybrać przynajmniej jedną talię`,
    noFaction: `Nie wybrano żadnej Frakcji! Proszę wybrać frakcję do gry`,
    noLandmark: `Nie wybrano żadnych punktów terenu! Proszę wybrać przynajmniej jeden punkt orientacyjny lub ustawić ich liczbę na zero`,
    noMap: `Nie wybrano żadnych map! Proszę wybrać przynajmniej jedną mapę`,
    noMilitantFaction: `Nie wybrano żadnych frakcji Militarnych! Proszę wybrać przynajmniej jedną frakcję Militarną`,
    tooFewFaction: `Wybrano za mało Frakcji! Proszę wybrać więcej Frakcji, wyłączyć wybór frakcji przez draft, lub zmniejszyć liczbę graczy`,
    tooFewHireling: `Za mało Zaciężnych do przeprowadzenia konfiguracji Zaciężnych! Może to być spowodowane tym, że obecny wybór Zaciężnych wymaga usunięcia zbyt wielu frakcji z konfiguracji`,
    tooFewLandmark: `Wybrano za mało punktów terenu! Proszę wybrać więcej punktów terenu lub zmniejszyć ich liczbę`,
    tooFewPlayerInsurgent: `Nie można używać frakcji niemilitarnych z mniej niż 3 graczami i bez botów lub zaciężnych`,
    tooFewVagabond: `Wybrano za mało postaci Włóczęgi! Proszę uwzględnić więcej postaci Włóczęgi lub wykluczyć niektóre Frakcje Włóczęgi`,
    tooManyCornerSetup: `Zbyt wiele wybranych frakcji wymaga polany narożnej do konfiguracji! Proszę zwiększyć wybór frakcji lub włączyć wybór frakcji przez draft`
  },
  setupStep: {
    chooseExpansions: {
      body: `Witaj w Zautomatyzowanej Konfiguracji Root. Ta strona poprowadzi Cię przez zaawansowane zasady konfiguracji popularnej gry planszowej Root, z minimalnym tasowaniem i bez kart konfiguracji! Aby rozpocząć, wybierz zawartość Root, w którą grasz. Gdy będziesz gotowy do przejścia do następnego kroku, użyj przycisków na dole strony, aby to zrobić.`,
      title: `Wybierz Rozszerzenia`
    },
    seatPlayers: {
      body: `Ustal kolejność siedzenia graczy, a następnie wybierz, ilu graczy bierze udział w grze i czy chcesz, aby aplikacja wybrała losowego gracza rozpoczynającego.`,
      title: `Rozmieść Graczy`
    },
    chooseMap: {
      body: `W grupie zdecydujcie, na której mapie chcecie grać. Jeśli wybierzecie wiele map, zostanie wybrana losowa mapa.`,
      title: `Wybierz i Skonfiguruj Mapę`
    },
    setUpMap: {
      body: `<li>Umieść ruinę w każdym slocie na mapie oznaczonym literą „R” <i>(łącznie cztery)</i>.</li><li>Umieść następujące przedmioty na pasujących polach puli przedmiotów w górnej części mapy: 2 <Boot/>, 2 <Bag/>, 1 <Crossbow/>, 1 <Hammer/>, 2 <Sword/>, 2 <Tea/>, 2 <Coin/>.</li><li>Umieść dwie kości obok mapy.</li>`,
      title: `Skonfiguruj Mapę`
    },
    chooseDeck: {
      body: `W grupie zdecydujcie, której talii chcecie użyć. Jeśli wybierzecie wiele talii, zostanie wybrana losowa talia.`,
      title: `Wybierz i Skonfiguruj Talię`
    },
    setUpDeck: {
      title: `Skonfiguruj Talię`
    },
    setUpBots: {
      body: `W grupie zdecydujcie, z którymi botami chcecie grać, postępując zgodnie z ich instrukcjami konfiguracji, opisanymi w Księdze Praw Rootbotyki.`,
      title: `Skonfiguruj Boty`
    },
    chooseLandmarks: {
      body: `W grupie zdecydujcie, z iloma punktami terenu chcecie grać i które z nich mają zostać uwzględnione w puli wyboru.`,
      body_mapLandmark: `W grupie zdecydujcie, z iloma punktami terenu chcecie grać <i>(oprócz już uwzględnionego punktu terenu mapy)</i> i które z nich mają zostać uwzględnione w puli wyboru.`,
      title: `Skonfiguruj Punkty Terenu`
    },
    chooseHirelings: {
      body: `W grupie zdecydujcie, czy chcecie grać z Zaciężnymi i które z nich mają zostać uwzględnione w puli wyboru.`,
      title: `Skonfiguruj Zaciężnych`
    },
    postHirelingSetup: {
      body: `Umieść trzy znaczniki Zaciężnych - oznaczone „4”, „8” i „12” - na polach „4”, „8” i „12” toru punktacji na mapie.`,
      subtitle: `Rozmieść Znaczniki Zaciężnych`
    },
    drawCards: {
      body: `Każdy gracz dobiera pięć kart ze wspólnej talii. <i>(Trzy karty do zatrzymania wybierzesz później.)</i>`,
      title: `Dobierz Pięć Kart`
    },
    chooseFactions: {
      body: `W grupie wybierzcie, które frakcje chcecie uwzględnić w konfiguracji.`,
      title: `Skonfiguruj Frakcje`
    },
    selectFaction: {
      body: `Przydziel jedną z poniższych frakcji każdemu graczowi w dowolny sposób. Frakcje zostaną skonfigurowane od lewej do prawej. Możesz swobodnie wybierać frakcje z listy, aby zobaczyć ich statystyki.`,
      body_useDraft: `Gracz {{count}}, wybierz frakcję, którą chcesz zagrać z poniższej puli frakcji. Możesz swobodnie wybierać frakcje z listy, aby zobaczyć ich statystyki, zanim potwierdzisz swój wybór, naciskając „Następny Krok”.`,
      subtitle: `Przydziel Frakcje`,
      subtitle_useDraft: `Wybierz Frakcję`
    },
    placeScoreMarkers: {
      body: `Każdy gracz umieszcza znacznik punktacji swojej wybranej frakcji na polu „0” toru Punktacji.`,
      body_vagabondSetUp: `Każdy gracz umieszcza znacznik punktacji swojej wybranej frakcji na polu „0” toru Punktacji. Każdy gracz Włóczęgi umieszcza znacznik relacji dla każdej frakcji innej niż Włóczęga w grze na polu Neutralnym na swojej tabeli Relacji.`,
      title: `Rozmieść Znaczniki Punktacji`,
      title_vagabondSetUp: `Rozmieść Znaczniki Punktacji i Relacji`
    },
    chooseHand: {
      body: `Każdy gracz wybiera trzy karty z ręki do zatrzymania i kładzie pozostałe dwie karty zakryte na wspólnym stosie. Po zakończeniu, potasuj wspólną talię.`,
      title: `Wybierz Rękę Startową`
    },
    setupEnd: {
      body: `Konfiguracja została zakończona. Gra rozpocznie się od Gracza {{count}}. Jeśli chcesz ponownie uruchomić proces konfiguracji, użyj poniższego przycisku.<p><i>„Root Automated Setup” stworzone przez Ewena Camerona</i><br/><i>Na podstawie gry planszowej „Root” wydanej przez Leder Games</i><br/><i>Aplikacja licencjonowana na CC BY-NC-SA 4.0</i></p>`,
      title: `Rozpocznij Grę`
    }
  },
  deck: {
    exiles: {
      name: `Wygnańcy i Partyzanci`,
      setup: `Weź talię Wygnańców i Partyzantów z pudełka gry i umieść ją obok mapy. Potasuj talię.`,
      setup_twoPlayer: `Weź talię Wygnańców i Partyzantów z pudełka gry i umieść ją obok mapy. Usuń wszystkie cztery karty Dominacji z talii. Potasuj talię.`,
      setupTitle: `Skonfiguruj Talię Wygnańców i Partyzantów`
    },
    standard: {
      name: `Standardowa`,
      setup: `Weź talię Standardową z pudełka gry i umieść ją obok mapy. Potasuj talię.`,
      setup_twoPlayer: `Weź talię Standardową z pudełka gry i umieść ją obok mapy. Usuń wszystkie cztery karty Dominacji z talii. Potasuj talię.`,
      setupTitle: `Skonfiguruj Talię Standardową`
    }
  },
  expansion: {
    exilesDeck: `Talia Wygnańców i Partyzantów`,
    landmarkPack: `Pakiet Punktów Terenu`,
    marauder: `Rozszerzenie Maruderzy`,
    marauderHirelings: `Pakiet Zaciężnych Maruderzy`,
    riverfolk: `Rozszerzenie Plemiona Rzecznych`,
    riverfolkHirelings: `Pakiet Zaciężnych Plemiona Rzecznych`,
    root: `Root`,
    underworld: `Rozszerzenie Podziemia`,
    underworldHirelings: `Pakiet Zaciężnych Podziemia`,
    vagabondPack: `Pakiet Włóczęgi`
  },
  faction: {
    alliance: {
      name: `Sojusz Stworzeń Leśnych`,
      summary: `<p>Jako Sojusz Stworzeń Leśnych, starasz się pozyskać sympatię uciśnionych stworzeń leśnych. Za każdym razem, gdy umieścisz <b>żeton Sympatyków</b> na mapie, zdobywasz punkty. Im więcej żetonów Sympatyków na mapie, tym więcej punktów zdobywasz.</p><p>Aby zdobyć sympatię, potrzebujesz jednak <b>Stronników</b> — kart umieszczonych na twojej planszy frakcji — pasujących do polan, na których chcesz zdobyć sympatię. Chociaż możesz dodawać własne karty do swoich Stronników, możesz też sprowokować swoich wrogów, aby zrobili to samo, wywołując <b>Bunt</b>: za każdym razem, gdy inna frakcja usuwa sympatyków lub przemieszcza wojowników na polanę z Sympatykami, musi dodać jedną ze swoich kart do twoich Stronników.</p><p>Nie bój się tworzyć punktów strategicznych, ponieważ jesteś ekspertem w <b>Wojnie Partyzanckiej</b>: broniąc się w walce, używasz wyższego wyniku z kości. Umieszczaj swoich sympatyków na polanach, gdzie prawdopodobny jest konflikt, i zmuszaj przeciwnika do stawienia ci czoła!</p><p>Stronników można również wykorzystać do gwałtownej <b>Rewolty</b>, która niszczy <i>wszystkie</i> elementy twoich wrogów na polanie i umieszcza tam wojowników oraz nową <b>Bazę</b>. Bazy nie tylko zwiększają dobieranie kart, ale także pozwalają szkolić <b>Oficerów</b>, którzy dają darmowe akcje w każdej turze. Chroń swoje Bazy dobrze! Jeśli stracisz Bazę, stracisz również wielu Stronników i Oficerów.</p>`,
      summaryTitle: `Gra Sojuszem`,
      advancedSetup: `<ol><li>Dobierz 3 <b>karty</b> i dodaj je zakryte do stosu Stronników.</li><li>Uzupełnij swój tor Sympatyków <b>żetonami Sympatyków</b>.</li><li>Umieść swoje 3 <b>Bazy</b> na pasujących polach w swoim pudełku Baz.</li></ol>`,
      setup: `<ol><li><b>Przygotowanie Wojowników.</b> Stwórz pulę 10 wojowników.</li><li><b>Rozmieszczenie Baz.</b> Umieść 3 Bazy na pasujących polach w swoim pudełku Baz.</li><li><b>Uzupełnienie Toru Sympatyków.</b> Umieść 10 żetonów Sympatyków na swoim torze Sympatyków.</li><li><b>Pozyskanie Stronników.</b> Dobierz 3 karty i umieść je zakryte na swoim stosie Stronników.</li></ol>`,
      setupTitle: `Konfiguracja Sojuszu Stworzeń Leśnych`
    },
    corvid: {
      name: `Krucza Konspiracja`,
      summaryTitle: `Gra Kruczą Konspiracją`,
      summary: `<p>Krucza Konspiracja działa w ukryciu, wplatając się w sieć intryg i rozprzestrzeniając chaos w Lesie. Każda z czterech akcji Konspiracji – <b>Przymus</b>, <b>Rabunek</b>, <b>Pułapka</b> i <b>Groźba</b> – pozwala ci stawiać żetony na mapie, które przynoszą ci punkty zwycięstwa, jeśli zostaną ujawnione. Ale pamiętaj, każda twoja akcja jest widoczna dla przeciwników, którzy mogą udaremnić twoje plany, jeśli odgadną symbol polany, na której zamierzasz działać. Za to, jeśli twój przeciwnik pomyli się, twój żeton przyniesie podwójne punkty.</p><p>Z każdym nowo umieszczonym żetonem, Konspiracja staje się silniejsza, zwiększając swoje możliwości dzięki <b>Ujawnionym Akcjom</b>, które dają ci więcej akcji do wykonania w Dzień. Użyj swojej zdolności <b>Ukryte Wiadomości</b>, aby zdobyć karty z ręki przeciwników, co pomoże ci w twoich tajnych operacjach. Pamiętaj, że twoja siła leży w manipulacji i zaskoczeniu.</p><p>Jeśli udaremnisz czyjąś akcję, otrzymujesz Punkty Zwycięstwa. Wykorzystaj to, aby podwójnie czerpać korzyści ze swojej ukrytej działalności. Konspiracja ma także zdolność <b>Bomby</b>, która pozwala zadać natychmiastowe obrażenia wszystkim wojownikom na polanie, niszcząc strategiczne punkty przeciwnika. To potężne narzędzie, które możesz użyć w najmniej spodziewanym momencie.</p>`,
      advancedSetup: `<ol><li>Dobierz 3 <b>karty</b> i umieść je zakryte w swoim obszarze rozgrywki.</li><li>Umieść 3 <b>żetony intrygi</b> (jeden z każdego typu: Przymus, Rabunek, Pułapka) na swojej planszy frakcji, tak aby symbol Przymusu był po lewej, a symbol Pułapki po prawej.</li><li>Umieść pozostałe <b>żetony intrygi</b> na swoim torze Intryg.</li></ol>`,
      setup: `<ol><li><b>Przygotowanie Wojowników.</b> Stwórz pulę 20 wojowników.</li><li><b>Rozmieszczenie Żetonów Intrygi.</b> Umieść 3 żetony intrygi (po jednym z każdego typu: Przymus, Rabunek, Pułapka) na swojej planszy frakcji, tak aby symbol Przymusu był po lewej, a symbol Pułapki po prawej.</li><li><b>Uzupełnienie Toru Intryg.</b> Umieść pozostałe żetony intrygi na swoim torze Intryg.</li><li><b>Pozyskanie Kart.</b> Dobierz 3 karty i umieść je zakryte w swoim obszarze rozgrywki.</li></ol>`,
      setupTitle: `Konfiguracja Kruczej Konspiracji`
    },
    duchess: {
      name: `Księżna`,
      summaryTitle: `Gra Księżną`,
      summary: `<p>Jako Księżna, dowodzisz podziemnym wojskiem, które koncentruje się na ekspansji i kontroli. Twoja główna siła tkwi w liczebności i zdolności do szybkiego przemieszczania swoich wojowników. Akcje Księżnej skupiają się na strategicznym rozmieszczaniu i ruchu, co pozwala na dynamiczne reagowanie na zagrożenia i zdobywanie kontroli nad polanami. Twoi wojownicy są nieustępliwi w dążeniu do celu, dążąc do dominacji nad Leśnogrodem.</p><p>Księżna zdobywa Punkty Zwycięstwa za każde usunięcie budynków i żetonów przeciwnika, co promuje agresywną grę. Możesz także zdobywać punkty za przekuwanie kart, co daje elastyczność w dostosowywaniu się do sytuacji na mapie. Twoja frakcja ma dostęp do unikalnych zdolności, które wspierają militarne działania i pozwalają na szybkie odzyskiwanie utraconych pozycji.</p><p>Twoim celem jest utrzymanie kontroli nad jak największą liczbą polan, co wzmacnia twoją pozycję i umożliwia rekrutowanie nowych wojowników. Wykorzystaj swoje zasoby, aby budować silną armię i dominować na polu bitwy. Kluczowe dla Księżnej jest utrzymywanie ciągłej presji na przeciwników i wykorzystywanie ich słabych punktów, aby osiągnąć zwycięstwo.</p>`,
      advancedSetup: `<ol><li>Dobierz 3 <b>karty</b>.</li><li>Umieść 1 <b>Tartak</b>, 1 <b>Warsztat</b> i 1 <b>Koszary</b> na swoich planszach frakcji.</li><li>Umieść pozostałe <b>budynki</b> na swoich torach budynków.</li></ol>`,
      setup: `<ol><li><b>Przygotowanie Wojowników i Drewna.</b> Stwórz pulę 25 wojowników i 8 żetonów drewna.</li><li><b>Gracz wybiera dowolną narożną polanę i rozmieszcza na niej żeton Twierdzy.</b> Jest to startowa polana Księżnej.</li><li><b>Garnizon.</b> Gracz rozmieszcza po jednym wojowniku na każdej polanie, oprócz narożnej polany leżącej po przekątnej od polany z Twierdzą.</li><li><b>Rozmieszczenie Startowych Budynków.</b> Gracz rozmieszcza 1 Tartak, 1 Warsztat oraz 1 Koszary na polanie z Twierdzą i/lub na dowolnych sąsiadujących z nią polanach, w dowolnej kombinacji.</li><li><b>Uzupełnienie Torów Budynków.</b> Pozostałe 5 Tartaków, 5 Warsztatów i 5 Koszar gracz rozmieszcza od prawej do lewej na odpowiednich torach budynków na planszy Frakcji.</li></ol>`,
      setupTitle: `Konfiguracja Księżnej`
    },
    eyrie: {
      name: `Dynastie Orlich Gniazd`,
      summaryTitle: `Gra Dynastiami Orlich Gniazd`,
      summary: `<p>Dynastie Orlich Gniazd dążą do przejęcia kontroli nad polanami i odzyskania chwały, jaką niegdyś cieszył się ich ród w Leśnogrodzie. Podczas swojego Wieczoru gracz Dynastii otrzymuje Punkty Zwycięstwa w oparciu o liczbę <b>Gniazd</b> posiadanych na Mapie. Im więcej Gniazd w Leśnogrodzie, tym więcej Punktów Zwycięstwa otrzymuje.</p><p>Niemniej poczynania Orlich Gniazd wiąże <b>Dekret</b>, stale rozrastający się zestaw akcji obowiązkowych obiecanych przez ich Przywódcę. W trakcie każdej tury gracz musi przeprowadzić wszystkie akcje wymienione w Dekrecie. W przeciwnym wypadku wybuchają <b>Zamieszki</b>. Gdy dochodzi do Zamieszek, tracisz Punkty Zwycięstwa, odrzucasz większość kart z Dekretu, a twój Przywódca zostaje usunięty z urzędu, zmuszając cię do wybrania nowego. To zmusza cię do ciągłego dostosowywania się do nowych warunków i nieprzewidzianych okoliczności.</p><p>Orle Gniazda kontrolują polanę również wtedy, gdy posiadają na niej łącznie tyle samo wojowników i budynków, co gracz posiadający ich na tej polanie najwięcej. Oznacza to, że łatwiej im utrzymać kontrolę, co jest kluczowe dla realizacji ich celów.</p>`,
      advancedSetup: `<ol><li>Dobierz 3 <b>karty</b>.</li><li>Wybierz jednego z czterech <b>Przywódców</b> Dynastii Orlich Gniazd i połóż jego kartę na polu „Karta Przywódcy”. Pozostałe karty Przywódców połóż odkryte w swoim obszarze rozgrywki.</li><li>Wsuń 2 karty <b>Lojalnych Wezyrów</b> pod swoją planszę Frakcji tak, aby ich symbole były widoczne w kolumnach Dekretu wskazanych przez wybraną kartę Przywódcy.</li><li>Pozostałe <b>Gniazda</b> rozmieść od prawej do lewej na torze Gniazd.</li></ol>`,
      setup: `<ol><li><b>Przygotowanie Wojowników.</b> Stwórz pulę 20 wojowników.</li><li><b>Rozmieszczenie Gniazda i Wojowników.</b> Rozmieść 1 Gniazdo i 6 wojowników na narożnej polanie, która nie jest polaną startową innego gracza i, jeśli to możliwe, po przekątnej od innej startowej polany.</li><li><b>Wybór Przywódcy.</b> Wybierz jednego spośród czterech Przywódców Dynastii Orlich Gniazd i połóż jego kartę na polu „Karta Przywódcy”. Pozostałe karty Przywódców połóż odkryte w swoim obszarze rozgrywki.</li><li><b>Lojalni Wezyrowie.</b> Wsuń 2 karty Lojalnych Wezyrów pod swoją planszę Frakcji tak, aby ich symbole były widoczne w kolumnach Dekretu wskazanych przez wybraną kartę Przywódcy.</li><li><b>Uzupełnienie Toru Gniazd.</b> Pozostałe Gniazda rozmieść od prawej do lewej na torze Gniazd.</li></ol>`,
      setupTitle: `Konfiguracja Dynastii Orlich Gniazd`
    },
    lizards: {
      name: `Jaszczurzy Kultyści`,
      summaryTitle: `Gra Jaszczurzymi Kultystami`,
      summary: `<p>Jaszczurzy Kultyści to sekta dążąca do nawrócenia całego Leśnogrodu. Ich siła rośnie wraz z liczbą <b>Ogrodów</b>, które rozmieszczają na mapie. Za każdy Ogród zdobywasz Punkty Zwycięstwa, a im więcej Ogrodów, tym więcej punktów. Jednak, aby wznieść Ogród, musisz kontrolować polanę i symbol na karcie musi odpowiadać symbolowi polany. Wasza wiara i oddanie są kluczem do sukcesu.</p><p>Każdego Świtu ogłaszacie <b>Wojnę Świętą</b> na polanie z najmniejszą liczbą wojowników, a jeśli uda wam się usunąć stamtąd przeciwnika, zdobywasz Punkty Zwycięstwa. To zmusza przeciwników do stałego monitorowania waszych działań. W walce, jako atakujący, zawsze zadajecie jedno dodatkowe obrażenie za każdego wojownika Jaszczurzych Kultystów, który został usunięty podczas tego ataku. To jest <b>Wojna Święta</b>.</p><p>Jaszczurzy Kultyści posiadają unikalne mechaniki zarządzania kartami. Możecie <b>Prorokować</b>, zagrywając ptasią kartę, aby manipulować kartami na stosie kart odrzuconych. To pozwala wam planować swoje ruchy z wyprzedzeniem i kontrolować talii. Waszym celem jest rozprzestrzenianie wiary i zdobywanie dominacji nad Leśnogrodem poprzez nawracanie i militaryzację.</p>`,
      advancedSetup: `<ol><li>Dobierz 3 <b>karty</b>.</li><li>Umieść 1 <b>Ogród</b> na swojej planszy frakcji.</li><li>Umieść pozostałe <b>Ogrodów</b> na swoim torze Ogrodów.</li></ol>`,
      setup: `<ol><li><b>Przygotowanie Wojowników.</b> Stwórz pulę 25 wojowników.</li><li><b>Rozmieszczenie Wojowników.</b> Rozmieść 10 wojowników na planszy gry: po 2 wojowników na każdej narożnej polanie i po 1 wojowniku na każdej polanie sąsiadującej z polaną z ruinami.</li><li><b>Rozmieszczenie Ogrodów.</b> Umieść 1 Ogród na swojej planszy frakcji.</li><li><b>Uzupełnienie Toru Ogrodów.</b> Pozostałe Ogrody rozmieść od prawej do lewej na torze Ogrodów.</li></ol>`,
      setupTitle: `Konfiguracja Jaszczurzych Kultystów`
    },
    marquise: {
      name: `Markiza de Kot`,
      summaryTitle: `Gra Markizą de Kot`,
      summary: `<p>Markiza de Kot rezyduje w Leśnogrodzie, który planuje zamienić w potęgę przemysłową i militarną. Za każdym razem, gdy Markiza wznosi jeden ze swoich <b>Budynków</b> – Warsztat, Tartak albo Koszary – otrzymuje Punkty Zwycięstwa. Im więcej budynków danego typu znajduje się na Mapie, tym więcej Punktów Zwycięstwa otrzymuje. Jednak aby napędzać ciągłą rozbudowę, Markiza musi utrzymać i chronić potężną, wzajemnie połączoną gospodarkę <b>Drzewną</b>.</p><p>Markiza ma zdolność <b>Twierdzy</b>, co oznacza, że tylko ona może rozmieszczać swoje komponenty na polanie z żetonem Twierdzy. Inni gracze mogą jednak przemieszczać swoje komponenty na tę polanę. To daje Markizie strategiczną przewagę w obronie kluczowych pozycji. Dodatkowo, dzięki <b>Szpitalom Polowym</b>, Markiza może wydać kartę z odpowiadającym polanie symbolem, aby rozmieścić wszystkich usuniętych wojowników na polanie z Twierdzą. To umożliwia szybkie wzmocnienie obrony i utrzymanie przewagi liczebnej.</p><p>Twoim celem jest dominacja poprzez budowę i rozbudowę, kontrolując przepływ drewna, który jest paliwem twojej machiny wojennej. Każdy Tartak zwiększa produkcję drewna, co jest kluczowe dla wznoszenia kolejnych budynków i zdobywania Punktów Zwycięstwa.</p>`,
      advancedSetup: `<ol><li>Dobierz 3 <b>karty</b>.</li><li>Umieść 1 <b>Tartak</b>, 1 <b>Warsztat</b> i 1 <b>Koszary</b> na swoich planszach frakcji.</li><li>Umieść pozostałe <b>budynki</b> na swoich torach budynków.</li></ol>`,
      setup: `<ol><li><b>Przygotowanie Wojowników i Drewna.</b> Stwórz pulę 25 wojowników i 8 żetonów drewna.</li><li><b>Gracz wybiera dowolną narożną polanę i rozmieszcza na niej żeton Twierdzy.</b> Jest to startowa polana Markizy.</li><li><b>Garnizon.</b> Gracz rozmieszcza po jednym wojowniku na każdej polanie, oprócz narożnej polany leżącej po przekątnej od polany z Twierdzą.</li><li><b>Rozmieszczenie Startowych Budynków.</b> Gracz rozmieszcza 1 Tartak, 1 Warsztat oraz 1 Koszary na polanie z Twierdzą i/lub na dowolnych sąsiadujących z nią polanach, w dowolnej kombinacji.</li><li><b>Uzupełnienie Torów Budynków.</b> Pozostałe 5 Tartaków, 5 Warsztatów i 5 Koszar gracz rozmieszcza od prawej do lewej na odpowiednich torach budynków na planszy Frakcji.</li></ol>`,
      setupTitle: `Konfiguracja Markizy de Kot`
    },
    riverfolk: {
      name: `Kompania Plemion Rzecznych`,
      summaryTitle: `Gra Kompanią Plemion Rzecznych`,
      summary: `<p>Kompania Plemion Rzecznych to frakcja handlowa, która rozwija się dzięki oferowaniu różnorodnych usług innym graczom. Twoja strategia opiera się na <b>Transakcjach</b>: inni gracze mogą płacić ci kartami, aby korzystać z twoich zdolności, takich jak ruch rzekami, handel przedmiotami, czy korzystanie z zaciężnych. Im więcej usług oferujesz, tym więcej zyskujesz, co przekłada się na Punkty Zwycięstwa.</p><p>Kiedy inny gracz wykonuje transakcję, umieszczasz znaczniki usług na torze punktacji, co zwiększa twoje punkty zwycięstwa na koniec tury. Pamiętaj, że każda transakcja to dla ciebie zysk, a dla przeciwników koszt. Twoje <b>Przekuwanie</b> odbywa się poprzez aktywację <b>Kantorów Handlowych</b>, co umożliwia ci zdobywanie przedmiotów i innych efektów z kart.</p><p>Kompania Plemion Rzecznych posiada zdolność <b>Wiosenne Powodzie</b>, która pozwala im poruszać się między polanami połączonymi rzekami, nawet jeśli nie są one sąsiadujące. To daje ci niesamowitą elastyczność w przemieszczaniu się po mapie i docieraniu do kluczowych miejsc. Twoja frakcja może również rekrutować <b>Zaciężnych</b>, którzy są dodatkowymi wojownikami, którzy mogą być aktywowani przez karty, co zwiększa twoje militarne możliwości.</p><p>Twoim celem jest stworzenie prosperującej sieci handlowej, która kontroluje przepływ dóbr i usług w Leśnogrodzie, co ostatecznie doprowadzi cię do zwycięstwa.</p>`,
      advancedSetup: `<ol><li>Dobierz 3 <b>karty</b>.</li><li>Umieść 1 <b>Kantor Handlowy</b>, 1 <b>Port Rzeczny</b> i 1 <b>Punkt Zaciężnych</b> na swoich planszach frakcji.</li><li>Umieść pozostałe <b>budynki</b> na swoich torach budynków.</li></ol>`,
      setup: `<ol><li><b>Przygotowanie Wojowników.</b> Stwórz pulę 15 wojowników.</li><li><b>Rozmieszczenie Kantorów Handlowych.</b> Umieść po jednym Kantorze Handlowym na każdej polanie z rzeką.</li><li><b>Rozmieszczenie Punktów Zaciężnych.</b> Umieść po jednym Punkcie Zaciężnych na każdej polanie z ruinami.</li><li><b>Uzupełnienie Torów Budynków.</b> Pozostałe 5 Kantorów Handlowych, 5 Portów Rzecznych i 5 Punktów Zaciężnych gracz rozmieszcza od prawej do lewej na odpowiednich torach budynków na planszy Frakcji.</li><li><b>Pozyskanie Kart.</b> Dobierz 3 karty.</li></ol>`,
      setupTitle: `Konfiguracja Kompanii Plemion Rzecznych`
    },
    vagabond: {
      name: `Włóczęga`,
      summaryTitle: `Gra Włóczęgą`,
      summary: `<p>Włóczęga gra po każdej stronie konfliktu, wykonując różne zadania, aby zwiększyć swoją sławę w Leśnogrodzie. Za każdym razem, gdy Włóczęga poprawia swoją <b>Relację</b> z inną Frakcją albo usuwa komponent należący do swojego Wroga, otrzymuje Punkty Zwycięstwa. Może także otrzymać Punkty Zwycięstwa za wykonanie <b>Misji</b>.</p><p>Aby efektywnie działać i poruszać się po Leśnogrodzie, Włóczęga musi zarządzać swoimi <b>Przedmiotami</b> i zwiększać ich liczbę poprzez eksplorację Ruin Leśnogrodu oraz udzielanie pomocy pozostałym Frakcjom. Pionek Włóczęgi nie jest wojownikiem i nie może kontrolować polany ani powstrzymać innego gracza przed kontrolą polan. Jest jednak <b>Samotnym Wędrowcem</b>, który może poruszać się między polanami bez względu na to, które Frakcje kontrolują początkową i docelową polanę.</p><p>Włóczęga jest <b>Zwinny</b> i może poruszać się między polanami bez względu na kontrolę. Jednak w walce, jeśli Włóczęga nie posiada żadnego nieuszkodzonego, jest <b>Bezbronny</b>. Każde obrażenie, jakie Włóczęga otrzymuje, powoduje uszkodzenie jednego nieuszkodzonego przedmiotu. Kluczem do sukcesu Włóczęgi jest budowanie relacji z innymi frakcjami i wykorzystywanie przedmiotów do wykonywania akcji.</p>`,
      advancedSetup: `<ol><li>Dobierz 3 <b>karty</b>.</li><li>Umieść 1 <b>Latarnię</b>, 1 <b>Torczycę</b> i 1 <b>But</b> na swoich planszach frakcji.</li><li>Umieść pozostałe <b>przedmioty</b> na swoich torach przedmiotów.</li></ol>`,
      setup: `<ol><li><b>Przygotowanie Wojowników i Pionka.</b> Stwórz pulę 1 pionka i 5 wojowników.</li><li><b>Rozmieszczenie Pionka Włóczęgi.</b> Umieść pionek Włóczęgi na dowolnej polanie z ruinami.</li><li><b>Przygotowanie Przedmiotów.</b> Umieść po 1 latarni, 1 torczycy, 1 bucie, 1 torbie i 1 mieczu na polu Plecak na swojej planszy Frakcji.</li><li><b>Uzupełnienie Torów Przedmiotów.</b> Pozostałe przedmioty rozmieść od prawej do lewej na odpowiednich torach przedmiotów na planszy Frakcji.</li><li><b>Dobranie Misji.</b> Dobierz 2 karty Misji.</li></ol>`,
      setupTitle: `Konfiguracja Włóczęgi`
    },
    warlord: {
      name: `Wódz`,
      summaryTitle: `Gra Wodzem`,
      summary: `<p>Wódz to frakcja nastawiona na brutalną siłę i podbój. Twoje działania skupiają się na nieustannym przemieszczaniu wojowników i inicjowaniu walki. Za każdym razem, gdy usuniesz budynek lub żeton przeciwnika, zdobywasz Punkty Zwycięstwa, a twoja militarne działania są nagradzane. Twoim celem jest rozprzestrzenianie paniki i kontrola nad jak największą liczbą polan.</p><p>Wódz posiada zdolność <b>Wojna Totalna</b>, co oznacza, że w każdej walce zadaje dodatkowe obrażenia, niezależnie od liczby wojowników na polanie. To czyni twoje ataki niezwykle skutecznymi i przerażającymi dla przeciwników. Możesz także wykorzystać swoją zdolność <b>Piorunująca Szarża</b>, aby przemieszczać się z dużą szybkością i zaskakiwać przeciwników, co daje ci przewagę strategiczną na polu bitwy.</p><p>Twoja frakcja ma dostęp do unikalnych <b>Zaciężnych</b>, którzy zwiększają twoje militarne możliwości i pozwalają na jeszcze bardziej agresywną grę. Wódz może również rekrutować <b>Elitarne Oddziały</b>, które są silniejszymi wojownikami, zwiększającymi twoją moc bojową. Kluczem do zwycięstwa Wodza jest ciągła agresja i utrzymywanie przewagi militarnej na mapie.</p>`,
      advancedSetup: `<ol><li>Dobierz 3 <b>karty</b>.</li><li>Umieść 1 <b>Wojenny Obóz</b>, 1 <b>Punkt Zaciężnych</b> i 1 <b>Punkt Zaciężnych</b> na swoich planszach frakcji.</li><li>Umieść pozostałe <b>budynki</b> na swoich torach budynków.</li></ol>`,
      setup: `<ol><li><b>Przygotowanie Wojowników.</b> Stwórz pulę 25 wojowników.</li><li><b>Rozmieszczenie Wojowników.</b> Umieść po 2 wojowników na każdej narożnej polanie i po 1 wojowniku na każdej polanie sąsiadującej z polaną z ruinami.</li><li><b>Rozmieszczenie Budynków.</b> Umieść po 1 Wojennym Obozie na każdej polanie z rzeką i po 1 Punkcie Zaciężnych na każdej polanie z ruinami.</li><li><b>Uzupełnienie Torów Budynków.</b> Pozostałe 5 Wojennych Obozów i 5 Punktów Zaciężnych gracz rozmieszcza od prawej do lewej na odpowiednich torach budynków na planszy Frakcji.</li><li><b>Pozyskanie Kart.</b> Dobierz 3 karty.</li></ol>`,
      setupTitle: `Konfiguracja Wodza`
    }
  }
}