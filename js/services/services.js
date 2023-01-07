const getResource = async() => {
  const res = await fetch('https://irmakdak.github.io/BooksShop/booksDB.json/', {
    method: "GET"
  }) 
  if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status ${res.status}`);
  } else {
    return await res.json();
  }
};

export {getResource};