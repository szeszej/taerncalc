//React
import React from 'react';

//i18l
import { withTranslation } from "react-i18next";

function ConnectedIntro (props: PropTypes) {
  const { t } = props
  return (
    <div className="intro">
      <h2>{t("intro-header-1")}</h2>
      <p>{t("intro-desc-1")}</p>
      <h2>Czy mogę jakoś podzielić się swoim buildem z innymi graczami Pride of Taern?</h2>
      <p>Jak najbardziej! Wystarczy, że klikniesz na przycisk "Eksportuj build" na samym dole ekranu, a następnie gotowy link do twojego buildu skopiujesz do schowka. Możesz potem wklejać go innym graczom na czacie w grze, na forum lub gdziekolwiek zechcesz.</p>
      <h2>Jak używać kalkulatora umiejętności i statystyk Pride of Taern?</h2>
      <p>Używanie kalkulatora jest bardzo proste - w formularzu powyżej wpisz:</p>
      <ol>
        <li>Dla jakiej klasy chcesz wyliczyć statystyki i umiejętności (pole "Wybierz klasę")</li>
        <li>Dla jakiego poziomu postaci chcesz dokonać obliczeń (pole "Poziom postaci")</li>
        <li>Kliknij "Zatwierdź"</li>
      </ol>
      <p>
        Po przejściu powyższych korków wyświetli się kalkulator. Na początku będzie widoczna zakładka z listą statystyk i ekwipunkiem, ale możesz również przejść do drugiej zakładki z listą umiejętności (oddzielnie umiejętności klasowe i te dla każdej klasy). Możesz użyć przycisków, aby zwiększyć bądź zmniejszyć poziom statystyki lub umiejętności. Kliknij na sloty w ekwipunku, aby wyekwipować przedmioty.
        Dodatkowo jeśli chcesz rozpocząć dodawanie od nowa, użyj przycisku "Reset". Żeby wyekwipować przedmiot, kliknij na odpowiedni slot w ekwipunku.
      </p>
      <h2>Niektóre przedmioty mają losowe statystyki, a niektóre z moich przedmiotów są ulepszone - jak mogę odzwierciedlić to w kalkulatorze?</h2>
      <p>Po wyekwipowaniu przedmioty, kliknij przycisk ulepszenia (<img className="imageInText" src="images/upgrade.png" alt="upgrade" />). Otworzy się menu, w którym będziesz mógł dowolnie modyfikować podstawowe parametry przedmiotu.</p>
      <h2>Do czego służy ikonka kowadła (<img className="imageInText" src="images/star.svg" alt="kowadło" />)?</h2>
      <p>Po kliknięciu w tę ikonkę możecie sami stworzyć przedmiot! Dodatkowo funkcja ta umożliwia personalizację buildu i przedmiotu - możecie mu nadawać własną nazwę i obrazek!</p>
      <h2>Czym jest The Pride of Taern?</h2>
      <p>The Pride of Taern jest polską grą MMORPG w rzucie izometrycznym i turową walką. Znajdziesz w niej ponad 300 lokacji, 466 potworów, 774 bohaterów niezależnych, 40 bossów, setki
        potężnych przedmiotów. Dodatkowo ponad 100 questów i zadań, a także dynamiczne eventy.</p>
    </div>
  )
}

export const Intro = withTranslation()(ConnectedIntro)

interface PropTypes {
  t(string: string): string;
}
