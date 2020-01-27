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
    {
      resolve: `gatsby-source-ttlive`,
      options: {
        leagueId: 12970,
      },
    },
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
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    `gatsby-plugin-sass`,
  ],
}
