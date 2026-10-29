export interface Thought {
  slug: string;
  title: string;
  // ISO date, e.g. "2026-07-11"
  date: string;
  summary: string;
  // each string is a paragraph
  body: string[];
  // optional fields, mainly for food reviews
  order?: string;
  rating?: string;
  image?: { src: string; alt: string };
  // optional: multiple photos (shown in a grid)
  images?: { src: string; alt: string; caption?: string }[];
}

// Add new entries to the top of this array. Newest first.
export const thoughts: Thought[] = [
  {
    slug: "frescos-fish-and-chips",
    title: "fresco's fish and chips",
    date: "2026-07-10",
    summary: "cod + chips.",
    order: "cod + chips",
    body: [
      "some of my favorite fish and chips in the city. yes it suffers from the toronto tax, but it has the best value i've found in the city. great chips, fresh fish, and some of my favorite clam chowder. try the miss vickie's batter, it adds a great crunch. they also recently remodelled... i miss the old nostalgic layout. regardless, great food.",
    ],
    rating: "4/5",
    image: {
      src: "/thoughts/frescos-fish-and-chips.png",
      alt: "Fish and chips from Fresco's: two pieces of battered cod, fries, a lemon wedge, coleslaw, and tartar sauce on a white plate",
    },
  },
  {
    slug: "chicken-caesar-wrap",
    title: "grandma loves you and my kitchen",
    date: "2026-07-03",
    summary: "chicken caesar wrap, theirs vs mine.",
    order: "chicken caesar wrap",
    body: [
      "this one set a fire in my heart. i tried a chicken caesar wrap from grandma loves you because it was trending at the time. don't get me wrong, it was good... but i knew i could do so, so much better.",
      "i grilled some chicken, made a fresh caesar salad, used garlic croutons, and threw some bacon in the oven. didn't have the huge stretchy wraps but the final result blew grandma loves you out of the water. the flavor of the chicken was the star of the show. i had a paprika garlic marinade, along with a concoction in my fridge.",
    ],
    rating: "3/5 (grandma loves you), 4.8/5 (mine)",
    images: [
      {
        src: "/thoughts/grandma-caesar-wrap.png",
        alt: "Chicken caesar wrap from Grandma Loves You in a takeout container, cut in half",
        caption: "grandma loves you.",
      },
      {
        src: "/thoughts/my-caesar-chicken.png",
        alt: "Grilled paprika garlic marinated chicken breasts on a plate",
        caption: "mine.",
      },
      {
        src: "/thoughts/my-caesar-wrap.png",
        alt: "My homemade chicken caesar wrap cut in half on a white plate",
        caption: "mine.",
      },
    ],
  },
  {
    slug: "my-backyard-grill",
    title: "my backyard grill",
    date: "2026-06-27",
    summary: "ny strip loin, broccolini, potatoes, and the works.",
    order:
      "NY strip loin, broccolini, potatoes, grilled carrots, mushrooms, sausages",
    body: [
      "decided to grill up some steaks again for the fam. i've tried every method of cooking a steak, cast iron, stainless steel, reverse sear, you name it. today was simple. let steaks come up to room temp and throw them on the grill. this is one of the best steaks i've made, great medium rare cook, no grey band, tender and juicy. next time i'll transfer to a pan and baste with some butter, thyme, and garlic.",
    ],
    rating: "4.75/5",
    images: [
      {
        src: "/thoughts/backyard-steak-sliced.png",
        alt: "Sliced NY strip steak on a plate showing an even medium rare cook",
      },
      {
        src: "/thoughts/backyard-steak-grill.png",
        alt: "NY strip steaks and broccolini cooking over flames on the grill",
      },
      {
        src: "/thoughts/backyard-spread.png",
        alt: "The full dinner spread: steaks, broccolini, carrots, mushrooms, corn, and sausages on the table",
      },
    ],
  },
  {
    slug: "south-st-burger",
    title: "south st burger",
    date: "2026-06-20",
    summary: "grilled chicken sandwich.",
    order: "grilled chicken sandwich",
    body: [
      "a fun one. grabbed on the way to a jays game since stadium prices are so high. sandwich was okay. not a wonderful sandwich but the game made it taste better.",
    ],
    rating: "3.5/5 (in the game), 2/5 (objectively)",
    image: {
      src: "/thoughts/south-st-burger.png",
      alt: "Grilled chicken sandwich from South St Burger held up in front of the baseball field at a Blue Jays game",
    },
  },
  {
    slug: "uno-mustachio",
    title: "uno mustachio",
    date: "2026-06-13",
    summary: "chicken and eggplant with all the toppings.",
    order: "chicken and eggplant with all the toppings",
    body: [
      'have always loved a good veal sandwich. one of my favorite "simple" foods, but so much nuance to get right. today i decided to change things up and go for the chicken and eggplant instead of veal. this sandwich was great, albeit pricy. the breading and coating was crispy and had a wonderful texture. the bun is textbook. however the toppings elevated everything. mushroom, jalapenos and peppers.',
    ],
    rating: "4/5",
    image: {
      src: "/thoughts/uno-mustachio.png",
      alt: "Cross-section of a chicken and eggplant sandwich from Uno Mustachio with crispy breaded layers, roasted peppers, and toppings on a bun",
    },
  },
  {
    slug: "mr-congee",
    title: "mr congee",
    date: "2026-06-06",
    summary: "congee, lobster, duck, and turnip cake.",
    body: [
      "one of the best congee and lobster places i've been to. the lobster is large, the duck was great, and their turnip cake is some of the best i've had. their black pepper beef was my favorite out of the spread but i wasn't the biggest fan of the presentation (i'd rather have more beef).",
    ],
    rating: "4.5/5",
    image: {
      src: "/thoughts/mr-congee.png",
      alt: "A large spread of Chinese dishes at Mr Congee including lobster, duck, noodles, black pepper beef, and congee",
    },
  },
  {
    slug: "bloom-cafe",
    title: "bloom cafe",
    date: "2026-05-30",
    summary: "grape oolong cake.",
    order: "grape oolong cake",
    body: [
      "first time having cake from bloom. taste was great, not too sweet and very strong oolong flavor. however i found the cake itself to be a bit dry and spongy for my taste.",
    ],
    rating: "3.5/5",
    image: {
      src: "/thoughts/bloom-cafe.png",
      alt: "Grape oolong cake from Bloom Cafe with purple and cream frosting and a cherry on top, with birthday candles",
    },
  },
  {
    slug: "ikkousha-ramen-chicken",
    title: "ikkousha ramen (chicken)",
    date: "2026-05-23",
    summary: "summer special cold ramen + chicken gyoza.",
    order: "summer special cold ramen + chicken gyoza",
    body: [
      "one of the best hakata ramen places in toronto, comparable to the best ramen i had in japan. surprisingly, i find the chicken version of this restaurant (pork restaurant is next door) to be much better. they have delicious ramen.",
      "I ate this special cold ramen on a 35 degree day so it was much needed. the broth was clear and soy forward. the noodles were a bit softer than i would prefer. overall i prefer their hot ramen.",
    ],
    rating: "3/5",
    image: {
      src: "/thoughts/ikkousha-ramen.png",
      alt: "Bowl of cold Hakata ramen with sliced chicken, green onion, red onion, bamboo shoots, and nori, with chicken gyoza in the background",
    },
  },
  {
    slug: "jersey-mikes",
    title: "jersey mike's",
    date: "2026-05-17",
    summary: "giant turkey and provolone, all added toppings.",
    order:
      "giant turkey and provolone, all added toppings, cheese & oregano bun",
    body: [
      "this was okay. still can't get over the jersey mike's pricing compared to subway. the meat was fresh but the sandwich was lacking in flavor. also not as much customization compared to firehouse subs or subway. this is a great change of pace every once in a while, but i still prefer firehouse subs.",
    ],
    rating: "2.5/5",
    image: {
      src: "/thoughts/jersey-mikes.png",
      alt: "Giant turkey and provolone sub from Jersey Mike's with lettuce, tomato, and onions on a sesame roll",
    },
  },
  {
    slug: "hello-world",
    title: "hello, world",
    date: "2026-05-12",
    summary: "what i'll be writing about here.",
    body: [
      "this is where i'll leave my thoughts, mainly on music, books, engineering topics, and food.",
      "if you like anything you see here, reach out and let me know. if you have any food recommendations, let me know too.",
    ],
  },
];

export function getThoughtBySlug(slug: string): Thought | undefined {
  return thoughts.find((t) => t.slug === slug);
}

export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
