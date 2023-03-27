import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [cocktail, setCocktail] = useState(null);

  const getCocktailRandom = async () => {
    const response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    const data = await response.json();
    console.log(data.drinks[0]);
    setCocktail(data.drinks[0]);
  };

  useEffect(() => {
    getCocktailRandom();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Cocktail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <button onClick={getCocktailRandom}>Random Cocktail</button>

      {cocktail && (
        <ul style={{ listStyleType: "none" }} className="body"> 
          <li>Name: {cocktail.strDrink}</li>
          <li>Category: {cocktail.strCategory}</li>
          <li>Type: {cocktail.strAlcoholic}</li>
          <li>Intruction: {cocktail.strInstructions}</li>
          <li>
            Ingridients:
            <ul>
              {new Array(15)
                .fill("")
                .map(
                  (_, i) =>
                    cocktail[`strIngredient${i + 1}`] && (
                      <li key={i + 12}>{cocktail[`strIngredient${i + 1}`]}</li>
                    )
                )}
            </ul>
          </li>
          <li>
            <Image
              src={cocktail.strDrinkThumb}
              width={300}
              height={300}
              alt=""
            />
          </li>
        </ul>
      )}
    </div>
  );
}