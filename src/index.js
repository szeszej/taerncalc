import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import {Calculator} from './App.js';
import * as serviceWorker from './serviceWorker';

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
  ReactDOM.render(
    <Calculator level={parseInt(charLvl)} class={skillSet} className={charClass} items={database.items}/>,
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
      name: "Twoja stara",
      image: "images/Twoja_stara.jpg"
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

class Item {
  constructor (item) {
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

const itemDatabase = [
  {
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
  cutRes: 31,
  bluntRes: 31,
  pierceRes: 31
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
  name: "Nienawiść Draugula",
  type: "belt",
  rarity: "Psychorare",
  image: "[www.taernopedia.pl][67]NienawiC59BC48720Draugula.png",
  reqLvl: 120,
  reqStr: 100,
  strength: 21,
  agility: 32,
  hp: 170,
  mana: 30,
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
const sortedItems = items.sort((x, y) => y.reqLvl - x.reqLvl);
const taernDatabase = {
  skills: skillDatabase,
  items: sortedItems
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
