const skillsDatabase: AllRawSkills = {
  knight: {
    skill1: {
      name: "Szybkie Cięcie",
      description: "Silniejszy i celniejszy niż podstawowy Cios bronią.",
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
      duration: [3,3,4,4,5,5,5]
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
          effect: [2, 3, 3, 4, 4, 5, 5]
        },
        {
          name: "Skuteczność bloku",
          effect: calculateLinearEffect(45, 5),
        },
        {
          name: "Modyfikator trafień fizycznych",
          effect: calculateLinearEffect(-22, 0),
        }
      ]
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
        mana: calculateLinearEffect(20, 3)
      },
      effects: [
        {
          name: "Odp. fizyczne",
          type: "numeric",
          effect: [2, 8, 12, 18, 24, 30, 36]
        },
        {
          name: "Modyfikator trafień fizycznych",
          effect: calculateLinearEffect(14, 4)
        },
        {
          name: "Obrona wręcz",
          effect: calculateLinearEffect(-8, -2)
        },
        {
          name: "Obrona dystansowa",
          effect: calculateLinearEffect(-8, -2)
        },
        {
          name: "Koszt many na rundę",
          type: "numeric",
          effect: calculateLinearEffect(2, 3)
        }
      ]
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
          effect: [70, 74, 78, 82, 86, 90, 95]
        },
        {
          name: "Skuteczność bloku",
          effect: calculateLinearEffect(-3, 0),
        },
      ]
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
          effect: [1, 2, 6, 8, 10, 12, 14]
        },
        {
          name: "Odp. magiczne",
          type: "numeric",
          effect: calculateLinearEffect(11, 4)
        },
        {
          name: "Obrona przeciw urokom",
          effect: calculateLinearEffect(9, 6)
        },
      ]
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
          effect: calculateLinearEffect(-2, -8)
        },
        {
          name: "Modyfikator obrażeń fizycznych",
          effect: calculateLinearEffect(24, 4)
        },
      ]
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
        endurance: [15, 17, 20, 22, 24, 26, 29]
      },
      effects: [
        {
          name: "Zadawane obrażenia",
          effect: calculateLinearEffect(2, 14)
        },
        {
          name: "Skuteczność ataków",
          effect: [15, 17, 19, 21, 23, 25, 29]
        },
      ]
    },
  },
  barbarian: {
    skill1: {
      name: "Dyńka",
      image: "images/Dynka.jpg",
      description: "Słabsze od ciosu bronią, ma jednak zdecydowanie większą szansę trafienia. Zdezorientowany przeciwnik staje się łatwym celem. Uderzenie dodatkowo otwiera rany potęgując krwawienie.",
      type: "attack",
      attackType: "melee",
      hitType: "agility",
      damageFormula: {
        strengthCoeff: 1.2,
        agilityCoeff: 0.8
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
          effect: calculateLinearEffect(40, 0)
        },
      ]
    },
    skill2: {
      name: "Atak dwuręczny",
      image: "images/Dwuręczny.jpg",
      description: 'Uderzenie dwuręczne to "sztuka" posługiwania się tym subtelnym narzędziem mordu, niemożliwa do opanowania dla nikogo spoza grona Barbarzyńców.',
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
          name: "Obrona wręcz",
          type: "numeric",
          effect: [-1, -2, -2, -2, -3, -3, -4],
        }
      ]
    },
    skill4: {
      name: "Gruboskórność",
      image: "images/Gruboskórność.jpg",
      description: "Wystarczy, że Barbarzyńca odpowiednio się skoncentruje, a natychmiast twardnieje skóra jego oraz towarzyszy i staje się bardziej odporna na wszelkie bodźce.",
      type: "buff",
      duration: [3, 3, 4, 4, 5, 5, 5],
      target: "group",
      difficulty: calculateLinearEffect(160, 40),
      cost: {
        mana: [40, 46, 52, 58, 64, 70, 79],
        endurance: [15, 17, 20, 22, 24, 26, 29]
      },
      effects: [
        {
          name: "Odp. fizyczne",
          type: "numeric",
          effect: [8, 12, 15, 19, 22, 28, 35]
        },
        {
          name: "Odp. magiczne",
          type: "numeric",
          effect: [8, 12, 15, 19, 22, 28, 35]
        },
      ]
    },
    skill5: {
      name: "Gryzienie",
      image: "images/Gryzienie.jpg",
      description: "Postać rzuca się na przeciwnika, wgryzając mu się w szyję i zadając poważne obrażenia. Dodatkowo otwiera nowe rany, które sprawiają, że ugryziony w każdej turze traci określoną ilość punktów życia. Aktywne Krwawienie jest konieczne do rzucenia Zakażenia.",
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
          effect: calculateLinearEffect(90, 12),
        }
      ]
    },
    skill6: {
      name: "Furia",
      image: "images/Furia.jpg",
      description: "Doprowadzony do kresu Barbarzyńca potrafi wydobyć z siebie nieprawdopodobną siłę i w ostatniej chwili zmienić przebieg walki. Może wzbudzić w sobie pierwotny instynkt przetrwania, który sprawia, że rozrywa na oślep przeciwników, broniąc swojego życia budzącą respekt furią.",
      type: "buff",
      duration: [5, 5, 6, 6, 7, 7, 7],
      target: "self",
      difficulty: calculateLinearEffect(80, 20),
      cost: {
        mana: [10, 12, 13, 15, 16, 18, 20],
        endurance: [10, 12, 13, 15, 16, 18, 20]
      },
      effects: [
        {
          name: "Modyfikator obrażeń fizycznych",
          effect: [30, 34, 38, 42, 46, 50, 55]
        },
        {
          name: "Modyfikator trafień fizycznych",
          effect: calculateLinearEffect(-10, -2)
        },
        {
          name: "Modyfikator trafień dystansowych",
          effect: calculateLinearEffect(-10, -2)
        }
      ]
    },
    skill7: {
      name: "Zakażenie",
      image: "images/Zakażenie.jpg",
      description: "Zakażenie jest urokiem negatywnym. Wymagane jest aktywne krwawienie.",
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
        }
      ]
    },
    skill8: {
      name: "Ryk",
      image: "images/Ryk.jpg",
      description: "Diabelski ryk, który przeraża i paraliżuje słabsze psychicznie istoty, zapewniając Barbarzyńcy przewagę na polu bitwy.",
      type: "attack",
      attackType: "mental",
      hitType: "knowledge",
      cost: {
        mana: calculateLinearEffect(20, 3),
        endurance: [20, 23, 26, 29, 32, 35, 37]
      },
      target: "single",
      duration: [3, 3, 4, 4, 5, 5, 5],
      effects: [
        {
          name: "Skuteczność ataków",
          effect: [15, 18, 21, 24, 27, 30, 35]
        },
        {
          name: "Skuteczność obrony",
          effect: [15, 18, 21, 24, 27, 30, 35]
        }
      ]
    },
    skill9: {
      name: "Krytyczne uderzenie",
      image: "images/Krytyczne.jpg",
      description: 'Jest to umiejętność ostateczna. Barbarzyńca tym najpotężniejszym ciosem absolutnie zmienia układ sił na polu walki. Tak naprawdę żadne słowa nie oddadzą całej mocy tego ataku.',
      type: "attack",
      attackType: "melee",
      hitType: "agility",
      damageFormula: {
        strengthCoeff: 0.7,
        agilityCoeff: 0.3,
        weapon: true
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
      description: 'Cios nie należy do najsilniejszych jednak zrekompensowane jest to jego szybkością i precyzją. Kastety zwiększają zadawane obrażenia.',
      type: "attack",
      attackType: "melee",
      hitType: "agility",
      damageFormula: {
        strengthCoeff: 0.7,
        agilityCoeff: 0.3,
        weapon: true
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
      description: " Sheed zaskakuje przeciwnika silnym kopnięciem i, wytrącając go z równowagi, poważnie osłabia jego obrony.",
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
        }
      ]
    },
    skill3: {
      name: "Kontrola oddechu",
      image: "images/Kontrola_oddechu.jpg",
      description: "Skupienie i koncentracja podczas walki pozwalają wydajniej prowadzić swoje ciało, co umożliwia przeprowadzenie większej ilości akcji podczas tury oraz zwiększa zdolności regeneracyjne.",
      type: "buff",
      duration: [4, 4, 5, 5, 5, 6, 6],
      target: "single",
      difficulty: calculateLinearEffect(120, 30),
      cost: {
        mana: calculateLinearEffect(20, 3)
      },
      effects: [
        {
          name: "Dodatkowe PA",
          type: "numeric",
          effect: [1, 1, 1, 2, 2, 2, 2]
        },
        {
          name: "Regeneracja kondycji",
          effect: calculateLinearEffect(2, 0.5)
        },
        {
          name: "Regeneracja many",
          effect: calculateLinearEffect(0.4, 0.4)
        }
      ]
    },
    skill4: {
      name: "Dotkliwe uderzenie",
      image: "images/Dotkliwe_uderzenie.jpg",
    },
    skill5: {
      name: "Cios w wątrobę",
      image: "images/Cios_w_wątrobę.jpg",
    },
    skill6: {
      name: "Latające kolano",
      image: "images/Latające_kolano.jpg",
    },
    skill7: {
      name: "Uniki",
      image: "images/Uniki.jpg",
    },
    skill8: {
      name: "Haduoken",
      image: "images/Haduoken.jpg",
    },
    skill9: {
      name: "Uderzenie Chi",
      image: "images/Uderzenie_chi.jpg",
    },
  },
  druid: {
    skill1: {
      name: "Leczenie",
      image: "images/Leczenie.jpg",
    },
    skill2: {
      name: "Odczarowanie",
      image: "images/Odczarowanie.jpg",
    },
    skill3: {
      name: "Rój os",
      image: "images/Rój_os.jpg",
    },
    skill4: {
      name: "Wtapianie",
      image: "images/Wtapianie.jpg",
    },
    skill5: {
      name: "Wzmocnienie",
      image: "images/Wzmocnienie.jpg",
    },
    skill6: {
      name: "Uderzenie",
      image: "images/Uderzenie.jpg",
    },
    skill7: {
      name: "Źródło natury",
      image: "images/Źródło_natury.jpg",
    },
    skill8: {
      name: "Leczenie grupowe",
      image: "images/Leczenie_grupowe.jpg",
    },
    skill9: {
      name: "Korzenie",
      image: "images/Korzenie.jpg",
    },
  },
  firemage: {
    skill1: {
      name: "Magiczna iskra",
      image: "images/Magiczna_iskra.jpg",
    },
    skill2: {
      name: "Wrażliwość na Ogień",
      image: "images/Wrażliwość_na_ogień.jpg",
    },
    skill3: {
      name: "Ognista Sfera",
      image: "images/Ognista_sfera.jpg",
    },
    skill4: {
      name: "Inkantacja",
      image: "images/Inkantacja.jpg",
    },
    skill5: {
      name: "Aura Rozproszenia",
      image: "images/Aura.jpg",
    },
    skill6: {
      name: "Podpalenie",
      image: "images/Podpalenie.jpg",
    },
    skill7: {
      name: "Kula ognia",
      image: "images/Kula_ognia.jpg",
    },
    skill8: {
      name: "Deszcz ognia",
      image: "images/Deszcz_ognia.jpg",
    },
    skill9: {
      name: "Meteoryt",
      image: "images/Meteoryt.jpg",
    },
  },
  archer: {
    skill1: {
      name: "Precyzyjny strzał",
      image: "images/Precyzyjny_strzał.jpg",
    },
    skill2: {
      name: "Krótkie spięcie",
      image: "images/Krótkie_spięcie.jpeg",
    },
    skill3: {
      name: "Zatruta Strzała",
      image: "images/Zatruta_strzała.jpg",
    },
    skill4: {
      name: "Wyostrzone zmysły",
      image: "images/Wyostrzone_zmysły.jpg",
    },
    skill5: {
      name: "Ognista strzała",
      image: "images/Ognista_strzała.jpg",
    },
    skill6: {
      name: "Piach w oczy",
      image: "images/Piach_w_oczy.jpg",
    },
    skill7: {
      name: "Strzał strategiczny",
      image: "images/Strzał_strategiczny.jpg",
    },
    skill8: {
      name: "Lodowa strzała",
      image: "images/Lodowa_strzała.jpg",
    },
    skill9: {
      name: "Grad strzał",
      image: "images/Grad_strzał.jpg",
    },
  },
  voodoo: {
    skill1: {
      name: "Ukłucie lalki",
      image: "images/Ukłucie_lalki.jpg",
    },
    skill2: {
      name: "Szpila w oko",
      image: "images/Szpila_w_oko.jpg",
    },
    skill3: {
      name: "Wyssanie duszy",
      image: "images/Wyssanie_duszy.jpg",
    },
    skill4: {
      name: "Hak w brzuch",
      image: "images/Hak_w_brzuch.jpg",
    },
    skill5: {
      name: "Zatrucie",
      image: "images/Zatrucie.jpg",
    },
    skill6: {
      name: "Uderzenie cienia",
      image: "images/Uderzenie_cienia.jpg",
    },
    skill7: {
      name: "Otępienie",
      image: "images/Otępienie.jpg",
    },
    skill8: {
      name: "Aura cienia",
      image: "images/Aura_cienia.jpg",
    },
    skill9: {
      name: "Ukazanie Śmierci",
      image: "images/Ukazanie_śmierci.jpg",
    },
  },
};

export interface AllRawSkills {
  knight: RawSkills;
  barbarian: RawSkills;
  sheed: RawSkills;
  druid: RawSkills;
  firemage: RawSkills;
  archer: RawSkills;
  voodoo: RawSkills;
  [index: string]: RawSkills;
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

export interface RawSkill {
  name: string;
  image: string;
  description: string;
  cost: {
    mana?: [number, number, number, number, number, number, number];
    endurance?: [number, number, number, number, number, number, number];
  };
  target: "self" | "single" | "group";
  damageFormula?: {
    strengthCoeff?: number;
    agilityCoeff?: number;
    powerCoeff?: number;
    knoCoeff?: number;
    weapon?: boolean;
  };
}

export interface Attack extends RawSkill {
  type: "attack";
  attackType: "melee" | "ranged" | "mental"
  hitType: "agility" | "knowledge";
  damageMod?: [number, number, number, number, number, number, number];
  hittingMod?: [number, number, number, number, number, number, number];
  duration?: [number, number, number, number, number, number, number];
  effects?: Effect[];
}

export interface Buff extends RawSkill {
  type: "buff";
  healing?: boolean;
  duration: [number, number, number, number, number, number, number];
  difficulty: [number, number, number, number, number, number, number];
  effects: Effect[];
}

export interface Effect {
  name: string;
  type?: "percentage" | "numeric"
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

export default skillsDatabase;
