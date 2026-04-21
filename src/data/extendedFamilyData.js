// This file contains a hierarchical structure mocking the extended Patole family
// used specifically for the Pedigree Diagram.

export const pedigreeData = {
  id: "great-grandparents",
  name: "Great Grandparents",
  generation: "I",
  partners: [
    {
      id: "gg-father",
      name: "Ancestral",
      surname: "Patole",
      role: "Patriarch",
      image: "placeholder_m.jpg", // We'll handle fallbacks in the component
      accent: "#64748b",
      bio: "The foundational generation of the Patole family legacy. Established the roots of discipline and dedication.",
      achievements: ["Established Family Estate", "Community Leader"],
      socials: [],
      projects: []
    },
    {
      id: "gg-mother",
      name: "Ancestral",
      surname: "Matriarch",
      role: "Matriarch",
      image: "placeholder_f.jpg",
      accent: "#64748b",
      bio: "The heart of the family origin, instilling values that have passed through generations.",
      achievements: ["Family Values", "Cultural Preservation"],
      socials: [],
      projects: []
    }
  ],
  children: [
    {
      id: "grandparents",
      name: "Grandparents",
      generation: "II",
      partners: [
        {
          id: "g-father",
          name: "Grandfather",
          surname: "Patole",
          role: "Senior Patriarch",
          image: "placeholder_m2.jpg",
          accent: "#94a3b8",
          bio: "Carried the family name forward with honor, laying the groundwork for future educational pursuits.",
          achievements: ["Pillar of the Community", "Educational Advocate"],
          socials: [],
          projects: []
        },
        {
          id: "g-mother",
          name: "Grandmother",
          surname: "Patole",
          role: "Senior Matriarch",
          image: "placeholder_f2.jpg",
          accent: "#94a3b8",
          bio: "A guiding light for the family, emphasizing the importance of care and unity.",
          achievements: ["Family Unification"],
          socials: [],
          projects: []
        }
      ],
      children: [
        {
          id: "parents",
          name: "Parents",
          generation: "III",
          partners: [
            {
              id: "vivek",
              name: "Vivek",
              surname: "Patole",
              role: "VP – Central Engineering",
              image: "vivek.png",
              accent: "#f59e0b",
              isPrimary: true
            },
            {
              id: "bhavana",
              name: "Bhavana",
              surname: "Patole",
              role: "Director, SIAC",
              image: "bhavana.png",
              accent: "#10b981",
              isPrimary: true
            }
          ],
          children: [
            {
              id: "children-gen",
              name: "Children",
              generation: "IV",
              partners: [
                {
                  id: "anrunya",
                  name: "Anrunya",
                  surname: "Patole",
                  role: "Cyber Security Specialist",
                  image: "anrunya_original.png",
                  accent: "#8b5cf6",
                  isPrimary: true
                }
              ]
            },
            {
              id: "children-gen-2",
              name: "Children",
              generation: "IV",
              partners: [
                 {
                  id: "kshetradnya",
                  name: "Kshetradnya",
                  surname: "Patole",
                  role: "Student & Web Developer",
                  image: "kshetradnya.png",
                  accent: "#00d4ff",
                  isPrimary: true
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
