import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userId = "405f2f41-f2a7-4d4d-8bf8-53886bb1398f";

const movies = [
  {
    title: "The Dark Knight",
    overview: "Batman faces the Joker in a battle for Gotham's soul.",
    releaseYear: 2008,
    genre: ["Action", "Crime", "Drama"],
    runtime: 152,
    posterUrl: "https://example.com/darkkight.jpg",
    createdBy: userId,
  },
  {
    title: "Inception",
    overview:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    releaseYear: 2010,
    genre: ["Action", "Sci-Fi", "Thriller"],
    runtime: 148,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    createdBy: userId,
  },
  {
    title: "Parasite",
    overview:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    releaseYear: 2019,
    genre: ["Drama", "Thriller", "Comedy"],
    runtime: 132,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    createdBy: userId,
  },
  {
    title: "Spirited Away",
    overview:
      "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, where humans are changed into beasts.",
    releaseYear: 2001,
    genre: ["Animation", "Fantasy", "Adventure"],
    runtime: 125,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    createdBy: userId,
  },
  {
    title: "Mad Max: Fury Road",
    overview:
      "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.",
    releaseYear: 2015,
    genre: ["Action", "Adventure", "Sci-Fi"],
    runtime: 120,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/hA2ple9q4qnwxp3hKVNhroipsir.jpg",
    createdBy: userId,
  },
  {
    title: "The Grand Budapest Hotel",
    overview:
      "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
    releaseYear: 2014,
    genre: ["Comedy", "Drama", "Adventure"],
    runtime: 99,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
    createdBy: userId,
  },
];

const main = async () => {
  console.log("Seeding database... ");

  for (const movie of movies) {
    await prisma.movie.create({
      data: movie,
    });
    console.log(`Created movie: ${movie.title}`);
  }

  console.log("Database seeding completed.");
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
