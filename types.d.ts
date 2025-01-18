interface itemsType {
    day: string,
    items: [
      { 
        name: string, 
        price: number, 
        image: string, 
        description: string, 
        rating: number
      }
    ]
}

interface weeklyMenu{
    day: string;
    items: itemsType[];
}

interface MenuItem {
  id: number;
  food: string;
  price: string;
  description: string;
  image_url: string;
  ratings: {
    fivestar: string;
    fourstar: string;
    threestar: string;
    twostar: string;
    onestar: string;
  };
}

export { items, weeklyMenu, MenuItem };
