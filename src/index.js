import React from "react";
import ReactDOM from "react-dom";
import ReactGA from 'react-ga';
import "./styles/index.scss";
import {
  Calculator
} from "./App.js";
import * as serviceWorker from "./serviceWorker";

ReactGA.initialize('UA-142836926-3');

const calculator = document.getElementById("calc");

document.getElementById("classLvl").addEventListener(
  "submit",
  function(event) {
    event.preventDefault();
    showCalc(event.target[0].value, event.target[1].value, taernDatabase);
  },
  false
);

function showCalc(charClass, charLvl, database) {
  ReactDOM.unmountComponentAtNode(calculator);
  let skillSet = new SkillSet(charClass, database.skills);
  ReactGA.event({
    category: 'Form',
    action: 'Submit',
    label: (charClass + " " + charLvl)
  });
  ReactDOM.render( <
    Calculator level = {
      parseInt(charLvl)
    }
    class = {
      skillSet
    }
    className = {
      charClass
    }
    items = {
      database.items
    }
    />,
    calculator
  );
}

window.onload = function() {

  if (!localStorage.getItem('cookieconsent')) {
    document.getElementById('cookieButton').addEventListener(
      "click",
      function(event) {
        document.getElementById('cookieconsent').style.display = 'none';
        localStorage.setItem('cookieconsent', true);
      },
      false
    );
  } else {
    document.getElementById('cookieconsent').style.display = 'none';
  }

  let initialProperties = getUrlVars();
  if (Object.keys(initialProperties).length !== 0) {
    ReactGA.event({
      category: 'Form',
      action: 'Import',
      label: (initialProperties.className + " " + initialProperties.level)
    });
    let initialStats = {};
    initialStats.statPts = parseInt(initialProperties.statPts);
    initialStats.strength = parseInt(initialProperties.strength);
    initialStats.agility = parseInt(initialProperties.agility);
    initialStats.power = parseInt(initialProperties.power);
    initialStats.knowledge = parseInt(initialProperties.knowledge);
    initialStats.hp = parseInt(initialProperties.hp);
    initialStats.endurance = parseInt(initialProperties.endurance);
    initialStats.mana = parseInt(initialProperties.mana);
    let initialEquipment = {};
    if (initialProperties.armor !== "null") {
      initialEquipment.armor = taernDatabase.items.filter(
        x => x.name === initialProperties.armor
      )[0];
    } else {
      initialEquipment.armor = null;
    }
    if (initialProperties.helmet !== "null") {
      initialEquipment.helmet = taernDatabase.items.filter(
        x => x.name === initialProperties.helmet
      )[0];
    } else {
      initialEquipment.helmet = null;
    }
    if (initialProperties.neck !== "null") {
      initialEquipment.neck = taernDatabase.items.filter(
        x => x.name === initialProperties.neck
      )[0];
    } else {
      initialEquipment.neck = null;
    }
    if (initialProperties.gloves !== "null") {
      initialEquipment.gloves = taernDatabase.items.filter(
        x => x.name === initialProperties.gloves
      )[0];
    } else {
      initialEquipment.gloves = null;
    }
    if (initialProperties.cape !== "null") {
      initialEquipment.cape = taernDatabase.items.filter(
        x => x.name === initialProperties.cape
      )[0];
    } else {
      initialEquipment.cape = null;
    }
    if (initialProperties.weapon !== "null") {
      initialEquipment.weapon = taernDatabase.items.filter(
        x => x.name === initialProperties.weapon
      )[0];
    } else {
      initialEquipment.weapon = null;
    }
    if (initialProperties.shield !== "null") {
      initialEquipment.shield = taernDatabase.items.filter(
        x => x.name === initialProperties.shield
      )[0];
    } else {
      initialEquipment.shield = null;
    }
    if (initialProperties.pants !== "null") {
      initialEquipment.pants = taernDatabase.items.filter(
        x => x.name === initialProperties.pants
      )[0];
    } else {
      initialEquipment.pants = null;
    }
    if (initialProperties.belt !== "null") {
      initialEquipment.belt = taernDatabase.items.filter(
        x => x.name === initialProperties.belt
      )[0];
    } else {
      initialEquipment.belt = null;
    }
    if (initialProperties.ring1 !== "null") {
      initialEquipment.ring1 = taernDatabase.items.filter(
        x => x.name === initialProperties.ring1
      )[0];
    } else {
      initialEquipment.ring1 = null;
    }
    if (initialProperties.ring2 !== "null") {
      initialEquipment.ring2 = taernDatabase.items.filter(
        x => x.name === initialProperties.ring2
      )[0];
    } else {
      initialEquipment.ring2 = null;
    }
    if (initialProperties.boots !== "null") {
      initialEquipment.boots = taernDatabase.items.filter(
        x => x.name === initialProperties.boots
      )[0];
    } else {
      initialEquipment.boots = null;
    }
    if (Object.keys(initialProperties).some(x => /^special+/.test(x))) {
      let special = {};
      initialProperties.hasOwnProperty("specialname") ?
        (special.name = initialProperties.specialname) :
        (special.name = "");
      initialProperties.hasOwnProperty("specialimage") ?
        (special.image = initialProperties.specialimage) :
        (special.image = "");
      special.type = "special";
      initialProperties.hasOwnProperty("specialstrength") ?
        (special.strength = parseInt(initialProperties.specialstrength)) :
        (special.strength = 0);
      initialProperties.hasOwnProperty("specialagility") ?
        (special.agility = parseInt(initialProperties.specialagility)) :
        (special.agility = 0);
      initialProperties.hasOwnProperty("specialknowledge") ?
        (special.knowledge = parseInt(initialProperties.specialknowledge)) :
        (special.knowledge = 0);
      initialProperties.hasOwnProperty("specialpower") ?
        (special.power = parseInt(initialProperties.specialpower)) :
        (special.power = 0);
      initialProperties.hasOwnProperty("specialhp") ?
        (special.hp = parseInt(initialProperties.specialhp)) :
        (special.hp = 0);
      initialProperties.hasOwnProperty("specialmana") ?
        (special.mana = parseInt(initialProperties.specialmana)) :
        (special.mana = 0);
      initialProperties.hasOwnProperty("specialendurance") ?
        (special.endurance = parseInt(initialProperties.specialendurance)) :
        (special.endurance = 0);
      initialProperties.hasOwnProperty("specialcutRes") ?
        (special.cutRes = parseInt(initialProperties.specialcutRes)) :
        (special.cutRes = 0);
      initialProperties.hasOwnProperty("specialbluntRes") ?
        (special.bluntRes = parseInt(initialProperties.specialbluntRes)) :
        (special.bluntRes = 0);
      initialProperties.hasOwnProperty("specialpierceRes") ?
        (special.pierceRes = parseInt(initialProperties.specialpierceRes)) :
        (special.pierceRes = 0);
      initialProperties.hasOwnProperty("specialdamage") ?
        (special.damage = parseInt(initialProperties.specialdamage)) :
        (special.damage = 0);
      initialProperties.hasOwnProperty("specialfireRes") ?
        (special.fireRes = parseInt(initialProperties.specialfireRes)) :
        (special.fireRes = 0);
      initialProperties.hasOwnProperty("specialfrostRes") ?
        (special.frostRes = parseInt(initialProperties.specialfrostRes)) :
        (special.frostRes = 0);
      initialProperties.hasOwnProperty("specialenergyRes") ?
        (special.energyRes = parseInt(initialProperties.specialenergyRes)) :
        (special.energyRes = 0);
      initialProperties.hasOwnProperty("specialcurseRes") ?
        (special.curseRes = parseInt(initialProperties.specialcurseRes)) :
        (special.curseRes = 0);
      initialEquipment.special = new Item(special);
    } else {
      initialEquipment.special = null;
    }
    let skillSet = new SkillSet(
      initialProperties.className,
      taernDatabase.skills
    );
    for (let i = 1; i < 18; i++) {
      skillSet["skill" + i].level = parseInt(initialProperties["skill" + i]);
    }
    let initialSkills = {};
    initialSkills.skillPts = parseInt(initialProperties.skillPts);
    ReactDOM.render( <
      Calculator level = {
        parseInt(initialProperties.level)
      }
      class = {
        skillSet
      }
      className = {
        initialProperties.className
      }
      items = {
        taernDatabase.items
      }
      initialStats = {
        initialStats
      }
      initialEquipment = {
        initialEquipment
      }
      initialSkills = {
        initialSkills
      }
      />,
      calculator
    );
  }
};

function getUrlVars() {
  let vars = {};
  let decodedUrl = decodeURI(window.location.href);
  let parts = decodedUrl.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(
    m,
    key,
    value
  ) {
    vars[key] = value.replace("+", " ");
  });
  return vars;
}


const skillDatabase = {
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

class SkillSet {
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

class Skill {
  constructor(charClass, number, database) {
    this.name = database[charClass]["skill" + number].name;
    this.description = database[charClass]["skill" + number].description;
    this.table = database[charClass]["skill" + number].table;
    this.minLvl = 0;
    this.maxLvl = 7;
    this.level = 0;
    this.requiredCharLevelInc = 1;
    this.image = database[charClass]["skill" + number].image
    switch (number) {
      case 1:
        this.requiredCharLevel = 2;
        this.initReqLvl = 2;
        break;
      case 2:
        this.requiredCharLevel = 5;
        this.initReqLvl = 5;
        break;
      case 3:
        this.requiredCharLevel = 8;
        this.initReqLvl = 8;
        break;
      case 4:
        this.requiredCharLevel = 12;
        this.initReqLvl = 12;
        break;
      case 5:
        this.requiredCharLevel = 15;
        this.initReqLvl = 15;
        break;
      case 6:
        this.requiredCharLevel = 18;
        this.initReqLvl = 18;
        break;
      case 7:
        this.requiredCharLevel = 22;
        this.initReqLvl = 22;
        break;
      case 8:
        this.requiredCharLevel = 26;
        this.initReqLvl = 26;
        break;
      case 9:
        this.requiredCharLevel = 30;
        this.initReqLvl = 30;
        break;
      default:
        this.requiredCharLevel = 0;
        this.initReqLvl = 0;
        break;
    }
  }
}

class Item {
  constructor(item) {
    this.name = item.name;
    this.type = item.type;
    this.image = item.image;

    if (item.hasOwnProperty("otherProperties")) {
      this.otherProperties = item.otherProperties;
    } else {
      this.otherProperties = []
    };
    if (item.hasOwnProperty("rarity")) {
      this.rarity = item.rarity
    } else {
      this.rarity = "Rzadki"
    };
    if (item.hasOwnProperty("class")) {
      this.class = item.class
    } else {
      this.class = null
    };
    if (item.hasOwnProperty("set")) {
      this.set = item.set
    } else {
      this.set = null
    };
    if (item.type === "weapon") {
      this.damageType = item.damageType;
      this.weaponType = item.weaponType;
    } else {
      this.damageType = null;
      this.weaponType = null;
    }
    let properties = ["reqLvl", "reqStr", "reqAgi", "reqPow", "reqKno", "strength", "agility", "power", "knowledge", "hp", "mana", "endurance", "cutRes", "bluntRes", "pierceRes", "fireRes", "energyRes", "frostRes", "curseRes", "damage"];
    properties.forEach((itemProperty) => {
      if (item.hasOwnProperty(itemProperty)) {
        this[itemProperty] = item[itemProperty]
      } else {
        this[itemProperty] = 0
      };
    });
  }
}

const itemDatabase = [{
    name: "Derengil",
    type: "weapon",
    image: "[www.taernopedia.pl][649]Derengil.png",
    reqLvl: 15,
    damageType: "Sieczne",
    weaponType: "Jednoręczna",
    damage: 49,
    strength: 6,
    agility: 3,
    power: 6,
    knowledge: 8,
    endurance: 40
  },
  {
    name: "Sturprang",
    type: "weapon",
    image: "[www.taernopedia.pl][242]Sturprang.png",
    reqLvl: 15,
    reqPow: 30,
    damageType: "Obuchowe",
    weaponType: "Dwuręczna",
    damage: 60,
    power: 3,
    knowledge: 6,
    mana: 40
  },
  {
    name: "Ayol",
    type: "weapon",
    image: "[www.taernopedia.pl][600]Ayol.png",
    reqLvl: 20,
    reqAgi: 12,
    damageType: "Kłute",
    weaponType: "Dwuręczna",
    damage: 67,
    strength: 8,
    mana: 40
  },
  {
    name: "Isverd",
    type: "weapon",
    image: "Isverd.png",
    reqLvl: 34,
    damageType: "Sieczne",
    weaponType: "Jednoręczna",
    damage: 91,
    strength: 10,
    hp: 100,
    endurance: 30
  },
  {
    name: "Rolrak",
    type: "weapon",
    image: "[www.taernopedia.pl][28]Rolrak.png",
    reqLvl: 27,
    reqAgi: 50,
    damageType: "Sieczne",
    weaponType: "Dwuręczna",
    damage: 88,
    strength: 6,
    agility: 9
  },
  {
    name: "Tasak",
    type: "weapon",
    image: "[www.taernopedia.pl][291]Tasak.png",
    reqLvl: 19,
    reqStr: 45,
    damageType: "Sieczne",
    weaponType: "Dwuręczna",
    damage: 82,
    strength: 10,
    hp: 90
  },
  {
    name: "Davgretor II",
    type: "weapon",
    image: "[www.taernopedia.pl][746]Davgretor20II.png",
    reqLvl: 32,
    reqStr: 50,
    damageType: "Obuchowe",
    weaponType: "Dwuręczna",
    damage: 132,
    strength: 10,
    agility: 2,
    hp: 100
  },
  {
    name: "Geomorph Core",
    type: "weapon",
    image: "[www.taernopedia.pl][751]Geomorph20Core.png",
    reqLvl: 32,
    reqKno: 50,
    damageType: "Obuchowe",
    weaponType: "Dwuręczna",
    damage: 101,
    power: 10,
    knowledge: 2,
    mana: 100
  },
  {
    name: "Piroklast",
    type: "weapon",
    image: "[www.taernopedia.pl][315]Piroklast.png",
    reqLvl: 32,
    reqStr: 35,
    reqAgi: 30,
    damageType: "Kłute",
    weaponType: "Dwuręczna",
    damage: 96,
    agility: 9,
    hp: 80,
    endurance: 60
  },
  {
    name: "Tężec",
    type: "weapon",
    image: "[www.taernopedia.pl][717]TC499C5BCec.png",
    reqLvl: 28,
    damageType: "Kłute",
    weaponType: "Jednoręczna",
    damage: 85,
    power: 4,
    knowledge: 8,
    mana: 80
  },
  {
    name: "Sidun",
    type: "weapon",
    image: "[www.taernopedia.pl][274]Sidun.png",
    reqLvl: 34,
    reqStr: 40,
    damageType: "Sieczne",
    weaponType: "Dwuręczna",
    damage: 124,
    strength: 6,
    hp: 100,
    mana: 50,
    endurance: 50
  },
  {
    name: "Irkamale",
    type: "weapon",
    image: "[www.taernopedia.pl][774]Irkamale.png",
    reqLvl: 34,
    reqAgi: 25,
    damageType: "Obuchowe",
    weaponType: "Dwuręczna",
    damage: 117,
    strength: 2,
    agility: 8,
    hp: 120,
    endurance: 60
  },
  {
    name: "Smoczy Gnat",
    type: "weapon",
    image: "[www.taernopedia.pl][1]Smoczy20Gnat.png",
    reqLvl: 45,
    reqPow: 60,
    damageType: "Obuchowe",
    weaponType: "Dwuręczna",
    damage: 122,
    power: 10,
    hp: 70,
    mana: 70
  },
  {
    name: "Ognisty Młot",
    type: "weapon",
    image: "[www.taernopedia.pl][322]Ognisty20MC582ot.png",
    reqLvl: 60,
    reqStr: 80,
    damageType: "Obuchowe",
    weaponType: "Dwuręczna",
    damage: 150,
    strength: 22,
    agility: 10,
    hp: 20
  },
  {
    name: "Władca Losu",
    type: "weapon",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][272]WC582adca20Losu.png",
    reqLvl: 75,
    reqPow: 80,
    damageType: "Obuchowe",
    weaponType: "Dwuręczna",
    damage: 112,
    power: 8,
    knowledge: 4,
    hp: 40,
    mana: 70,
    otherProperties: ["Modyfikator obrażeń magicznych: 4% (+1% co poziom)"]
  },
  {
    name: "Egzekutor",
    type: "weapon",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][237]Egzekutor.png",
    reqLvl: 75,
    reqPow: 80,
    damageType: "Obuchowe",
    weaponType: "Dwuręczna",
    damage: 112,
    power: 8,
    knowledge: 4,
    hp: 40,
    mana: 70,
    otherProperties: ["Szansa na trafienie krytyczne: 4% (+1% co poziom)"]
  },
  {
    name: "Gniew Zapomnianych",
    type: "weapon",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][119]Gniew20Zapomnianych.png",
    reqLvl: 75,
    reqPow: 80,
    damageType: "Obuchowe",
    weaponType: "Dwuręczna",
    damage: 112,
    power: 8,
    knowledge: 4,
    hp: 40,
    mana: 70,
    otherProperties: ["Szansa na podwójny atak: +4% (+1% co poziom)"]
  },
  {
    name: "Virral",
    type: "weapon",
    image: "[www.taernopedia.pl][105]Virral.png",
    reqLvl: 52,
    reqAgi: 80,
    damageType: "Kłute",
    weaponType: "Dwuręczna",
    damage: 145,
    strength: 15,
    agility: 15,
    hp: 50
  },
  {
    name: "Urntsul",
    type: "weapon",
    image: "[www.taernopedia.pl][846]Urntsul.png",
    reqLvl: 68,
    reqPow: 80,
    damageType: "Sieczne",
    weaponType: "Jednoręczna",
    damage: 100,
    power: 7,
    knowledge: 5,
    hp: 180,
    mana: 50
  },
  {
    name: "Buoriany",
    type: "weapon",
    image: "[www.taernopedia.pl][692]Buoriany.png",
    reqLvl: 70,
    reqAgi: 90,
    damageType: "Sieczne",
    weaponType: "Dwuręczna",
    damage: 160,
    strength: 10,
    agility: 9,
    hp: 50,
    mana: 80,
    endurance: 70
  },
  {
    name: "Lawina",
    type: "weapon",
    image: "[www.taernopedia.pl][129]Lawina.png",
    reqLvl: 70,
    reqStr: 90,
    damageType: "Obuchowe",
    weaponType: "Jednoręczna",
    damage: 140,
    strength: 13,
    agility: 8,
    hp: 150,
    mana: 20
  },
  {
    name: "Istav",
    type: "weapon",
    image: "[www.taernopedia.pl][883]Istav.png",
    reqLvl: 80,
    reqKno: 90,
    damageType: "Obuchowe",
    weaponType: "Dwuręczna",
    damage: 140,
    power: 15,
    knowledge: 14,
    hp: 120,
    mana: 130
  },
  {
    name: "Fanga",
    type: "weapon",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][957]Fanga.png",
    reqLvl: 75,
    reqAgi: 80,
    damageType: "Obuchowe",
    weaponType: "Dwuręczna",
    damage: 145,
    agility: 12,
    hp: 60,
    mana: 60,
    otherProperties: ["Szansa na trafienie krytyczne: 7% (+1% co poziom)"]
  },
  {
    name: "Otwieracz",
    type: "weapon",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][700]Otwieracz.png",
    reqLvl: 75,
    reqStr: 80,
    damageType: "Sieczne",
    weaponType: "Jednoręczna",
    damage: 130,
    strength: 7,
    agility: 7,
    hp: 50,
    endurance: 30,
    otherProperties: ["Szansa na trafienie krytyczne: 4% (+1% co poziom)"]
  },
  {
    name: "Gjolmar",
    type: "weapon",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][197]Gjolmar.png",
    reqLvl: 85,
    reqAgi: 90,
    damageType: "Kłute",
    weaponType: "Dwuręczna",
    damage: 160,
    strength: 10,
    agility: 30,
    hp: 100,
    otherProperties: ["Modyfikator obrażeń fizycznych: 7% (+1% co poziom)"]
  },
  {
    name: "Batagur",
    type: "weapon",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][820]Batagur.png",
    reqLvl: 85,
    reqStr: 95,
    damageType: "Obuchowe",
    weaponType: "Dwuręczna",
    damage: 180,
    strength: 25,
    hp: 50,
    endurance: 200,
    otherProperties: ["Dodatkowe obrażenia od zimna: 7% (+1% co poziom)"]
  },
  {
    name: "Mallus Selenorum",
    type: "weapon",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][986]Mallus20Selenorum.png",
    reqLvl: 115,
    reqStr: 115,
    damageType: "Sieczne",
    weaponType: "Jednoręczna",
    damage: 160,
    strength: 17,
    agility: 13,
    hp: 230,
    endurance: 70,
    otherProperties: ["Szansa na podwójny atak: 2% (+1% co poziom)", "Dodatkowe obrażenia od energii: 2% (+1% co poziom)"]
  },
  {
    name: "Taehal",
    type: "weapon",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][433]Taehal.png",
    reqLvl: 115,
    reqAgi: 115,
    damageType: "Kłute",
    weaponType: "Dwuręczna",
    damage: 170,
    strength: 7,
    agility: 28,
    hp: 160,
    mana: 10,
    endurance: 80,
    otherProperties: ["Szansa na podwójny atak: 2% (+1% co poziom)", "Szansa na trafienie krytyczne: 2% (+1% co poziom)"]
  },
  {
    name: "Szpony",
    type: "weapon",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][975]Szpony.png",
    reqLvl: 115,
    reqAgi: 115,
    damageType: "Sieczne",
    weaponType: "Dwuręczna",
    damage: 180,
    strength: 17,
    agility: 24,
    hp: 100,
    mana: 20,
    endurance: 70,
    otherProperties: ["Szansa na podwójny atak: 2% (+1% co poziom)", "Dodatkowe obrażenia od zimna: 2% (+1% co poziom)"]
  },
  {
    name: "Trójząb Admiralski",
    type: "weapon",
    image: "[www.taernopedia.pl][372]TrC3B3jzC485b20Admiralski.png",
    rarity: "Psychorare",
    reqLvl: 115,
    reqPow: 115,
    damageType: "Obuchowe",
    weaponType: "Jednoręczna",
    damage: 165,
    power: 26,
    knowledge: 32,
    hp: 170,
    mana: 50,
    otherProperties: ["Szansa na trafienie krytyczne 4% (+1% co poziom)", "Modyfikator obrażeń magicznych 4% (+1% na poziom)"]
  },
  {
    name: "Ból",
    type: "weapon",
    image: "[www.taernopedia.pl][34]BC3B3l.png",
    rarity: "Psychorare",
    reqLvl: 120,
    reqPow: 120,
    reqKno: 120,
    damageType: "Kłute",
    weaponType: "Jednoręczna",
    damage: 150,
    power: 17,
    knowledge: 22,
    hp: 80,
    mana: 80,
    endurance: 50,
    otherProperties: ["Szansa na trafienie krytyczne 2% (+1% co poziom)", "Szansa na podwójny atak 2% (+1% na poziom)"]
  },
  {
    name: "Cierń",
    type: "weapon",
    image: "[www.taernopedia.pl][491]CierC584.png",
    rarity: "Psychorare",
    reqLvl: 115,
    reqStr: 115,
    damageType: "Sieczne",
    weaponType: "Dwuręczna",
    damage: 250,
    strength: 15,
    agility: 21,
    hp: 170,
    endurance: 70,
    otherProperties: ["Szansa na trafienie krytyczne 4% (+1% co poziom)", "Dodatkowe obrażenia od energii: 5% (+1% na poziom)"]
  },
  {
    name: "Attawa",
    type: "weapon",
    image: "[www.taernopedia.pl][335]Attawa.png",
    rarity: "Epik",
    class: "voodoo",
    reqLvl: 60,
    damageType: "Obuchowe",
    weaponType: "Dwuręczna",
    damage: "100 + poziom",
    power: 10,
    knowledge: 20,
    hp: 50,
    mana: 50,
    otherProperties: ["Dodatkowe PA: 1", "Szansa na trafienie krytyczne: 9% (+1% na poziom)", "Modyfikator obrażeń magicznych: 12% (+1% na poziom)"]
  },
  {
    name: "Żmij",
    type: "weapon",
    image: "[www.taernopedia.pl][695]C5BBmij.png",
    rarity: "Epik",
    class: "firemage",
    reqLvl: 60,
    damageType: "Obuchowe",
    weaponType: "Dwuręczna",
    damage: "100 + poziom",
    power: 20,
    knowledge: 10,
    hp: 100,
    otherProperties: ["Dodatkowe PA: 1", "Szansa na trafienie krytyczne: 9% (+1% na poziom)", "Szansa na podwójny atak: 10% (+1% na poziom)"]
  },
  {
    name: "Latarnia Życia",
    type: "weapon",
    image: "[www.taernopedia.pl][762]Latarnia20C5BBycia.png",
    rarity: "Epik",
    class: "druid",
    reqLvl: 60,
    damageType: "Obuchowe",
    weaponType: "Dwuręczna",
    damage: "100 + poziom",
    power: 10,
    knowledge: 20,
    hp: 50,
    mana: 50,
    otherProperties: ["Dodatkowe PA: 1", "Wyssanie many: 8% (+1% na poziom)", "Szansa na trafienie krytyczne: 9% (+1% na poziom)"]
  },
  {
    name: "Imisindo",
    type: "weapon",
    image: "[www.taernopedia.pl][584]Imisindo.png",
    rarity: "Epik",
    class: "archer",
    reqLvl: 60,
    damageType: "Kłute",
    weaponType: "Dwuręczna",
    damage: "85 + poziom",
    strength: 10,
    agility: 10,
    hp: 150,
    endurance: 50,
    otherProperties: ["Dodatkowe PA: 1", "Szansa na trafienie krytyczne: 9% (+1% na poziom)", "Modyfikator trafień dystansowych: 20% (+2% na poziom)"]
  },
  {
    name: "Washi",
    type: "weapon",
    image: "[www.taernopedia.pl][457]Washi.png",
    rarity: "Epik",
    class: "sheed",
    reqLvl: 60,
    damageType: "Kłute",
    weaponType: "Dwuręczna",
    damage: "95 + poziom",
    strength: 10,
    agility: 10,
    hp: 150,
    endurance: 50,
    otherProperties: ["Dodatkowe PA: 1", "Szansa na trafienie krytyczne: 9% (+1% na poziom)", "Modyfikator obrażeń fizycznych: 12% (+1% na poziom)"]
  },
  {
    name: "Gorthdar",
    type: "weapon",
    image: "[www.taernopedia.pl][272]Gorthdar.png",
    rarity: "Epik",
    class: "barbarian",
    reqLvl: 60,
    damageType: "Sieczne",
    weaponType: "Dwuręczna",
    damage: "110 + poziom",
    strength: 15,
    agility: 10,
    hp: 100,
    endurance: 50,
    otherProperties: ["Dodatkowe PA: 1", "Dodatkowe obrażenia od ognia: 12% (+1% na poziom)", "Szansa na trafienie krytyczne: 9% (+1% na poziom)"]
  },
  {
    name: "Allenor",
    type: "weapon",
    image: "[www.taernopedia.pl][377]Allenor.png",
    rarity: "Epik",
    class: "knight",
    reqLvl: 60,
    damageType: "Sieczne",
    weaponType: "Jednoręczna",
    damage: "80 + poziom",
    strength: 10,
    agility: 10,
    knowledge: 5,
    hp: 100,
    endurance: 50,
    otherProperties: ["Dodatkowe PA: 1", "Modyfikator obrażeń fizycznych: 12% (+1% na poziom)", "Szansa na trafienie krytyczne: 9% (+1% na poziom)"]
  },
  {
    name: "Isthrimm II",
    type: "shield",
    image: "[www.taernopedia.pl][606]Isthrimm20II.png",
    reqLvl: 34,
    reqStr: 55,
    strength: 5,
    hp: 80,
    cutRes: 31,
    bluntRes: 30,
    pierceRes: 30,
    fireRes: 25
  },
  {
    name: "Smocze Skrzydło",
    type: "shield",
    image: "[www.taernopedia.pl][0]Smocze20SkrzydC582o.png",
    reqLvl: 45,
    reqStr: 60,
    strength: 10,
    agility: 6,
    hp: 100,
    endurance: 60,
    cutRes: 36,
    bluntRes: 36,
    pierceRes: 36
  },
  {
    name: "Kil",
    type: "shield",
    image: "[www.taernopedia.pl][849]Kil.png",
    reqLvl: 110,
    reqStr: 120,
    reqAgi: 110,
    strength: 15,
    agility: 20,
    hp: 270,
    mana: 80,
    endurance: 100,
    cutRes: 40,
    bluntRes: 40,
    pierceRes: 40
  },
  {
    name: "Karapaks",
    type: "shield",
    image: "[www.taernopedia.pl][903]Karapaks.png",
    reqLvl: 85,
    reqStr: 90,
    reqAgi: 90,
    strength: 10,
    agility: 10,
    hp: 200,
    endurance: 100,
    cutRes: 40,
    bluntRes: 40,
    pierceRes: 40
  },
  {
    name: "Smuga",
    type: "shield",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][736]Smuga.png",
    reqLvl: 75,
    reqStr: 50,
    reqPow: 80,
    power: 10,
    knowledge: 15,
    hp: 200,
    mana: 50,
    cutRes: 32,
    bluntRes: 30,
    pierceRes: 33
  },
  {
    name: "Martumal",
    type: "helmet",
    image: "[www.taernopedia.pl][433]Martumal.png",
    reqLvl: 20,
    reqPow: 35,
    reqKno: 20,
    power: 8,
    knowledge: 7,
    mana: 40,
    cutRes: 16,
    bluntRes: 16,
    pierceRes: 20,
    curseRes: 20
  },
  {
    name: "Grzebień",
    type: "helmet",
    image: "[www.taernopedia.pl][450]GrzebieC584.png",
    reqLvl: 28,
    reqStr: 30,
    strength: 4,
    agility: 4,
    hp: 30,
    endurance: 70,
    cutRes: 23,
    bluntRes: 24,
    pierceRes: 27,
    frostRes: 10,
    curseRes: 10
  },
  {
    name: "Ishelm",
    type: "helmet",
    image: "[www.taernopedia.pl][306]Ishelm.png",
    reqLvl: 34,
    strength: 6,
    agility: 10,
    hp: 80,
    cutRes: 29,
    bluntRes: 32,
    pierceRes: 31
  },
  {
    name: "Khalam",
    type: "helmet",
    image: "[www.taernopedia.pl][87]Khalam.png",
    reqLvl: 28,
    power: 8,
    knowledge: 8,
    mana: 60,
    cutRes: 27,
    bluntRes: 24,
    pierceRes: 24,
    curseRes: 20
  },
  {
    name: "Gathril",
    type: "helmet",
    image: "[www.taernopedia.pl][209]Gathril.png",
    reqLvl: 55,
    reqStr: 70,
    hp: 190,
    cutRes: 35,
    bluntRes: 37,
    pierceRes: 38,
    fireRes: 30,
    frostRes: 30,
    energyRes: 30,
    curseRes: 20
  },
  {
    name: "Czacha",
    type: "helmet",
    image: "[www.taernopedia.pl][525]Czacha.png",
    reqLvl: 57,
    reqPow: 70,
    power: 12,
    knowledge: 12,
    hp: 100,
    cutRes: 30,
    bluntRes: 30,
    pierceRes: 30
  },
  {
    name: "Ghaitarog",
    type: "helmet",
    image: "[www.taernopedia.pl][401]Ghaitarog.png",
    reqLvl: 60,
    reqStr: 80,
    strength: 7,
    agility: 9,
    hp: 100,
    endurance: 100,
    cutRes: 32,
    bluntRes: 29,
    pierceRes: 32
  },
  {
    name: "Sigil",
    type: "helmet",
    image: "[www.taernopedia.pl][421]Sigil.png",
    reqLvl: 75,
    reqKno: 90,
    power: 10,
    knowledge: 10,
    hp: 160,
    mana: 50,
    cutRes: 31,
    bluntRes: 31,
    pierceRes: 31,
    energyRes: 25
  },
  {
    name: "Pysk",
    type: "helmet",
    image: "[www.taernopedia.pl][695]Pysk.png",
    reqLvl: 90,
    reqStr: 95,
    strength: 11,
    agility: 11,
    hp: 180,
    mana: 50,
    endurance: 100,
    cutRes: 35,
    bluntRes: 35,
    pierceRes: 35
  },
  {
    name: "Pamięć Morany",
    type: "helmet",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][503]PamiC499C48720Morany.png",
    reqLvl: 120,
    reqStr: 115,
    reqAgi: 120,
    strength: 23,
    agility: 33,
    hp: 270,
    mana: 20,
    endurance: 100,
    cutRes: 40,
    bluntRes: 40,
    pierceRes: 40,
    curseRes: 15,
    fireRes: 15,
    energyRes: 15,
    frostRes: 15,
    otherProperties: ["Modyfikator obrażeń fizycznych: 7% (+1% co poziom)", "Obrona przeciw urokom: 3% (+2% na poziom)", "Odporność na zamrożenie: 10% (+2% co poziom)"]
  },
  {
    name: "Miłość Morany",
    type: "helmet",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][434]MiC582oC59BC48720Morany.png",
    reqLvl: 120,
    reqPow: 115,
    reqKno: 120,
    power: 23,
    knowledge: 28,
    hp: 310,
    mana: 130,
    cutRes: 40,
    bluntRes: 40,
    pierceRes: 40,
    curseRes: 15,
    fireRes: 15,
    energyRes: 15,
    frostRes: 15,
    otherProperties: ["Modyfikator obrażeń magicznych: 7% (+1% co poziom)", "Obrona wręcz: 3% (+2% na poziom)", "Odporność na zamrożenie: 10% (+2% co poziom)"]
  },
  {
    name: "Htagan",
    type: "helmet",
    image: "[www.taernopedia.pl][1]Htagan.png",
    reqLvl: 100,
    reqPow: 105,
    power: 20,
    knowledge: 15,
    hp: 250,
    mana: 50,
    cutRes: 35,
    bluntRes: 35,
    pierceRes: 35,
    curseRes: 10
  },
  {
    name: "Bartaur",
    type: "armor",
    image: "[www.taernopedia.pl][826]Bartaur.png",
    reqLvl: 30,
    reqStr: 40,
    strength: 9,
    agility: 8,
    endurance: 50,
    cutRes: 30,
    bluntRes: 30,
    pierceRes: 30
  },
  {
    name: "Brunnle",
    type: "armor",
    image: "[www.taernopedia.pl][627]Brunnle.png",
    reqLvl: 40,
    reqStr: 40,
    strength: 6,
    agility: 6,
    hp: 60,
    endurance: 80,
    cutRes: 29,
    bluntRes: 31,
    pierceRes: 29
  },
  {
    name: "Pancerz Komandorski",
    type: "armor",
    image: "[www.taernopedia.pl][251]Pancerz20Komandorski.png",
    reqLvl: 45,
    power: 8,
    knowledge: 10,
    hp: 60,
    mana: 40,
    cutRes: 25,
    bluntRes: 27,
    pierceRes: 25
  },
  {
    name: "Virthil II",
    type: "armor",
    image: "[www.taernopedia.pl][19]Virthil20II.png",
    reqLvl: 55,
    reqStr: 80,
    agility: 10,
    hp: 100,
    endurance: 70,
    cutRes: 35,
    bluntRes: 37,
    pierceRes: 36,
    fireRes: 10,
    curseRes: 10
  },
  {
    name: "Diabolo",
    type: "armor",
    image: "[www.taernopedia.pl][163]Diabolo.png",
    reqLvl: 60,
    reqPow: 70,
    power: 19,
    knowledge: -5,
    hp: 150,
    mana: 50,
    cutRes: 25,
    bluntRes: 28,
    pierceRes: 30
  },
  {
    name: "Opoka Bogów",
    type: "armor",
    image: "[www.taernopedia.pl][673]Opoka20BogC3B3w.png",
    reqLvl: 55,
    reqStr: 40,
    strength: 8,
    agility: 8,
    hp: 80,
    endurance: 120,
    cutRes: 37,
    bluntRes: 34,
    pierceRes: 38
  },
  {
    name: "Nadzieja Pokoleń",
    type: "armor",
    image: "[www.taernopedia.pl][499]Nadzieja20PokoleC584.png",
    reqLvl: 80,
    reqPow: 80,
    power: 13,
    knowledge: 20,
    hp: 120,
    mana: 60,
    cutRes: 32,
    bluntRes: 35,
    pierceRes: 32
  },
  {
    name: "Harttraum",
    type: "armor",
    image: "[www.taernopedia.pl][63]Harttraum.png",
    reqLvl: 75,
    reqAgi: 90,
    strength: 16,
    agility: 21,
    hp: 120,
    endurance: 30,
    cutRes: 35,
    bluntRes: 35,
    pierceRes: 35
  },
  {
    name: "Vorleah",
    type: "armor",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][388]Vorleah.png",
    reqLvl: 95,
    reqKno: 100,
    power: 20,
    knowledge: 15,
    hp: 220,
    mana: 80,
    cutRes: 35,
    bluntRes: 35,
    pierceRes: 35,
    frostRes: 15,
    otherProperties: ["Skok Farida: 4% (+1% co poziom)"]
  },
  {
    name: "Zalla",
    type: "armor",
    rarity: "Psychorare",
    image: "Zalla.png",
    reqLvl: 135,
    reqPow: 50,
    reqKno: 50,
    power: 22,
    knowledge: 37,
    hp: 280,
    mana: 100,
    endurance: 30,
    cutRes: 45,
    bluntRes: 45,
    pierceRes: 45,
    curseRes: 20,
    fireRes: 20,
    energyRes: 20,
    frostRes: 20,
    otherProperties: ["Podwójne losowanie obrony: 2% (+2% co poziom)", "Redukcja otrzymanych obrażeń: 2% (+1% na poziom)", "Obrona wręcz: 2% (+2% co poziom)"]
  },
  {
    name: "Salmurn",
    type: "armor",
    rarity: "Psychorare",
    image: "Salmurn.png",
    reqLvl: 135,
    reqStr: 50,
    reqAgi: 50,
    strength: 25,
    agility: 34,
    hp: 230,
    endurance: 100,
    mana: 80,
    cutRes: 50,
    bluntRes: 50,
    pierceRes: 50,
    curseRes: 15,
    fireRes: 15,
    energyRes: 15,
    frostRes: 15,
    otherProperties: ["Podwójne losowanie obrony: 2% (+2% co poziom)", "Redukcja otrzymanych obrażeń: 2% (+1% na poziom)", "Obrona przeciw urokom: 2% (+2% co poziom)"]
  },
  {
    name: "Dmorlung",
    type: "armor",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][932]Dmorlung.png",
    reqLvl: 95,
    reqStr: 100,
    strength: 18,
    agility: 18,
    hp: 150,
    endurance: 120,
    mana: 20,
    cutRes: 40,
    bluntRes: 40,
    pierceRes: 40,
    frostRes: 15
  },
  {
    name: "Angwallion",
    type: "cape",
    image: "[www.taernopedia.pl][970]Angwallion.png",
    reqLvl: 100,
    reqAgi: 105,
    agility: 30,
    hp: 100,
    mana: 100,
    endurance: 100,
    curseRes: 10
  },
  {
    name: "Dracorporis",
    type: "cape",
    image: "[www.taernopedia.pl][168]Dracorporis.png",
    reqLvl: 85,
    reqPow: 90,
    power: 20,
    knowledge: 20,
    hp: 100,
    mana: 50
  },
  {
    name: "Nurthil",
    type: "cape",
    image: "[www.taernopedia.pl][65]Nurthil.png",
    reqLvl: 55,
    reqPow: 90,
    power: 19,
    knowledge: 14,
    hp: -50,
    fireRes: 15
  },
  {
    name: "Debba",
    type: "cape",
    image: "[www.taernopedia.pl][535]Debba.png",
    reqLvl: 61,
    agility: 20,
    hp: 100,
    endurance: 60
  },
  {
    name: "Xenothor",
    type: "cape",
    image: "[www.taernopedia.pl][157]Xenothor.png",
    reqLvl: 64,
    reqAgi: 80,
    strength: 10,
    agility: 18,
    hp: 80,
    endurance: -30,
    fireRes: 15
  },
  {
    name: "Bryza",
    type: "cape",
    image: "[www.taernopedia.pl][911]Bryza.png",
    reqLvl: 45,
    strength: 7,
    agility: 9,
    hp: 90,
    endurance: 30
  },
  {
    name: "Powrót Ivravula",
    type: "cape",
    image: "[www.taernopedia.pl][670]PowrC3B3t20Ivravula.png",
    reqLvl: 80,
    reqStr: 80,
    strength: 14,
    agility: 23,
    hp: 50,
    mana: 20,
    fireRes: 15,
    frostRes: 15
  },
  {
    name: "Tsunami II",
    type: "cape",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][61]Tsunami20II.png",
    reqLvl: 85,
    reqPow: 90,
    reqKno: 90,
    power: 8,
    knowledge: 16,
    hp: 100,
    otherProperties: ["Odporność na trafienie krytyczne: 0% (+1% co poziom)", "Modyfikator trafień magicznych LUB dystansowych: 4% (+2% na poziom)"]
  },
  {
    name: "Cień Tarula",
    type: "cape",
    rarity: "Psychorare",
    image: "Cień_Tarula.png",
    reqLvl: 130,
    reqPow: 130,
    power: 26,
    knowledge: 24,
    hp: 200,
    mana: 80,
    endurance: 20,
    otherProperties: ["Podwójne losowanie trafienia: 4% (+1% co poziom)", "Redukcja otrzymanych obrażeń krytycznych: 7% (+4% na poziom)", "Zużycie many: -2% (-2% co poziom)"]
  },
  {
    name: "Admiralski gronostaj",
    type: "cape",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][869]Admiralski20Gronostaj.png",
    reqLvl: 115,
    reqStr: 100,
    strength: 15,
    agility: 32,
    hp: 170,
    mana: 80,
    endurance: 130,
    otherProperties: ["Podwójne losowanie trafienia: +2% (+1% co poziom)", "Szansa na odczarowanie: +7% (+1% na poziom)"]
  },
  {
    name: "Hańba Seleny",
    type: "cape",
    image: "[www.taernopedia.pl][5]HaC584ba20Seleny.png",
    reqLvl: 115,
    reqPow: 100,
    power: 12,
    knowledge: 20,
    hp: 250,
    mana: 180,
    endurance: 20,
    curseRes: 15,
    fireRes: 15,
    energyRes: 15,
    frostRes: 15
  },
  {
    name: "Erbaile",
    type: "pants",
    image: "[www.taernopedia.pl][942]Erbaile.png",
    reqLvl: 115,
    reqStr: 100,
    strength: 11,
    agility: 29,
    hp: 220,
    endurance: 130,
    cutRes: 40,
    bluntRes: 40,
    pierceRes: 40,
    curseRes: 15,
    fireRes: 15,
    energyRes: 15,
    frostRes: 15
  },
  {
    name: "Varrvy",
    type: "pants",
    image: "[www.taernopedia.pl][916]Varrvy.png",
    reqLvl: 85,
    strength: 20,
    agility: 15,
    hp: 100,
    endurance: 100,
    cutRes: 38,
    bluntRes: 39,
    pierceRes: 39
  },
  {
    name: "Gnaty Reffa",
    type: "armor",
    rarity: "Set",
    set: "Resztki Reffa",
    image: "[www.taernopedia.pl][668]Gnaty20Reffa.png",
    reqLvl: 22,
    agility: 5,
    endurance: 70,
    cutRes: 23,
    bluntRes: 22,
    pierceRes: 20,
    energyRes: 15
  },
  {
    name: "Łeb Reffa",
    type: "helmet",
    rarity: "Set",
    set: "Resztki Reffa",
    image: "[www.taernopedia.pl][205]C581eb20Reffa.png",
    reqLvl: 22,
    strength: 4,
    agility: 4,
    hp: 40,
    endurance: 40,
    cutRes: 18,
    bluntRes: 19,
    pierceRes: 20
  },
  {
    name: "Kulosy Reffa",
    type: "pants",
    rarity: "Set",
    set: "Resztki Reffa",
    image: "[www.taernopedia.pl][196]Kulosy20Reffa.png",
    reqLvl: 22,
    strength: 5,
    hp: 70,
    cutRes: 22,
    bluntRes: 22,
    pierceRes: 22,
    fireRes: 15
  },
  {
    name: "Rękawice Oddalenia",
    type: "gloves",
    rarity: "Set",
    set: "Okowy Snu",
    image: "[www.taernopedia.pl][535]RC499kawice20Oddalenia.png",
    reqLvl: 22,
    power: 7,
    knowledge: 5,
    hp: 70,
    energyRes: 15
  },
  {
    name: "Buty Wymiarów",
    type: "boots",
    rarity: "Set",
    set: "Okowy Snu",
    image: "[www.taernopedia.pl][574]Buty20WymiarC3B3w.png",
    reqLvl: 22,
    power: 6,
    knowledge: 6,
    hp: 60,
    cutRes: 21,
    bluntRes: 22,
    pierceRes: 20
  },
  {
    name: "Pas Ofiarowania",
    type: "belt",
    rarity: "Set",
    set: "Przebranie Ludobójcy",
    image: "[www.taernopedia.pl][700]Pas20ofiarowania.png",
    reqLvl: 40,
    power: 10,
    hp: 50,
    mana: 50,
  },
  {
    name: "Spodnie Hekatomby",
    type: "pants",
    rarity: "Set",
    set: "Przebranie Ludobójcy",
    image: "[www.taernopedia.pl][223]Spodnie20Hekatomby.png",
    reqLvl: 40,
    power: 4,
    knowledge: 7,
    hp: 80,
    mana: 40,
    cutRes: 25,
    bluntRes: 27,
    pierceRes: 26
  },
  {
    name: "Oblicze Sprawcy",
    type: "helmet",
    rarity: "Set",
    set: "Przebranie Ludobójcy",
    image: "[www.taernopedia.pl][780]Oblicze20Sprawcy.png",
    reqLvl: 40,
    power: 4,
    hp: 80,
    mana: 70,
    cutRes: 25,
    bluntRes: 26,
    pierceRes: 27,
    fireRes: 20
  },
  {
    name: "Całun Ludzkości",
    type: "cape",
    rarity: "Set",
    set: "Przebranie Ludobójcy",
    image: "[www.taernopedia.pl][239]CaC582un20LudzkoC59Bci.png",
    reqLvl: 40,
    power: 7,
    knowledge: 8,
    hp: 40
  },
  {
    name: "Szpony Szamana",
    type: "gloves",
    rarity: "Set",
    set: "Zbroja Pinari",
    image: "[www.taernopedia.pl][477]Szpony20Szamana.png",
    reqLvl: 40,
    strength: 6,
    agility: 10,
    endurance: 80,
    curseRes: 20
  },
  {
    name: "Orcza Zbroja",
    type: "armor",
    rarity: "Set",
    set: "Zbroja Pinari",
    image: "[www.taernopedia.pl][635]Orcza20Zbroja.png",
    reqLvl: 40,
    strength: 6,
    hp: 90,
    endurance: 80,
    cutRes: 31,
    bluntRes: 32,
    pierceRes: 30,
    frostRes: 20
  },
  {
    name: "Miecz Pinari",
    type: "weapon",
    rarity: "Set",
    set: "Zbroja Pinari",
    image: "[www.taernopedia.pl][742]Miecz20Pinari.png",
    reqLvl: 40,
    damageType: "Sieczne",
    weaponType: "Jednoręczna",
    damage: 98,
    strength: 9,
    agility: 9,
    hp: 40
  },
  {
    name: "Łuk Pinari",
    type: "weapon",
    rarity: "Set",
    set: "Zbroja Pinari",
    image: "[www.taernopedia.pl][300]C581uk20Pinari.png",
    reqLvl: 40,
    damageType: "Kłute",
    weaponType: "Dwuręczna",
    damage: 106,
    strength: 9,
    agility: 9,
    hp: 40
  },
  {
    name: "Kastet Pinari",
    type: "weapon",
    rarity: "Set",
    set: "Zbroja Pinari",
    image: "[www.taernopedia.pl][494]Kastet20Pinari.png",
    reqLvl: 40,
    damageType: "Obuchowe",
    weaponType: "Dwuręczna",
    damage: 126,
    strength: 9,
    agility: 9,
    hp: 40
  },
  {
    name: "Topór Pinari",
    type: "weapon",
    rarity: "Set",
    set: "Zbroja Pinari",
    image: "[www.taernopedia.pl][189]TopC3B3r20Pinari.png",
    reqLvl: 40,
    damageType: "Sieczne",
    weaponType: "Dwuręczna",
    damage: 135,
    strength: 9,
    agility: 9,
    hp: 40
  },
  {
    name: "Kij Huraganu",
    type: "weapon",
    rarity: "Set",
    class: "druid",
    set: "Gniew Żywiołów",
    image: "[www.taernopedia.pl][565]Kij20Huraganu.png",
    reqLvl: 50,
    damageType: "Obuchowe",
    weaponType: "Dwuręczna",
    damage: 126,
    power: -5,
    knowledge: 5,
    hp: 60,
    mana: 170
  },
  {
    name: "Laska Killarasuna",
    type: "weapon",
    rarity: "Set",
    class: "voodoo",
    set: "Ukazanie Killarasuna",
    image: "Killarasun's_Staff.png",
    reqLvl: 50,
    damageType: "Obuchowe",
    weaponType: "Dwuręczna",
    damage: 98,
    power: -5,
    knowledge: 5,
    hp: 70,
    mana: 200
  },
  {
    name: "Laska Płomieni",
    type: "weapon",
    rarity: "Set",
    class: "firemage",
    set: "Szaty Płynnego Ognia",
    image: "Flame_Staff.png",
    reqLvl: 50,
    damageType: "Obuchowe",
    weaponType: "Dwuręczna",
    damage: 98,
    knowledge: -5,
    hp: 100,
    mana: 220
  },
  {
    name: "Buty Popiołów",
    type: "boots",
    rarity: "Set",
    class: "firemage",
    set: "Szaty Płynnego Ognia",
    image: "Boots_of_Ashes.png",
    reqLvl: 50,
    hp: 150,
    mana: 70,
    cutRes: 33,
    bluntRes: 35,
    pierceRes: 34,
    fireRes: 25
  },
  {
    name: "Buty Vorlingów",
    type: "boots",
    rarity: "Set",
    class: "knight",
    set: "Pancerz Vorlingów",
    image: "Buty_vorlingow.png",
    reqLvl: 100,
    strength: 11,
    agility: 24,
    hp: 120,
    mana: 20,
    endurance: 110,
    cutRes: 38,
    bluntRes: 38,
    pierceRes: 38,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Spodnie Vorlingów",
    type: "pants",
    rarity: "Set",
    class: "knight",
    set: "Pancerz Vorlingów",
    image: "Spodnie_vorlingow.png",
    reqLvl: 100,
    strength: 13,
    agility: 17,
    hp: 180,
    mana: 30,
    endurance: 90,
    cutRes: 37,
    bluntRes: 37,
    pierceRes: 37,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Hełm Vorlingów",
    type: "helmet",
    rarity: "Set",
    class: "knight",
    set: "Pancerz Vorlingów",
    image: "Helm_vorlingow.png",
    reqLvl: 100,
    strength: 16,
    agility: 19,
    hp: 150,
    mana: 10,
    endurance: 90,
    cutRes: 36,
    bluntRes: 36,
    pierceRes: 36,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Zbroja Vorlingów",
    type: "armor",
    rarity: "Set",
    class: "knight",
    set: "Pancerz Vorlingów",
    image: "Zbroja_vorlingow.png",
    reqLvl: 100,
    strength: 14,
    agility: 21,
    hp: 120,
    mana: 20,
    endurance: 110,
    cutRes: 37,
    bluntRes: 37,
    pierceRes: 37,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Vahany",
    type: "boots",
    rarity: "Set",
    class: "sheed",
    set: "Dusza Świata",
    image: "ButyDusza.png",
    reqLvl: 100,
    strength: 12,
    agility: 33,
    hp: 70,
    mana: 10,
    endurance: 70,
    cutRes: 38,
    bluntRes: 38,
    pierceRes: 38,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Kirsile",
    type: "boots",
    rarity: "Set",
    class: "archer",
    set: "Oko Bogów",
    image: "ButyOko.png",
    reqLvl: 100,
    strength: 9,
    agility: 29,
    hp: 120,
    mana: 10,
    endurance: 90,
    cutRes: 38,
    bluntRes: 38,
    pierceRes: 38,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Tchnienie Przyszłości",
    type: "boots",
    rarity: "Set",
    class: "barbarian",
    set: "Pancerz Nieśmiertelności",
    image: "Butybarbarzynca.png",
    reqLvl: 100,
    strength: 18,
    agility: 17,
    hp: 160,
    mana: 10,
    endurance: 80,
    cutRes: 38,
    bluntRes: 38,
    pierceRes: 38,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Gromy",
    type: "boots",
    rarity: "Set",
    class: "druid",
    set: "Pancerz Żywiołów",
    image: "ButyPancerz.png",
    reqLvl: 100,
    power: 17,
    knowledge: 21,
    hp: 150,
    mana: 70,
    cutRes: 36,
    bluntRes: 36,
    pierceRes: 36,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Dreszcze",
    type: "boots",
    rarity: "Set",
    class: "voodoo",
    set: "Zasłona Śmierci",
    image: "ButyZasłona.png",
    reqLvl: 100,
    power: 12,
    knowledge: 33,
    hp: 30,
    mana: 120,
    cutRes: 36,
    bluntRes: 36,
    pierceRes: 36,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Szepty",
    type: "pants",
    rarity: "Set",
    class: "voodoo",
    set: "Zasłona Śmierci",
    image: "SpodnieZasłona.png",
    reqLvl: 100,
    power: 14,
    knowledge: 16,
    hp: 200,
    mana: 100,
    cutRes: 32,
    bluntRes: 32,
    pierceRes: 32,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Memento",
    type: "armor",
    rarity: "Set",
    class: "voodoo",
    set: "Zasłona Śmierci",
    image: "ZbrojaZasłona.png",
    reqLvl: 100,
    power: 13,
    knowledge: 24,
    hp: 150,
    mana: 80,
    cutRes: 32,
    bluntRes: 32,
    pierceRes: 32,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Zgon",
    type: "helmet",
    rarity: "Set",
    class: "voodoo",
    set: "Zasłona Śmierci",
    image: "HelmZasłona.png",
    reqLvl: 100,
    power: 11,
    knowledge: 23,
    hp: 150,
    mana: 110,
    cutRes: 32,
    bluntRes: 32,
    pierceRes: 32,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Agonia",
    type: "cape",
    rarity: "Set",
    class: "voodoo",
    set: "Zasłona Śmierci",
    image: "PelerynaZasłona.png",
    reqLvl: 100,
    power: 12,
    knowledge: 29,
    hp: 110,
    mana: 80,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Zgorzelniki",
    type: "boots",
    rarity: "Set",
    class: "firemage",
    set: "Pocałunek Miliona Gwiazd",
    image: "ButyPocałunek.png",
    reqLvl: 100,
    power: 17,
    knowledge: 18,
    hp: 160,
    mana: 80,
    endurance: 10,
    cutRes: 36,
    bluntRes: 36,
    pierceRes: 36,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Skry",
    type: "pants",
    rarity: "Set",
    class: "firemage",
    set: "Pocałunek Miliona Gwiazd",
    image: "SpodniePocałunek.png",
    reqLvl: 100,
    power: 14,
    knowledge: 21,
    hp: 150,
    mana: 90,
    endurance: 10,
    cutRes: 32,
    bluntRes: 32,
    pierceRes: 32,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Szeol",
    type: "helmet",
    rarity: "Set",
    class: "firemage",
    set: "Pocałunek Miliona Gwiazd",
    image: "HelmPocałunek.png",
    reqLvl: 100,
    power: 17,
    knowledge: 18,
    hp: 100,
    mana: 140,
    endurance: 10,
    cutRes: 32,
    bluntRes: 32,
    pierceRes: 32,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Żar",
    type: "armor",
    rarity: "Set",
    class: "firemage",
    set: "Pocałunek Miliona Gwiazd",
    image: "ZbrojaPocałunek.png",
    reqLvl: 100,
    power: 18,
    knowledge: 22,
    hp: 90,
    mana: 100,
    endurance: 10,
    cutRes: 32,
    bluntRes: 32,
    pierceRes: 32,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Słoneczny Wiatr",
    type: "cape",
    rarity: "Set",
    class: "firemage",
    set: "Pocałunek Miliona Gwiazd",
    image: "PelerynaPocałunek.png",
    reqLvl: 100,
    power: 23,
    knowledge: 17,
    hp: 130,
    mana: 60,
    endurance: 10,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Meandry",
    type: "pants",
    rarity: "Set",
    class: "druid",
    set: "Pancerz Żywiołów",
    image: "SpodniePancerz.png",
    reqLvl: 100,
    power: 19,
    knowledge: 16,
    hp: 130,
    mana: 120,
    cutRes: 32,
    bluntRes: 32,
    pierceRes: 32,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Wicher",
    type: "cape",
    rarity: "Set",
    class: "druid",
    set: "Pancerz Żywiołów",
    image: "PelerynaPancerz.png",
    reqLvl: 100,
    power: 14,
    knowledge: 23,
    hp: 130,
    mana: 100,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Korona Lasu",
    type: "helmet",
    rarity: "Set",
    class: "druid",
    set: "Pancerz Żywiołów",
    image: "HelmPancerz.png",
    reqLvl: 100,
    power: 14,
    knowledge: 20,
    hp: 150,
    mana: 110,
    cutRes: 32,
    bluntRes: 32,
    pierceRes: 32,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Wulkan",
    type: "armor",
    rarity: "Set",
    class: "druid",
    set: "Pancerz Żywiołów",
    image: "ZbrojaPancerz.png",
    reqLvl: 100,
    power: 19,
    knowledge: 18,
    hp: 140,
    mana: 90,
    cutRes: 32,
    bluntRes: 32,
    pierceRes: 32,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Spodnie Wieczności",
    type: "pants",
    rarity: "Set",
    class: "barbarian",
    set: "Pancerz Nieśmiertelności",
    image: "Spodnie.png",
    reqLvl: 100,
    strength: 16,
    agility: 19,
    hp: 150,
    mana: 10,
    endurance: 90,
    cutRes: 37,
    bluntRes: 37,
    pierceRes: 37,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Okrycie Wieczności",
    type: "cape",
    rarity: "Set",
    class: "barbarian",
    set: "Pancerz Nieśmiertelności",
    image: "Peleryna.png",
    reqLvl: 100,
    strength: 24,
    agility: 16,
    hp: 130,
    mana: 10,
    endurance: 60,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Korona Wiecznych Władców",
    type: "helmet",
    rarity: "Set",
    class: "barbarian",
    set: "Pancerz Nieśmiertelności",
    image: "Helm.png",
    reqLvl: 100,
    strength: 21,
    agility: 14,
    hp: 100,
    mana: 10,
    endurance: 140,
    cutRes: 36,
    bluntRes: 36,
    pierceRes: 36,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Starożytna Zbroja",
    type: "armor",
    rarity: "Set",
    class: "barbarian",
    set: "Pancerz Nieśmiertelności",
    image: "Zbroja.png",
    reqLvl: 100,
    strength: 18,
    agility: 18,
    hp: 130,
    mana: 10,
    endurance: 100,
    cutRes: 37,
    bluntRes: 37,
    pierceRes: 37,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Biesagi",
    type: "pants",
    rarity: "Set",
    class: "archer",
    set: "Oko Bogów",
    image: "SpodnieOko.png",
    reqLvl: 100,
    strength: 15,
    agility: 19,
    hp: 110,
    mana: 20,
    endurance: 130,
    cutRes: 37,
    bluntRes: 37,
    pierceRes: 37,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Korona Jastrzębia",
    type: "helmet",
    rarity: "Set",
    class: "archer",
    set: "Oko Bogów",
    image: "HelmOko.png",
    reqLvl: 100,
    strength: 12,
    agility: 21,
    hp: 130,
    mana: 40,
    endurance: 100,
    cutRes: 36,
    bluntRes: 36,
    pierceRes: 36,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Zbroja Strzelca",
    type: "armor",
    rarity: "Set",
    class: "archer",
    set: "Oko Bogów",
    image: "ZbrojaOko.png",
    reqLvl: 100,
    strength: 11,
    agility: 24,
    hp: 150,
    mana: 20,
    endurance: 80,
    cutRes: 37,
    bluntRes: 37,
    pierceRes: 37,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Kamuflaż",
    type: "cape",
    rarity: "Set",
    class: "archer",
    set: "Oko Bogów",
    image: "PelerynaOko.png",
    reqLvl: 100,
    strength: 14,
    agility: 25,
    hp: 100,
    mana: 30,
    endurance: 80,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Manpury",
    type: "pants",
    rarity: "Set",
    class: "sheed",
    set: "Dusza Świata",
    image: "SpodnieDusza.png",
    reqLvl: 100,
    strength: 14,
    agility: 17,
    hp: 140,
    mana: 20,
    endurance: 130,
    cutRes: 37,
    bluntRes: 37,
    pierceRes: 37,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Ajna",
    type: "helmet",
    rarity: "Set",
    class: "sheed",
    set: "Dusza Świata",
    image: "HelmDusza.png",
    reqLvl: 100,
    strength: 9,
    agility: 24,
    hp: 120,
    mana: 50,
    endurance: 100,
    cutRes: 36,
    bluntRes: 36,
    pierceRes: 36,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Anahata",
    type: "armor",
    rarity: "Set",
    class: "sheed",
    set: "Dusza Świata",
    image: "ZbrojaDusza.png",
    reqLvl: 100,
    strength: 14,
    agility: 23,
    hp: 150,
    mana: 20,
    endurance: 60,
    cutRes: 37,
    bluntRes: 37,
    pierceRes: 37,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Vaja",
    type: "cape",
    rarity: "Set",
    class: "sheed",
    set: "Dusza Świata",
    image: "PelerynaDusza.png",
    reqLvl: 100,
    strength: 11,
    agility: 29,
    hp: 100,
    mana: 30,
    endurance: 70,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Płaszcz Vorlingów",
    type: "cape",
    rarity: "Set",
    class: "knight",
    set: "Pancerz Vorlingów",
    image: "Peleryna_vorlingow.png",
    reqLvl: 100,
    strength: 14,
    agility: 16,
    hp: 200,
    mana: 20,
    endurance: 80,
    fireRes: 5,
    frostRes: 5,
    energyRes: 5,
    curseRes: 5
  },
  {
    name: "Rękawice Wulkanów",
    type: "gloves",
    rarity: "Set",
    class: "firemage",
    set: "Szaty Płynnego Ognia",
    image: "Volcano_Gloves.png",
    reqLvl: 50,
    power: 10,
    hp: 100,
    mana: 70
  },
  {
    name: "Pas Ognia",
    type: "belt",
    rarity: "Set",
    class: "firemage",
    set: "Szaty Płynnego Ognia",
    image: "Belt_of_Fire.png",
    reqLvl: 50,
    reqPow: 40,
    power: 10,
    knowledge: 10,
    mana: 70
  },
  {
    name: "Rękawice Killarasuna",
    type: "gloves",
    rarity: "Set",
    class: "voodoo",
    set: "Ukazanie Killarasuna",
    image: "Killarasun's_Gloves.png",
    reqLvl: 50,
    reqKno: 40,
    power: 10,
    knowledge: 10,
    hp: 70
  },
  {
    name: "Pas Killarasuna",
    type: "belt",
    rarity: "Set",
    class: "voodoo",
    set: "Ukazanie Killarasuna",
    image: "Killarasun's_Belt.png",
    reqLvl: 50,
    power: 10,
    knowledge: 10,
    mana: 70
  },
  {
    name: "Buty Killarasuna",
    type: "boots",
    rarity: "Set",
    class: "voodoo",
    set: "Ukazanie Killarasuna",
    image: "Killarasun's_Boots.png",
    reqLvl: 50,
    power: 10,
    knowledge: 10,
    hp: 20,
    cutRes: 33,
    bluntRes: 34,
    pierceRes: 36,
    fireRes: 25
  },
  {
    name: "Kąsacz",
    type: "weapon",
    rarity: "Set",
    class: "archer",
    set: "Żądło Bogów",
    image: "Biter.png",
    reqLvl: 50,
    damageType: "Kłute",
    weaponType: "Dwuręczna",
    damage: 132,
    strength: -5,
    agility: 12,
    hp: 150,
    endurance: 150
  },
  {
    name: "Miecz Boreasza",
    type: "weapon",
    rarity: "Set",
    class: "barbarian",
    set: "Ryk Północy",
    image: "Boreash's_Sword.png",
    reqLvl: 50,
    damageType: "Sieczne",
    weaponType: "Dwuręczna",
    damage: 139,
    strength: 8,
    agility: -5,
    hp: 100,
    endurance: 140
  },
  {
    name: "Ostrze Haugura",
    type: "weapon",
    rarity: "Set",
    class: "knight",
    set: "Sztorm Haugura",
    image: "Haugur's_Blade.png",
    reqLvl: 50,
    reqStr: 35,
    reqAgi: 30,
    damageType: "Sieczne",
    weaponType: "Jednoręczna",
    damage: 116,
    strength: -5,
    hp: 120,
    endurance: 200
  },
  {
    name: "Tekko Balansu",
    type: "weapon",
    rarity: "Set",
    class: "sheed",
    set: "Ostrze Równowagi",
    image: "Tekko_of_Balance.png",
    reqLvl: 50,
    reqAgi: 50,
    damageType: "Sieczne",
    weaponType: "Dwuręczna",
    damage: 139,
    strength: -5,
    hp: 100,
    endurance: 220
  },
  {
    name: "Hełm Harmonii",
    type: "helmet",
    rarity: "Set",
    class: "sheed",
    set: "Ostrze Równowagi",
    image: "Helmet_of_Harmony.png",
    reqLvl: 50,
    strength: 10,
    agility: 10,
    endurance: 20,
    cutRes: 33,
    bluntRes: 34,
    pierceRes: 35,
    curseRes: 25
  },
  {
    name: "Rękawice Czynu",
    type: "gloves",
    rarity: "Set",
    class: "sheed",
    set: "Ostrze Równowagi",
    image: "Gloves_of_Action.png",
    reqLvl: 50,
    strength: 5,
    agility: 17,
    energyRes: 25
  },
  {
    name: "Pas Równowagi",
    type: "belt",
    rarity: "Set",
    class: "sheed",
    set: "Ostrze Równowagi",
    image: "Belt_of_Equilibrium_.png",
    reqLvl: 50,
    agility: 10,
    hp: 120,
    mana: 50
  },
  {
    name: "Tarcza Haugura",
    type: "shield",
    rarity: "Set",
    class: "knight",
    set: "Sztorm Haugura",
    image: "Haugur's_Shield.png",
    reqLvl: 50,
    reqStr: 45,
    agility: 15,
    hp: 70,
    cutRes: 38,
    bluntRes: 38,
    pierceRes: 38,
    fireRes: 25
  },
  {
    name: "Hełm Haugura",
    type: "helmet",
    rarity: "Set",
    class: "knight",
    set: "Sztorm Haugura",
    image: "Haugur's_Helmet.png",
    reqLvl: 50,
    reqStr: 50,
    hp: 120,
    endurance: 100,
    cutRes: 30,
    bluntRes: 31,
    pierceRes: 32,
    curseRes: 25
  },
  {
    name: "Rękawice Haugura",
    type: "gloves",
    rarity: "Set",
    class: "knight",
    set: "Sztorm Haugura",
    image: "Haugur's_Gloves.png",
    reqLvl: 50,
    reqStr: 40,
    strength: 10,
    hp: 70,
    endurance: 100
  },
  {
    name: "Pas Luty",
    type: "belt",
    rarity: "Set",
    class: "barbarian",
    set: "Ryk Północy",
    image: "Cold_Belt.png",
    reqLvl: 50,
    strength: 10,
    agility: 10,
    endurance: 100,
    fireRes: 15
  },
  {
    name: "Rękawice Północy",
    type: "gloves",
    rarity: "Set",
    class: "barbarian",
    set: "Ryk Północy",
    image: "Gloves_of_the_North.png",
    reqLvl: 50,
    agility: 7,
    hp: 100,
    endurance: 100
  },
  {
    name: "Ryk Północy",
    type: "armor",
    rarity: "Set",
    class: "barbarian",
    set: "Ryk Północy",
    image: "Roar_of_the_North.png",
    reqLvl: 50,
    strength: 8,
    agility: 8,
    hp: 100,
    cutRes: 33,
    bluntRes: 32,
    pierceRes: 34,
  },
  {
    name: "Buty Północy",
    type: "boots",
    rarity: "Set",
    class: "barbarian",
    set: "Ryk Północy",
    image: "Boots_of_the_North.png",
    reqLvl: 50,
    strength: 15,
    agility: 7,
    cutRes: 31,
    bluntRes: 31,
    pierceRes: 31,
    energyRes: 25
  },
  {
    name: "Pas Trucizny",
    type: "belt",
    rarity: "Set",
    class: "archer",
    set: "Żądło Bogów",
    image: "Belt_of_Poison.png",
    reqLvl: 50,
    hp: 150,
    endurance: 120
  },
  {
    name: "Rękawice Toksyczne",
    type: "gloves",
    rarity: "Set",
    class: "archer",
    set: "Żądło Bogów",
    image: "Toxic_Gloves.png",
    reqLvl: 50,
    strength: 7,
    hp: 100,
    endurance: 100
  },
  {
    name: "Hełm Niełaski",
    type: "helmet",
    rarity: "Set",
    class: "archer",
    set: "Żądło Bogów",
    image: "Helmet_of_Disgrace.png",
    reqLvl: 50,
    strength: 10,
    agility: 12,
    cutRes: 33,
    bluntRes: 34,
    pierceRes: 35,
    energyRes: 25
  },
  {
    name: "Pas Powodzi",
    type: "belt",
    rarity: "Set",
    class: "druid",
    set: "Gniew Żywiołów",
    image: "[www.taernopedia.pl][979]Pas20Powodzi.png",
    reqLvl: 50,
    power: 10,
    knowledge: 10,
    mana: 70
  },
  {
    name: "Rękawice Suszy",
    type: "gloves",
    rarity: "Set",
    class: "druid",
    set: "Gniew Żywiołów",
    image: "[www.taernopedia.pl][968]RC499kawice20Suszy.png",
    reqLvl: 50,
    knowledge: 10,
    hp: 100,
    mana: 70
  },
  {
    name: "Buty Tąpnięcia",
    type: "boots",
    rarity: "Set",
    class: "druid",
    set: "Gniew Żywiołów",
    image: "[www.taernopedia.pl][903]Buty20TC485pniC499cia.png",
    reqLvl: 50,
    hp: 150,
    mana: 70,
    cutRes: 34,
    bluntRes: 33,
    pierceRes: 35,
    fireRes: 25
  },
  {
    name: "Szarfa Nieistnienia",
    type: "belt",
    rarity: "Set",
    set: "Okowy Snu",
    image: "[www.taernopedia.pl][142]Szarfa20Nieistnienia.png",
    reqLvl: 22,
    hp: 60,
    mana: 60,
    fireRes: 15
  },
  {
    name: "Obdartusy",
    type: "pants",
    image: "[www.taernopedia.pl][937]Obdartusy.png",
    reqLvl: 57,
    reqStr: 70,
    strength: 14,
    agility: 10,
    hp: 110,
    cutRes: 36,
    bluntRes: 32,
    pierceRes: 37
  },
  {
    name: "Wzorek",
    type: "pants",
    image: "[www.taernopedia.pl][526]Wzorek.png",
    reqLvl: 55,
    reqKno: 70,
    power: 12,
    knowledge: 12,
    hp: 80,
    mana: 20,
    cutRes: 30,
    bluntRes: 30,
    pierceRes: 30
  },
  {
    name: "Tirhel II",
    type: "pants",
    image: "[www.taernopedia.pl][614]Tirhel20II.png",
    reqLvl: 55,
    reqPow: 80,
    power: 6,
    knowledge: 10,
    hp: 110,
    cutRes: 36,
    bluntRes: 32,
    pierceRes: 34,
    fireRes: 10,
    curseRes: 10
  },
  {
    name: "Skiilfy",
    type: "pants",
    image: "[www.taernopedia.pl][325]Skiilfy.png",
    reqLvl: 85,
    reqPow: 90,
    reqKno: 90,
    power: 15,
    knowledge: 20,
    hp: 150,
    mana: 50,
    cutRes: 35,
    bluntRes: 35,
    pierceRes: 35
  },
  {
    name: "Aquariusy II",
    type: "pants",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][995]Aquariusy20II.png",
    reqLvl: 85,
    reqStr: 90,
    reqAgi: 90,
    strength: 10,
    agility: 18,
    endurance: 60,
    cutRes: 40,
    bluntRes: 40,
    pierceRes: 40,
    otherProperties: ["Odporność na trafienie krytyczne: 0% (+1% co poziom)", "Modyfikator trafień fizycznych LUB dystansowych: 4% (+2% na poziom)"]
  },
  {
    name: "Ziraki",
    type: "pants",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][91]Ziraki.png",
    reqLvl: 130,
    reqStr: 130,
    strength: 27,
    agility: 23,
    hp: 180,
    endurance: 80,
    mana: 40,
    cutRes: 30,
    bluntRes: 30,
    pierceRes: 30,
    otherProperties: ["Podwójne losowanie trafienia: 4% (+1% co poziom)", "Redukcja otrzymanych obrażeń krytycznych: 7% (+4% na poziom)", "Zużycie kondycji: -2% (-2% co poziom)"]
  },
  {
    name: "Temary II",
    type: "pants",
    rarity: "Psychorare",
    image: "Temary.png",
    reqLvl: 125,
    reqPow: 50,
    reqKno: 50,
    knowledge: 25,
    hp: 750,
    cutRes: 45,
    bluntRes: 45,
    pierceRes: 45,
    curseRes: 20,
    fireRes: 20,
    energyRes: 20,
    frostRes: 20,
    otherProperties: ["Redukcja otrzymanych obrażeń biernych: 1% (+2% co poziom)", "Szansa na odczarowanie: 1% (+1% na poziom)"]
  },
  {
    name: "Udręki",
    type: "pants",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][131]UdrC499ki.png",
    reqLvl: 110,
    reqPow: 100,
    power: 10,
    knowledge: 30,
    hp: 250,
    mana: 110,
    cutRes: 39,
    bluntRes: 39,
    pierceRes: 39,
    otherProperties: ["Modyfikator obrażeń magicznych: 4% (+1% co poziom)", "Przełamanie odporności na urok: 4% (+1% na poziom)"]
  },
  {
    name: "Arhauty II",
    type: "boots",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][361]Arhauty20II.png",
    reqLvl: 125,
    reqStr: 50,
    reqAgi: 50,
    agility: 25,
    hp: 750,
    cutRes: 50,
    bluntRes: 50,
    pierceRes: 50,
    curseRes: 15,
    fireRes: 15,
    energyRes: 15,
    frostRes: 15,
    otherProperties: ["Redukcja otrzymanych obrażeń biernych: 1% (+2% co poziom)", "Szansa na odczarowanie: 1% (+1% na poziom)"]
  },
  {
    name: "Moczary",
    type: "boots",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][415]Moczary.png",
    reqLvl: 30,
    reqStr: 45,
    strength: 5,
    agility: 4,
    hp: 30,
    cutRes: 23,
    bluntRes: 22,
    pierceRes: 25,
    otherProperties: ["Modyfikator trafień fizycznych: 10% (+2% co poziom)"]
  },
  {
    name: "Virveny",
    type: "boots",
    image: "[www.taernopedia.pl][403]Virveny.png",
    reqLvl: 75,
    reqStr: 90,
    reqAgi: 90,
    strength: 10,
    agility: 8,
    hp: 150,
    mana: 50,
    endurance: 150,
    cutRes: 33,
    bluntRes: 34,
    pierceRes: 32,
    fireRes: 15
  },
  {
    name: "Jeroszki",
    type: "boots",
    image: "[www.taernopedia.pl][260]Jeroszki.png",
    reqLvl: 34,
    reqStr: 40,
    strength: 4,
    hp: 120,
    endurance: 120,
    cutRes: 29,
    bluntRes: 30,
    pierceRes: 30,
    fireRes: 10
  },
  {
    name: "Tangnary",
    type: "boots",
    image: "[www.taernopedia.pl][91]Tangnary.png",
    reqLvl: 50,
    reqAgi: 70,
    strength: 11,
    agility: 11,
    hp: 50,
    endurance: 30,
    cutRes: 33,
    bluntRes: 27,
    pierceRes: 33,
    energyRes: 15
  },
  {
    name: "Lysmary",
    type: "boots",
    image: "[www.taernopedia.pl][59]Lysmary.png",
    reqLvl: 34,
    reqKno: 40,
    power: 8,
    knowledge: 2,
    hp: 80,
    mana: 60,
    cutRes: 30,
    bluntRes: 29,
    pierceRes: 31
  },
  {
    name: "Czengsvesy",
    type: "boots",
    image: "[www.taernopedia.pl][692]Czengsvesy.png",
    reqLvl: 27,
    power: 6,
    knowledge: 9,
    mana: 50,
    cutRes: 17,
    bluntRes: 20,
    pierceRes: 20
  },
  {
    name: "Alendry",
    type: "boots",
    image: "[www.taernopedia.pl][511]Alendry.png",
    reqLvl: 110,
    reqPow: 100,
    power: 20,
    knowledge: 44,
    hp: 140,
    mana: 70,
    cutRes: 37,
    bluntRes: 37,
    pierceRes: 37,
    frostRes: 10
  },
  {
    name: "Thorimmy",
    type: "boots",
    image: "[www.taernopedia.pl][837]Thorimmy.png",
    reqLvl: 72,
    reqKno: 90,
    power: 10,
    knowledge: 10,
    hp: 160,
    mana: 20,
    cutRes: 35,
    bluntRes: 35,
    pierceRes: 30,
    frostRes: 15
  },
  {
    name: "Aqueniry",
    type: "boots",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][856]Aqueniry.png",
    reqLvl: 85,
    reqPow: 85,
    reqKno: 85,
    power: 19,
    knowledge: 16,
    hp: 150,
    mana: 20,
    cutRes: 34,
    bluntRes: 37,
    pierceRes: 37,
    otherProperties: ["Zużycie many: +26% (-2% co poziom)", "Szansa na podwójny atak: +4% (+1% na poziom)"]
  },
  {
    name: "Envile",
    type: "boots",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][637]Envile.png",
    reqLvl: 120,
    reqPow: 100,
    power: 25,
    knowledge: 28,
    hp: 160,
    mana: 110,
    cutRes: 30,
    bluntRes: 30,
    pierceRes: 30,
    otherProperties: ["Szansa na podwójny atak: +2% (+1% co poziom)", "Modyfikator obrażeń magicznych: 2% (+1% na poziom)"]
  },
  {
    name: "Cierpiętniki",
    type: "boots",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][134]CierpiC499tniki.png",
    reqLvl: 110,
    reqStr: 100,
    reqAgi: 50,
    strength: 22,
    agility: 28,
    hp: 240,
    endurance: 110,
    cutRes: 40,
    bluntRes: 40,
    pierceRes: 40,
    otherProperties: ["Modyfikator obrażeń fizycznych: 4% (+1% co poziom)", "Modyfikator trafień fizycznych: 10% (+2% na poziom)"]
  },
  {
    name: "Objęcia Morany",
    type: "belt",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][202]ObjC499cia20Morany.png",
    reqLvl: 115,
    reqPow: 100,
    reqKno: 125,
    power: 22,
    knowledge: 29,
    hp: 230,
    mana: 160,
    otherProperties: ["Obrona wręcz: 5% (+2% co poziom)", "Obrona dystansowa: 3% (+2% na poziom)", "Obrona przeciw urokom: 1% (+2% co poziom)"]
  },
  {
    name: "Exuvium",
    type: "belt",
    image: "[www.taernopedia.pl][199]Exuvium.png",
    reqLvl: 90,
    reqKno: 90,
    power: 5,
    knowledge: 35,
    hp: 100,
    mana: 50
  },
  {
    name: "Radius Electricum",
    type: "belt",
    image: "[www.taernopedia.pl][206]Radius20Electricum.png",
    reqLvl: 36,
    reqPow: 40,
    power: 10,
    knowledge: 6,
    mana: 70
  },
  {
    name: "Sentrion",
    type: "belt",
    image: "[www.taernopedia.pl][740]Sentrion.png",
    reqLvl: 64,
    reqPow: 90,
    power: -5,
    knowledge: 30,
    hp: 50,
    mana: 50
  },
  {
    name: "Anabolik",
    type: "belt",
    image: "[www.taernopedia.pl][309]Anabolik.png",
    reqLvl: 19,
    reqStr: 25,
    strength: 8,
    hp: 110
  },
  {
    name: "Dagorilm",
    type: "belt",
    image: "[www.taernopedia.pl][526]Dagorilm.png",
    reqLvl: 71,
    reqStr: 90,
    strength: 5,
    agility: 10,
    knowledge: 6,
    hp: 150,
    endurance: 40
  },
  {
    name: "Koriatula",
    type: "belt",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][773]Koriatula.png",
    reqLvl: 35,
    reqKno: 45,
    power: 5,
    knowledge: 3,
    hp: 60,
    otherProperties: ["Modyfikator trafień dystansowych: 10% (+2% co poziom)"]
  },
  {
    name: "Promuris",
    type: "belt",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][873]Promuris.png",
    reqLvl: 35,
    reqAgi: 45,
    strength: 4,
    agility: 5,
    hp: 50,
    otherProperties: ["Odporność na korzenie: 10% (+2% co poziom)", "Modyfikator obrażeń fizycznych: 3% (+1% na poziom)"]
  },
  {
    name: "Nurt",
    type: "belt",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][135]Nurt.png",
    reqLvl: 85,
    reqStr: 85,
    reqAgi: 85,
    strength: 17,
    agility: 15,
    hp: 160,
    endurance: 40,
    otherProperties: ["Zużycie kondycji: +26% (-2% co poziom)", "Szansa na podwójny atak: +4% (+1% na poziom)"]
  },
  {
    name: "Nienawiść Draugula",
    type: "belt",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][67]NienawiC59BC48720Draugula.png",
    reqLvl: 120,
    reqStr: 100,
    strength: 21,
    agility: 32,
    hp: 170,
    mana: 50,
    endurance: 50,
    otherProperties: ["Szansa na podwójny atak: +2% (+1% co poziom)", "Modyfikator obrażeń fizycznych: 2% (+1% na poziom)"]
  },
  {
    name: "Groza Seleny",
    type: "belt",
    image: "[www.taernopedia.pl][281]Groza20Seleny.png",
    reqLvl: 110,
    reqStr: 100,
    strength: 20,
    agility: 45,
    hp: 150,
    endurance: 50,
    frostRes: 10
  },
  {
    name: "Disolver",
    type: "ring",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][959]Disolver.png",
    reqLvl: 100,
    frostRes: 45,
    curseRes: 45,
    otherProperties: ["Odporność na zamrożenie: 20% (+2% co poziom)"]
  },
  {
    name: "Allakaja Many",
    type: "ring",
    set: "Światła Tellabagu",
    rarity: "Set",
    image: "[www.taernopedia.pl][788]Allakaja20Many.png",
    reqLvl: 35,
    mana: 80,
    endurance: 80,
    energyRes: 15
  },
  {
    name: "Allakaja Kondycji",
    type: "ring",
    set: "Światła Tellabagu",
    rarity: "Set",
    image: "[www.taernopedia.pl][150]Allakaja20Kondycji.png",
    reqLvl: 35,
    hp: 140,
    fireRes: 15
  },
  {
    name: "Gwiazda Tellabagu",
    type: "neck",
    set: "Światła Tellabagu",
    rarity: "Set",
    image: "[www.taernopedia.pl][84]Gwiazda20Tellabagu.png",
    reqLvl: 35,
    agility: 10,
    knowledge: 10,
    curseRes: 15
  },
  {
    name: "Zagłada Ludów",
    type: "ring",
    image: "[www.taernopedia.pl][474]ZagC582ada20LudC3B3w.png",
    reqLvl: 110,
    reqStr: 100,
    strength: 30,
    agility: 30,
    hp: 100,
    mana: 20,
    endurance: 30
  },
  {
    name: "Nit",
    type: "ring",
    image: "[www.taernopedia.pl][63]Nit.png",
    reqLvl: 50,
    strength: 12,
    agility: 15,
    hp: 30
  },
  {
    name: "Karlder",
    type: "ring",
    image: "[www.taernopedia.pl][928]Karlder.png",
    reqLvl: 38,
    reqStr: 50,
    strength: 10,
    agility: 10,
    hp: 60
  },
  {
    name: "Fiskorl II",
    type: "ring",
    image: "[www.taernopedia.pl][159]Fiskorl20II.png",
    reqLvl: 27,
    reqStr: 40,
    strength: 9,
    agility: 9,
    frostRes: 20,
    cutRes: 20
  },
  {
    name: "Navigon",
    type: "ring",
    image: "[www.taernopedia.pl][660]Navigon.png",
    reqLvl: 50,
    power: 12,
    knowledge: 15,
    hp: 30
  },
  {
    name: "Fulgur II",
    type: "ring",
    image: "[www.taernopedia.pl][293]Fulgur20II.png",
    reqLvl: 36,
    reqPow: 50,
    power: 4,
    knowledge: 8,
    hp: 100,
    frostRes: 30
  },
  {
    name: "Basileus",
    type: "ring",
    image: "[www.taernopedia.pl][290]Basileus.png",
    reqLvl: 28,
    reqPow: 40,
    power: 9,
    knowledge: 9,
    frostRes: 20,
    curseRes: 20
  },
  {
    name: "Uguns",
    type: "ring",
    image: "[www.taernopedia.pl][546]Uguns.png",
    reqLvl: 32,
    hp: 140,
    mana: 60,
    endurance: 60,
    fireRes: 20
  },
  {
    name: "Arcanscape II",
    type: "ring",
    image: "[www.taernopedia.pl][902]Arcanscape20II.png",
    reqLvl: 20,
    hp: 80,
    mana: 30,
    endurance: 30,
    curseRes: 40
  },
  {
    name: "Griv",
    type: "ring",
    image: "[www.taernopedia.pl][460]Griv.png",
    reqLvl: 75,
    hp: 400,
    mana: 50,
    endurance: 50
  },
  {
    name: "Balast",
    type: "ring",
    image: "[www.taernopedia.pl][959]Balast.png",
    reqLvl: 50,
    hp: 240,
    mana: 30,
    endurance: 30,
    energyRes: 20
  },
  {
    name: "Mauremys",
    type: "ring",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][128]Mauremys.png",
    reqLvl: 85,
    reqPow: 90,
    power: 20,
    knowledge: 20,
    hp: 100,
    otherProperties: ["Zużycie many: -5% (-2% co poziom)"]
  },
  {
    name: "Skogan",
    type: "ring",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][393]Skogan.png",
    reqLvl: 85,
    reqStr: 90,
    strength: 20,
    agility: 20,
    hp: 80,
    mana: 20,
    otherProperties: ["Zużycie kondycji: -5% (-2% co poziom)"]
  },
  {
    name: "Przysięga Draugula",
    type: "ring",
    image: "[www.taernopedia.pl][409]PrzysiC499ga20Draugula.png",
    reqLvl: 110,
    reqPow: 100,
    power: 30,
    knowledge: 30,
    hp: 100,
    mana: 30,
    endurance: 20
  },
  {
    name: "Ortasis",
    type: "neck",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][392]Ortasis.png",
    reqLvl: 130,
    power: 20,
    knowledge: 20,
    hp: 100,
    mana: 70,
    endurance: 30,
    fireRes: 10,
    energyRes: 30,
    otherProperties: ["Modyfikator obrażeń magicznych: 3% (+1% co poziom)", "Szansa na odczarowanie: 3% (+1% co poziom)", "Redukcja otrzymanych obrażeń biernych: 6% (+2% co poziom)"]
  },
  {
    name: "Vogurun",
    type: "neck",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][567]Vogurun.png",
    reqLvl: 75,
    reqKno: 70,
    power: 10,
    knowledge: 10,
    otherProperties: ["Modyfikator obrażeń magicznych: 10% (+1% co poziom)"]
  },
  {
    name: "Ostolbin",
    type: "neck",
    image: "[www.taernopedia.pl][853]Ostolbin.png",
    reqLvl: 34,
    reqPow: 40,
    power: 6,
    knowledge: 6,
    hp: 60,
    mana: 100
  },
  {
    name: "Ibura",
    type: "neck",
    image: "[www.taernopedia.pl][945]Ibura.png",
    power: 1,
    knowledge: 2,
    hp: 30,
    fireRes: 10,
    curseRes: 10
  },
  {
    name: "Hadras",
    type: "neck",
    image: "[www.taernopedia.pl][312]Hadras.png",
    strength: 1,
    agility: 2,
    hp: 30,
    fireRes: 10,
    curseRes: 10
  },
  {
    name: "Maiarot",
    type: "neck",
    image: "[www.taernopedia.pl][184]Maiarot.png",
    reqLvl: 15,
    hp: 100
  },
  {
    name: "Markahn",
    type: "neck",
    image: "[www.taernopedia.pl][823]Markahn.png",
    reqLvl: 32,
    agility: 3,
    knowledge: 3,
    hp: 100,
    fireRes: 38,
    curseRes: 38
  },
  {
    name: "Sphaera",
    type: "neck",
    image: "[www.taernopedia.pl][653]Sphaera.png",
    reqLvl: 36,
    reqStr: 40,
    strength: 8,
    agility: 8,
    endurance: 80
  },
  {
    name: "Zemsta Ivravula",
    type: "neck",
    image: "[www.taernopedia.pl][626]Zemsta20Ivravula.png",
    reqLvl: 70,
    hp: 400,
    fireRes: 10,
    frostRes: 10,
    energyRes: 10,
    curseRes: 10
  },
  {
    name: "Caratris",
    type: "neck",
    image: "[www.taernopedia.pl][479]Caratris.png",
    reqLvl: 45,
    hp: 40,
    fireRes: 40,
    frostRes: 40,
    energyRes: 40,
    curseRes: 40
  },
  {
    name: "Obroża Władcy",
    type: "neck",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][819]ObroC5BCa20WC582adcy.png",
    reqLvl: 35,
    reqKno: 45,
    power: 7,
    hp: 80,
    otherProperties: ["Regeneracja many: 10% (+2% co poziom)", "Modyfikator obrażeń magicznych: 3% (+1% co poziom)"]
  },
  {
    name: "Valazan",
    type: "neck",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][78]Valazan.png",
    reqLvl: 50,
    power: 9,
    knowledge: 9,
    hp: 50,
    mana: 40,
    otherProperties: ["Zużycie many: -2% (-2% co poziom)"]
  },
  {
    name: "Danthum",
    type: "neck",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][980]Danthum.png",
    reqLvl: 50,
    strength: 9,
    agility: 9,
    hp: 50,
    endurance: 40,
    otherProperties: ["Zużycie kondycji: -2% (-2% co poziom)"]
  },
  {
    name: "Yurugu",
    type: "neck",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][602]Yurugu.png",
    reqLvl: 75,
    reqStr: 80,
    strength: 10,
    agility: 10,
    otherProperties: ["Modyfikator obrażeń fizycznych: 10% (+1% co poziom)"]
  },
  {
    name: "Dorbis",
    type: "neck",
    rarity: "Psychorare",
    image: "Dorbis.png",
    reqLvl: 130,
    strength: 20,
    agility: 20,
    hp: 100,
    mana: 30,
    endurance: 70,
    fireRes: 10,
    energyRes: 30,
    otherProperties: ["Modyfikator obrażeń fizycznych: 3% (+1% co poziom)", "Szansa na odczarowanie: 3% (+1% co poziom)", "Redukcja otrzymanych obrażeń biernych: 6% (+2% co poziom)"]
  },
  {
    name: "Serce Seleny",
    type: "neck",
    image: "[www.taernopedia.pl][369]Serce20Seleny.png",
    reqLvl: 115,
    hp: 200,
    mana: 50,
    endurance: 50,
    curseRes: 50,
    fireRes: 50,
    energyRes: 50,
    frostRes: 50
  },
  {
    name: "Aeterus Passio",
    type: "gloves",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][750]Aeterus20Passio.png",
    reqLvl: 115,
    reqStr: 110,
    reqAgi: 125,
    strength: 30,
    agility: 30,
    hp: 250,
    endurance: 50,
    otherProperties: ["Obrona wręcz: 1% (+2% co poziom)", "Obrona dystansowa: 3% (+2% co poziom)", "Obrona przeciw urokom: 5% (+2% co poziom)"]
  },
  {
    name: "Biltabandury",
    type: "gloves",
    image: "[www.taernopedia.pl][982]Biltabandury.png",
    reqLvl: 63,
    reqStr: 80,
    strength: 2,
    agility: 12,
    hp: 100,
    endurance: 100
  },
  {
    name: "Zadry",
    type: "gloves",
    image: "[www.taernopedia.pl][843]Zadry.png",
    reqLvl: 75,
    reqStr: 70,
    strength: 15,
    agility: 18,
    hp: 180,
    endurance: 40
  },
  {
    name: "Gest Władcy",
    type: "gloves",
    image: "[www.taernopedia.pl][368]Gest20WC582adcy.png",
    reqLvl: 32,
    reqStr: 40,
    strength: 12,
    agility: 5,
    hp: 40,
    endurance: 20
  },
  {
    name: "Brassary II",
    type: "gloves",
    image: "[www.taernopedia.pl][856]Brassary20II.png",
    reqLvl: 32,
    power: 10,
    knowledge: 5,
    mana: 60,
    fireRes: 20,
    frostRes: 20
  },
  {
    name: "Vaekany",
    type: "gloves",
    image: "[www.taernopedia.pl][547]Vaekany.png",
    reqLvl: 65,
    reqKno: 90,
    power: 10,
    knowledge: 7,
    hp: 20,
    mana: 180
  },
  {
    name: "Pazury",
    type: "gloves",
    image: "[www.taernopedia.pl][16]Pazury.png",
    reqLvl: 90,
    reqKno: 95,
    power: 15,
    knowledge: 10,
    hp: 120,
    mana: 180
  },
  {
    name: "Fraxy",
    type: "gloves",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][552]Fraxy.png",
    reqLvl: 30,
    reqPow: 45,
    power: 3,
    knowledge: 2,
    hp: 40,
    mana: 10,
    otherProperties: ["Modyfikator trafień magicznych: 10% (+2% co poziom)"]
  },
  {
    name: "Skry Utoru",
    type: "gloves",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][45]Skry20Utoru.png",
    reqLvl: 115,
    reqPow: 100,
    power: 23,
    knowledge: 27,
    hp: 190,
    mana: 160,
    otherProperties: ["Modyfikator trafień dystansowych: +10% (+2% co poziom)", "Szansa na odczarowanie: +7% (+1% co poziom)"]
  },
  {
    name: "Szpony Seimhi",
    type: "gloves",
    rarity: "Psychorare",
    image: "[www.taernopedia.pl][348]Szpony20Seimhi.png",
    reqLvl: 115,
    reqPow: 100,
    power: 23,
    knowledge: 27,
    hp: 190,
    mana: 160,
    otherProperties: ["Modyfikator trafień magicznych: +10% (+2% co poziom)", "Szansa na odczarowanie: +7% (+1% co poziom)"]
  }
]

const items = itemDatabase.map(item => new Item(item));
const sortedItems = items.sort((x, y) => x.reqLvl - y.reqLvl);
const taernDatabase = {
  skills: skillDatabase,
  items: sortedItems
}

export {
  Item
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
