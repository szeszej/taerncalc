import React from "react";
import { Skill } from "./skill.model.js"

export class SkillSet {
  constructor(charClass, database) {
    this.skill1 = {
      name: "Cios pięścią",
      level: 1,
      maxLvl: 7,
      minLvl: 1,
      requiredCharLevel: 1,
      requiredCharLevelInc: 1,
      initReqLvl: 1,
      description: ( <
        div >
        <
        p >
        Podstawowy atak fizyczny.Ma większą szansę powodzenia niż atak za pomocą oręża, lecz zadaje mniejszą liczbę obrażeń.Zastosowanie kastetu zwiększa siłę ataku. <
        /p> <
        p > Dostępne od 1 poziomu doświadczenia < /p> <
        p > Atak fizyczny < /p> <
        p > OBR: 0.7 * Siła + 0.5 * Zręczność + (70 % lub broń) < /p> < /
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
        td > 80 % < /td> <
        td > +20 % < /td> <
        td > 8 < /td> < /
        tr > <
        tr >
        <
        td > II < /td> <
        td > 85 % < /td> <
        td > +25 % < /td> <
        td > 9 < /td> < /
        tr > <
        tr >
        <
        td > III < /td> <
        td > 90 % < /td> <
        td > +30 % < /td> <
        td > 10 < /td> < /
        tr > <
        tr >
        <
        td > IV < /td> <
        td > 95 % < /td> <
        td > +35 % < /td> <
        td > 12 < /td> < /
        tr > <
        tr >
        <
        td > V < /td> <
        td > 100 % < /td> <
        td > +40 % < /td> <
        td > 13 < /td> < /
        tr > <
        tr >
        <
        td > VI < /td> <
        td > 110 % < /td> <
        td > +45 % < /td> <
        td > 14 < /td> < /
        tr > <
        tr >
        <
        td > VII < /td> <
        td > 120 % < /td> <
        td > +50 % < /td> <
        td > 15 < /td> < /
        tr > <
        /tbody> < /
        table >
      ),
      image: "images/Cios_pięścią.jpg"
    };
    this.skill2 = {
      name: "Okrzyk bojowy",
      level: 1,
      maxLvl: 7,
      minLvl: 1,
      requiredCharLevel: 1,
      requiredCharLevelInc: 1,
      initReqLvl: 1,
      description: ( <
        div >
        <
        p >
        Podstawowy urok.Wywołuje lęk u przeciwnika, obniżając jego skuteczność.Zmniejsza szansę powodzenia jego ataków fizycznych,
        dystansowych oraz magicznych. <
        /p> <
        p > Dostępne od 1 poziomu doświadczenia < /p> <
        p > Atak psychiczny < /p> <
        p > Efekt: Strach < /p> < /
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
        td > Czas trwania < /td> <
        td > Szansa trafienia wszelkich ataków < /td> <
        td > Mana < /td> < /
        tr > <
        tr >
        <
        td > I < /td> <
        td > 5 < /td> <
        td > -15 % < /td> <
        td > 30 < /td> < /
        tr > <
        tr >
        <
        td > II < /td> <
        td > 5 < /td> <
        td > -20 % < /td> <
        td > 34 < /td> < /
        tr > <
        tr >
        <
        td > III < /td> <
        td > 6 < /td> <
        td > -25 % < /td> <
        td > 39 < /td> < /
        tr > <
        tr >
        <
        td > IV < /td> <
        td > 6 < /td> <
        td > -30 % < /td> <
        td > 44 < /td> < /
        tr > <
        tr >
        <
        td > V < /td> <
        td > 6 < /td> <
        td > -35 % < /td> <
        td > 48 < /td> < /
        tr > <
        tr >
        <
        td > VI < /td> <
        td > 6 < /td> <
        td > -40 % < /td> <
        td > 53 < /td> < /
        tr > <
        tr >
        <
        td > VII < /td> <
        td > 6 < /td> <
        td > -45 % < /td> <
        td > 57 < /td> < /
        tr > <
        /tbody> < /
        table >
      ),
      image: "images/Okrzyk_bojowy.jpg"
    };
    this.skill3 = {
      name: "Rzut kamieniem",
      level: 1,
      maxLvl: 7,
      minLvl: 1,
      requiredCharLevel: 1,
      requiredCharLevelInc: 1,
      initReqLvl: 1,
      description: ( <
        div >
        <
        p >
        Podstawowy atak dystansowy.Zadaje niewielką liczbę obrażeń, ale może być wykonywany nawet gdy postać wyposażona jest w miecz i tarczę.Nie wymaga żadnej broni dystansowej. <
        /p> <
        p > Dostępne od 1 poziomu doświadczenia < /p> <
        p > Atak dystansowy < /p> <
        p > OBR: (0.7 * Siła + 0.3 * Zręczność) * 1.8 < /p> < /
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
        td > 80 % < /td> <
        td > +20 % < /td> <
        td > 8 < /td> < /
        tr > <
        tr >
        <
        td > II < /td> <
        td > 85 % < /td> <
        td > +25 % < /td> <
        td > 9 < /td> < /
        tr > <
        tr >
        <
        td > III < /td> <
        td > 90 % < /td> <
        td > +30 % < /td> <
        td > 10 < /td> < /
        tr > <
        tr >
        <
        td > IV < /td> <
        td > 95 % < /td> <
        td > +35 % < /td> <
        td > 12 < /td> < /
        tr > <
        tr >
        <
        td > V < /td> <
        td > 100 % < /td> <
        td > +40 % < /td> <
        td > 13 < /td> < /
        tr > <
        tr >
        <
        td > VI < /td> <
        td > 110 % < /td> <
        td > +45 % < /td> <
        td > 14 < /td> < /
        tr > <
        tr >
        <
        td > VII < /td> <
        td > 120 % < /td> <
        td > +50 % < /td> <
        td > 15 < /td> < /
        tr > <
        /tbody> < /
        table >
      ),
      image: "images/Rzut_kamieniem.jpg"
    };
    this.skill4 = {
      name: "Strzał",
      level: 1,
      maxLvl: 7,
      minLvl: 1,
      requiredCharLevel: 1,
      requiredCharLevelInc: 1,
      initReqLvl: 1,
      description: ( <
        div >
        <
        p >
        Podstawowy atak dystansowy przy użyciu broni dalekiego zasięgu.Korzystając z tej umiejętności możemy atakować za pomocą łuku. <
        /p> <
        p > Dostępne od 1 poziomu doświadczenia < /p> <
        p > Atak dystansowy < /p> <
        p > OBR: 0.7 * Siła + 0.3 * Zręczność + broń < /p> <
        p > Wymagania: założona broń dystansowa < /p> < /
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
        td > 100 % < /td> <
        td > +0 % < /td> <
        td > 10 < /td> < /
        tr > <
        tr >
        <
        td > II < /td> <
        td > 110 % < /td> <
        td > +3 % < /td> <
        td > 11 < /td> < /
        tr > <
        tr >
        <
        td > III < /td> <
        td > 120 % < /td> <
        td > +7 % < /td> <
        td > 13 < /td> < /
        tr > <
        tr >
        <
        td > IV < /td> <
        td > 130 % < /td> <
        td > +10 % < /td> <
        td > 14 < /td> < /
        tr > <
        tr >
        <
        td > V < /td> <
        td > 140 % < /td> <
        td > +12 % < /td> <
        td > 16 < /td> < /
        tr > <
        tr >
        <
        td > VI < /td> <
        td > 150 % < /td> <
        td > +15 % < /td> <
        td > 17 < /td> < /
        tr > <
        tr >
        <
        td > VII < /td> <
        td > 160 % < /td> <
        td > +20 % < /td> <
        td > 19 < /td> < /
        tr > <
        /tbody> < /
        table >
      ),
      image: "images/Strzał.jpg"
    };
    this.skill5 = {
      name: "Zwykły atak",
      level: 1,
      maxLvl: 7,
      minLvl: 1,
      requiredCharLevel: 1,
      requiredCharLevelInc: 1,
      initReqLvl: 1,
      description: ( <
        div >
        <
        p >
        Podstawowy atak fizyczny wymagający użycia oręża.Umożliwia wyprowadzanie ciosów za pomocą każdego rodzaju broni białej poza kastetami. <
        /p> <
        p > Dostępne od 1 poziomu doświadczenia < /p> <
        p > Atak fizyczny < /p> <
        p > OBR: 0.7 * Siła + 0.3 * Zręczność + broń < /p> <
        p > Wymagania: założona broń biała < /p> < /
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
        td > 100 % < /td> <
        td > +0 % < /td> <
        td > 10 < /td> < /
        tr > <
        tr >
        <
        td > II < /td> <
        td > 110 % < /td> <
        td > +3 % < /td> <
        td > 12 < /td> < /
        tr > <
        tr >
        <
        td > III < /td> <
        td > 120 % < /td> <
        td > +7 % < /td> <
        td > 13 < /td> < /
        tr > <
        tr >
        <
        td > IV < /td> <
        td > 130 % < /td> <
        td > +10 % < /td> <
        td > 15 < /td> < /
        tr > <
        tr >
        <
        td > V < /td> <
        td > 140 % < /td> <
        td > +12 % < /td> <
        td > 16 < /td> < /
        tr > <
        tr >
        <
        td > VI < /td> <
        td > 150 % < /td> <
        td > +15 % < /td> <
        td > 18 < /td> < /
        tr > <
        tr >
        <
        td > VII < /td> <
        td > 160 % < /td> <
        td > +20 % < /td> <
        td > 19 < /td> < /
        tr > <
        /tbody> < /
        table >
      ),
      image: "images/Zwykły_atak.jpg"
    };
    this.skill6 = {
      name: "Ucieczka",
      level: 1,
      maxLvl: 1,
      minLvl: 1,
      requiredCharLevel: 1,
      requiredCharLevelInc: 1,
      initReqLvl: 1,
      description: ( <
        div >
        <
        p >
        Umiejętność przydatna gdy nie ma już wątpliwości, że walka skończy się porażką.Jeśli uda się z niej skorzystać postać wycofuje się do
          ostatniego bezpiecznego miejsca, w którym była.Ucieczka jest pewną
        formą pozytywnego uroku - każdy przydzielony jej PA zwiększa szansę dania nóg za pas o 20 % . <
        /p> <
        p > Dostępne od 1 poziomu doświadczenia < /p> <
        p > Ostatnia czynność w walce < /p> <
        p > Nie można awansować na wyższy poziom < /p> < /
        div >
      ),
      image: "images/Ucieczka.jpg"
    };
    this.skill7 = {
      name: "Wataha",
      level: 0,
      maxLvl: 7,
      minLvl: 0,
      requiredCharLevel: 35,
      requiredCharLevelInc: 10,
      initReqLvl: 35,
      description: ( <
        div >
        <
        p >
        Umiejętność wykształcona przez wojowników samotników.Przemierzając rozległe krainy, udręczeni walką o przetrwanie i samotnością wykształcili w sobie unikalny system porozumiewania się ze zwierzakami.Dzięki niemu potrafią współpracować z więcej niż jednym zwierzem w drużynie. <
        /p> <
        p > Dostępne od 35 poziomu doświadczenia < /p> <
        p > Awansować można o jeden poziom co 10 lvl postaci < /p> < /
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
        td > Suma Rang < /td> <
        td > Maksymalna ilość petów w drużynie < /td> < /
        tr > <
        tr >
        <
        td > I < /td> <
        td > 3 < /td> <
        td > 2 < /td> < /
        tr > <
        tr >
        <
        td > II < /td> <
        td > 4 < /td> <
        td > 2 < /td> < /
        tr > <
        tr >
        <
        td > III < /td> <
        td > 5 < /td> <
        td > 2 < /td> < /
        tr > <
        tr >
        <
        td > IV < /td> <
        td > 6 < /td> <
        td > 2 < /td> < /
        tr > <
        tr >
        <
        td > V < /td> <
        td > 8 < /td> <
        td > 2 < /td> < /
        tr > <
        tr >
        <
        td > VI < /td> <
        td > 12 < /td> <
        td > 3 < /td> < /
        tr > <
        tr >
        <
        td > VII < /td> <
        td > 19 < /td> <
        td > 3 < /td> < /
        tr > <
        /tbody> < /
        table >
      ),
      image: "images/Wataha.jpg"
    };
    this.skill8 = {
      name: "Wyrwanie z korzeni",
      level: 1,
      maxLvl: 1,
      minLvl: 1,
      initReqLvl: 1,
      requiredCharLevel: 1,
      requiredCharLevelInc: 1,
      description: ( <
        div >
        <
        p >
        Lata doświadczeń w boju pozwoliły wypracować umiejętność wyrwania się z uwięzi Korzeni.Dzięki medytacji i ćwiczeniom można przekierować swoją energię i pozbyć się wszystkich efektów tej potężnej umiejętności.Wyrwanie z korzenia wymaga tyle PA, na ile rund są wrzucone Korzenie x 2.(np.Korzenie na 2 rundy, więc 4 PA).Działa tylko na rzucającego. <
        /p> <
        p > Dostępne od 1 poziomu doświadczenia < /p> <
        p > Pobiera 30 kondycji. < /p> <
        p > Nie można awansować na wyższy poziom < /p> < /
        div >
      ),
      image: "images/Rootbreaker.jpg"
    };
    for (let i = 9; i <= 17; i++) {
      this["skill" + i] = new Skill(charClass, i - 8, database);
    }
  }
}
