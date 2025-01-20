interface itemsType {
    day: string,
    items: [
      { 
        name: string, 
        price: number, 
        image: string, 
        description: string, 
        rating: number,
        popular: string
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
  popular: string;
  ratings: number;
}

export { itemsType, weeklyMenu, MenuItem };
