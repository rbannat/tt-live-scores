import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  graphqlTypegen: true,
  siteMetadata: {
    title: `TT-Live Scores`,
    description: `Hier findest du Ergebnisse des Berliner Tisch-Tennis Verband e.V. direkt aus TischtennisLive.`,
    twitterUsername: `@rennitlb`,
    siteUrl: `https://tt-live-scores.netlify.app`,
    image: `src/images/ping-pong.png`,
  },
  trailingSlash: `always`,
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    `gatsby-source-ttlive`,
    `gatsby-transformer-json`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
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
        icons: [
          {
            src: '/favicons/maskable_icon_x48.png',
            sizes: '48x48',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/favicons/maskable_icon_x72.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/favicons/maskable_icon_x96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/favicons/maskable_icon_x144.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/favicons/maskable_icon_x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/favicons/maskable_icon_x256.png',
            sizes: '256x256',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/favicons/maskable_icon_x384.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/favicons/maskable_icon_x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'src/images/ping-pong.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
        ],
        cache_busting_mode: 'none',
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassOptions: {
          api: 'modern',
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
    'gatsby-plugin-dts-css-modules',
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'pages',
        engine: 'flexsearch',
        engineOptions: {
          tokenize: 'forward',
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
            allPlayer {
              nodes {
                id
                name
              }
            }
          }
        `,
        ref: 'id',
        index: ['name'],
        store: ['id', 'nodeType', 'name'],
        normalizer: ({ data }) => [
          ...data.allLeague.nodes.map(node => ({
            id: node.id,
            nodeType: 'leagues',
            name: node.name,
          })),
          ...data.allTeam.nodes.map(node => ({
            id: node.id,
            nodeType: 'teams',
            name: node.name,
          })),
          ...data.allPlayer.nodes.map(node => ({
            id: node.id,
            nodeType: 'players',
            name: node.name,
          })),
        ],
      },
    },
  ],
}

export default config
