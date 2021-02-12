export const classSkillsDatabase: AllRawClassSkills = {
  knight: {
    skill1: {
      name: "Szybkie Cięcie",
      description: "Silniejszy i celniejszy niż podstawowy cios bronią.",
      image: "images/Szybkie_Cięcie.jpg",
      type: "attack",
      attackType: "melee",
      hitType: "agility",
      damageFormula: {
        strengthCoeff: 0.6,
        agilityCoeff: 0.3,
        weapon: true,
      },
      damageMod: [110, 122, 134, 146, 158, 172, 186],
      hittingMod: calculateLinearEffect(120, 5),
      cost: {
        endurance: [12, 14, 16, 18, 19, 21, 23],
      },
      target: "single",
    },
    skill2: {
      name: "Mierzony Cios",
      description:
        "Skutecznie przeprowadzony atak oszałamia ofiarę obniżając efektywność jej ataków dystansowych i uroków. Dodatkowo podnosi obrażenia Potężnego uderzenia o 15%.",
      image: "images/Mierzony_Cios.jpg",
      type: "attack",
      attackType: "melee",
      hitType: "agility",
      damageFormula: {
        strengthCoeff: 0.7,
        agilityCoeff: 0.3,
        weapon: true,
      },
      damageMod: calculateLinearEffect(80, 8),
      hittingMod: [100, 103, 107, 110, 112, 115, 118],
      cost: {
        endurance: calculateLinearEffect(20, 3),
      },
      target: "single",
      effects: [
        {
          name: "Modyfikator trafień dystansowych",
          effect: [-25, -28, -31, -34, -37, -41, -45],
        },
        {
          name: "Modyfikator trafień magicznych",
          effect: [-25, -28, -31, -34, -37, -41, -45],
        },
        {
          name: "Obrażenia od Potężnego uderzenia",
          effect: calculateLinearEffect(15, 0),
        },
      ],
      duration: [3, 3, 4, 4, 5, 5, 5],
    },
    skill3: {
      name: "Blok Tarczą",
      description:
        "Dzięki morderczemu treningowi Rycerz wie, kiedy i jak należy postawić blok, aby udany atak nawet kilku przeciwników zadał minimalne obrażenia. Każdy udany blok jest o 3% słabszy od poprzedniego i nie wpływa na redukcję obrażeń od żywiołów zaklętą w broniach. Użyta równocześnie Ochrona osłabia o kolejne 3% skuteczność bloku. Taka zasłona obniża też szansę na trafienie przeciwnika w zwarciu o 22%.",
      image: "images/Blok_Tarczą.jpg",
      type: "buff",
      duration: calculateLinearEffect(1, 0),
      target: "self",
      difficulty: calculateLinearEffect(80, 20),
      cost: {
        endurance: calculateLinearEffect(20, 3),
      },
      effects: [
        {
          name: "Ilość bloków",
          type: "numeric",
          effect: [2, 3, 3, 4, 4, 5, 5],
        },
        {
          name: "Skuteczność bloku",
          effect: calculateLinearEffect(45, 5),
        },
        {
          name: "Modyfikator trafień fizycznych",
          effect: calculateLinearEffect(-22, 0),
        },
      ],
    },
    skill4: {
      name: "Trans",
      description:
        "Nadnaturalne skupienie i niebywała koncentracja sprawiły, że Rycerz w stopniu doskonałym panuje nad swoimi ruchami, dzięki czemu jego trafienia są pewniejsze, a ekwipunek ulega wzmocnieniu. Skupiony na podtrzymaniu uroku jest on jednak bardziej podatny na ataki.",
      image: "images/Trans.jpg",
      type: "buff",
      duration: [3, 3, 4, 4, 5, 5, 5],
      target: "single",
      difficulty: calculateLinearEffect(160, 40),
      cost: {
        mana: calculateLinearEffect(20, 3),
      },
      effects: [
        {
          name: "Odp. fizyczne",
          type: "numeric",
          effect: [2, 8, 12, 18, 24, 30, 36],
        },
        {
          name: "Modyfikator trafień fizycznych",
          effect: calculateLinearEffect(14, 4),
        },
        {
          name: "Obrona wręcz",
          effect: calculateLinearEffect(-8, -2),
        },
        {
          name: "Obrona dystansowa",
          effect: calculateLinearEffect(-8, -2),
        },
        {
          name: "Koszt many na rundę",
          type: "numeric",
          effect: calculateLinearEffect(2, 3),
        },
      ],
    },
    skill5: {
      name: "Ochrona",
      description:
        "Umiejętność Ochrony daje szansę, że ataki przeciwników wymierzone w bronioną przez rycerza postać zostaną przekierowane na rycerza. Działa na ataki wręcz oraz dystansowe, z wyłączeniem ataków obszarowych. Użyta ochrona osłabia o 3% skuteczność Bloku Tarczą.",
      image: "images/Ochrona.jpg",
      type: "buff",
      duration: calculateLinearEffect(1, 0),
      target: "single",
      difficulty: calculateLinearEffect(120, 30),
      cost: {
        endurance: calculateLinearEffect(40, 6),
      },
      effects: [
        {
          name: "Skuteczność ochrony",
          effect: [70, 74, 78, 82, 86, 90, 95],
        },
        {
          name: "Skuteczność bloku",
          targetSelf: true,
          effect: calculateLinearEffect(-3, 0),
        },
      ],
    },
    skill6: {
      name: "Potężne Uderzenie",
      description:
        "Bardzo energochłonny atak zadaje ogromną ilość ran i dziesiątkuję przeciwników. Zawczasu oszołomione postacie otrzymują znacznie więcej obrażeń.",
      image: "images/Potężne_Uderzenie.jpg",
      type: "attack",
      attackType: "melee",
      hitType: "agility",
      damageFormula: {
        strengthCoeff: 0.7,
        agilityCoeff: 0.3,
        weapon: true,
      },
      damageMod: calculateLinearEffect(160, 20),
      hittingMod: [100, 103, 107, 110, 112, 114, 117],
      cost: {
        endurance: calculateLinearEffect(20, 3),
      },
      target: "single",
    },
    skill7: {
      name: "Aura Czystości",
      description:
        "Aura, która daje odporność na uroki oraz zmniejsza podatność na czary przeciwników. Aura może służyć tak Rycerzowi jak i wybranej przez niego sojuszniczej postaci.",
      image: "images/Aura_Czystości.jpg",
      type: "buff",
      duration: [3, 3, 4, 4, 5, 5, 5],
      target: "single",
      difficulty: calculateLinearEffect(160, 40),
      cost: {
        mana: [30, 35, 39, 44, 48, 53, 57],
      },
      effects: [
        {
          name: "Odp. fizyczne",
          type: "numeric",
          effect: [1, 2, 6, 8, 10, 12, 14],
        },
        {
          name: "magicRes",
          type: "numeric",
          effect: calculateLinearEffect(11, 4),
        },
        {
          name: "Obrona przeciw urokom",
          effect: calculateLinearEffect(9, 6),
        },
      ],
    },
    skill8: {
      name: "Poświęcenie",
      description:
        "Ofiarność i chęć czynienia dobra jest priorytetem Rycerza, dlatego w momencie zagrożenia wartości nadrzędnych Rycerz, rzuca na siebie urok pozytywny, który obniża jego obronę, wzmacnia za to ataki. Odsłaniając się i odnosząc większe obrażenia, dziesiątkuje wrogów broniąc zasad, za które gotów jest oddać życie.",
      image: "images/Poświęcenie.jpg",
      type: "buff",
      duration: [4, 4, 5, 5, 6, 6, 6],
      target: "single",
      difficulty: calculateLinearEffect(120, 30),
      cost: {
        mana: [30, 35, 39, 44, 48, 52, 57],
      },
      effects: [
        {
          name: "Odp. fizyczne",
          type: "numeric",
          effect: calculateLinearEffect(-2, -8),
        },
        {
          name: "Modyfikator obrażeń fizycznych",
          effect: calculateLinearEffect(24, 4),
        },
      ],
    },
    skill9: {
      name: "Siła Jedności",
      description:
        "Postacie pod wpływem siły jedności zadają większe obrażenia oraz są skuteczniejsze.",
      image: "images/Siła_jedności.jpg",
      type: "buff",
      duration: [2, 2, 3, 3, 4, 4, 4],
      target: "group",
      difficulty: calculateLinearEffect(240, 60),
      cost: {
        mana: calculateLinearEffect(20, 3),
        endurance: [15, 17, 20, 22, 24, 26, 29],
      },
      effects: [
        {
          name: "Zadawane obrażenia",
          effect: calculateLinearEffect(2, 2),
        },
        {
          name: "Skuteczność ataków",
          effect: [15, 17, 19, 21, 23, 25, 29],
        },
      ],
    },
  },
  barbarian: {
    skill1: {
      name: "Dyńka",
      image: "images/Dynka.jpg",
      description:
        "Słabsze od ciosu bronią, ma jednak zdecydowanie większą szansę trafienia. Zdezorientowany przeciwnik staje się łatwym celem. Uderzenie dodatkowo otwiera rany potęgując krwawienie.",
      type: "attack",
      attackType: "melee",
      hitType: "agility",
      damageFormula: {
        strengthCoeff: 1.2,
        agilityCoeff: 0.8,
      },
      damageMod: [100, 114, 128, 142, 160, 174, 190],
      hittingMod: calculateLinearEffect(125, 5),
      cost: {
        endurance: [12, 14, 16, 17, 19, 21, 23],
      },
      target: "single",
      duration: calculateLinearEffect(2, 0),
      effects: [
        {
          name: "Obrona wręcz",
          effect: [-12, -14, -16, -18, -20, -22, -25],
        },
        {
          name: "Wzmaga krwawienie",
          duration: calculateLinearEffect(0, 0),
          effect: calculateLinearEffect(40, 0),
        },
      ],
    },
    skill2: {
      name: "Atak dwuręczny",
      image: "images/Dwuręczny.jpg",
      description:
        'Uderzenie dwuręczne to "sztuka" posługiwania się tym subtelnym narzędziem mordu, niemożliwa do opanowania dla nikogo spoza grona Barbarzyńców.',
      type: "attack",
      attackType: "melee",
      hitType: "agility",
      damageFormula: {
        strengthCoeff: 0.8,
        agilityCoeff: 0.2,
        weapon: true,
      },
      damageMod: calculateLinearEffect(170, 20),
      hittingMod: [95, 98, 101, 104, 107, 112, 117],
      cost: {
        endurance: [17, 20, 22, 25, 27, 30, 32],
      },
      target: "single",
    },
    skill3: {
      name: "Taran",
      image: "images/Taran.jpg",
      description: "Uderzenie zadaje znaczne obrażenia oraz odbiera Punty PA.",
      type: "attack",
      attackType: "melee",
      hitType: "agility",
      damageFormula: {
        strengthCoeff: 1.2,
        agilityCoeff: 0.8,
      },
      damageMod: calculateLinearEffect(80, 10),
      hittingMod: calculateLinearEffect(100, 5),
      cost: {
        endurance: [17, 20, 22, 25, 27, 30, 38],
      },
      target: "single",
      duration: [2, 2, 2, 3, 3, 3, 3],
      effects: [
        {
          name: "Dodatkowe PA",
          type: "numeric",
          effect: [-1, -2, -2, -2, -3, -3, -4],
        },
      ],
    },
    skill4: {
      name: "Gruboskórność",
      image: "images/Gruboskórność.jpg",
      description:
        "Wystarczy, że Barbarzyńca odpowiednio się skoncentruje, a natychmiast twardnieje skóra jego oraz towarzyszy i staje się bardziej odporna na wszelkie bodźce.",
      type: "buff",
      duration: [3, 3, 4, 4, 5, 5, 5],
      target: "group",
      difficulty: calculateLinearEffect(160, 40),
      cost: {
        mana: [40, 46, 52, 58, 64, 70, 79],
        endurance: [15, 17, 20, 22, 24, 26, 29],
      },
      effects: [
        {
          name: "Odp. fizyczne",
          type: "numeric",
          effect: [8, 12, 15, 19, 22, 28, 35],
        },
        {
          name: "Odp. magiczne",
          type: "numeric",
          effect: [8, 12, 15, 19, 22, 28, 35],
        },
      ],
    },
    skill5: {
      name: "Gryzienie",
      image: "images/Gryzienie.jpg",
      description:
        "Postać rzuca się na przeciwnika, wgryzając mu się w szyję i zadając poważne obrażenia. Dodatkowo otwiera nowe rany, które sprawiają, że ugryziony w każdej turze traci określoną ilość punktów życia. Aktywne Krwawienie jest konieczne do rzucenia Zakażenia.",
      type: "attack",
      attackType: "melee",
      hitType: "agility",
      damageFormula: {
        strengthCoeff: 1.0,
        agilityCoeff: 1.0,
      },
      damageMod: calculateLinearEffect(90, 12),
      hittingMod: calculateLinearEffect(100, 3),
      cost: {
        endurance: [18, 21, 23, 26, 29, 32, 34],
      },
      target: "single",
      duration: calculateLinearEffect(3, 0),
      effects: [
        {
          name: "Krwawienie",
          cumulative: true,
          effect: calculateLinearEffect(90, 12),
        },
      ],
    },
    skill6: {
      name: "Furia",
      image: "images/Furia.jpg",
      description:
        "Doprowadzony do kresu Barbarzyńca potrafi wydobyć z siebie nieprawdopodobną siłę i w ostatniej chwili zmienić przebieg walki. Może wzbudzić w sobie pierwotny instynkt przetrwania, który sprawia, że rozrywa na oślep przeciwników, broniąc swojego życia budzącą respekt furią.",
      type: "buff",
      duration: [5, 5, 6, 6, 7, 7, 7],
      target: "self",
      difficulty: calculateLinearEffect(80, 20),
      cost: {
        mana: [10, 12, 13, 15, 16, 18, 20],
        endurance: [10, 12, 13, 15, 16, 18, 20],
      },
      effects: [
        {
          name: "Modyfikator obrażeń fizycznych",
          effect: [30, 34, 38, 42, 46, 50, 55],
        },
        {
          name: "Modyfikator trafień fizycznych",
          effect: calculateLinearEffect(-10, -2),
        },
        {
          name: "Modyfikator trafień dystansowych",
          effect: calculateLinearEffect(-10, -2),
        },
      ],
    },
    skill7: {
      name: "Zakażenie",
      image: "images/Zakażenie.jpg",
      description:
        "Zakażenie jest urokiem negatywnym. Wymagane jest aktywne krwawienie.",
      type: "attack",
      attackType: "mental",
      hitType: "knowledge",
      damageFormula: {
        strengthCoeff: 0.8,
        agilityCoeff: 1.2,
      },
      damageMod: calculateLinearEffect(100, 10),
      hittingMod: calculateLinearEffect(100, 3),
      cost: {
        mana: calculateLinearEffect(20, 3),
      },
      target: "single",
      duration: calculateLinearEffect(6, 0),
      effects: [
        {
          name: "Zakażenie",
          effect: calculateLinearEffect(100, 10),
        },
      ],
    },
    skill8: {
      name: "Ryk",
      image: "images/Ryk.jpg",
      description:
        "Diabelski ryk, który przeraża i paraliżuje słabsze psychicznie istoty, zapewniając Barbarzyńcy przewagę na polu bitwy.",
      type: "attack",
      attackType: "mental",
      hitType: "knowledge",
      cost: {
        mana: calculateLinearEffect(20, 3),
        endurance: [20, 23, 26, 29, 32, 35, 37],
      },
      target: "single",
      duration: [3, 3, 4, 4, 5, 5, 5],
      effects: [
        {
          name: "Skuteczność ataków",
          effect: [15, 18, 21, 24, 27, 30, 35],
        },
        {
          name: "Skuteczność obrony",
          effect: [15, 18, 21, 24, 27, 30, 35],
        },
      ],
    },
    skill9: {
      name: "Krytyczne uderzenie",
      image: "images/Krytyczne.jpg",
      description:
        "Jest to umiejętność ostateczna. Barbarzyńca tym najpotężniejszym ciosem absolutnie zmienia układ sił na polu walki. Tak naprawdę żadne słowa nie oddadzą całej mocy tego ataku.",
      type: "attack",
      attackType: "melee",
      hitType: "agility",
      damageFormula: {
        strengthCoeff: 0.7,
        agilityCoeff: 0.3,
        weapon: true,
      },
      damageMod: calculateLinearEffect(220, 24),
      hittingMod: [90, 93, 97, 100, 103, 107, 110],
      cost: {
        endurance: [30, 35, 39, 44, 48, 53, 57],
      },
      target: "single",
    },
  },
  sheed: {
    skill1: {
      name: "Lewy prawy",
      image: "images/Lewy,_Prawy.jpg",
      description:
        "Cios nie należy do najsilniejszych jednak zrekompensowane jest to jego szybkością i precyzją. Kastety zwiększają zadawane obrażenia.",
      type: "attack",
      attackType: "melee",
      hitType: "agility",
      damageFormula: {
        strengthCoeff: 0.7,
        agilityCoeff: 0.3,
        weapon: true,
      },
      damageMod: calculateLinearEffect(148, 22),
      hittingMod: [100, 104, 107, 109, 111, 114, 117],
      cost: {
        endurance: [14, 16, 18, 20, 23, 25, 27],
      },
      target: "single",
    },
    skill2: {
      name: "Front kick",
      image: "images/Front_Kick.jpg",
      description:
        "Sheed zaskakuje przeciwnika silnym kopnięciem i, wytrącając go z równowagi, poważnie osłabia jego obrony.",
      type: "attack",
      attackType: "melee",
      hitType: "agility",
      damageFormula: {
        strengthCoeff: 1.4,
        agilityCoeff: 0.6,
      },
      damageMod: calculateLinearEffect(80, 8),
      hittingMod: [80, 82, 85, 88, 92, 95, 100],
      cost: {
        endurance: [25, 29, 33, 37, 40, 44, 48],
      },
      target: "single",
      duration: calculateLinearEffect(1, 0),
      effects: [
        {
          name: "Obrona wręcz",
          effect: [50, 53, 56, 59, 62, 65, 70],
        },
      ],
    },
    skill3: {
      name: "Kontrola oddechu",
      image: "images/Kontrola_oddechu.jpg",
      description:
        "Skupienie i koncentracja podczas walki pozwalają wydajniej prowadzić swoje ciało, co umożliwia przeprowadzenie większej ilości akcji podczas tury oraz zwiększa zdolności regeneracyjne.",
      type: "buff",
      duration: [4, 4, 5, 5, 5, 6, 6],
      target: "single",
      difficulty: calculateLinearEffect(120, 30),
      cost: {
        mana: calculateLinearEffect(20, 3),
      },
      effects: [
        {
          name: "Dodatkowe PA",
          type: "numeric",
          effect: [1, 1, 1, 2, 2, 2, 2],
        },
        {
          name: "Regeneracja kondycji",
          effect: calculateLinearEffect(2, 0.5),
        },
        {
          name: "Regeneracja many",
          effect: calculateLinearEffect(0.4, 0.4),
        },
      ],
    },
    skill4: {
      name: "Dotkliwe uderzenie",
      image: "images/Dotkliwe_uderzenie.jpg",
      description:
        "Brutalny cios w genitalia powoduje, że przeciwnik zwija się z bólu. Ze względu na względnie niewielki obszar na jaki ma spaść uderzenie celność jest nieco niższa niż w przypadku innych ciosów. Przeciwnik staje się bardziej podatny na ataki wręcz oraz zmniejsza się efektywność jego ciosów w zwarciu.",
      type: "attack",
      attackType: "melee",
      hitType: "agility",
      damageFormula: {
        strengthCoeff: 1.4,
        agilityCoeff: 0.6,
      },
      damageMod: calculateLinearEffect(40, 4),
      hittingMod: calculateLinearEffect(88, 2),
      cost: {
        endurance: [15, 17, 20, 22, 24, 26, 29],
      },
      target: "single",
      duration: [2, 2, 3, 3, 4, 4, 4],
      effects: [
        {
          name: "Modyfikator trafień fizycznych",
          effect: calculateLinearEffect(-22, -4),
        },
        {
          name: "Obrona wręcz",
          effect: calculateLinearEffect(-22, -4),
        },
      ],
    },
    skill5: {
      name: "Cios w wątrobę",
      image: "images/Cios_w_wątrobę.jpg",
      description:
        "Znajomość ludzkiej anatomii pozwala Sheedowi efektywnie uderzyć przeciwnika we wrażliwe miejsce, tym razem w wątrobę. Powoduje to znaczne obniżenie zdolności ataku i obrony przeciwnika dla stref dystansowej i magicznej.",
      type: "attack",
      attackType: "melee",
      hitType: "agility",
      damageFormula: {
        strengthCoeff: 0.7,
        agilityCoeff: 0.3,
        weapon: true,
      },
      damageMod: calculateLinearEffect(40, 4),
      hittingMod: calculateLinearEffect(88, 2),
      cost: {
        endurance: [15, 17, 20, 22, 24, 26, 29],
      },
      target: "single",
      duration: [2, 2, 3, 3, 4, 4, 4],
      effects: [
        {
          name: "Modyfikator trafień dystansowych",
          effect: calculateLinearEffect(-22, -4),
        },
        {
          name: "Modyfikator trafień magicznych",
          effect: calculateLinearEffect(-22, -4),
        },
        {
          name: "Obrona dystansowa",
          effect: calculateLinearEffect(-22, -2),
        },
        {
          name: "Obrona przeciw urokom",
          effect: calculateLinearEffect(-22, -2),
        },
      ],
    },
    skill6: {
      name: "Latające kolano",
      image: "images/Latające_kolano.jpg",
      description:
        "Ze względu na wysoki poziom techniczny tego ciosu celność jest dość niska. Obita twarz przeciwnika utrudnia mu oddychanie, co sprawia, że wszystkie jego akcje kosztują go więcej kondycji oraz zadają mniejsze obrażenia.",
      type: "attack",
      attackType: "melee",
      hitType: "agility",
      damageFormula: {
        strengthCoeff: 1.4,
        agilityCoeff: 0.6,
      },
      damageMod: calculateLinearEffect(50, 6),
      hittingMod: [70, 73, 77, 81, 85, 89, 95],
      cost: {
        endurance: [15, 17, 20, 22, 24, 26, 29],
      },
      target: "single",
      duration: [3, 3, 4, 4, 5, 5, 5],
      effects: [
        {
          name: "Krwawienie",
          cumulative: true,
          duration: calculateLinearEffect(3, 0),
          effect: calculateLinearEffect(50, 6),
        },
        {
          name: "Zużycie kondycji",
          effect: calculateLinearEffect(60, 6),
        },
        {
          name: "Modyfikator obrażeń fizycznych",
          effect: [-20, -22, -24, -26, -28, -31, -35],
        },
        {
          name: "Modyfikator obrażeń magicznych",
          effect: [-5, -6, -8, -9, -11, -13, 15],
        },
      ],
    },
    skill7: {
      name: "Uniki",
      image: "images/Uniki.jpg",
      description:
        "Niebywała zręczność i kontrola nad ciałem umożliwiają Sheedowi unikanie ciosów, nawet kilku w jednej rundzie. Każdy kolejny unik, za wyjątkiem pierwszego, jest o 10% mniej skuteczny. Najpierw sprawdzane jest, czy jest unik, a dopiero potem czy jest trafienie.",
      type: "buff",
      duration: calculateLinearEffect(1, 0),
      target: "single",
      difficulty: calculateLinearEffect(80, 20),
      cost: {
        endurance: [8, 9, 10, 12, 13, 14, 15],
      },
      effects: [
        {
          name: "Liczba uników",
          type: "numeric",
          effect: calculateLinearEffect(1, 0.4),
        },
        {
          name: "Skuteczność uników",
          effect: calculateLinearEffect(56, 4),
        },
        {
          name: "Zużycie kondycji",
          effect: calculateLinearEffect(40, 10),
        },
      ],
    },
    skill8: {
      name: "Haduoken",
      image: "images/Haduoken.jpg",
      description:
        "Haduoken to bardzo silny i precyzyjny pocisk. Obrażenia zadane tym czarem zależne są od siły, zręczności oraz w niewielkim stopniu maksymalnej many rzucającego.",
      type: "attack",
      attackType: "ranged",
      hitType: "agility",
      damageFormula: {
        strengthCoeff: 1,
        agilityCoeff: 0.6,
        manaCoeff: 0.12,
      },
      damageMod: calculateLinearEffect(140, 10),
      hittingMod: calculateLinearEffect(100, 3),
      cost: {
        mana: calculateLinearEffect(7, 1),
        endurance: [15, 18, 20, 22, 24, 27, 29],
      },
      target: "single",
    },
    skill9: {
      name: "Uderzenie Chi",
      image: "images/Uderzenie_chi.jpg",
      description:
        "Uderzenie Chi to manifestacja mocy, siejąca zniszczenie pośród przeciwników Sheeda pod postacią potężnego ciosy wręcz. Dodatkowo Chi wypiera inny rodzaj energii - manę, którą po prostu spala przeciwnikowi.",
      type: "attack",
      attackType: "melee",
      hitType: "agility",
      damageFormula: {
        strengthCoeff: 0.7,
        agilityCoeff: 0.3,
        manaCoeff: 0.02,
        weapon: true,
      },
      damageMod: calculateLinearEffect(164, 26),
      hittingMod: [90, 93, 97, 100, 103, 106, 110],
      cost: {
        mana: [10, 12, 13, 14, 15, 18, 19],
        endurance: [15, 18, 20, 22, 24, 27, 29],
      },
      target: "single",
      effects: [
        {
          name: "Wyssanie many",
          effect: [42, 46, 50, 54, 60, 65, 71],
        },
      ],
    },
  },
  druid: {
    skill1: {
      name: "Leczenie",
      image: "images/Leczenie.jpg",
      description:
        "Podstawowa umiejętność i sens klasy druida, pozwala na uleczenie części hp w czasie walki. Każde leczenie dorzuca 2 tury trwania debuffa obniżającego efektywność kolejnego leczenia (każda runda trwania = 10% słabsze leczenie). Max czas trwania debuffa = 1 + 0.1 * (poziom leczącej postaci). Debuff ten zwiększa jednak zadawane przez druida obrażenia Uderzeniem o 4% podstawowych obrażeń za każdą rundę trwania.",
      type: "buff",
      duration: calculateLinearEffect(2, 0),
      target: "single",
      healing: true,
      difficulty: calculateLinearEffect(160, 40),
      damageMod: [130, 142, 154, 166, 178, 192, 206],
      cost: {
        mana: [35, 40, 46, 51, 56, 61, 67],
      },
      effects: [
        {
          name: "Obrażenia od Uderzenia",
          cumulative: true,
          targetSelf: true,
          effect: calculateLinearEffect(4, 0),
        },
        {
          name: "Leczenie",
          cumulative: true,
          effect: calculateLinearEffect(-10, 0),
        },
      ],
    },
    skill2: {
      name: "Odczarowanie",
      image: "images/Odczarowanie.jpg",
      description:
        "Rytuał odczarowania pomaga przywrócić stan sprzed ingerencji sił magicznych. Usuwa z wybranej postaci część negatywnych oraz pozytywnych uroków.",
      type: "buff",
      target: "single",
      difficulty: calculateLinearEffect(160, 40),
      cost: {
        mana: calculateLinearEffect(20, 3),
      },
      effects: [
        {
          name: "Siła odczarowania",
          type: "numeric",
          effect: [2, 2.3, 2.6, 2.9, 3.2, 3.6, 4.2],
        },
      ],
    },
    skill3: {
      name: "Rój os",
      image: "images/Rój_os.jpg",
      description:
        "Na usługi druida oddana jest gigantyczna gromada os, która opada na wybranego przeciwnika, pozbawiając go sił i zdolności do wszelkiej akcji. Zesłanie na przeciwnika ponownie roju os w trakcie trwania debuffa powoduje skumulowanie zadawanych obrażeń, z poprzednich pozostaje 30%.",
      type: "attack",
      attackType: "mental",
      hitType: "knowledge",
      damageFormula: {
        powerCoeff: 1.3,
        knoCoeff: 0.7,
      },
      damageMod: [40, 46, 52, 60, 68, 76, 88],
      hittingMod: calculateLinearEffect(100, 1),
      cost: {
        mana: [30, 35, 39, 44, 48, 53, 57],
      },
      target: "single",
      duration: [3, 3, 4, 4, 4, 4, 5],
      effects: [
        {
          name: "Dodatkowe PA",
          type: "numeric",
          effect: [-1, -1, -2, -2, -2, -3, -3],
        },
      ],
    },
    skill4: {
      name: "Wtapianie",
      image: "images/Wtapianie.jpg",
      description:
        "Druid w naturalny sposób posiadł zdolność osiągania idealnej harmonii z naturą. Zastygły w bezruchu, zasłuchany w przyrodę, jest niemalże niewidzialny. Dopiero ruch może go zdradzić. Ta właściwość niebywale utrudnia trafienie Druida.",
      type: "buff",
      target: "single",
      duration: [3, 3, 4, 4, 5, 5, 6],
      difficulty: calculateLinearEffect(160, 40),
      cost: {
        mana: [30, 35, 39, 44, 48, 53, 57],
      },
      effects: [
        {
          name: "Obrona wręcz",
          effect: calculateLinearEffect(18, 2),
        },
        {
          name: "Obrona dystansowa",
          effect: calculateLinearEffect(18, 2),
        },
      ],
    },
    skill5: {
      name: "Wzmocnienie",
      image: "images/Wzmocnienie.jpg",
      description:
        "Umiejętność bezpośrednio wpływa na poziom kondycji, która jest przywracana stopniowo przez określony czas, w zależności od biegłości Druida.",
      type: "buff",
      target: "single",
      duration: [2, 3, 3, 4, 4, 5, 5],
      difficulty: calculateLinearEffect(160, 40),
      cost: {
        mana: [30, 35, 39, 44, 48, 53, 57],
      },
      effects: [
        {
          name: "Regeneracja kondycji",
          effect: [25, 25, 33, 31, 37, 34, 39],
        },
      ],
    },
    skill6: {
      name: "Uderzenie",
      image: "images/Uderzenie.jpg",
      description:
        "Uderzenie to wsparty Mocą brutalny atak wręcz. Uderzenie druida posiadającego debuff leczenia otrzymuje dodatkowe 4% podstawowych obrażeń za każdą rundę jego trwania.",
      type: "attack",
      attackType: "melee",
      hitType: "knowledge",
      damageFormula: {
        powerCoeff: 0.7,
        knoCoeff: 0.3,
        weapon: true,
      },
      damageMod: calculateLinearEffect(170, 12),
      hittingMod: [100, 104, 107, 109, 111, 114, 117],
      cost: {
        mana: [10, 12, 13, 15, 16, 18, 19],
        endurance: [8, 9, 10, 12, 13, 14, 15],
      },
      target: "single",
    },
    skill7: {
      name: "Źródło natury",
      image: "images/Źródło_natury.jpg",
      description:
        "Druid jest w stanie zoptymalizować korzystanie z many, co sprawia, że wykonywane przez niego czary kosztują go mniej wysiłku. Ze Źródła natury może też korzystać wybrany przez Druida sojusznik.",
      type: "buff",
      target: "single",
      duration: [3, 3, 4, 4, 5, 5, 6],
      difficulty: calculateLinearEffect(160, 40),
      cost: {
        mana: calculateLinearEffect(20, 3),
      },
      effects: [
        {
          name: "Zużycie many",
          effect: [20, 23, 26, 29, 32, 36, 40],
        },
      ],
    },
    skill8: {
      name: "Leczenie grupowe",
      image: "images/Leczenie_grupowe.jpg",
      description:
        "Leczenie grupowe działa analogicznie do Leczenia, ale obejmuje wszystkie postacie stojące po stronie Druida. Każde leczenie grupowe dorzuca 1 rundę trwania debuffa leczenia.",
      type: "buff",
      duration: calculateLinearEffect(1, 0),
      target: "group",
      healing: true,
      difficulty: calculateLinearEffect(240, 60),
      damageMod: [80, 92, 104, 114, 130, 145, 160],
      cost: {
        mana: [60, 69, 78, 87, 96, 105, 116],
      },
      effects: [
        {
          name: "Obrażenia od Uderzenia",
          cumulative: true,
          targetSelf: true,
          effect: calculateLinearEffect(4, 0),
        },
        {
          name: "Leczenie",
          cumulative: true,
          effect: calculateLinearEffect(-10, 0),
        },
      ],
    },
    skill9: {
      name: "Korzenie",
      image: "images/Korzenie.jpg",
      description:
        "Sprzymierzona z Druidem flora oplata korzeniami wskazanego przeciwnika, przykuwając go do ziemi i uniemożliwiając wykonywanie ataków wręcz. Dodatkowo przeciwnik otrzymuje obrażenia wręcz.",
      type: "attack",
      attackType: "mental",
      hitType: "knowledge",
      damageFormula: {
        powerCoeff: 1.3,
        knoCoeff: 0.7,
      },
      damageMod: [100, 110, 120, 135, 150, 170, 195],
      hittingMod: [-35, -33, -31, -30, -29, -28, -26],
      cost: {
        mana: [30, 35, 39, 44, 48, 53, 57],
      },
      target: "single",
      duration: [2, 2, 2, 2, 3, 3, 3],
      effects: [
        {
          name: "Obrona dystansowa",
          effect: [-15, -18, -21, -24, -27, -30, -35],
        },
        {
          name: "Unieruchomienie",
          effect: calculateLinearEffect(100, 0),
        },
      ],
    },
  },
  firemage: {
    skill1: {
      name: "Magiczna iskra",
      image: "images/Magiczna_iskra.jpg",
      description:
        "Podstawowy czar ofensywny. Posiada dosyć dużą siłę i nie wymaga wiele many.",
      type: "attack",
      attackType: "ranged",
      hitType: "knowledge",
      damageFormula: {
        powerCoeff: 1.4,
        knoCoeff: 0.6,
      },
      damageMod: calculateLinearEffect(100, 12),
      hittingMod: calculateLinearEffect(115, 5),
      cost: {
        mana: [10, 11, 13, 15, 16, 17, 19],
      },
      target: "single",
    },
    skill2: {
      name: "Wrażliwość na Ogień",
      image: "images/Wrażliwość_na_ogień.jpg",
      description:
        "Urok ofensywny, który zwiększa czasowo podatność na ataki pojedynczego wroga.",
      type: "attack",
      attackType: "mental",
      hitType: "knowledge",
      cost: {
        mana: [30, 35, 39, 44, 48, 53, 57],
      },
      target: "single",
      duration: [3, 3, 4, 4, 5, 5, 6],
      effects: [
        {
          name: "fireRes",
          type: "numeric",
          effect: calculateLinearEffect(-35, -3),
        },
      ],
    },
    skill3: {
      name: "Ognista Sfera",
      image: "images/Ognista_sfera.jpg",
      description:
        "Czar ochronny, powodujący, że osoba, która zaatakuje maga zostaje poparzona (działa na 10 pierwszych ataków).",
      type: "buff",
      target: "single",
      duration: [2, 2, 3, 3, 3, 3, 4],
      difficulty: calculateLinearEffect(160, 40),
      cost: {
        mana: [30, 35, 39, 44, 48, 53, 57],
      },
      damageFormula: {
        powerCoeff: 1.4,
        knoCoeff: 0.6,
      },
      damageMod: calculateLinearEffect(60, 10),
      effects: [
        {
          name: "Odp. fizyczne",
          type: "numeric",
          effect: calculateLinearEffect(10, 0),
        },
      ],
    },
    skill4: {
      name: "Inkantacja",
      image: "images/Inkantacja.jpg",
      description:
        "Silny czar ofensywny, zwiększający siłę rażenia innych czarów przez kilka tur. Umożliwia również rzucenie Meteoru, ale obniża odporności na ogień i uroki.",
      type: "buff",
      target: "self",
      duration: [5, 5, 5, 5, 6, 6, 6],
      difficulty: calculateLinearEffect(160, 40),
      cost: {
        mana: calculateLinearEffect(20, 3),
        endurance: calculateLinearEffect(20, 3),
      },
      effects: [
        {
          //zmienić?
          name: "Obrażenia od ognia",
          cumulative: true,
          effect: [16, 18, 20, 22, 24, 26, 29],
        },
        {
          name: "curseRes",
          cumulative: true,
          type: "numeric",
          scaling: "charLvl",
          effect: [-0.1, -0.11, -0.13, -0.15, -0.17, -0.19, -0.21],
        },
        {
          name: "fireRes",
          cumulative: true,
          type: "numeric",
          scaling: "charLvl",
          effect: [-0.2, -0.22, -0.26, -0.3, -0.34, -0.38, -0.42],
        },
      ],
    },
    skill5: {
      name: "Aura Rozproszenia",
      image: "images/Aura.jpg",
      description:
        "Aura Rozproszenia to potężne zaklęcie obronne, tworzy na wpół materialną barierę, która pochłania część obrażeń wroga. Aura chroni całą drużynę.",
      type: "buff",
      target: "group",
      duration: [2, 3, 3, 4, 4, 5, 5],
      difficulty: calculateLinearEffect(240, 60),
      cost: {
        mana: [30, 35, 39, 44, 48, 53, 57],
        endurance: calculateLinearEffect(20, 3),
      },
      effects: [
        {
          name: "Redukcja otrzymanych obrażeń",
          effect: [-4, -4, -5, -5, -6, -7, -8],
        },
      ],
    },
    skill6: {
      name: "Podpalenie",
      image: "images/Podpalenie.jpg",
      description:
        "Mag walczy nie tylko na odległość. Ten czar umożliwia mu, poprzez bezpośredni kontakt sprawienie, że jego przeciwnik stanie w płomieniach. Czar nie działa natomiast na postać, na którą rzucono uprzednio zamrożenie.",
      type: "attack",
      attackType: "melee",
      hitType: "knowledge",
      damageFormula: {
        powerCoeff: 1.4,
        knoCoeff: 0.6,
      },
      damageMod: [60, 66, 73, 80, 87, 94, 105],
      hittingMod: [100, 103, 107, 109, 112, 115, 118],
      cost: {
        mana: [12, 14, 16, 17, 19, 21, 23],
        endurance: [12, 14, 16, 17, 19, 21, 23],
      },
      target: "single",
      duration: calculateLinearEffect(2, 0),
      effects: [
        {
          name: "Podpalenie",
          cumulative: true,
          effect: [60, 66, 73, 80, 87, 94, 105],
        },
      ],
    },
    skill7: {
      name: "Kula ognia",
      image: "images/Kula_ognia.jpg",
      description:
        "Ulubione zaklęcie każdego Maga Ognia. Przywołuje gigantyczną, płonącą kulę, która spopiela każdego, kto pojawi się na jej drodze.",
      type: "attack",
      attackType: "ranged",
      hitType: "knowledge",
      damageFormula: {
        powerCoeff: 1.4,
        knoCoeff: 0.6,
      },
      damageMod: calculateLinearEffect(156, 14),
      hittingMod: [100, 102, 104, 106, 108, 110, 111],
      cost: {
        mana: calculateLinearEffect(20, 3),
      },
      target: "single",
    },
    skill8: {
      name: "Deszcz ognia",
      image: "images/Deszcz_ognia.jpg",
      description: "Czar obszarowy, rażący wszystkich przeciwników.",
      type: "attack",
      attackType: "ranged",
      hitType: "knowledge",
      damageFormula: {
        powerCoeff: 1.4,
        knoCoeff: 0.6,
      },
      damageMod: [80, 88, 96, 104, 112, 120, 130],
      hittingMod: [90, 92, 94, 96, 98, 100, 100],
      cost: {
        mana: [35, 40, 46, 51, 56, 61, 67],
      },
      target: "group",
    },
    skill9: {
      name: "Meteoryt",
      image: "images/Meteoryt.jpg",
      description:
        "Bardzo silny atak, który sprawia, że istnieje prawdopodobieństwo porażenia odłamkiem sąsiadującego wroga. Warunek rzucenia czaru: pozostały czas Inkantacji min. 3 tury.",
      type: "attack",
      attackType: "ranged",
      hitType: "knowledge",
      damageFormula: {
        powerCoeff: 1.4,
        knoCoeff: 0.6,
      },
      damageMod: [170, 185, 200, 220, 235, 255, 275],
      hittingMod: [80, 84, 88, 92, 94, 97, 105],
      cost: {
        mana: [40, 46, 52, 58, 64, 70, 76],
      },
      target: "single",
      effects: [
        {
          name: "Szansa trafienia odłamkiem",
          effect: [40, 43, 46, 49, 52, 55, 57],
        },
      ],
    },
  },
  archer: {
    skill1: {
      name: "Precyzyjny strzał",
      image: "images/Precyzyjny_strzał.jpg",
      description:
        "Podstawowy atak dystansowy. Precyzyjny strzał zadaje więcej obrażeń, gdy łucznik ma Wyostrzone zmysły.",
      type: "attack",
      attackType: "ranged",
      hitType: "agility",
      damageFormula: {
        strengthCoeff: 0.7,
        agilityCoeff: 0.3,
        weapon: true,
      },
      damageMod: [130, 140, 152, 164, 176, 188, 200],
      hittingMod: calculateLinearEffect(105, 2),
      cost: {
        endurance: [16, 18, 21, 23, 26, 28, 30],
      },
      target: "single",
    },
    skill2: {
      name: "Krótkie spięcie",
      image: "images/Krótkie_spięcie.jpeg",
      description:
        "Zbliżenie Łuczników z armią zaowocowało kolejną specjalną umiejętnością obniżającą obronę przeciwnika w każdym aspekcie. Celnie wystrzelona przez Łucznika osobliwa strzała powoduje wybicie przeciwnika z rytmu walki, częściowo go paraliżując.",
      type: "attack",
      attackType: "ranged",
      hitType: "agility",
      damageFormula: {
        strengthCoeff: 0.7,
        agilityCoeff: 0.3,
        weapon: true,
      },
      damageMod: calculateLinearEffect(50, 6),
      hittingMod: calculateLinearEffect(101, 2),
      cost: {
        endurance: calculateLinearEffect(20, 3),
        mana: calculateLinearEffect(7, 1),
      },
      target: "single",
      duration: [2, 2, 3, 3, 4, 4, 4],
      effects: [
        {
          name: "Obrona wręcz",
          effect: calculateLinearEffect(-22, -4),
        },
        {
          name: "Obrona dystansowa",
          effect: calculateLinearEffect(-10, -2),
        },
        {
          name: "Obrona przeciw urokom",
          effect: calculateLinearEffect(-22, -2),
        },
        {
          name: "Szansa na efekt",
          effect: [70, 74, 78, 82, 84, 88, 98],
        },
      ],
    },
    skill3: {
      name: "Zatruta Strzała",
      image: "images/Zatruta_strzała.jpg",
      description:
        "Trująca strzała jest okrutną mieszanką wiedzy i umiejętności strzeleckich, Strzała rozdziera ciało, toksyny atakują cały organizm, zatruwając go na określony czas.",
      type: "attack",
      attackType: "ranged",
      hitType: "agility",
      damageFormula: {
        strengthCoeff: 0.7,
        agilityCoeff: 0.3,
        weapon: true,
      },
      damageMod: calculateLinearEffect(100, 8),
      hittingMod: calculateLinearEffect(100, 3),
      cost: {
        endurance: [10, 12, 13, 15, 16, 18, 19],
        mana: calculateLinearEffect(20, 3),
      },
      target: "single",
      duration: [3, 3, 4, 4, 5, 5, 5],
      effects: [
        {
          name: "Modyfikator obrażeń fizycznych",
          effect: [-11, -14, -16, -18, -20, -22, -25],
        },
        {
          name: "Modyfikator obrażeń magicznych",
          effect: [-11, -14, -16, -18, -20, -22, -25],
        },
        {
          name: "Zużycie many",
          effect: calculateLinearEffect(60, 6),
        },
        {
          name: "Szansa na efekt",
          effect: [70, 74, 78, 82, 84, 88, 98],
        },
      ],
    },
    skill4: {
      name: "Wyostrzone zmysły",
      image: "images/Wyostrzone_zmysły.jpg",
      description:
        "Czarci Pazur to najlepszy przyjaciel strzelca. Żucie tego zioła wyostrza zmysły Łucznika dając mu dużo większą szansę na oddanie celnego strzału. Dzięki Pazurowi wzrastają również obrażenia od Precyzyjnego strzału.",
      type: "buff",
      target: "self",
      duration: [3, 4, 4, 5, 5, 5, 6],
      difficulty: calculateLinearEffect(120, 30),
      cost: {
        mana: calculateLinearEffect(20, 3),
      },
      effects: [
        {
          name: "Modyfikator trafień dystansowych",
          effect: calculateLinearEffect(25, 5),
        },
        {
          name: "Obrażenia od Precyzyjnego strzału",
          effect: calculateLinearEffect(40, 10),
        },
      ],
    },
    skill5: {
      name: "Ognista strzała",
      image: "images/Ognista_strzała.jpg",
      description:
        "Czym byłoby życie bez odrobiny magii? Ta prawda nie jest obca również Łucznikom, którzy dzięki pewnym elementarnym zdolnościom są w stanie zapalić w locie swoje strzały, które zadają dodatkowe obrażenia od ognia.",
      type: "attack",
      attackType: "ranged",
      hitType: "agility",
      damageFormula: {
        strengthCoeff: 0.7,
        agilityCoeff: 0.3,
        weapon: true,
      },
      damageMod: [170, 180, 190, 205, 220, 233, 260],
      hittingMod: [100, 103, 106, 109, 112, 115, 117],
      cost: {
        endurance: [15, 18, 20, 22, 24, 27, 29],
        mana: calculateLinearEffect(12, 0),
      },
      target: "single",
      duration: calculateLinearEffect(3, 0),
      effects: [
        {
          name: "Podpalenie",
          cumulative: true,
          effect: [85, 90, 95, 102, 110, 116, 130],
        },
        {
          name: "Szansa na efekt",
          effect: [10, 12, 14, 16, 18, 20, 24],
        },
      ],
    },
    skill6: {
      name: "Piach w oczy",
      image: "images/Piach_w_oczy.jpg",
      description:
        "Sypnięcie przeciwnikowi piachem w oczy, co obniża mu zdolność ataku dla każdej strefy.",
      type: "attack",
      attackType: "melee",
      hitType: "agility",
      damageFormula: {
        strengthCoeff: 1.4,
        agilityCoeff: 0.6,
      },
      damageMod: calculateLinearEffect(40, 4),
      hittingMod: [100, 103, 107, 110, 112, 115, 118],
      cost: {
        endurance: calculateLinearEffect(20, 3),
      },
      target: "single",
      duration: [2, 2, 3, 3, 4, 4, 4],
      effects: [
        {
          name: "Skuteczność ataków",
          effect: calculateLinearEffect(-22, -4),
        },
      ],
    },
    skill7: {
      name: "Strzał strategiczny",
      image: "images/Strzał_strategiczny.jpg",
      description:
        "Trafiony przeciwnik gorzej broni się przed lecącymi w jego stronę pociskami. Strzała tkwi w ciele, boli, przeszkadza. Każdy atak przez to kosztuje również dużo więcej kondycji.",
      type: "attack",
      attackType: "ranged",
      hitType: "agility",
      damageFormula: {
        strengthCoeff: 0.7,
        agilityCoeff: 0.3,
        weapon: true,
      },
      damageMod: calculateLinearEffect(80, 8),
      hittingMod: calculateLinearEffect(90, 3),
      cost: {
        endurance: calculateLinearEffect(20, 3),
      },
      target: "single",
      duration: [2, 2, 2, 3, 3, 3, 4],
      effects: [
        {
          name: "Dodatkowe PA",
          type: "numeric",
          effect: [-1, -1, -2, -2, -3, -3, -3],
        },
        {
          name: "Zużycie kondycji",
          effect: [15, 20, 20, 25, 25, 30, 35],
        },
        {
          name: "Obrona dystansowa",
          effect: calculateLinearEffect(-10, -2),
        },
      ],
    },
    skill8: {
      name: "Lodowa strzała",
      image: "images/Lodowa_strzała.jpg",
      description:
        "Zaatakowany przeciwnik odnosi obrażenia od lodu i dodatkowo ma szanse zostać przeszyty zimnem. W konsekwencji jego ruchy są spowolnione a sfera zimna w jakiej się znajdzie niekorzystnie wpływa na jego formę i prowadzi do stopniowej utraty kondycji oraz obniża jego odporność na chłód.",
      type: "attack",
      attackType: "ranged",
      hitType: "agility",
      damageFormula: {
        strengthCoeff: 0.7,
        agilityCoeff: 0.3,
        weapon: true,
      },
      damageMod: [170, 180, 190, 205, 220, 233, 260],
      hittingMod: [100, 103, 106, 109, 112, 116, 117],
      cost: {
        endurance: [15, 18, 20, 22, 24, 27, 29],
        mana: [10, 12, 13, 15, 16, 18, 19],
      },
      target: "single",
      duration: [3, 3, 3, 3, 3, 3, 4],
      effects: [
        {
          name: "Dodatkowe PA",
          type: "numeric",
          effect: [-1, -1, -2, -2, -3, -3, -3],
        },
        {
          name: "Utrata kondycji",
          effect: calculateLinearEffect(33, 0),
        },
        {
          name: "frostRes",
          type: "numeric",
          effect: [20, 23, 26, 29, 32, 35, 39],
        },
        {
          name: "Szansa na efekt",
          effect: [10, 12, 14, 16, 18, 20, 24],
        },
      ],
    },
    skill9: {
      name: "Grad strzał",
      image: "images/Grad_strzał.jpg",
      description:
        "Odpowiednio wyszkolony łucznik wysyła w powietrze rój pocisków, które spadając osiągają ogromną prędkość i sieją spustoszenie nawet wśród pancernych chorągwi.",
      type: "attack",
      attackType: "ranged",
      hitType: "agility",
      damageFormula: {
        strengthCoeff: 0.7,
        agilityCoeff: 0.3,
        weapon: true,
      },
      damageMod: calculateLinearEffect(100, 16),
      hittingMod: calculateLinearEffect(90, 2),
      cost: {
        endurance: calculateLinearEffect(40, 6),
      },
      target: "group",
    },
  },
  voodoo: {
    skill1: {
      name: "Ukłucie lalki",
      image: "images/Ukłucie_lalki.jpg",
      description:
        "Mocny urok ofensywny. Pomija odporność na uroki przy liczeniu trafienia.",
      type: "attack",
      attackType: "mental",
      hitType: "knowledge",
      damageFormula: {
        powerCoeff: 1.4,
        knoCoeff: 0.6,
      },
      damageMod: calculateLinearEffect(86, 14),
      hittingMod: calculateLinearEffect(90, 3),
      cost: {
        mana: calculateLinearEffect(20, 3),
      },
      target: "single",
    },
    skill2: {
      name: "Szpila w oko",
      image: "images/Szpila_w_oko.jpg",
      description:
        "Szpila w oko to potężny urok, który zadając niewielkie obrażenia powoduje oślepienie przeciwnika, poważnie ograniczając jego zdolności bojowe.",
      type: "attack",
      attackType: "mental",
      hitType: "knowledge",
      damageFormula: {
        powerCoeff: 1.4,
        knoCoeff: 0.6,
      },
      damageMod: calculateLinearEffect(40, 4),
      hittingMod: calculateLinearEffect(100, 3),
      cost: {
        mana: [30, 35, 39, 44, 48, 53, 57],
      },
      target: "single",
      duration: [2, 2, 2, 3, 3, 3, 3],
      effects: [
        {
          name: "Modyfikator trafień dystansowych",
          effect: [-30, -34, -38, -42, -46, -50, -55],
        },
        {
          name: "Obrona dystansowa",
          effect: [-30, -34, -38, -42, -46, -50, -55],
        },
        {
          name: "Modyfikator trafień fizycznych",
          effect: [-25, -28, -32, -35, -38, -41, -45],
        },
        {
          name: "Obrona wręcz",
          effect: [-25, -28, -32, -35, -38, -41, -45],
        },
      ],
    },
    skill3: {
      name: "Wyssanie duszy",
      image: "images/Wyssanie_duszy.jpg",
      description:
        "Umiejętność żerowania na przeciwnikach stanowi istotę przetrwania czarownika w starciu, Voodoo atakując przeciwnika wręcz, poprzez dotyk przenika przez duchowe bariery ofiary i transferuje jego Manę, powiększając własne zasoby energetyczne.",
      type: "attack",
      attackType: "melee",
      hitType: "agility",
      damageFormula: {
        powerCoeff: 1.4,
        knoCoeff: 0.6,
      },
      damageMod: calculateLinearEffect(48, 8),
      hittingMod: [100, 103, 106, 109, 112, 115, 120],
      cost: {
        endurance: calculateLinearEffect(20, 3),
      },
      target: "single",
      effects: [
        {
          name: "Wyssanie many",
          effect: [50, 55, 60, 65, 70, 75, 85],
        },
      ],
    },
    skill4: {
      name: "Hak w brzuch",
      image: "images/Hak_w_brzuch.jpg",
      description:
        "Urok zadaje poważne obrażenia, stanowi niezwykle groźną umiejętność czarownika Voodoo. Dodatkowo powoduje krwotok, który systematycznie osłabia przeciwnika. Pomija odporność na uroki przy liczeniu trafienia.",
      type: "attack",
      attackType: "mental",
      hitType: "knowledge",
      damageFormula: {
        powerCoeff: 1.4,
        knoCoeff: 0.6,
      },
      damageMod: calculateLinearEffect(80, 8),
      hittingMod: [90, 93, 96, 99, 102, 105, 110],
      cost: {
        mana: [30, 35, 39, 44, 48, 53, 57],
      },
      target: "single",
      duration: calculateLinearEffect(3, 0),
      effects: [
        {
          name: "Krwawienie",
          cumulative: true,
          effect: calculateLinearEffect(80, 8),
        },
      ],
    },
    skill5: {
      name: "Zatrucie",
      image: "images/Zatrucie.jpg",
      description:
        "Ofiara doświadcza negatywnego uroku, który miesza jej władze umysłowe z taki sposób, że doznaje ona wszelkich objawów fizycznego zatrucia. Zwiększone zostaje jej zużycie many oraz kondycji, jak i zmniejszona siła ataku każdej strefy.",
      type: "attack",
      attackType: "mental",
      hitType: "knowledge",
      hittingMod: calculateLinearEffect(100, 3),
      cost: {
        mana: [30, 35, 39, 44, 48, 53, 57],
      },
      target: "single",
      duration: [3, 3, 4, 4, 5, 5, 5],
      effects: [
        {
          name: "Modyfikator obrażeń fizycznych",
          effect: [-5, -6, -8, -9, -11, -13, -15],
        },
        {
          name: "Modyfikator obrażeń magicznych",
          effect: [-20, -22, -24, -26, -28, -31, -35],
        },
        {
          name: "Zużycie kondycji",
          effect: calculateLinearEffect(30, 3),
        },
        {
          name: "Zużycie many",
          effect: calculateLinearEffect(30, 3),
        },
      ],
    },
    skill6: {
      name: "Uderzenie cienia",
      image: "images/Uderzenie_cienia.jpg",
      description:
        "Przepełniony złowrogim mrokiem VooDoo jest w stanie wyemitować potężny impuls cienia, niszczący życiową energię zaatakowanego przeciwnika.",
      type: "attack",
      attackType: "ranged",
      hitType: "knowledge",
      damageFormula: {
        powerCoeff: 1.4,
        knoCoeff: 0.6,
      },
      damageMod: calculateLinearEffect(116, 14),
      hittingMod: calculateLinearEffect(100, 5),
      cost: {
        mana: [15, 17, 19, 21, 24, 26, 28],
      },
      target: "single",
      effects: [
        {
          name: "Szansa na zatrucie",
          effect: [0, 0, 15, 17, 19, 21, 24],
          //zatrucie o 2 poziomy niższe niż uderzenie
        },
      ],
    },
    skill7: {
      name: "Otępienie",
      image: "images/Otępienie.jpg",
      description:
        "Otępienie prowadzi do zmniejszenia odporności na uroki oraz skuteczności obrony magicznej i ataków magicznych.",
      type: "attack",
      attackType: "mental",
      hitType: "knowledge",
      hittingMod: calculateLinearEffect(100, 3),
      cost: {
        mana: calculateLinearEffect(20, 3),
      },
      target: "single",
      duration: [3, 3, 4, 4, 5, 5, 6],
      effects: [
        {
          name: "Modyfikator trafień magicznych",
          effect: [-5, -6, -8, -9, -11, -13, -15],
        },
        {
          name: "Obrona przeciw urokom",
          effect: [-20, -22, -24, -26, -28, -31, -35],
        },
        {
          name: "curseRes",
          type: "numeric",
          effect: [0, -5, -10, -15, -20, -30, -45],
        },
      ],
    },
    skill8: {
      name: "Aura cienia",
      image: "images/Aura_cienia.jpg",
      description:
        "Przerażeni własnym mrokiem przeciwnicy, widząc tylko cień, nie są w stanie w pełni skutecznie używać ataku ani obrony dystansowej.",
      type: "attack",
      attackType: "mental",
      hitType: "knowledge",
      hittingMod: calculateLinearEffect(90, 2),
      cost: {
        mana: calculateLinearEffect(60, 9),
      },
      target: "group",
      duration: [4, 4, 5, 5, 6, 6, 6],
      effects: [
        {
          name: "Modyfikator trafień dystansowych",
          effect: calculateLinearEffect(-24, -4),
        },
        {
          name: "Obrona dystansowa",
          effect: calculateLinearEffect(-24, -4),
        },
      ],
    },
    skill9: {
      name: "Ukazanie Śmierci",
      image: "images/Ukazanie_śmierci.jpg",
      description:
        "Intencją czarownika jest sprowadzenie natychmiastowego zgonu na zaatakowaną osobę. Ofiara musi być bardzo osłabiona (działające efekty: zatrucie, oślepienie, otępienie, w PvE nie więcej niż 4000 lub 60% PŻ). W przypadku kiedy cel główny zawodzi, Ukazanie śmierci wywołuje u ofiary potężny szok, którego konsekwencją jest zupełne osłabienie ataków i obrony.",
      type: "attack",
      attackType: "mental",
      hitType: "knowledge",
      hittingMod: calculateLinearEffect(100, 3),
      cost: {
        mana: [50, 58, 65, 73, 80, 88, 95],
      },
      target: "group",
      duration: [4, 4, 5, 5, 6, 6, 6],
      effects: [
        {
          name: "Szansa na zabicie",
          effect: [20, 21, 22, 23, 24, 26, 30],
        },
        {
          name: "Skuteczność ataków",
          effect: [-30, -34, -38, -42, -46, -50, -55],
        },
        {
          name: "Skuteczność obrony",
          effect: [-30, -34, -38, -42, -46, -50, -55],
        },
      ],
    },
  },
};

export const basicSkillsDatabase: RawBasicSkills = {
  skill1: {
    name: "Cios pięścią",
    level: 1,
    minLvl: 1,
    requiredCharLevel: 1,
    initReqLvl: 1,
    image: "images/Cios_pięścią.jpg",
    description:
      "Podstawowy atak fizyczny. Ma większą szansę powodzenia niż atak za pomocą oręża, lecz zadaje mniejszą liczbę obrażeń. Zastosowanie kastetu zwiększa siłę ataku.",
    type: "attack",
    attackType: "melee",
    hitType: "agility",
    damageFormula: {
      strengthCoeff: 0.7,
      agilityCoeff: 0.3,
      weapon: true,
    },
    damageMod: calculateLinearEffect(80, 10),
    hittingMod: calculateLinearEffect(120, 5),
    cost: {
      endurance: [8, 9, 10, 12, 13, 14, 15],
    },
    target: "single",
  },
  skill2: {
    name: "Okrzyk bojowy",
    level: 1,
    minLvl: 1,
    requiredCharLevel: 1,
    initReqLvl: 1,
    image: "images/Okrzyk_bojowy.jpg",
    description:
      "Podstawowy urok. Wywołuje lęk u przeciwnika, obniżając jego skuteczność. Zmniejsza szansę powodzenia jego ataków fizycznych, dystansowych oraz magicznych.",
    type: "attack",
    attackType: "mental",
    hitType: "knowledge",
    hittingMod: calculateLinearEffect(100, 0),
    cost: {
      mana: [30, 35, 39, 44, 48, 53, 57],
    },
    target: "single",
    duration: [5, 5, 6, 6, 6, 6, 6],
    effects: [
      {
        name: "Skuteczność ataków",
        effect: calculateLinearEffect(-15, -5),
      },
    ],
  },
  skill3: {
    name: "Rzut kamieniem",
    level: 1,
    minLvl: 1,
    requiredCharLevel: 1,
    initReqLvl: 1,
    image: "images/Rzut_kamieniem.jpg",
    description:
      "Podstawowy atak dystansowy. Zadaje niewielką liczbę obrażeń, ale może być wykonywany nawet gdy postać wyposażona jest w miecz i tarczę. Nie wymaga żadnej broni dystansowej.",
    type: "attack",
    attackType: "ranged",
    hitType: "agility",
    damageFormula: {
      strengthCoeff: 1.26,
      agilityCoeff: 0.54,
    },
    damageMod: calculateLinearEffect(90, 8),
    hittingMod: calculateLinearEffect(110, 5),
    cost: {
      endurance: [8, 9, 10, 12, 13, 14, 15],
    },
    target: "single",
  },
  skill4: {
    name: "Strzał",
    level: 1,
    minLvl: 1,
    requiredCharLevel: 1,
    initReqLvl: 1,
    image: "images/Strzał.jpg",
    description:
      "Podstawowy atak dystansowy przy użyciu broni dalekiego zasięgu. Korzystając z tej umiejętności możemy atakować za pomocą łuku.",
    type: "attack",
    attackType: "ranged",
    hitType: "agility",
    damageFormula: {
      strengthCoeff: 0.7,
      agilityCoeff: 0.3,
      weapon: true,
    },
    damageMod: calculateLinearEffect(100, 14),
    hittingMod: [100, 103, 107, 110, 112, 115, 120],
    cost: {
      endurance: [10, 11, 13, 14, 16, 17, 19],
    },
    target: "single",
  },
  skill5: {
    name: "Zwykły atak",
    level: 1,
    minLvl: 1,
    requiredCharLevel: 1,
    initReqLvl: 1,
    image: "images/Zwykły_atak.jpg",
    description:
      "Podstawowy atak dystansowy przy użyciu broni dalekiego zasięgu. Korzystając z tej umiejętności możemy atakować za pomocą łuku.",
    type: "attack",
    attackType: "melee",
    hitType: "agility",
    damageFormula: {
      strengthCoeff: 0.7,
      agilityCoeff: 0.3,
      weapon: true,
    },
    damageMod: calculateLinearEffect(100, 14),
    hittingMod: [100, 103, 107, 110, 112, 115, 120],
    cost: {
      endurance: [10, 11, 13, 14, 16, 17, 19],
    },
    target: "single",
  },
  skill6: {
    name: "Ucieczka",
    level: 1,
    maxLvl: 1,
    minLvl: 1,
    requiredCharLevel: 1,
    initReqLvl: 1,
    image: "images/Ucieczka.jpg",
    description:
      "Umiejętność przydatna, gdy nie ma już wątpliwości, że walka skończy się porażką. Jeśli uda się z niej skorzystać postać wycofuje się do ostatniego bezpiecznego miejsca, w którym była. Ucieczka jest pewną formą pozytywnego uroku - każdy przydzielony jej PA zwiększa szansę dania nóg za pas o 20%.",
    type: "buff",
    target: "self",
    cost: {},
  },
  skill7: {
    name: "Wataha",
    requiredCharLevel: 35,
    requiredCharLevelInc: 10,
    initReqLvl: 35,
    image: "images/Wataha.jpg",
    description:
      "Umiejętność wykształcona przez wojowników samotników. Przemierzając rozległe krainy, udręczeni walką o przetrwanie i samotnością wykształcili w sobie unikalny system porozumiewania się ze zwierzakami. Dzięki niemu potrafią współpracować z więcej niż jednym zwierzem w drużynie.",
    type: "buff",
    target: "self",
    cost: {},
    effects: [
      {
        name: "Suma rang pupili",
        effect: [3, 4, 5, 6, 8, 12, 19],
        type: "numeric",
      },
      {
        name: "max-pets",
        effect: [2, 2, 2, 2, 2, 3, 3],
        type: "numeric",
      },
    ],
  },
  skill8: {
    name: "Wyrwanie z korzeni",
    level: 1,
    maxLvl: 1,
    minLvl: 1,
    initReqLvl: 1,
    requiredCharLevel: 1,
    image: "images/Rootbreaker.jpg",
    description:
      "Lata doświadczeń w boju pozwoliły wypracować umiejętność wyrwania się z uwięzi Korzeni. Wyrwanie z korzenia wymaga tyle PA, na ile rund są wrzucone Korzenie x 2. (np. Korzenie na 2 rundy, więc 4 PA). Działa tylko na rzucającego.",
    type: "buff",
    target: "self",
    cost: {
      endurance: calculateLinearEffect(30, 0),
    },
  },
};

export interface AllRawClassSkills {
  knight: RawSkills;
  barbarian: RawSkills;
  sheed: RawSkills;
  druid: RawSkills;
  firemage: RawSkills;
  archer: RawSkills;
  voodoo: RawSkills;
  [index: string]: RawSkills | RawBasicSkills;
}

export interface RawSkills {
  skill1: Attack | Buff;
  skill2: Attack | Buff;
  skill3: Attack | Buff;
  skill4: Attack | Buff;
  skill5: Attack | Buff;
  skill6: Attack | Buff;
  skill7: Attack | Buff;
  skill8: Attack | Buff;
  skill9: Attack | Buff;
  [index: string]: Attack | Buff;
}

export interface RawBasicSkills {
  skill1: Attack | Buff;
  skill2: Attack | Buff;
  skill3: Attack | Buff;
  skill4: Attack | Buff;
  skill5: Attack | Buff;
  skill6: Attack | Buff;
  skill7: Attack | Buff;
  skill8: Attack | Buff;
  [index: string]: Attack | Buff;
}

export interface RawSkill {
  name: string;
  image: string;
  description: string;
  cost: {
    mana?: [number, number, number, number, number, number, number];
    endurance?: [number, number, number, number, number, number, number];
  };
  target: "self" | "single" | "group";
  type: "attack" | "buff";
  damageFormula?: {
    strengthCoeff?: number;
    agilityCoeff?: number;
    powerCoeff?: number;
    knoCoeff?: number;
    manaCoeff?: number;
    weapon?: boolean;
  };
  damageMod?: [number, number, number, number, number, number, number];
  effects?: Effect[];
  level?: number;
  minLvl?: number;
  maxLvl?: number;
  requiredCharLevel?: number;
  initReqLvl?: number;
  requiredCharLevelInc?: number;
  duration?: [number, number, number, number, number, number, number];
  attackType?: "melee" | "ranged" | "mental";
  hitType?: "agility" | "knowledge";
  hittingMod?: [number, number, number, number, number, number, number];
  healing?: boolean;
  //(1.3 * Moc + 0.7 * Wiedza) * Siła leczenia * (1 + (modyfikator obrażeń / 2))
  difficulty?: [number, number, number, number, number, number, number];
}

export interface Attack extends RawSkill {
  type: "attack";
  attackType: "melee" | "ranged" | "mental";
  hitType: "agility" | "knowledge";
}

export interface Buff extends RawSkill {
  type: "buff";
}

export interface Effect {
  name: string;
  type?: "percentage" | "numeric";
  targetSelf?: boolean;
  cumulative?: boolean;
  duration?: [number, number, number, number, number, number, number];
  scaling?: string;
  // effectChance?: [number, number, number, number, number, number, number],
  effect: [number, number, number, number, number, number, number];
}

function calculateLinearEffect(
  startingValue: number,
  increment: number
): [number, number, number, number, number, number, number] {
  let values: [number, number, number, number, number, number, number] = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ];
  for (let index = 0; index < 7; index++) {
    values[index] = startingValue + index * increment;
  }
  return values;
}
