import React from "react";

const skillsDatabase = {
  knight: {
    skill1: {
      name: "Szybkie Cięcie",
      description: ( <
        div >
        <
        p >
        Podstawa rycerskiego rzemiosła.Cios ćwiczony przez Rycerzy na każdym dworze Taernu.Celny i błyskawiczny atak bronią, zaskakujący przeciwnika.Silniejszy i celniejszy niż podstawowy Cios bronią. <
        /p> <
        p > Dostępne od 2 poziomu doświadczenia < /p> <
        p > OBR: 0.7 * Siła + 0.3 * Zręczność + broń < /p> < /
        div >
      ),
      table: ( <
        table >
        <
        tbody >
        <
        tr >
        <
        td > Poziom Um < /td> <
        td > Obrażenia < /td> <
        td > Szansa trafienia < /td> <
        td > Kondycja < /td> < /
        tr > <
        tr >
        <
        td > I < /td> <
        td > 110 % < /td> <
        td > 120 % < /td> <
        td > 12 < /td> < /
        tr > <
        tr >
        <
        td > II < /td> <
        td > 120 % < /td> <
        td > 125 % < /td> <
        td > 14 < /td> < /
        tr > <
        tr >
        <
        td > III < /td> <
        td > 130 % < /td> <
        td > 130 % < /td> <
        td > 16 < /td> < /
        tr > <
        tr >
        <
        td > IV < /td> <
        td > 140 % < /td> <
        td > 135 % < /td> <
        td > 18 < /td> < /
        tr > <
        tr >
        <
        td > V < /td> <
        td > 150 % < /td> <
        td > 140 % < /td> <
        td > 19 < /td> < /
        tr > <
        tr >
        <
        td > VI < /td> <
        td > 160 % < /td> <
        td > 145 % < /td> <
        td > 21 < /td> < /
        tr > <
        tr >
        <
        td > VII < /td> <
        td > 170 % < /td> <
        td > 155 % < /td> <
        td > 23 < /td> < /
        tr > <
        /tbody> < /
        table >
      ),
      image: "images/Szybkie_Cięcie.jpg"
    },
    skill2: {
      name: "Mierzony Cios",
      description: ( <
        div >
        <
        p >
        Wieloletnie treningi sztuk walki i dbanie o kondycję fizyczną sprawiły, że większość Rycerzy zaniedbała swoją wiedzę(nie mylić z ich stroną duchową), przez co stali się bardziej podatni na uroki.Opracowany przeciwko magom, czarownikom i łucznikom Mierzony cios jest techniką mającą odwrócić tę tendencję.Skutecznie przeprowadzony oszałamia ofiarę obniżając efektywność jej ataków dystansowych i uroków.Dodatkowo podnosi obrażenia Potężnego uderzenia o 15 % . <
        /p> <
        p > Dostępne od 5 poziomu doświadczenia < /p> <
        p > OBR: 0.7 * Siła + 0.3 * Zręczność + broń < /p> < /
        div >
      ),
      table: ( <
        table >
        <
        tbody >
        <
        tr >
        <
        td > Poziom Um < /td> <
        td > Obrażenia < /td> <
        td > Szansa trafienia < /td> <
        td > Kondycja < /td> <
        td > Atak magiczny i dystansowy(szansa trafienia) < /td> <
        td > Czas < /td> < /
        tr > <
        tr >
        <
        td > I < /td> <
        td > 80 % < /td> <
        td > 100 % < /td> <
        td > 20 < /td> <
        td > -25 % < /td> <
        td > 3 < /td> < /
        tr > <
        tr >
        <
        td > II < /td> <
        td > 85 % < /td> <
        td > 103 % < /td> <
        td > 23 < /td> <
        td > -28 % < /td> <
        td > 3 < /td> < /
        tr > <
        tr >
        <
        td > III < /td> <
        td > 90 % < /td> <
        td > 107 % < /td> <
        td > 26 < /td> <
        td > -31 % < /td> <
        td > 4 < /td> < /
        tr > <
        tr >
        <
        td > IV < /td> <
        td > 95 % < /td> <
        td > 110 % < /td> <
        td > 29 < /td> <
        td > -34 % < /td> <
        td > 4 < /td> < /
        tr > <
        tr >
        <
        td > V < /td> <
        td > 100 % < /td> <
        td > 112 % < /td> <
        td > 32 < /td> <
        td > -37 % < /td> <
        td > 5 < /td> < /
        tr > <
        tr >
        <
        td > VI < /td> <
        td > 110 % < /td> <
        td > 115 % < /td> <
        td > 35 < /td> <
        td > -41 % < /td> <
        td > 5 < /td> < /
        tr > <
        tr >
        <
        td > VII < /td> <
        td > 120 % < /td> <
        td > 118 % < /td> <
        td > 38 < /td> <
        td > -45 % < /td> <
        td > 5 < /td> < /
        tr > <
        /tbody> < /
        table >
      ),
      image: "images/Mierzony_Cios.jpg"
    },
    skill3: {
      name: "Blok Tarczą",
      description: ( <
        div >
        <
        p >
        Tarcza to nie płot, za którym można się schować, tarczą trzeba umieć się posługiwać.Do tego służy umiejętność Blok Tarczą.Dzięki morderczemu treningowi Rycerz wie, kiedy i jak należy postawić blok,
        aby udany atak nawet kilku przeciwników zadał minimalne obrażenia.Każdy udany blok jest o 3 % słabszy od poprzedniego i nie wpływa na redukcję obrażeń od żywiołów zaklętą w broniach.Użyta równocześnie Ochrona osłabia o kolejne 3 % skuteczność bloku.Taka zasłona obniża też szansę na trafienie przeciwnika w zwarciu o 22 % . <
        /p> <
        p > Dostępne od 8 poziomu doświadczenia < /p> < /
        div >
      ),
      table: ( <
        table >
        <
        tbody >
        <
        tr >
        <
        td > Poziom Um < /td> <
        td > Ilość bloków < /td> <
        td > Skuteczność bloku < /td> <
        td > Kondycja < /td> <
        td > Trudność < /td> < /
        tr > <
        tr >
        <
        td > I < /td> <
        td > 2 < /td> <
        td > 45 % < /td> <
        td > 20 < /td> <
        td > 90 < /td> < /
        tr > <
        tr >
        <
        td > II < /td> <
        td > 3 < /td> <
        td > 50 % < /td> <
        td > 23 < /td> <
        td > 85 < /td> < /
        tr > <
        tr >
        <
        td > III < /td> <
        td > 3 < /td> <
        td > 55 % < /td> <
        td > 26 < /td> <
        td > 80 < /td> < /
        tr > <
        tr >
        <
        td > IV < /td> <
        td > 4 < /td> <
        td > 60 % < /td> <
        td > 29 < /td> <
        td > 75 < /td> < /
        tr > <
        tr >
        <
        td > V < /td> <
        td > 4 < /td> <
        td > 65 % < /td> <
        td > 32 < /td> <
        td > 70 < /td> < /
        tr > <
        tr >
        <
        td > VI < /td> <
        td > 5 < /td> <
        td > 70 % < /td> <
        td > 35 < /td> <
        td > 65 < /td> < /
        tr > <
        tr >
        <
        td > VII < /td> <
        td > 5 < /td> <
        td > 75 % < /td> <
        td > 38 < /td> <
        td > 60 < /td> < /
        tr > <
        /tbody> < /
        table >
      ),
      image: "images/Blok_Tarczą.jpg"
    },
    skill4: {
      name: "Trans",
      description: ( <
        div >
        <
        p >
        Wieloletnie szkolenie Rycerza nie ograniczało się wyłącznie do
          poprawiania jego warunków fizycznych i zdolności bojowych.Rycerstwo
        to również stan ducha.Obowiązkowe medytacje i mistyczne praktyki umożliwiły członkom rycerskiego stanu wchodzenie w Trans.Nadnaturalne skupienie i niebywała koncentracja sprawiły, że Rycerz w stopniu doskonałym panuje nad swoimi ruchami, dzięki czemu jego trafienia są pewniejsze, a rany zadawane wrogom - głębsze. <
        /p> <
        p > Dostępne od 12 poziomu doświadczenia < /p> < /
        div >
      ),
      table: ( <
        table >
        <
        tbody >
        <
        tr >
        <
        td > Poziom Um < /td> <
        td > Obrażenia fizyczne < /td> <
        td > Atak fizyczny(szansa trafienia) < /td> <
        td > Czas < /td> <
        td > Mana < /td> <
        td > Trudność < /td> < /
        tr > <
        tr >
        <
        td > I < /td> <
        td > +15 % < /td> <
        td > +20 % < /td> <
        td > 3 < /td> <
        td > 20 < /td> <
        td > 85 < /td> < /
        tr > <
        tr >
        <
        td > II < /td> <
        td > +16 % < /td> <
        td > +23 % < /td> <
        td > 3 < /td> <
        td > 23 < /td> <
        td > 80 < /td> < /
        tr > <
        tr >
        <
        td > III < /td> <
        td > +17 % < /td> <
        td > +26 % < /td> <
        td > 4 < /td> <
        td > 26 < /td> <
        td > 75 < /td> < /
        tr > <
        tr >
        <
        td > IV < /td> <
        td > +18 % < /td> <
        td > +29 % < /td> <
        td > 4 < /td> <
        td > 29 < /td> <
        td > 70 < /td> < /
        tr > <
        tr >
        <
        td > V < /td> <
        td > +19 % < /td> <
        td > +32 % < /td> <
        td > 5 < /td> <
        td > 32 < /td> <
        td > 65 < /td> < /
        tr > <
        tr >
        <
        td > VI < /td> <
        td > +20 % < /td> <
        td > +35 % < /td> <
        td > 5 < /td> <
        td > 35 < /td> <
        td > 60 < /td> < /
        tr > <
        tr >
        <
        td > VII < /td> <
        td > +22 % < /td> <
        td > +38 % < /td> <
        td > 5 < /td> <
        td > 38 < /td> <
        td > 55 < /td> < /
        tr > <
        /tbody> < /
        table >
      ),
      image: "images/Trans.jpg"
    },
    skill5: {
      name: "Ochrona",
      description: ( <
        div >
        <
        p >
        Rycerz to przede wszystkim przewodnik i obrońca.Etos, który definiuje tę klasę społeczną, nakazuje mu wręcz rzucenie się na ratunek, gdy zagrożone jest życie towarzysza.Umiejętność Ochrony daje szansę, że ataki przeciwników wymierzone w bronioną przez rycerza postać zostaną przekierowane na rycerza.Działa na ataki wręcz oraz dystansowe, z wyłączeniem ataków obszarowych.Użyta ochrona osłabia o 3 % skuteczność Bloku Tarczą. <
        /p> <
        p > Dostępne od 15 poziomu doświadczenia < /p> < /
        div >
      ),
      table: ( <
        table >
        <
        tbody >
        <
        tr >
        <
        td > Poziom Um < /td> <
        td > Skuteczność Ochrony < /td> <
        td > Kondycja < /td> <
        td > Trudność < /td> < /
        tr > <
        tr >
        <
        td > I < /td> <
        td > 70 % < /td> <
        td > 40 < /td> <
        td > 85 < /td> < /
        tr > <
        tr >
        <
        td > II < /td> <
        td > 74 % < /td> <
        td > 46 < /td> <
        td > 80 < /td> < /
        tr > <
        tr >
        <
        td > III < /td> <
        td > 78 % < /td> <
        td > 52 < /td> <
        td > 75 < /td> < /
        tr > <
        tr >
        <
        td > IV < /td> <
        td > 82 % < /td> <
        td > 58 < /td> <
        td > 70 < /td> < /
        tr > <
        tr >
        <
        td > V < /td> <
        td > 86 % < /td> <
        td > 64 < /td> <
        td > 65 < /td> < /
        tr > <
        tr >
        <
        td > VI < /td> <
        td > 90 % < /td> <
        td > 70 < /td> <
        td > 60 < /td> < /
        tr > <
        tr >
        <
        td > VII < /td> <
        td > 95 % < /td> <
        td > 76 < /td> <
        td > 55 < /td> < /
        tr > <
        /tbody> < /
        table >
      ),
      image: "images/Ochrona.jpg"
    },
    skill6: {
      name: "Potężne Uderzenie",
      description: ( <
        div >
        <
        p >
        Nawet tak opanowany i skoncentrowany Taernijczyk jak Rycerz czasami wpada w furię.Poskramiając zło i niesprawiedliwość nie zawsze zachowuje właściwe proporcje i czasami po prostu pragnie pierdolnąć najmocniej jak potrafi.Do tego właśnie służy Potężne uderzenie.Bardzo energochłonny atak zadaje ogromną ilość ran i dziesiątkuję przeciwników.Zawczasu oszołomione postacie otrzymują znacznie więcej obrażeń. <
        /p> <
        p > Dostępne od 18 poziomu doświadczenia < /p> <
        p > OBR: 0.7 * Siła + 0.3 * Zręczność + broń < /p> < /
        div >
      ),
      table: ( <
        table >
        <
        tbody >
        <
        tr >
        <
        td > Poziom Um < /td> <
        td > Obrażenia < /td> <
        td > Szansa trafienia < /td> <
        td > Kondycja < /td> < /
        tr > <
        tr >
        <
        td > I < /td> <
        td > 160 % < /td> <
        td > 100 % < /td> <
        td > 20 < /td> < /
        tr > <
        tr >
        <
        td > II < /td> <
        td > 175 % < /td> <
        td > 103 % < /td> <
        td > 23 < /td> < /
        tr > <
        tr >
        <
        td > III < /td> <
        td > 190 % < /td> <
        td > 107 % < /td> <
        td > 26 < /td> < /
        tr > <
        tr >
        <
        td > IV < /td> <
        td > 205 % < /td> <
        td > 110 % < /td> <
        td > 29 < /td> < /
        tr > <
        tr >
        <
        td > V < /td> <
        td > 220 % < /td> <
        td > 112 % < /td> <
        td > 32 < /td> < /
        tr > <
        tr >
        <
        td > VI < /td> <
        td > 235 % < /td> <
        td > 114 % < /td> <
        td > 35 < /td> < /
        tr > <
        tr >
        <
        td > VII < /td> <
        td > 255 % < /td> <
        td > 117 % < /td> <
        td > 38 < /td> < /
        tr > <
        /tbody> < /
        table >
      ),
      image: "images/Potężne_Uderzenie.jpg"
    },
    skill7: {
      name: "Aura Czystości",
      description: ( <
        div >
        <
        p >
        Rycerz to prawy i sprawiedliwy człowiek walczący z podłością i niegodziwością.Wyrazem tego jest umiejętność wywołania wokół siebie aury, która daje mu duchową odporność na uroki oraz zmniejsza jego podatność na czary przeciwników.Aura może służyć tak Rycerzowi jak i wybranej przez niego sojuszniczej postaci. <
        /p> <
        p > Dostępne od 22 poziomu doświadczenia < /p> < /
        div >
      ),
      table: ( <
        table >
        <
        tbody >
        <
        tr >
        <
        td > Poziom Um < /td> <
        td > Obrona przed urokami < /td> <
        td > Odporność na obrażenia od magii < /td> <
        td > Czas < /td> <
        td > Mana < /td> <
        td > Trudność < /td> < /
        tr > <
        tr >
        <
        td > I < /td> <
        td > +23 % < /td> <
        td > +15 % < /td> <
        td > 3 < /td> <
        td > 30 < /td> <
        td > 85 < /td> < /
        tr > <
        tr >
        <
        td > II < /td> <
        td > +27 % < /td> <
        td > +18 % < /td> <
        td > 3 < /td> <
        td > 35 < /td> <
        td > 80 < /td> < /
        tr > <
        tr >
        <
        td > III < /td> <
        td > +30 % < /td> <
        td > +21 % < /td> <
        td > 4 < /td> <
        td > 39 < /td> <
        td > 75 < /td> < /
        tr > <
        tr >
        <
        td > IV < /td> <
        td > +34 % < /td> <
        td > +24 % < /td> <
        td > 4 < /td> <
        td > 44 < /td> <
        td > 70 < /td> < /
        tr > <
        tr >
        <
        td > V < /td> <
        td > +37 % < /td> <
        td > +27 % < /td> <
        td > 5 < /td> <
        td > 48 < /td> <
        td > 65 < /td> < /
        tr > <
        tr >
        <
        td > VI < /td> <
        td > +40 % < /td> <
        td > +30 % < /td> <
        td > 5 < /td> <
        td > 53 < /td> <
        td > 60 < /td> < /
        tr > <
        tr >
        <
        td > VII < /td> <
        td > +45 % < /td> <
        td > +34 % < /td> <
        td > 5 < /td> <
        td > 57 < /td> <
        td > 55 < /td> < /
        tr > <
        /tbody> < /
        table >
      ),
      image: "images/Aura_Czystości.jpg"
    },
    skill8: {
      name: "Poświęcenie",
      description: ( <
        div >
        <
        p >
        Ofiarność i chęć czynienia dobra jest priorytetem Rycerza, dlatego w momencie zagrożenia wartości nadrzędnych Rycerz, rzuca na siebie urok pozytywny, który obniża jego obronę, wzmacnia za to ataki.Odsłaniając się i odnosząc większe obrażenia, dziesiątkuje wrogów broniąc zasad, za które gotów jest oddać życie. <
        /p> <
        p > Dostępne od 26 poziomu doświadczenia < /p> < /
        div >
      ),
      table: ( <
        table >
        <
        tbody >
        <
        tr >
        <
        td > Poziom Um < /td> <
        td > Obrażenia fizyczne < /td> <
        td > Obrona fizyczna < /td> <
        td > Czas < /td> <
        td > Mana < /td> <
        td > Trudność < /td> < /
        tr > <
        tr >
        <
        td > I < /td> <
        td > +30 % < /td> <
        td > -15 % < /td> <
        td > 5 < /td> <
        td > 30 < /td> <
        td > 90 < /td> < /
        tr > <
        tr >
        <
        td > II < /td> <
        td > +32 % < /td> <
        td > -16 % < /td> <
        td > 5 < /td> <
        td > 35 < /td> <
        td > 85 < /td> < /
        tr > <
        tr >
        <
        td > III < /td> <
        td > +34 % < /td> <
        td > -17 % < /td> <
        td > 6 < /td> <
        td > 39 < /td> <
        td > 80 < /td> < /
        tr > <
        tr >
        <
        td > IV < /td> <
        td > +36 % < /td> <
        td > -18 % < /td> <
        td > 6 < /td> <
        td > 44 < /td> <
        td > 75 < /td> < /
        tr > <
        tr >
        <
        td > V < /td> <
        td > +38 % < /td> <
        td > -19 % < /td> <
        td > 7 < /td> <
        td > 48 < /td> <
        td > 70 < /td> < /
        tr > <
        tr >
        <
        td > VI < /td> <
        td > +40 % < /td> <
        td > -20 % < /td> <
        td > 7 < /td> <
        td > 52 < /td> <
        td > 65 < /td> < /
        tr > <
        tr >
        <
        td > VII < /td> <
        td > +43 % < /td> <
        td > -20 % < /td> <
        td > 7 < /td> <
        td > 57 < /td> <
        td > 60 < /td> < /
        tr > <
        /tbody> < /
        table >
      ),
      image: "images/Poświęcenie.jpg"
    },
    skill9: {
      name: "Siła Jedności",
      description: ( <
        div >
        <
        p >
        Rycerz, wykorzystując swoje naturalne zdolności przywódcze i charyzmę, skupia wokół siebie całą drużynę.Dzięki zapalczywym mowom i okrzykom wznoszonym na polu walki, wśród walczących po swojej stronie wywołuje poczucie jedności, które zwiększa ich zapał i siłę.Postacie pod wpływem siły jedności zadają większe obrażenia oraz są skuteczniejsze. <
        /p> <
        p > Dostępne od 30 poziomu doświadczenia < /p> <
        p > Zwiększa obrażenia oraz celność całej drużyny < /p> < /
        div >
      ),
      table: ( <
        table >
        <
        tbody >
        <
        tr >
        <
        td > Poziom Um < /td> <
        td > Zadawane obrażenia < /td> <
        td > Skuteczność ataków < /td> <
        td > Czas < /td> <
        td > Kondycja < /td> <
        td > Mana < /td> <
        td > Trudność < /td> < /
        tr > <
        tr >
        <
        td > I < /td> <
        td > +15 % < /td> <
        td > +15 % < /td> <
        td > 3 < /td> <
        td > 15 < /td> <
        td > 40 < /td> <
        td > 85 < /td> < /
        tr > <
        tr >
        <
        td > II < /td> <
        td > +17 % < /td> <
        td > +17 % < /td> <
        td > 3 < /td> <
        td > 18 < /td> <
        td > 46 < /td> <
        td > 80 < /td> < /
        tr > <
        tr >
        <
        td > III < /td> <
        td > +19 % < /td> <
        td > +19 % < /td> <
        td > 4 < /td> <
        td > 20 < /td> <
        td > 52 < /td> <
        td > 75 < /td> < /
        tr > <
        tr >
        <
        td > IV < /td> <
        td > +21 % < /td> <
        td > +21 % < /td> <
        td > 4 < /td> <
        td > 22 < /td> <
        td > 58 < /td> <
        td > 70 < /td> < /
        tr > <
        tr >
        <
        td > V < /td> <
        td > +23 % < /td> <
        td > +23 % < /td> <
        td > 5 < /td> <
        td > 24 < /td> <
        td > 64 < /td> <
        td > 65 < /td> < /
        tr > <
        tr >
        <
        td > VI < /td> <
        td > +25 % < /td> <
        td > +25 % < /td> <
        td > 5 < /td> <
        td > 27 < /td> <
        td > 70 < /td> <
        td > 60 < /td> < /
        tr > <
        tr >
        <
        td > VII < /td> <
        td > +29 % < /td> <
        td > +29 % < /td> <
        td > 5 < /td> <
        td > 28 < /td> <
        td > 76 < /td> <
        td > 55 < /td> < /
        tr > <
        /tbody> < /
        table >
      ),
      image: "images/Siła_jedności.jpg"
    }
  },
  barbarian: {
    skill1: {
      name: "Dynka",
      image: "images/Dynka.jpg"
    },
    skill2: {
      name: "Atak dwuręczny",
      image: "images/Dwuręczny.jpg"
    },
    skill3: {
      name: "Taran",
      image: "images/Taran.jpg"
    },
    skill4: {
      name: "Gruboskórność",
      image: "images/Gruboskórność.jpg"
    },
    skill5: {
      name: "Gryzienie",
      image: "images/Gryzienie.jpg"
    },
    skill6: {
      name: "Furia",
      image: "images/Furia.jpg"
    },
    skill7: {
      name: "Zakażenie",
      image: "images/Zakażenie.jpg"
    },
    skill8: {
      name: "Ryk",
      image: "images/Ryk.jpg"
    },
    skill9: {
      name: "Krytyczne",
      image: "images/Krytyczne.jpg"
    }
  },
  sheed: {
    skill1: {
      name: "Lewy prawy",
      image: "images/Lewy,_Prawy.jpg"
    },
    skill2: {
      name: "Front kick",
      image: "images/Front_Kick.jpg"
    },
    skill3: {
      name: "Kontrola oddechu",
      image: "images/Kontrola_oddechu.jpg"
    },
    skill4: {
      name: "Dotkliwe uderzenie",
      image: "images/Dotkliwe_uderzenie.jpg"
    },
    skill5: {
      name: "Cios w wątrobę",
      image: "images/Cios_w_wątrobę.jpg"
    },
    skill6: {
      name: "Latające kolano",
      image: "images/Latające_kolano.jpg"
    },
    skill7: {
      name: "Uniki",
      image: "images/Uniki.jpg"
    },
    skill8: {
      name: "Haduoken",
      image: "images/Haduoken.jpg"
    },
    skill9: {
      name: "Uderzenie Chi",
      image: "images/Uderzenie_chi.jpg"
    }
  },
  druid: {
    skill1: {
      name: "Leczenie",
      image: "images/Leczenie.jpg"
    },
    skill2: {
      name: "Odczarowanie",
      image: "images/Odczarowanie.jpg"
    },
    skill3: {
      name: "Rój os",
      image: "images/Rój_os.jpg"
    },
    skill4: {
      name: "Wtapianie",
      image: "images/Wtapianie.jpg"
    },
    skill5: {
      name: "Wzmocnienie",
      image: "images/Wzmocnienie.jpg"
    },
    skill6: {
      name: "Uderzenie",
      image: "images/Uderzenie.jpg"
    },
    skill7: {
      name: "Źródło natury",
      image: "images/Źródło_natury.jpg"
    },
    skill8: {
      name: "Leczenie grupowe",
      image: "images/Leczenie_grupowe.jpg"
    },
    skill9: {
      name: "Korzenie",
      image: "images/Korzenie.jpg"
    }
  },
  firemage: {
    skill1: {
      name: "Magiczna iskra",
      image: "images/Magiczna_iskra.jpg"
    },
    skill2: {
      name: "Wrażliwość na ogień",
      image: "images/Wrażliwość_na_ogień.jpg"
    },
    skill3: {
      name: "Ognista sfera",
      image: "images/Ognista_sfera.jpg"
    },
    skill4: {
      name: "Inkantacja",
      image: "images/Inkantacja.jpg"
    },
    skill5: {
      name: "Aura rozproszenia",
      image: "images/Aura.jpg"
    },
    skill6: {
      name: "Podpalenie",
      image: "images/Podpalenie.jpg"
    },
    skill7: {
      name: "Kula ognia",
      image: "images/Kula_ognia.jpg"
    },
    skill8: {
      name: "Deszcz ognia",
      image: "images/Deszcz_ognia.jpg"
    },
    skill9: {
      name: "Meteoryt",
      image: "images/Meteoryt.jpg"
    }
  },
  archer: {
    skill1: {
      name: "Precyzyjny strzał",
      image: "images/Precyzyjny_strzał.jpg"
    },
    skill2: {
      name: "Krótkie spięcie",
      image: "images/Krótkie_spięcie.jpeg"
    },
    skill3: {
      name: "Zatruta strzała",
      image: "images/Zatruta_strzała.jpg"
    },
    skill4: {
      name: "Wyostrzone zmysły",
      image: "images/Wyostrzone_zmysły.jpg"
    },
    skill5: {
      name: "Ognista strzała",
      image: "images/Ognista_strzała.jpg"
    },
    skill6: {
      name: "Piach w oczy",
      image: "images/Piach_w_oczy.jpg"
    },
    skill7: {
      name: "Strzał strategiczny",
      image: "images/Strzał_strategiczny.jpg"
    },
    skill8: {
      name: "Lodowa strzała",
      image: "images/Lodowa_strzała.jpg"
    },
    skill9: {
      name: "Grad strzał",
      image: "images/Grad_strzał.jpg"
    }
  },
  voodoo: {
    skill1: {
      name: "Ukłucie lalki",
      image: "images/Ukłucie_lalki.jpg"
    },
    skill2: {
      name: "Szpila w oko",
      image: "images/Szpila_w_oko.jpg"
    },
    skill3: {
      name: "Wyssanie duszy",
      image: "images/Wyssanie_duszy.jpg"
    },
    skill4: {
      name: "Hak w brzuch",
      image: "images/Hak_w_brzuch.jpg"
    },
    skill5: {
      name: "Zatrucie",
      image: "images/Zatrucie.jpg"
    },
    skill6: {
      name: "Uderzenie cienia",
      image: "images/Uderzenie_cienia.jpg"
    },
    skill7: {
      name: "Otępienie",
      image: "images/Otępienie.jpg"
    },
    skill8: {
      name: "Aura cienia",
      image: "images/Aura_cienia.jpg"
    },
    skill9: {
      name: "Ukazanie śmierci",
      image: "images/Ukazanie_śmierci.jpg"
    }
  }
};

export default skillsDatabase
