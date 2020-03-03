import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Calculator from './App';
import * as serviceWorker from './serviceWorker';

const calculator = document.getElementById("calc");

document.getElementById("classLvl").addEventListener(
  "submit",
  function(event) {
    event.preventDefault();
    showCalc(event.target[0].value, event.target[1].value, skillDatabase);
  },
  false
);

function showCalc(charClass, charLvl, database) {
  ReactDOM.unmountComponentAtNode(calculator);
  let skillSet = new SkillSet(charClass, database);
  ReactDOM.render(
    <Calculator level={parseInt(charLvl)} class={skillSet} />,
    calculator
  );
}

const skillDatabase = {
  knight: {
    skill1: {
      name: "Szybkie Cięcie",
      description: (
        <div>
          <p>
            Podstawa rycerskiego rzemiosła. Cios ćwiczony przez Rycerzy na
            każdym dworze Taernu. Celny i błyskawiczny atak bronią, zaskakujący
            przeciwnika. Silniejszy i celniejszy niż podstawowy Cios bronią.
          </p>
          <p>Dostępne od 2 poziomu doświadczenia</p>
          <p>OBR: 0.7 * Siła + 0.3 * Zręczność + broń</p>
        </div>
      ),
      table: (
        <table>
          <tbody>
            <tr>
              <td>Poziom Um</td>
              <td>Obrażenia</td>
              <td>Szansa trafienia</td>
              <td>Kondycja</td>
            </tr>
            <tr>
              <td>I</td>
              <td>110%</td>
              <td>120%</td>
              <td>12</td>
            </tr>
            <tr>
              <td>II</td>
              <td>120%</td>
              <td>125%</td>
              <td>14</td>
            </tr>
            <tr>
              <td>III</td>
              <td>130%</td>
              <td>130%</td>
              <td>16</td>
            </tr>
            <tr>
              <td>IV</td>
              <td>140%</td>
              <td>135%</td>
              <td>18</td>
            </tr>
            <tr>
              <td>V</td>
              <td>150%</td>
              <td>140%</td>
              <td>19</td>
            </tr>
            <tr>
              <td>VI</td>
              <td>160%</td>
              <td>145%</td>
              <td>21</td>
            </tr>
            <tr>
              <td>VII</td>
              <td>170%</td>
              <td>155%</td>
              <td>23</td>
            </tr>
          </tbody>
        </table>
      ),
      image: "images/Szybkie_Cięcie.jpg"
    },
    skill2: {
      name: "Mierzony Cios",
      description: (
        <div>
          <p>
            Wieloletnie treningi sztuk walki i dbanie o kondycję fizyczną
            sprawiły, że większość Rycerzy zaniedbała swoją wiedzę (nie mylić z
            ich stroną duchową), przez co stali się bardziej podatni na uroki.
            Opracowany przeciwko magom, czarownikom i łucznikom Mierzony cios
            jest techniką mającą odwrócić tę tendencję. Skutecznie
            przeprowadzony oszałamia ofiarę obniżając efektywność jej ataków
            dystansowych i uroków. Dodatkowo podnosi obrażenia Potężnego
            uderzenia o 15%.
          </p>
          <p>Dostępne od 5 poziomu doświadczenia</p>
          <p>OBR: 0.7 * Siła + 0.3 * Zręczność + broń</p>
        </div>
      ),
      table: (
        <table>
          <tbody>
            <tr>
              <td>Poziom Um</td>
              <td>Obrażenia</td>
              <td>Szansa trafienia</td>
              <td>Kondycja</td>
              <td>Atak magiczny i dystansowy (szansa trafienia)</td>
              <td>Czas</td>
            </tr>
            <tr>
              <td>I</td>
              <td>80%</td>
              <td>100%</td>
              <td>20</td>
              <td>-25%</td>
              <td>3</td>
            </tr>
            <tr>
              <td>II</td>
              <td>85%</td>
              <td>103%</td>
              <td>23</td>
              <td>-28%</td>
              <td>3</td>
            </tr>
            <tr>
              <td>III</td>
              <td>90%</td>
              <td>107%</td>
              <td>26</td>
              <td>-31%</td>
              <td>4</td>
            </tr>
            <tr>
              <td>IV</td>
              <td>95%</td>
              <td>110%</td>
              <td>29</td>
              <td>-34%</td>
              <td>4</td>
            </tr>
            <tr>
              <td>V</td>
              <td>100%</td>
              <td>112%</td>
              <td>32</td>
              <td>-37%</td>
              <td>5</td>
            </tr>
            <tr>
              <td>VI</td>
              <td>110%</td>
              <td>115%</td>
              <td>35</td>
              <td>-41%</td>
              <td>5</td>
            </tr>
            <tr>
              <td>VII</td>
              <td>120%</td>
              <td>118%</td>
              <td>38</td>
              <td>-45%</td>
              <td>5</td>
            </tr>
          </tbody>
        </table>
      ),
      image: "images/Mierzony_Cios.jpg"
    },
    skill3: {
      name: "Blok Tarczą",
      description: (
        <div>
          <p>
            Tarcza to nie płot, za którym można się schować, tarczą trzeba umieć
            się posługiwać. Do tego służy umiejętność Blok Tarczą. Dzięki
            morderczemu treningowi Rycerz wie, kiedy i jak należy postawić blok,
            aby udany atak nawet kilku przeciwników zadał minimalne obrażenia.
            Każdy udany blok jest o 3% słabszy od poprzedniego i nie wpływa na
            redukcję obrażeń od żywiołów zaklętą w broniach. Użyta równocześnie
            Ochrona osłabia o kolejne 3% skuteczność bloku. Taka zasłona obniża
            też szansę na trafienie przeciwnika w zwarciu o 22%.
          </p>
          <p>Dostępne od 8 poziomu doświadczenia</p>
        </div>
      ),
      table: (
        <table>
          <tbody>
            <tr>
              <td>Poziom Um</td>
              <td>Ilość bloków</td>
              <td>Skuteczność bloku</td>
              <td>Kondycja</td>
              <td>Trudność</td>
            </tr>
            <tr>
              <td>I</td>
              <td>2</td>
              <td>45%</td>
              <td>20</td>
              <td>90</td>
            </tr>
            <tr>
              <td>II</td>
              <td>3</td>
              <td>50%</td>
              <td>23</td>
              <td>85</td>
            </tr>
            <tr>
              <td>III</td>
              <td>3</td>
              <td>55%</td>
              <td>26</td>
              <td>80</td>
            </tr>
            <tr>
              <td>IV</td>
              <td>4</td>
              <td>60%</td>
              <td>29</td>
              <td>75</td>
            </tr>
            <tr>
              <td>V</td>
              <td>4</td>
              <td>65%</td>
              <td>32</td>
              <td>70</td>
            </tr>
            <tr>
              <td>VI</td>
              <td>5</td>
              <td>70%</td>
              <td>35</td>
              <td>65</td>
            </tr>
            <tr>
              <td>VII</td>
              <td>5</td>
              <td>75%</td>
              <td>38</td>
              <td>60</td>
            </tr>
          </tbody>
        </table>
      ),
      image: "images/Blok_Tarczą.jpg"
    },
    skill4: {
      name: "Trans",
      description: (
        <div>
          <p>
            Wieloletnie szkolenie Rycerza nie ograniczało się wyłącznie do
            poprawiania jego warunków fizycznych i zdolności bojowych. Rycerstwo
            to również stan ducha. Obowiązkowe medytacje i mistyczne praktyki
            umożliwiły członkom rycerskiego stanu wchodzenie w Trans.
            Nadnaturalne skupienie i niebywała koncentracja sprawiły, że Rycerz
            w stopniu doskonałym panuje nad swoimi ruchami, dzięki czemu jego
            trafienia są pewniejsze, a rany zadawane wrogom - głębsze.
          </p>
          <p>Dostępne od 12 poziomu doświadczenia</p>
        </div>
      ),
      table: (
        <table>
          <tbody>
            <tr>
              <td>Poziom Um</td>
              <td>Obrażenia fizyczne</td>
              <td>Atak fizyczny (szansa trafienia)</td>
              <td>Czas</td>
              <td>Mana</td>
              <td>Trudność</td>
            </tr>
            <tr>
              <td>I</td>
              <td>+15%</td>
              <td>+20%</td>
              <td>3</td>
              <td>20</td>
              <td>85</td>
            </tr>
            <tr>
              <td>II</td>
              <td>+16%</td>
              <td>+23%</td>
              <td>3</td>
              <td>23</td>
              <td>80</td>
            </tr>
            <tr>
              <td>III</td>
              <td>+17%</td>
              <td>+26%</td>
              <td>4</td>
              <td>26</td>
              <td>75</td>
            </tr>
            <tr>
              <td>IV</td>
              <td>+18%</td>
              <td>+29%</td>
              <td>4</td>
              <td>29</td>
              <td>70</td>
            </tr>
            <tr>
              <td>V</td>
              <td>+19%</td>
              <td>+32%</td>
              <td>5</td>
              <td>32</td>
              <td>65</td>
            </tr>
            <tr>
              <td>VI</td>
              <td>+20%</td>
              <td>+35%</td>
              <td>5</td>
              <td>35</td>
              <td>60</td>
            </tr>
            <tr>
              <td>VII</td>
              <td>+22%</td>
              <td>+38%</td>
              <td>5</td>
              <td>38</td>
              <td>55</td>
            </tr>
          </tbody>
        </table>
      ),
      image: "images/Trans.jpg"
    },
    skill5: {
      name: "Ochrona",
      description: (
        <div>
          <p>
            Rycerz to przede wszystkim przewodnik i obrońca. Etos, który
            definiuje tę klasę społeczną, nakazuje mu wręcz rzucenie się na
            ratunek, gdy zagrożone jest życie towarzysza. Umiejętność Ochrony
            daje szansę, że ataki przeciwników wymierzone w bronioną przez
            rycerza postać zostaną przekierowane na rycerza. Działa na ataki
            wręcz oraz dystansowe, z wyłączeniem ataków obszarowych. Użyta
            ochrona osłabia o 3% skuteczność Bloku Tarczą.
          </p>
          <p>Dostępne od 15 poziomu doświadczenia</p>
        </div>
      ),
      table: (
        <table>
          <tbody>
            <tr>
              <td>Poziom Um</td>
              <td>Skuteczność Ochrony</td>
              <td>Kondycja</td>
              <td>Trudność</td>
            </tr>
            <tr>
              <td>I</td>
              <td>70%</td>
              <td>40</td>
              <td>85</td>
            </tr>
            <tr>
              <td>II</td>
              <td>74%</td>
              <td>46</td>
              <td>80</td>
            </tr>
            <tr>
              <td>III</td>
              <td>78%</td>
              <td>52</td>
              <td>75</td>
            </tr>
            <tr>
              <td>IV</td>
              <td>82%</td>
              <td>58</td>
              <td>70</td>
            </tr>
            <tr>
              <td>V</td>
              <td>86%</td>
              <td>64</td>
              <td>65</td>
            </tr>
            <tr>
              <td>VI</td>
              <td>90%</td>
              <td>70</td>
              <td>60</td>
            </tr>
            <tr>
              <td>VII</td>
              <td>95%</td>
              <td>76</td>
              <td>55</td>
            </tr>
          </tbody>
        </table>
      ),
      image: "images/Ochrona.jpg"
    },
    skill6: {
      name: "Potężne Uderzenie",
      description: (
        <div>
          <p>
            Nawet tak opanowany i skoncentrowany Taernijczyk jak Rycerz czasami
            wpada w furię. Poskramiając zło i niesprawiedliwość nie zawsze
            zachowuje właściwe proporcje i czasami po prostu pragnie pierdolnąć
            najmocniej jak potrafi. Do tego właśnie służy Potężne uderzenie.
            Bardzo energochłonny atak zadaje ogromną ilość ran i dziesiątkuję
            przeciwników. Zawczasu oszołomione postacie otrzymują znacznie
            więcej obrażeń.
          </p>
          <p>Dostępne od 18 poziomu doświadczenia</p>
          <p>OBR: 0.7 * Siła + 0.3 * Zręczność + broń</p>
        </div>
      ),
      table: (
        <table>
          <tbody>
            <tr>
              <td>Poziom Um</td>
              <td>Obrażenia</td>
              <td>Szansa trafienia</td>
              <td>Kondycja</td>
            </tr>
            <tr>
              <td>I</td>
              <td>160%</td>
              <td>100%</td>
              <td>20</td>
            </tr>
            <tr>
              <td>II</td>
              <td>175%</td>
              <td>103%</td>
              <td>23</td>
            </tr>
            <tr>
              <td>III</td>
              <td>190%</td>
              <td>107%</td>
              <td>26</td>
            </tr>
            <tr>
              <td>IV</td>
              <td>205%</td>
              <td>110%</td>
              <td>29</td>
            </tr>
            <tr>
              <td>V</td>
              <td>220%</td>
              <td>112%</td>
              <td>32</td>
            </tr>
            <tr>
              <td>VI</td>
              <td>235%</td>
              <td>114%</td>
              <td>35</td>
            </tr>
            <tr>
              <td>VII</td>
              <td>255%</td>
              <td>117%</td>
              <td>38</td>
            </tr>
          </tbody>
        </table>
      ),
      image: "images/Potężne_Uderzenie.jpg"
    },
    skill7: {
      name: "Aura Czystości",
      description: (
        <div>
          <p>
            Rycerz to prawy i sprawiedliwy człowiek walczący z podłością i
            niegodziwością. Wyrazem tego jest umiejętność wywołania wokół siebie
            aury, która daje mu duchową odporność na uroki oraz zmniejsza jego
            podatność na czary przeciwników. Aura może służyć tak Rycerzowi jak
            i wybranej przez niego sojuszniczej postaci.
          </p>
          <p>Dostępne od 22 poziomu doświadczenia</p>
        </div>
      ),
      table: (
        <table>
          <tbody>
            <tr>
              <td>Poziom Um</td>
              <td>Obrona przed urokami</td>
              <td>Odporność na obrażenia od magii</td>
              <td>Czas</td>
              <td>Mana</td>
              <td>Trudność</td>
            </tr>
            <tr>
              <td>I</td>
              <td>+23%</td>
              <td>+15%</td>
              <td>3</td>
              <td>30</td>
              <td>85</td>
            </tr>
            <tr>
              <td>II</td>
              <td>+27%</td>
              <td>+18%</td>
              <td>3</td>
              <td>35</td>
              <td>80</td>
            </tr>
            <tr>
              <td>III</td>
              <td>+30%</td>
              <td>+21%</td>
              <td>4</td>
              <td>39</td>
              <td>75</td>
            </tr>
            <tr>
              <td>IV</td>
              <td>+34%</td>
              <td>+24%</td>
              <td>4</td>
              <td>44</td>
              <td>70</td>
            </tr>
            <tr>
              <td>V</td>
              <td>+37%</td>
              <td>+27%</td>
              <td>5</td>
              <td>48</td>
              <td>65</td>
            </tr>
            <tr>
              <td>VI</td>
              <td>+40%</td>
              <td>+30%</td>
              <td>5</td>
              <td>53</td>
              <td>60</td>
            </tr>
            <tr>
              <td>VII</td>
              <td>+45%</td>
              <td>+34%</td>
              <td>5</td>
              <td>57</td>
              <td>55</td>
            </tr>
          </tbody>
        </table>
      ),
      image: "images/Aura_Czystości.jpg"
    },
    skill8: {
      name: "Poświęcenie",
      description: (
        <div>
          <p>
            Ofiarność i chęć czynienia dobra jest priorytetem Rycerza, dlatego w
            momencie zagrożenia wartości nadrzędnych Rycerz, rzuca na siebie
            urok pozytywny, który obniża jego obronę, wzmacnia za to ataki.
            Odsłaniając się i odnosząc większe obrażenia, dziesiątkuje wrogów
            broniąc zasad, za które gotów jest oddać życie.
          </p>
          <p>Dostępne od 26 poziomu doświadczenia</p>
        </div>
      ),
      table: (
        <table>
          <tbody>
            <tr>
              <td>Poziom Um</td>
              <td>Obrażenia fizyczne</td>
              <td>Obrona fizyczna</td>
              <td>Czas</td>
              <td>Mana</td>
              <td>Trudność</td>
            </tr>
            <tr>
              <td>I</td>
              <td>+30%</td>
              <td>-15%</td>
              <td>5</td>
              <td>30</td>
              <td>90</td>
            </tr>
            <tr>
              <td>II</td>
              <td>+32%</td>
              <td>-16%</td>
              <td>5</td>
              <td>35</td>
              <td>85</td>
            </tr>
            <tr>
              <td>III</td>
              <td>+34%</td>
              <td>-17%</td>
              <td>6</td>
              <td>39</td>
              <td>80</td>
            </tr>
            <tr>
              <td>IV</td>
              <td>+36%</td>
              <td>-18%</td>
              <td>6</td>
              <td>44</td>
              <td>75</td>
            </tr>
            <tr>
              <td>V</td>
              <td>+38%</td>
              <td>-19%</td>
              <td>7</td>
              <td>48</td>
              <td>70</td>
            </tr>
            <tr>
              <td>VI</td>
              <td>+40%</td>
              <td>-20%</td>
              <td>7</td>
              <td>52</td>
              <td>65</td>
            </tr>
            <tr>
              <td>VII</td>
              <td>+43%</td>
              <td>-20%</td>
              <td>7</td>
              <td>57</td>
              <td>60</td>
            </tr>
          </tbody>
        </table>
      ),
      image: "images/Poświęcenie.jpg"
    },
    skill9: {
      name: "Siła Jedności",
      description: (
        <div>
          <p>
            Rycerz, wykorzystując swoje naturalne zdolności przywódcze i
            charyzmę, skupia wokół siebie całą drużynę. Dzięki zapalczywym mowom
            i okrzykom wznoszonym na polu walki, wśród walczących po swojej
            stronie wywołuje poczucie jedności, które zwiększa ich zapał i siłę.
            Postacie pod wpływem siły jedności zadają większe obrażenia oraz są
            skuteczniejsze.
          </p>
          <p>Dostępne od 30 poziomu doświadczenia</p>
          <p>Zwiększa obrażenia oraz celność całej drużyny</p>
        </div>
      ),
      table: (
        <table>
          <tbody>
            <tr>
              <td>Poziom Um</td>
              <td>Zadawane obrażenia</td>
              <td>Skuteczność ataków</td>
              <td>Czas</td>
              <td>Kondycja</td>
              <td>Mana</td>
              <td>Trudność</td>
            </tr>
            <tr>
              <td>I</td>
              <td>+15%</td>
              <td>+15%</td>
              <td>3</td>
              <td>15</td>
              <td>40</td>
              <td>85</td>
            </tr>
            <tr>
              <td>II</td>
              <td>+17%</td>
              <td>+17%</td>
              <td>3</td>
              <td>18</td>
              <td>46</td>
              <td>80</td>
            </tr>
            <tr>
              <td>III</td>
              <td>+19%</td>
              <td>+19%</td>
              <td>4</td>
              <td>20</td>
              <td>52</td>
              <td>75</td>
            </tr>
            <tr>
              <td>IV</td>
              <td>+21%</td>
              <td>+21%</td>
              <td>4</td>
              <td>22</td>
              <td>58</td>
              <td>70</td>
            </tr>
            <tr>
              <td>V</td>
              <td>+23%</td>
              <td>+23%</td>
              <td>5</td>
              <td>24</td>
              <td>64</td>
              <td>65</td>
            </tr>
            <tr>
              <td>VI</td>
              <td>+25%</td>
              <td>+25%</td>
              <td>5</td>
              <td>27</td>
              <td>70</td>
              <td>60</td>
            </tr>
            <tr>
              <td>VII</td>
              <td>+29%</td>
              <td>+29%</td>
              <td>5</td>
              <td>28</td>
              <td>76</td>
              <td>55</td>
            </tr>
          </tbody>
        </table>
      ),
      image: "images/Siła_Jedności.jpg"
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
  druid: {},
  firemage: {},
  archer: {},
  voodoo: {}
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
      description: (
        <div>
          <p>
            Podstawowy atak fizyczny. Ma większą szansę powodzenia niż atak za
            pomocą oręża, lecz zadaje mniejszą liczbę obrażeń. Zastosowanie
            kastetu zwiększa siłę ataku.
          </p>
          <p>Dostępne od 1 poziomu doświadczenia</p>
          <p>Atak fizyczny</p>
          <p>OBR: 0.7 * Siła + 0.5 * Zręczność + (70% lub broń)</p>
        </div>
      ),
      table: (
        <table>
          <tbody>
            <tr>
              <td>Poziom Um</td>
              <td>Obrażenia</td>
              <td>Szansa trafienia</td>
              <td>Kondycja</td>
            </tr>
            <tr>
              <td>I</td>
              <td>80%</td>
              <td>+20%</td>
              <td>8</td>
            </tr>
            <tr>
              <td>II</td>
              <td>85%</td>
              <td>+25%</td>
              <td>9</td>
            </tr>
            <tr>
              <td>III</td>
              <td>90%</td>
              <td>+30%</td>
              <td>10</td>
            </tr>
            <tr>
              <td>IV</td>
              <td>95%</td>
              <td>+35%</td>
              <td>12</td>
            </tr>
            <tr>
              <td>V</td>
              <td>100%</td>
              <td>+40%</td>
              <td>13</td>
            </tr>
            <tr>
              <td>VI</td>
              <td>110%</td>
              <td>+45%</td>
              <td>14</td>
            </tr>
            <tr>
              <td>VII</td>
              <td>120%</td>
              <td>+50%</td>
              <td>15</td>
            </tr>
          </tbody>
        </table>
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
      description: (
        <div>
          <p>
            Podstawowy urok. Wywołuje lęk u przeciwnika, obniżając jego
            skuteczność. Zmniejsza szansę powodzenia jego ataków fizycznych,
            dystansowych oraz magicznych.
          </p>
          <p>Dostępne od 1 poziomu doświadczenia</p>
          <p>Atak psychiczny</p>
          <p>Efekt: Strach</p>
        </div>
      ),
      table: (
        <table>
          <tbody>
            <tr>
              <td>Poziom Um</td>
              <td>Czas trwania</td>
              <td>Szansa trafienia wszelkich ataków</td>
              <td>Mana</td>
            </tr>
            <tr>
              <td>I</td>
              <td>5</td>
              <td>-15%</td>
              <td>30</td>
            </tr>
            <tr>
              <td>II</td>
              <td>5</td>
              <td>-20%</td>
              <td>34</td>
            </tr>
            <tr>
              <td>III</td>
              <td>6</td>
              <td>-25%</td>
              <td>39</td>
            </tr>
            <tr>
              <td>IV</td>
              <td>6</td>
              <td>-30%</td>
              <td>44</td>
            </tr>
            <tr>
              <td>V</td>
              <td>6</td>
              <td>-35%</td>
              <td>48</td>
            </tr>
            <tr>
              <td>VI</td>
              <td>6</td>
              <td>-40%</td>
              <td>53</td>
            </tr>
            <tr>
              <td>VII</td>
              <td>6</td>
              <td>-45%</td>
              <td>57</td>
            </tr>
          </tbody>
        </table>
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
      description: (
        <div>
          <p>
            Podstawowy atak dystansowy. Zadaje niewielką liczbę obrażeń, ale
            może być wykonywany nawet gdy postać wyposażona jest w miecz i
            tarczę. Nie wymaga żadnej broni dystansowej.
          </p>
          <p>Dostępne od 1 poziomu doświadczenia</p>
          <p>Atak dystansowy</p>
          <p>OBR: (0.7 * Siła + 0.3 * Zręczność) * 1.8</p>
        </div>
      ),
      table: (
        <table>
          <tbody>
            <tr>
              <td>Poziom Um</td>
              <td>Obrażenia</td>
              <td>Szansa trafienia</td>
              <td>Kondycja</td>
            </tr>
            <tr>
              <td>I</td>
              <td>80%</td>
              <td>+20%</td>
              <td>8</td>
            </tr>
            <tr>
              <td>II</td>
              <td>85%</td>
              <td>+25%</td>
              <td>9</td>
            </tr>
            <tr>
              <td>III</td>
              <td>90%</td>
              <td>+30%</td>
              <td>10</td>
            </tr>
            <tr>
              <td>IV</td>
              <td>95%</td>
              <td>+35%</td>
              <td>12</td>
            </tr>
            <tr>
              <td>V</td>
              <td>100%</td>
              <td>+40%</td>
              <td>13</td>
            </tr>
            <tr>
              <td>VI</td>
              <td>110%</td>
              <td>+45%</td>
              <td>14</td>
            </tr>
            <tr>
              <td>VII</td>
              <td>120%</td>
              <td>+50%</td>
              <td>15</td>
            </tr>
          </tbody>
        </table>
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
      description: (
        <div>
          <p>
            Podstawowy atak dystansowy przy użyciu broni dalekiego zasięgu.
            Korzystając z tej umiejętności możemy atakować za pomocą łuku.
          </p>
          <p>Dostępne od 1 poziomu doświadczenia</p>
          <p>Atak dystansowy</p>
          <p>OBR: 0.7 * Siła + 0.3 * Zręczność + broń</p>
          <p>Wymagania: założona broń dystansowa</p>
        </div>
      ),
      table: (
        <table>
          <tbody>
            <tr>
              <td>Poziom Um</td>
              <td>Obrażenia</td>
              <td>Szansa trafienia</td>
              <td>Kondycja</td>
            </tr>
            <tr>
              <td>I</td>
              <td>100%</td>
              <td>+0%</td>
              <td>10</td>
            </tr>
            <tr>
              <td>II</td>
              <td>110%</td>
              <td>+3%</td>
              <td>11</td>
            </tr>
            <tr>
              <td>III</td>
              <td>120%</td>
              <td>+7%</td>
              <td>13</td>
            </tr>
            <tr>
              <td>IV</td>
              <td>130%</td>
              <td>+10%</td>
              <td>14</td>
            </tr>
            <tr>
              <td>V</td>
              <td>140%</td>
              <td>+12%</td>
              <td>16</td>
            </tr>
            <tr>
              <td>VI</td>
              <td>150%</td>
              <td>+15%</td>
              <td>17</td>
            </tr>
            <tr>
              <td>VII</td>
              <td>160%</td>
              <td>+20%</td>
              <td>19</td>
            </tr>
          </tbody>
        </table>
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
      description: (
        <div>
          <p>
            Podstawowy atak fizyczny wymagający użycia oręża. Umożliwia
            wyprowadzanie ciosów za pomocą każdego rodzaju broni białej poza
            kastetami.
          </p>
          <p>Dostępne od 1 poziomu doświadczenia</p>
          <p>Atak fizyczny</p>
          <p>OBR: 0.7 * Siła + 0.3 * Zręczność + broń</p>
          <p>Wymagania: założona broń biała</p>
        </div>
      ),
      table: (
        <table>
          <tbody>
            <tr>
              <td>Poziom Um</td>
              <td>Obrażenia</td>
              <td>Szansa trafienia</td>
              <td>Kondycja</td>
            </tr>
            <tr>
              <td>I</td>
              <td>100%</td>
              <td>+0%</td>
              <td>10</td>
            </tr>
            <tr>
              <td>II</td>
              <td>110%</td>
              <td>+3%</td>
              <td>12</td>
            </tr>
            <tr>
              <td>III</td>
              <td>120%</td>
              <td>+7%</td>
              <td>13</td>
            </tr>
            <tr>
              <td>IV</td>
              <td>130%</td>
              <td>+10%</td>
              <td>15</td>
            </tr>
            <tr>
              <td>V</td>
              <td>140%</td>
              <td>+12%</td>
              <td>16</td>
            </tr>
            <tr>
              <td>VI</td>
              <td>150%</td>
              <td>+15%</td>
              <td>18</td>
            </tr>
            <tr>
              <td>VII</td>
              <td>160%</td>
              <td>+20%</td>
              <td>19</td>
            </tr>
          </tbody>
        </table>
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
      description: (
        <div>
          <p>
            Umiejętność przydatna gdy nie ma już wątpliwości, że walka skończy
            się porażką. Jeśli uda się z niej skorzystać postać wycofuje się do
            ostatniego bezpiecznego miejsca, w którym była. Ucieczka jest pewną
            formą pozytywnego uroku - każdy przydzielony jej PA zwiększa szansę
            dania nóg za pas o 20%.
          </p>
          <p>Dostępne od 1 poziomu doświadczenia</p>
          <p>Ostatnia czynność w walce</p>
          <p>Nie można awansować na wyższy poziom</p>
        </div>
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
      description: (
        <div>
          <p>
            Umiejętność wykształcona przez wojowników samotników. Przemierzając
            rozległe krainy, udręczeni walką o przetrwanie i samotnością
            wykształcili w sobie unikalny system porozumiewania się ze
            zwierzakami. Dzięki niemu potrafią współpracować z więcej niż jednym
            zwierzem w drużynie.
          </p>
          <p>Dostępne od 35 poziomu doświadczenia</p>
          <p>Awansować można o jeden poziom co 10 lvl postaci</p>
        </div>
      ),
      table: (
        <table>
          <tbody>
            <tr>
              <td>Poziom Um</td>
              <td>Suma Rang</td>
              <td>Maksymalna ilość petów w drużynie</td>
            </tr>
            <tr>
              <td>I</td>
              <td>3</td>
              <td>2</td>
            </tr>
            <tr>
              <td>II</td>
              <td>4</td>
              <td>2</td>
            </tr>
            <tr>
              <td>III</td>
              <td>5</td>
              <td>2</td>
            </tr>
            <tr>
              <td>IV</td>
              <td>6</td>
              <td>2</td>
            </tr>
            <tr>
              <td>V</td>
              <td>8</td>
              <td>2</td>
            </tr>
            <tr>
              <td>VI</td>
              <td>12</td>
              <td>3</td>
            </tr>
            <tr>
              <td>VII</td>
              <td>19</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
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
      description: (
        <div>
          <p>
            Lata doświadczeń w boju pozwoliły wypracować umiejętność wyrwania
            się z uwięzi Korzeni. Dzięki medytacji i ćwiczeniom można
            przekierować swoją energię i pozbyć się wszystkich efektów tej
            potężnej umiejętności. Wyrwanie z korzenia wymaga tyle PA, na ile
            rund są wrzucone Korzenie x 2. (np. Korzenie na 2 rundy, więc 4 PA).
            Działa tylko na rzucającego.
          </p>
          <p>Dostępne od 1 poziomu doświadczenia</p>
          <p>Pobiera 30 kondycji.</p>
          <p>Nie można awansować na wyższy poziom</p>
        </div>
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
    }
  }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
