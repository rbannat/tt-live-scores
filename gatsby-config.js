module.exports = {
  siteMetadata: {
    title: `TT-Live Scores`,
    description: `Hier findest du Ergebnisse des Berliner Tisch-Tennis Verband e.V. direkt aus TischtennisLive.`,
    author: `@rennitlb`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-source-ttlive`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `TT-Live Scores`,
        short_name: `TT-Live Scores`,
        start_url: `/`,
        background_color: `#6eccae`,
        theme_color: `#6eccae`,
        display: `minimal-ui`,
        icon: `src/images/ping-pong.png`, // This path is relative to the root of the site.
        icon_options: {
          purpose: `any maskable`,
        },
        cache_busting_mode: "none",
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "pages",
        engine: "flexsearch",
        engineOptions: {
          tokenize: "forward",
        },
        query: `
          {
            allTeam {
              nodes {
                id
                name
              }
            }
            allLeague {
              nodes {
                id
                name
              }
            }
          }
        `,
        ref: "id",
        index: ["name"],
        store: ["id", "nodeType", "name"],
        normalizer: ({ data }) => [
          ...data.allLeague.nodes.map(node => ({
            id: node.id,
            nodeType: "league",
            name: node.name,
          })),
          ...data.allTeam.nodes.map(node => ({
            id: node.id,
            nodeType: "team",
            name: node.name,
          })),
        ],
      },
    },
  ],
}
