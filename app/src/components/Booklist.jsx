import { useState, useEffect } from "react";


export const Booklist = ({ language, getData }) => {

  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    const result = getData?.(language)
      .then((response) => setBookData(response));
  }, [language, getData]);

  // const result = getData?.(language);

  return (
    <ul>
      {bookData?.data.items.map((x, index) => <li key={index}>{x.volumeInfo.title}</li>)}
    </ul>
  );
};